const SITE_NAME = "AussieDev81";
const SITE_EMAIL = "info@aussiedev81.com";
const SITE_URL = "https://aussiedev81.com";
const REPO_README = "https://api.github.com/repos/AussieDev81/AussieDev81-Website/readme";
const REPOS = {
	AussieDev81: "https://api.github.com/users/AussieDev81/repos",
	nathansnow1981: "https://api.github.com/users/nathansnow1981/repos",
};
const SOCIAL_LINKS = [
	{ description: "GitHub social link", icon: "fa-brands fa-github", link: "https://github.com/AussieDev81" },
	{ description: "Twitter social link", icon: "fa-brands fa-twitter", link: "https://twitter.com/AussieDev81" },
	{ description: "Discord social link", icon: "fa-brands fa-discord", link: "https://discord.gg/vXus9NrC3P" },
	{ description: "Email link", icon: "fa fa-envelope", link: "mailto:info@aussiedev81.com&subject=Enquiry" },
 ];

//A collection of all pages in the site, with their filename and short name
const SITE_LINKS = [
	{filename: "/", shortName: "Home"},
	{filename: "about.html", shortName: "About"},
	{filename: "projects.html", shortName: "Projects"},
	{filename: "blog.html", shortName: "Blog"},
	{filename: "contact.html", shortName: "Contact"},
]


/**
 * Get the name of the page being viewed
 * @returns The name of the current page ("Home" for index.html) minus the ".html" file extension
 */
let currentPage = () => {
	let name = location.pathname.split("/").pop();

	if(name == "") name = "Home"
	else if(name.includes(".html")) name = name.replace(".html", "");

	return name;
}


/**
 * Capitalize the first letter in a word
 * @param {*} word The word to be capitalized
 * @returns A word with the first letter in uppercase, and the remainder of the word in its original form
 */
const capitalizeWord = (word) => {
	return word[0].toUpperCase() + word.substring(1);
};


/**
 * Rewrite the page title dynamically
 */
document.getElementsByTagName("title")[0].innerHTML = `${SITE_NAME} - ${capitalizeWord(currentPage())}`;



// Main navigation bar
const navContent = () => {
	let content = `
	    <nav class="nav-bar">
			<div class="brand">
				<a href="/">${SITE_NAME}</a>
				<!--Toggle Button-->
				<button class="nav-toggle" id="nav-toggler" >
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
			</div>
			<div class="menu" id="nav-menu">
				<ul>
				`;

	SITE_LINKS.forEach((link) => {
		content += `<li>
			<a href="${link.filename}" 
			class="nav-item ${link.shortName.toUpperCase() === currentPage().toUpperCase() ? 'active' : ''}">
			${link.shortName}
			</a>
		</li>`;
	});

	content += `
			</ul>
		</div>
	</nav>`;
	return content;
};


const navToggle = () => {
	const navToggler = document.getElementById("nav-toggler");
	let menu = document.getElementById("nav-menu");

	const showMenu = () => (menu.style.display = "block");
	const hideMenu = () => (menu.style.display = "none");
	const toggleMenu = () => (getComputedStyle(menu).display == "none"? showMenu() : hideMenu());

	navToggler.addEventListener("click", () => {
		toggleMenu();
	})

	//Detect mouse clicks outside the dropdown menu
	// window.addEventListener("click", () => {
	// 	hideMenu();
	// });
};


/**
 * Fetches the README document from GitHub repository and shows the current stats for both AussieDev81 and nathansnow1981 accounts
 */
const fetchReadme = () => fetch(REPO_README, {
	accept: "application/vnd.github.html+json",
})
	.then((response) => response.json())
	.then((data) => (document.getElementById("github-block").innerHTML = atob(data.content)))
	.catch((error) => console.error(error));


/**
 * Fetches all GitHub repos from both the AussieDev81 and nathansnow1981 accounts, merges and sorts the repos based on the
 * date they were last updated, then filters only the 5 most recently updated repos.
 * The most recently updated repos are then added to the 'recent-repos' table in index.html
 */
const fetchTopFiveRepos = async () => {
	//Define both GitHub repository api calls
	let ad81Data = await fetch(REPOS.AussieDev81);
	let ns1981Data = await fetch(REPOS.nathansnow1981);

	//Call both APIs asynchronously
	Promise.all([ad81Data, ns1981Data])
		.then((repos) => Promise.all(repos.map((repo) => repo.json())))
		.then((repos) => {
			//Combine all repos into one array
			let allRepos = repos[0].concat(repos[1]);
			//Sort repos by date last updated and keep only the most recent 5
			allRepos = allRepos.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)).slice(0, 5);

			//Define table rows using the 5 recent repositories
			let tableRows = "";
			allRepos.forEach((repo) => {
				tableRows += `
		<tr>
			<td>${new Date(repo.pushed_at).toLocaleDateString("en-AU")}</td>
			<td>${repo.name}</td>
			<td><a href='${repo.html_url}' target='_blank' title='Visit ${repo.name}'>${repo.html_url}</a></td>
		</tr>
		`;
			});

			//Create table and insert the predefined table rows
			const recentRepos =
				`
			<h2>5 Most Recent Repos</h2>
			<div id="table-box">
				<table>
				<thead>
					<tr>
						<th>Last Updated</th>
						<th>Repository Name</th>
						<th>URL</th>
					</tr>
				</thead>
				<tbody>
				` +
					tableRows +
					`
				</tbody>
				</table>
			</div>
		`;

			document.getElementById("recent-repos").innerHTML = recentRepos;
		});
};


//Copyright notice
const copyrightContent = () => {
	
	let content = `
	    <div class="container">
			<div class="row">
				<div class="col-md-6 col-sm-6">
					<p>Copyright &copy; 
						${new Date().getFullYear()} - ${SITE_NAME} - All Rights Reserved
					</p>
				</div>
				<div class="col-md-6 col-sm-6">
					<ul class="social-icons">`;
	
					SOCIAL_LINKS.forEach((social) => {
						content += `<li><a href="${social.link}" class="${social.icon}" aria-label="${social.description}" target="_blank"></a></li>`
					});

					content += `
					</ul>
				</div>
			</div>
		</div>
	`;
	return content;
};
 


//Site footer
const footerContent = () => {
	let content = `
	<div class="container">
			<div class="row">

				<div class="col-md-4 col-sm-6">
					<h3>${SITE_NAME}</h3>
					<p><i class="fa fa-envelope-o"></i> ${SITE_EMAIL}</p>
					<p><i class="fa fa-globe"></i> ${SITE_URL}</p>
				</div>

				<div class="col-md-4 col-sm-6">
					<h3>Menu</h3>
	`;

	SITE_LINKS.forEach((link) => {
		content += `<p><a href="${link.filename}">${link.shortName}</a></p>`;
	});

	content += `
	</div>

				<div class="col-md-4 col-sm-6">
					<h3>Useful Links</h3>
					<p><a href="https://start.spring.io/">Spring Initializer</a></p>
					<p><a href="https://adoptopenjdk.net/">AdoptOpenJDK</a></p>
					<p><a href="https://www.thymeleaf.org/">Thymeleaf</a></p>
				</div>

			</div>
		</div>`;
	
	return content;
};


/**
 * Runs when the user is scrolling the page and shows the "scroll to top" button if page is scrolled past a predefined limit
 */
window.onscroll = () => {
	const scrollLimit = 150;
	let scrollBtn = document.getElementById("scroll-btn");
	let chromiumTop = document.documentElement.scrollTop;
	let safariTop = document.body.scrollTop;
	scrollBtn.style.display = (chromiumTop > scrollLimit || safariTop > scrollLimit) ? "block" : "none";
};


/**
 * Returns to the top of the current page, using a smooth animation
 */
const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });


/**
 * Insert a construction banner with custom message
 * @param {*} parentId The id of the parent element for the banner to be inserted into
 * @param {*} message The message to be displayed by the construction banner
 */
const constructionBanner = (parentId, message) => {
	//Create a banner div with accessing class name
	const banner = document.createElement("div");
	banner.classList.add("construction-banner");

	//Set the banner message content 
	banner.innerHTML = message;

	//Add the banner to the page #home element
	document.getElementById(parentId).appendChild(banner);
}
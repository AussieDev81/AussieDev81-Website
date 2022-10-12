// Main navigation bar
const navContent = (page) => {
	return `
	    <div class="navbar navbar-default navbar-static-top" role="navigation">
			<div class="navbar-header">
				<button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span class="icon icon-bar"></span>
					<span class="icon icon-bar"></span>
					<span class="icon icon-bar"></span>
				</button>
				<a href="index.html" class="navbar-brand"><span>AussieDev81</span></a>
			</div>
			<div class="collapse navbar-collapse">
				<ul class="nav navbar-nav navbar-right">
					<li><a href="index.html" 	 ${page.toUpperCase() === "HOME" ? 'class="active"' : ""} 	   >HOME</a></li>
					<li><a href="about.html" 	 ${page.toUpperCase() === "ABOUT" ? 'class="active"' : ""}	   >ABOUT</a></li>
					<li><a href="portfolio.html" ${page.toUpperCase() === "PORTFOLIO" ? 'class="active"' : ""} >PORTFOLIO</a></li>
					<li><a href="contact.html" 	 ${page.toUpperCase() === "CONTACT" ? 'class="active"' : ""}   >CONTACT</a></li>
				</ul>
			</div>
		</div>
	`;
};

//Header banner section
const headerContent = () => {
	return `
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12"></div>
            </div>
        </div>
    `;
};

//Copyright notice
const copyrightContent = () => {
	return `
	    <div class="container">
			<div class="row">
				<div class="col-md-6 col-sm-6">
					<p>Copyright &copy; AussieDev81
						<script>document.write(new Date().getFullYear())</script> - All Rights Reserved
					</p>
				</div>
				<div class="col-md-6 col-sm-6">
					<ul class="social-icons">
						<li><a href="https://github.com/AussieDev81" class="fa-brands fa-github"></a></li>
						<li><a href="https://twitter.com/AussieDev81" class="fa-brands fa-twitter"></a></li>
						<li><a href="https://www.youtube.com/channel/UCfzYf3DeS6W2hpgXqniOjqQ"
								class="fa-brands fa-youtube"></a></li>
						<li><a href="https://discord.gg/vXus9NrC3P" class="fa-brands fa-discord"></a></li>
						<li><a href="mailto:info@aussiedev81.com&subject=Enquiry" class="fa fa-envelope"></a></li>
					</ul>
				</div>
			</div>
		</div>
	`;
};

//Site footer
const footerContent = () => {
	return `
	    <div class="container">
			<div class="row">

				<div class="col-md-4 col-sm-6">
					<h3>AussieDev81</h3>
					<p><i class="fa fa-envelope-o"></i> info@aussiedev81.com</p>
					<p><i class="fa fa-globe"></i> www.aussiedev81.com</p>
				</div>

				<div class="col-md-4 col-sm-6">
					<h3>Menu</h3>
					<p><a href="index.html">Home</a></p>
					<p><a href="about.html">About</a></p>
					<p><a href="portfolio.html">Portfolio</a></p>
					<p><a href="contact.html">Contact</a></p>
				</div>

				<div class="col-md-4 col-sm-6">
					<h3>Useful Links</h3>
					<p><a href="https://start.spring.io/">Spring Initializer</a></p>
					<p><a href="https://adoptopenjdk.net/">AdoptOpenJDK</a></p>
					<p><a href="https://www.thymeleaf.org/">Thymeleaf</a></p>
				</div>

			</div>
		</div>
	`;
};

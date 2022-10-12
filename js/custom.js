// NIVO LIGHTBOX
$("#portfolio a").nivoLightbox({
	effect: "fadeScale",
});

// HIDE MOBILE MENU AFTER CLICKING ON A LINK
$(".navbar-collapse a").click(function () {
	$(".navbar-collapse").collapse("hide");
});


const readme = () =>
	fetch("https://api.github.com/repos/AussieDev81/AussieDev81_Website/readme/dev", {
		accept: "application/vnd.github.html+json",
	})
		.then((response) => response.json())
		.then((data) => {
			// console.log(data); // Prints result from `response.json()` in getRequest
			// console.log(atob(data.content));
			document.getElementById("readme-block").innerHTML = atob(data.content);
		})
		.catch((error) => console.error(error));
		
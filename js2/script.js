



function changeMenuHover(source) {
	document.getElementById(source).style.color = "#154360";
}

function changeMenuOut(source) {
	document.getElementById(source).style.color = "";
}

function changeMenuClick(source) {
	if (source == "menuItem01") {
		window.open("http://skywilliams.site/mywork", "_self");
	} else if (source == "menuItem02") {
		window.open("http://skywilliams.site/resume", "_self");
	} else if (source == "menuItem03") {
		window.open("http://skywilliams.site/contact", "_self");
	}
}

function clickedTheImage(source) {
	window.open("http://skywilliams.site", "_self");
}

window.onload = function(){window.open("http://skywilliams.site", "_self");};
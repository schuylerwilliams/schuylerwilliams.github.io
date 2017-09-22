



function changeMenuHover(source) {
	document.getElementById(source).style.color = "#154360";
}

function changeMenuOut(source) {
	document.getElementById(source).style.color = "";
}

function changeMenuClick(source) {
	if (source == "menuItem01") {
		window.open("/mywork/", "_self");
	} else if (source == "menuItem02") {
		window.open("/resume/", "_self");
	} else if (source == "menuItem03") {
		window.open("/contact/", "_self");
	}
}

function clickedTheImage(source) {
	window.open("https://www.schuylerwilliams.github.io", "_self");
}
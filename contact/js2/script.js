



function changeMenuHover(source) {
	document.getElementById(source).style.color = "#154360";
}

function changeMenuOut(source) {
	document.getElementById(source).style.color = "";
}

function changeMenuClick(source) {
	if (source == "menuItem01") {
		window.open("https://schuylerwilliams.github.io/mywork/", "_self");
	} else if (source == "menuItem02") {
		window.open("https://schuylerwilliams.github.io/resume/", "_self");
	} else if (source == "menuItem03") {
		window.open("https://schuylerwilliams.github.io/contact/", "_self");
	}
}

function clickedTheImage(source) {
	window.open("https://schuylerwilliams.github.io", "_self");
}
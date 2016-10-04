
// array for buttons
var cityButtonArrayTwo = [
	document.getElementById("austinTwo"),
	document.getElementById("atlantaTwo"),
	document.getElementById("raleighTwo"),
	document.getElementById("clevelandTwo"),
	document.getElementById("tampaTwo"),
	document.getElementById("detroitTwo"),
	document.getElementById("bakersfieldTwo"),
	document.getElementById("denverTwo"),
	document.getElementById("baltimoreTwo"),
	document.getElementById("portlandTwo"),
	document.getElementById("indianapolisTwo"),
	document.getElementById("sanbernardinoTwo"),
	document.getElementById("newyorkTwo"),
	document.getElementById("tulsaTwo"),
	document.getElementById("omahaTwo"),
	document.getElementById("madisonTwo")
];

// array for buttons
var cityButtonArrayOne = [
	document.getElementById("austinOne"),
	document.getElementById("atlantaOne"),
	document.getElementById("raleighOne"),
	document.getElementById("clevelandOne"),
	document.getElementById("tampaOne"),
	document.getElementById("detroitOne"),
	document.getElementById("bakersfieldOne"),
	document.getElementById("denverOne"),
	document.getElementById("baltimoreOne"),
	document.getElementById("portlandOne"),
	document.getElementById("indianapolisOne"),
	document.getElementById("sanbernardinoOne"),
	document.getElementById("newyorkOne"),
	document.getElementById("tulsaOne"),
	document.getElementById("omahaOne"),
	document.getElementById("madisonOne")
];



// variables to keep track of clicked buttons
var clickedButtonTwo;
var clickedButtonPositionTwo;
var antipodeButtonTwo;
var cityButtonTwoControl = false;
var getCityLeft;

var clickedButtonOne;
var clickedButtonPositionOne;
var antipodeButtonOne;
var cityButtonOneControl = false;
var getCityRight;

var mousedButtonTwo;
var mousedButtonPositionTwo;
var antipodeMouseButtonTwo;
var mouseMultiplierTwo;

var mousedButtonOne;
var mousedButtonPositionOne;
var antipodeMouseButtonOne;
var mouseMultiplierOne;

// variables to control compare button activation
var compareControlTwo = false;
var compareControlOne = false;

var hoverAnimationControl = false;


// on left button click
function cityButtonTwoClicked(x) {
	compareControlTwo = true;
	
	// see if compare button should be unlocked
	compareMaster();
	// reset the last clicked button
	resetCityButtonTwo();
	
	clickedButtonTwo = document.getElementById(x);
	clickedButtonTwo.style.backgroundColor = "#ED4E21";
	clickedButtonPositionTwo = cityButtonArrayTwo.indexOf(clickedButtonTwo);
	antipodeButtonTwo = cityButtonArrayOne[clickedButtonPositionTwo];
	getCityLeft = cities[clickedButtonPositionTwo][0];
	
	//call function to change chart data
	chartDataTwo(clickedButtonPositionTwo);
	
	antipodeButtonTwo.style.opacity = "0.6";
	antipodeButtonTwo.style.cursor = "not-allowed";
	antipodeButtonTwo.disabled = true;
	cityButtonTwoControl = true;
	
};

// reset the button style
function resetCityButtonTwo() {
	if (cityButtonTwoControl == true) {
		antipodeButtonTwo.style.opacity = "1";
		antipodeButtonTwo.style.cursor = "pointer";
		antipodeButtonTwo.disabled = false;
		
		clickedButtonTwo.style.backgroundColor = "";
		
		//compareControlTwo = false;
		cityButtonTwoControl = false;
	} else{
		return;
	}
};


// on right button click
function cityButtonOneClicked(x) {
	compareControlOne = true;
	
	compareMaster();
	resetCityButtonOne();
	
	clickedButtonOne = document.getElementById(x);
	clickedButtonOne.style.backgroundColor = "#ED4E21";
	clickedButtonPositionOne = cityButtonArrayOne.indexOf(clickedButtonOne);
	antipodeButtonOne = cityButtonArrayTwo[clickedButtonPositionOne];
	getCityRight = cities[clickedButtonPositionOne][0];
	
	//call function to change chart data
	chartDataOne(clickedButtonPositionOne);
	
	antipodeButtonOne.style.opacity = "0.6";
	antipodeButtonOne.style.cursor = "not-allowed";
	antipodeButtonOne.disabled = true;
	cityButtonOneControl = true;
	
};

// reset the button style
function resetCityButtonOne() {
	if (cityButtonOneControl == true) {
		antipodeButtonOne.style.opacity = "1";
		antipodeButtonOne.style.cursor = "pointer";
		antipodeButtonOne.disabled = false;
		
		clickedButtonOne.style.backgroundColor = "";
		
		//compareControlOne = false;
		cityButtonOneControl = false;
	} else {
		return;
	}
};







// on mouse over left button
function cityButtonMouseOverTwo(x) {
	mousedButtonTwo = document.getElementById(x);
	
	mousedButtonPositionTwo = cityButtonArrayTwo.indexOf(mousedButtonTwo);
	
	antipodeMouseButtonTwo = id[mousedButtonPositionTwo];

	map.setPaintProperty(antipodeMouseButtonTwo, 'circle-radius', 50);
	map.setPaintProperty(antipodeMouseButtonTwo, 'circle-color', "#ED4E21");
	
};

// on mouse out left button
function cityButtonMouseOutTwo(x) {
	mouseMultiplierTwo = cities[mousedButtonPositionTwo][rangeInput.value];

	crunchData(mouseMultiplierTwo);
	
	map.setPaintProperty(antipodeMouseButtonTwo, 'circle-radius', scale);
	
	map.setPaintProperty(antipodeMouseButtonTwo, 'circle-color', symbolColor);
};


// on mouse over right button
function cityButtonMouseOverOne(x) {
	mousedButtonOne = document.getElementById(x);
	
	mousedButtonPositionOne = cityButtonArrayOne.indexOf(mousedButtonOne);
	
	antipodeMouseButtonOne = id[mousedButtonPositionOne];

	map.setPaintProperty(antipodeMouseButtonOne, 'circle-radius', 50);
	map.setPaintProperty(antipodeMouseButtonOne, 'circle-color', "#ED4E21");
	
};

// on mouse out left button
function cityButtonMouseOutOne(x) {
	mouseMultiplierOne = cities[mousedButtonPositionOne][rangeInput.value];

	crunchData(mouseMultiplierOne);
	
	map.setPaintProperty(antipodeMouseButtonOne, 'circle-radius', scale);
	
	map.setPaintProperty(antipodeMouseButtonOne, 'circle-color', symbolColor);
};




// function to unlock button
function compareMaster() {
	if (compareControlTwo == true && compareControlOne == true) {
		document.getElementById("compareButtonMaster").disabled = false;
		document.getElementById("compareButtonMaster").style.cursor = "pointer";
		document.getElementById("compareButtonMaster").style.opacity = "1";
	} else {
		return;
	}
};

function compareHoverMaster() {
	if (compareControlTwo == true && compareControlOne == true) {
		document.getElementById("compareButtonMaster").style.background = "#E8E57D";
		document.getElementById("compareButtonMaster").style.color = "black";
	} else {
		return;
	}
};

function compareHoverMasterEnd() {
	document.getElementById("compareButtonMaster").style.background = "";
	document.getElementById("compareButtonMaster").style.color = "";
}


var myTimer;
var sliderControl = 1;

// function for animation
function initiateAnimation() {
	if (hoverAnimationControl == false) {
		myTimer = setInterval(startAnimation, 1500);
		
		document.getElementById("playButton").style.background = "#E8E57D";
		hoverAnimationControl = true;
	} else {
		return;
	}
};

function startAnimation(x) {
	
	if (rangeInput.value == 1) {
		rangeInput.value = 2;
	} else if (rangeInput.value == 2) {
		rangeInput.value = 3;
	} else if (rangeInput.value == 3) {
		rangeInput.value = 4;
	} else if (rangeInput.value == 4) {
		rangeInput.value = 5;
	} else if (rangeInput.value == 5) {
		rangeInput.value = 6;
	} else if (rangeInput.value == 6) {
		rangeInput.value = 7;
	} else if (rangeInput.value == 7) {
		rangeInput.value = 8;
	} else if (rangeInput.value == 8) {
		rangeInput.value = 9;
	} else if (rangeInput.value == 9) {
		rangeInput.value = 10;
	} else if (rangeInput.value == 10) {
		rangeInput.value = 11;
	} else if (rangeInput.value == 11) {
		rangeInput.value = 12;
	} else if (rangeInput.value >= 12) {
		rangeInput.value = 1;
	}
	changeMapOnSlider();
	
};

function stopAnimation() {
	if (hoverAnimationControl == false) {
		alert("Animation is not running!");
	} else {
		window.clearInterval(myTimer);
		document.getElementById("playButton").style.background = "";
		document.getElementById("playButton").style.color = "";
		hoverAnimationControl = false;
	}
};


function changeMapOnSlider() {
	slider.innerHTML = sliderValues[rangeInput.value-1][1];
	// call startUpdate function to get values, used for changing scale and symbol
    startUpdate(rangeInput.value);
    // call determine data to determine attribute year, used for displaying data on page
    determineData(rangeInput.value);
};
	
	



	




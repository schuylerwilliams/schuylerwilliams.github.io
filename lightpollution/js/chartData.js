
var dataGraphTwo = [
	"two2001",
	"two2002",
	"two2003",
	"two2004",
	"two2005",
	"two2006",
	"two2007",
	"two2008",
	"two2009",
	"two2010",
	"two2011",
	"two2012"
];

var dataGraphOne = [
	"one2001",
	"one2002",
	"one2003",
	"one2004",
	"one2005",
	"one2006",
	"one2007",
	"one2008",
	"one2009",
	"one2010",
	"one2011",
	"one2012"
];

var chartLabelTwo = [
	"buttonLeftTwo2001",
	"buttonLeftTwo2002",
	"buttonLeftTwo2003",
	"buttonLeftTwo2004",
	"buttonLeftTwo2005",
	"buttonLeftTwo2006",
	"buttonLeftTwo2007",
	"buttonLeftTwo2008",
	"buttonLeftTwo2009",
	"buttonLeftTwo2010",
	"buttonLeftTwo2011",
	"buttonLeftTwo2012"
];
	
var chartLabelOne = [
	"buttonRightOne2001",
	"buttonRightOne2002",
	"buttonRightOne2003",
	"buttonRightOne2004",
	"buttonRightOne2005",
	"buttonRightOne2006",
	"buttonRightOne2007",
	"buttonRightOne2008",
	"buttonRightOne2009",
	"buttonRightOne2010",
	"buttonRightOne2011",
	"buttonRightOne2012"
];

var chartLabelYear = [
	"buttonYear2001",
	"buttonYear2002",
	"buttonYear2003",
	"buttonYear2004",
	"buttonYear2005",
	"buttonYear2006",
	"buttonYear2007",
	"buttonYear2008",
	"buttonYear2009",
	"buttonYear2010",
	"buttonYear2011",
	"buttonYear2012"
];

var setDataGraphTwo;
var setDataGraphTwoMult;
var setDataGraphTwoString;
var setDataGraphTwoRounded;

var setDataGraphOne;
var setDataGraphOneMult;
var setDataGraphOneString;
var setDataGraphOneRounded;


var buttonYearHolder;
var buttonYearHolderPosition;
var yearHighlightTwo = " ";
var yearHighlightOne = " ";


function chartDataTwo(x) {
	for (i=1; i <= 12; i++) {
		setDataGraphTwo = cities[x][i];
		
		if (setDataGraphTwo > 0) {
			setDataGraphTwoMult = setDataGraphTwo * 1.5;
			document.getElementById(dataGraphTwo[i-1]).style.background = 'rgba(255,247,0,1)';
		} else if (setDataGraphTwo < 0) {
			setDataGraphTwoMult = (setDataGraphTwo * -1) * 1.5;
			document.getElementById(dataGraphTwo[i-1]).style.background = 'rgba(0,192,255,1)';
		}
		
		setDataGraphTwoString = setDataGraphTwoMult.toString();
		
		setDataGraphTwoRounded = setDataGraphTwo.toFixed(1);
		
			
		document.getElementById(dataGraphTwo[i-1]).style.width = setDataGraphTwoString + "%";
		
		document.getElementById("boxTwoCityLeft").innerHTML = getCityLeft + ": ";
	}
};



function chartDataOne(x) {
	for (i=1; i <= 12; i++) {
		setDataGraphOne = cities[x][i];
		
		if (setDataGraphOne > 0) {
			setDataGraphOneMult = setDataGraphOne * 1.5;
			document.getElementById(dataGraphOne[i-1]).style.background = 'rgba(255,247,0,1)';
		} else if (setDataGraphOne < 0) {
			setDataGraphOneMult = (setDataGraphOne * -1) * 1.5;
			document.getElementById(dataGraphOne[i-1]).style.background = 'rgba(0,192,255,1)';
		}
		
		setDataGraphOneString = setDataGraphOneMult.toString();
		
		setDataGraphOneRounded = setDataGraphOne.toFixed(1);
		
			
		document.getElementById(dataGraphOne[i-1]).style.width = setDataGraphOneString + "%";
		
		document.getElementById("boxOneCityRight").innerHTML = getCityRight + ": ";
	}
};









function buttonYearMouseOver(x) {
	buttonYearHolder = document.getElementById(x);
	
	buttonYearHolderPosition = chartLabelYear.indexOf(x);
	
	yearHighlightTwo = cities[clickedButtonPositionTwo][buttonYearHolderPosition+1];
	yearHighlightOne = cities[clickedButtonPositionOne][buttonYearHolderPosition+1];
	
	changeYearLeftTwo();
	changeYearRightOne();


	buttonYearHolder.style.backgroundColor = "#ED4E21";
	/*buttonYearHolder.style.color = "white";*/
	buttonYearHolder.style.fontSize = "17px";

};

function buttonYearMouseOut(x) {
	buttonYearHolder.style.backgroundColor = "";
	/*buttonYearHolder.style.color = "";*/
	buttonYearHolder.style.fontSize = "";
};

function changeYearLeftTwo() {
	document.getElementById("boxTwoCityLeft").innerHTML = getCityLeft + ": " + yearHighlightTwo;
};

function changeYearRightOne() {
	document.getElementById("boxOneCityRight").innerHTML = getCityRight + ": " + yearHighlightOne;
};
	

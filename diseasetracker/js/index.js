



var myBlockArr = [
	['sideBlock02', 'measlesPage', 'measlesPageClose', 'Measles'],
	['sideBlock03', 'mumpsPage', 'mumpsPageClose', 'Mumps'],
	['sideBlock04', 'rubellaPage', 'rubellaPageClose', 'Rubella'],
	['sideBlock05', 'hepatitisPage', 'hepatitisPageClose', 'Hepatitis (B,C,A)'],
	['sideBlock06', 'tuberculosisPage', 'tuberculosisPageClose', 'Tuberculosis'],
	['sideBlock07', 'hivPage', 'hivPageClose', 'HIV/AIDS'],
	['sideBlock08', 'ebolaPage', 'ebolaPageClose', 'Ebola'],
	['sideBlock09', 'sarsPage', 'sarsPageClose', 'SARS'],
	['sideBlock10', 'zikaPage', 'zikaPageClose', 'Zika'],
	['sideBlock11', 'yellowFeverPage', 'yellowFeverPageClose', 'Yellow Fever'],
	['sideBlock12', 'lymePage', 'lymePageClose', 'Lyme Disease'],
	['sideBlock13', 'hantaPage', 'hantaPageClose', 'Hanta Virus'],
	['sideBlock14', 'westNilePage', 'westNilePageClose', 'West Nile'],
	['sideBlock15', 'avianPage', 'avianPageClose', 'Avian Influenza (H5N1)'],
	['sideBlock16', 'swinePage', 'swinePageClose', 'Swine Influenza (H1N1)'],
	['sideBlock17', 'polioPage', 'polioPageClose', 'Polio'],
	['sideBlock18', 'meningitisPage', 'meningitisPageClose', 'Meningitis'],
	['sideBlock19', 'null', 'null', 'Symptoms (unconfirmed)'],
	['sideBlock20', 'null', 'null', 'Case (confirmed)'],
	['sideBlock21', 'null', 'null', 'Mortality'],
	['sideBlock22', 'null', 'null', 'Civilian'],
	['sideBlock23', 'null', 'null', 'Healthcare Worker'],
	['sideBlock24', 'null', 'null', 'Laboratory Report'],
	['sideBlock25', 'null', 'null', 'Other'],
	['sideBlock26', 'null', 'null', 'All'],
	['sideBlock27', 'null', 'null', null]
]

var queryReference = null;
var queryReference2 = null;
var queryReference3 = null;

var notQuery = false;

function queryThePost() {
	console.log(queryReference);
	console.log(queryReference2);
	console.log(queryReference3);
	$.ajax({
		url: 'js/queryReport.php',
		type: 'POST',
		dataType: 'json',
		data: {tab_id: "1", disease_type: queryReference, outcome_type: queryReference2, report_type: queryReference3},
		success: function(reports) {
			mapInitialization(reports);
		},
		error: function(xhr, status, error) {
			console.log(error);
			alert("An AJAX error occured: " + status + "\nError: " + error);
		}
	});
	/*
	if (queryReference2 == "All") {
		console.log("queryReference2");
		$.ajax({
			url: 'js/queryReport.php',
			type: 'POST',
			dataType: 'json',
			data: {disease_type: queryReference, report_type: queryReference3},
			success: function(reports) {
				mapInitialization(reports);
			},
			error: function(xhr, status, error, reports) {
				console.log(error);
				alert("An AJAX error occured: " + status + "\nError: " + error);
			}
		});
	} else if (queryReference3 == "All") {
		console.log("queryReference3");
		$.ajax({
			url: 'js/queryReport.php',
			type: 'POST',
			dataType: 'json',
			data: {disease_type: queryReference, outcome_type: queryReference2},
			success: function(reports) {
				mapInitialization(reports);
			},
			error: function(xhr, status, error) {
				console.log(error);
				alert("An AJAX error occured: " + status + "\nError: " + error);
			}
		});
	} else if (queryReference == "All") {
		console.log("queryReference");
		$.ajax({
			url: 'js/queryReport.php',
			type: 'POST',
			dataType: 'json',
			data: {outcome_type: queryReference2, report_type: queryReference3},
			success: function(reports) {
				mapInitialization(reports);
			},
			error: function(xhr, status, error) {
				console.log(error);
				alert("An AJAX error occured: " + status + "\nError: " + error);
			}
		});
	} else {
		console.log("else");
		$.ajax({
			url: 'js/queryReport.php',
			type: 'POST',
			dataType: 'json',
			data: {tab_id: "1", disease_type: queryReference, outcome_type: queryReference2, report_type: queryReference3},
			success: function(reports) {
				mapInitialization(reports);
			},
			error: function(xhr, status, error) {
				console.log(error);
				alert("An AJAX error occured: " + status + "\nError: " + error);
			}
		});
	}
	*/
}

function queryThePostAll() {
	console.log("All");
	$.ajax({
		url: 'js/queryReport.php',
		type: 'POST',
		dataType: 'json',
		data: {tab_id: "1", disease_type: queryReference},
		success: function(reports) {
			mapInitialization(reports);
		},
		error: function(xhr, status, error) {
			console.log(error);
			alert("An AJAX error occured: " + status + "\nError: " + error);
		}
	});
}







var lastClickedBlock;
function highlightBlock(source) {
	// on click block
	// reset highlight of last clicked block
	// highlight new block
	var pageReference;
	try {
		lastClickedBlock.style.background = "#D4E6F1";
		lastClickedBlock.style.color = "black";
	} catch (e) {
		
	}
	lastClickedBlock = document.getElementById(source);
	lastClickedBlock.style.background = "#1F618D";
	lastClickedBlock.style.color = "white";
	
	var i;
	for (i=0; i < myBlockArr.length; i++) {
		if (myBlockArr[i][0] == source) {
			
			queryReference = myBlockArr[i][3];
			var textChange = document.getElementById("firstPanelText");
			//textChange.innerHTML = queryReference;
			notQuery = true;
			
			if (queryReference2 == "All" && queryReference3 == "All") {
				queryThePostAll();
			} else {
				queryThePost();
			}
		}
	}
}

var lastClickedBlock2;
function highlightBlock2(source) {
	// on click block
	// reset highlight of last clicked block
	// highlight new block
	var pageReference;
	try {
		lastClickedBlock2.style.background = "#D4E6F1";
		lastClickedBlock2.style.color = "black";
	} catch (e) {
		
	}
	lastClickedBlock2 = document.getElementById(source);
	lastClickedBlock2.style.background = "#1F618D";
	lastClickedBlock2.style.color = "white";
	
	var i;
	for (i=0; i < myBlockArr.length; i++) {
		if (myBlockArr[i][0] == source) {
			
			queryReference2 = myBlockArr[i][3];
			
			var textChange = document.getElementById("secondPanelText");
			//textChange.innerHTML = queryReference2;
			
			if (queryReference2 == "All" && queryReference3 == "All") {
				queryThePostAll();
			} else {
				queryThePost();
			}
		}
	}
}

var lastClickedBlock3;
function highlightBlock3(source) {
	// on click block
	// reset highlight of last clicked block
	// highlight new block
	var pageReference;
	try {
		lastClickedBlock3.style.background = "#D4E6F1";
		lastClickedBlock3.style.color = "black";
	} catch (e) {
		
	}
	lastClickedBlock3 = document.getElementById(source);
	lastClickedBlock3.style.background = "#1F618D";
	lastClickedBlock3.style.color = "white";
	
	var i;
	for (i=0; i < myBlockArr.length; i++) {
		if (myBlockArr[i][0] == source) {
			
			queryReference3 = myBlockArr[i][3];
			var textChange = document.getElementById("thirdPanelText");
			//textChange.innerHTML = queryReference3;
			
			if (queryReference2 == "All" && queryReference3 == "All") {
				queryThePostAll();
			} else {
				queryThePost();
			}
		}
	}
}

function mouseoverBlock(source) {
	var mouseoverBlock = document.getElementById(source);
	mouseoverBlock.style.background = "#1F618D";
	mouseoverBlock.style.color = "white";
}

function mouseoutBlock(source) {
	var mouseoutBlock = document.getElementById(source);
	if (lastClickedBlock != mouseoutBlock) {
		mouseoutBlock.style.background = "#D4E6F1";
		mouseoutBlock.style.color = "black"
	}
}

function mouseoutBlock2(source) {
	var mouseoutBlock = document.getElementById(source);
	if (lastClickedBlock2 != mouseoutBlock) {
		mouseoutBlock.style.background = "#D4E6F1";
		mouseoutBlock.style.color = "black"
	}
}

function mouseoutBlock3(source) {
	var mouseoutBlock = document.getElementById(source);
	if (lastClickedBlock3 != mouseoutBlock) {
		mouseoutBlock.style.background = "#D4E6F1";
		mouseoutBlock.style.color = "black"
	}
}

function showFilterPanel01() {
	var showPanel = document.getElementById("filterPanel01");
	var active = showPanel.classList.contains('panelActive');
	
	// hide unwanted panels
	var firstCheck = document.getElementById("filterPanel02");
	var secondCheck = document.getElementById("filterPanel03");
	try {
		firstCheck.classList.remove('panelActive');
		firstCheck.classList.add('panelHidden');
	} catch(e){}
	try {
		secondCheck.classList.remove('panelActive');
		secondCheck.classList.add('panelHidden');
	} catch(e){}
	
	var thirdCheck = document.getElementById("createReportPanel");
	var thirdCheckActive = thirdCheck.classList.contains('active');
	if (thirdCheckActive == true) {
		thirdCheck.style.visibility = "hidden";
		thirdCheck.classList.remove('active');
		document.getElementById("myImportBlock").style.background = "#5499C7";
	}
	
	if (active == true) {
		showPanel.classList.remove('panelActive');
		showPanel.classList.add('panelHidden');
	} else if (active == false) {
		showPanel.classList.remove('panelHidden');
		showPanel.classList.add('panelActive');
	}
}

function showFilterPanel02() {
	var showPanel = document.getElementById("filterPanel02");
	var active = showPanel.classList.contains('panelActive');
	
	// hide unwanted panels
	var firstCheck = document.getElementById("filterPanel01");
	var secondCheck = document.getElementById("filterPanel03");
	try {
		firstCheck.classList.remove('panelActive');
		firstCheck.classList.add('panelHidden');
	} catch(e){}
	try {
		secondCheck.classList.remove('panelActive');
		secondCheck.classList.add('panelHidden');
	} catch(e){}
	
	var thirdCheck = document.getElementById("createReportPanel");
	var thirdCheckActive = thirdCheck.classList.contains('active');
	if (thirdCheckActive == true) {
		thirdCheck.style.visibility = "hidden";
		thirdCheck.classList.remove('active');
		document.getElementById("myImportBlock").style.background = "#5499C7";
	}
	
	if (active == true) {
		showPanel.classList.remove('panelActive');
		showPanel.classList.add('panelHidden');
	} else if (active == false) {
		showPanel.classList.remove('panelHidden');
		showPanel.classList.add('panelActive');
	}
}

function showFilterPanel03() {
	// reference our wanted panel
	var showPanel = document.getElementById("filterPanel03");
	var active = showPanel.classList.contains('panelActive');
	
	// hide unwanted panels
	var firstCheck = document.getElementById("filterPanel01");
	var secondCheck = document.getElementById("filterPanel02");
	try {
		firstCheck.classList.remove('panelActive');
		firstCheck.classList.add('panelHidden');
	} catch(e){}
	try {
		secondCheck.classList.remove('panelActive');
		secondCheck.classList.add('panelHidden');
	} catch(e){}
	
	var thirdCheck = document.getElementById("createReportPanel");
	var thirdCheckActive = thirdCheck.classList.contains('active');
	if (thirdCheckActive == true) {
		thirdCheck.style.visibility = "hidden";
		thirdCheck.classList.remove('active');
		document.getElementById("myImportBlock").style.background = "#5499C7";
	}
	
	if (active == true) {
		showPanel.classList.remove('panelActive');
		showPanel.classList.add('panelHidden');
	} else if (active == false) {
		showPanel.classList.remove('panelHidden');
		showPanel.classList.add('panelActive');
	}
}

function hideFilterPanel(source) {
	var closer;
	
	if (source == "filterPanel01Toggle") {
		closer = document.getElementById("filterPanel01");
	} else if (source == "filterPanel02Toggle") {
		closer = document.getElementById("filterPanel02");
	} else if (source == "filterPanel03Toggle") {
		closer = document.getElementById("filterPanel03");
	}
	
	closer.classList.remove('panelActive');
	closer.classList.add('panelHidden');
}


function closeReportPanel(source) {
	var reportPanel = document.getElementById("createReportPanel");
	var circle = document.getElementById("myImportBlock");
	var active = reportPanel.classList.contains('active');
	
	if (active == true) {
		reportPanel.style.visibility = "hidden";
		reportPanel.classList.remove('active');
		circle.style.background = "#5499C7";
	} else if (active == false) {
		reportPanel.style.visibility = "visible";
		reportPanel.classList.add('active');
		circle.style.background = "#1A5276";
		
		// hide unwanted panels
		var firstCheck = document.getElementById("filterPanel01");
		var secondCheck = document.getElementById("filterPanel03");
		var thirdCheck = document.getElementById("filterPanel02");
		try {
			firstCheck.classList.remove('panelActive');
			firstCheck.classList.add('panelHidden');
		} catch(e){}
		try {
			secondCheck.classList.remove('panelActive');
			secondCheck.classList.add('panelHidden');
		} catch(e){}
		try {
			thirdCheck.classList.remove('panelActive');
			thirdCheck.classList.add('panelHidden');
		} catch(e) {}
	}
}



function closeFilterBox(source) {
	var filterBox = document.getElementById("filterBlock01");
	var circle = document.getElementById(source);
	var active = circle.classList.contains('active');
	
	if (active == true) {
		filterBox.style.visibility = "hidden";
		circle.classList.remove('active');
		circle.style.background = "#5499C7";
		
		// hide unwanted panels
		var firstCheck = document.getElementById("filterPanel01");
		var secondCheck = document.getElementById("filterPanel03");
		var thirdCheck = document.getElementById("filterPanel02");
		try {
			firstCheck.classList.remove('panelActive');
			firstCheck.classList.add('panelHidden');
		} catch(e){}
		try {
			secondCheck.classList.remove('panelActive');
			secondCheck.classList.add('panelHidden');
		} catch(e){}
		try {
			thirdCheck.classList.remove('panelActive');
			thirdCheck.classList.add('panelHidden');
		} catch(e) {}
		
	} else if (active == false) {
		filterBox.style.visibility = "visible";
		circle.classList.add('active');
		circle.style.background = "#1A5276";
	}
}



function closeSearchBox(source) {
	var searchBox = document.getElementById("searchPanel");
	var active = searchBox.classList.contains('active');
	var circle = document.getElementById(source);
	
	if (active == true) {
		searchBox.style.visibility = "hidden";
		searchBox.classList.remove('active');
		circle.style.background = "#5499C7";
	} else if (active == false) {
		searchBox.style.visibility = "visible";
		searchBox.classList.add('active');
		circle.style.background = "#1A5276";
	}
	
}


/*
function doMapWidth() {
	var windowWidth = $(window).width();
	var menuWidth = $('#mainMenu').width();
	var theWidth = windowWidth - menuWidth;
	var newWidth = theWidth + "px";
	$('#mapBlock').css("width", newWidth);
	console.log(windowWidth);
};
doMapWidth();

$(window).resize(function(){
	doMapWidth();
});
*/










function closeMyPage(source) {
	var i;
	for (i=0; i < myBlockArr.length; i++) {
		if (myBlockArr[i][2] == source) {
			var closer = document.getElementById(myBlockArr[i][1]);
			closer.style.opacity = "0";
			closer.style.visibility = "hidden";
			
			var closer2 = document.getElementById(myBlockArr[i][0]);
			closer2.style.background = "#F5B7B1";
			closer2.style.color = "black";
			lastClickedBlock = "";
		}
	}
	
	deleteMarkers();
}
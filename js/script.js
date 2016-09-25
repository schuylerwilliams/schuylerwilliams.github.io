

function changeBoxBackground(id) {
	document.getElementById(id).style.background = "#2471A3";
}

function outBoxBackground(id) {
	document.getElementById(id).style.background = "";
}

function clickBoxBackground(id) {

	if (id == "boxOne") {
		history.pushState("boxOne", "boxOne", "index.html");
		document.getElementById(id).style.width = "100%";
		document.getElementById(id).style.height = "100vh";
		document.getElementById(id).style.border = "0px solid transparent";
		
		document.getElementById("boxTwo").style.width = "0px";
		document.getElementById("boxThree").style.width = "0px";
		document.getElementById("boxFour").style.width = "0px";
		
		document.getElementById("boxTwo").style.height = "0px";
		document.getElementById("boxThree").style.height = "0px";
		document.getElementById("boxFour").style.height = "0px";
		
		document.getElementById("boxTwo").innerHTML = "";
		document.getElementById("boxThree").innerHTML = "";
		document.getElementById("boxFour").innerHTML = "";
		
		document.getElementById("boxTwo").style.border = "0px solid transparent";
		document.getElementById("boxThree").style.border = "0px solid transparent";
		document.getElementById("boxFour").style.border = "0px solid transparent";
		
		var node = document.createElement("DIV");                
		var textnode = document.createTextNode("Hello World!");         
		node.appendChild(textnode);                             
		node.setAttribute("id", "testDiv");
		document.getElementById("myBody").appendChild(node);
	
	} else if (id=="boxTwo") {
		history.pushState("boxTwo", "boxTwo", "index.html");
		document.getElementById(id).style.width = "100%";
		document.getElementById(id).style.height = "100vh";
		document.getElementById(id).style.border = "0px solid transparent";
		document.getElementById(id).style.top = "0";
		
		document.getElementById("boxOne").style.width = "0px";
		document.getElementById("boxThree").style.width = "0px";
		document.getElementById("boxFour").style.width = "0px";
		
		document.getElementById("boxOne").style.height = "0px";
		document.getElementById("boxThree").style.height = "0px";
		document.getElementById("boxFour").style.height = "0px";
		
		document.getElementById("boxOne").innerHTML = "";
		document.getElementById("boxThree").innerHTML = "";
		document.getElementById("boxFour").innerHTML = "";
		
		document.getElementById("boxOne").style.border = "0px solid transparent";
		document.getElementById("boxThree").style.border = "0px solid transparent";
		document.getElementById("boxFour").style.border = "0px solid transparent";
	} else if (id== "boxThree") {
		history.pushState("boxThree", "boxThree", "index.html");
		document.getElementById(id).style.width = "100%";
		document.getElementById(id).style.height = "100vh";
		document.getElementById(id).style.border = "0px solid transparent";
		
		document.getElementById("boxTwo").style.width = "0px";
		document.getElementById("boxOne").style.width = "0px";
		document.getElementById("boxFour").style.width = "0px";
		
		document.getElementById("boxTwo").style.height = "0px";
		document.getElementById("boxOne").style.height = "0px";
		document.getElementById("boxFour").style.height = "0px";
		
		document.getElementById("boxTwo").innerHTML = "";
		document.getElementById("boxOne").innerHTML = "";
		document.getElementById("boxFour").innerHTML = "";
		
		document.getElementById("boxTwo").style.border = "0px solid transparent";
		document.getElementById("boxOne").style.border = "0px solid transparent";
		document.getElementById("boxFour").style.border = "0px solid transparent";
	} else if (id== "boxFour") {
		history.pushState("boxFour", "boxFour", "index.html");
		document.getElementById(id).style.width = "100%";
		document.getElementById(id).style.height = "100vh";
		document.getElementById(id).style.border = "0px solid transparent";
		document.getElementById(id).style.top = "0";
		
		document.getElementById("boxTwo").style.width = "0px";
		document.getElementById("boxThree").style.width = "0px";
		document.getElementById("boxOne").style.width = "0px";
		
		document.getElementById("boxTwo").style.height = "0px";
		document.getElementById("boxThree").style.height = "0px";
		document.getElementById("boxOne").style.height = "0px";
		
		document.getElementById("boxTwo").innerHTML = "";
		document.getElementById("boxThree").innerHTML = "";
		document.getElementById("boxOne").innerHTML = "";
		
		document.getElementById("boxTwo").style.border = "0px solid transparent";
		document.getElementById("boxThree").style.border = "0px solid transparent";
		document.getElementById("boxOne").style.border = "0px solid transparent";
	}


}
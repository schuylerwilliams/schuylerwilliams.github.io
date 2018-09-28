

$(document).ready(function() {

	/*
    $('.single-item').slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: false,
        draggable: true,
        arrows: false,
        pauseOnFocus: true,
        pauseOnHover: true,
        speed: 300,
        swipe: true,
        touchMove: true,
    });
    */
    
    //$("#svg2").attr("width", window.innerWidth);
    //$("#svg2").attr("height", window.innerHeight);
    
    $.fn.extend({
    	animateCss: function (animationName) {
        	var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        	this.addClass('animated ' + animationName).one(animationEnd, function() {
            	$(this).removeClass('animated ' + animationName);
        	});
        	return this;
    	}
	});
	
	/*
	$('#myWrapperLogin').css("visibility", "visible");
	$('#myWrapperLogin').animateCss('bounceInUp');
	*/
	
	/*
	setTimeout(function(){
    	$('#myLoginBackground').css("visibility", "visible");
    	$('#myLoginBackground').animateCss('zoomIn');
	}, 1250);
	*/
	
	var homePage = document.getElementById("backgroundPage");
	
	setInterval(function() {
		//var markerCount = Math.floor(Math.random() * 11) + 2;
		var paras = document.getElementsByClassName('gonnaRemove');
		
		var m;
		for (m=0; m < paras.length; m++) {
			try {
				$(paras[m]).animateCss("bounceOut");
			} catch (err) {
			
			}
		}
		
		setTimeout(function() {
			try {
				while (paras[0]) {
					paras[0].parentNode.removeChild(paras[0]);
				}
			} catch (err) {
		
			}
		}, 500);
	
	
	
		setTimeout(function() {
			createRandomMarker();
		}, 1000);
	}, 5000);
	
	
	function createRandomMarker() {
		var markerCount = Math.floor(Math.random() * 11) + 2;
		var i;
		for (i=0; i <= markerCount; i++) {
		
			var randomX = Math.floor(Math.random() * 80) + 10;
			var randomY = Math.floor(Math.random() * 80) + 10;
		
			var randomXstring = randomX.toString();
			var randomYstring = randomY.toString();
		
			var randomLeft = randomXstring + "%";
			var randomTop = randomYstring + "%";
		
			var box = document.createElement("div");
			box.classList.add("gonnaRemove");
			box.classList.add("specialIcons");
			box.classList.add("specialBoxes");
			$(box).html("<i class='material-icons'>place</i>");
			$(box).css({
				"top": randomTop,
				"left": randomLeft
			});
			homePage.appendChild(box);
			$(box).animateCss("bounceIn");
		}
	};
	
	createRandomMarker();

});

$(window).resize(function() {
    //$("#svg2").attr("width", window.innerWidth);
    //$("#svg2").attr("height", window.innerHeight);
});

/*
// Initialize Firebase
var config = {
	apiKey: "AIzaSyAnbODzHrh6lFX06xkgEFp0J2AmP9LpUto",
    authDomain: "ventbliss.firebaseapp.com",
    databaseURL: "https://ventbliss.firebaseio.com",
    projectId: "ventbliss",
    storageBucket: "ventbliss.appspot.com",
    messagingSenderId: "203674889995"
};
firebase.initializeApp(config);
  	
//get elements
const txtEmailLog = document.getElementById('emailLog');
const txtEmailSign = document.getElementById('emailSign');
const txtPasswordLog = document.getElementById('passwordLog');
const txtPasswordSign = document.getElementById('passwordSign');
const btnLogin = document.getElementById('logInButton');
const btnSignUp = document.getElementById('signUpButton');
const anonLogin = document.getElementById('anonLogin');
  	
  	
var anonIn = false;
$("form#locationSearchForm").submit(function(e) {
	e.preventDefault();
	var locationSearch = $("#locationSearch").val();
		
	anonIn = true;
});
  	
var loggedIn = false;
// add login event
btnLogin.addEventListener('click', e => {
	e.preventDefault();
  	// get email and pass
  	loggedIn = true;
  	const email = txtEmailLog.value;
  	const pass = txtPasswordLog.value;
  	const auth = firebase.auth();
  	// sign in
  	const promise = auth.signInWithEmailAndPassword(email, pass);
  	promise.catch(e => console.log(e.message));
});
  	
var signedUp = false;
// add signup event
btnSignUp.addEventListener('click', e => {
	e.preventDefault();
  	// get email and pass
  	// TODO: Check for real email
  	signedUp = true;
  	const email = txtEmailSign.value;
  	const pass = txtPasswordSign.value;
  	const auth = firebase.auth();
  	// sign in
  	const promise = auth.createUserWithEmailAndPassword(email, pass);
  	promise.catch(e => console.log(e.message));
  	signedUp = true;
});


*/
  	
// sign out event
/*
btnLogout.addEventListener('click', e => {
	firebase.auth().signOut();
});
*/
  	
// add a realtime listener
  	
/*
firebase.auth().onAuthStateChanged(user => {
	if(user) {
  		if (user.isAnonymous == true) {
  			// open anonymous map page
  			console.log('user is anonymous!');
  				
  		} else {
  			if (signedUp == true) {
  				console.log(user);
  				var tempUserId = user.uid;
  				var tempUserEmail = user.email;
  				writeUserData(tempUserId, tempUserEmail);
  			
  				window.open("../businessWelcome", "_self");
  			} else if (loggedIn == true) {
  				window.open("../businessWelcome", "_self");
  			} else {
  				// open logged in home page
  				window.open("../businessLoggedIn", "_self");
  			}
  		}
  	} else {
  		console.log('not logged in');
  	}
});
  	
  	
// get firebase database
var database = firebase.database();
  	
// create a new user
function writeUserData(userId, email) {
  		
	database.ref('users/' + userId).set({
    	email: email,
    	lat: 0,
    	lng: 0,
    	isbusiness: "false"
  	});
};

*/

new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
      labels: ["Profit", "Management Fee", "Profit Fee"],
      datasets: [
        {
          label: "Label!",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
          data: [2478,5267,734]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: false,
        text: 'Predicted world population (millions) in 2050'
      },
      layout: {
      	padding: {
      		left: 0,
      		right: 25,
      		top: 0,
      		bottom: 0
      	}
      },
      legend: {
      	display: false
      },
      scales: {
      	xAxes: [{
      		gridLines: {
      			display: false
      		}
      	}],
      	yAxes: [{
      		gridLines: {
      			display: false
      		}
      	}]
      }
    }
});


new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
    labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct"],
    datasets: [{ 
        data: [86,114,106,106,107,111,133,221,783,2478],
        label: "Growth",
        borderColor: "#3e95cd",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: false,
      text: 'World population per region (in millions)'
    },
    layout: {
    	padding: {
    		left: 0,
    		right: 25,
    		top: 0,
    		bottom: 0
    	}
    },
    legend: {
    	display: false
    },
    scales: {
    	xAxes: [{
    		gridLines: {
    			display: false
    		}
    	}],
    	yAxes: [{
    		gridLines: {
    			display: false
    		}
    	}]
    }
  }
});








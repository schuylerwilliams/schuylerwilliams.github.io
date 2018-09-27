

$(document).ready(function() {
  	
  	
  	
  	
  	
  	
  	
  	
  	
	
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
  	
  	
var anonIn = false;
$("form#locationSearchForm").submit(function(e) {
	e.preventDefault();
	var locationSearch = $("#locationSearch").val();
		
	anonIn = true;
	/*
	firebase.auth().signInAnonymously().catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		// ...
	});
	*/
});
  	
  	
  	
// sign out event
/*
btnLogout.addEventListener('click', e => {
	firebase.auth().signOut();
});
*/
  	
// add a realtime listener
firebase.auth().onAuthStateChanged(user => {
	if(user) {
  		if (user.isAnonymous == true) {
  			// open anonymous map page
  			console.log('user is anonymous!');
  				
  		} else {
  			console.log('user');
  		}
  	} else {
  		console.log('not logged in');
  		window.open("../index.html", "_self");
  	}
});


function moveToMap() {
	window.open("../businessWelcome/", "_self");
};


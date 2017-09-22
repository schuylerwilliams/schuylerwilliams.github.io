
$(document).ready(function() {
 
  var owl = $("#owl-demo");
 
  owl.owlCarousel({
      items : 1, //1 items above 1000px browser width
      itemsDesktop : [1000,1], //3 items between 1000px and 901px
      itemsDesktopSmall : [900,1], // betweem 900px and 601px
      itemsTablet: [600,1], //2 items between 600 and 0
      itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
  });
  
  // Custom Navigation Events
	$(".next").click(function(){
		owl.trigger('owl.next');
	})
	$(".prev").click(function(){
		owl.trigger('owl.prev');
	})
  
	$('.link').on('click', function(event){
    	var $this = $(this);
    	/*
    	if($this.hasClass('clicked')){
      	$this.removeAttr('style').removeClass('clicked');
    	} else{
      	$this.css('background','#7fc242').addClass('clicked');
    	}
    	*/
  	});
  
  $('[data-toggle="tooltip"]').tooltip();
});

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





function openMyModal(source) {
	
	if (source == "modal01") {
		var placeholder = document.getElementById("testModal01");
		
		placeholder.style.background = "orange";
		
	} else {
	
	}

};




function workHover(num, which) {
	var theClass = "myText" + num;
	var theText = document.getElementsByClassName(theClass);
	var textLength = theText.length;
	var getTheImage = "myImage" + num;
	var theImage = document.getElementById(getTheImage);
	
	if (which == 0) {
		theImage.style.opacity = ".2";
		var i;
		for (i=0; i < textLength; i++) {
			theText[i].classList.remove('hideText');
			theText[i].classList.add('displayText');
		}
	} else if (which == 1) {
		theImage.style.opacity = "1";
		var i;
		for (i=0; i < textLength; i++) {
			theText[i].classList.remove('displayText');
			theText[i].classList.add('hideText');
		}
	}
};

function workClick(num) {
	if (num == 1) {
		window.open("https://schuylerwilliams.github.io/lightpollution/");
	} else if (num == 2) {

	} else if (num == 3) {
		window.open("https://coastmapdevelop.github.io/greatlakes/");
	} else if (num == 4) {
		window.open("https://schuylerwilliams.github.io/mywork//Module_10/");
	} else if (num == 5) {
		window.open("http://crisisplotter.xyz/");
	} else if (num == 6) {
		window.open("https://schuylerwilliams.github.io/mywork/economic-geographer-575/");
	} else if (num == 7) {
		window.open("https://trainsg565.github.io");
	} else if (num == 8) {
		window.open("https://bordnerlab.github.io/videopresentation/");
	}
};







$(document).ready(function() {
 
  var owl = $("#owl-demo");
 
  owl.owlCarousel({
      items : 2, //3 items above 1000px browser width
      itemsDesktop : [1000,2], //3 items between 1000px and 901px
      itemsDesktopSmall : [900,2], // betweem 900px and 601px
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






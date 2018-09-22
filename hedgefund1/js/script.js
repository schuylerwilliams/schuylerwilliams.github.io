
var VeryGoodInvestmentCompany1 = (function () {

	var thisIsAVariableOrFunction = "true";
	
	$('.owl-carousel').owlCarousel({
		loop:true,
		margin:10,
		nav:true,
		items:1
	});
	
	return {
		thisIsAVariableOrFunction: thisIsAVariableOrFunction,
	};

})();


$(document).ready(function(){
	console.log(VeryGoodInvestmentCompany1.thisIsAVariableOrFunction);
});
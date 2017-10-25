

var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
    	center: {lat: 37, lng: -93},
    	zoom: 15,
    	zoomControl: true,
    	zoomControlOptions: {
    		position: google.maps.ControlPosition.RIGHT_TOP
    	},
    	mapTypeControl: true,
    	mapTypeControlOptions: {
    		style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
    		position: google.maps.ControlPosition.LEFT_TOP
    	},
    	scaleControl: false,
    	streetViewControl: false,
    	rotateControl: false,
    	fullscreenControl: false
	});
	
	map.data.loadGeoJson('../data/elementary_boundaries.geojson');
	map.data.loadGeoJson('../data/schools_v2.geojson');
	map.data.setStyle({
  		fillColor: '#2687bf',
  		fillOpacity: .3,
  		strokeWeight: 0
	});
	//map.data.addGeoJson(elementaryLayer);
	//map.data.addGeoJson(schoolLayer);
	
};

$(document).ready(function() {
	initMap();
});





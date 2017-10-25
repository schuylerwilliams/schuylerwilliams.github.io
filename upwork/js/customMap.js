

var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
    	center: {lat: -34.397, lng: 150.644},
    	zoom: 8,
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
	
	map.data.loadGeojson('../data/elementary_boundaries.geojson');
	map.data.loadGeojson('../data/schools_v2.geojson');
	
	map.data.setStyle({
		fillColor: 'green',
		fillOpacity: 0.5,
		strokeColor: 'green',
		strokeOpacity: 1
	});
	
}





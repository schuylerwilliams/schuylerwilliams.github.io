

var map;
var place;
var autocomplete;
var infowindow = new google.maps.InfoWindow();
var markerArr = [];

function initialization() {
	map = L.map('mapBlock', {
    	center: [33, -25],
    	zoom: 3,
    	attributionControl: true,
    	zoomControl: false,
		minZoom: 3,
		maxZoom: 19,
	});
	
	var CartoDB_Positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
		subdomains: 'abcd',
		maxZoom: 19
	}).addTo(map);














	/*
	map = new google.maps.Map(document.getElementById('mapBlock'), {
        center: {lat: 33, lng: -25},
        zoom: 3,
        minZoom: 2,
        zoomControl: true,
        zoomControlOptions: {
        	position: google.maps.ControlPosition.RIGHT_TOP
        },
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "saturation": "17"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#D5D8DC"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ]
      });
	*/
	initAutocomplete();
}


var markers = L.markerClusterGroup({
		showCoverageOnHover: false,
		zoomToBoundsOnClick: true,
		spiderfyOnMaxZoom: true,
		removeOutsideVisibleBounds: true,
		animate: false,
		animateAddingMarkers: false
	});
function mapInitialization(reports) {
	try {
		markers.clearLayers();
	} catch (e) {
		
	}
	var i;
	try {
		var reportsLength = reports.length;
		for (i=1; i < reportsLength; i++) {
			newI = i - 1;
			markers.addLayer(L.marker([reports[i][newI].lat, reports[i][newI].lng], {
				title: reports[i][newI].disease_type
			}).bindPopup(reports[i][newI].disease_type));
			//L.marker([51.49, -0.1], {icon: orangeIcon}).addTo(map).bindPopup("I am an orange leaf.");
		};
		map.addLayer(markers);
	} catch (e) {
	
	}
};

/*
var popup = L.popup();
markers.on('click', function (a) {
	popup.setLatLng(a.latlng)
		.setContent(a.layer.options.title)
		.openOn(map);
});
*/
/*
markers.on('clusterclick', function (a) {
	// a.layer is actually a cluster
	console.log('cluster ' + a.layer.getAllChildMarkers().length);
});
*/











































































function showAllReports(disease) {
	$.ajax({
		url: 'js/queryReport.php',
		type: 'POST',
		dataType: 'json',
		data: {tab_id: "1", disease_type: disease},
		success: function(reports) {
			mapInitialization(reports);
		},
		error: function(xhr, status, error) {
			alert("An AJAX error occured: " + status + "\nError: " + error);
		}
	});
}


/*
function setMapOnAll(map) {
	for (var i = 0; i < markerArr.length; i++) {
		markerArr[i].setMap(map);
	}
}
	
function clearMarkers() {
	setMapOnAll(null);
}

function deleteMarkers() {
	clearMarkers();
	markerArr = [];
	markerCluster.clearMarkers();
}

function mapInitialization(reports) {
	try {
		deleteMarkers();
	} catch (e) {
		
	}
	var i;
    var reportsLength = reports.length;
    for (i=1; i < reportsLength; i++) {
    	newI = i - 1;
        var lng = reports[i][newI].lng;
        var lat = reports[i][newI].lat;
        var latlng = new google.maps.LatLng(lat, lng);
        
        var contentStr = "<h4>Report Details</h4><hr>";
	    contentStr += "<p><b>" + "Disease" + ":</b>&nbsp" + reports[i][newI].disease_type + "</p>";
	    contentStr += "<p><b>" + "Reported By" + ":</b>&nbsp" + reports[i][newI].report_type + "</p>";
	    contentStr += "<p><b>" + "Outcome" + ":</b>&nbsp" + reports[i][newI].outcome_type + "</p>";
	    contentStr += "<p><b>" + "Age" + ":</b>&nbsp" + reports[i][newI].age + "</p>";
	    contentStr += "<p><b>" + "Sex" + ":</b>&nbsp" + reports[i][newI].is_male + "</p>";
	    contentStr += "<p><b>" + "Year" + ":</b>&nbsp" + reports[i][newI].year + "</p>";
	    contentStr += "<p><b>" + "Comment" + ":</b>&nbsp" + reports[i][newI].message + "</p>";
	    
	    
	    // Create the marker
	    
	    var icons = {
	    		'Symptoms (unconfirmed)': {
	    			icon: {
	    				path: fontawesome.markers.CIRCLE,
	    				scale: 0.35,
	    				strokeWeight: 0.2,
	    				strokeColor: 'black',
	    				strokeOpacity: 1,
	    				fillColor: '#73C6B6',
	    				fillOpacity: 0.8
	    			}
	    		},
	    		'Case (confirmed)': {
	    			icon: {
	    				path: fontawesome.markers.PLUS_CIRCLE,
	    				scale: 0.45,
	    				strokeWeight: 0.2,
	    				strokeColor: 'black',
	    				strokeOpacity: 1,
	    				fillColor: '#2980B9',
	    				fillOpacity: 1
	    			}
	    		},
	    		'Mortality': {
	    			icon: {
	    				path: fontawesome.markers.EXCLAMATION_CIRCLE,
	    				scale: 0.45,
	    				strokeWeight: 0.2,
	    				strokeColor: 'black',
	    				strokeOpacity: 1,
	    				fillColor: '#E67E22',
	    				fillOpacity: 0.8
	    			}
	    		}
	    };
	    
	    var marker = new google.maps.Marker({ // Set the marker
	      position: latlng, // Position marker to coordinates
	      map: map, // assign the market to our map variable
	      customInfo: contentStr,
	      icon: icons[reports[i][newI].outcome_type].icon
	    });
	    
	   
	    
	    markerArr.push(marker);
	    
	    google.maps.event.addListener(marker, 'click', function() {
	    	infowindow.setContent(marker['customInfo']);
	    	infowindow.open(map, marker);
	    });
    };
    
	
	clusterMarkers();
}
*/

/*
var markerCluster;
function clusterMarkers() {
	var options = {imagePath: 'img/m'};
	var otherOptions = {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'};
	
	markerCluster = new MarkerClusterer(map, markerArr, options);
}
*/

function initAutocomplete() {
	autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
	autocomplete.addListener('place_changed', onPlaceChanged);
	
	autocomplete2 = new google.maps.places.Autocomplete(document.getElementById('autocomplete2'));
	autocomplete2.addListener('place_changed', onPlaceChanged2);
}

function onPlaceChanged() {
	place = autocomplete.getPlace();
	//map.setView(place.geometry.location);
	//map.setZoom(9);
}

function onPlaceChanged2() {
	place2 = autocomplete2.getPlace();
	//map.setView(place2.geometry.location);
	//map.setZoom(9);
}

google.maps.event.addDomListener(window, 'load', initialization);
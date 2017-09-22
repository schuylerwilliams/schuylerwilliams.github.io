
// Access Token
mapboxgl.accessToken = 'pk.eyJ1Ijoic2t5d2lsbGlhbXMiLCJhIjoibUI4TlByNCJ9.9UuhBU3ElNiesrd-BcTdPQ';


// Declare bounds for map
//var bounds = [
    //[-20, -10], // Southwest coordinates
    //[-180, 60]  // Northeast coordinates
//];


// Initialize the map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v8',
    center: [-105, 39],
    zoom: 2.8,
    pitch: 0.1,
    maxZoom: 4,
    minZoom: 2
    //maxBounds: bounds
});


// Map Controls
map.addControl(new mapboxgl.Navigation());


// variable to hold scale 
var scale;
// variable to hold color
var symbolColor;
// array for holding layer ids
var id = [];
// variable for holding the currently selected feature
var feature;
// variable to get city name and use for creation of layerID
var cityName;
// variable to get city attribution data and hold for crunchData function
var multiplier;
// variable for creation of layers, unique layerID's
var layerID;

var hoverData;
// Cities array, holds information
var cities = [
	["Austin", 2.4, 14, -7.1, 1.5, 5.6, 8.6, -9, 23.4, 1.5, 22, -5, 1.5],
	["Atlanta", 3.3, 9, -3, -11, 3, 7, 1.4, 23, -14, 29.1, -15, 13],
	["Raleigh", -4, 16, -9.3, -15.1, 3.4, 7.8, -1.2, 30, -10, 35, -20, 12.3],
	["Cleveland", -14.5, 21.4, -10.2, -20, -.05, -4, -1, 20, 10, 33, -21.4, -.01],
	["Tampa", 5.3, 2.6, .7, -10.5, 5, 3.5, -5.7, 21, -3.6, 15.7, -6.3, 1.3],
	["Detroit", -.75, 12.3, -20.2, -.7, 2.4, -13.4, 1.3, 19, 10, 14, -10.4, -7],
	["Bakersfield", -4, .3, -2.1, -16, -2, 12.5, -2, 20, -8, 35.5, -5.6, 10],
	["Denver", 4.4, .6, .1, -14.4, 5.8, 7.9, 3, 13.9, -1.5, 9.7, -6.3, -1.2],
	["Baltimore", -12.4, 4.5, 2.6, -13.2, 2.6, -.3, -2.5, 6.5, 5.6, 27, -16.2, 2.2],
	["Portland", -3.1, 11.5, -8.1, -8.1, -3.9, 26, -1.5, 15, -.7, 12.8, -8.2, 7.4],
	["Indianapolis", -22.1, 6.1, 8.6, -19, -5, -3, -1.2, 15, 5, 40.4, -22.7, .3],
	["San Bernardino", -2.3, 2.3, -.7, -3.7, 1.5, 4.1, -2, 7.7, -.6, 7.7, -3.8, 2],
	["New York", -1.5, -4, -4, -5, -.04, -3, -1.2, .3, 18, 12, -6.6, -7],
	["Tulsa", -8.5, 5.3, 4.8, -20.8, .8, 6.3, -13.3, 27.4, -1.3, 33.1, -7.6, 3.6],
	["Omaha", -4.9, -.8, 7.2, -10, -1.6, .05, 11.7, 14, 4.1, 16, -15.4, 3],
	["Madison", -18, -.7, -21.1, -1.3, 1.2, -7, 30.3, 64.5, -11, 11, -26, 2.6]
];


// Add data
map.on('style.load', function(){
	map.addSource("cities", {
        type: "geojson",
        data: "/lightpollution/data/cities.geojson"
    });
	
	// Loop through the cities array
	for(i=0; i <= 15; i++){
		// get city name from cities array
		cityName = cities[i][0];
		// get city data from city array
		multiplier = cities[i][1];
		// call crunchData function which sets scale and symbol color
		crunchData(multiplier);
		// hold layerID name
		layerID = "Cities-" + cityName;
		
    	map.addLayer({
        	"id": layerID,
        	"interactive": true,
        	"type": "circle",
        	"source": "cities",
        	'paint': {
            	'circle-radius': scale,
            	'circle-color': symbolColor,
            	'circle-opacity': .8
        	},
        	// only add feature with the City attribute equal to cityName variable
        	"filter": ["==", "City", cityName]
    	});
    	
    	// add each layerid to id array
    	id.push(layerID); 
    };
});


// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});


// Declare variables for range slider
var rangeInput = document.getElementById("slider");
var slider = document.getElementById("sliderInfo");
var sliderValues = [
	[1, 2001],
	[2, 2002],
	[3, 2003],
	[4, 2004],
	[5, 2005],
	[6, 2006],
	[7, 2007],
	[8, 2008],
	[9, 2009],
	[10, 2010],
	[11, 2011],
	[12, 2012]
];


// Event listener to call startUpdate function based on slider value
rangeInput.addEventListener('mouseup', function() {
	slider.innerHTML = sliderValues[rangeInput.value-1][1];
	// call startUpdate function to get values, used for changing scale and symbol
    startUpdate(rangeInput.value);
    // call determine data to determine attribute year, used for displaying data on page
    determineData(rangeInput.value);
});



// On Click
map.on('click', function (e) {
    map.featuresAt(e.point, {
        radius: 10, // Half the marker size (15px).
        includeGeometry: true,
        layer: id
    }, function (err, features) {
		feature = features[0];
		
		document.getElementById("infoClick").innerHTML = feature.properties.City;
		determineData(rangeInput.value);
		
		document.getElementById("clickedLegend").style.transform = "translate(0%)";
		
		// if there are features within the given radius of the click event,
        // fly to the location of the click event
		if (features.length) {
            // Get coordinates from the symbol and center the map on those coordinates
            map.flyTo({
            	center: feature.geometry.coordinates,
            	zoom: 4
            });
        }
    });
});
		
			
// On hover
map.on('mousemove', function(e) {
    map.featuresAt(e.point, {
        radius: 10, // Half the marker size (15px).
        includeGeometry: true,
        layer: id
    }, function(err, features) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = (!err && features.length) ? 'pointer' : '';

        if (err || !features.length) {
            popup.remove();
            return;
        }
        
        var featureHover = features[0];
		
        // Populate the popup and set its coordinates
        // based on the feature found.
        var testHover = featureHover.properties.City;
        popup.setLngLat(featureHover.geometry.coordinates)
            .setHTML(testHover)
            .addTo(map);
    });
});

	
// function to determine data to display
function determineData(x) {
	// because i cant get feature.properties.[x] to work...
	// array to hold feature.properties.[year]
	var years = [
		feature.properties._2001, feature.properties._2002, feature.properties._2003,
		feature.properties._2004, feature.properties._2005, feature.properties._2006,
		feature.properties._2007, feature.properties._2008, feature.properties._2009,
		feature.properties._2010, feature.properties._2011, feature.properties._2012
	];
	
	// loop to determine which year to display
	for (i=0; i <= 11; i++){
		// only display if slider value is equal to year
		if (x-1 == i) {
			document.getElementById("infoData").innerHTML = years[i];
			hoverData = years[i];
		}
	}
};


// function to update symbol size and color
function startUpdate(x) {
	for(i=0; i <= 15; i++){
		cityName = cities[i][0];
		var layerID = "Cities-" + cityName;
		var multiplier = cities[i][x];
		// call crunchData function to get scale factor
		crunchData(multiplier);
		map.setPaintProperty(layerID, 'circle-radius', scale);
		map.setPaintProperty(layerID, 'circle-color', symbolColor);
	}
};


// Declare function to determine scale factor and color
function crunchData(x) {
	if (x >= 35) {
		scale = 8 * 6.5;
	} else if (x < 35 && x >= 20) {
		scale = 8 * 4.5;
	} else if (x < 20 && x >= 10) {
		scale = 8 * 2.5;
	} else if (x < 10 && x >= 5) {
		scale = 8 * 1.5;
	} else if (x < 5 && x >= .01) {
		scale = 8 * .5;
	} else if (x <= -35) {
		scale = 8 * 6.5;
	} else if (x <= -20 && x > -35) {
		scale = 8 * 4.5;
	} else if (x <= -10 && x > -20) {
		scale = 8 * 2.5;
	} else if (x <= -5 && x > -10) {
		scale = 8 * 1.5;
	} else if (x <= -.01 && x > -5) {
		scale = 8 * .5;
	}
	// call getColor function
	getColor(x);
};


// function to determine what symbol color should be based on negative + positive
function getColor(f) {
	// for increasing light pollution
	if (f >= .01) {
		symbolColor = 'rgba(255,247,0,1)';
		
		//symbolColor = 'rgba(256,102,102,1)';
	// for decreasing light pollution
	} else if (f <= -.01) {
		symbolColor = 'rgba(0,192,255,1)';
		
		//symbolColor = 'rgba(102,255,178,1)';
	}
};

	
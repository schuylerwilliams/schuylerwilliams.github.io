
var quantumurals = (function () {
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

  	
  	
  	var eventRelArr = [];
  	var theUser;
  	// add a realtime listener
  	firebase.auth().onAuthStateChanged(user => {
  		if(user) {
  			//console.log(user);
  			theUser = user;
  			
  			onWelcomeInit(theUser);
  			var testRead = firebase.database().ref('event_relations').orderByChild("user_key").equalTo(user.uid);
  			//testRead.on('child_added', function(snapShot) {
  			testRead.once('value').then(function(snapShot) {
  			//testRead.on('value', function(snapShot) {
  				var myObj = snapShot.val();
  				//console.log(myObj);
  				
  				$.each( myObj, function( key, value ) {
  					eventRelArr.push([key, value.event_key, value.user_key, value.which_team]);
				});
			});
  			
  		} else {
  			console.log('not logged in');
  		}
  	});
	
	
	
	
	
	mapboxgl.accessToken = 'pk.eyJ1Ijoic2t5d2lsbGlhbXMiLCJhIjoibUI4TlByNCJ9.9UuhBU3ElNiesrd-BcTdPQ';
	
	
	
	
	var map = new mapboxgl.Map({
    	container: 'map',
    	style: 'mapbox://styles/skywilliams/cj4xk4j9n2x5v2rpd5nxe3dgd',
    	center: [-89.4012, 43.0731],
    	minZoom: 6,
    	maxZoom: 19,
    	zoom: 11,
    	attributionControl: true,
    	logoPosition: 'bottom-left'
	});
	
    
	

	
	var customizeMapboxGLJS = (function() {
		map.dragRotate.disable();
		map.touchZoomRotate.disableRotation();
	})();
	
	
	
	
	$('#promotLocationModal').modal({
		show: false,
		backdrop: 'static',
		keyboard: false
	});
	
	$('#myJoinModalTeam').modal({
		show: false
	});
	
	
	var input = document.getElementById('searchTextField');
	var autocompleteOptions = {
		types: ['(regions)']
	};
	var autocomplete = new google.maps.places.Autocomplete(input, autocompleteOptions);
	autocomplete.addListener('place_changed', onPlaceChanged);
	
	
	function onPlaceChanged() {
		var place = autocomplete.getPlace();
		var placeLat = place.geometry.location.lat();
		var placeLng = place.geometry.location.lng();
		
		
		var testRead = firebase.database().ref('users/' + theUser.uid).update({
			lat: placeLat,
			lng: placeLng
		});
		
		map.setCenter([placeLng, placeLat]);
		$('#promotLocationModal').modal('hide');
		runQuery();
		
		$('#createAndFilterWrapper').css("visibility", "visible");
  		$('#filterCreateWrap').css("visibility", "visible");
  		$('#myButtonMenu').css("visibility", "visible");
  					
  		$('#createAndFilterWrapper').animateCss("bounceIn");
  		$('#filterCreateWrap').animateCss("bounceIn");
  		$('#myButtonMenu').animateCss("bounceIn");
	};
	
	var input2 = document.getElementById('changeLocationMap');
	var autocomplete2 = new google.maps.places.Autocomplete(input2);
	autocomplete2.addListener('place_changed', onPlaceChanged2);
	function onPlaceChanged2() {
		var place = autocomplete2.getPlace();
		var placeLat = place.geometry.location.lat();
		var placeLng = place.geometry.location.lng();
		
		map.setCenter([placeLng, placeLat]);
		map.setZoom(11);
	};

	
	//can wrap in  function, have to put "Blank" in front of each variable, don't auto add, (causes lots of problems)
    var myMarkerArray = [];
    var getTheMarkerIndex = 0;
    var tempMarkerArray = [];
    var markers;
    var getTheEventPopUp = document.getElementById("popUpContent");
    var getTheEventTitle = document.getElementById("theEventName");
    var getTheTeamGroup = document.getElementById("teamGroup");
    var getTheNoTeamGroup = document.getElementById("noTeamGroup");
    var getTheRedTeamText = document.getElementById("redTeamText");
    var getTheBlueTeamText = document.getElementById("blueTeamText");
    var getTheNoTeamText = document.getElementById("noTeamText");
    var getTheRedTeam = document.getElementById("redTeamBlock");
    var getTheBlueTeam = document.getElementById("blueTeamBlock");
    var getTheNoTeam = document.getElementById("noTeamBlock");
    var getTheEventActivity = document.getElementById("eventActivityBlock");
    var getRemoveFromEventButton = document.getElementById("removeMeFromEventButton");
    var getTheEventDescription = document.getElementById('eventDescription');
    var centerMarker;
	var centerPos;
	var el;
	var tempIdHolder = 0;
	var tempNumberInRedTeamHolder = 0;
	var tempNumberInBlueTeamHolder = 0;
	var interactiveArray = [
    	'points'
    ];
    var thePoints = '{"type": "FeatureCollection", "features": [';
    var thePointsObj;
    var dateList = [];
	var newDateList = [];
	var morningTimeList = [
		'5',
		'5.5',
		'6',
		'6.5',
		'7',
		'7.5',
		'8',
		'8.5',
		'9',
		'9.5',
		'10',
		'10.5',
		'11',
		'11.5'
	];
	var afternoonTimeList = [
		'12',
		'12.5',
		'13',
		'13.5',
		'14',
		'14.5',
		'15',
		'15.5',
		'16',
		'16.5',
		'17',
		'17.5',
		'18'
	];
	var eveningTimeList = [
		'18.5',
		'19',
		'19.5',
		'20',
		'20.5',
		'21',
		'21.5',
		'22',
		'22.5',
		'23',
		'23.5',
		'24'
	];
	var fullActivityEvents = [
		"Soccer",
		"Volleyball",
		"Basketball",
		"Ultimate Frisbee",
		"Badminton",
		"Dodgeball",
		"Flag Football",
		"Golf",
		"Ice Hockey",
		"Tennis"
	];
    
	
	var populateDatesForEvents = (function() {
		var i;
		for (i=0; i < 14; i++) {
			var dateObject = new Date();
			var newDateObject = dateObject.setDate(dateObject.getDate() + i);
			dateList.push(newDateObject);
		};
		
		dateList.forEach(function(item,index) {
			var newDate = new Date(item);
			var stringDate = newDate.toString();
			newDateList.push(stringDate.split(" "));
		});
		
		newDateList.forEach(function(item,index) {
			var getTheDateForm = document.getElementById("date" + index);
			getTheDateForm.setAttribute("value", item[0] + " " + item[1] + " " + item[2]);
			getTheDateForm.innerHTML = item[0] + " " + item[1] + " " + item[2];
		});
		
		var getTheMainDateForm = document.getElementById("eventDate");
		getTheMainDateForm.setAttribute("value", newDateList[0][0] + " " + newDateList[0][1] + " " + newDateList[0][2]);
	})();
    
    // initiate round slider for time
	$("#myTimeSlider").roundSlider({
		sliderType: "range",
		handleShape: "round",
		width: 22,
		radius: 100,
		value: "0,9",
		max: "13",
		startAngle: 90,
		step: "1",
		showTooltip: false,
		editableTooltip: false,
		animation: true,
		handleSize: "+18",
		create: function(e) {
			var eventDate = e.value;
        	var resultDate = eventDate.split(",");
			
			var firstDate = parseInt(resultDate[0]);
			var secondDate = parseInt(resultDate[1]);
			
			var firstDateString = newDateList[firstDate][0] + " " + newDateList[firstDate][1] + " " + newDateList[firstDate][2];
			var secondDateString = newDateList[secondDate][0] + " " + newDateList[secondDate][1] + " " + newDateList[secondDate][2];
			
			var finalString = firstDateString + " - " + secondDateString;
			document.getElementById("dateFiltered").innerHTML = finalString;
		},
		drag: function (e) {
			var eventDate = e.value;
        	var resultDate = eventDate.split(",");
			
			var firstDate = parseInt(resultDate[0]);
			var secondDate = parseInt(resultDate[1]);
			
			var firstDateString = newDateList[firstDate][0] + " " + newDateList[firstDate][1] + " " + newDateList[firstDate][2];
			var secondDateString = newDateList[secondDate][0] + " " + newDateList[secondDate][1] + " " + newDateList[secondDate][2];
			
			var finalString = firstDateString + " - " + secondDateString;
			document.getElementById("dateFiltered").innerHTML = finalString;
    	}
	});
	
	
    
    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
            return this;
        }
    });
  	
  	
  	$('.createCarousel').slick({
  		centerMode: true,
  		centerPadding: '50px',
  		slidesToShow: 3,
    	focusOnSelect: true,
    	initialSlide: 0,
    	responsive: [
			{
      			breakpoint: 700,
      			settings: {
        			arrows: false,
        			centerMode: true,
        			centerPadding: '50px',
        			slidesToShow: 1
      			}
    		}
    		/*
    		{
      			breakpoint: 480,
      			settings: {
        			arrows: false,
        			centerMode: true,
        			centerPadding: '40px',
        			slidesToShow: 1
      			}
    		}
    		*/
  		]
    });
    
    
    function moveSliderForToday() {
    	$("#myTimeSlider").roundSlider("setValue", "0,0");
    	
    	var eventDate = "0,0";
    	var resultDate = eventDate.split(",");
			
		var firstDate = parseInt(resultDate[0]);
		var secondDate = parseInt(resultDate[1]);
			
		var firstDateString = newDateList[firstDate][0] + " " + newDateList[firstDate][1] + " " + newDateList[firstDate][2];
		var secondDateString = newDateList[secondDate][0] + " " + newDateList[secondDate][1] + " " + newDateList[secondDate][2];
			
		var finalString = firstDateString + " - " + secondDateString;
		document.getElementById("dateFiltered").innerHTML = finalString;
    };
  	
  	
    function addPoint(lat, lng, name, activity, eventId, userIsInEvent, i, numberInRed, numberInBlue, getDate, getTime, isteamevent, description, isPaidEvent, isFeaturedEvent, whichTeam) {
    	thePoints = thePoints + 
			'{"type": "Feature", "geometry": {"type": "Point", "coordinates": [' + lng + ', ' + lat + ']}, '+
			'"properties": {"eventname": "' + name + '", "eventactivity": "' + activity + '", "eventid": "' + eventId +
			'", "userisinevent": ' + userIsInEvent + ', "numberinred": ' + numberInRed + ', "carocount": ' + i + ', "numberinblue": ' + numberInBlue +
			', "getDate": "' + getDate + '", "getTime": "' + getTime + '", "whichTeam": "' + whichTeam + '", "isFeaturedEvent": "' + isFeaturedEvent + '", "isPaidEvent": "' + isPaidEvent + '", "isTeamEvent": ' + isteamevent + ', "description": "' + description + '"}},';
    };
    
   
    
    function finishPoints(count) {
		globalCaroCount = count;
    	var theNewPoints = thePoints.replace(/,\s*$/, "");
    	theNewPoints = theNewPoints + ']}';
    	thePointsObj = JSON.parse(theNewPoints);
    	map.getSource('points').setData(thePointsObj);
    	showPoints();
    	tempEventKey = caroArr[0][0];
    	map.setFilter('points-clicked', ['==', 'eventid', tempEventKey]);
    	document.getElementById(tempEventKey).classList.add('caroItemActive');
    	
    	var joinEventButton = document.getElementById("joinEventButton");
    	if (caroArr[0][8] == 1) {
    		// show remove from event
    		$('#joinEventButton').html("Leave Event");
    		
    		if (joinEventButton.classList.contains("btn-primary")) {
    			joinEventButton.classList.remove("btn-primary");
    			joinEventButton.classList.add("btn-danger");
    		}
    	} else if (caroArr[0][8] == 0) {
    		// show join event
    		$('#joinEventButton').html("Join Event");
    		
    		if (joinEventButton.classList.contains("btn-danger")) {
    			joinEventButton.classList.remove("btn-danger");
    			joinEventButton.classList.add("btn-primary");
    		}
    	} else {
    		// error value
    	}
        $('#loader').css("visibility", "hidden");
    };
    
    
    function listenForEventAdditions() {
    	var ignoreOnce = true;
        var ignoreNumber = caroArr.length;
        var ignoreCount = 1;
  		var testLookForAdditions = firebase.database().ref().child('events');
    	testLookForAdditions.on('child_added', function(data) {
    		if (ignoreOnce == true) {
    			if (ignoreCount == ignoreNumber) {
    				ignoreOnce = false;
    			} else {
    				ignoreCount = ignoreCount + 1;
    			}
    		} else if (ignoreOnce == false) {
    			var obj = data.val();
    			var inEvent = 0;
    			var whatTeam = "none";
    			/*
    			for (i=0; i < eventRelLength; i++) {
  					if (eventRelArr[i][1] == key) {
  						inEvent = 1;
  						whatTeam = eventRelArr[i][3];
  					}
  				}
  				*/
    			//todo
  				
  				addPoint(data.val().lat, data.val().lng, data.val().event_name, data.val().event_activity, data.key, inEvent, globalCaroCount, 0, 0, data.val().event_date, data.val().event_time, data.val().is_team_event, data.val().description, 0, 0, whatTeam);
  				addCaro(data.val().lat, data.val().lng, data.val().event_name, data.val().event_activity, data.key, inEvent, globalCaroCount, 0, 0, data.val().event_date, data.val().event_time, data.val().is_team_event, data.val().description, 0, 0, whatTeam);
				
				var theNewPoints2 = thePoints.replace(/,\s*$/, "");
    			theNewPoints2 = theNewPoints2 + ']}';
    			thePointsObj = JSON.parse(theNewPoints2);
    			map.getSource('points').setData(thePointsObj);
				globalCaroCount = globalCaroCount + 1;
    		}	
		});
    };
    
    
    function clearPoints() {
    	thePoints = '{"type": "FeatureCollection", "features": [';
        thePointsObj = "";
        removeCaro();
    };
    
    
    function hidePoints() {
    	map.setLayoutProperty('points', 'visibility', 'none');
    };
    
    function showPoints() {
    	map.setLayoutProperty('points', 'visibility', 'visible');
    };
    
    
    var isUserInEvent = 0;
    var whichTeamIsUser = "none";
	var globalCaroCount = 0;
    function runQuery() {
    	var testRead = firebase.database().ref().child('events');
  		testRead.once('value').then(function(snapShot) {
  			var eventRelLength = eventRelArr.length;
  			var myObj = snapShot.val();
  			var caroCount = 0;
  			var i;
  			$.each( myObj, function( key, value ) {
  				
  				for (i=0; i < eventRelLength; i++) {
  					if (eventRelArr[i][1] == key) {
  						isUserInEvent = 1;
  						whichTeamIsUser = eventRelArr[i][3];
  					}
  				}
  				
  				addPoint(value.lat, value.lng, value.event_name, value.event_activity, key, isUserInEvent, caroCount, 0, 0, value.event_date, value.event_time, value.is_team_event, value.description, 0, 0, whichTeamIsUser);
  				addCaro(value.lat, value.lng, value.event_name, value.event_activity, key, isUserInEvent, caroCount, 0, 0, value.event_date, value.event_time, value.is_team_event, value.description, 0, 0, whichTeamIsUser);
  				caroCount += 1;
  				isUserInEvent = 0;
  				whichTeamIsUser = "none";
			});
			finishPoints(caroCount);
			listenForEventAdditions();
  		});
    	/*
    	var eventDateCrit = [];
    	var i;
    	for (i=0; i <= 13; i++) {
    		var dateString = newDateList[i][0] + " " + newDateList[i][1] + " " + newDateList[i][2];
    		eventDateCrit.push(dateString);
    	};
    	
    	var d1 = eventDateCrit.join(',');
    	*/
    };
    
    
    var caroArr = [];
    function addCaro(lat, lng, name, activity, key, userIsInEvent, i, numberInRed, numberInBlue, getDate, getTime, isteamevent, description, isPaidEvent, isFeaturedEvent, whichTeam) {
  		$('.createCarousel').slick('slickAdd',
  		'<div id="' + key + '" class="caroItem">' + 
  			'<h4>' + name + '</h4>' + 
  			'<p>' + activity + ' at ' + getTime + ' on ' + getDate + '</p>' +
  		'</div>');
  		caroArr.push([key, lat, lng, isteamevent, activity, getTime, getDate, description, userIsInEvent, name, numberInRed, numberInBlue, isPaidEvent, isFeaturedEvent, whichTeam]);
    };
    
    
    function removeCaro() {
    	var parent = $('.createCarousel').slick('getSlick');
		var parentCount = parent.slideCount;
    	for (i=0; i < parentCount; i++) {
    		$('.createCarousel').slick('slickRemove', 0);
    	};
    	caroArr.length = 0;
    };
	
	
	var tempEventKey;
	var tempEventIndex = 0;
	// On before slide change
	$('.createCarousel').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		var key = caroArr[nextSlide][0];
		tempEventKey = key;
		tempEventIndex = nextSlide;
  		var lat = caroArr[nextSlide][1];
  		var lng = caroArr[nextSlide][2];
  		
  		map.setFilter('points-clicked', ['==', 'eventid', key]);
  		document.getElementById(caroArr[nextSlide][0]).classList.add('caroItemActive');
  		document.getElementById(caroArr[currentSlide][0]).classList.remove('caroItemActive');
  		
  		var joinEventButton = document.getElementById("joinEventButton");
  		var joinEventButton2 = document.getElementById("joinEventButton2");
  		
  		if (caroArr[nextSlide][8] == 1) {
    		// show remove from event
    		$('#joinEventButton').html("Leave Event");
    		$('#joinEventButton2').html("Leave Event");
    		if (joinEventButton.classList.contains("btn-primary")) {
    			joinEventButton.classList.remove("btn-primary");
    			joinEventButton.classList.add("btn-danger");
    			
    			joinEventButton2.classList.remove("btn-primary");
    			joinEventButton2.classList.add("btn-danger");
    		}
    	} else if (caroArr[nextSlide][8] == 0) {
    		// show join event
    		$('#joinEventButton').html("Join Event");
    		$('#joinEventButton2').html("Join Event");
    		if (joinEventButton.classList.contains("btn-danger")) {
    			joinEventButton.classList.remove("btn-danger");
    			joinEventButton.classList.add("btn-primary");
    			
    			joinEventButton2.classList.remove("btn-danger");
    			joinEventButton2.classList.add("btn-primary");
    		}
    	} else {
    		// error value
    	}
  		
  		map.flyTo({
        	center: [lng, lat]
        });
	});
	
	
	
	
	
	/* Expanding Event - Learn More Clicked */
	$('#expandEventButton').click(function() {
		$('#testExpandPopUpTitle').html(caroArr[tempEventIndex][0]);
		$('#testExpandPopUpActivity').html(caroArr[tempEventIndex][4] + " at " + 
			caroArr[tempEventIndex][5] + " on " + caroArr[tempEventIndex][6]);
		$('#testExpandPopUpDescription').html("Description: " + caroArr[tempEventIndex][7]);
		$('#testTeamEvent').html("Is Team Event: " + caroArr[tempEventIndex][3]);
		$('#testNameEvent').html("Name: " + caroArr[tempEventIndex][9]);
		$('#testNumberRed').html("Number in red: " + caroArr[tempEventIndex][10]);
		$('#testNumberBlue').html("Number in blue: " + caroArr[tempEventIndex][11]);
		$('#testPaidEvent').html("Is Paid event: " + caroArr[tempEventIndex][12]);
		$('#testFeaturedEvent').html("Is featured event: " + caroArr[tempEventIndex][13]);
		$('#testWhichTeam').html("Which Team: " + caroArr[tempEventIndex][14]);
		$('#testUserInEvent').html("User in event: " + caroArr[tempEventIndex][8]);
		$('#expandedPopUp').css({
			"bottom": "0px",
			"width": "100%",
			"height": "100vh",
			"visibility": "visible"
		});
	});
	
	$('#closeExpandEventButton').click(function() {
		$('#expandedPopUp').css({
			"bottom": "100px",
			"width": "400px",
			"height": "100px"
		});
		setTimeout(function (){
        	$('#expandedPopUp').css("visibility", "hidden");
        }, 250);
	});
	/* Expanding Event - Learn More Clicked */
    
    
    
    

	/* On Map Load */
	map.on('load', function () {
		
		map.addSource('points', {
			type: 'geojson',
			data: '/data/devilsLake.geojson',
			//cluster: true,
			//clusterMaxZoom: 10, // max zoom to cluster points on
			//clusterRadius: 50, // radius of each cluster when clustering points
		});
		
		/*
		map.addLayer({
			'id': 'clusters',
			'type': 'circle',
			'source': 'points',
			'filter': ['has', 'point_count'],
			'paint': {
				'circle-color': {
					'property': 'point_count',
					'type': 'interval',
					'stops': [
						[0, '#51bbd6'],
						[100, '#f1f075'],
						[750, '#f28cb1']
					]
				},
				'circle-radius': {
					'property': 'point_count',
					'type': 'interval',
					'stops': [
						[0, 20],
						[100, 30],
						[750, 40]
					]
				}
			}
		});
		*/
		
		/*
		map.addLayer({
			'id': 'cluster_count',
			'type': 'symbol',
			'source': 'points',
			'filter': ['has', 'point_count'],
			'layout': {
				'text-field': '{point_count_abbreviated}',
				'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
				'text-size': 12
			}
		});
		*/
		
		/* Add regular points */
		map.addLayer({
    		'id': 'points',
        	'type': 'symbol',
        	'source': 'points',
        	//'filter': ['!has', 'point_count'],
        	'layout': {
        		'visibility': 'none',
        		'icon-image': 'pin3_red_min',
        		'icon-allow-overlap': true,
        		'icon-ignore-placement': true,
        		'icon-offset': [0, -20],
        		'icon-size': 1.25
        	}
    	});
    	/* Add regular points */
    	
    	
    	/* Add Clicked Point */
    	map.addLayer({
    		'id': 'points-clicked',
    		'type': 'symbol',
    		'source': 'points',
    		//'filter': ['all',['!has', 'point_count'],['==', 'eventid', '']],
    		'filter': ['==', 'eventid', ''],
    		'layout': {
    			'icon-image': 'pin3_blue_min',
    			'icon-allow-overlap': true,
    			'icon-ignore-placement': true,
    			'icon-offset': [0, -18.75],
    			'icon-size': 1.35
    		}
    	});
    	/* Add Clicked Point */
    	
		
		
		/* Create center marker */
		centerPos = map.getCenter();
		
		el = document.createElement('div');
        el.classList.add('marker');
		el.id = "centeredMarker";
		$(el).css({
			"background-image": "url(../img/pin2.svg",
			"visibility": "hidden",
			"height": "60px",
			"width": "60px",
			"margin-top": "-60px",
			"margin-left": "-30px",
			"z-index": "1001"
		});
		
		centerMarker = new mapboxgl.Marker(el).setLngLat(centerPos).addTo(map);
		/* Create center marker */
    	
		
    	
    	map.on('moveend', function() {
    		centerPos = map.getCenter();
    		centerMarker.setLngLat(centerPos);
    	});
    	
    	
    	map.on('move', function() {
    		centerPos = map.getCenter();
    		centerMarker.setLngLat(centerPos);
    	});
    	

    	
    	map.on('click', function(e) {
    		
    		var features = map.queryRenderedFeatures(e.point, { layers: interactiveArray });
    		
    		if (features.length) {
    			try {
    				//map.setFilter('points-clicked', ['all',['!has', 'point_count'],['==', 'eventid', '']]);
    				map.setFilter('points-clicked', ['==', 'eventid', '']);
    			} catch (err) {
    				console.log("can't reset filter");
    			}
    		
    			tempIdHolder = parseInt(features[0].properties.eventid);
    			tempNumberInRedTeamHolder = features[0].properties.numberinred;
				tempNumberInBlueTeamHolder = features[0].properties.numberinblue;
    			console.log(features[0]);
    		
    			//map.setFilter('points-clicked', ['all',['!has', 'point_count'],['==', 'eventid', features[0].properties.eventid]]);
    			map.setFilter('points-clicked', ['==', 'eventid', features[0].properties.eventid]);
                
                var caroIndex = features[0].properties.carocount;
                
                $(".createCarousel").slick('slickGoTo', caroIndex, false);
        		
        		map.flyTo({
        			center: features[0].geometry.coordinates
        		});
        	}
    	});
    });
	/* On Map Load */
	
	
	
	
	function getRidOfCreateEvent(source) {
		var button = document.getElementById(source);
		var isActive = button.classList.contains('active');
		var extraButton = document.getElementById('chooseEventButton');
		
		if (isActive == true) {
			el.style.visibility = "hidden";
			button.classList.remove("active");
			
            
            //$(button).css("visibility", "visible");
			$('#filterCreateWrap').css("visibility", "visible");
            $('#createAndFilterWrapper').css("visibility", "visible");
            $('#myButtonMenu').css("visibility", "visible");
            
			//$(button).animateCss('bounceInUp');
			$("#testBubble01").animateCss('rollOut');
			$("#testBubble02").animateCss('rollOut');
            $('#filterCreateWrap').animateCss('bounceIn');
            $('#createAndFilterWrapper').animateCss('bounceIn');
            $('#myButtonMenu').animateCss('bounceIn');
            
            $('#chooseEventLocationPrompt').animateCss('bounceOut');
			
            setTimeout(function (){
                $('#testBubble01').css("visibility", "hidden");
                $('#testBubble02').css("visibility", "hidden");
                $('#chooseEventLocationPrompt').css("visibility", "hidden");
            }, 500);
			showPoints();
		} else {
			
		}
	};
	
	
	function clickedCreateEvent(source) {
		var button = document.getElementById(source);
		var isActive = button.classList.contains('active');
		var extraButton = document.getElementById('chooseEventButton');
		
		
		if (isActive == true) {
			el.style.visibility = "hidden";
			button.classList.remove("active");
			
            
            //$(button).css("visibility", "visible");
			$('#filterCreateWrap').css("visibility", "visible");
            $('#createAndFilterWrapper').css("visibility", "visible");
            $('#myButtonMenu').css("visibility", "visible");
            
			//$(button).animateCss('bounceInUp');
			$("#testBubble01").animateCss('rollOut');
			$("#testBubble02").animateCss('rollOut');
            $('#filterCreateWrap').animateCss('bounceIn');
            $('#createAndFilterWrapper').animateCss('bounceIn');
            $('#myButtonMenu').animateCss('bounceIn');
            
            $('#chooseEventLocationPrompt').animateCss('bounceOut');
            
            $('#changeLocationMap').css("top", "20px");
			
            setTimeout(function (){
                $('#testBubble01').css("visibility", "hidden");
                $('#testBubble02').css("visibility", "hidden");
                $('#chooseEventLocationPrompt').css("visibility", "hidden");
            }, 500);
			showPoints();
			map.setFilter('points-clicked', ['==', 'eventid', tempEventKey]);
		} else if (isActive == false) {
			el.style.visibility = "visible";
			button.classList.add("active");
			
			//$(button).animateCss('zoomOutDown');
			$("#testBubble01").animateCss('rollIn');
			$("#testBubble02").animateCss('rollIn');
            $('#filterCreateWrap').animateCss('bounceOut');
            $('#createAndFilterWrapper').animateCss('bounceOut');
            $('#myButtonMenu').animateCss('bounceOut');
            
            $('#chooseEventLocationPrompt').css("visibility", "visible");
            $('#chooseEventLocationPrompt').animateCss('bounceIn');
			
            setTimeout(function (){
                //$(button).css("visibility", "hidden");
                $('#filterCreateWrap').css("visibility", "hidden");
                $('#createAndFilterWrapper').css("visibility", "hidden");
                $('#myButtonMenu').css("visibility", "hidden");
            }, 600);
            
			$('#testBubble01').css("visibility", "visible");
			$('#testBubble02').css("visibility", "visible");
			
			$('#changeLocationMap').css("top", "85px");
			toggleEventPopUp();
			hidePoints();
		}
	};
	
    
	function setLatLng() {
		var lngLat = centerMarker.getLngLat();
		var lat = lngLat.lat;
		var lng = lngLat.lng;
		
		document.getElementById("hiddenLat").value = lat;
		document.getElementById("hiddenLng").value = lng;
	};
    
	
	
	$("form#eventCreationForm").submit(function(e) {
		e.preventDefault();
		var eventName = $("#eventName").val();
    	var eventActivity = $("#eventActivity").val();
		var eventDate = $("#eventDate").val();
		var eventTime = $("#eventTime").val();
		var latParam = $("#hiddenLat").val();
		var lngParam = $("#hiddenLng").val();
		var isTeamEvent = $('input[name="isTeamRadio"]:checked').val();
		var whichTeamJoined = $('input[name="whichTeamRadio"]:checked').val();
		var eventDescription = $("#comment").val();
		
		
		var database = firebase.database();
		
		// update events database
		var eventRef = database.ref().child('events');
		var key = eventRef.push().key;
		var update = {};
		update[key] = {
			event_name: eventName,
			event_activity: eventActivity,
			event_date: eventDate,
			event_time: eventTime,
			lat: latParam,
			lng: lngParam,
			is_team_event: isTeamEvent,
			description: eventDescription
			
		};
		var result = eventRef.update(update);
		
		// update event relationship database
		var eventRelRef = database.ref().child('event_relations');
		var relKey = eventRelRef.push().key;
		var relUpdate = {};
		relUpdate[relKey] = {
			event_key: key,
			user_key: theUser.uid,
			which_team: 'red'
		};
		var relResult = eventRelRef.update(relUpdate);
		
		
		$('#createEventPopUp').css("visibility", "visible");
		$('#createEventPopUp').animateCss('bounceInDown');
		document.getElementById("eventCreationForm").reset();
		$('#myEventModal').modal('hide');
		clickedCreateEvent('createEventButton');
		setTimeout(function () {
			closeCreateEventPopUp();
		}, 3000);
	});
	
	
	$('#joinEventButton').click(function() {
		var eventType = caroArr[tempEventIndex][3];
		var buttonHTML = $('#joinEventButton').html();
		if (buttonHTML == "Leave Event") {
			var database = firebase.database();
			
			// remove event relationship
			var i;
			for (i=0; i < eventRelArr.length; i++) {
				if (eventRelArr[i][1] == tempEventKey) {
					var relKey = eventRelArr[i][0];
					console.log(relKey);
					
					var database = firebase.database();
					database.ref('event_relations/' + relKey).remove();
					alert("removed you from event!");
				}
			}
		} else if (buttonHTML == "Join Event") {
			if (eventType == 1) {
				$('#myJoinModalTeam').modal('show');
			} else if (eventType == 0) {
				var database = firebase.database();
			
				// update event relationship database
				var eventRelRef = database.ref().child('event_relations');
				var relKey = eventRelRef.push().key;
				var relUpdate = {};
				relUpdate[relKey] = {
					event_key: tempEventKey,
					user_key: theUser.uid,
					which_team: 'none'
				};
				var relResult = eventRelRef.update(relUpdate);
				alert('you joined an event!');
			}
		} else {
			//error
		}
	});
	
	$('#joinEventButton2').click(function() {
		var eventType = caroArr[tempEventIndex][3];
		var buttonHTML = $('#joinEventButton2').html();
		if (buttonHTML == "Leave Event") {
			var database = firebase.database();
			
			// remove event relationship
			var i;
			for (i=0; i < eventRelArr.length; i++) {
				if (eventRelArr[i][1] == tempEventKey) {
					var relKey = eventRelArr[i][0];
					console.log(relKey);
					
					var database = firebase.database();
					database.ref('event_relations/' + relKey).remove();
					alert("removed you from event!");
				}
			}
		} else if (buttonHTML == "Join Event") {
			if (eventType == 1) {
				$('#myJoinModalTeam').modal('show');
			} else if (eventType == 0) {
				var database = firebase.database();
			
				// update event relationship database
				var eventRelRef = database.ref().child('event_relations');
				var relKey = eventRelRef.push().key;
				var relUpdate = {};
				relUpdate[relKey] = {
					event_key: tempEventKey,
					user_key: theUser.uid,
					which_team: 'none'
				};
				var relResult = eventRelRef.update(relUpdate);
				alert('you joined an event!');
			}
		} else {
			//error
		}
	});
	
	$('#joinEventButtonRedTeam').click(function() {
		var database = firebase.database();
			
		// update event relationship database
		var eventRelRef = database.ref().child('event_relations');
		var relKey = eventRelRef.push().key;
		var relUpdate = {};
		relUpdate[relKey] = {
			event_key: tempEventKey,
			user_key: theUser.uid,
			which_team: 'red'
		};
		var relResult = eventRelRef.update(relUpdate);
		alert('you joined an event on the red team!');
		$('#myJoinModalTeam').modal('hide');
	});
	
	$('#joinEventButtonBlueTeam').click(function() {
		var database = firebase.database();
			
		// update event relationship database
		var eventRelRef = database.ref().child('event_relations');
		var relKey = eventRelRef.push().key;
		var relUpdate = {};
		relUpdate[relKey] = {
			event_key: tempEventKey,
			user_key: theUser.uid,
			which_team: 'blue'
		};
		var relResult = eventRelRef.update(relUpdate);
		alert('you joined an event on the blue team!');
		$('#myJoinModalTeam').modal('hide');
	});
    
    
    
    
    function closeCreateEventPopUp() {
		$('#createEventPopUp').animateCss("bounceOut");
		setTimeout(function () {
			$('#createEventPopUp').css("visibility", "hidden");
		}, 500);
	};
	
	
	
	var filterCaroIds = [];
	$("form#filterMarkerForm").submit(function(e) {
		e.preventDefault();
		getRidOfCreateEvent("createEventButton");
		var markerFilter = [
			'all',
			//['!has', 'point_count']
		];
		var clusterFilter = [
			'all',
			['has', 'point_count']
		];
		
		var eventActivityCriteria = ['in', 'eventactivity'];
		var eventTimeCriteria = ['in', 'getTime'];
		var eventDateCriteria = ['in', 'getDate'];
		
    	var eventActivity = $("#eventActivity2").val();
		var eventTime = $("#eventTime2").val();
		var obj = $("#myTimeSlider").data("roundSlider");
		var eventDate = obj.getValue();
		
		
		
		
		if ((eventActivity.length != 0) && (eventActivity.indexOf('all') == -1)) {
			eventActivity.forEach(function(activity, index) {
				eventActivityCriteria.push(activity);
			});
			markerFilter.push(eventActivityCriteria);
			clusterFilter.push(eventActivityCriteria);
		} else if (eventActivity.indexOf('all') != -1) {
			fullActivityEvents.forEach(function(activity, index) {
				eventActivityCriteria.push(activity);
			});
			markerFilter.push(eventActivityCriteria);
			clusterFilter.push(eventActivityCriteria);
		}
		
		if ((eventTime.length != 0) && (eventTime.indexOf('all') == -1)) {
			eventTime.forEach(function(timeCategory, index) {
				if (timeCategory == 'morning') {
					morningTimeList.forEach(function(realTime, index2) {
						eventTimeCriteria.push(realTime);
					});
				} else if (timeCategory == 'afternoon') {
					afternoonTimeList.forEach(function(realTime, index2) {
						eventTimeCriteria.push(realTime);
					});
				} else if (timeCategory == 'evening') {
					eveningTimeList.forEach(function(realTime, index2) {
						eventTimeCriteria.push(realTime);
					});
				}
			});
			markerFilter.push(eventTimeCriteria);
			clusterFilter.push(eventTimeCriteria);
		} else if (eventTime.indexOf('all') != -1) {
			morningTimeList.forEach(function(realTime, index3) {
				eventTimeCriteria.push(realTime);
			});
			afternoonTimeList.forEach(function(realTime, index3) {
				eventTimeCriteria.push(realTime);
			});
			eveningTimeList.forEach(function(realTime, index3) {
				eventTimeCriteria.push(realTime);
			});
			markerFilter.push(eventTimeCriteria);
			clusterFilter.push(eventTimeCriteria);
		}
		
		if (eventDate.length != 0) {
			var resultDate = eventDate.split(",");
			
			var firstDate = parseInt(resultDate[0]);
			var secondDate = parseInt(resultDate[1]);
			
			for (i=firstDate; i <= secondDate; i++) {
				var dateString = newDateList[i][0] + " " + newDateList[i][1] + " " + newDateList[i][2];
				eventDateCriteria.push(dateString);
			};
			markerFilter.push(eventDateCriteria);
			clusterFilter.push(eventDateCriteria);
		}
		
		var l1 = eventActivityCriteria.join(',');
		var l2 = eventTimeCriteria.join(',');
		var l3 = eventDateCriteria.join(',');
		
		//console.log(markerFilter);
		map.setFilter('points', markerFilter);
		console.log(eventActivityCriteria);
		//todo
		//console.log(thePointsObj);
		
		
		$.each(thePointsObj, function (key, value) {
			var temporaryID;
			$.each(value[0].properties, function (k, v) {
				if (k == "eventid") {
					temporaryID = v;
				}
				//filterCaroIds
				//console.log(k + ": " + v);
			});
			
			$.each(value[0].properties, function (x, y) {
				if (y == "eventactivity") {
					console.log(y);
					if (eventActivityCriteria.indexOf(y) > -1) {
						// do nothing
					} else {
						if (filterCaroIds.indexOf(temporaryID) > -1) {
							// do nothing
						} else {
							filterCaroIds.push(temporaryID);
						}
					}
					
				} else if (y == "getDate") {
					console.log(y);
					if (eventDateCriteria.indexOf(y) > -1) {
						// do nothing
					} else {
						if (filterCaroIds.indexOf(temporaryID) > -1) {
							// do nothing
						} else {
							filterCaroIds.push(temporaryID);
						}
					}
				} else if (y == "getTime") {
					console.log(y);
					if (eventTimeCriteria.indexOf(y) > -1) {
						// do nothing
					} else {
						if (filterCaroIds.indexOf(temporaryID) > -1) {
							// do nothing
						} else {
							filterCaroIds.push(temporaryID);
						}
					}
				}
			});
		});
		//once we have our array, we can run the slack carousel filter function
		//based on the array of id's
		$('.createCarousel').slick('slickFilter', function(index) {
			var theID  = $(this).attr("id");
			if (filterCaroIds.indexOf(theID) > -1) {
				return theID;
			}
		});
		
		//TODO
		map.setFilter('points-clicked', ['==', 'eventid', '']);
		var theLayer = map.getLayer('points');
		toggleFilter(1);
		
	});
	
	function resetMarkerFilter() {
		document.getElementById("filterMarkerForm").reset();
        $('#resetFilterPopUp').css("visibility", "visible");
        $('#resetFilterPopUp').animateCss("bounceInDown");
        map.setFilter('points', null);
        setTimeout(function () {
            closeResetFilterPopUp();
        }, 3000);
        filterCaroIds.length = 0;
        $('.createCarousel').slick('slickUnfilter');
	};
	
	function toggleProfile(source) {
		if (source == 0) {
			$('#profileMenu').css("visibility", "visible");
            $('#profileMenu').animateCss('slideInLeft');
		} else if (source == 1) {
			$('#profileMenu').animateCss('slideOutLeft');
            setTimeout(function (){
                $('#profileMenu').css("visibility", "hidden");
            }, 400);
		}
	};
	
	function toggleFilter(source) {
		if (source == 0) {
            $('#filterMenu').css("visibility", "visible");
            $('#myTimeSlider').css("opacity", 1);
            $('#filterMenu').animateCss('slideInRight');
		} else if (source == 1) {
            $('#filterMenu').animateCss('slideOutRight');
            $('#myTimeSlider').css("opacity", 0);
            setTimeout(function (){
                $('#filterMenu').css("visibility", "hidden");
            }, 350);
		}
	};
	
	
	function toggleEventPopUp() {
		var eventPopUp = document.getElementById("popUpContent");
		
		resetTheEventPopup('expandToSeeMore');
		
		try {
    		//map.setFilter('points-clicked', ['all',['!has', 'point_count'],['==', 'eventid', '']]);
    		map.setFilter('points-clicked', ['==', 'eventid', '']);
    	} catch (err) {
    		console.log("can't reset filter");
    	}
	};
	
	function joinAnEvent(team) {
		theTeam = "";
		if (team == "red") {
			theTeam = "red";
			tempNumberInRedTeamHolder += 1;
		} else if (team = "blue") {
			theTeam = "blue";
			tempNumberInBlueTeamHolder += 1;
		}
		console.log(tempIdHolder);
		/*
		$.ajax({
			type: "POST",
			url: "../php/mapPHP/join_event.php",
			data: "whichTeam=" + theTeam + "&tempIdHolder="+ tempIdHolder + "&numberinred=" + tempNumberInRedTeamHolder + "&numberinblue=" + tempNumberInBlueTeamHolder,
			success: function(data){
				console.log(data);
                $('#joinedEventPopUp').css("visibility", "visible");
				$('#joinedEventPopUp').animateCss("bounceInDown");
				toggleEventPopUp();
				runQuery();
                setTimeout(function (){
					closeJoinedEventPopUp();
				}, 3000);
			},
			error: function() { 
				console.log(data);
			}
		});
		*/
	};
	
	function closeJoinedEventPopUp() {
		$('#joinedEventPopUp').animateCss("bounceOut");
		setTimeout(function () {
			$('#joinedEventPopUp').css("visibility", "hidden");
		}, 500);
	};
    
    
    
    function closeResetFilterPopUp() {
        $('#resetFilterPopUp').animateCss("bounceOut");
        setTimeout(function () {
            $('#resetFilterPopUp').css("visibility", "hidden");
        }, 500);
    };
	
	
	
	
	
	
	
	
	
	
	
	
	function filterMapMarkers() {
		var eventDateCrite = [];
    	var i;
    	for (i=0; i <= 13; i++) {
    		var dateString = newDateList[i][0] + " " + newDateList[i][1] + " " + newDateList[i][2];
    		eventDateCrite.push(dateString);
    	};
    	
    	var d1 = eventDateCrite.join(',');
    	
    	/*
		$.ajax({
        	type: "POST",
        	url: "../php/mapPHP/filter_events.php",
        	data: {"eventDate": d1},
        	dataType: "json",
        	success: function(data) {
                clearPoints();
                var i;
                var dataLength = data.length;
                for (i=0; i < dataLength; i++) {
                    addPoint(data[i].lat, data[i].lng, data[i].eventName, data[i].eventActivity, data[i].eventId, 1, i, data[i].redTeamNumber, data[i].blueTeamNumber, data[i].eventDate, data[i].eventTime, data[i].isTeamEvent, data[i].description, data[i].isPaidEvent, data[i].isFeaturedEvent, data[i].whichTeam);
                };
                finishPoints();
                window.setTimeout(function() {
                    //initRender();
                }, 1000);
        	},
        	error: function(er) {
            	//console.log('error: ' + er);
                alert("You have no events!");
                getRidOfViewMyEvents('testNewMyEventsButton', 0)
        	}
    	});
    	*/
    	
	};
	
	
	function displayContentsOfTeam(team) {
		console.log(team);
	};
	
	
	
	
	
	
	
	
	
	
	
	function expandTheEventPopup(source) {
		var button = document.getElementById(source);
		var active = button.classList.contains('active');
		var popup = document.getElementById('popUpContent');
		
		if (active == true) {
			$(popup).css({
				"height": "175px",
				"width" : "90%",
				"border-radius": "5px",
				"bottom": "30px"
			});
			button.classList.remove('active');
            getRemoveFromEventButton.style.visibility = "hidden";
            getTheEventDescription.style.visibility = "hidden";
		} else if (active == false) {
			$(popup).css({
				"height": "100vh",
				"width" : "100%",
				"border-radius": "0px",
				"bottom": "0px"
			});
			button.classList.add('active');
            getRemoveFromEventButton.style.visibility = "visible";
            getTheEventDescription.style.visibility = "visible";
		}
	};
	
	
	function resetTheEventPopup(source) {
		var button = document.getElementById(source);
		var active = button.classList.contains('active');
		var popup = document.getElementById('popUpContent');
		
		if (active == true) {
			$(popup).css({
				"height": "175px",
				"width" : "90%",
				"border-radius": "5px",
				"bottom": "30px"
			});
			button.classList.remove('active');
			$(popup).animateCss("fadeOut");
			window.setTimeout(function() {
				popup.style.visibility = "hidden";
				$(getTheTeamGroup).css("visibility", "hidden");
				$(getTheNoTeamGroup).css("visibility", "hidden");
			}, 500);
            getRemoveFromEventButton.style.visibility = "hidden";
			getTheEventDescription.style.visibility = "hidden";
		} else if (active == false) {
			$(popup).animateCss("bounceOut");
			window.setTimeout(function() {
				popup.style.visibility = "hidden";
				$(getTheTeamGroup).css("visibility", "hidden");
				$(getTheNoTeamGroup).css("visibility", "hidden");
			}, 500);
		}
	};
    
    function removeMeFromEvent() {
        /*
        $.ajax({
            type: "POST",
            url: "../php/mapPHP/remove_from_event.php",
            success: function(data) {
            
            },
            error: function(er) {
				
            }
        });
        */
    };
    
    function showSupMenu(source) {
    	var panel;
    	if (source == "showFriendMenu") {
    		panel = document.getElementById("friendMenu");
    	} else if (source == "showMessageMenu") {
    		panel = document.getElementById("messageMenu");
    	} else if (source == "showMyEventsMenu") {
    		panel = document.getElementById("myEventsMenu");
    	} else if (source == "showTeamMenu") {
    		panel = document.getElementById("teamMenu");
    	} else if (source == "settingsProfileMenu") {
            panel = document.getElementById("settingsMenu");
        }
        
        if (source == "settingsProfileMenu") {
            $(panel).css("visibility", "visible");
            $(panel).animateCss("slideInLeft");
        } else {
            $(panel).css("visibility", "visible");
    	   $(panel).animateCss("slideInRight");
        }
    };
    
    function removeSupMenu(source) {
    	var panel;
    	if (source == "friendMenuToggle") {
    		panel = document.getElementById("friendMenu");
    	} else if (source == "messageMenuToggle") {
    		panel = document.getElementById("messageMenu");
    	} else if (source == "myEventsMenuToggle") {
    		panel = document.getElementById("myEventsMenu");
    	} else if (source == "teamMenuToggle") {
    		panel = document.getElementById("teamMenu");
    	} else if (source == "settingsMenuToggle") {
            panel = document.getElementById("settingsMenu");
        }
        
        if (source == "settingsMenuToggle") {
            $(panel).animateCss("slideOutLeft");
        } else {
            $(panel).animateCss("slideOutRight");
        }
        
    	setTimeout(function() {
    		$(panel).css("visibility", "hidden");
    	}, 400);
    };
    
    
    
    function clickBottomMenu(source) {
    	var otherButton = document.getElementsByClassName("supBottomActive");
    	var otherMenu = document.getElementsByClassName("supMenuActive");
		
		try {
			otherButton[0].classList.remove("supBottomActive");
		} catch (err) {
			console.log('error');
		}
		
		try {
			otherMenu[0].classList.add("supMenuNotActive");
			otherMenu[0].classList.remove("supMenuActive");
		} catch (err) {
			console.log('error 2');
		}
		
		
    	var button = document.getElementById(source);
		var isActive = button.classList.contains("supBottomActive");
		
		if (isActive == true) {
			// do nothing
		} else {
			button.classList.add("supBottomActive");
			if (source == "supBottom02") {
				document.getElementById("friendMenu").classList.remove("supMenuNotActive");
				document.getElementById("friendMenu").classList.add("supMenuActive");
			} else if (source == "supBottom03") {
				document.getElementById("myEventsMenu").classList.remove("supMenuNotActive");
				document.getElementById("myEventsMenu").classList.add("supMenuActive");
			} else if (source == "supBottom04") {
				document.getElementById("profileMenu").classList.remove("supMenuNotActive");
				document.getElementById("profileMenu").classList.add("supMenuActive");
			}
		}
    };
	
	
	function onWelcomeInit(user) {
		var testRead = firebase.database().ref('users').orderByKey().equalTo(user.uid);
  		testRead.once('value').then(function(snapShot) {
  			var myObj = snapShot.val();
  			var userID = user.uid;
  			var getUser = myObj[userID];
  			if (getUser.lat == 0) {
  				$('#promotLocationModal').modal('show');
  			} else {
  				// set view to user lat lng, then run query
  				var placeLat = myObj[userID].lat;
  				var placeLng = myObj[userID].lng;
  				map.setCenter([placeLng, placeLat]);
  				setTimeout(function(){
  					runQuery();
  					$('#createAndFilterWrapper').css("visibility", "visible");
  					$('#filterCreateWrap').css("visibility", "visible");
  					$('#myButtonMenu').css("visibility", "visible");
  					
  					$('#createAndFilterWrapper').animateCss("bounceIn");
  					$('#filterCreateWrap').animateCss("bounceIn");
  					$('#myButtonMenu').animateCss("bounceIn");
  				}, 2000);
  			}
		});
	};
	

	
	
	
	
	
	
	
	
	/*
	function viewTodaysEvents(source) {
		var button = document.getElementById(source);
		var buttonText = document.getElementById("todaysEventsButtonText");
		var active = button.classList.contains('active');
		
		if (active == true) {
            $(button).animateCss('rubberBand');
			buttonText.innerHTML = "Today's Events";
			// change icon here
			// add_location
			// pin_drop
			// place
			// close
			// refresh
			document.getElementById('todaysEventsIconButton').innerHTML = "event_available";
			$(button).css({
				"background": "#fff",
				"color": "#154360"
			});
			runQuery();
			button.classList.remove('active');
		} else if (active == false) {
			getRidOfViewMyEvents("testNewMyEventsButton", 0);
            $(button).animateCss('rubberBand');
			buttonText.innerHTML = "All Events";
			// change icon here
			document.getElementById('todaysEventsIconButton').innerHTML = "refresh";
			$(button).css({
				"background": "#CB4335",
				"color": "#fff"
			});
		
			var todaysDate = newDateList[0][0] + " " + newDateList[0][1] + " " + newDateList[0][2];
		
			$.ajax({
				type: "POST",
				url: "../php/mapPHP/todays_events.php",
				data: "todaysDate=" + todaysDate,
				dataType: "json",
				success: function(data) {
					clearPoints();
					var i;
					var dataLength = data.length;
					for (i=0; i < dataLength; i++) {
						addPoint(data[i].lat, data[i].lng, data[i].eventName, data[i].eventActivity, data[i].eventId, data[i].userIsInEvent, i, data[i].redTeamNumber, data[i].blueTeamNumber, data[i].eventDate, data[i].eventTime, data[i].isTeamEvent, data[i].description, data[i].isPaidEvent, data[i].isFeaturedEvent, data[i].whichTeam);
					};
					finishPoints();
					window.setTimeout(function() {
						//initRender();
					}, 1000);
				},
				error: function(er) {
					alert('No Events today!');
					getRidOfTodaysEvents('viewTodaysEventsButton', 0)
				}
			});
			button.classList.add('active');
		}
	};*/
	
	
	return {
		clickedCreateEvent: clickedCreateEvent,
		setLatLng: setLatLng,
		toggleProfile: toggleProfile,
		toggleFilter: toggleFilter,
		toggleEventPopUp: toggleEventPopUp,
		joinAnEvent: joinAnEvent,
		displayContentsOfTeam: displayContentsOfTeam,
		resetMarkerFilter: resetMarkerFilter,
		expandTheEventPopup: expandTheEventPopup,
		onWelcomeInit: onWelcomeInit,
		map: map,
		closeJoinedEventPopUp: closeJoinedEventPopUp,
		closeCreateEventPopUp: closeCreateEventPopUp,
        closeResetFilterPopUp: closeResetFilterPopUp,
        removeMeFromEvent: removeMeFromEvent,
        showSupMenu: showSupMenu,
        removeSupMenu: removeSupMenu,
        runQuery: runQuery,
        removeCaro: removeCaro,
        clickBottomMenu: clickBottomMenu,
        moveSliderForToday: moveSliderForToday
	};

})();

window.setTimeout(function() {
	
}, 2000);


$(document).ready(function(){
    //quantumurals.onWelcomeInit();
});
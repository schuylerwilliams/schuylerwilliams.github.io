
function createReport(event) {
	event.preventDefault();
	
	var a = $("#create_report_form").serializeArray();
	a.push({ name: "tab_id", value: "0"});
	
	
	var longitude = place.geometry.location.lng();
	var latitude = place.geometry.location.lat();
	
	a.push({ name: "longitude", value: longitude});
	a.push({ name: "latitude", value: latitude});
	
	var d = new Date();
	var year = d.getFullYear();
	var hour = d.getHours();
	var minute = d.getMinutes();
	var month = d.getMonth();
	var day = d.getDate();
	var specDay = d.getDay();
	var newMonth = month + 1;
	var newSpecDay = specDay + 1;
	
	a.push({ name: "year", value: year});
	a.push({ name: "month", value: newMonth});
	a.push({ name: "day", value: day});
	a.push({ name: "specDay", value: newSpecDay});
	a.push({ name: "hour", value: hour});
	a.push({ name: "minute", value: minute});
	a = a.filter(function(item){return item.value != '';});
	
	$.ajax({
		url: 'js/createReport.php',
		type: 'POST',
		data: a,
		success: function(message) {
			alert('report successfully submitted!');
			document.getElementById("create_report_form").reset();
			if (notQuery == false) {
			
			} else if (notQuery == true) {
				showAllReports(queryReference);
			}
			
			onPlaceChanged();
		},
		error: function(xhr, status, error) {
			alert("Status: " + status + "\nError: " + error);
		}
	});
}
$("#create_report_form").on("submit", createReport);

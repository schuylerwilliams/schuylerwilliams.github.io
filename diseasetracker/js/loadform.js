



function queryReportMeasles(event) {
	event.preventDefault();
	
	var a = $("#query_report_form_Measles").serializeArray();
	a.push({ name: "tab_id", value: "1"});
	a.push({ name: "disease_type", value: "Measles"});
	a = a.filter(function(item){return item.value != '';});
	
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: a,
		success: function(reports) {
			mapInitialization(reports);
		},
		error: function(xhr, status, error) {
			//alert("Status: " + status + "\nError: " + error);
			alert('no!');
		}
	});
}
$("#query_report_form_Measles").on("submit", queryReportMeasles);


function queryReportMumps(event) {
	event.preventDefault();
	
	var a = $("#query_report_form_Mumps").serializeArray();
	a.push({ name: "tab_id", value: "1"});
	a.push({ name: "disease_type", value: "Mumps"});
	a = a.filter(function(item){return item.value != '';});
	
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: a,
		success: function(reports) {
			mapInitialization(reports);
		},
		error: function(xhr, status, error) {
			//alert("Status: " + status + "\nError: " + error);
			alert('no!');
		}
	});
}
$("#query_report_form_Mumps").on("submit", queryReportMumps);


function queryReportRubella(event) {
	event.preventDefault();
	
	var a = $("#query_report_form_Rubella").serializeArray();
	a.push({ name: "tab_id", value: "1"});
	a.push({ name: "disease_type", value: "Rubella"});
	a = a.filter(function(item){return item.value != '';});
	
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: a,
		success: function(reports) {
			mapInitialization(reports);
		},
		error: function(xhr, status, error) {
			//alert("Status: " + status + "\nError: " + error);
			alert('no!');
		}
	});
}
$("#query_report_form_Rubella").on("submit", queryReportRubella);


function queryReportHepatitis(event) {
	event.preventDefault();
	
	var a = $("#query_report_form_Hepatitis").serializeArray();
	a.push({ name: "tab_id", value: "1"});
	a.push({ name: "disease_type", value: "Hepatitis (B,C,A)"});
	a = a.filter(function(item){return item.value != '';});
	
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: a,
		success: function(reports) {
			mapInitialization(reports);
		},
		error: function(xhr, status, error) {
			//alert("Status: " + status + "\nError: " + error);
			alert('no!');
		}
	});
}
$("#query_report_form_Hepatitis").on("submit", queryReportHepatitis);


function queryReportTuberculosis(event) {
	event.preventDefault();
	
	var a = $("#query_report_form_Tuberculosis").serializeArray();
	a.push({ name: "tab_id", value: "1"});
	a.push({ name: "disease_type", value: "Tuberculosis"});
	a = a.filter(function(item){return item.value != '';});
	
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: a,
		success: function(reports) {
			mapInitialization(reports);
		},
		error: function(xhr, status, error) {
			//alert("Status: " + status + "\nError: " + error);
			alert('no!');
		}
	});
}
$("#query_report_form_Tuberculosis").on("submit", queryReportTuberculosis);


function queryReportHIV(event) {
	event.preventDefault();
	
	var a = $("#query_report_form_HIV").serializeArray();
	a.push({ name: "tab_id", value: "1"});
	a.push({ name: "disease_type", value: "HIV/AIDS"});
	a = a.filter(function(item){return item.value != '';});
	
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: a,
		success: function(reports) {
			mapInitialization(reports);
		},
		error: function(xhr, status, error) {
			//alert("Status: " + status + "\nError: " + error);
			alert('no!');
		}
	});
}
$("#query_report_form_HIV").on("submit", queryReportHIV);


function queryReportEbola(event) {
	event.preventDefault();
	
	var a = $("#query_report_form_Ebola").serializeArray();
	a.push({ name: "tab_id", value: "1"});
	a.push({ name: "disease_type", value: "Ebola"});
	a = a.filter(function(item){return item.value != '';});
	
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: a,
		success: function(reports) {
			mapInitialization(reports);
		},
		error: function(xhr, status, error) {
			//alert("Status: " + status + "\nError: " + error);
			alert('no!');
		}
	});
}
$("#query_report_form_Ebola").on("submit", queryReportEbola);


function queryReportSars(event) {
	event.preventDefault();
	
	var a = $("#query_report_form_Sars").serializeArray();
	a.push({ name: "tab_id", value: "1"});
	a.push({ name: "disease_type", value: "SARS"});
	a = a.filter(function(item){return item.value != '';});
	
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: a,
		success: function(reports) {
			mapInitialization(reports);
		},
		error: function(xhr, status, error) {
			//alert("Status: " + status + "\nError: " + error);
			alert('no!');
		}
	});
}
$("#query_report_form_Sars").on("submit", queryReportSars);


function queryReportZika(event) {
	event.preventDefault();
	
	var a = $("#query_report_form_Zika").serializeArray();
	a.push({ name: "tab_id", value: "1"});
	a.push({ name: "disease_type", value: "Zika"});
	a = a.filter(function(item){return item.value != '';});
	
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: a,
		success: function(reports) {
			mapInitialization(reports);
		},
		error: function(xhr, status, error) {
			//alert("Status: " + status + "\nError: " + error);
			alert('no!');
		}
	});
}
$("#query_report_form_Zika").on("submit", queryReportZika);


function queryReportYellowFever(event) {
	event.preventDefault();
	
	var a = $("#query_report_form_YellowFever").serializeArray();
	a.push({ name: "tab_id", value: "1"});
	a.push({ name: "disease_type", value: "Yellow Fever"});
	a = a.filter(function(item){return item.value != '';});
	
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: a,
		success: function(reports) {
			mapInitialization(reports);
		},
		error: function(xhr, status, error) {
			//alert("Status: " + status + "\nError: " + error);
			alert('no!');
		}
	});
}
$("#query_report_form_YellowFever").on("submit", queryReportYellowFever);


function queryReportLyme(event) {
	event.preventDefault();
	
	var a = $("#query_report_form_Lyme").serializeArray();
	a.push({ name: "tab_id", value: "1"});
	a.push({ name: "disease_type", value: "Lyme Disease"});
	a = a.filter(function(item){return item.value != '';});
	
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: a,
		success: function(reports) {
			mapInitialization(reports);
		},
		error: function(xhr, status, error) {
			//alert("Status: " + status + "\nError: " + error);
			alert('no!');
		}
	});
}
$("#query_report_form_Lyme").on("submit", queryReportLyme);


function queryReportHanta(event) {
	event.preventDefault();
	
	var a = $("#query_report_form_Hanta").serializeArray();
	a.push({ name: "tab_id", value: "1"});
	a.push({ name: "disease_type", value: "Hanta Virus"});
	a = a.filter(function(item){return item.value != '';});
	
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: a,
		success: function(reports) {
			mapInitialization(reports);
		},
		error: function(xhr, status, error) {
			//alert("Status: " + status + "\nError: " + error);
			alert('no!');
		}
	});
}
$("#query_report_form_Hanta").on("submit", queryReportHanta);


function queryReportWestNile(event) {
	event.preventDefault();
	
	var a = $("#query_report_form_WestNile").serializeArray();
	a.push({ name: "tab_id", value: "1"});
	a.push({ name: "disease_type", value: "West Nile"});
	a = a.filter(function(item){return item.value != '';});
	
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: a,
		success: function(reports) {
			mapInitialization(reports);
		},
		error: function(xhr, status, error) {
			//alert("Status: " + status + "\nError: " + error);
			alert('no!');
		}
	});
}
$("#query_report_form_WestNile").on("submit", queryReportWestNile);


function queryReportAvian(event) {
	event.preventDefault();
	
	var a = $("#query_report_form_Avian").serializeArray();
	a.push({ name: "tab_id", value: "1"});
	a.push({ name: "disease_type", value: "Avian Influenza (H5N1)"});
	a = a.filter(function(item){return item.value != '';});
	
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: a,
		success: function(reports) {
			mapInitialization(reports);
		},
		error: function(xhr, status, error) {
			//alert("Status: " + status + "\nError: " + error);
			alert('no!');
		}
	});
}
$("#query_report_form_Avian").on("submit", queryReportAvian);


function queryReportSwine(event) {
	event.preventDefault();
	
	var a = $("#query_report_form_Swine").serializeArray();
	a.push({ name: "tab_id", value: "1"});
	a.push({ name: "disease_type", value: "Swine Influenza (H1N1)"});
	a = a.filter(function(item){return item.value != '';});
	
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: a,
		success: function(reports) {
			mapInitialization(reports);
		},
		error: function(xhr, status, error) {
			//alert("Status: " + status + "\nError: " + error);
			alert('no!');
		}
	});
}
$("#query_report_form_Swine").on("submit", queryReportSwine);


function queryReportPolio(event) {
	event.preventDefault();
	
	var a = $("#query_report_form_Polio").serializeArray();
	a.push({ name: "tab_id", value: "1"});
	a.push({ name: "disease_type", value: "Polio"});
	a = a.filter(function(item){return item.value != '';});
	
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: a,
		success: function(reports) {
			mapInitialization(reports);
		},
		error: function(xhr, status, error) {
			//alert("Status: " + status + "\nError: " + error);
			alert('no!');
		}
	});
}
$("#query_report_form_Polio").on("submit", queryReportPolio);


function queryReportMeningitis(event) {
	event.preventDefault();
	
	var a = $("#query_report_form_Meningitis").serializeArray();
	a.push({ name: "tab_id", value: "1"});
	a.push({ name: "disease_type", value: "Meningitis"});
	a = a.filter(function(item){return item.value != '';});
	
	$.ajax({
		url: 'HttpServlet',
		type: 'POST',
		data: a,
		success: function(reports) {
			mapInitialization(reports);
		},
		error: function(xhr, status, error) {
			//alert("Status: " + status + "\nError: " + error);
			alert('no!');
		}
	});
}
$("#query_report_form_Meningitis").on("submit", queryReportMeningitis);





















































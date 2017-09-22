<?php
	include("config.php");
	if($_SERVER["REQUEST_METHOD"] == "POST") {
		$is_male = $_POST['is_male'];
		$age = $_POST['age'];
		$report_type = $_POST['report_type'];
		$disease_type = $_POST['disease_type'];
		$outcome_type = $_POST['outcome_type'];
		$message = $_POST['message'];
		$longitude = $_POST['longitude'];
		$latitude = $_POST['latitude'];
		$year = $_POST['year'];
		$month = $_POST['month'];
		$day = $_POST['day'];
		$specDay = $_POST['specDay'];
		$hour = $_POST['hour'];
		$minute = $_POST['minute'];
		
		$sql = "INSERT INTO reports (disease_type, lat, lng, outcome_type, report_type, is_male, age, message, year, month, day, specDay, hour, minute) VALUES ('$disease_type', '$latitude', '$longitude', '$outcome_type', '$report_type', '$is_male', '$age', '$message', '$year', '$month', '$day', '$specDay', '$hour', '$minute')";
		
		if (mysqli_query($link, $sql)) {
			echo $longitude;
		};
	};
	die();
?>
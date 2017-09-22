<?php
	include("config.php");
	if($_SERVER["REQUEST_METHOD"] == "POST") {
		$tab_id = $_POST["tab_id"];
		if ($tab_id == 1) {
			$disease_type = $_POST["disease_type"];
			$outcome_type = $_POST["outcome_type"];
			$report_type = $_POST["report_type"];
			$sql = "SELECT * FROM reports";
			
			if (($disease_type != null) && ($outcome_type != null)) {
				$sql .= " WHERE disease_type = '$disease_type'";
				$sql .= "and outcome_type = '$outcome_type'";
			} else if (($disease_type != null) && ($outcome_type == null)) {
				$sql .= " WHERE disease_type = '$disease_type'";
			} else if (($disease_type == null) && ($outcome_type != null)) {
				$sql .= " WHERE outcome_type = '$outcome_type'";
			};
			/*
			if ($outcome_type != null) {
				$sql .= "and outcome_type = '$outcome_type'";
			};
			if ($report_type != null) {
				$sql .= "and report_type = '$report_type'";
			};
			*/
			$result = mysqli_query($link, $sql);
			$count = mysqli_num_rows($result);
			$json[] = array();
			if ($count > 0) {
				while($row = mysqli_fetch_array($result)) {
					$bus[] = array(
						'lat' => $row['lat'],
						'lng' => $row['lng'],
						'disease_type' => $row['disease_type'],
						'report_type' => $row['report_type'],
						'outcome_type' => $row['outcome_type'],
						'age' => $row['age'],
						'is_male' => $row['is_male'],
						'message' => $row['message'],
						'year' => $row['year']
					);
					array_push($json, $bus);
				};
				$jsonstring = json_encode($json);
				echo $jsonstring;
			} else {
				die();
			};
		};
	};
	die();
?>
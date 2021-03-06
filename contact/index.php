

<?php
	if (isset($_POST["submit"])) {
		$personName = $_POST['personName'];
		$email = $_POST['email'];
		$userMessage = $_POST['userMessage'];
		$from = 'Demo Contact Form'; 
		$to = 'example@bootstrapbay.com'; 
		$subject = 'Message from Contact Demo ';
		
		$body = "From: $personName\n E-Mail: $email\n Message:\n $userMessage";
 
		// Check if name has been entered
		if (!$_POST['personName']) {
			$errName = 'Please enter your name';
		}
		
		// Check if email has been entered and is valid
		if (!$_POST['email'] || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
			$errEmail = 'Please enter a valid email address';
		}
		
		//Check if message has been entered
		if (!$_POST['userMessage']) {
			$errMessage = 'Please enter your message';
		}
 
// If there are no errors, send the email
if (!$errName && !$errEmail && !$errMessage) {
	if (mail ($to, $subject, $body, $from)) {
		$result='<div class="alert alert-success">Thank You! I will be in touch</div>';
	} else {
		$result='<div class="alert alert-danger">Sorry there was an error sending your message. Please try again.</div>';
	}
}
	}
?>



<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<meta name="viewport" content="width=device-width, initial-scale=1">-->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Sky Williams - Contact</title>

    <!-- Bootstrap Core CSS -->
    <link href="css2/bootstrap.min.css" rel="stylesheet">
    
    
    <!-- google fonts -->
    <!--<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">-->
   <!-- <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet"> -->
     <!--<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"> -->
     <!--<link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet"> -->
     <link href="https://fonts.googleapis.com/css?family=Catamaran" rel="stylesheet"> 
    
    <!-- Custom CSS -->
    <link href="css2/style.css" rel="stylesheet">

</head>

<body id="myBody">
	
	
	
    <div class="container">

        <div class="row">
            <div class="col-md-4 col-md-offset-4 text-center">
                <img id="theImage" src="img/me_03.jpg" class="img-circle" alt="Some guy on a surfboard" width="125" height="125" onclick="clickedTheImage(this.id)">
            </div>
        </div>
       
        
        <div class="row" style="margin-top: 25px;">
        	<div class="col-sm-2 col-sm-offset-3 text-center"">
        		<p id="menuItem01" onmouseover="changeMenuHover(this.id)" onmouseout="changeMenuOut(this.id)" onclick="changeMenuClick(this.id)">My Work</p>
        	</div>
        	
        	<div class="col-sm-2 text-center">
        		<p id="menuItem02" onmouseover="changeMenuHover(this.id)" onmouseout="changeMenuOut(this.id)" onclick="changeMenuClick(this.id)">Resume</p>
        	</div>
        	
        	<div class="col-sm-2 text-center">
        		<p id="menuItem03" onmouseover="changeMenuHover(this.id)" onmouseout="changeMenuOut(this.id)" onclick="changeMenuClick(this.id)">Get In Touch</p>
        	</div>
        </div>
        
        
        <div class="container" style="margin-top:50px;">
        
        <div class="row">
        	<div class="col-sm-7 col-sm-offset-3">
        		 <p>You can get a hold of me by phone at (262) 374-1086, but be sure to leave a message. Preferred method of contact is via email at skywilliams@gmail.com; or simply use the form below to talk to me right now!</p>
        	</div>
        </div>
        
        <div class="row" style="margin-top: 25px;">
        <div class="col-sm-7 col-sm-offset-2">
        

  		<form id="formStyle" class="form-horizontal" role="form" method="post" action="index.php">
  			<div class="form-group">
    			<label class="control-label col-sm-2" for="personName">Name:</label>
    				<div class="col-sm-10">
      					<input type="text" class="form-control" id="personName" name="personName" placeholder="Enter name" value="<?php echo htmlspecialchars($_POST['personName']); ?>">
      					<?php echo "<p class='text-danger'>$errName</p>";?>
    				</div>
  			</div>
  			<div class="form-group">
    			<label class="control-label col-sm-2" for="email">Email:</label>
    				<div class="col-sm-10">
      					<input type="email" class="form-control" id="email" name="email" placeholder="Enter email" value="<?php echo htmlspecialchars($_POST['email']); ?>">
      					<?php echo "<p class='text-danger'>$errEmail</p>";?>
    				</div>
  			</div>
  			<div class="form-group">
    			<label class="control-label col-sm-2" for="phoneNumber">Phone:</label>
    				<div class="col-sm-10">
      					<input type="tel" class="form-control" id="phoneNumber" name="phoneNumber" placeholder="Enter number">
    				</div>
  			</div>
  			<div class="form-group">
    			<label class="control-label col-sm-2" for="userMessage">Message:</label>
    				<div class="col-sm-10">
      					<!--<input type="text" class="form-control" id="userMessage" placeholder="Enter message" rows="5">-->
      					<textarea class="form-control" rows="5" id="userMessage" name="userMessage"><?php echo htmlspecialchars($_POST['userMessage']);?></textarea>
      					<?php echo "<p class='text-danger'>$errMessage</p>";?>
    				</div>
  			</div>
  			<div class="form-group"> 
    			<div class="col-sm-offset-2 col-sm-10">
      				<button type="submit" class="btn btn-default" id="submit" name="submit">Submit</button>
    			</div>
  			</div>
  			<div class="form-group">
				<div class="col-sm-10 col-sm-offset-2">
					<?php echo $result; ?>	
				</div>
			</div>
		</form>
		
		</div>
		</div>
		</div>
        
        
        
        
       <div class="row" style="margin-top:50px;">
        	<div class="col-sm-4 col-sm-offset-3">
        		<p><b>Current Projects</b></p>
        		<p>An outdoor recreation mapping site - <a href="http://mappoth.com/" target="_blank">Mappoth</a></p>
        		<p class="subDate">Start: May 2015</p>
        		
        		<p>A presentation map tool - <a href="https://bordnerlab.github.io/presentation/" target="_blank">Bordner Presentation</a></p>
        		<p class="subDate">Start: September 2016</p>
        		
        		<p>A data exploration project - <a href="https://bordnerlab.github.io/wetlands/" target="_blank">Bordner Wetlands</a></p>
        		<p class="subDate">Start: July 2016</p>
        		
        		<p>Does high speed rail make sense for Wisconsin? - <a href="https://trainsg565.github.io/" target="_blank">Research Project</a></p>
        		<p class="subDate">Start: September 2016</p>
        	</div>
        	
        	<div class="col-sm-4">
        		<p><b>Planned Projects</b></p>
        		<p>Mapping the spread of disease - <a href="#">Public Health Inquiry</a></p>
        		<p class="subDate">Start: January 2017</p>
        		
        		<p>An interactive map displaying twitter choice words - <a href="#">Terrorist Map Plotter</a></p>
        		<p class="subDate">Start: November 2016</p>
        	</div>
        </div>
        
        

    </div>


    <!-- jQuery Version 1.11.1 -->
    <script src="js2/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js2/bootstrap.min.js"></script>
    
    <!-- for contact -->
    <script src='http://adamkramer.nl/js/autosize.min.js'></script>
    
    <script src="js2/script.js"></script>

</body>

</html>
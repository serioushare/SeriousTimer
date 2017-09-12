<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>SeriousTimer.js Testpage</title>
		<link rel="stylesheet" type="text/css" href="css/stimer.css">
		<link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
		<script type="text/javascript" src="/source/build.php"></script>
		<script>
			function run(){
<?=$_POST["c"]?>
			}
		</script>
	</head>
	
	<body onload="run()">
		<form class="shtimer-ui shtimer-ui-codepanel" method="post">
			<button class="shtimer-ui-button" style="display: inline-block;"><i class="fa fa-fw fa-play" aria-hidden="true"></i></button>
<textarea class="shtimer-ui-code" id="shtimer-testcode" name="c">
<?
if($_POST["c"]):
	print_r($_POST["c"]);
else:
?>
// create the timer with an interval of 1000 milliseconds
var timer = new Timer(0, 1000);

// add a simple ontick listener
timer.ontick = function(event){
    console.info("tick");
}

//start the timer
timer.play();
<?
endif;
?>
</textarea>
		</form>
	</body>
</html>

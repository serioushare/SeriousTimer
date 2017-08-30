<?
header('Content-Type: application/javascript');

include("src/readme.txt");
include("src/const.js");
?>

(function closure(){
	const me = window;

<?
include("Classes/Timer.js");
include("Classes/TimerEvent.js");
include("Classes/TimerMarker.js");
?>

}());

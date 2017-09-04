<?
header('Content-Type: application/javascript');

$build = $_GET["b"]? in_array($_GET["b"], scandir("Source"))? $_GET["b"] : array_pop(scandir("Source")) : array_pop(scandir("Source"));

$manifest_raw = file_get_contents("Source/$build/manifest.json");
$manifest = json_decode($manifest_raw);

$version  = $manifest->version->major.".";
$version .= $manifest->version->minor.".";
$version .= $manifest->version->build < 10000? substr("000".$manifest->version->build, -4) : $manifest->version->build;

?>

/**[SeriousBuilder]***************************************************************************
 * Name:       <?=$manifest->project?> 
 * Version:    <?=$version?> 
 * Language:   JavaScript 
 *****************************************************************************[Serious Hare]**/

<?
include("Source/$build/Classes/Timer.js");
include("Source/$build/Classes/Timer.Statics.js");
include("Source/$build/Classes/TimerEvent.js");
include("Source/$build/Classes/TimerMarker.js");

include("Source/$build/Extends/Context.js");

include("Source/$build/Extends/Math.js");
?>

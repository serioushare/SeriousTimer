<?
header('Content-Type: application/javascript');

$build = $_GET["b"]? in_array($_GET["b"], scandir("Source"))? $_GET["b"] : array_pop(scandir("Source")) : array_pop(scandir("Source"));
?>

/**[SHTimer]**********************************************************************************
 * Name:       SeriousTimer                                                                  *
 * Version:    0.1.<?=$build?>                                                                      *
 * Language:   Javascript                                                                    *
 *****************************************************************************[Serious Hare]**/

<?
include("Source/$build/Classes/Timer.js");
include("Source/$build/Classes/Timer.Statics.js");
include("Source/$build/Classes/TimerEvent.js");
include("Source/$build/Classes/TimerMarker.js");

include("Source/$build/Extends/Math.js");
?>

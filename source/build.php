
/**[SeriousBuilder]***************************************************************************
<?
header('Content-Type: application/javascript');
$builds = array_diff(scandir("../source"), array(".", "..", "build.php"));
$build = $_GET["b"]? in_array($_GET["b"], $builds)? $_GET["b"] : array_pop($builds) : array_pop($builds);
$build_raw = file_get_contents("$build/build.json");
$buildplan = json_decode($build_raw);
$version  = $buildplan->version->major.".";
$version .= $buildplan->version->minor.".";
$version .= $buildplan->version->build < 10000? substr("000".$buildplan->version->build, -4) : $buildplan->version->build;
?>
 * Name:       <?=$buildplan->project?> 
 * Version:    <?=$version?> 
 * Language:   JavaScript 
 *****************************************************************************[Serious Hare]**/

<?
if($buildplan->use_closure)echo "(function closure(context){\n";
for($i=0; $i<count($buildplan->files); $i++){
	$file = $buildplan->files[$i]->path;
	include("$build/$file");
}
if($buildplan->use_closure)echo "}(this))";
?>

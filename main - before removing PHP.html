<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Honus</title>
    <!-- Load jQuery from Google's CDN -->
    <!-- Load jQuery UI CSS  -->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
    
    <!-- Load jQuery JS -->
    <script src="https://code.jquery.com/jquery-1.9.1.js"></script>
    <!-- Load jQuery UI Main JS  -->
    <script src="https://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
    
    <!-- Load SCRIPT.JS which will create datepicker for input field  -->
    <script type="text/javascript"  src="/scripts/script.js"></script>
    
    <link rel="stylesheet" type="text/css"  href="/stylesheets/stylesheet.css" />
</head>

<?php  // FUNCTIONS put at top of file
// this function does nothing and isn't used. It is repeated below where it is actually used.
//echo date('h');echo date('M');date("F j, Y, g:i a");echo "\n".date("    D M j G:i:s T Y");    echo "abc\r\ndef";        
	function foo($arg_1, $arg_2, /* ..., */ $arg_n)
	{
			$away_code = $datescoreboardpagexml -> game[0] -> attributes() -> away_code;
		$home_code = $datescoreboardpagexml -> game[0] -> attributes() -> home_code;
		$selectedgamemasterscoreboard = $datescoreboardpagexml -> game[0];
		$filename = "http://gd2.mlb.com/components/game/mlb/year_{$year}/month_{$month}/day_{$day}/gid_{$year}_{$month}_{$day}_{$away_code}mlb_{$home_code}mlb_{$dbh}/media/highlights.xml";
		$headlines = array();
		$blurbs = array();
		$urls = array();
		$homepage = file_get_contents($filename);
		if ( substr($homepage,0,23) == "GameDay - 404 Not Found") {
			echo "\nNo highlights yet";
		} else {
			$xml = simplexml_load_string($homepage);
			echo $xml;
			foreach ($xml as $media) {
				array_push($headlines,$media->headline);
				array_push($blurbs,$media->blurb);
				array_push($urls,$media->url);
			}
		}
	
	}
	
	function createGameOnclickURLForJS ( $gototeam , $gotoyear , $gotomonth , $gotoday, $gotonbr) {
		// gives URL for the onclick, is a relative link
		if((int)$gotonbr == 1) {$gotonbr=null;};
		$gotodata = array (
			'team' => $gototeam,
			'date' => $gotoyear . $gotomonth . $gotoday,
			'dbh'  => $gotonbr
			//'year' => $gotoyear,
			//'month' => $gotomonth,
			//'day' => $gotoday			
		);
		return "window.location.href = '/?" . http_build_query($gotodata) . "'";
	}
	function createGameOnclickURLForJSRelative($gototeam , $gotoyear , $gotomonth , $gotoday, $offset) {
		// Gives URL for another game but does relative dates, eg +-1 day
		$gotodatestring = date('Ymd', strtotime($offset .' day', strtotime( $gotoyear.'/'.$gotomonth . '/' . $gotoday )));
		$gotodata = array (
			'team' => $gototeam,
			'date' => $gotodatestring
		);
		return "window.location.href = '/?" . http_build_query($gotodata) . "'";
	}
//echo createGameOnclickURLForJS("CIN","2013","08",'08');
?>


<?php // GET data from URL
    if (isset($_GET['team'])){
        //echo 'team is set<br />';
		//echo $_GET['team'];
		$team = $_GET['team'];
	} else {
        //echo 'team is not set<br />';
	}
    //if (isset($_GET['date']))
        //echo 'date is set<br />';
	//else
        //echo 'date is not set<br />';
?>
<?php // GET data from URL

//$GETdata = array();

//if( isset($_GET['date']) ){
//    $GETdata['date'] = $_GET['date'];
//}
//if( isset($_GET['team']) ){
 //   $GETdata['team'] = $_GET['team'];
//}

$teamslist = array('ANA','ARI','ATL','BAL','BOS','CHA','CHN','CIN','CLE','COL','DET','HOU','KCA','LAN','MIA','MIL','MIN','NYA','NYN','OAK','PHI','PIT','SDN','SEA','SFN','SLN','TBA','TEX','TOR','WAS');

//$teamcricmap = array('ANA'=>'Los Angeles Angels','ARI'=>'Arizona Diamondbacks','ATL'=>'Atlanta Braves','BAL'=>'Baltimore Orioles',
//	'BOS'=>'Boston Red Sox','CHA'=>'Chicago White Sox','CHN'=>'Chicago Cubs','CIN'=>"Cincinnati Reds",
//	'CLE'=>'Cleveland Indians','COL'=>'Colorado Rockies','DET'=>'Detroit Tigers','HOU'=>'Houston Astros',
//	'KCA'=>'Kansas City Royals','LAN'=>'Los Angeles Dodgers','MIA'=>'Miami Marlins','MIL'=>'Milwaukee Braves',
//	'MIN'=>'Minnesota Twins','NYA'=>'New York Yankees','NYN'=>'New York Mets','OAK'=>'Oakland Athletics','PHI'=>'Philadelphia Phillies','PIT'=>'Pittsburgh Pirates',
//	'SDN'=>'San Diego Padres','SEA'=>'Seattle Mariners','SFN'=>'San Francisco Giants','SLN'=>'St Louis Cardinals',
//	'TBA'=>'Tampa Bay Rays','TEX'=>'Texas Rangers','TOR'=>'Toronto Blue Jays','WAS'=>'Washington Nationals');
	
$teamcricmap2 = array('ANA'=>'Los-Angeles-Angels','ARI'=>'Arizona-Diamondbacks','ATL'=>'Atlanta-Braves','BAL'=>'Baltimore-Orioles',
	'BOS'=>'Boston-Red-Sox','CHA'=>'Chicago-White-Sox','CHN'=>'Chicago-Cubs','CIN'=>'Cincinnati-Reds',
	'CLE'=>'Cleveland-Indians','COL'=>'Colorado-Rockies','DET'=>'Detroit-Tigers','HOU'=>'Houston-Astros',
	'KCA'=>'Kansas-City-Royals','LAN'=>'Los-Angeles-Dodgers','MIA'=>'Miami-Marlins','MIL'=>'Milwaukee-Brewers',
	'MIN'=>'Minnesota-Twins','NYA'=>'New-York-Yankees','NYN'=>'New-York-Mets','OAK'=>'Oakland-Athletics','PHI'=>'Philadelphia-Phillies','PIT'=>'Pittsburgh-Pirates',
	'SDN'=>'San-Diego-Padres','SEA'=>'Seattle-Mariners','SFN'=>'San-Francisco-Giants','SLN'=>'St-Louis-Cardinals',
	'TBA'=>'Tampa-Bay-Rays','TEX'=>'Texas-Rangers','TOR'=>'Toronto-Blue-Jays','WAS'=>'Washington-Nationals');
?>


<?php
	// set date today
	#$gdate =  getdate();
	#echo $gdate['mday'];
	// Use West coast time, in future will just use previous day if before 11 AM maybe, or if no games have started
	date_default_timezone_set('America/Los_Angeles');
	#echo date('d');
	$year = date('Y');
	$month = date('m');
	$day = date('d');
	$yeartoday = date('Y');
	$monthtoday = date('m');
	$daytoday = date('d');
	$team = "MIN";
	// get incoming data if available
	$GETdata = array();
	if( isset($_GET['date']) ){
		$GETdata['date'] = $_GET['date'];
		$date = $_GET['date'];
		$date_parsed = date_parse($date);
		$year = $date_parsed['year'];
		$month = strval($date_parsed['month']); if (strlen($month) == 1) {$month = "0" . $month;};
		$day = strval($date_parsed['day']); if (strlen($day) == 1) {$day = "0" . $day;};
		//echo "The year is ".$year . $month . $day. " got it??"; echo gettype($month);
	}
	if( isset($_GET['team']) ){
		$GETdata['team'] = $_GET['team'];
		$team =  $_GET['team'];
	}
	$dbh = 1;
	if( isset($_GET['dbh']) ){
		$GETdata['dbh'] = $_GET['dbh'];
		$dbh =  $_GET['dbh'];
	}
	// moved this chunk above select team box to set default
//echo date('Ymd', strtotime('1 day', strtotime("08/01/2015"))); 
//echo createGameOnclickURLForJSRelative('COL',2015,8,1,-1);
?>

<?php  //moved this higher to get teams earlier
	// get scoreboard as XML
	$dateurl = "http://gd2.mlb.com/components/game/mlb/year_".$year."/month_".$month."/day_".$day."/";
	$datepage = file_get_contents($dateurl);
	$datescoreboardurl = $dateurl."master_scoreboard.xml";
	$datescoreboardpage = file_get_contents($datescoreboardurl);
	$datescoreboardpagexml = simplexml_load_string($datescoreboardpage);

	$selectedgamenumber = 0; 
	if (count($datescoreboardpagexml -> game) == 0) { // Exits script if no games on selected date (days after ASG). Copied this code from datepicker below.
		echo "<p>Error: No games today, choose another day</p>";
		echo '<body><table><tr>
			<td>Date:</td> 
			<td><input type="text" id="datepicker"> </td>
			<!--<td>&#8647; </td>
			<td>&#8592;</td>  -->
			<td class="datemovearrow" onclick="' . createGameOnclickURLForJSRelative($team,$year,$month,$day,-2) . '" >&#10092;</td>
			<td class="datemovearrow" onclick="' . createGameOnclickURLForJSRelative($team,$year,$month,$day,-1) . '" >&#10096;</td>
			<td class="datemovearrow" onclick="' . createGameOnclickURLForJS($team,$yeartoday,$monthtoday,$daytoday,'1') . '" >&#10074;</td>
			<td class="datemovearrow" onclick="' . createGameOnclickURLForJSRelative($team,$year,$month,$day,+1) . '" >&#10097;</td>
			<td class="datemovearrow" onclick="' . createGameOnclickURLForJSRelative($team,$year,$month,$day,+2) . '" >&#10093;</td>
			<td><button onclick=\'goToDatePicked()\'> Go! </button></td>
		</tr></table></body>';
		exit(); //exit("Exiting");
	};
	$hometeam = $datescoreboardpagexml -> game[0]->attributes()-> home_code;
	$awayteam = $datescoreboardpagexml -> game[0]->attributes()-> away_code;
	$hometeamname = $datescoreboardpagexml -> game[0]->attributes()-> home_team_name;
	$awayteamname = $datescoreboardpagexml -> game[0]->attributes()-> away_team_name;
	$selectedgamenbr = $datescoreboardpagexml -> game[0]->attributes()-> game_nbr;
	$iii = 0;
	foreach($datescoreboardpagexml as $a) {
		//if (  (strtoupper($a->attributes()-> home_code) == strtoupper($team)) ) {echo "FOUND IThome!";echo $iii;}
		//if (  (strtoupper($a->attributes()-> away_code) == strtoupper($team)) ) {echo "FOUND ITaway!";echo $iii;}
		echo $a -> attributes() -> nbr;
		if (  ((strtoupper($a->attributes()-> away_code) == strtoupper($team)) || (strtoupper($a->attributes()-> home_code) == strtoupper($team))) && ((int)$a->attributes()-> game_nbr <= (int)$dbh) ) {
			//echo "FOUND ITaway!";
			//echo $iii;
			$selectedgamenumber = $iii;
			$hometeam = $a->attributes()-> home_code;
			$awayteam = $a->attributes()-> away_code;
			$hometeamname = $a->attributes()-> home_team_name;
			$awayteamname = $a->attributes()-> away_team_name;
			$selectedgamenbr = $a->attributes()-> game_nbr;
		}
		//echo  strtoupper($a->attributes()-> home_code); echo $team;
		$iii = $iii + 1;
	}
	
	$away_code = $datescoreboardpagexml -> game[$selectedgamenumber] -> attributes() -> away_code;
	$home_code = $datescoreboardpagexml -> game[$selectedgamenumber] -> attributes() -> home_code;
	
?>


<?php
// This section sets the datepicker day to the selected day
echo '<script  type="text/javascript">
	//  jQuery ready function. Specify a function to execute when the DOM is fully loaded. 
	$(document).ready(
	  // This is the function that will get executed after the DOM is fully loaded 
	  function () {//console.log("ready 0987520933");
		$( "#datepicker" ).datepicker({
		  changeMonth: true,//this option for allowing user to select month
		  changeYear: true //this option for allowing user to select from year range
		});
		var today = new Date();console.log("08"+"/"+today.getDate()+"/"+today.getFullYear());
		//$( "#datepicker" ).datepicker("setDate",(today.getMonth()+1)+"/"+today.getDate()+"/"+today.getFullYear());
		$( "#datepicker" ).datepicker("setDate",' . $month . '+"/"+ ' . $day . '+"/"+' . $year . ');
	  }

	);
	</script>';
?>



<body>

<table id="toptable"><tr>
	<td>
		<h3 align='center' style='color:magenta;cursor:pointer;padding-right:8px;' onclick='window.location.href="/"'>Honus<h1>
	</td>
	<td>
		Team:
	</td>
	<td>
		<select name="team" id="selectteam">
		<?php foreach ($teamslist as $tt) {
			echo '<option value="',$tt,'" '; 
			if (strtoupper($team) == strtoupper($tt)){ echo 'selected="selected"';};
			echo '>',$tt,'</option>';
			} 
		?>
		</select>
	</td>
	<td>
		<table><tr>
			<td>Date:</td> 
			<td><input type="text" id="datepicker"> </td>
			<!--<td>&#8647; </td>
			<td>&#8592;</td>  -->
			<td class="datemovearrow" onclick="<?php echo createGameOnclickURLForJSRelative($team,$year,$month,$day,-2);?>" >&#10092;</td>
			<td class="datemovearrow" onclick="<?php echo createGameOnclickURLForJSRelative($team,$year,$month,$day,-1);?>" >&#10096;</td>
			<td class="datemovearrow" onclick="<?php echo createGameOnclickURLForJS($team,$yeartoday,$monthtoday,$daytoday,'1');?>" >&#10074;</td>
			<td class="datemovearrow" onclick="<?php echo createGameOnclickURLForJSRelative($team,$year,$month,$day,+1);?>" >&#10097;</td>
			<td class="datemovearrow" onclick="<?php echo createGameOnclickURLForJSRelative($team,$year,$month,$day,+2);?>" >&#10093;</td>
			<td><button onclick='goToDatePicked()'> Go! </button></td>
		</tr></table>
	</td>
	<td width="20px"></td>
	<td><h4>
		<?php  //$awayteamname . " vs " . $hometeamname ?> 
		<?php 
			echo "<a href='" . $datescoreboardurl . "' style='text-decoration:none;color:#b3ffff;' target='_blank'>" . 
				$awayteamname . " (". $datescoreboardpagexml -> game[$selectedgamenumber]->attributes()-> away_win . '-' . $datescoreboardpagexml -> game[$selectedgamenumber]->attributes()-> away_loss . ')' . 
				" vs " . $hometeamname . " (" . $datescoreboardpagexml -> game[$selectedgamenumber]->attributes()-> home_win . "-" . $datescoreboardpagexml -> game[$selectedgamenumber]->attributes()-> home_loss . ")" .  "</a>";
		?>
		
	</h4></td>
	<td>
		<?php
			// Box score at top right
			
			$rawboxscoreurl = "http://gd2.mlb.com/components/game/mlb/year_{$year}/month_{$month}/day_{$day}/gid_{$year}_{$month}_{$day}_{$away_code}mlb_{$home_code}mlb_{$dbh}/rawboxscore.xml";
			//echo $rawboxscoreurl;
			$rawboxscorecontents = file_get_contents($rawboxscoreurl);
			// Have to skip if game hasn't started yet
			$rawboxscorenotavail= (substr($rawboxscorecontents,0,23) == "GameDay - 404 Not Found");
			if ($rawboxscorenotavail) {
				//echo "\nNo highlights yet";
			} else { // otherwise print the top boxscore			
				$rawboxscore = simplexml_load_string($rawboxscorecontents);
				echo '<table id="toplinescore"><tr>';
				echo '<td><table><tr><td>&nbsp;</td></tr><tr><td>' . strtoupper($away_code) . '</td></tr><tr><td>' . strtoupper($home_code) . '</td></tr></table></td>';
				// loop through each inning and print the scores
				foreach($rawboxscore -> linescore -> inning_line_score as $abc) {
					echo '<td><table>';
					echo '<tr><td style="border-bottom:solid #80ffff">' . $abc -> attributes() -> inning . '</td></tr>';
					echo '<tr><td>';
					if (strlen($abc -> attributes() -> away) > 0) {
						echo $abc -> attributes() -> away;
					} else {
						echo '-';
					}
					echo '</td></tr>';
					echo '<tr><td>';
					if (strlen($abc -> attributes() -> home) > 0) {
						echo $abc -> attributes() -> home;
					} else {
						echo '-';
					}
					echo '</td></tr>';
					echo '</table></td>';
				}
				// and summary stats
				echo '<td><table style="border-left:thick double #80ffff">';
				echo '<tr><td style="border-bottom:solid #80ffff">R</td></tr>';
				echo '<tr><td>' . $rawboxscore -> linescore -> attributes() -> away_team_runs . '</td></tr>';
				echo '<tr><td>' . $rawboxscore -> linescore -> attributes() -> home_team_runs . '</td></tr>';
				echo '</table></td>';
				echo '<td><table>';
				echo '<tr><td style="border-bottom:solid #80ffff">H</td></tr>';
				echo '<tr><td>' . $rawboxscore -> linescore -> attributes() -> away_team_hits . '</td></tr>';
				echo '<tr><td>' . $rawboxscore -> linescore -> attributes() -> home_team_hits . '</td></tr>';
				echo '</table></td>';
				echo '<td><table>';
				echo '<tr><td style="border-bottom:solid #80ffff">E</td></tr>';
				echo '<tr><td>' . $rawboxscore -> linescore -> attributes() -> away_team_errors. '</td></tr>';
				echo '<tr><td>' . $rawboxscore -> linescore -> attributes() -> home_team_errors. '</td></tr>';
				echo '</table></td>';
				// finish boxscore
			}
			$mlbgamedayurl = "http://mlb.mlb.com/mlb/gameday/index.jsp?gid={$year}_{$month}_{$day}_{$away_code}mlb_{$home_code}mlb_{$dbh}";
			echo '<td style="padding-left:20px;"><a style="color:inherit;text-decoration:none;" target="_blank" href="http://mlb.mlb.com/home"><img src="http://www.mlb.com/favicon.ico" /></a></td>';
			echo '<td><a style="color:inherit;text-decoration:none;" target="_blank" href="http://mlb.mlb.com/mlb/standings/index.jsp">Standings</a><br />' . 
					'<a style="color:inherit;text-decoration:none;" target="_blank" href="'.$mlbgamedayurl.'">Gameday</a></td>';
			echo '<td><a href="https://www.reddit.com/r/baseball" target="_blank"><img src="https://www.reddit.com/favicon.ico" /></a></td>';
			echo '<td>';
				$cricgameurl2 = "http://cricfree.sx/watch/live/".$teamcricmap2[strtoupper($away_code)]."-vs-".$teamcricmap2[strtoupper($home_code)]."-live-streaming";
				echo "<a href='".$cricgameurl2."' target='_blank' style='color:inherit;text-decoration:none;'>&#9762;</a>";
				$cricgameurl3 = "http://cricfree.sx/watch/live/".$teamcricmap2[strtoupper($home_code)]."-vs-".$teamcricmap2[strtoupper($away_code)]."-live-streaming";
				echo "<br />";
				echo "<a href='".$cricgameurl3."' target='_blank' style='color:inherit;text-decoration:none;'>&#9760;</a>";
			echo '</td>';
			echo '</tr></table>';
			
		?>
	</td>
</tr></table>
 


<table id="midtable"><tr style="vertical-align:top;">
<td>


<?php

	// create table of scores, each row is a game
	echo "<table id='scorestable'>";
	$iii = 0; // keep track of which game each is
	// loop over each game
	foreach($datescoreboardpagexml as $a) {
		//echo substr($a->attributes()-> away_code , 0,3);
		// add new row for each game
		echo '<tr class="scorestablegame" id="' . datescoreboardgamenumber . $iii . '" onclick="' . createGameOnclickURLForJS(  substr($a->attributes()-> away_code   , 0, 3   )     ,$year,$month,$day, (int)($a->attributes()->game_nbr)) .'">
		<td class="scorestablegametd">';
			echo "<table><tr><td>",$a->attributes()->away_team_name,"</td></tr><tr><td>",$a->attributes()->home_team_name,"</td></tr></table>\n";
			// go through each possibility for game status, should have two tds to fill
			if (($a->status->attributes()->status)=="Final" || ($a->status->attributes()->status) == "Game Over" || ($a->status->attributes()->status) == "Completed Early" ) {
				echo "</td><td>";
				$winning_pitcher_line='-';$losing_pitcher_line='-';
				$winning_pitcher_line = "W:" . $a -> winning_pitcher ->attributes() -> last . "(" . $a -> winning_pitcher ->attributes() -> wins . "-" . $a -> winning_pitcher ->attributes() -> losses . ")";
				//echo $a -> winning_pitcher ->attributes() -> last . "(" . $a -> winning_pitcher ->attributes() -> wins . "-" , $a -> winning_pitcher ->attributes() -> losses , ")";;
				$losing_pitcher_line  = "L:" . $a -> losing_pitcher  ->attributes() -> last . "(" . $a -> losing_pitcher  ->attributes() -> wins . "-" . $a -> losing_pitcher  ->attributes() -> losses . ")";
				$away_gray = False; $home_gray = False;
				if( ((int)$a->linescore->r->attributes()->away) >  ((int)$a->linescore->r->attributes()->home)) {
					$away_pitcher_line = $winning_pitcher_line;$home_pitcher_line = $losing_pitcher_line;
					$away_gray = ($a -> winning_pitcher ->attributes() -> last=="Gray");$home_gray = ($a -> losing_pitcher ->attributes() -> last=="Gray");
				} else {
					$home_pitcher_line = $winning_pitcher_line;$away_pitcher_line = $losing_pitcher_line;
					$home_gray = ($a -> winning_pitcher ->attributes() -> last=="Gray");$away_gray = ($a -> losing_pitcher ->attributes() -> last=="Gray");
				}
				/*echo "<table><tr><td>", $a->linescore->r->attributes()->away, " ", $away_pitcher_line,"</td></tr>";
				echo "<tr><td>",$a->linescore->r->attributes()->home, " ", $home_pitcher_line, "</td></tr></table>\n";
				echo "</td><td>";
				echo "F";*/
				echo "<table><tr><td>", $a->linescore->r->attributes()->away,"</td>";
				if ($a -> status -> attributes() -> inning != "9") {echo "<td rowspan='2'>" . /*$a -> status -> attributes() -> ind . */ "/" . $a -> status -> attributes() -> inning . "</td>";}
				else {echo "<td rowspan='2' style='text-align:center;'>" . /*$a -> status -> attributes() -> ind .*/ "</td>";}
				echo "</tr>";
				echo "<tr><td>",$a->linescore->r->attributes()->home, "</td>";
				echo "</tr></table>\n";
				echo "</td><td>";
				echo "<table><tr><td";if ($away_gray) {echo " style='color:gray;'";};echo ">",  $away_pitcher_line,"</td></tr>";
				echo "<tr><td";if ($home_gray) {echo " style='color:gray;'";};echo ">", $home_pitcher_line, "</td></tr></table>\n";
				
			} elseif (($a->status->attributes()->status)=="In Progress" || ($a->status->attributes()->status)=="Review" || ($a->status->attributes()->status)=="Manager Challenge" || ($a->status->attributes()->status)=="Delayed") {
				echo "</td><td>";
				  echo "<table><tr><td>";
				echo "<table><tr><td>",$a->linescore->r->attributes()->away,"</td></tr><tr><td>",$a->linescore->r->attributes()->home,"</td></tr></table>\n";
				echo "</td><td>";
				  echo "</td><td>";
				//if ($a -> attributes() -> is_no_hiter){echo 'NH';}
				if (($a->status->attributes()->top_inning)=="Y"){echo "&#x25B2;";} else {echo "&#x25BC;";}
				echo $a->status->attributes()->inning; 
				$outs = $a->status->attributes()-> o; 
				if($outs == '0') { // display number of outs with dots or pipe
					// do nothing
				} else if($outs == '1'){
					echo '<b>&#0149;</b>';
				} else if($outs == '2'){
					echo '<b>:</b>';
				} else if ($outs=='3'){
					echo '&#10073;';
				} else {
					echo $outs;
				};
				$baseRunnerStatus = $a -> runners_on_base -> attributes() -> status;
				//echo "<div style='padding-left:0px'>";
				//echo "<img src='/transparent.png' alt='Baserunners' height='12' width='2' />";
				//echo "<img src='/Baserunners" . $baseRunnerStatus . ".png' alt='Baserunners' height='12' width='12' />";
				//echo "</div>";
				if(($a->status->attributes()->status)=="Delayed"){echo ' Delayed<br />',$a->status->attributes()->reason;}
				// next four lines get link to MLB.tv, FGOD no longer points to media center
				$mlbtvlink = $a -> links -> attributes() -> mlbtv;
				$mlbtvlink_number = explode("'", (string)$mlbtvlink)[1];
				$mlbtvlink_url = "http://m.mlb.com/tv/e" . $mlbtvlink_number;
				if ($a -> game_media -> media -> attributes() -> free == "ALL") { // link to MLB.tv, says FGOD or is TV symbol
					//echo "<br><a href='http://mlb.mlb.com/mediacenter/' target='_blank' style='text-decoration: none'>FGOD</a>";
					echo "<br><a href='" . $mlbtvlink_url . "' target='_blank'  style='text-decoration: none;color:inherit'>FGOD</a>";
				} else {
					echo "<br><a href='" . $mlbtvlink_url . "' target='_blank'  style='text-decoration: none;color:inherit'>&#x1F4FA;</a>";
				}
				echo " <img src='/Baserunners" . $baseRunnerStatus . ".png' alt='Baserunners' height='12' width='12' />";
				echo "</td></tr></table><td>";
				echo "<table><tr><td>P:".$a -> pitcher -> attributes() -> last . "</td></tr>";
				echo "<tr><td>B:". $a -> batter -> attributes() -> last  . "</td>";
				echo "</tr></table>";
				echo "</td>";
				
			} elseif (($a->status->attributes()->status)=="Preview" || ($a->status->attributes()->status)=="Pre-Game" || ($a->status->attributes()->status)=="Warmup") {
				//echo "</td><td>";
				//echo "<table><tr><td>",$a->away_probable_pitcher->attributes()->last_name,"</td></tr><tr><td>",$a->home_probable_pitcher->attributes()->last_name,"</td></tr></table>\n";
				//echo "</td><td>";
				//echo $a->attributes()->time," ET";
				echo "</td><td>";
				echo $a->attributes()->time," ET";
				if($a -> game_media -> media -> attributes() -> free == "ALL") {echo "<br><a href='http://mlb.mlb.com/mediacenter/' target='_blank' style='color:inherit;text-decoration:none'>FGOD</a>";}
				echo "</td><td>";
				echo "<table><tr><td";  if ($a->away_probable_pitcher->attributes()->last_name=="Gray") {echo " style='color:gray;'";};  // Gray easter egg, it's Gray Day!
				echo">",$a->away_probable_pitcher->attributes()->last_name,"(",$a->away_probable_pitcher->attributes()->wins,"-",$a->away_probable_pitcher->attributes()->losses,")</td></tr>";
				echo "<tr><td"; if ($a->home_probable_pitcher->attributes()->last_name=="Gray") {echo " style='color:gray;'";};
				echo ">",$a->home_probable_pitcher->attributes()->last_name,"(",$a->home_probable_pitcher->attributes()->wins,"-",$a->home_probable_pitcher->attributes()->losses,")</td></tr></table>\n";
			} elseif (($a->status->attributes()->status)=="Delayed Start") {
				echo "</td><td>";
				echo "Delayed<br>Start";
				if($a -> game_media -> media -> attributes() -> free == "ALL") {echo "<br><a href='http://mlb.mlb.com/mediacenter/' target='_blank' style='color:inherit;text-decoration:none'>FGOD</a>";}
				echo "</td><td>";
				echo "<table><tr><td";  if ($a->away_probable_pitcher->attributes()->last_name=="Gray") {echo " style='color:gray;'";};  // Gray easter egg, it's Gray Day!
				echo">",$a->away_probable_pitcher->attributes()->last_name,"(",$a->away_probable_pitcher->attributes()->wins,"-",$a->away_probable_pitcher->attributes()->losses,")</td></tr>";
				echo "<tr><td"; if ($a->home_probable_pitcher->attributes()->last_name=="Gray") {echo " style='color:gray;'";};
				echo ">",$a->home_probable_pitcher->attributes()->last_name,"(",$a->home_probable_pitcher->attributes()->wins,"-",$a->home_probable_pitcher->attributes()->losses,")</td></tr></table>\n";
			} elseif (($a->status->attributes()->status)=="Postponed") {
				echo "</td><td>";
				//echo "<table><tr><td>",$a->linescore->r->attributes()->away,"</td></tr><tr><td>",$a->linescore->r->attributes()->home,"</td></tr></table>";
				echo "PP";
				echo "</td><td>";
				//echo "PP";
				echo $a->status->attributes()->reason;
			} elseif (($a->status->attributes()->status)=="Cancelled") { // e.g. 9/25/16 RIP Jose Fernandez
				echo "</td><td>";
				echo "Cancelled";
				echo "</td><td>";
				echo $a->status->attributes()->reason;
			} elseif (($a->status->attributes()->status)=="notDelayed") { // MOVED THIS INTO In-Progress SINCE I WANT SCORE STILL AND INNING
				echo "</td><td>";
				//echo "<table><tr><td>",$a->linescore->r->attributes()->away,"</td></tr><tr><td>",$a->linescore->r->attributes()->home,"</td></tr></table>";
				echo "Delayed";
				echo "</td><td>";
				//echo "PP";
				echo $a->status->attributes()->reason;
			} else {
				echo $a->status->attributes()->status ;
			}
		echo "</td></tr>\n";
		$iii = $iii + 1;
	}
	echo "</table>";
	
	// Make it clear which game is currently selected
	//echo "<script>document.getElementById('datescoreboardgamenumber" . $selectedgamenumber . "').setAttribute('style', 'font-weight:bold')</script>";
	echo "<script type='text/javascript'>document.getElementById('datescoreboardgamenumber" . $selectedgamenumber . "').style['font-weight']='bold'</script>";
	echo "<script type='text/javascript'>document.getElementById('datescoreboardgamenumber" . $selectedgamenumber . "').style.color='black'</script>\n";
	echo "<script type='text/javascript'>document.getElementById('datescoreboardgamenumber" . $selectedgamenumber . "').style.background='#e0ccff'</script>";
?>

<?php	
	//$away_code = $datescoreboardpagexml -> game[$selectedgamenumber] -> attributes() -> away_code;
	//$home_code = $datescoreboardpagexml -> game[$selectedgamenumber] -> attributes() -> home_code;
	//echo $away_name_brev;
	//echo "before?<p>";
	//echo print_r($datescoreboardpagexml -> game[0] -> attributes()  );
	//echo "</p>sworking?";
	$selectedgamemasterscoreboard = $datescoreboardpagexml -> game[0];
	//echo $selectedgamemasterscoreboard -> attributes() -> home_team_name;
	//foreach($datescoreboardpagexml as $ii) {echo $ii;echo " ";};
	//echo "before hilites";
	//$filename = "http://gd2.mlb.com/components/game/mlb/year_2015/month_06/day_14/gid_2015_06_14_lanmlb_sdnmlb_1/media/highlights.xml";
	#$addif2016 = "";
	#if ($year >= 2016) {
	#	$addif2016 = "_es";
	#}
	#$filename = "http://gd2.mlb.com/components/game/mlb/year_{$year}/month_{$month}/day_{$day}/gid_{$year}_{$month}_{$day}_{$away_code}mlb_{$home_code}mlb_1/media/highlights{$addif2016}.xml";
	# Switching to get highlights from mobile.xml
	$filename = "http://gd2.mlb.com/components/game/mlb/year_{$year}/month_{$month}/day_{$day}/gid_{$year}_{$month}_{$day}_{$away_code}mlb_{$home_code}mlb_{$dbh}/media/mobile.xml";
	//echo $filename;
	$headlines = array();
	$blurbs = array();
	$urls = array();
	$homepage = file_get_contents($filename);
	//echo $homepage;echo 12;
	//echo substr($homepage,0,23);
	if ( substr($homepage,0,23) == "GameDay - 404 Not Found") {
		//echo "\nNo highlights yet";
	} else {
		$xml = simplexml_load_string($homepage);
		//echo $xml;
		foreach ($xml as $media) {
			array_push($headlines,$media->headline);
			array_push($blurbs,$media->blurb);
			//array_push($urls,$media->url[3]);
			
			// The following section finds the mp4 url if possible since it is listed first in 2016 but was 4th in 2015.
			$someurladded = 0;
			foreach($media->url as $books) { // books is the url tag because I copied it from a books example
				if ($books->attributes()[0] =="FLASH_1200K_640X360") {  // If the attribute value is this, it adds it
					array_push($urls,$books);
					$someurladded = $someurladded + 1; // keep of track whether or not one has been added
				}
			} 
			if ($someurladded == 0) { // if it didn't find the mp4, just take the first one
				array_push($urls,$media->url[0]);
				echo 'Error 987235 no mp4 found';
			}
			if ($someurladded >1) {
				echo 'Error 3873259 added more than one URL';
			}
		}
	}
	

?>

</td>
 <td>

<table>
	<tr>
		<td style="vertical-align:top;"><table id="headlinestable">
			<?php // This section prints the headlines for the highlights
				if (count($headlines)>0) { // if there is at least one, loop over them
					for ($iii=0; $iii<count($headlines); $iii++) {
						$headline = $headlines[$iii];
						//$url = $urls[$iii]; now using different qualities/sizes
						// Get the urls for various video qualities
						$url1200K = $urls[$iii];
						$url2500K = str_replace('1200K','2500K',$url1200K);
						$url1800K = str_replace('1200K','1800K',$url1200K);
						$url = $url1800K; // This sets the quality
						// Echo the headline
						echo "<tr class='headlinestabletr' id='headlinetr",$iii,"' onclick='document.getElementById(\"headlinetr",$iii,"\").style.background = \"#e0ccff\";'>
								<td id='headline",$iii,"' class='headlinestabletd' 
								onclick='document.getElementById(\"videoplayer\").setAttribute(\"src\", \"",$url,"\");
								document.getElementById(\"videoplayer\").autoplay=true;'>",$headline,"</td>
								<td><a href='" . $url . "'  target='_blank'  style='text-decoration: none'>&#8599;</a></td>";
						// Echo the higher and lower quality videos, printed as arrows
						echo "	<td><table style='font-size:.47em'><tr><td onclick='document.getElementById(\"videoplayer\").setAttribute(\"src\", \"",$url2500K,"\");
									document.getElementById(\"videoplayer\").autoplay=true;'>
									&#x25B2;
								</td></tr><tr>
								<td onclick='document.getElementById(\"videoplayer\").setAttribute(\"src\", \"",$url1200K,"\");
									document.getElementById(\"videoplayer\").autoplay=true;'>
									&#x25BC;
								</td></tr></table></td>";
						echo "	</tr>";
					}
				} else {
					//echo 'no game yet';
				}
			?>
		</table></td>
		<td style="vertical-align:top;">
			<?php
			// This section makes the video player
				// make video player if any headlines
				if (count($headlines)>0) {
					echo '<video id="videoplayer" controls  onclick="this.paused ? this.play() : this.pause();">
					<source src="<?php echo $urls[0];?>" type="video/mp4">
					Your browser does not support the video tag.
					</video>';
				} else { // else do something else
					//echo '<img src="http://mlb.mlb.com/mlb/images/devices/teamBackdrop/teamBackdrop.jpg" />';
					
					// This takes images from the following page. Usually it is the probable pitchers before the game starts, or current pitcher and batter if already started
					// When it is the free game of the day, one of the images just says something about being free game, should try to change that
					$novideofilename = "http://gd2.mlb.com/components/game/mlb/year_{$year}/month_{$month}/day_{$day}/gid_{$year}_{$month}_{$day}_{$away_code}mlb_{$home_code}mlb_{$dbh}/atv_preview_noscores.xml";
					$novideohomepage = file_get_contents($novideofilename);
					$novideoxml = simplexml_load_string($novideohomepage);					
					echo '<img src="' . $novideoxml -> body -> preview -> baseballLineScorePreview -> banners -> imageWithLabels -> image . '" />';
					echo '<img src="' . $novideoxml -> body -> preview -> baseballLineScorePreview -> banners -> imageWithLabels[1] -> image . '" />';
				}
			?>
		</td>
	</tr>
</table>


</td>
</tr></table>

<?php
	// adding table for current pitcher and batter and ondeck and inhole
	$a = $datescoreboardpagexml -> game[$selectedgamenumber];
	if (($a->status->attributes()->status)=="In Progress" || ($a->status->attributes()->status)=="Review" || ($a->status->attributes()->status)=="Manager Challenge" || ($a->status->attributes()->status)=="Delayed") {
		//echo "in progress<br>";
		echo "<table><tr><td>";
		echo "Last play: " . $a -> pbp -> attributes() -> last;
		echo "</td></tr><tr><td>";
		echo "Pitching: " . $a -> pitcher -> attributes() -> name_display_roster . " - " . $a -> pitcher -> attributes() -> ip . " IP, " . $a -> pitcher -> attributes() -> er . 
			" ER, " . $a -> pitcher -> attributes() -> wins . "-" . $a -> pitcher -> attributes() -> losses . ", " . $a -> pitcher -> attributes() -> era . " ERA<br />";
		echo "Batting: " . $a -> batter -> attributes() -> name_display_roster . " - " . $a -> batter -> attributes() -> h  . "/" . $a -> batter -> attributes() -> ab  . " " . $a -> batter -> attributes() -> avg  . 
			"/" . $a -> batter -> attributes() -> obp . "/" . $a -> batter -> attributes() -> slg . ", " . $a -> batter -> attributes() -> hr . " HR, " . $a -> batter -> attributes() -> rbi . " RBI<br />";
		echo "On deck: " . $a -> ondeck -> attributes() -> name_display_roster . " - " . $a -> ondeck -> attributes() -> h  . "/" . $a -> ondeck -> attributes() -> ab  . " " . $a -> ondeck -> attributes() -> avg  . 
			"/" . $a -> ondeck -> attributes() -> obp . "/" . $a -> ondeck -> attributes() -> slg . ", " . $a -> ondeck -> attributes() -> hr . " HR, " . $a -> ondeck -> attributes() -> rbi . " RBI<br />";
		echo "In hole: " . $a -> inhole -> attributes() -> name_display_roster . " - " . $a -> inhole -> attributes() -> h  . "/" . $a -> inhole -> attributes() -> ab  . " " . $a -> inhole -> attributes() -> avg  . 
			"/" . $a -> inhole -> attributes() -> obp . "/" . $a -> inhole -> attributes() -> slg . ", " . $a -> inhole -> attributes() -> hr . " HR, " . $a -> inhole -> attributes() -> rbi . " RBI<br />";
		echo "</td></tr></table>";
	}
?>


<?php
	// working on getting scoring plays here
	$inning_Scores_url = "http://gd2.mlb.com/components/game/mlb/year_{$year}/month_{$month}/day_{$day}/gid_{$year}_{$month}_{$day}_{$away_code}mlb_{$home_code}mlb_{$dbh}/inning/inning_Scores.xml";
	//echo $rawboxscoreurl;
	$inning_Scores_contents = file_get_contents($inning_Scores_url);
	// Have to skip if game hasn't started yet
	$inning_Scores_notavail= (substr($inning_Scores_contents,0,23) == "GameDay - 404 Not Found");
	if ($inning_Scores_notavail) {
		//echo "\nNo inning_Scores yet\n";
		//echo $inning_Scores_url;
	} else { // otherwise print the top boxscore	
		echo '<table id="scoringplaystable" >';
		$inning_Scores = simplexml_load_string($inning_Scores_contents);
		// loop through all scoring plays
		echo '<tr><td class="fullboxscoretd">Inning</td><td class="fullboxscoretd">Away</td><td class="fullboxscoretd">Home</td><td class="fullboxscoretd">Scoring Play</td></tr>';
		foreach($inning_Scores -> score as $inning_score) {
			echo '<tr>';
			echo '<td class="fullboxscoretd" style="text-align:center;">' . $inning_score -> attributes() -> inn . '</td>';
			echo '<td class="fullboxscoretd" style="text-align:center;">' . $inning_score -> attributes() -> away . '</td>';
			echo '<td class="fullboxscoretd" style="text-align:center;">' . $inning_score -> attributes() -> home . '</td>';
			if ($inning_score -> attributes() -> pbp != "") {
				echo '<td class="fullboxscoretd">' . $inning_score -> attributes() -> pbp . '</td>';
			} else {
				echo '<td class="fullboxscoretd">' . $inning_score -> atbat -> attributes() -> des . '</td>';
			}
			echo '</tr>';
		}

		echo '<table>';
	}

?>


<?php
	// Second try at boxscore, this time with more stats
	$boxscoreurl = "http://gd2.mlb.com/components/game/mlb/year_{$year}/month_{$month}/day_{$day}/gid_{$year}_{$month}_{$day}_{$away_code}mlb_{$home_code}mlb_{$dbh}/boxscore.xml";
	//echo $rawboxscoreurl;
	$boxscorecontents = file_get_contents($boxscoreurl);
	// Have to skip if game hasn't started yet
	$boxscorenotavail= (substr($boxscorecontents,0,23) == "GameDay - 404 Not Found");
	if ($boxscorenotavail) {
		//echo "\nNo highlights yet";
	} else { // otherwise print the top boxscore			
		//$rawboxscore = simplexml_load_string($rawboxscorecontents);
		$boxscore = simplexml_load_string($boxscorecontents);
		//echo $rawboxscore -> team[0] -> batting -> batter[0] -> attributes() -> sb;
		
		echo '<table><tr>';
		foreach(range(0,1) as $teamii) {
			//echo ($boxscore -> batting[$teamii] -> attributes() -> team_flag == 'home');
			// The following makes it do away team first, then home
			$teamiii = +!(($boxscore -> batting[0] -> attributes() -> team_flag == 'home') == ($teamii));
			$teamiiiname = '';
			if($boxscore -> batting[$teamiii] -> attributes() -> team_flag == 'home') {
				$teamiiiname = $boxscore -> attributes() -> home_sname;
			} else {
				$teamiiiname = $boxscore -> attributes() -> away_sname;
			}
			//echo $teamiii;
			echo '<td  style="vertical-align:top;"><table class="fullboxscoretables" >';
			echo '<tr>';
			//echo '<td>' . $rawboxscore -> team[$teamiii] -> attributes() -> full_name . '</td>';
			//echo '<td>' . $boxscore -> batting[$teamiii] -> attributes() -> team_flag . '</td>';
			echo '<td class="fullboxscoretd">' . $teamiiiname . '</td>';
			echo '<td class="fullboxscoretd">' . 'POS' . '</td>';
			echo '<td class="fullboxscoretd">' . 'H' . '</td>';
			echo '<td class="fullboxscoretd">' . 'AB' . '</td>';
			echo '<td class="fullboxscoretd">' . 'BB' . '</td>';
			echo '<td class="fullboxscoretd">' . 'SO' . '</td>';
			echo '<td class="fullboxscoretd">' . 'HR' . '</td>';
			echo '<td class="fullboxscoretd">' . 'RBI' . '</td>';
			echo '<td class="fullboxscoretd">' . 'SB' . '</td>';
			echo '<td class="fullboxscoretd">' . 'AVG' . '</td>';
			echo '<td class="fullboxscoretd">' . 'OBP' . '</td>';
			echo '<td class="fullboxscoretd">' . 'OPS' . '</td>';
			echo '<td class="fullboxscoretd">' . 'HR' . '</td>';
			echo '<td class="fullboxscoretd">' . 'RBI' . '</td>';
			echo '</tr>';
			foreach($boxscore -> batting[$teamiii] -> batter as $batter) {  // loop over all batters and put their stats
				if (!is_null($batter -> attributes() -> bo)) { // leave off AL pitchers, they have no bo attribute since they don't bat, no need to display
					echo '<tr>';
					echo '<td class="fullboxscoretd"><a class="playernamelink" target="_blank" href="http://m.mlb.com/gameday/player/'. $batter -> attributes() -> id .'"><div style="text-align:left;" >';
					if (substr($batter -> attributes() -> bo,1,2) != "00") {echo "- ";}
					echo $batter -> attributes() -> name_display_first_last . '</div></a></td>';
					echo '<td class="fullboxscoretd">' . $batter -> attributes() -> pos . '</td>';
					echo '<td class="fullboxscoretd">' . $batter -> attributes() -> h . '</td>';
					echo '<td class="fullboxscoretd">' . $batter -> attributes() -> ab . '</td>';
					echo '<td class="fullboxscoretd">' . $batter -> attributes() -> bb . '</td>';
					echo '<td class="fullboxscoretd">' . $batter -> attributes() -> so . '</td>';
					echo '<td class="fullboxscoretd">' . $batter -> attributes() -> hr . '</td>';
					echo '<td class="fullboxscoretd">' . $batter -> attributes() -> rbi . '</td>';
					if ($batter -> attributes() -> sb == "0" and $batter -> attributes() -> cs == "0") {
					echo '<td class="fullboxscoretd">' . "" . '</td>';
					} else {
					echo '<td class="fullboxscoretd">' . $batter -> attributes() -> sb . "/" . (intval($batter -> attributes() -> cs) + intval($batter -> attributes() -> sb)) . '</td>';
					}
					echo '<td class="fullboxscoretd">' . $batter -> attributes() -> avg . '</td>';
					echo '<td class="fullboxscoretd">' . $batter -> attributes() -> obp . '</td>';
					echo '<td class="fullboxscoretd">' . $batter -> attributes() -> ops . '</td>';
					echo '<td class="fullboxscoretd">' . $batter -> attributes() -> s_hr . '</td>';
					echo '<td class="fullboxscoretd">' . $batter -> attributes() -> s_rbi . '</td>';
					echo '</tr>';
				}
			}
			echo '</table></td>';
		}
		echo '</tr>';
		//echo '</table>';  # combining pitching and batting to same table
	}
?>


<?php
	// pitching data
	// Have to skip if game hasn't started yet
	if ($boxscorenotavail) {
		//echo "\nNo highlights yet";
	} else { // otherwise print the top boxscore			
		echo '<tr>';
		foreach(range(0,1) as $teamii) {
			// The following makes it do away team first, then home
			$teamiii = +!(($boxscore -> batting[0] -> attributes() -> team_flag == 'home') == ($teamii));
			$teamiiiname = '';
			if($boxscore -> batting[$teamiii] -> attributes() -> team_flag == 'home') {
				$teamiiiname = $boxscore -> attributes() -> home_sname;
			} else {
				$teamiiiname = $boxscore -> attributes() -> away_sname;
			}
			echo '<td style="vertical-align:top;"><table class="fullboxscoretables">';
			echo '<tr>';
			echo '<td class="fullboxscoretd">' . $teamiiiname . '</td>';
			echo '<td class="fullboxscoretd">' . 'POS' . '</td>';
			echo '<td class="fullboxscoretd">' . 'INN' . '</td>';
			echo '<td class="fullboxscoretd">' . 'ER' . '</td>';
			echo '<td class="fullboxscoretd">' . 'R' . '</td>';
			echo '<td class="fullboxscoretd">' . 'H' . '</td>';
			echo '<td class="fullboxscoretd">' . 'BB' . '</td>';
			echo '<td class="fullboxscoretd">' . 'SO' . '</td>';
			echo '<td class="fullboxscoretd">' . 'HR' . '</td>';
			echo '<td class="fullboxscoretd">' . 'NP' . '</td>';
			echo '<td class="fullboxscoretd">' . 'W-L' . '</td>';
			//echo '<td class="fullboxscoretd">' . 'L' . '</td>';
			echo '<td class="fullboxscoretd">' . 'SV' . '</td>';
			echo '<td class="fullboxscoretd">' . 'ERA' . '</td>';
			echo '</tr>';
			// Loop over each pitcher, print their stats
			foreach($boxscore -> pitching[1-$teamiii] -> pitcher as $pitcher) {
				echo '<tr>';
				echo '<td class="fullboxscoretd"><a class="playernamelink"  target="_blank" href="http://m.mlb.com/gameday/player/'. $pitcher -> attributes() -> id .'"><div style="text-align:left;">' . $pitcher -> attributes() -> name_display_first_last . '</div></td>';
				echo '<td class="fullboxscoretd">' . $pitcher -> attributes() -> pos . '</td>';
				echo '<td class="fullboxscoretd">' . floor(((int)$pitcher -> attributes() -> out)/3) . '.' . ((int)$pitcher -> attributes() -> out)%3 . '</td>';
				echo '<td class="fullboxscoretd">' . $pitcher -> attributes() -> er . '</td>';
				echo '<td class="fullboxscoretd">' . $pitcher -> attributes() -> r . '</td>';
				echo '<td class="fullboxscoretd">' . $pitcher -> attributes() -> h . '</td>';
				echo '<td class="fullboxscoretd">' . $pitcher -> attributes() -> bb . '</td>';
				echo '<td class="fullboxscoretd">' . $pitcher -> attributes() -> so . '</td>';
				echo '<td class="fullboxscoretd">' . $pitcher -> attributes() -> hr . '</td>';
				echo '<td class="fullboxscoretd">' . $pitcher -> attributes() -> np . '</td>';
				echo '<td class="fullboxscoretd">' . $pitcher -> attributes() -> w . '-' . $pitcher -> attributes() -> l . '</td>';
				//echo '<td class="fullboxscoretd">' . $pitcher -> attributes() -> l . '</td>';
				echo '<td class="fullboxscoretd">' . $pitcher -> attributes() -> sv . '</td>';
				echo '<td class="fullboxscoretd">' . $pitcher -> attributes() -> era . '</td>';
				echo '</tr>';
			}
			// end team pitching table
			echo '</table></td>';
		}
		// end pitching row
		echo '</tr>';
		// end stats table
		echo '</table>';
	}
?>

<?php 
	//echo "<br /><br />\nCurrent time: " . date("    D M j G:i:s T Y"); 
	#$dp = date_parse("20130803");
	#echo $dp['day'];
	echo '<br />';
	//echo $filename;
	//echo '<div align="right"><a href="' . $filename . '"   target="_blank" style="color:inherit;text-decoration:none;">' . gd2 . '</a></div>';
?>

<div align="right">
	Suggestions, comments, questions? Email <a href="mailto:Honus1064@gmail.com" style="color:inherit;">Honus1064@gmail.com</a>
</div>

<?php
	
?>
</body>
</html>
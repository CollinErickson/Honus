//console.log("here in script.js");

/*
//  jQuery ready function. Specify a function to execute when the DOM is fully loaded. 
$(document).ready(
  
  // This is the function that will get executed after the DOM is fully loaded 
  function () {console.log("ready 0987520933");
    $( "#datepicker" ).datepicker({
      changeMonth: true,//this option for allowing user to select month
      changeYear: true //this option for allowing user to select from year range
    });
	var today = new Date();console.log("08"+"/"+today.getDate()+"/"+today.getFullYear());
	$( "#datepicker" ).datepicker("setDate",(today.getMonth()+1)+"/"+today.getDate()+"/"+today.getFullYear());
  }

);*/


function goToDatePicked() {
	console.log("in goToDatePicked");
	 var day = $( "#datepicker" ).datepicker( "getDate" ).getDate()  ;
	 day = day.toString();
	 if (day.length == 1) { day = "0" + day ;}
	 var month =   $( "#datepicker" ).datepicker( "getDate" ).getMonth() + 1  ;
	 month = month.toString();
	 if (month.length == 1) { month = "0" + month ;}
	 var year =   $( "#datepicker" ).datepicker( "getDate" ).getFullYear()   ;
	 year = year.toString();
	 console.log(day,month,year);
	 
	 selectteam
	 var e = document.getElementById("selectteam");
	 var team = e.options[e.selectedIndex].value;
	 
	 // Old way would change URL and reload
	 //window.location.href = '/?date=' + year + month + day + '&team=' + team ;
	 // Now try to do it in place
	 runAllJS(year, month, day, team);
}

function get_JSON_as_object(url) {
	const proxyurl = "https://cors-anywhere.herokuapp.com/";
	//const url = "http://gd2.mlb.com/components/game/mlb/year_2019/month_04/day_01/master_scoreboard.json"; // site that doesn’t send Access-Control-*
	console.log('about to fetch', proxyurl + url);
	return fetch(proxyurl + url)
}

function runAllJS(year_, month_, day_, team_) {
	// Set global variables
	year = year_;
	month = month_;
	day = day_;
	team = team_;
	
	var selected_game = -1;
	var game_pk = null;
	
	
	console.log("running my runAllJS");
	// get master scoreboard
	const url = "http://gd2.mlb.com/components/game/mlb/year_" + year +"/month_" + month + "/day_" + day + "/master_scoreboard.json"; // site that doesn’t send Access-Control-*
	console.log('about to fetch', url);
	//var fetchout = fetch(proxyurl + url)
	var fetchout = get_JSON_as_object(url)
	.then(response => response.text())
	.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
	.then(contents => {console.log(contents); return contents;})
	.then(response => {console.log("Here's the JSON", JSON.parse(response)); return JSON.parse(response);})
	.catch(() => console.log("Error parsing"))
	.then(x => {
	console.log('x is', x.data.games.game);
	for (var i=0; i < x.data.games.game.length; i++) {console.log("game" + i, x.data.games.game[i].linescore);};
	return x;
	})
	.then( x => {

		setBoxScores(x);
		return x;
	})
	.then( x => {

		doAllHighlights();
		
		
		return x;
	})
	;
	
	
}


function doAllHighlights() {
	
	/////////////////////////////////////
	// Get highlights for selected game
	/////////////////////////////////////
	//var pk = "565898";
	//const proxyurl = "https://cors-anywhere.herokuapp.com/";
	var game_url = "https://statsapi.mlb.com/api/v1/game/" + game_pk +"/content?language=en";
	// Get game JSON
	console.log("about to fetch api for game, ", game_url);
	//fetch(proxyurl + game_url)
	get_JSON_as_object(game_url)
	.then(response => response.text())
	.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
	//.then(contents => {console.log(contents); return contents;})
	.then(response => {console.log("Here's the JSON", JSON.parse(response)); return JSON.parse(response);})
	.catch(() => console.log("Error parsing"))
	.then( g => {
		console.log("Starting to make highlights div");
		//g = JSON.parse(x);
		gh = g.highlights.highlights.items;
		var tx = "";
		//console.log('gh is', gh);
		for (var i = 0; i < gh.length; i++) {
		//console.log(gh[i]);
			//tx += "<tr><td>" + gh[i].headline + gh[i].playbacks[0].url + "</td></tr>";
			// Opens video in new window
			// tx += "<tr><td id='headline" + i + "' class='headlinestabletd'><a href='" + gh[i].playbacks[0].url + "' target='_blank' style='text-decoration: none'>" +gh[i].headline + "</a></td></tr>";
			// Play in player
			tx += "<tr><td id='headline" + i;
			tx += "' class='headlinestabletd' onclick='document.getElementById(\"videoplayer\").setAttribute(\"src\", \"" + gh[i].playbacks[0].url + "\"); ";
			tx += "document.getElementById(\"videoplayer\").autoplay=true;' >" +gh[i].headline + "</td></tr>";
		}
		//console.log(tx);
		
		document.getElementById('headlinestable').innerHTML = tx;
	})
}

function setBoxScores(x) {
	console.log("in setBoxScores");
	console.log("x is ", x);
	
	////////////////////////
	// Get box score table on left side
	//////////////////////
	
	// Get selected_game from given team
	for (var i=0; i < x.data.games.game.length; i++) {
		if (team == x.data.games.game[i].away_name_abbrev) {
			selected_game = i;
			team_is_home = false;
			game_pk = x.data.games.game[i].game_pk;
		}
		if (team == x.data.games.game[i].home_name_abbrev) {
			selected_game = i;
			team_is_home = true;
			game_pk = x.data.games.game[i].game_pk;
		}
	}
	// If team doesn't match any, set it first on list
	if (selected_game < 0) {
		console.log("team not found in list of games");
		selected_game = 0;
		team = x.data.games.game[0].home_name_abbrev;
		team_is_home = true;
	}
	
	console.log("team is", team, "selected_game is", selected_game);
	
	// Set date forward/backward arrows onclick action
	// Need to check for end of month errors!!!
	document.getElementById("datemovearrowb2").onclick = function() {runAllJS(year, month, String(parseInt(day)-2).padStart(2, '0'), team)};
	document.getElementById("datemovearrowb1").onclick = function() {runAllJS(year, month, String(parseInt(day)-1).padStart(2, '0'), team)};
	document.getElementById("datemovearrowf1").onclick = function() {runAllJS(year, month, String(parseInt(day)+1).padStart(2, '0'), team)};
	document.getElementById("datemovearrowf2").onclick = function() {runAllJS(year, month, String(parseInt(day)+2).padStart(2, '0'), team)};
	
	
	var tx = "";
	tx += "<table border='1' style='border-bottom:1px solid red;'>";

	for (var i=0; i < x.data.games.game.length; i++) {
		//console.log("game" + i, x.data.games.game[i].linescore);
		//tx += "<tr><td>" + i + x.data.games.game[i].away_team_name + "-" + x.data.games.game[i].home_team_name + x.data.games.game[i].linescore.r.away + "-" + x.data.games.game[i].linescore.r.home + "</td></tr>";
		// start table for this box, will be 1x3
		console.log("<tr onclick='console.log(\"UPDATING VIDEO\");team=\"" + x.data.games.game[i].home_name_abbrev + "\";selected_game=\""+i+"\";team_is_home=\"true\";game_pk=\""+x.data.games.game[i].game_pk+"\";doAllHighlights())'");
		tx += "<tr onclick='console.log(\"UPDATING VIDEO\");team=\"" + x.data.games.game[i].home_name_abbrev + "\";selected_game=\""+i+"\";team_is_home=\"true\";game_pk=\""+x.data.games.game[i].game_pk+"\";doAllHighlights()'";
		if (i == selected_game) {
			tx += " style='border:5px solid pink'";
		} else {
			tx += "<tr>";
		}
		tx += ">";
		// first td is team names
		tx += "<td><table><tr><td>" + x.data.games.game[i].away_team_name + "</td></tr><tr><td>"+ x.data.games.game[i].home_team_name + "</td></tr></table></td>";
		// 2nd and 3rd td depend on status, go over cases
		if (["Final", "Game Over", "Completed Early"].includes(x.data.games.game[i].status.status)) {
			// second td is score
			tx += "<td><table><tr><td>" + x.data.games.game[i].linescore.r.away + "</td></tr><tr><td>"+ x.data.games.game[i].linescore.r.home + "</td></tr></table></td>";
			// third td is win/loss pitchers
			var losing_pitcher_text = x.data.games.game[i].losing_pitcher.last + " (" +x.data.games.game[i].losing_pitcher.wins + "-" + x.data.games.game[i].losing_pitcher.losses + ")";
			var winning_pitcher_text = x.data.games.game[i].winning_pitcher.last + " (" +x.data.games.game[i].winning_pitcher.wins + "-" + x.data.games.game[i].winning_pitcher.losses + ")";
			var home_team_won = (parseInt(x.data.games.game[i].linescore.r.home) > parseInt(x.data.games.game[i].linescore.r.away));
			if (home_team_won) {
				var away_pitcher_text = losing_pitcher_text;
				var home_pitcher_text = winning_pitcher_text;
			} else {
				var away_pitcher_text = winning_pitcher_text;
				var home_pitcher_text = losing_pitcher_text;
			}
			tx += "<td><table><tr><td>" + away_pitcher_text + "</td></tr><tr><td>"+ home_pitcher_text + "</td></tr></table></td>";
		} else if (["In Progress", "Review", "Manager Challenge", "Delayed"].includes(x.data.games.game[i].status.status)) {
			// 2nd td is score
			tx += "<td><table><tr><td>" + x.data.games.game[i].linescore.r.away + "</td></tr><tr><td>"+ x.data.games.game[i].linescore.r.home + "</td></tr></table></td>";
			// 3rd td is inning num, batter pitcher
			tx += "<td>";
			if (x.data.games.game[i].status.inning_state == "Top") {
				tx +="&#x25B2;";
			} else if (x.data.games.game[i].status.inning_state == "Bottom") {
				tx += "&#x25BC;";
			} else if (x.data.games.game[i].status.inning_state == "End") {
				tx += "E";
			} else {
				tx += "InningStatus is " + x.data.games.game[i].status.inning_state;
			}
			tx += x.data.games.game[i].status.inning;
			// Show batter and pitcher
			tx += "<table><tr><td>P: " + x.data.games.game[i].pitcher.name_display_roster + "(" + x.data.games.game[i].pitcher.wins + "-" + x.data.games.game[i].pitcher.losses + ")" + "</td></tr>";
			tx += "<tr><td>B: " + x.data.games.game[i].batter.name_display_roster + "(" + x.data.games.game[i].batter.avg + ")" + "</td></tr></table>";
			tx += "</td>";
			//tx += "<td><table><tr><td>" + x.data.games.game[i].status.inning_state + x.data.games.game[i].status.inning + "</td></tr><tr><td>"+ 123 + "</td></tr></table></td>";
			
		} else if (["Postponed"].includes(x.data.games.game[i].status.status))  {
			tx += "<td></td><td>Postponed</td>";
		} else if (["Preview"].includes(x.data.games.game[i].status.status))  {
			// Second column is start time
			tx += "<td>" + x.data.games.game[i].time + " " + x.data.games.game[i].time_zone + "</td>";
			// Third column is probables
			tx += "<td><table>";
			tx += "<tr><td>" + x.data.games.game[i].away_probable_pitcher.name_display_roster + "(" + x.data.games.game[i].away_probable_pitcher.wins + "-" + x.data.games.game[i].away_probable_pitcher.losses + ")" + "</td></tr>";
			tx += "<tr><td>" + x.data.games.game[i].home_probable_pitcher.name_display_roster + "(" + x.data.games.game[i].home_probable_pitcher.wins + "-" + x.data.games.game[i].home_probable_pitcher.losses + ")" + "</td></tr>";
			tx += "</table></td>";
		} else {
			tx += "<td></td><td>Status is " + x.data.games.game[i].status.status + "</td>";
		}
		tx += "</tr>";
	};
	tx += "</table>";
	// set this for the table text
	document.getElementById('boxes_td').innerHTML = tx;
	console.log("MADE BOXES FROM MY FUNC");
	return;
}
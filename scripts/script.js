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

function get_JSON_as_response(url) {
	const proxyurl = "https://cors-anywhere.herokuapp.com/";
	//const url = "http://gd2.mlb.com/components/game/mlb/year_2019/month_04/day_01/master_scoreboard.json"; // site that doesn’t send Access-Control-*
	console.log('about to fetch', proxyurl + url);
	return fetch(proxyurl + url)
}

function get_JSON_as_object(url) {
	return get_JSON_as_response(url)
	.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
	.then(response => response.text())
	.then(response => JSON.parse(response))
	.catch(() => console.log("Error parsing" + url))

}

function runAllJS_relativeDateChange(year_, month_, day_, team_, plus_minus_days) {
	var date = new Date(month_ + "/" + day_ + "/" + year_)
	
	console.log("relDate start date is", date);
	date.setDate(date.getDate() + plus_minus_days);
	var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
	//dateString.substr(5,2) + "/" + dateString.substr(8,2) + "/" + dateString.substr(0,4);
	month_ = dateString.substr(5,2);
	day_ = dateString.substr(8,2);
	year_ = dateString.substr(0,4);
	console.log("final date is ", month_, day_, year_);
	return runAllJS(year_, month_, day_, team_);
}

function runAllJS_changeToToday(team_) {
	var date = new Date();
	var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
	//dateString.substr(5,2) + "/" + dateString.substr(8,2) + "/" + dateString.substr(0,4);
	month_ = dateString.substr(5,2);
	day_ = dateString.substr(8,2);
	year_ = dateString.substr(0,4);
	console.log("final date is ", month_, day_, year_);
	return runAllJS(year_, month_, day_, team_);
}

function runAllJS(year_, month_, day_, team_) {
	// Set global variables
	year = year_;
	month = month_;
	day = day_;
	team = team_;
	// Check if day < 01 or  > num days in month
	var tmpdate = new Date(month + "/" + day + "/" + year)
	document.getElementById('datepicker').value = month + "/" + day + "/" + year;
	
	var selected_game = -1;
	var game_pk = null;
	
	
	// get master scoreboard
	const url = "http://gd2.mlb.com/components/game/mlb/year_" + year +"/month_" + month + "/day_" + day + "/master_scoreboard.json"; // site that doesn’t send Access-Control-*
	console.log('about to fetch', url);
	//var fetchout = fetch(proxyurl + url)
	var fetchout = get_JSON_as_response(url)
	.then(response => response.text())
	.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
	//.then(contents => {console.log(contents); return contents;})
	.then(response => {return JSON.parse(response);})
	.catch(() => console.log("Error parsing"))
	.then(x => {
		if (x && x.data && x.data.games && x.data.games.game) {
			console.log('x is');
			console.log(x.data.games.game);
			console.log('game 0 is');
			console.log(x.data.games.game[0]);
		}
	//for (var i=0; i < x.data.games.game.length; i++) {console.log("game" + i, x.data.games.game[i].linescore);};
	return x;
	})
	.then( x => {

		setBoxScores(x);
		return x;
	})
	.then( x => {

		// doAllHighlights();
		setForNewSelectedGame(x);
		
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
	console.log("game_pk is", game_pk);
	console.log("highlights url is", game_url);
	get_JSON_as_object(game_url)
	//.then(response => response.text())
	.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
	//.then(contents => {console.log(contents); return contents;})
	//.then(response => {console.log("Here's the JSON", JSON.parse(response)); return JSON.parse(response);})
	//.catch(() => console.log("Error parsing"))
	// .then( x => {if (x.message = "Invalid Request with value: null") {
		// Seems like it always gives Invalid Request, just ignore it
		// console.log("INVALID RESUEST");
		// console.log(x);
		// //throw "Can't request null URL";
		// }
		// return x;
		// })
	.catch(() => console.log("Request was for null, should check before this"))
	.then( g => {
		console.log("Starting to make highlights div");
		console.log("g is", g);
		//g = JSON.parse(x);
		if (g && g.highlights && g.highlights.highlights) {
			gh = g.highlights.highlights.items;
			console.log("gh is ", gh);
			var tx = "";
			//console.log('gh is', gh);
			for (var i = 0; i < gh.length; i++) {
			//console.log(gh[i]);
				//tx += "<tr><td>" + gh[i].headline + gh[i].playbacks[0].url + "</td></tr>";
				// Opens video in new window
				// tx += "<tr><td id='headline" + i + "' class='headlinestabletd'><a href='" + gh[i].playbacks[0].url + "' target='_blank' style='text-decoration: none'>" +gh[i].headline + "</a></td></tr>";
				// Play in player
				tx += "<tr class='headlinestabletr' id='headlinetr" + i + "'>";
				tx += "<td class='headlinestabletd'  id='headline" + i;
				tx += "' class='headlinestabletd' ";
				tx += "onclick='document.getElementById(\"videoplayer\").setAttribute(\"src\", \"";
				tx += gh[i].playbacks[0].url + "\"); ";
				tx += "document.getElementById(\"videoplayer\").autoplay=true;";
				tx += "document.getElementById(\"headlinetr"+i+"\").classList.toggle(\"headlinestabletr_selected\");";
				tx += "' >"; // end onclick
				tx += gh[i].headline + "</td></tr>";
			}
			//console.log(tx);
			
			document.getElementById('headlinestable').innerHTML = tx;
		} else {
			console.log("FAILED in doAllHighlights", g);
		}
	})
}

function if_not_zero(s) {
	if (s == "0") {
		return "";
	}
	return s;
}
var master_scoreboard_JSON;
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
		game_pk = x.data.games.game[0].game_pk;
	}
	
	console.log("team is", team, "selected_game is", selected_game);
	
	// Set date forward/backward arrows onclick action
	// Need to check for end of month errors!!!
	document.getElementById("datemovearrowb2").onclick = function() {runAllJS_relativeDateChange(year, month, day, team, -2)};
	document.getElementById("datemovearrowb1").onclick = function() {runAllJS_relativeDateChange(year, month, day, team, -1)};
	document.getElementById("datemovearrowf1").onclick = function() {runAllJS_relativeDateChange(year, month, day, team, +1)};
	document.getElementById("datemovearrowf2").onclick = function() {runAllJS_relativeDateChange(year, month, day, team, +2)};
	document.getElementById("datemovearrowtoday").onclick = function() {runAllJS_changeToToday(team)};

	
	// setForNewSelectedGame(x);
	
	////////////////////////////
	// Set leftside scores
	///////////////////////////
	var tx = "";
	tx += "<table id='scorestable' >";

	for (var i=0; i < x.data.games.game.length; i++) {
		//console.log("game" + i, x.data.games.game[i].linescore);
		//tx += "<tr><td>" + i + x.data.games.game[i].away_team_name + "-" + x.data.games.game[i].home_team_name + x.data.games.game[i].linescore.r.away + "-" + x.data.games.game[i].linescore.r.home + "</td></tr>";
		// start table for this box, will be 1x3
		// tx += "<tr onclick='console.log(\"UPDATING VIDEO\");team=\"" + x.data.games.game[i].home_name_abbrev + "\";selected_game=\""+i+"\";team_is_home=\"true\";game_pk=\""+x.data.games.game[i].game_pk+"\";doAllHighlights()'";
		tx += "<tr id='scorestablegame"+i+"tr' ";
		if (i == selected_game) {
			tx += " class='scorestablegametr scorestablegametr_selected' ";
			// tx += " style='border:5px solid pink'";
		} else {
			// tx += "<tr>";
			tx += " class='scorestablegametr scorestablegametr_notselected' ";
		}
		tx += " onclick='console.log(\"UPDATING VIDEO\");";
		tx += "team=\"" + x.data.games.game[i].home_name_abbrev + "\";selected_game=\""+i+"\";";
		tx += "team_is_home=\"true\";game_pk=\""+x.data.games.game[i].game_pk+"\"; ";
		tx += "setForNewSelectedGame(master_scoreboard_JSON)'";
		tx += ">";
		// first td is team names
		tx += "<td class='scorestablegametd'><table><tr><td>" + x.data.games.game[i].away_team_name + "</td></tr><tr><td>"+ x.data.games.game[i].home_team_name + "</td></tr></table></td>";
		// 2nd and 3rd td depend on status, go over cases
		if (["Final", "Game Over", "Completed Early"].includes(x.data.games.game[i].status.status)) {
			// second td is score
			tx += "<td><table><tr><td>" + x.data.games.game[i].linescore.r.away;
			tx += "</td>";
			tx += "<td rowspan=2>";
			// tx += x.data.games.game[i].status.ind; // "F" for finished games
			if (x.data.games.game[i].status.inning != "9") {
				tx += "/" + x.data.games.game[i].status.inning;
			}
			tx += "</td>"
			tx += "</tr><tr><td>"+ x.data.games.game[i].linescore.r.home + "</td></tr></table>";
			tx += "</td>";
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
			tx += "<td><table><tr><td>" + x.data.games.game[i].linescore.r.away;
			tx += "</td><td rowspan='2'>";
			if (x.data.games.game[i].status.inning_state == "Top") {
				tx +="&#x25B2;";
			} else if (x.data.games.game[i].status.inning_state == "Bottom") {
				tx += "&#x25BC;";
			} else if (x.data.games.game[i].status.inning_state == "End") {
				tx += "E";
			} else if (x.data.games.game[i].status.inning_state == "Middle") {
				tx += "M";
			} else {
				tx += "InningStatus is " + x.data.games.game[i].status.inning_state;
			}
			tx += x.data.games.game[i].status.inning;
			// baseruner image
			tx += "</td><td rowspan='2'>" + " <img src='./static/Baserunners" + x.data.games.game[i].runners_on_base.status + ".png' alt='Baserunners' height='12' width='12' />";
			// outs dots
			tx += "</td><td rowspan='2'>";
			var outs = x.data.games.game[i].status.o;
			if (outs == '0') { // display number of outs with dots or pipe
				// do nothing
			} else if (outs == '1'){
				tx += '<b>&#0149;</b>';
			} else if (outs == '2'){
				tx += '<b>:</b>';
			} else if (outs=='3'){
				tx +=  '&#10073;';
			} else {
				tx += outs;
			};
			// getting mlb.tv link
			var mlbtvlink = "https://www.mlb.com/tv/g" + x.data.games.game[i].game_pk;//x.data.games.game[i].links.mlbtv;
			console.log('mlbtvlink is', mlbtvlink);
			tx += "</td><td rowspan='2'>";
			tx += "<br><a href='" + mlbtvlink + "' target='_blank'  style='text-decoration: none;color:inherit'>&#x1F4FA;</a>";
			// second row of center col is home score
			tx += "</td></tr><tr><td>"+ x.data.games.game[i].linescore.r.home + "</td></tr></table>";
			tx += "</td>";
			// 3rd td is inning num, batter pitcher
			tx += "<td>";
			// Show batter and pitcher
			tx += "<table><tr><td>P: " + x.data.games.game[i].pitcher.name_display_roster + "(" + x.data.games.game[i].pitcher.wins + "-" + x.data.games.game[i].pitcher.losses + ")" + "</td></tr>";
			tx += "<tr><td>B: " + x.data.games.game[i].batter.name_display_roster + "(" + x.data.games.game[i].batter.avg + ")" + "</td></tr></table>";
			tx += "</td>";
			//tx += "<td><table><tr><td>" + x.data.games.game[i].status.inning_state + x.data.games.game[i].status.inning + "</td></tr><tr><td>"+ 123 + "</td></tr></table></td>";
			
		} else if (["Postponed"].includes(x.data.games.game[i].status.status))  {
			tx += "<td></td><td>Postponed</td>";
		} else if (["Preview", "Pre-Game", "Warmup"].includes(x.data.games.game[i].status.status))  {
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
	
	// save this JSON for future use
	master_scoreboard_JSON = x;
	return;
}

function setForNewSelectedGame(x) {
	if (x == null) {
		// get x
	}
	
	doAllHighlights();
	
	// console.log("SELECTED GAME IS");
	console.log(x);
	
	// Set border in scorestable for selected box
	var scoretrs = document.getElementsByClassName('scorestablegametr');
	for (var i=0; i< scoretrs.length; i++) {scoretrs[i].classList.remove("scorestablegametr_selected")}
	scoretrs[selected_game].classList.toggle("scorestablegametr_selected")
	
	// Set topbarteams
	var topbarteams_text = " <h4 style='padding-left:1em;padding-right:1em;'>";
	topbarteams_text += x.data.games.game[selected_game].home_team_name + "(" + x.data.games.game[selected_game].home_win + "-" + x.data.games.game[selected_game].home_loss + ")";
	topbarteams_text += " vs ";
	topbarteams_text += x.data.games.game[selected_game].away_team_name + "(" + x.data.games.game[selected_game].away_win + "-" + x.data.games.game[selected_game].away_loss + ")";
	topbarteams_text += "</h4>";
	document.getElementById("topbarteams").innerHTML = topbarteams_text;
	
	// Set toplinescore, box score on top for selected game
	if (x.data.games.game[selected_game].linescore) {
		console.log("Making toplinescore");
		var toplinescore = "";
		toplinescore += "<table>"; // full boxscore table
		toplinescore += "<tr style='border-bottom:solid #80ffff'>"; // first row, inning nums
		toplinescore += "<td>&nbsp;</td>"; // first td is empty
		for (var i = 0; i < x.data.games.game[selected_game].linescore.inning.length; i++) {
			toplinescore += "<td>" + (i+1) + "</td>"; // Add td with inning number
		}
		toplinescore += "<td style='border-left:thick double #80ffff;'>R</td>";
		toplinescore += "<td>H</td>";
		toplinescore += "<td>E</td>";
		toplinescore += "</tr>"; // end first row
		toplinescore += "<tr>"; // 2nd row, away team
		toplinescore += "<td>" + x.data.games.game[selected_game].away_name_abbrev + "</td>"; // first td is empty
		for (var i = 0; i < x.data.games.game[selected_game].linescore.inning.length; i++) {
			toplinescore += "<td>" + x.data.games.game[selected_game].linescore.inning[i].away + "</td>"; // Add td with inning number
		}
		toplinescore += "<td style='border-left:thick double #80ffff'>" + x.data.games.game[selected_game].linescore.r.away + "</td>";
		toplinescore += "<td>" + x.data.games.game[selected_game].linescore.h.away + "</td>";
		toplinescore += "<td>" + x.data.games.game[selected_game].linescore.e.away + "</td>";
		toplinescore += "</tr>"; // end 2nd row
		toplinescore += "<tr>"; // 3rd row, home team
		toplinescore += "<td>" + x.data.games.game[selected_game].home_name_abbrev + "</td>"; // first td is empty
		for (var i = 0; i < x.data.games.game[selected_game].linescore.inning.length; i++) {
			toplinescore += "<td>" + x.data.games.game[selected_game].linescore.inning[i].home + "</td>"; // Add td with inning number
		}
		toplinescore += "<td style='border-left:thick double #80ffff'>" + x.data.games.game[selected_game].linescore.r.home + "</td>";
		toplinescore += "<td>" + x.data.games.game[selected_game].linescore.h.home + "</td>";
		toplinescore += "<td>" + x.data.games.game[selected_game].linescore.e.home + "</td>";
		toplinescore += "</tr>"; // end 3rd row
		toplinescore += "</table>";
		console.log("Making toplinescore is", toplinescore);
		document.getElementById("toplinescore").innerHTML = toplinescore;
	} else {
		console.log("No toplinescore to be made");
		document.getElementById("toplinescore").innerHTML = "";
	}
	// Set gameday link
	gamedayurl = "http://mlb.mlb.com/mlb/gameday/index.jsp?gid=" + year + "_" + month + "_" + day + 
	             "_" + x.data.games.game[selected_game].away_code + "mlb_" + 
				 x.data.games.game[selected_game].home_code + "mlb_" + 
				 x.data.games.game[selected_game].game_nbr;;
	var gamedaytd = '<td><a style="color:inherit;text-decoration:none;" target="_blank" href="' + gamedayurl + '">Gameday</a></td>';
	document.getElementById("toplinelinksgameday").innerHTML = gamedaytd;
	
	// Set current batter/pitcher/last play if game is In Progress
	if (["In Progress", "Review", "Manager Challenge", "Delayed"].includes(x.data.games.game[selected_game].status.status)) {
		var tmp = "";
		// tmp += "<tr><td> FIX LAST PLAY NOW";
		// // tmp += "Last play: "  + x.data.games.game[selected_game].last;
		// tmp +=  "</td></tr><tr><td>";
		// tmp += "</td></tr>";
		var a = x.data.games.game[selected_game];
		tmp += "<tr><td>";
		tmp += "Last play: " + a.pbp.last;
		tmp += "</td></tr><tr><td>";
		tmp += "Pitching: " + a.pitcher.name_display_roster + " - " + a.pitcher.ip + " IP, " + a.pitcher.er + 
			" ER, " + a.pitcher.wins + "-" + a.pitcher.losses + ", " + a.pitcher.era + " ERA<br />";
		tmp += "Batting: " + a.batter.name_display_roster + " - " + a.batter.h  + "/" + a.batter.ab  + " " + a.batter.avg  + 
			"/" + a.batter.obp + "/" + a.batter.slg + ", " + a.batter.hr + " HR, " + a.batter.rbi + " RBI<br />";
		tmp += "On deck: " + a.ondeck.name_display_roster + " - " + a.ondeck.h  + "/" + a.ondeck.ab  + " " + a.ondeck.avg  + 
			"/" + a.ondeck.obp + "/" + a.ondeck.slg + ", " + a.ondeck.hr + " HR, " + a.ondeck.rbi + " RBI<br />";
		tmp += "In hole: " + a.inhole.name_display_roster + " - " + a.inhole.h  + "/" + a.inhole.ab  + " " + a.inhole.avg  + 
			"/" + a.inhole.obp + "/" + a.inhole.slg + ", " + a.inhole.hr + " HR, " + a.inhole.rbi + " RBI<br />";
		tmp += "</td></tr>";
		// tmp += ;
		// tmp += ;
		// tmp += ;
		document.getElementById("selectedgamenowbatting").innerHTML = tmp;
	} else {
		document.getElementById("selectedgamenowbatting").innerHTML = "";
	}
	
	// Get scoring plays;
	document.getElementById("scoringplaystable").innerHTML = "";
	if (!(["Preview", "Pre-Game", "Warmup"].includes(x.data.games.game[selected_game].status.status))) {
		console.log("Making scoring plays, if fails check for status:", x.data.games.game[selected_game].status.status);
		// Get game_events.json file
		
		document.getElementById("scoringplaystable").innerHTML = "Loading scoring plays...";
		get_JSON_as_object("http://gd2.mlb.com/components/game/mlb/year_" + year + 
							"/month_" + month + "/day_" + day + 
							"/gid_" + year + "_" + month + "_" + day + "_" + 
							x.data.games.game[selected_game].away_code + "mlb_" + 
							x.data.games.game[selected_game].home_code + "mlb_" + 
							x.data.games.game[selected_game].game_nbr + "/game_events.json")
		// .then(x => {console.log("FOUND game_events.json"); return x;})
		.catch(() => {console.log("FAILED getting game_events.json");
			document.getElementById("scoringplaystable").innerHTML = "";})
		.then( x => {
			console.log("game_events.json is");
			console.log(x);
			var tx = '<tr><td class="fullboxscoretd">Inning</td><td class="fullboxscoretd">Away</td><td class="fullboxscoretd">Home</td><td class="fullboxscoretd">Scoring Play</td></tr>';
			// Loop over every inning, top/bottom, at bat, check if scoring, if yes the add to table
			if (x) {
				for (var i=0 ; i < x.data.game.inning.length; i++) {
					["top", "bottom"].forEach(top_or_bottom => {
						//console.log(x.data.game.inning[i][top_or_bottom]);
						["atbat", "action"].forEach(atbat_or_action => {
							// console.log("atbat_or_action is", atbat_or_action, "i is", i, "t/b is ", top_or_bottom);
							// console.log(x.data.game);
							if (x.data.game.inning[i][top_or_bottom] && x.data.game.inning[i][top_or_bottom][atbat_or_action]) {
								var this_atbataction;
								if (Array.isArray(x.data.game.inning[i][top_or_bottom][atbat_or_action])) {
									this_atbataction = x.data.game.inning[i][top_or_bottom][atbat_or_action];
								} else {
									this_atbataction = [x.data.game.inning[i][top_or_bottom][atbat_or_action]];
								}
								this_atbataction.forEach(eventi => {
									var runscored = false;
									var eventi_runner;
									if (Array.isArray(eventi.runner)) {
										eventi_runner = eventi.runner;
									} else {
										eventi_runner = [eventi.runner];
									}
									if (eventi.runner) {
										for (var j=0; j < eventi_runner.length; j++) {
											// console.log("runner is");
											// console.log(eventi_runner);
											if (eventi_runner[j].end == "score") {
												runscored = true;
											}
										}
										if (runscored) {
											//console.log("run scored, add to table");
											//console.log(eventi.des);
											tx += "<tr>";
											tx += '<td class="fullboxscoretd" style="text-align:center;">' + (i+1) + '</td>';
											tx += '<td class="fullboxscoretd" style="text-align:center;">' + eventi.away_team_runs + '</td>';
											tx += '<td class="fullboxscoretd" style="text-align:center;">' + eventi.home_team_runs + '</td>';
											tx += '<td class="fullboxscoretd" style="text-align:left;">' + eventi.des            + '</td>';
											tx += "<tr>";
											tx += "</tr>";
										}
									}
								})
							}
							
						})
					});
				}
				document.getElementById("scoringplaystable").innerHTML = tx;
			}
		})
		// var tmp = "";
		// tmp += ;
		// tmp += ;
		// tmp += ;
		// tmp += ;
		//document.getElementById("scoringplaystable").innerHTML = '';
	}
	
	// Get full box score at bottom
	document.getElementById("fullboxscoretable").innerHTML = "";
	get_JSON_as_object("http://gd2.mlb.com/components/game/mlb/year_" + year + 
						"/month_" + month + "/day_" + day + 
						"/gid_" + year + "_" + month + "_" + day + "_" + 
						x.data.games.game[selected_game].away_code + "mlb_" + 
						x.data.games.game[selected_game].home_code + "mlb_" + 
						x.data.games.game[selected_game].game_nbr + "/boxscore.json")
	.then(x => {console.log("FOUND boxscore.json"); return x;})
	.catch(() => {console.log("FAILED getting boxscore.json");})
	.then(x => {
		// console.log("boxscore is");
		// console.log(x);
		var tx = "";
		tx += "<table><tr>"; // table of tables
		["away", "home"].forEach( away_or_home => {
			var away_or_home_01;
			if (away_or_home == "away") {
				away_or_home_01 = 0
			} else {
				away_or_home_01 = 1
			}
			// top row
			tx += "<td style='vertical-align:top;'><table class='fullboxscoretables'><tr>";
			tx += '<td class="fullboxscoretd">' + x.data.boxscore[away_or_home + "_sname"] + '</td>';
			tx += '<td class="fullboxscoretd">' + 'POS' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'H' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'AB' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'BB' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'SO' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'HR' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'RBI' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'SB' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'AVG' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'OBP' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'OPS' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'HR' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'RBI' + '</td>';
			tx += "</tr>";
			// row for each player
			if (x.data.boxscore.batting[away_or_home_01] && x.data.boxscore.batting[away_or_home_01].batter) {
				x.data.boxscore.batting[away_or_home_01].batter.forEach(batteri => {
					tx += '<tr>';
					// console.log("batteri is", batteri);
					// console.log("bo is", batteri.bo);
					tx += '<td class="fullboxscoretd"><a class="playernamelink" target="_blank" href="http://m.mlb.com/gameday/player/'+ batteri.id +'"><div style="text-align:left;" >';
					if (batteri.bo.substr(1,2) != "00") {tx += "- ";}
					tx += batteri.name_display_first_last + '</div></a></td>';
					tx += '<td class="fullboxscoretd">' + batteri.pos + '</td>';
					tx += '<td class="fullboxscoretd">' + batteri.h + '</td>';
					tx += '<td class="fullboxscoretd">' + batteri.ab + '</td>';
					tx += '<td class="fullboxscoretd">' + if_not_zero(batteri.bb) + '</td>';
					tx += '<td class="fullboxscoretd">' + if_not_zero(batteri.so) + '</td>';
					tx += '<td class="fullboxscoretd">' + if_not_zero(batteri.hr) + '</td>';
					tx += '<td class="fullboxscoretd">' + if_not_zero(batteri.rbi) + '</td>';
					if (batteri.sb == "0" && batteri.cs == "0") {
						tx += '<td class="fullboxscoretd">' + "" + '</td>';
					} else {
						tx += '<td class="fullboxscoretd">' + batteri.sb + "/" + (parseInt(batteri.cs) + parseInt(batteri.sb)) + '</td>';
					}
					tx += '<td class="fullboxscoretd">' + batteri.avg + '</td>';
					tx += '<td class="fullboxscoretd">' + batteri.obp + '</td>';
					tx += '<td class="fullboxscoretd">' + batteri.ops + '</td>';
					tx += '<td class="fullboxscoretd">' + batteri.s_hr + '</td>';
					tx += '<td class="fullboxscoretd">' + batteri.s_rbi + '</td>';
					tx += '</tr>';
				})
			}
			tx += "</table></td>";
		})
		tx += "</tr>"; // table of tables
		// console.log('tx is ');
		// console.log(tx);
		
		// Now do pitching table
		// var tx = "";
		tx += "<tr>"; // table of tables
		["away", "home"].forEach( away_or_home => {
			var away_or_home_01;
			if (away_or_home == "away") {
				away_or_home_01 = 0
			} else {
				away_or_home_01 = 1
			}
			// top row
			tx += "<td style='vertical-align:top;'><table class='fullboxscoretables'><tr>";
			tx += '<td class="fullboxscoretd">' + x.data.boxscore[away_or_home + "_sname"] + '</td>';
			tx += '<td class="fullboxscoretd">' + 'POS' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'INN' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'ER' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'R' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'H' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'BB' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'SO' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'HR' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'NP' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'W-L' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'SV' + '</td>';
			tx += '<td class="fullboxscoretd">' + 'ERA' + '</td>';
			tx += "</tr>";
			// row for each player
			// console.log(x.data);
			if (x.data.boxscore.pitching[away_or_home_01] && x.data.boxscore.pitching[away_or_home_01].pitcher) {
				var pitcher_array = x.data.boxscore.pitching[away_or_home_01].pitcher;
				if (!Array.isArray(pitcher_array)) {pitcher_array = [pitcher_array];}
				pitcher_array.forEach(pitcheri => {
					tx += '<tr>';
					// console.log("pitcheri is", pitcheri);
					// console.log("bo is", pitcheri.bo);
					tx += '<td class="fullboxscoretd"><a class="playernamelink" target="_blank" href="http://m.mlb.com/gameday/player/'+ pitcheri.id +'"><div style="text-align:left;" >';
					// if (pitcheri.bo.substr(1,2) != "00") {tx += "- ";}
					tx += pitcheri.name_display_first_last;
					if (pitcheri.win) {tx += " (W)"}
					if (pitcheri.loss) {tx += " (L)"}
					if (pitcheri.save) {tx += " (S)"}
					tx += '</div></a></td>';
					tx += '<td class="fullboxscoretd">' + pitcheri.pos + '</td>';
					tx += '<td class="fullboxscoretd">' + pitcheri.out + '</td>';
					tx += '<td class="fullboxscoretd">' + pitcheri.er + '</td>';
					tx += '<td class="fullboxscoretd">' + pitcheri.r + '</td>';
					tx += '<td class="fullboxscoretd">' + pitcheri.h + '</td>';
					tx += '<td class="fullboxscoretd">' + pitcheri.bb + '</td>';
					tx += '<td class="fullboxscoretd">' + pitcheri.so + '</td>';
					tx += '<td class="fullboxscoretd">' + pitcheri.hr + '</td>';
					tx += '<td class="fullboxscoretd">' + pitcheri.np + '</td>';
					tx += '<td class="fullboxscoretd">' + pitcheri.w + "-" + pitcheri.l + '</td>';
					tx += '<td class="fullboxscoretd">' + pitcheri.sv + '</td>';
					tx += '<td class="fullboxscoretd">' + pitcheri.era + '</td>';
					tx += '</tr>';
				})
			}
			tx += "</table></td>";
		})
		tx += "</tr></table>"; // table of tables
		// console.log('tx is ');
		// console.log(tx);
		
		
		
		
		document.getElementById("fullboxscoretable").innerHTML = tx;
	})

}

function updateSelectedGame() {
	// First 
	//
	setForNewSelectedGame(x)
}
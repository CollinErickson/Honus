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

var team_abbr_to_namelowerhyphen = {
  "NYY":"new-york-yankees",
  "TB":"tampa-bay-rays",
  "BAL":"baltimore-orioles",
  "BOS":"boston-red-sox",
  "TOR":"toronto-blue-jays",
  "CWS":"chicago-white-sox",
  "MIN":"minnesota-twins",
  "KC":"kansas-city-royals",
  "DET":"detroit-tigers",
  "CLE":"cleveland-indians",
  "OAK":"oakland-athletics",
  "HOU":"houston-astros",
  "SEA":"seattle-mariners",
  "TEX":"texas-rangers",
  "LAA":"los-angeles-angels",
  "NYM":"new-york-mets",
  "MIA":"miami-marlins",
  "PHI":"philadelphia-phillies",
  "WSH":"washington-nationals",
  "ATL":"atlanta-braves",
  "CIN":"cincinnati-reds",
  "CHC":"chicago-cubs",
  "STL":"st-louis-cardinals",
  "PIT":"pittsburgh-pirates",
  "MIL":"milwaukee-brewers",
  "SD":"san-diego-padres",
  "SF":"san-francisco-padres",
  "LAD":"los-angeles-dodgers",
  "COL":"colorado-rockies",
  "ARI":"arizona-diamondbacks"
}


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
	 
	 selectteam;
	 var e = document.getElementById("selectteam");
	 var team = e.options[e.selectedIndex].value;
	 
	 // Old way would change URL and reload
	 //window.location.href = '/?date=' + year + month + day + '&team=' + team ;
	 // Now try to do it in place
	 runAllJS(year, month, day, team);
}

function get_XML_as_response_with_proxy(url) {
	const proxyurl = "https://cors-anywhere.herokuapp.com/";
	var ret = fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
	// .then(response => response.text())
	.then(contents => {console.log("contents is", contents); return contents;})
	.then(contents => {contents.body.text()}) //.then(y => console.log('text is', y));  contents;})
	.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
	.then(x => {xm2 = x; return x;});
	return ret;
	//var tmpx = await fetch("https://cors-anywhere.herokuapp.com/" + "https://www.fangraphs.com/").then(x => {console.log('response is', x); return x.text();}).then(x => {console.log('body is', x); return x;})
}

function get_JSON_as_response_with_proxy(url) {
	// Used to use this to get past CORS restriction, but I found a way to get it without this.
	// And I think this limited requests since all users went through same domain.
	// Now use get_JSON_as_response using ajax.
	console.log("Don't use this proxy anymore!!!");
	// Heroku said too many requests.
	// Can use this https://cors.io/ instead
	const proxyurl = "https://cors-anywhere.herokuapp.com/";
	//const url = "https://gd2.mlb.com/components/game/mlb/year_2019/month_04/day_01/master_scoreboard.json"; // site that doesn’t send Access-Control-*
	console.log('about to fetch', proxyurl + url);
	var ret = fetch(proxyurl + url)
	.catch(x => {
		console.log("Error with Heroku, trying cors.io");
		$.getJSON('https://cors.io/?' + url, function(data){})}
	).catch(x => {console.log('cors.io also failed')});
	return ret;
}

function get_JSON_as_object_with_proxy(url) {
	return get_JSON_as_response_with_proxy(url)
	.then(x => {console.log("Got JSON as", x); return x.text();})
	.then(x => JSON.parse(x));
}

function get_JSON_as_response(url) {
	console.log("Sending request from get_JSON_as_response for", url);
	// let send_time = new Date();
	var ajaxout = new Promise((resolve, reject) => $.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		success: (response) =>
		{
			responseglobal = response;
			// console.log("Success!", response);
			// console.log("Received response for ", url, " after ", ((new Date()) - send_time)/1000, "sec");
			// resolve({data:response});
			resolve(response);
		},
		error: (error) =>
		{
			console.log("Error!", url, error);
			if (error.statusText === "abort") {
				return;
			}
			reject(error);
		}
	}));
	return ajaxout;
}

function get_JSON_as_object(url) {
	return get_JSON_as_response(url);
	// return get_JSON_as_response(url)
	// .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
	// .then(response => response.text())
	// .then(response => JSON.parse(response))
	// .catch(() => console.log("Error parsing" + url))

}

function runAllJS_relativeDateChange(year_, month_, day_, team_, plus_minus_days) {
	var date = new Date(month_ + "/" + day_ + "/" + year_);
	
	console.log("relDate start date is", date);
	date.setDate(date.getDate() + plus_minus_days);
	var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
	//dateString.substr(5,2) + "/" + dateString.substr(8,2) + "/" + dateString.substr(0,4);
	// month_ = dateString.substr(5,2);
	// day_ = dateString.substr(8,2);
	// year_ = dateString.substr(0,4);
	// console.log("final date is ", month_, day_, year_);
	// game_pk = null;
	// selected_game = -1;
	// return runAllJS(year_, month_, day_, team_);
	return runAllJS_fromDateString(dateString, team_);
}

function runAllJS_changeToToday(team_) {
	var date = new Date();
	var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
	//dateString.substr(5,2) + "/" + dateString.substr(8,2) + "/" + dateString.substr(0,4);
	// month_ = dateString.substr(5,2);
	// day_ = dateString.substr(8,2);
	// year_ = dateString.substr(0,4);
	// console.log("final date is ", month_, day_, year_);
	// return runAllJS(year_, month_, day_, team_);
	return runAllJS_fromDateString(dateString, team_);
}

function runAllJS_fromDateString(dateString, team_) {
	
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
	var tmpdate = new Date(month + "/" + day + "/" + year);
	document.getElementById('datepicker').value = month + "/" + day + "/" + year;
	
	selected_game = -1;
	game_pk = null;
	
	
	// get master scoreboard
	const url = "https://gd2.mlb.com/components/game/mlb/year_" + year +"/month_" + month + "/day_" + day + "/master_scoreboard.json"; // site that doesn’t send Access-Control-*
	console.log('about to fetch', url);
	//var fetchout = fetch(proxyurl + url)
	// Changing this here after switching to ajax. No longer need to do .text() or JSON.parse
	// var fetchout = get_JSON_as_response(url)
	// .then(response => response.text())
	// .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
	// //.then(contents => {console.log(contents); return contents;})
	// .then(response => {return JSON.parse(response);})
	// .catch(() => console.log("Error parsing"))
	var fetchout = get_JSON_as_response(url)
	.catch(() => console.log("Error parsing", url, "in get_JSON_as_response"))
	.then( x => {
		// console.log("response is", x);
		// console.log("data is", x.data);
		// console.log("games is", x.data.games);
		// Set time boxscore last updated. Need this above setForNewSelectedGame so it knows it is recent
		master_scoreboard_last_updated = new Date();
		
		// If no games, don't run rest
		
		// If no games on day, don't do this
		if (!(x.data.games.game)) {
			console.log("No games!!!!!");
			document.getElementById('headlinestable').innerHTML = "";
			document.getElementById('scorestable_td').innerHTML = "No games for selected date";
			document.getElementById("topbarteams").innerHTML = "";
			document.getElementById("toplinescore").innerHTML = "";
			document.getElementById("toplinelinksgameday").innerHTML = "";
			document.getElementById("selectedgamenowbatting").innerHTML = "";
			document.getElementById("scoringplaystable").innerHTML = "";
			// document.getElementById("scoringplaystabdiv").innerHTML = "";
			document.getElementById("fullboxscoretable").innerHTML = "";
			return;
			} else {

			// Set up page if there are games
			setBoxScores(x);
			// doAllHighlights();
			setForNewSelectedGame(x);
		}
		
		// Set time boxscore last updated. Not needed here since it is right above
		master_scoreboard_last_updated = new Date();
		
		// Set next reload time if set to automatically reload
		if (refresh_setInterval_id && refresh_setInterval_id!==null) {
			// console.log("interval id is ", refresh_setInterval_id);
			clearInterval(refresh_setInterval_id);
		}
		refresh_setInterval_id = run_setInterval();
		
		return x;
	})
	;
	
	
}

function run_setInterval() {
	//
	var reload_rate = document.getElementById("selectreload").value;
	// console.log('about to set interval', reload_rate);
	if (reload_rate != "never") {
		var rr = parseInt(reload_rate);
		// console.log('rr is', rr);
		refresh_setInterval_id = setInterval(
			function() {
				// console.log('would refresh now', new Date());
				runAllJS(year, month, day, team);
			},
			rr*1000);
	} else {
		// console.log("no reloading");
		refresh_setInterval_id = null;
	}
	return refresh_setInterval_id;
}


function doAllHighlights() {
	// Don't update if done in last minute for same game, it's too slow
	if (!highlights_last_updated || (((new Date()) - highlights_last_updated) / 1000) > 60 || game_pk!=highlights_last_updated_selected_game_pk) {
		// console.log("updating highlights as normal");
		// coninue as normal
	} else {
		console.log("not updating highlights, was done recently");
		return;
	}
	// Update last updated time and game
	highlights_last_updated = new Date();
	highlights_last_updated_selected_game_pk = game_pk; //selected_game;
	
	/////////////////////////////////////
	// Get highlights for selected game
	/////////////////////////////////////
	//var pk = "565898";
	//const proxyurl = "https://cors-anywhere.herokuapp.com/";
	var game_url = "https://statsapi.mlb.com/api/v1/game/" + game_pk +"/content?language=en";
	// Get game JSON
	// console.log("about to fetch api for game, ", game_url);
	//fetch(proxyurl + game_url)
	// console.log("game_pk is", game_pk);
	// console.log("highlights url is", game_url);
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
		// console.log("Starting to make highlights div");
		// console.log("g is", g);
		//g = JSON.parse(x);
		if (g && g.highlights && g.highlights.highlights) {
			gh = g.highlights.highlights.items;
			// Need to sort by time so they are in correct order
			gh.sort((a,b) => (new Date(a.date)) - (new Date(b.date)));
			// console.log("gh is ", gh);
			var tx = "";
			// console.log('gh is', gh);
			if (gh.length === 0) {
				// If no highlights, do something else
				// tx += "No highlights yet";
				tx += "<table><tr>";
				// Can't use https for these MLB links!
				tx += "<td><img src='http://mlb.mlb.com/mlb/images/devices/600x600/" + master_scoreboard_JSON.data.games.game[selected_game].away_team_id + ".png' alt='AwayTeamLogo'/></td>";
				tx += "<td><img src='http://mlb.mlb.com/mlb/images/devices/600x600/" + master_scoreboard_JSON.data.games.game[selected_game].home_team_id + ".png' alt='HomeTeamLogo'/></td>";
				tx += "</tr></table>";
				document.getElementById("videoplayer").width = 0;
			} else {
				// Make sure video play is full sized
				document.getElementById("videoplayer").width = document.getElementById("videowidthslider").value;
				// Get highlights
				for (let i = 0; i < gh.length; i++) {
				//console.log(gh[i]);
					//tx += "<tr><td>" + gh[i].headline + gh[i].playbacks[0].url + "</td></tr>";
					// Opens video in new window
					// tx += "<tr><td id='headline" + i + "' class='headlinestabletd'><a href='" + gh[i].playbacks[0].url + "' target='_blank' style='text-decoration: none'>" +gh[i].headline + "</a></td></tr>";
					// Play in player
					tx += "<tr ";
					if (gh[i].playbacks && highlight_videos_already_seen_includes(gh[i].playbacks[0].url)) {
						tx += "class='headlinestabletr headlinestabletr_alreadyseen' " ;
					} else {
						tx += "class='headlinestabletr' " ;
					}
					tx += " id='headlinetr" + i + "'>";
					tx += "<td class='headlinestabletd'  id='headline" + i;
					tx += "' class='headlinestabletd' ";
					// One headline was missing playbacks, so check for it here
					if (gh[i].playbacks) {
						tx += "onclick='document.getElementById(\"videoplayer\").setAttribute(\"src\", \"";
						tx += gh[i].playbacks[0].url + "\"); ";
						tx += "add_highlight_to_already_seen(\"" + gh[i].playbacks[0].url + "\");";
					}
					tx += "document.getElementById(\"videoplayer\").autoplay=true;";
					tx += "for (let j=0;j<"+gh.length+";j++) {document.getElementById(\"headlinetr\"+j).classList.remove(\"headlinestabletr_selected\");}";
					tx += "document.getElementById(\"headlinetr"+i+"\").classList.toggle(\"headlinestabletr_selected\");";
					tx += "document.getElementById(\"headlinetr"+i+"\").classList.remove(\"headlinestabletr_alreadyseen\");";
					tx += "document.getElementById(\"headlinetr"+i+"\").classList.toggle(\"headlinestabletr_alreadyseen\");";
					tx += "' >"; // end onclick
					tx += gh[i].headline + "</td>";
					if (gh[i].playbacks) { // missing url
						tx += "<td><a href='" + gh[i].playbacks[0].url + "'  target='_blank'  style='text-decoration: none'>&#8599;</a></td>";
					} else  {
						tx += "<td>X</td>";
					}
					tx += "</tr>";
				}
				//console.log(tx);
			}
			
			document.getElementById('headlinestable').innerHTML = tx;
		} else {
			console.log("FAILED in doAllHighlights", g);
		}
	});
}

function if_not_zero(s) {
	if (s == "0") {
		return "";
	}
	return s;
}
var master_scoreboard_JSON;
function setBoxScores(x) {
	// console.log("in setBoxScores", "game_pk is", game_pk);
	// console.log("x is ", x);
	
	// If only one game, it won't be an array, just the dict. Convert it.
	if (!Array.isArray(x.data.games.game)) {
		x.data.games.game = [x.data.games.game];
	}
	
	// save this JSON for future use
	master_scoreboard_JSON = x;
	
	// If no games on day, don't do this
	if (!(x.data.games.game)) {
		return;
	}
	
	////////////////////////
	// Get box score table on left side
	//////////////////////
	
	// Get selected_game from given team
	if (game_nbr != "1" && game_nbr !="2") {console.log("Error with game_nbr!!!", game_nbr); game_nbr = "1";}
	for (let i=0; i < x.data.games.game.length; i++) {
		if (team == x.data.games.game[i].away_name_abbrev) {
			selected_game = i;
			team_is_home = false;
			game_pk = x.data.games.game[i].game_pk;
			if (game_nbr == x.data.games.game[i].game_nbr) {
				break;
			}
			game_nbr = x.data.games.game[i].game_nbr;
		}
		if (team == x.data.games.game[i].home_name_abbrev) {
			selected_game = i;
			team_is_home = true;
			game_pk = x.data.games.game[i].game_pk;
			if (game_nbr == x.data.games.game[i].game_nbr) {
				break;
			}
			game_nbr = x.data.games.game[i].game_nbr;
		}
	}
	// If team doesn't match any, set it first on list
	if (selected_game < 0) {
		// console.log("team not found in list of games");
		selected_game = 0;
		team = x.data.games.game[0].home_name_abbrev;
		team_is_home = true;
		game_pk = x.data.games.game[0].game_pk;
	}
	
	// console.log("team is", team, "selected_game is", selected_game);
	// update team in selector on top
	document.getElementById('selectteam').value = team;
	
	// Set date forward/backward arrows onclick action
	// Need to check for end of month errors!!!
	document.getElementById("datemovearrowb2").onclick = function() {runAllJS_relativeDateChange(year, month, day, document.getElementById('selectteam').value, -2)};
	document.getElementById("datemovearrowb1").onclick = function() {runAllJS_relativeDateChange(year, month, day, document.getElementById('selectteam').value, -1)};
	document.getElementById("datemovearrowf1").onclick = function() {runAllJS_relativeDateChange(year, month, day, document.getElementById('selectteam').value, +1)};
	document.getElementById("datemovearrowf2").onclick = function() {runAllJS_relativeDateChange(year, month, day, document.getElementById('selectteam').value, +2)};
	document.getElementById("datemovearrowtoday").onclick = function() {runAllJS_changeToToday(team)};

	
	// setForNewSelectedGame(x);
	
	////////////////////////////
	// Set leftside scores
	///////////////////////////
	var tx = "";
	tx += "<table id='scorestable' >";
	var nohitterrows = [];

	for (let i=0; i < x.data.games.game.length; i++) {
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
		tx += " onclick='";
		// tx += "console.log(\"UPDATING VIDEO\");";
		tx += "team=\"" + x.data.games.game[i].home_name_abbrev + "\";selected_game=\""+i+"\";";
		tx += "game_nbr=\"" + x.data.games.game[i].game_nbr + "\";";
		tx += "team_is_home=\"true\";game_pk=\""+x.data.games.game[i].game_pk+"\"; ";
		tx += "setForNewSelectedGame(master_scoreboard_JSON)'";
		tx += ">";
		// first td is team names
		tx += "<td class='scorestablegametd'><table><tr><td>" + x.data.games.game[i].away_team_name + "</td></tr><tr><td>"+ x.data.games.game[i].home_team_name + "</td></tr></table></td>";
		// 2nd and 3rd td depend on status, go over cases
		if (["Final", "Game Over", "Completed Early", "Completed Early: Rain"].includes(x.data.games.game[i].status.status)) {
			// Check if no hitter, add class if it is, will be done at end
			if (master_scoreboard_JSON.data.games.game[i].linescore.h.away == "0" || master_scoreboard_JSON.data.games.game[i].linescore.h.home == "0") {
				console.log("No hitter for finished game!", i);
				nohitterrows.push(i);
			}
			// second td is score
			tx += "<td><table><tr><td>" + x.data.games.game[i].linescore.r.away;
			tx += "</td>";
			tx += "<td rowspan=2>";
			// tx += x.data.games.game[i].status.ind; // "F" for finished games
			if (x.data.games.game[i].status.inning != "9") {
				tx += "/" + x.data.games.game[i].status.inning;
			}
			tx += "</td>";
			tx += "</tr><tr><td>"+ x.data.games.game[i].linescore.r.home + "</td></tr></table>";
			tx += "</td>";
			// third td is win/loss pitchers
			var losing_pitcher_text  = "L:" + x.data.games.game[i].losing_pitcher.last + " (" +x.data.games.game[i].losing_pitcher.wins + "-" + x.data.games.game[i].losing_pitcher.losses + ")";
			var winning_pitcher_text = "W:" + x.data.games.game[i].winning_pitcher.last + " (" +x.data.games.game[i].winning_pitcher.wins + "-" + x.data.games.game[i].winning_pitcher.losses + ")";
			var home_team_won = (parseInt(x.data.games.game[i].linescore.r.home) > parseInt(x.data.games.game[i].linescore.r.away));
			var away_pitcher_text;
			var home_pitcher_text;
			if (home_team_won) {
				away_pitcher_text = losing_pitcher_text;
				home_pitcher_text = winning_pitcher_text;
			} else {
				away_pitcher_text = winning_pitcher_text;
				home_pitcher_text = losing_pitcher_text;
			}
			tx += "<td><table><tr><td>" + away_pitcher_text + "</td></tr><tr><td>"+ home_pitcher_text + "</td></tr></table></td>";
		} else if (["In Progress", "Review", "Manager Challenge", "Delayed", "Delayed: Rain"].includes(x.data.games.game[i].status.status)) {
			// Check if no hitter, add class if it is
			if (parseInt(master_scoreboard_JSON.data.games.game[i].status.inning) >= 5 && (master_scoreboard_JSON.data.games.game[i].linescore.h.away == "0" || master_scoreboard_JSON.data.games.game[i].linescore.h.home == "0")) {
				console.log("No hitter!", i);
				nohitterrows.push(i);
				// Can't do this yet because it hasn't been created yet
				// document.getElementById("scorestablegame" + i + "tr").classList.toggle("scorestablegametr_nohitter");
			}
			// 2nd td is score
			tx += "<td><table><tr><td>" + x.data.games.game[i].linescore.r.away;
			tx += "</td><td rowspan='2'>";
			if (x.data.games.game[i].status.inning_state == "Top") {
				tx +="&#x25B2;"; // up arrow
			} else if (x.data.games.game[i].status.inning_state == "Bottom" ) {
				tx += "&#x25BC;"; // down arrow
			} else if (x.data.games.game[i].status.inning_state == "End") { // When 'End', the inning shown is for the inning starting next, so it should be up arrow.
				tx += "&#x25B2;"; // up arrow
			} else if (x.data.games.game[i].status.inning_state == "Middle") { // Middle was actually middle
				tx += "&#x25BC;"; // down arrow
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
			}
			// getting mlb.tv link
			// var mlbtvlink = "https://www.mlb.com/tv/g" + x.data.games.game[i].game_pk;//x.data.games.game[i].links.mlbtv;
			var mlbtvlink = getStreamLink(x.data.games.game[i].game_pk, x.data.games.game[i].away_name_abbrev, x.data.games.game[i].home_name_abbrev);
			// console.log('mlbtvlink is', mlbtvlink);
			tx += "</td><td rowspan='2'>";
			if (x.data.games.game[i].game_media.media.free == "YES") {
				tx += "<br><a href='" + mlbtvlink + "' target='_blank'  style='text-decoration: none;color:inherit'>FGOD</a>";
			} else {
				tx += "<br><a href='" + mlbtvlink + "' target='_blank'  style='text-decoration: none;color:inherit'>&#x1F4FA;</a>";
			}
			// second row of center col is home score
			tx += "</td></tr><tr><td>"+ x.data.games.game[i].linescore.r.home + "</td></tr></table>";
			tx += "</td>";
			// Third column
			if (["Delayed", "Delayed: Rain"].includes(x.data.games.game[i].status.status)) { // If delayed, say delayed instead of batter/pitcher
				tx += "<td>" + x.data.games.game[i].status.status + "</td>";
			} else {
				// 3rd td is inning num, batter pitcher
				tx += "<td>";
				// Show batter and pitcher
				tx += "<table><tr><td>P:" + x.data.games.game[i].pitcher.name_display_roster + "(" + x.data.games.game[i].pitcher.wins + "-" + x.data.games.game[i].pitcher.losses + ")" + "</td></tr>";
				tx += "<tr><td>B:" + x.data.games.game[i].batter.name_display_roster + "(" + x.data.games.game[i].batter.avg + ")" + "</td></tr></table>";
				tx += "</td>";
				//tx += "<td><table><tr><td>" + x.data.games.game[i].status.inning_state + x.data.games.game[i].status.inning + "</td></tr><tr><td>"+ 123 + "</td></tr></table></td>";
			}
			
		} else if (["Postponed"].includes(x.data.games.game[i].status.status))  {
			// tx += "<td></td><td>Postponed</td>";
			// tx += "<td colspan=2><table><tr><td>Postponed</td></tr><tr><td>" + x.data.games.game[i].description + "</td></tr></table></td>";
			tx += "<td colspan=2>Postponed";
			if (x.data.games.game[i].description != "") {tx += ": " + x.data.games.game[i].description;}
			tx += "</td>";
		} else if (["Preview", "Pre-Game", "Warmup"].includes(x.data.games.game[i].status.status))  {
			// Second column is start time
			tx += "<td><table>";
			tx += "<tr><td>" + x.data.games.game[i].time + " " + x.data.games.game[i].time_zone + "</td></tr>";
			if (x.data.games.game[i].game_media.media.free == "YES") {
				tx += "<tr><td>FGOD</td></tr>";
			}
			if (x.data.games.game[i].status.status == "Warmup") {
				var mlbtvlink = getStreamLink(x.data.games.game[i].game_pk, x.data.games.game[i].away_name_abbrev, x.data.games.game[i].home_name_abbrev);
				tx += "<tr><td>" + "<a href='" + mlbtvlink + "' target='_blank'  style='text-decoration: none;color:inherit'>&#x1F4FA;</a>" + "</td></tr>";
			}
			tx += "</tr></table></td>";
			// Third column is probables
			tx += "<td><table>";
			tx += "<tr><td>" + x.data.games.game[i].away_probable_pitcher.name_display_roster + "(" + x.data.games.game[i].away_probable_pitcher.wins + "-" + x.data.games.game[i].away_probable_pitcher.losses + ")" + "</td></tr>";
			tx += "<tr><td>" + x.data.games.game[i].home_probable_pitcher.name_display_roster + "(" + x.data.games.game[i].home_probable_pitcher.wins + "-" + x.data.games.game[i].home_probable_pitcher.losses + ")" + "</td></tr>";
			tx += "</table></td>";
		} else {
			// Unknown status, usually something like Delayed: Rain
			tx += "<td colspan=2>" + x.data.games.game[i].status.status + "</td>";
		}
		tx += "</tr>";
	}
	tx += "</table>";
	// set this for the table text
	document.getElementById('scorestable_td').innerHTML = tx;
	
	nohitterrows.forEach(i => {
				document.getElementById("scorestablegame" + i + "tr").classList.toggle("scorestablegametr_nohitter");
	})
	
	// Set favBattersdiv
	update_favBattersdiv();
	
	// Check to give notification to user about favBatter
	// console.log('going to call run notif');
	if (use_notifications) {
		run_favBatters_notification(x);
	}
	
	return;
}

function setForNewSelectedGame(x) {
	if (x === null) {
		// get x
	}
	
	// If no games on day, don't do this
	if (!(x.data.games.game)) {
		return;
	}
	
	// If only one game, it won't be an array, just the dict. Convert it.
	if (!Array.isArray(x.data.games.game)) {
		x.data.games.game = [x.data.games.game];
	}
	
	// Set selectteam
	document.getElementById('selectteam').value = team;
	
	// Update scorestable if it's been more than a short time
	// console.log("last update was", master_scoreboard_last_updated);
	if (!master_scoreboard_last_updated || (((new Date()) - master_scoreboard_last_updated) / 1000) > 15) {
		// console.log("updating scores");
		runAllJS(year, month, day, team);
		return;
	} else {
		// console.log("not updating scores");
	}
	
	doAllHighlights();
	
	// console.log("SELECTED GAME IS");
	// console.log(x);
	
	// Update URL
	// console.log("About to change URL, protocol is ", window.location.protocol);
	switch(window.location.protocol) {
		case 'http:':
		case 'https:':
			//remote file over http or https
			// console.log("from http or https");
			if (history.pushState) {
				// window.history.pushState('abcd', 'Honus - updated', '/?team='+team+'&date='+year+month+day);
				// console.log("Try running: window.history.pushState('abcd', 'Honus - updated', '/Honus/?team='+team+'&date='+year+month+day)");
				window.history.pushState('', 'Honus - updated', '/Honus/?team='+team+'&date='+year+month+day);
			}
			break;
		case 'file:':
			// from local file don't change URL
			// console.log("Loaded from file, URL won't change");
			break;
		default: 
			//some other protocol
			console.log("Loaded by other protocol", window.location.protocol);
	}
	
	// Set border in scorestable for selected box
	var scoretrs = document.getElementsByClassName('scorestablegametr');
	for (let i=0; i< scoretrs.length; i++) {scoretrs[i].classList.remove("scorestablegametr_selected")}
	scoretrs[selected_game].classList.toggle("scorestablegametr_selected");
	
	// Set topbarteams
	var topbarteams_text = " <h4 style='padding-left:1em;padding-right:1em;'>";
	topbarteams_text += x.data.games.game[selected_game].home_team_name + "(" + x.data.games.game[selected_game].home_win + "-" + x.data.games.game[selected_game].home_loss + ")";
	topbarteams_text += " vs ";
	topbarteams_text += x.data.games.game[selected_game].away_team_name + "(" + x.data.games.game[selected_game].away_win + "-" + x.data.games.game[selected_game].away_loss + ")";
	topbarteams_text += "</h4>";
	document.getElementById("topbarteams").innerHTML = topbarteams_text;
	
	// Set toplinescore, box score on top for selected game
	if (x.data.games.game[selected_game].linescore && x.data.games.game[selected_game].linescore.inning) {
		var toplinescore = "";
		toplinescore += "<table>"; // full boxscore table
		toplinescore += "<tr style='border-bottom:solid #80ffff' align='center'>"; // first row, inning nums
		toplinescore += "<td>&nbsp;</td>"; // first td is empty
		for (let i = 0; i < x.data.games.game[selected_game].linescore.inning.length; i++) {
			toplinescore += "<td>" + (i+1) + "</td>"; // Add td with inning number
		}
		toplinescore += "<td style='border-left:thick double #80ffff;'>R</td>";
		toplinescore += "<td>H</td>";
		toplinescore += "<td>E</td>";
		toplinescore += "</tr>"; // end first row
		toplinescore += "<tr align='right'>"; // 2nd row, away team
		toplinescore += "<td>" + x.data.games.game[selected_game].away_name_abbrev + "</td>"; // first td is empty
		for (let i = 0; i < x.data.games.game[selected_game].linescore.inning.length; i++) {
			toplinescore += "<td>" + x.data.games.game[selected_game].linescore.inning[i].away + "</td>"; // Add td with inning number
		}
		toplinescore += "<td style='border-left:thick double #80ffff'>" + x.data.games.game[selected_game].linescore.r.away + "</td>";
		toplinescore += "<td>" + x.data.games.game[selected_game].linescore.h.away + "</td>";
		toplinescore += "<td>" + x.data.games.game[selected_game].linescore.e.away + "</td>";
		toplinescore += "</tr>"; // end 2nd row
		toplinescore += "<tr align='right'>"; // 3rd row, home team
		toplinescore += "<td>" + x.data.games.game[selected_game].home_name_abbrev + "</td>"; // first td is empty
		for (let i = 0; i < x.data.games.game[selected_game].linescore.inning.length; i++) {
			toplinescore += "<td>" + x.data.games.game[selected_game].linescore.inning[i].home + "</td>"; // Add td with inning number
		}
		toplinescore += "<td style='border-left:thick double #80ffff'>" + x.data.games.game[selected_game].linescore.r.home + "</td>";
		toplinescore += "<td>" + x.data.games.game[selected_game].linescore.h.home + "</td>";
		toplinescore += "<td>" + x.data.games.game[selected_game].linescore.e.home + "</td>";
		toplinescore += "</tr>"; // end 3rd row
		toplinescore += "</table>";
		document.getElementById("toplinescore").innerHTML = toplinescore;
	} else {
		document.getElementById("toplinescore").innerHTML =  x.data.games.game[selected_game].time + " " + x.data.games.game[selected_game].time_zone;
	}
	// Set gameday link
	var gamedayurl = "http://mlb.mlb.com/mlb/gameday/index.jsp?gid=" + year + "_" + month + "_" + day + 
	             "_" + x.data.games.game[selected_game].away_code + "mlb_" + 
				 x.data.games.game[selected_game].home_code + "mlb_" + 
				 x.data.games.game[selected_game].game_nbr;
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
	if (!(["Preview", "Pre-Game", "Warmup"].includes(x.data.games.game[selected_game].status.status))) {
		// console.log("Making scoring plays, if fails check for status:", x.data.games.game[selected_game].status.status);
		// Get game_events.json file
		
		var game_pk_forscoringplays = x.data.games.game[selected_game].game_pk;
		if (game_pk != last_selected_game_pk) {
			document.getElementById("scoringplaystable").innerHTML = "Loading scoring plays...";
			// document.getElementById("scoringplaystabdiv").innerHTML = "Loading scoring plays...";
		} else {
			// document.getElementById("scoringplaystable").innerHTML = "Loading scoring plays... SAME GAME DONT DO THIS!";
		}
		// console.log("Going to get game_events now");
		get_JSON_as_object("https://gd2.mlb.com/components/game/mlb/year_" + year + 
							"/month_" + month + "/day_" + day + 
							"/gid_" + year + "_" + month + "_" + day + "_" + 
							x.data.games.game[selected_game].away_code + "mlb_" + 
							x.data.games.game[selected_game].home_code + "mlb_" + 
							x.data.games.game[selected_game].game_nbr + "/game_events.json")
		// .then(x => {console.log("FOUND game_events.json"); return x;})
		.catch(() => {console.log("FAILED getting game_events.json");
			document.getElementById("scoringplaystable").innerHTML = "";
			// document.getElementById("scoringplaystabdiv").innerHTML = "";
		})
		.then( ge => {
			// console.log("game_events is loaded, plays should show up now");
			// console.log("game_events.json is", ge);
			game_events = ge; // Set as global variable
			// var tx = '<tr><td class="fullboxscoretd">Inning</td><td class="fullboxscoretd">Away</td><td class="fullboxscoretd">Home</td><td class="fullboxscoretd">Scoring Play</td></tr>';
			var tx=""; // Text for scoring plays only
			var tplays={}; // Text for all plays
			// Loop over every inning, top/bottom, at bat, check if scoring, if yes the add to table
			if (ge && ge.data && ge.data.game && ge.data.game.inning) {
				// console.log("x is", x, "ge is", ge);
				tx += '<tr><th class="fullboxscoretd">Inning</th><th class="fullboxscoretd">';
				tx += x.data.games.game[selected_game].away_team_name+'</th><th class="fullboxscoretd">';
				tx += x.data.games.game[selected_game].home_team_name+'</th><th class="fullboxscoretd">Scoring Play</th></tr>';
				// If game has been changed, don't update HTML, return now
				if (game_pk != game_pk_forscoringplays) {
					return;
				}
				for (let i=0 ; i < ge.data.game.inning.length; i++) {
					let inn = i + 1;
					tplays[inn] = "";
					["top", "bottom"].forEach(top_or_bottom => {
						let camelcase_top_or_bottom=""; if (top_or_bottom=="top") {camelcase_top_or_bottom="Top"} else {camelcase_top_or_bottom="Bottom"}
						// tplays[inn] += "<tr><th>" + camelcase_top_or_bottom + "</th></tr>";
						if (top_or_bottom == "bottom") {tplays[inn] += "<tr><td>&nbsp;</td></tr>"}
						var atbat_array, action_array;
						if (ge.data.game.inning[i][top_or_bottom] && ge.data.game.inning[i][top_or_bottom]["atbat"]) {
							if (Array.isArray(ge.data.game.inning[i][top_or_bottom]["atbat"])) {
								atbat_array = ge.data.game.inning[i][top_or_bottom]["atbat"];
							} else {
								atbat_array = [ge.data.game.inning[i][top_or_bottom]["atbat"]];
							}
						} else {
							atbat_array = [];
						}
						
						if (ge.data.game.inning[i][top_or_bottom] && ge.data.game.inning[i][top_or_bottom]["action"]) {
							if (Array.isArray(ge.data.game.inning[i][top_or_bottom]["action"])) {
								action_array = ge.data.game.inning[i][top_or_bottom]["action"];
							} else {
								action_array = [ge.data.game.inning[i][top_or_bottom]["action"]];
							}
						} else {
							action_array = [];
						}
						
						var atbat_and_action_array = atbat_array.concat(action_array);
						atbat_and_action_array.sort((a,b) => {
							let t1, t2;
							if (a.end_tfs_zulu) {t1 = new Date(a.end_tfs_zulu)} else {t1 = new Date(a.tfs_zulu)};
							if (b.end_tfs_zulu) {t2 = new Date(b.end_tfs_zulu)} else {t2 = new Date(b.tfs_zulu)};
							return t1 - t2;
						});
						// console.log('at bat and action arrays are', atbat_array, action_array);
						// console.log("Sorted atbat_and_action_array is", atbat_and_action_array);
						let firstrow = true;
						atbat_and_action_array.forEach(eventi => {
						
						// //console.log(ge.data.game.inning[i][top_or_bottom]);
						// ["atbat", "action"].forEach(atbat_or_action => {
							// // console.log("atbat_or_action is", atbat_or_action, "i is", i, "t/b is ", top_or_bottom);
							// // console.log(ge.data.game);
							// if (ge.data.game.inning[i][top_or_bottom] && ge.data.game.inning[i][top_or_bottom][atbat_or_action]) {
								// var this_atbataction;
								// if (Array.isArray(ge.data.game.inning[i][top_or_bottom][atbat_or_action])) {
									// this_atbataction = ge.data.game.inning[i][top_or_bottom][atbat_or_action];
								// } else {
									// this_atbataction = [ge.data.game.inning[i][top_or_bottom][atbat_or_action]];
								// }
								// this_atbataction.forEach(eventi => {
									// Check for scoring play
									var runscored = false;
									var eventi_runner;
									let runners_after_play = [false, false, false];
									if (Array.isArray(eventi.runner)) {
										eventi_runner = eventi.runner;
									} else {
										eventi_runner = [eventi.runner];
									}
									if (eventi.runner) {
										for (let j=0; j < eventi_runner.length; j++) {
											// console.log("runner is");
											// console.log(eventi_runner);
											if (eventi_runner[j].end == "score") {
												runscored = true;
											}
											if (eventi_runner[j].end == "1B") {runners_after_play[0] = true;}
											if (eventi_runner[j].end == "2B") {runners_after_play[1] = true;}
											if (eventi_runner[j].end == "3B") {runners_after_play[2] = true;}
										}
										if (runscored) {
											//console.log("run scored, add to table");
											//console.log(eventi.des);
											tx += "<tr>";
											tx += '<td class="fullboxscoretd" style="text-align:center;">' + (i+1) + '</td>';
											if (top_or_bottom == "top") {
												tx += '<td class="fullboxscoretd fullboxscoretdscoringteam" style="text-align:center;">' + eventi.away_team_runs + '</td>';
											} else {
												tx += '<td class="fullboxscoretd" style="text-align:center;">' + eventi.away_team_runs + '</td>';
											}
											if (top_or_bottom == "bottom") {
												tx += '<td class="fullboxscoretd fullboxscoretdscoringteam" style="text-align:center;">' + eventi.home_team_runs + '</td>';
											} else {
												tx += '<td class="fullboxscoretd" style="text-align:center;">' + eventi.home_team_runs + '</td>';
											}
											tx += '<td class="fullboxscoretd" style="text-align:left;">' + eventi.des            + '</td>';
											tx += "<td class='fullboxscoretd' ><a href='https://baseballsavant.mlb.com/sporty-videos?playId="+eventi.play_guid+"' target='_blank' style='text-decoration: none;color:inherit'>&#128250;</a></td>"; // Add video link, only works for games at least two days old
											// tx += "<tr>";
											tx += "</tr>";
										}
									}
									
									// Need to put atbat and actions in same array, sort by new Date(game_events.data.game.inning[3].bottom.atbat[2].end_tfs_zulu).
									
									// Add play to all plays
									tplays[inn] += "<tr>";
									if (firstrow) {
										tplays[inn] += "<td class='fullboxscoretd' >" + camelcase_top_or_bottom + "</td>";
										firstrow = false;
									} else {
										tplays[inn] += "<td></td>";
									}
									if (runscored && top_or_bottom=="top") {
										tplays[inn] += "<td class='fullboxscoretd fullboxscoretdscoringteam'  style='text-align:center;'>" + eventi.away_team_runs + "</td>";
									} else {
										tplays[inn] += "<td class='fullboxscoretd'  style='text-align:center;'>" + eventi.away_team_runs + "</td>";
									}
									if (runscored && top_or_bottom=="bottom") {
										tplays[inn] += "<td class='fullboxscoretd fullboxscoretdscoringteam'  style='text-align:center;'>" + eventi.home_team_runs + "</td>";
									} else {
										tplays[inn] += "<td class='fullboxscoretd'  style='text-align:center;'>" + eventi.home_team_runs + "</td>";
									}
									tplays[inn] += "<td class='fullboxscoretd'  style='text-align:center;'>" + eventi.o + "</td>";
									tplays[inn] += "<td class='fullboxscoretd'  style='text-align:center;'><img src='./static/Baserunners";
									let runners_after_play_string = JSON.stringify(runners_after_play);
									// if (     runners_after_play_string == JSON.stringify([false, false, false])) {tplays[inn] += "0";}
									// else if (runners_after_play_string == JSON.stringify([ true, false, false])) {tplays[inn] += "1";}
									// else if (runners_after_play_string == JSON.stringify([false,  true, false])) {tplays[inn] += "2";}
									// else if (runners_after_play_string == JSON.stringify([ true,  true, false])) {tplays[inn] += "4";}
									// else if (runners_after_play_string == JSON.stringify([false, false,  true])) {tplays[inn] += "3";}
									// else if (runners_after_play_string == JSON.stringify([ true, false,  true])) {tplays[inn] += "5";}
									// else if (runners_after_play_string == JSON.stringify([false,  true,  true])) {tplays[inn] += "6";}
									// else if (runners_after_play_string == JSON.stringify([ true,  true,  true])) {tplays[inn] += "7";}
									// else {tplays[inn] += "0"; console.log("ERROR finding baserunner image for plays");};
									// Above is normal colors, below is inverted
									if (     runners_after_play_string == JSON.stringify([false, false, false])) {tplays[inn] += "7";}
									else if (runners_after_play_string == JSON.stringify([ true, false, false])) {tplays[inn] += "6";}
									else if (runners_after_play_string == JSON.stringify([false,  true, false])) {tplays[inn] += "5";}
									else if (runners_after_play_string == JSON.stringify([ true,  true, false])) {tplays[inn] += "3";}
									else if (runners_after_play_string == JSON.stringify([false, false,  true])) {tplays[inn] += "4";}
									else if (runners_after_play_string == JSON.stringify([ true, false,  true])) {tplays[inn] += "2";console.log("Using tft", runners_after_play_string, "you didn't fix this error");}
									else if (runners_after_play_string == JSON.stringify([false,  true,  true])) {tplays[inn] += "1";}
									else if (runners_after_play_string == JSON.stringify([ true,  true,  true])) {tplays[inn] += "0";}
									else {tplays[inn] += "0"; console.log("ERROR finding baserunner image for plays");};
									tplays[inn] += ".png' alt='Baserunners' height='12' width='12' /></td>";
									// tplays += "<td>" + eventi["event"] + "</td>"; e.g. "Walk", "Pop out", etc
									tplays[inn] += "<td class='fullboxscoretd' >" + eventi.des + "</td>"; // sentence description of play
                  //console.log("eventi is");
                  //console.log(eventi);
									tplays[inn] += "<td class='fullboxscoretd' ><a href='https://baseballsavant.mlb.com/sporty-videos?playId="+eventi.play_guid+"' target='_blank' style='text-decoration: none;color:inherit'>&#128250;</a></td>"; // Add video link, only works for games at least two days old
									// tplays += "<td>" +  + "</td>";
									// tplays += "<td>" +  + "</td>";
									// tplays += eventi.des;
									tplays[inn] += "</tr>\n";
									// console.log("tplaysinn is", tplays[inn]);
								// });
							// }
							
						});
					});
				}
				// console.log("pk was ", game_pk_forscoringplays, " is now ", game_pk);
				// If game has been changed, don't update HTML. Should have stopped above, but putting here too
				if (game_pk == game_pk_forscoringplays) {
					// Scoring plays
					document.getElementById("scoringplaystable").innerHTML = tx;
					// document.getElementById("scoringplaystabdiv").innerHTML = "<table>" + tx + "</table>";
					document.getElementById("playstabdivscoringdiv").innerHTML = "<table>" + tx + "</table>";
					
					// All plays
					// console.log('tplays is', tplays);
					var tinnings = "";
					var tinningbuttons = '';
					for (let inn in tplays) {
						// Add button for this inning
						tinningbuttons += '<button class="playstablinks" id="playstabbutton'+inn+'"  onclick="openPlays(event, \'playstabsinning'+inn+'\')">'+inn+'</button>';
						// console.log("inn is", inn);
						tinnings += '<div id="playstabsinning'+inn+'" class="playstabcontent" style="display:none;"><div class="allplaysinningtitle">Inning '+ inn +'</div><table>';
						tinnings += '<tr><th ></th><th class="fullboxscoretd">'+x.data.games.game[selected_game].away_name_abbrev+'</th>';
						tinnings += '<th class="fullboxscoretd">'+x.data.games.game[selected_game].home_name_abbrev+'</th><th  class="fullboxscoretd">Outs</th><th  class="fullboxscoretd">Bases</th><th  class="fullboxscoretd">Play</th> </tr>';
						tinnings += tplays[inn];
						tinnings += '</table></div>';
					}
					document.getElementById("playstabsinnings").innerHTML = tinnings;
					document.getElementById('playstabinningbuttons').innerHTML = tinningbuttons;
					
					// Make live tab if game is live
					if (x.data.games.game[selected_game].status.ind == "I") {make_live_tab(x.data.games.game[selected_game], ge);}
				} else {
					// Doesn't match current game, just do nothing since that update should be coming soon
				}
				
				// Now do all plays
				// console.log('tplays is', tplays);
			} // End if (ge)
		});
	} else {
		// Game hasn't started yet, no scoring plays
		document.getElementById("scoringplaystable").innerHTML = "";
		document.getElementById("livediv").innerHTML = "Game is not live.";
		// document.getElementById("scoringplaystabdiv").innerHTML = "";

	}
	
	// Get full box score at bottom
	// Only clear if it's a different game
	if (game_pk != last_selected_game_pk) {
		document.getElementById("fullboxscoretable").innerHTML = "Loading box score...";
		document.getElementById("fullboxscoretabdiv").innerHTML = "Loading box score...";
	}
	get_JSON_as_object("https://gd2.mlb.com/components/game/mlb/year_" + year + 
						"/month_" + month + "/day_" + day + 
						"/gid_" + year + "_" + month + "_" + day + "_" + 
						x.data.games.game[selected_game].away_code + "mlb_" + 
						x.data.games.game[selected_game].home_code + "mlb_" + 
						x.data.games.game[selected_game].game_nbr + "/boxscore.json")
	// .then(x => {console.log("FOUND boxscore.json"); return x;})
	.catch(() => {console.log("FAILED getting boxscore.json");})
	.then(x => {
		if (x.data.boxscore.home_fname == "Chicago Cubs") {aboxscore = x;}
		// console.log("boxscore is");
		// console.log(x);
		var tx = "";
		tx += "<table><tr>"; // table of tables
		["away", "home"].forEach( away_or_home => {
			var away_or_home_01;
			if (away_or_home == "away") {
				away_or_home_01 = 1;
			} else {
				away_or_home_01 = 0;
			}
			
			if (x.data.boxscore.batting[away_or_home_01] && x.data.boxscore.batting[away_or_home_01].batter) {
				// top row
				tx += "<td style='vertical-align:top;'><table class='fullboxscoretables'><tr>";
				// tx += '<td class="fullboxscoretd" colspan=2>' + x.data.boxscore[away_or_home + "_sname"] + '</td>';
				tx += '<td class="fullboxscoretd">' + x.data.boxscore[away_or_home + "_sname"] + '</td><td class="fullboxscoretd">&#9733;</td>';
				tx += '<td class="fullboxscoretd">' + 'POS' + '</td>';
				tx += '<td class="fullboxscoretd">' + 'H' + '</td>';
				tx += '<td class="fullboxscoretd">' + 'AB' + '</td>';
				tx += '<td class="fullboxscoretd">' + 'BB' + '</td>';
				tx += '<td class="fullboxscoretd">' + 'SO' + '</td>';
				tx += '<td class="fullboxscoretd">' + 'HR' + '</td>';
				tx += '<td class="fullboxscoretd">' + 'RBI' + '</td>';
				tx += '<td class="fullboxscoretd">' + 'R' + '</td>';
				tx += '<td class="fullboxscoretd">' + 'SB' + '</td>';
				tx += '<td class="fullboxscoretd">' + 'AVG' + '</td>';
				tx += '<td class="fullboxscoretd">' + 'OBP' + '</td>';
				tx += '<td class="fullboxscoretd">' + 'OPS' + '</td>';
				tx += '<td class="fullboxscoretd">' + 'HR' + '</td>';
				tx += '<td class="fullboxscoretd">' + 'RBI' + '</td>';
				tx += "</tr>";
				// row for each player
				x.data.boxscore.batting[away_or_home_01].batter.forEach(batteri => {
					// Check if pitcher that isn't in batting order, don't get row if it is
					if (batteri.bo && batteri.bo.length > 0) {
						tx += get_boxscore_row_for_batter(batteri);
					}
				});
			}
			tx += "</table></td>";
		});
		tx += "</tr>"; // table of tables
		// console.log('tx is ');
		// console.log(tx);
		
		// Now do pitching table
		// var tx = "";
		tx += "<tr>"; // table of tables
		["away", "home"].forEach( away_or_home => {
			var away_or_home_01;
			if (away_or_home == "away") {
				away_or_home_01 = 0;
			} else {
				away_or_home_01 = 1;
			}
			// top row
			if (x.data.boxscore.pitching[away_or_home_01] && x.data.boxscore.pitching[away_or_home_01].pitcher) {
				tx += "<td style='vertical-align:top;'><table class='fullboxscoretables'><tr>";
				tx += '<td class="fullboxscoretd">' + x.data.boxscore[away_or_home + "_sname"] + '</td><td class="fullboxscoretd">&#9733;</td>';
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
				var pitcher_array = x.data.boxscore.pitching[away_or_home_01].pitcher;
				if (!Array.isArray(pitcher_array)) {pitcher_array = [pitcher_array];}
				pitcher_array.forEach(pitcheri => {
					tx += '<tr>';
					// console.log("pitcheri is", pitcheri);
					// console.log("bo is", pitcheri.bo);
					// Can't use https for these MLB links!
					tx += '<td class="fullboxscoretd"><a class="playernamelink" target="_blank" href="http://m.mlb.com/gameday/player/'+ pitcheri.id +'"><div style="text-align:left;" >';
					// if (pitcheri.bo.substr(1,2) != "00") {tx += "- ";}
					tx += pitcheri.name_display_first_last;
					if (pitcheri.win) {tx += " (W)"}
					if (pitcheri.loss) {tx += " (L)"}
					if (pitcheri.save) {tx += " (S)"}
					tx += '</div></a></td>';
					// Now use checkbox instead of +/-
					if (favBattersIds.includes(pitcheri.id)) {
						tx += "<td  class='fullboxscoretd' ";
						tx += "><input type='checkbox' checked onclick='removeFavoriteBatter(\"" + pitcheri.id + "\",\"" + pitcheri.name_display_first_last + "\", this);";
						tx += "'></td>";
					} else {			
						tx += "<td  class='fullboxscoretd' ";
						tx += "><input type='checkbox'  onclick='addFavoriteBatter(\"" + pitcheri.id + "\",\"" + pitcheri.name_display_first_last + "\", this);";
						tx += "'></td>";
					}
					tx += '<td class="fullboxscoretd">' + pitcheri.pos + '</td>';
					tx += '<td class="fullboxscoretd">' + Math.floor(pitcheri.out / 3) + "." + (pitcheri.out % 3) + '</td>';
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
				});
			}
			tx += "</table></td>";
		});
		tx += "</tr></table>"; // table of tables
		// console.log('tx is ');
		// console.log(tx);
		
		
		
		
		document.getElementById("fullboxscoretable").innerHTML = tx;
		// Also set in boxscore tab
		
		document.getElementById("fullboxscoretabdiv").innerHTML = tx;
	});
	
	// Get FanGraphs win prob if game has changed
	if (game_pk != last_selected_game_pk) {
		var tx = "";
		if (["I", "F", "IR", "OR", "O"].includes(master_scoreboard_JSON.data.games.game[selected_game].status.ind)) { // IR for rain delay, OR for game finished early b/c of rain, O is over(?)
			let width_int =  250 + parseInt(document.getElementById("videowidthslider").value);
			let height_int = Math.ceil(9/16* width_int);
			let away_team_name = master_scoreboard_JSON.data.games.game[selected_game].away_team_name;
			let dh = "0";
			if (master_scoreboard_JSON.data.games.game[selected_game].double_header_sw != "N") {
				// console.log("Is a dbh!!!!", master_scoreboard_JSON.data.games.game[selected_game].game_nbr);
				dh = master_scoreboard_JSON.data.games.game[selected_game].game_nbr;
			}
			if (away_team_name == "D-backs") { // Fangraphs using full name, MLB does not
				away_team_name = "Diamondbacks";
			}
			tx += '<iframe src="https://www.fangraphs.com/graphframe.aspx?config=0&';
			tx += 'static=0&type=livewins&num=0&h=' + height_int;
			tx += '&w='+ width_int +'&date='+year+'-'+month+'-'+day+'&team=';
			tx += away_team_name;
			tx += '&dh=' + dh + '" frameborder="0" scrolling="no" height="' + height_int;
			tx += '" width = "'+ width_int + '" ';
			tx += ' style="border:1px solid black;"></iframe><br /><span style="font-size:9pt;">';
			tx += 'Source: <a href="https://www.fangraphs.com/livewins.aspx?date='+year+'-'+month+'-'+day;
			tx += '&team=' + away_team_name + '&dh=' + dh;
			tx +='&season=2019">FanGraphs</a></span>';
			// console.log('fg is', tx);
		} else {
			tx += 'Fangraphs win probability chart can only be shown for games that have started';
		}
		document.getElementById("fangraphsWinProbDiv").innerHTML = tx;
	}

	last_selected_game_pk = game_pk;
}

function get_boxscore_row_for_batter(batteri) {
	var tx = "";
	tx += '<tr>';
	// console.log("batteri is", batteri);
	// console.log("bo is", batteri.bo);
	// Can't use https for these MLB links!
	// console.log("batter is", batteri.bo, batteri.pos, batteri.name_display_first_last, batteri);
	tx += '<td class="fullboxscoretd"><a class="playernamelink" target="_blank" href="http://m.mlb.com/gameday/player/'+ batteri.id +'"><div style="text-align:left;" >';
	if (batteri.bo.length == 0) {console.log("Getting row for batter not in lineup, probably a pitcher")}
	if (batteri.bo.substr(1,2) != "00") {tx += "- ";}
	tx += batteri.name_display_first_last + '</div></a></td>';
	// Option to add to favorite batters (or remove)
	if (use_favBatters) {
		// if (!favBattersIds.includes(batteri.id)) {
			// tx += "<td id='boxscoreaddfavBatterbutton" + batteri.id +"'  class='fullboxscoretd' ";
			// tx += "onclick='addFavoriteBatter(\"" + batteri.id + "\",\"" + batteri.name_display_first_last + "\");";
			// tx += "flip_boxscoreaddfavBatterbutton(\""+batteri.id+"\",\""+ batteri.name_display_first_last+"\");update_favBattersdiv();'>+</td>";
		// } else {
			// tx += "<td id='boxscoreaddfavBatterbutton" + batteri.id +"'  class='fullboxscoretd' ";
			// tx += "onclick='removeFavoriteBatter(\"" + batteri.id + "\",\"" + batteri.name_display_first_last + "\");";
			// tx += "flip_boxscoreaddfavBatterbutton(\""+batteri.id+"\",\""+ batteri.name_display_first_last+"\");update_favBattersdiv();'>-</td>";
		// }
		
		// Now use checkbox instead of +/-
		if (favBattersIds.includes(batteri.id)) {
			tx += "<td  class='fullboxscoretd' ";
			tx += "><input type='checkbox' checked onclick='removeFavoriteBatter(\"" + batteri.id + "\",\"" + batteri.name_display_first_last + "\", this);";
			tx += "'></td>";
		} else {			
			tx += "<td  class='fullboxscoretd' ";
			tx += "><input type='checkbox'  onclick='addFavoriteBatter(\"" + batteri.id + "\",\"" + batteri.name_display_first_last + "\", this);";
			tx += "'></td>";
		}
		
	} else {
		tx += "<td></td>";
	}
	tx += '<td class="fullboxscoretd">' + batteri.pos + '</td>';
	tx += '<td class="fullboxscoretd">' + batteri.h + '</td>';
	tx += '<td class="fullboxscoretd">' + batteri.ab + '</td>';
	tx += '<td class="fullboxscoretd">' + if_not_zero(batteri.bb) + '</td>';
	tx += '<td class="fullboxscoretd">' + if_not_zero(batteri.so) + '</td>';
	tx += '<td class="fullboxscoretd">' + if_not_zero(batteri.hr) + '</td>';
	tx += '<td class="fullboxscoretd">' + if_not_zero(batteri.rbi) + '</td>';
	tx += '<td class="fullboxscoretd">' + if_not_zero(batteri.r) + '</td>';
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
	return tx;
}

// function updateSelectedGame() {
	// // First 
	// //
	// setForNewSelectedGame(x)
// }

function readInFavoriteBatters() {
	var favBatters_string = localStorage.getItem("favBatters");
	var favBatters = [];
	if (favBatters_string) {
		var fBsplit = favBatters_string.split(";")
			.forEach(x => {
			if (x !== "") {
				favBatters = favBatters.concat(JSON.parse(x));
			}
		});
	}
	return favBatters;
}

function readInFavoriteBattersUseNotification() {
	var favBattersNotif_string = localStorage.getItem("favBattersUseNotifications");
	if (favBattersNotif_string) {
		return JSON.parse(favBattersNotif_string);
	}
	return {};
}

function addFavoriteBatter(id, name_display_first_last, this_) {
	console.log("Add id to fav batters", id, name_display_first_last);
	// Don't add if already there
	if (!favBattersIds.includes(id)) {
		favBatters = favBatters.concat({
			id:id,
			name_display_first_last:name_display_first_last
		});
		saveFavoriteBatters();
		favBattersIds = getFavoriteBattersIds();
	}
	
	// If this_ was given, it means the onclick needs to be flipped to add player back
	if (typeof this_ !== "undefined") {
		// console.log('this_ was not undefined');
		this_.onclick = function() {addFavoriteBatter(id, name_display_first_last, this_)};
	} else {
		// console.log('this_ was undefined');
	}
	// Add to Notifications
	favBattersUseNotifications[id] = true;
	saveFavoriteBattersUseNotifications();
	
	// Request permission if first batter added and not already granted
	if (favBattersIds.length == 1) {
		if (Notification.permission !== "granted") {
			Notification.requestPermission();
		}
	}
	
	return;
}

function removeFavoriteBatter(id, name_display_first_last, this_) {
	console.log("Remove id to fav batters", id, name_display_first_last);
	favBatters = favBatters.filter( b => b.id != id);
	saveFavoriteBatters();
	favBattersIds = getFavoriteBattersIds();
	
	// If this_ was given, it means the onclick needs to be flipped to add player back
	if (typeof this_ !== "undefined") {
		// console.log('this_ was not undefined');
		this_.onclick = function() {addFavoriteBatter(id, name_display_first_last, this_)};
	} else {
		// console.log('this_ was undefined');
	}
	// Delete from Notifications
	delete favBattersUseNotifications[id];
	saveFavoriteBattersUseNotifications();
	
	return;
}

function addFavoriteBatterNotification(id, name_display_first_last, this_) {
	favBattersUseNotifications[id] = true;
	saveFavoriteBattersUseNotifications();
	// If this_ was given, it means the onclick needs to be flipped to add player back
	if (typeof this_ !== "undefined") {
		this_.onclick = function() {removeFavoriteBatterNotification(id, name_display_first_last, this_)};
	}
	return;
}

function removeFavoriteBatterNotification(id, name_display_first_last, this_) {
	favBattersUseNotifications[id] = false;
	saveFavoriteBattersUseNotifications();
	// If this_ was given, it means the onclick needs to be flipped to add player back
	if (typeof this_ !== "undefined") {
		this_.onclick = function() {addFavoriteBatterNotification(id, name_display_first_last, this_)};
	}
	return;
}

function saveFavoriteBatters() {
	var tx = "";
	favBatters.forEach(b => {
		tx += JSON.stringify(b) + ";";
	});
	// return tx;
	localStorage.setItem("favBatters", tx);
	return;
}

function saveFavoriteBattersUseNotifications() {
	localStorage.setItem("favBattersUseNotifications", JSON.stringify(favBattersUseNotifications));
	return;
}

function getFavoriteBattersIds() {
	var Ids = [];
	favBatters.forEach(b => {
		Ids.push(b.id);
	});
	return Ids;
}

function flip_boxscoreaddfavBatterbutton(id, name_display_first_last) {
	// When you click on +/-, this should flip it to -/+ and change the onclick
	var td = document.getElementById("boxscoreaddfavBatterbutton" + id);
	if (td.innerHTML == "+") {
		td.innerHTML = "-";
		td.onclick = function() {removeFavoriteBatter(id, name_display_first_last); flip_boxscoreaddfavBatterbutton(id, name_display_first_last); update_favBattersdiv();};
	} else if (td.innerHTML == "-") {
		td.innerHTML = "+";
		td.onclick = function() {addFavoriteBatter(id, name_display_first_last); flip_boxscoreaddfavBatterbutton(id, name_display_first_last); update_favBattersdiv();};
	} else {
		console.log("Error with flip button", id);
	}
	return;
}

function update_favBattersdiv() {
	if (localStorage.getItem("use_favBatters") != use_favBatters) {
		localStorage.setItem("use_favBatters", use_favBatters);
	}
	if (use_favBatters && favBatters) {
		let tx = "";
		// tx += "Your favorite batters are:";
		tx += "<div style='margin-top:20px;'>You will get notifications when these players are ondeck/batting:";
		tx += "<button type='button' id='favBattersOn' onclick='use_favBatters=false;use_notifications=false;update_favBattersdiv()'>Turn off</button></div>";
		if (document.getElementById("selectreload").value == "never") {
			tx += "<div><strong>Turn on refresh rate at top of page for this to be useful!</strong></div>";
		}
		tx += "<table id='favBatterstable'>";
		if (favBatters.length === 0) {
			// no batters, tell them how to add them
			tx += "To add players to be notified about, find their name in a boxscore and click the '+' to the right of their name.";
		} else if (favBatters.length > 0) {
			tx += "<tr align='center'><th>Remove</th><th>Name</th></th>";
			favBatters.forEach(b => {
				tx += "<tr>";
				// tx += "<td align='center' onclick='removeFavoriteBatter(\"" + b.id + "\");update_favBattersdiv()'>-</td>";
				// Change to checkbox, not necessary
				tx += "<td align='center'><input type='checkbox' checked onclick='removeFavoriteBatter(\"" + b.id + "\");update_favBattersdiv()'></td>";
				tx += "<td>" + b.name_display_first_last + "</td>";
				// tx += "</td>";
				tx += "</tr>";
			});
		} else {
			console.log("Big error in update_favBattersdiv");
		}
		tx += "</table>";
		
		document.getElementById('favBattersdiv').innerHTML = tx;
	} else {
		let tx = "";
		tx += "<button type='button' id='favBattersOn' onclick='use_favBatters=true;update_favBattersdiv()'>Turn on notifications when my favorite batters are at bat or on deck</button>";
		document.getElementById('favBattersdiv').innerHTML = tx;
	}
}

function make_notification(title, body, link) {
	// help from https://stackoverflow.com/questions/6092885/what-ways-are-out-there-to-display-a-desktop-notification-from-a-web-app/13328397#13328397
	// See https://www.w3.org/TR/notifications/ for info on Notification
	// Check if notification is allowed
	if (!Notification) {
		alert('Desktop notifications not available in your browser. Try Chromium.'); 
		return;
	}
	
	// Request permission if not already granted
	if (Notification.permission !== "granted") {
		Notification.requestPermission();
	}
	
	// Make notification
	console.log("making notification right now", title);
	var mynot = new Notification(title,{
		icon:"./favicon.ico",
		body:body});
	// alert("Alerted");
	// When you click it, open MLB.tv and then close the notification
	mynot.onclick = function () {
		console.log("updated last clicked from notif");
		last_user_click_time=new Date(); setUserInactivityTimer();
		window.open(link);     
		mynot.close();
    };
	
	return;
}

function run_favBatters_notification(x) {
	// console.log('starting notif', x);
	// x should be same as master_scoreboard_JSON
	var y = x.data.games.game;
	// Will loop over and save info for favBatters that are at bat, on deck
	var fb_id = [];
	var fb_first = [];
	var fb_last = [];
	var fb_status = [];
	var fb = [];
	
	y.forEach(g => {
		// Make sure it is in progress
		if (g.status.ind =="I") {
			if (favBattersIds.includes(g.batter.id)) {
				// fb_id.push(g.batter.id);
				// fb_id.push(g.batter.first)0;
				// console.log("batter", g.batter.last);
				fb.push({id:g.batter.id, first:g.batter.first, last:g.batter.last, status:"batter", game_pk:g.game_pk, away_name_abbrev:g.away_name_abbrev, home_name_abbrev:g.home_name_abbrev});
			} else if (favBattersIds.includes(g.ondeck.id)) {
				// console.log("ondeck", g.ondeck.last);
				fb.push({id:g.ondeck.id, first:g.ondeck.first, last:g.ondeck.last, status:"ondeck", game_pk:g.game_pk, away_name_abbrev:g.away_name_abbrev, home_name_abbrev:g.home_name_abbrev});
			} else if (favBattersIds.includes(g.pitcher.id)) {
				fb.push({id:g.pitcher.id, first:g.pitcher.first, last:g.pitcher.last, status:"pitcher", game_pk:g.game_pk, away_name_abbrev:g.away_name_abbrev, home_name_abbrev:g.home_name_abbrev});
			}
		}
	});
	// console.log("fb is ", fb);
	
	if (fb && fb.length > 0) {
		fb.forEach(fbi => {
			// console.log("About to give popup");
			// Check if recently notified
			var min_between_notif;
			if (fbi.status=="pitcher") {min_between_notif = 60} else {min_between_notif = 10} // 10 minutes between batter notif, 60 for pitchers
			// Make sure player isn't set to not get notifications
			if (!(fbi.id in favBattersUseNotifications) || favBattersUseNotifications[fbi.id]) {
				// Make sure it's been long enough
				if (!favBatters_last_notification[fbi.id] || (new Date()) - favBatters_last_notification[fbi.id] > 1000*60*min_between_notif) {
					console.log("enough time since last notif", fbi);
					var notif_body = "";
					if (fbi.status == "batter") {
						notif_body = fbi.first + " " + fbi.last + " is " + "batting!";
					} else if (fbi.status == "ondeck") {
						notif_body = fbi.first + " " + fbi.last + " is " + "on deck!";
					} else if (fbi.status == "pitcher") {
						notif_body = fbi.first + " " + fbi.last + " is " + "pitching!";
					} else {
						console.log("error with notif", fbi.status);
					}
					make_notification(notif_body,
									  "Click here to open game on MLB.tv",
									  // "https://www.mlb.com/tv/g" + fbi.game_pk
									  getStreamLink(fbi.game_pk, fbi.away_name_abbrev, fbi.home_name_abbrev)
									);
					favBatters_last_notification[fbi.id] = new Date();
				} else {
					console.log("Was already notified about", fbi);
				}
			} else {
				console.log("You turned off notifications for", fbi.first, fbi.last);
			}
		});
	}
	
	return;
}

function update_refresh_rate() {
	console.log("Updating refresh rate");
	var refresh_rate = document.getElementById("selectreload").value;
	localStorage.setItem("reload_rate", refresh_rate);
	if (refresh_rate == "never") {
		clearInterval(refresh_setInterval_id);
		refresh_setInterval_id = null;
		return;
	}
	var rr = parseInt(refresh_rate);
	
	refresh_setInterval_id = setInterval(
		function() {
			console.log('would refresh now', new Date());
			runAllJS(year, month, day, team);
		},
		rr*1000);
	return;
}


function openTab(evt, tabName) {
	// Get all elements with class="tabcontent" and hide them
	var tabcontent = document.getElementsByClassName("tabcontent");
	for (let i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	var tablinks = document.getElementsByClassName("tablinks");
	for (let i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
  
	if (tabName=="newstab") {
		// document.getElementById("newstab").style.width = 800;
		// document.getElementById("newstab").style.width = document.getElementById("videowidthslider").value;
		$('#newstab').width(250 + parseInt(document.getElementById("videowidthslider").value));
		$('#newstabtwitterfeed').width(530);
		// document.getElementById("newstab").innerHTML = '<a id="newstabtwitterfeed" class="twitter-timeline" width="520" data-width="520px" data-height="200" data-theme="dark" href="https://twitter.com/collin_e/lists/mlb?ref_src=twsrc%5Etfw">An MLB Twitter List</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'
		document.getElementById("newstabtwitterfeed").innerHTML = '<a id="newstabtwitterfeed" class="twitter-timeline" width="520" data-width="520px" data-height="600" data-theme="dark" href="https://twitter.com/collin_e/lists/mlb?ref_src=twsrc%5Etfw">An MLB Twitter List</a>';
		// <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'
		jQuery.getScript("https://platform.twitter.com/widgets.js");
	}
  
	if (tabName=="standingstab") {
		makeStandings();
	}
	
	if (tabName == "favhitterstab" || tabName == "favpitcherstab") {
		do_fav_hitters_table()
	}
  
	if (tabName=="livetab") {
		// make_live_tab();
		// putting this in scoring plays update
	}
}

// play_guid to url
//fetch("https://raw.githubusercontent.com/CollinErickson/Honus/master/URLsJSON/test1.json")
  //.then(response => response.json())
  //.then(response => JSON.parse(response[0])[0]);

function openPlays(evt, selected_inning) {
	console.log("sel inning is", selected_inning);
	var tabcontent = document.getElementsByClassName("playstabcontent");
	
	// Get all elements with class="tabcontent" and hide them
	for (let i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	// Get all elements with class="tablinks" and remove the class "active"
	var tablinks = document.getElementsByClassName("playstablinks");
	for (let i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	
	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(selected_inning).style.display = "block";
	evt.currentTarget.className += " active";
}

function setUserInactivityTimer() {
	// last_user_click_time= new Date();
	// console.log("Setting up inactivity timer", last_user_click_time);
	
	var minutes_to_timeout = 60;
	clearInterval(user_inactivity_timer_id);
	
	user_inactivity_timer_id = setTimeout(
		function() {
			console.log("You have timed out, stopping refresh", new Date());
			// Clear current refresh timer
			clearInterval(refresh_setInterval_id);
			refresh_setInterval_id = null;
			// Set refresh rate to zero
			document.getElementById("selectreload").value = "never";
			user_inactivity_timer_id = null;
		},
		minutes_to_timeout * 1000 * 60 // milliseconds
	);
	return;
}

function makeStandings() {
	// var st = get_JSON_as_object_with_proxy("https://erikberg.com/mlb/standings.json");
	
	var st = get_JSON_as_object_with_proxy("https://erikberg.com/mlb/standings.json")
	.then(st => {
		// console.log(st);
		var tx = "";
		tx += "<table id='standingstable'>";
		for (let ileague=0; ileague<2; ileague++) {
			tx += "<tr>"; // AL title row
			tx += "<td rowspan=7 class='standingsleaguetd'>";
			if (ileague===0) {tx += "AL"} else {tx += "NL"}
			tx += "</td>";
			tx += "<td colSpan=8 class='standingsdivisionnametd'>West</td>";
			tx += "<td colSpan=8 class='standingsdivisionnametd'>Central</td>";
			tx += "<td colSpan=8 class='standingsdivisionnametd'>East</td>";
			tx += "</tr>"; // end AL title row
			tx += "<tr>"; // AL header row 
			for(var i=0; i<3; i++) {
				tx += "<td>Name</td>";
				tx += "<td>W</td>";
				tx += "<td>L</td>";
				tx += "<td>GB</td>";
				tx += "<td>W%</td>";
				tx += "<td>RD</td>";
				tx += "<td>Strk</td>";
				tx += "<td>L10</td>";
			}
			tx += "</tr>"; // end AL header row 
				// console.log('st is', st);
				var ti=-1;
				for (let teami = 0; teami < 5; teami++) {
					tx += "<tr>";
					for (let divi of [2,0,1]) {
						ti = divi*5+teami + 15*ileague;
						tx += "<td class='standingsteamnametd'>" + st.standing[ti].first_name + "</td>";
						tx += "<td>" + st.standing[ti].won + "</td>";
						tx += "<td>" + st.standing[ti].lost + "</td>";
						tx += "<td>" + st.standing[ti].games_back + "</td>";
						tx += "<td>" + st.standing[ti].win_percentage + "</td>";
						tx += "<td ";
						if (parseInt(st.standing[ti].point_differential)>0) {tx+="class='positiverundifferential'"} else if (parseInt(st.standing[ti].point_differential)<0) {tx+="class='negativerundifferential'"}
						tx += ">" + st.standing[ti].point_differential + "</td>";
						tx += "<td ";
						if (st.standing[ti].streak[0]=="W") {tx+="class='positiverundifferential'"} else if (st.standing[ti].streak[0]=="L") {tx+="class='negativerundifferential'"}
						tx +=">" + st.standing[ti].streak + "</td>";
						tx += "<td ";
						if (parseInt(st.standing[ti].last_ten.split('-')[0])>5) {tx+="class='positiverundifferential'"} else if (parseInt(st.standing[ti].last_ten.split('-')[0])<5) {tx+="class='negativerundifferential'"}
						tx += ">" + st.standing[ti].last_ten + "</td>";
					}
					tx += "</tr>";
				}
			
		}
		tx += "</table>";
		document.getElementById("standingsdiv").innerHTML = tx;
		return tx;
	});
}

function getStreamLink(gpk, away_name_abbrev, home_name_abbrev) {
	// console.log('stream link in', gpk, away_name_abbrev, home_name_abbrev);
	// Give stream link for given game_pk depending on choice of stream service
	// Default is MLB.tv
	var link = "https://www.mlb.com/tv/g" + gpk;
	var stream_service_to_use = "MLB.tv";
	
  //console.log("link here:", home_name_abbrev, away_name_abbrev);
  //console.log("http://www.worldcupfootball.me/mlb/" + team_abbr_to_namelowerhyphen[home_name_abbrev] + "-live-stream");
	if ((stream_service && stream_service == "sportsme") || 
		(stream_service_exceptions[away_name_abbrev] && stream_service_exceptions[away_name_abbrev]=="sportsme") || 
		(stream_service_exceptions[home_name_abbrev] && stream_service_exceptions[home_name_abbrev]=="sportsme")) {
    //console.log("link here:", home_name_abbrev, away_name_abbrev);
		//link = "http://www.worldcupfootball.me/mlb/" + gpk + "/h";
    link = "http://www.worldcupfootball.me/mlb/" + team_abbr_to_namelowerhyphen[home_name_abbrev] + "-live-stream";
	}
	// if (stream_service && stream_service == "sportsme") {
		// link = "http://www.worldcupfootball.me/mlb/" + gpk + "/h";
	// }
	// console.log("Returning stream link", link);
	return link;
}

// This doesn't work on day of game. Could use for whole season though.
function get_player_stats_for_season(id, year_, month_, day_) {
	const mmddyyyy = month_ + "/" + day_ + "/" + year_;
	const url = "https://statsapi.mlb.com/api/v1/people/" + id + "/stats?stats=byDateRange&season="+year_+"&group=hitting&startDate=" + mmddyyyy+ "&endDate="+mmddyyyy+"&leagueListId=mlb";
	console.log('url is', url);
	return get_JSON_as_object(url)
	.then(tx => {
		console.log('tx is', tx);
		if (tx.stats.length ===0 ) {
			return null;
		}
		const stat = tx.stats[0].splits[0].stat;
		// stat.atBats, baseOnBalls, caughtStealing, hits, leftOnBase, plateAppearances, rbi, runs, stolenBases, strikeOuts, doubles, triples, homeRuns
		// return stat;
		return 123;
	});
}

function get_player_stats_for_day() {
	// var tx = ""; //"<table>";
	// var counter = 0;
	var promises = [];
	var tbatting = []; // use array. Using object with id as key was bad for double headers
	var tpitching = [];
	master_scoreboard_JSON.data.games.game.forEach(game => {
		// game_data_directory: "/components/game/mlb/year_2019/month_04/day_12/gid_2019_04_12_anamlb_chnmlb_1"
		const url = "https://gd2.mlb.com" + game.game_data_directory + "/boxscore.json";
		promises.push(
			get_JSON_as_object(url)
			.then(bs => {
				// console.log(url, bs);
				([0,1]).forEach(home_or_away_01 => {
					// Check batters
					if (bs.data.boxscore && bs.data.boxscore.batting[home_or_away_01] && bs.data.boxscore.batting[home_or_away_01].batter) {
						bs.data.boxscore.batting[home_or_away_01].batter.forEach(bat => {
							if (favBattersIds.includes(bat.id)) {
								// console.log("Found favbat", bat);
								// tx += get_boxscore_row_for_batter(bat);
								// tbatting[bat.id] = bat;
								tbatting.push(bat);
							}
						})
					}
					// Check pitchers
					if (bs.data.boxscore && bs.data.boxscore.pitching[home_or_away_01] && bs.data.boxscore.pitching[home_or_away_01].pitcher) {
						let pitcher_array;
						if (Array.isArray(bs.data.boxscore.pitching[home_or_away_01].pitcher)) {
							pitcher_array = bs.data.boxscore.pitching[home_or_away_01].pitcher;
						} else {
							pitcher_array = [bs.data.boxscore.pitching[home_or_away_01].pitcher];
						}
						// console.log("Is this object/array?", bs.data.boxscore.pitching[home_or_away_01].pitcher);
						// bs.data.boxscore.pitching[home_or_away_01].pitcher.forEach(bat => {
						pitcher_array.forEach(bat => {
							// console.log("Pitcher id is", bat.id);
							if (favBattersIds.includes(bat.id)) {
								console.log("Found favpitcher!!!!!!", bat);
								tpitching.push(bat);
							}
						})
					}
				})
				return true;
			})
		)
	});
	return Promise.all(promises).then(x => {
		console.log("finished all promises", tbatting, tpitching);
		// return {batting:tbatting, pitching:tpitching};
		return new Promise((resolve, reject) => {resolve({batting:tbatting, pitching:tpitching})});
		});
}


// function make_fav_hitters_table_old() {
	// return get_player_stats_for_day()
	// .then(x => {
		// var tx = "";
		// tx += "<p>You will receive notifications when the following players are up to bat</p>";
		// tx +=  "Stats for " + month + "/" + day + "/" + year;

		// tx += "<table class='fullboxscoretables'><tr>";
		// tx += '<th class="fullboxscoretd" colspan=2>Name</td>';
		// tx += '<th class="fullboxscoretd">' + 'POS' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'H' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'AB' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'BB' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'SO' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'HR' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'RBI' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'R' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'SB' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'AVG' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'OBP' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'OPS' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'HR' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'RBI' + '</th>';
		// tx += "</tr>";
		// tx += x + "</table>";
		
		// // Players not found
		// tx += "<p>Have not played today</p>";
		// console.log('x is', x);
		// return tx;
	// })
	// .then(x => {document.getElementById("favhittersdiv").innerHTML = x; return x;})
// }

// function make_fav_hitters_table() {
	// if (document.getElementById('favhittersdiv').innerHTML == "Not loaded yet") {
		// document.getElementById("favhittersdiv").innerHTML = "Loading... takes 5-10 seconds...";
	// } else {
		// document.getElementById("favhittersdiv").innerHTML = "<div>Loading... takes 5-10 seconds...\</div>" + document.getElementById("favhittersdiv").innerHTML;
	// }
	// return get_player_stats_for_day()
	// .then(batters => {
		// // console.log('tobj is ', batters);
		// var tx = "";
		// tx += "<div style='margin-top:20px;'>You will get notifications when these players are ondeck/batting:";
			// tx += "<button type='button' id='favBattersTabTurnOff' onclick='use_favBatters=false;use_notifications=false;update_favBattersdiv()'>Turn off</button>";
			// tx += "<button type='button' id='favBattersTabTurnOn' onclick='use_favBatters=true;update_favBattersdiv()'>Turn on</button></div>";
		// if (document.getElementById("selectreload").value == "never") {
			// tx += "<div><strong>Turn on refresh rate (&#x21bb;) at top of page for this to be useful!</strong></div>";
		// }
		// tx +=  "Stats for " + month + "/" + day + "/" + year;

		// tx += "<table class='fullboxscoretables'><tr>";
		// tx += '<th class="fullboxscoretd" colspan=1>Name</td>';
		// tx += '<th class="fullboxscoretd">' + 'POS' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'H' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'AB' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'BB' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'SO' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'HR' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'RBI' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'R' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'SB' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'AVG' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'OBP' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'OPS' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'HR' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'RBI' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'Favorites' + '</th>';
		// tx += '<th class="fullboxscoretd">' + 'Notifications' + '</th>';
		// tx += "</tr>";
		
		// // Loop over each batter
		// for (let batid in batters) {
			// let batteri = batters[batid];
			// tx += '<td class="fullboxscoretd"><a class="playernamelink" target="_blank" href="http://m.mlb.com/gameday/player/'+ batteri.id +'"><div style="text-align:left;" >';
			// if (batteri.bo.substr(1,2) != "00") {tx += "- ";}
			// tx += batteri.name_display_first_last + '</div></a></td>';
			// tx += '<td class="fullboxscoretd">' + batteri.pos + '</td>';
			// tx += '<td class="fullboxscoretd">' + batteri.h + '</td>';
			// tx += '<td class="fullboxscoretd">' + batteri.ab + '</td>';
			// tx += '<td class="fullboxscoretd">' + if_not_zero(batteri.bb) + '</td>';
			// tx += '<td class="fullboxscoretd">' + if_not_zero(batteri.so) + '</td>';
			// tx += '<td class="fullboxscoretd">' + if_not_zero(batteri.hr) + '</td>';
			// tx += '<td class="fullboxscoretd">' + if_not_zero(batteri.rbi) + '</td>';
			// tx += '<td class="fullboxscoretd">' + if_not_zero(batteri.r) + '</td>';
			// if (batteri.sb == "0" && batteri.cs == "0") {
				// tx += '<td class="fullboxscoretd">' + "" + '</td>';
			// } else {
				// tx += '<td class="fullboxscoretd">' + batteri.sb + "/" + (parseInt(batteri.cs) + parseInt(batteri.sb)) + '</td>';
			// }
			// tx += '<td class="fullboxscoretd">' + batteri.avg + '</td>';
			// tx += '<td class="fullboxscoretd">' + batteri.obp + '</td>';
			// tx += '<td class="fullboxscoretd">' + batteri.ops + '</td>';
			// tx += '<td class="fullboxscoretd">' + batteri.s_hr + '</td>';
			// tx += '<td class="fullboxscoretd">' + batteri.s_rbi + '</td>';
			// // Option to add to favorite batters (or remove)
			// // if (use_favBatters) {
			// // Favorites checkbox
			// tx += "<td  class='fullboxscoretd' ";
			// tx += "><input type='checkbox' checked onclick='removeFavoriteBatter(\"" + batteri.id + "\",\"" + batteri.name_display_first_last + "\", this);";
			// tx += "'></td>";
	
			// // Notifications checkbox
			// if (!(batteri.id in favBattersUseNotifications) || favBattersUseNotifications[batteri.id]) {
				// tx += "<td  class='fullboxscoretd' ";
				// tx += "><input type='checkbox' checked onclick='removeFavoriteBatterNotification(\"" + batteri.id + "\",\"" + batteri.name_display_first_last + "\", this);";
				// tx += "'></td>";
			// } else {
				// // console.log("id no notif", batteri.id);
				
				// tx += "<td  class='fullboxscoretd' ";
				// tx += "><input type='checkbox'  onclick='addFavoriteBatterNotification(\"" + batteri.id + "\",\"" + batteri.name_display_first_last + "\", this);";
				// tx += "'></td>";
			// }
			// // } else {
				// // tx += "<td></td>";
			// // }
			// tx += '</tr>';
		// }
		
		
		// tx += "</table>";
		
		// // Players not found in today's games, haven't played today
		// var notplayedtoday = favBattersIds.filter(x => !Object.keys(batters).includes(x));
		// if (notplayedtoday.length > 0) {
			// tx += "<p>Have not played today</p>";
			// // tx += JSON.stringify(notplayedtoday);
			// tx += '<table><tr><th class="fullboxscoretd" >Name</th><th class="fullboxscoretd">Favorites</th><th class="fullboxscoretd">Notifications</th></tr>';
			// for (let batteri of favBatters) {
				// if (notplayedtoday.includes(batteri.id)) {
					// tx += "<tr><td class='fullboxscoretd'>"+batteri.name_display_first_last+"</td>";
				
					// // Favorites checkbox
					// tx += "<td  class='fullboxscoretd' style='text-align:center' ";
					// tx += "><input type='checkbox' checked onclick='removeFavoriteBatter(\"" + batteri.id + "\",\"" + batteri.name_display_first_last + "\", this);";
					// tx += "'></td>";
					
					// // Notifications checkbox
					// if (!(batteri.id in favBattersUseNotifications) || favBattersUseNotifications[batteri.id]) {
						// tx += "<td  class='fullboxscoretd' style='text-align:center' ";
						// tx += "><input type='checkbox' checked onclick='removeFavoriteBatterNotification(\"" + batteri.id + "\",\"" + batteri.name_display_first_last + "\", this);";
						// tx += "'></td>";
					// } else {
						// tx += "<td  class='fullboxscoretd' style='text-align:center' ";
						// tx += "><input type='checkbox'  onclick='addFavoriteBatterNotification(\"" + batteri.id + "\",\"" + batteri.name_display_first_last + "\", this);";
						// tx += "'></td>";
					// }
					// tx += "</tr>";
				// }
			// }
			// tx += "</table>";
		// }
		// // console.log('x is', x);
		
		// document.getElementById("favhittersdiv").innerHTML = tx;
		
		// if (use_favBatters) {
			// document.getElementById('favBattersTabTurnOff').classList.toggle("favBattersButtonSelected");
		// } else {
			// document.getElementById('favBattersTabTurnOn').classList.toggle("favBattersButtonSelected");
		// }
		
		// return tx;
	// })
	// // .then(x => {document.getElementById("favhittersdiv").innerHTML = x; return x;})
	// .catch(er => {console.log("Couldn't get fav batters", er);document.getElementById("favhittersdiv").innerHTML = "Error loading"; return er;});
// }

function do_fav_hitters_table() {
	// First do fast version, no stats
	// document.getElementById("favhittersdiv").innerHTML = "<p>Loading... takes up to 10 seconds...</p>" + get_fav_hitters_table(true);
	get_fav_hitters_table(true)
	.then(tx => {
		document.getElementById("favhittersdiv").innerHTML = "<p style='font-size:2em'>Loading... takes up to 10 seconds...</p>" + tx.batters;
		document.getElementById("favpitchersdiv").innerHTML = "<p style='font-size:2em'>Loading... takes up to 10 seconds...</p>" + tx.pitchers;
	})
	// Then do stats version, takes longer
	get_fav_hitters_table(false)
	.then(tx => {
		document.getElementById("favhittersdiv").innerHTML = tx.batters;
		document.getElementById("favpitchersdiv").innerHTML = tx.pitchers;
	});
	// document.getElementById("favhittersdiv").innerHTML = get_fav_hitters_table(false);
}

function favBattersButtonClicked(turn_on = true) {
	console.log("favBattersButtonClicked just now!", turn_on);
	// Remove selected button
	var buttons = document.getElementsByClassName('favBattersButton');
	for (let i=0; i< buttons.length; i++) {buttons[i].classList.remove("favBattersButtonSelected")}
	if (turn_on) {
		// remove class selected from all, then add to the on button, 
		use_favBatters=true;use_notifications=true;		
		var buttons = document.getElementsByClassName('favBattersButtonOn');
		for (let i=0; i< buttons.length; i++) {buttons[i].classList.toggle("favBattersButtonSelected");buttons[i].innerHTML="Currently on";}
		var buttons = document.getElementsByClassName('favBattersButtonOff');
		for (let i=0; i< buttons.length; i++) {buttons[i].classList.toggle("favBattersButtonNotSelected");buttons[i].innerHTML="Turn off!";}
	} else { // turn off
		use_favBatters=false;use_notifications=false;
		var buttons = document.getElementsByClassName('favBattersButtonOff');
		for (let i=0; i< buttons.length; i++) {buttons[i].classList.toggle("favBattersButtonSelected");buttons[i].innerHTML="Currently off";}
		var buttons = document.getElementsByClassName('favBattersButtonOn');
		for (let i=0; i< buttons.length; i++) {buttons[i].classList.toggle("favBattersButtonNotSelected");buttons[i].innerHTML="Turn on!";}
	}
}

function get_fav_hitters_table(fast_version=false) {
	// if (document.getElementById('favhittersdiv').innerHTML == "Not loaded yet") {
		// document.getElementById("favhittersdiv").innerHTML = "Loading... takes 5-10 seconds...";
	// } else {
		// document.getElementById("favhittersdiv").innerHTML = "<div>Loading... takes 5-10 seconds...\</div>" + document.getElementById("favhittersdiv").innerHTML;
	// }
	// If no favBatters, tell them to make some
	if (favBattersIds.length == 0) {
		var tx = "<p>You have not selected any favorite batters yet.</p>";
		tx += "</p>Find your favorite batters' names in a boxscore and check the box next to their name to add them to your favorite batters.</p>";
		tx += "</p>Then you will be able to receive notifications when they are on deck with a link to their game on MLB.tv.</p>";
		return new Promise((resolve, reject) => {resolve(tx)});
	}
	var batterspitchers;
	if (fast_version) {
		// batters = [];
		console.log("Doing fast version, don't worry");
		// batterspitchers = new Promise((resolve, reject) => {resolve([])});
		batterspitchers = new Promise((resolve, reject) => {resolve({batting:[], pitching:[]})});
	} else {
		batterspitchers = get_player_stats_for_day()
         		  .catch(er => {
					  console.log("Couldn't get fav batterspitchers", er);
					  // document.getElementById("favhittersdiv").innerHTML = "Error loading";
					  return er;
					  });
	}
	return batterspitchers.then(batters_and_pitchers => {
		console.log("Have batterspitchers, it is", batters_and_pitchers);
		let batters = batters_and_pitchers.batting;
		console.log("Batters is", batters);
		let pitchers =batters_and_pitchers.pitching;
		console.log("Pitchers is", pitchers);
		// console.log('tobj is ', batters);
		var tx = "";
		tx += "<div style='margin-top:20px;'>You will get notifications when these players are ondeck/batting:";
			tx += "<button type='button' class='favBattersButton favBattersButtonOn  favBattersTabTurnOff  ";
			if (use_favBatters) {tx += "favBattersButtonSelected"}
			tx +="' id='favBattersTabTurnOff' onclick='favBattersButtonClicked(true)'>"; //Turn on
			if (!use_favBatters) {tx += "Turn on!"} else {tx += "Currently on";}
			tx += "</button>";
			tx += "<button type='button' class='favBattersButton favBattersButtonOff favBattersTabTurnOn   ";
			if (!use_favBatters) {tx += "favBattersButtonSelected"}
			tx += "'  id='favBattersTabTurnOn'  onclick='favBattersButtonClicked(false)'>"; //Turn off
			if (use_favBatters) {tx += "Turn off!"} else {tx += "Currently off";}
			tx += "</button></div>";
		if (document.getElementById("selectreload").value == "never") {
			tx += "<div><strong>Turn on refresh rate (&#x21bb;) at top of page for this to be useful!</strong></div>";
		}
		
		// do full stats for players that have them
		if (!fast_version) {
			// console.log("Will it do this?", batters);
			tx +=  "Stats for " + month + "/" + day + "/" + year;

			tx += "<table class='fullboxscoretables'><tr>";
			tx += '<th class="fullboxscoretd" colspan=1>Name</td>';
			tx += '<th class="fullboxscoretd">' + 'POS' + '</th>';
			tx += '<th class="fullboxscoretd">' + 'H' + '</th>';
			tx += '<th class="fullboxscoretd">' + 'AB' + '</th>';
			tx += '<th class="fullboxscoretd">' + 'BB' + '</th>';
			tx += '<th class="fullboxscoretd">' + 'SO' + '</th>';
			tx += '<th class="fullboxscoretd">' + 'HR' + '</th>';
			tx += '<th class="fullboxscoretd">' + 'RBI' + '</th>';
			tx += '<th class="fullboxscoretd">' + 'R' + '</th>';
			tx += '<th class="fullboxscoretd">' + 'SB' + '</th>';
			tx += '<th class="fullboxscoretd">' + 'AVG' + '</th>';
			tx += '<th class="fullboxscoretd">' + 'OBP' + '</th>';
			tx += '<th class="fullboxscoretd">' + 'OPS' + '</th>';
			tx += '<th class="fullboxscoretd">' + 'HR' + '</th>';
			tx += '<th class="fullboxscoretd">' + 'RBI' + '</th>';
			tx += '<th class="fullboxscoretd">' + 'Favorites' + '</th>';
			tx += '<th class="fullboxscoretd">' + 'Notifications' + '</th>';
			tx += "</tr>";
			
			// Sort them to be alphabetical
			// let battersarray = []
			// for (let batid in batters) {battersarray.push(batters[batid]);}
			// battersarray.sort((a,b) => a.name_display_first_last.localeCompare(b.name_display_first_last));
			batters.sort((a,b) => a.name_display_first_last.localeCompare(b.name_display_first_last));
			
			// Loop over each batter
			// for (let batid in batters) {
				// let batteri = batters[batid];
			// Now using the sorted array
			for(let batteri of batters) {
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
				tx += '<td class="fullboxscoretd">' + if_not_zero(batteri.r) + '</td>';
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
				// Option to add to favorite batters (or remove)
				// if (use_favBatters) {
				// Favorites checkbox
				tx += "<td  class='fullboxscoretd' ";
				tx += "><input type='checkbox' checked onclick='removeFavoriteBatter(\"" + batteri.id + "\",\"" + batteri.name_display_first_last + "\", this);";
				tx += "'></td>";

				// Notifications checkbox
				if (!(batteri.id in favBattersUseNotifications) || favBattersUseNotifications[batteri.id]) {
					tx += "<td  class='fullboxscoretd' ";
					tx += "><input type='checkbox' checked onclick='removeFavoriteBatterNotification(\"" + batteri.id + "\",\"" + batteri.name_display_first_last + "\", this);";
					tx += "'></td>";
				} else {
					// console.log("id no notif", batteri.id);
					
					tx += "<td  class='fullboxscoretd' ";
					tx += "><input type='checkbox'  onclick='addFavoriteBatterNotification(\"" + batteri.id + "\",\"" + batteri.name_display_first_last + "\", this);";
					tx += "'></td>";
				}
				// } else {
					// tx += "<td></td>";
				// }
				tx += '</tr>';
			}
			
			
			tx += "</table>";
		}
		
		// Players not found in today's games, haven't played today. Or if using fast_version
		let batterids_found = [];
		for (let batteri of batters) {batterids_found.push(batteri.id);}
		// var notplayedtoday = favBattersIds.filter(x => !Object.keys(batters).includes(x));
		var notplayedtoday = favBattersIds.filter(x => !batterids_found.includes(x));
		if (notplayedtoday.length > 0) {
			if (!fast_version) {
				tx += "<p>Have not played today</p>";
			}
			tx += '<table><tr><th class="fullboxscoretd" >Name</th><th class="fullboxscoretd">Favorites</th><th class="fullboxscoretd">Notifications</th></tr>';
			
			var favBattersSorted = $.extend(true, [], favBatters) // deep copy
			favBattersSorted.sort((a,b) => a.name_display_first_last.localeCompare(b.name_display_first_last)); // sort them
			for (let batteri of favBattersSorted) {
				if (notplayedtoday.includes(batteri.id)) {
					tx += "<tr><td class='fullboxscoretd'>"+batteri.name_display_first_last+"</td>";
				
					// Favorites checkbox
					tx += "<td  class='fullboxscoretd' style='text-align:center' ";
					tx += "><input type='checkbox' checked onclick='removeFavoriteBatter(\"" + batteri.id + "\",\"" + batteri.name_display_first_last + "\", this);";
					tx += "'></td>";
					
					// Notifications checkbox
					if (!(batteri.id in favBattersUseNotifications) || favBattersUseNotifications[batteri.id]) {
						tx += "<td  class='fullboxscoretd' style='text-align:center' ";
						tx += "><input type='checkbox' checked onclick='removeFavoriteBatterNotification(\"" + batteri.id + "\",\"" + batteri.name_display_first_last + "\", this);";
						tx += "'></td>";
					} else {
						tx += "<td  class='fullboxscoretd' style='text-align:center' ";
						tx += "><input type='checkbox'  onclick='addFavoriteBatterNotification(\"" + batteri.id + "\",\"" + batteri.name_display_first_last + "\", this);";
						tx += "'></td>";
					}
					tx += "</tr>";
				}
			}
			tx += "</table>";
		}
		// console.log('x is', x);
		
		// document.getElementById("favhittersdiv").innerHTML = tx;
		
		// if (use_favBatters) {
			// document.getElementById('favBattersTabTurnOff').classList.toggle("favBattersButtonSelected");
		// } else {
			// document.getElementById('favBattersTabTurnOn').classList.toggle("favBattersButtonSelected");
		// }
		
		let tx_pitchers = get_fav_pitchers_text_from_array(pitchers);
		
		// return tx;
		return {batters:tx, pitchers:tx_pitchers};
	})
}

function get_fav_pitchers_text_from_array(pitchers) {
	let fast_version = false;
	var tx = "";
	// tx += "<div style='margin-top:20px;'>You will get notifications when these players are ondeck/batting:";
		// tx += "<button type='button' class='favBattersButton favBattersButtonOn  favBattersTabTurnOff  ";
		// if (use_favBatters) {tx += "favBattersButtonSelected"}
		// tx +="' id='favBattersTabTurnOff' onclick='favBattersButtonClicked(true)'>"; //Turn on
		// if (!use_favBatters) {tx += "Turn on!"} else {tx += "Currently on";}
		// tx += "</button>";
		// tx += "<button type='button' class='favBattersButton favBattersButtonOff favBattersTabTurnOn   ";
		// if (!use_favBatters) {tx += "favBattersButtonSelected"}
		// tx += "'  id='favBattersTabTurnOn'  onclick='favBattersButtonClicked(false)'>"; //Turn off
		// if (use_favBatters) {tx += "Turn off!"} else {tx += "Currently off";}
		// tx += "</button></div>";
	// if (document.getElementById("selectreload").value == "never") {
		// tx += "<div><strong>Turn on refresh rate (&#x21bb;) at top of page for this to be useful!</strong></div>";
	// }
	tx += "<div>No notifications for pitchers</div>";
	
	// do full stats for players that have them
	if (!fast_version) {
		// console.log("Will it do this?", batters);
		tx +=  "Stats for " + month + "/" + day + "/" + year;

		tx += "<table class='fullboxscoretables'><tr>";
		tx += '<th class="fullboxscoretd" colspan=1>Name</td>';
		
		tx += '<th class="fullboxscoretd">' + 'POS' + '</th>';
		tx += '<th class="fullboxscoretd">' + 'INN' + '</th>';
		tx += '<th class="fullboxscoretd">' + 'ER' + '</th>';
		tx += '<th class="fullboxscoretd">' + 'R' + '</th>';
		tx += '<th class="fullboxscoretd">' + 'H' + '</th>';
		tx += '<th class="fullboxscoretd">' + 'BB' + '</th>';
		tx += '<th class="fullboxscoretd">' + 'SO' + '</th>';
		tx += '<th class="fullboxscoretd">' + 'HR' + '</th>';
		tx += '<th class="fullboxscoretd">' + 'NP' + '</th>';
		tx += '<th class="fullboxscoretd">' + 'W-L' + '</th>';
		tx += '<th class="fullboxscoretd">' + 'SV' + '</th>';
		tx += '<th class="fullboxscoretd">' + 'ERA' + '</th>';
		tx += '<th class="fullboxscoretd">' + 'Favorites' + '</th>';
		tx += '<th class="fullboxscoretd">' + 'Notifications' + '</th>';
		tx += "</tr>";
		
		// Sort them to be alphabetical
		// let battersarray = []
		// for (let batid in batters) {battersarray.push(batters[batid]);}
		// battersarray.sort((a,b) => a.name_display_first_last.localeCompare(b.name_display_first_last));
		pitchers.sort((a,b) => a.name_display_first_last.localeCompare(b.name_display_first_last));
		
		// Loop over each batter
		// for (let batid in batters) {
			// let batteri = batters[batid];
		// Now using the sorted array
		for(let pitcheri of pitchers) {
			// tx += '<td class="fullboxscoretd"><a class="playernamelink" target="_blank" href="http://m.mlb.com/gameday/player/'+ pitcheri.id +'"><div style="text-align:left;" >';
			// console.log(pitcheri);
			// if (pitcheri.bo.substr(1,2) != "00") {tx += "- ";}
			// tx += pitcheri.name_display_first_last + '</div></a></td>';
			
			tx += '<td class="fullboxscoretd"><a class="playernamelink" target="_blank" href="http://m.mlb.com/gameday/player/'+ pitcheri.id +'"><div style="text-align:left;" >';
			// if (pitcheri.bo.substr(1,2) != "00") {tx += "- ";}
			tx += pitcheri.name_display_first_last;
			if (pitcheri.win) {tx += " (W)"}
			if (pitcheri.loss) {tx += " (L)"}
			if (pitcheri.save) {tx += " (S)"}
			tx += '</div></a></td>';
			tx += '<td class="fullboxscoretd">' + pitcheri.pos + '</td>';
			tx += '<td class="fullboxscoretd">' + Math.floor(pitcheri.out / 3) + "." + (pitcheri.out % 3) + '</td>';
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
					
			// Option to add to favorite batters (or remove)
			// if (use_favBatters) {
			// Favorites checkbox
			tx += "<td  class='fullboxscoretd' ";
			tx += "><input type='checkbox' checked onclick='removeFavoriteBatter(\"" + pitcheri.id + "\",\"" + pitcheri.name_display_first_last + "\", this);";
			tx += "'></td>";

			// Notifications checkbox
			if (!(pitcheri.id in favBattersUseNotifications) || favBattersUseNotifications[pitcheri.id]) {
				tx += "<td  class='fullboxscoretd' ";
				tx += "><input type='checkbox' checked onclick='removeFavoriteBatterNotification(\"" + pitcheri.id + "\",\"" + pitcheri.name_display_first_last + "\", this);";
				tx += "'></td>";
			} else {
				// console.log("id no notif", pitcheri.id);
				
				tx += "<td  class='fullboxscoretd' ";
				tx += "><input type='checkbox'  onclick='addFavoriteBatterNotification(\"" + pitcheri.id + "\",\"" + pitcheri.name_display_first_last + "\", this);";
				tx += "'></td>";
			}
			// } else {
				// tx += "<td></td>";
			// }
			tx += '</tr>';
		}
		
		
		tx += "</table>";
	}
	
	// Players not found in today's games, haven't played today. Or if using fast_version
	let batterids_found = [];
	for (let batteri of pitchers) {batterids_found.push(batteri.id);}
	var notplayedtoday = favBattersIds.filter(x => !batterids_found.includes(x));
	if (notplayedtoday.length > 0) {
		if (!fast_version) {
			tx += "<p>Have not pitched today</p>";
		}
		tx += '<table><tr><th class="fullboxscoretd" >Name</th><th class="fullboxscoretd">Favorites</th><th class="fullboxscoretd">Notifications</th></tr>';
		
		var favBattersSorted = $.extend(true, [], favBatters) // deep copy
		favBattersSorted.sort((a,b) => a.name_display_first_last.localeCompare(b.name_display_first_last)); // sort them
		for (let batteri of favBattersSorted) {
			if (notplayedtoday.includes(batteri.id)) {
				tx += "<tr><td class='fullboxscoretd'>"+batteri.name_display_first_last+"</td>";
			
				// Favorites checkbox
				tx += "<td  class='fullboxscoretd' style='text-align:center' ";
				tx += "><input type='checkbox' checked onclick='removeFavoriteBatter(\"" + batteri.id + "\",\"" + batteri.name_display_first_last + "\", this);";
				tx += "'></td>";
				
				// Notifications checkbox
				if (!(batteri.id in favBattersUseNotifications) || favBattersUseNotifications[batteri.id]) {
					tx += "<td  class='fullboxscoretd' style='text-align:center' ";
					tx += "><input type='checkbox' checked onclick='removeFavoriteBatterNotification(\"" + batteri.id + "\",\"" + batteri.name_display_first_last + "\", this);";
					tx += "'></td>";
				} else {
					tx += "<td  class='fullboxscoretd' style='text-align:center' ";
					tx += "><input type='checkbox'  onclick='addFavoriteBatterNotification(\"" + batteri.id + "\",\"" + batteri.name_display_first_last + "\", this);";
					tx += "'></td>";
				}
				tx += "</tr>";
			}
		}
		tx += "</table>";
	}
	return tx;
}



// From here: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
function hashCode(s) {
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
}
function add_highlight_to_already_seen(url) {
	console.log("Adding highlight", url);
	// Not sure hash is necessary, but I don't want to save a lot of text
	var hashCode_url = hashCode(url);
	if (!highlight_videos_already_seen.includes(hashCode_url)) {
		highlight_videos_already_seen.push(hashCode_url);
	}
}
function highlight_videos_already_seen_includes(url) {
	// Put this in a function because of hashCode
	return highlight_videos_already_seen.includes(hashCode(url));
}
function make_live_tab(tg, ge) {
	// tg is this game from master scoreboard, ge is game events
	var tx = "";
	//console.log('thisgame is', tg);
	thisgame = tg;
	
	tx += "<div>Pitcher: "+tg.pitcher.first+" "+tg.pitcher.last+tg.pitcher.wins+'-'+tg.pitcher.losses+' '+tg.pitcher.era+"</div>";
	tx += "<div>Batter: "+tg.batter.first+" "+tg.batter.last+" "+tg.batter.avg+"/"+tg.batter.obp+"/"+tg.batter.ops+", "+tg.batter.hr+"/"+tg.batter.rbi+"</div>";
	tx += "<div>On deck: "+tg.ondeck.first+" "+tg.ondeck.last+"</div>";
	tx += "<div>"+tg.pbp.last+"</div>";
	if (tg.runners_on_base.runner_on_1b) {
		tx += "<div>On first: "+tg.runners_on_base.runner_on_1b.first+' '+tg.runners_on_base.runner_on_1b.last+"</div>";
	}
	if (tg.runners_on_base.runner_on_2b) {
		tx += "<div>On second: "+tg.runners_on_base.runner_on_2b.first+' '+tg.runners_on_base.runner_on_2b.last+"</div>";
	}
	if (tg.runners_on_base.runner_on_3b) {
		tx += "<div>On third: "+tg.runners_on_base.runner_on_3b.first+' '+tg.runners_on_base.runner_on_3b.last+"</div>";
	}
	tx += "<div>"+"</div>";
	tx += "<div>"+"</div>";
	tx += "<div>"+"</div>";
	let latestinning = ge.data.game.inning[ge.data.game.inning.length - 1];
	let latesthalfinning;
	if (latestinning.bottom) {latesthalfinning = latestinning.bottom} else {latesthalfinning = latestinning.top}
	let latestatbat = latesthalfinning.atbat[latesthalfinning.atbat.length-1];
	if (latestatbat.pitch) {
		for (let pitch of latestatbat.pitch) {
			
			tx += "<div>Pitch: " + pitch.des+"</div>";
		}
	}
	
	
	document.getElementById("livediv").innerHTML = tx;
}

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
	 
	 
	 window.location.href = '/?date=' + year + month + day + '&team=' + team ;
}






function parseXml(xml, arrayTags)
{
    var dom = null;
    if (window.DOMParser)
    {
        dom = (new DOMParser()).parseFromString(xml, "text/xml");
    }
    else if (window.ActiveXObject)
    {
        dom = new ActiveXObject('Microsoft.XMLDOM');
        dom.async = false;
        if (!dom.loadXML(xml))
        {
            throw dom.parseError.reason + " " + dom.parseError.srcText;
        }
    }
    else
    {
        throw "cannot parse xml string!";
    }

    function isArray(o)
    {
        return Object.prototype.toString.apply(o) === '[object Array]';
    }

    function parseNode(xmlNode, result)
    {
        if (xmlNode.nodeName == "#text") {
            var v = xmlNode.nodeValue;
            if (v.trim()) {
               result['#text'] = v;
            }
            return;
        }

        var jsonNode = {};
        var existing = result[xmlNode.nodeName];
        if(existing)
        {
            if(!isArray(existing))
            {
                result[xmlNode.nodeName] = [existing, jsonNode];
            }
            else
            {
                result[xmlNode.nodeName].push(jsonNode);
            }
        }
        else
        {
            if(arrayTags && arrayTags.indexOf(xmlNode.nodeName) != -1)
            {
                result[xmlNode.nodeName] = [jsonNode];
            }
            else
            {
                result[xmlNode.nodeName] = jsonNode;
            }
        }

        if(xmlNode.attributes)
        {
            var length = xmlNode.attributes.length;
            for(var i = 0; i < length; i++)
            {
                var attribute = xmlNode.attributes[i];
                jsonNode[attribute.nodeName] = attribute.nodeValue;
            }
        }

        var length = xmlNode.childNodes.length;
        for(var i = 0; i < length; i++)
        {
            parseNode(xmlNode.childNodes[i], jsonNode);
        }
    }

    var result = {};
    for (let i = 0; i < dom.childNodes.length; i++)
    {
        parseNode(dom.childNodes[i], result);
    }

    return result;
}

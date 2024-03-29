var purpose_dt="";

 // Array of max days in month in a year and in a leap year
monthMaxDays	= [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
monthMaxDaysLeap= [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
hideSelectTags = [];

function getRealYear(dateObj)
{
	return (dateObj.getYear() % 100) + (((dateObj.getYear() % 100) < 39) ? 2000 : 1900);
}

function getDaysPerMonth(month, year)
{
	/* 
	Check for leap year. These are some conditions to check year is leap year or not...
	1.Years evenly divisible by four are normally leap years, except for... 
	2.Years also evenly divisible by 100 are not leap years, except for... 
	3.Years also evenly divisible by 400 are leap years. 
	*/
	if ((year % 4) == 0)
	{
		if ((year % 100) == 0 && (year % 400) != 0)
			return monthMaxDays[month];
	
		return monthMaxDaysLeap[month];
	}
	else
		return monthMaxDays[month];
}

function createCalender(year, month, day)
{
	 // current Date
	var curDate = new Date();
	var curDay = curDate.getDate();
	var curMonth = curDate.getMonth();
	var curYear = getRealYear(curDate)

	 // if a date already exists, we calculate some values here
	if (!year)
	{
		var year = curYear;
		var month = curMonth;
	}

	var yearFound = 0;
	for (var i=0; i<document.getElementById('selectYear').options.length; i++)
	{
		if (document.getElementById('selectYear').options[i].value == year)
		{
			document.getElementById('selectYear').selectedIndex = i;
			yearFound = true;
			break;
		}
	}
	if (!yearFound)
	{
		document.getElementById('selectYear').selectedIndex = 0;
		year = document.getElementById('selectYear').options[0].value;		
	}
	document.getElementById('selectMonth').selectedIndex = month;

	 // first day of the month.
	var fristDayOfMonthObj = new Date(year, month, 1);
	var firstDayOfMonth = fristDayOfMonthObj.getDay();

	continu		= true;
	firstRow	= true;
	var x	= 0;
	var d	= 0;
	var trs = []
	var ti = 0;
	while (d <= getDaysPerMonth(month, year))
	{
		if (firstRow)
		{
			trs[ti] = document.createElement("TR");
			if (firstDayOfMonth > 0)
			{
				while (x < firstDayOfMonth)
				{
					trs[ti].appendChild(document.createElement("TD"));
					x++;
				}
			}
			firstRow = false;
			var d = 1;
		}
		if (x % 7 == 0)
		{
			ti++;
			trs[ti] = document.createElement("TR");
		}
		if (day && d == day)
		{
			var setID = 'calenderChoosenDay';
			var styleClass = 'choosenDay';
			var setTitle = 'this day is currently selected';
		}
		else if (d == curDay && month == curMonth && year == curYear)
		{
			var setID = 'calenderToDay';
			var styleClass = 'toDay';
			var setTitle = 'this day today';
		}
		else
		{
			var setID = false;
			var styleClass = 'normalDay';
			var setTitle = false;
		}
		var td = document.createElement("TD");
		td.className = styleClass;
		if (setID)
		{
			td.id = setID;
		}
		if (setTitle)
		{
			td.title = setTitle;
		}
		td.onmouseover = new Function('highLiteDay(this)');
		td.onmouseout = new Function('deHighLiteDay(this)');
		if (targetEl)
			td.onclick = new Function('pickDate('+year+', '+month+', '+d+')');
		else
			td.style.cursor = 'default';
		td.appendChild(document.createTextNode(d));
		trs[ti].appendChild(td);
		x++;
		d++;
	}
	return trs;
}

function showCalender(elPos, tgtEl, purpose)
{
    purpose_dt=purpose;

	targetEl = false;

	if (document.getElementById(tgtEl))
	{
		targetEl = document.getElementById(tgtEl);
	}
	else
	{
		if (document.forms[0].elements[tgtEl])
		{
			targetEl = document.forms[0].elements[tgtEl];
		}
	}
	var calTable = document.getElementById('calenderTable');

	var positions = [0,0];
	var positions = getParentOffset(elPos, positions);	
	calTable.style.left = positions[0]+'px';		
	calTable.style.top = positions[1]+'px';			

	calTable.style.display='block';

	var matchDate = new RegExp('^([0-9]{2})-([0-9]{2})-([0-9]{4})$');
	var m = matchDate.exec(targetEl.value);
	if (m == null)
	{
		trs = createCalender(false, false, false);
		showCalenderBody(trs);
	}
	else
	{
		if (m[1].substr(0, 1) == 0)
			m[1] = m[1].substr(1, 1);
		if (m[2].substr(0, 1) == 0)
			m[2] = m[2].substr(1, 1);
		m[2] = m[2] - 1;
		trs = createCalender(m[3], m[2], m[1]);
		showCalenderBody(trs);
	}

	hideSelect(document.body, 1);
}
function showCalenderBody(trs)
{
	var calTBody = document.getElementById('calender');
	while (calTBody.childNodes[0])
	{
		calTBody.removeChild(calTBody.childNodes[0]);
	}
	for (var i in trs)
	{
		calTBody.appendChild(trs[i]);
	}
}
function setYears(sy, ey)
{
	 // current Date  +



	var curDate = new Date();
	var curYear = getRealYear(curDate);
	if (sy)
		startYear = curYear;
	if (ey)
		endYear = curYear;
	document.getElementById('selectYear').options.length = 0;
	var j = 0;
	for (y=ey+30; y>=sy; y--)
	{
		document.getElementById('selectYear')[j++] = new Option(y, y);
	}
}
function hideSelect(el, superTotal)
{
	if (superTotal >= 100)
	{
		return;
	}

	var totalChilds = el.childNodes.length;
	for (var c=0; c<totalChilds; c++)
	{
		var thisTag = el.childNodes[c];
		if (thisTag.tagName == 'SELECT')
		{
			if (thisTag.id != 'selectMonth' && thisTag.id != 'selectYear')
			{
				var calenderEl = document.getElementById('calenderTable');
				var positions = [0,0];
				var positions = getParentOffset(thisTag, positions);	// nieuw
				var thisLeft	= positions[0];
				var thisRight	= positions[0] + thisTag.offsetWidth;
				var thisTop	= positions[1];
				var thisBottom	= positions[1] + thisTag.offsetHeight;
				var calLeft	= calenderEl.offsetLeft;
				var calRight	= calenderEl.offsetLeft + calenderEl.offsetWidth;
				var calTop	= calenderEl.offsetTop;
				var calBottom	= calenderEl.offsetTop + calenderEl.offsetHeight;

				if (
					(
						/* check if it overlaps horizontally */
						(thisLeft >= calLeft && thisLeft <= calRight)
							||
						(thisRight <= calRight && thisRight >= calLeft)
							||
						(thisLeft <= calLeft && thisRight >= calRight)
					)
						&&
					(
						/* check if it overlaps vertically */
						(thisTop >= calTop && thisTop <= calBottom)
							||
						(thisBottom <= calBottom && thisBottom >= calTop)
							||
						(thisTop <= calTop && thisBottom >= calBottom)
					)
				)
				{
					hideSelectTags[hideSelectTags.length] = thisTag;
					thisTag.style.display = 'none';
				}
			}

		}
		else if(thisTag.childNodes.length > 0)
		{
			hideSelect(thisTag, (superTotal+1));
		}
	}
}
function closeCalender()
{
	for (var i=0; i<hideSelectTags.length; i++)
	{
		hideSelectTags[i].style.display = 'block';
	}
	hideSelectTags.length = 0;
	document.getElementById('calenderTable').style.display='none';
}
function highLiteDay(el)
{
	el.className = 'hlDay';
}
function deHighLiteDay(el)
{
	if (el.id == 'calenderToDay')
		el.className = 'toDay';
	else if (el.id == 'calenderChoosenDay')
		el.className = 'choosenDay';
	else
		el.className = 'normalDay';
}
function pickDate(year, month, day)
{

	month++;
	day	= day < 10 ? '0'+day : day;
	month	= month < 10 ? '0'+month : month;
	if (!targetEl)
	{
		alert('target for date is not set yet');
	}
	else
	{
		targetEl.value= day+'/'+month+'/'+year;
		closeCalender();
	}

    if(purpose_dt=='setPolicyXpiry'){
        setPolicyDate( document.getElementById("policyStartDt"), document.getElementById("policyXpiryDt"), document.getElementById("loanPeriodID").value);
    }

    if(purpose_dt=='calculateAge'){
        var isValid=setAges(document.getElementById("dobOfLoanee"), document.getElementById("ageOfLoanee"));

        if(isValid==false){
            document.getElementById("dobOfLoanee").value="";
        }
    }


    if(purpose_dt=='expdateId')
    {

         document.getElementById("purchaseString").value='';
         document.getElementById("exShowRoomPrice").value='0.0';
         document.getElementById("SumInsure").value='0.0';

        var polExpDate = document.getElementById("expdateId").value.split("/");
       var formattedpolExpDate = polExpDate[1] + "/" + polExpDate[0] + "/" + polExpDate[2];
       var lDate = new Date(formattedpolExpDate);
       var currentDate = new Date();
       var formattedcurrentDate = (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear();
       var sDate = new Date(formattedcurrentDate);
       //customer breakin insurance
       if (document.getElementById("liabilityPolicy").checked==false){
       if(lDate < sDate){
       alert('Your policy has expired');
       document.getElementById("expdateId").value='';
       return;
       }
       }


       diff = Math.abs(lDate.getTime() - sDate.getTime());
       var dt = 1000 * 60 * 60 * 24
       var resultDay = (diff / dt)+eval(1);
       if (document.getElementById("liabilityPolicy").checked==false){
       if(resultDay>30) {
        alert('Previous Policy Expiry Date Should Be After Maximum 30 Days From Today');
        document.getElementById("expdateId").value="";
       }
       }

       //IIBNEW


        //alert(lDate);

       var curDate = new Date();
       lDate.setHours(0, 0, 0, 0);
       curDate.setHours(0, 0, 0, 0);
        //alert(curDate);

       if(lDate==curDate){

          var dd = curDate.getDate();
          var mm = curDate.getMonth()+1;
          var yyyy = curDate.getFullYear();

          if(dd<10) {
                  dd='0'+dd
          }

         if(mm<10) {
                    mm='0'+mm
         }

         curDate = dd+'/'+mm+'/'+yyyy;

         document.getElementById("polIssueDtTemp").value=curDate;
         document.getElementById('hoursEffectiveFromString').value='00:00';
         alert(curDate);
       }

         else{

          var tomorrow = new Date(lDate.getTime() + (24 * 60 * 60 * 1000));
          var dd1 = tomorrow.getDate();
          var mm1 = tomorrow.getMonth()+1;
          var yyyy1 = tomorrow.getFullYear();
          var nextDt=dd1+'/'+mm1+'/'+yyyy1;
          //alert(nextDt);
          document.getElementById("polIssueDtTemp").value=nextDt;
          document.getElementById('hoursEffectiveFromString').value='00:00';

       }


       //IBBNEW


    }

    if(purpose_dt=='licenseExp')
    {
        var licenseExpDate = document.getElementById("licenseExpDate").value.split("/");
       var formattedlicenseExpDate = licenseExpDate[1] + "/" + licenseExpDate[0] + "/" + licenseExpDate[2];
       var lDate = new Date(formattedlicenseExpDate);
       var currentDate = new Date();
       var formattedcurrentDate = (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear();
       var sDate = new Date(formattedcurrentDate);
       if(lDate < sDate){
       alert('Your License has expired');
       }
    }

    if(purpose_dt=='lcenseExp')
    {
        var licenseExpDate = document.getElementById("lcenseExpDate").value.split("/");
       var formattedlicenseExpDate = licenseExpDate[1] + "/" + licenseExpDate[0] + "/" + licenseExpDate[2];
       var lDate = new Date(formattedlicenseExpDate);
       var currentDate = new Date();
       var formattedcurrentDate = (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear();
       var sDate = new Date(formattedcurrentDate);
       if(lDate < sDate){
       alert('Your License has expired');
       document.getElementById("lcenseExpDate").value ='';
       }
    }

    if(purpose_dt=='registrationDateValidation'){

    var regDate = document.getElementById("dtPurchaseStr").value.split("/");
       var formattedRegDate = regDate[1] + "/" + regDate[0] + "/" + regDate[2];
       var rDate = new Date(formattedRegDate);
       var curDate = new Date();
       var dfdf = (curDate.getMonth() + 1) + "/" + curDate.getDate() + "/" + curDate.getFullYear();
       var cDate = new Date(dfdf);
       diff = Math.abs(rDate.getTime() - cDate.getTime());
       var dt = 1000 * 60 * 60 * 24
       var resultDay = (diff / dt)+eval(1);

      if(document.getElementById('business').value=="New"){


       //alert('ratul');
       //if(resultDay>30){
        //alert('Date of purchase/Registration Can Not Be 30 Days After From The Current Date');
        //document.getElementById("dtPurchaseStr").value="";
           //}
           if(rDate>curDate){
                alert('Date of purchase/Registration Can Not Be Future Date');
        document.getElementById("dtPurchaseStr").value="";
           }
           //alert(document.getElementById('newvehchk1').checked);
          // alert(document.getElementById("newvehchk1").value); ==false
          if(document.getElementById('newvehchk1').checked==true){

           if(rDate<curDate && resultDay>30){
                alert('Date of purchase/Registration Can Not 30 Days Before From The Current Date');
        document.getElementById("dtPurchaseStr").value="";
           }
           }
        }
        if(document.getElementById('business').value=="Renewal"){
        //alert('a');
           if(rDate>curDate){
                alert('Date of purchase/Registration Can Not Be Future Date');
        document.getElementById("dtPurchaseStr").value="";
           }
        }
        }///////////////////////////////////////////////////////////////////////////////rrrrrrrrrrrrrrrr
        if(purpose_dt=='aaExpiryString'){

           var regDate = document.getElementById("proposalDateString").value.split("/");
           var formattedRegDate = regDate[1] + "/" + regDate[0] + "/" + regDate[2];
           var rDate = new Date(formattedRegDate);

           var expDate = document.getElementById("expiryDateString").value.split("/");
           var formattedExpDate = expDate[1] + "/" + expDate[0] + "/" + expDate[2];
           var eDate = new Date(formattedExpDate);

            if(rDate>eDate){
            alert("Automobile Assoc. Expiry Date Can't Be Less Than Policy Inception Date");
            document.getElementById("expiryDateString").value="";
            }
        }

    if(purpose_dt=='ageOfVehicle')
    {
       //System.out.println("purpose_dt"+purpose_dt);
      if((document.getElementById("yrChoose").value !=null) && (document.getElementById("yrChoose").value > year)){
        //var curDate = new Date();
       //alert('ratul'+curDate);
       alert('Purchasing Year Cannot Be Less Than Make Year');
       document.getElementById("purchaseString").value="";
       //alert(document.getElementById("SumInsPropId").value);
       document.getElementById("SumInsure").value="0.0";
       //alert('rrrrrrrrrrrrrrrrrrrrr'+document.getElementById("SumInsPropId").value);
       showHideButton();
   }
   else{

       var regDate = document.getElementById("purchaseString").value.split("/");
       var formattedRegDate = regDate[1] + "/" + regDate[0] + "/" + regDate[2];
       var rDate = new Date(formattedRegDate);
       var curDate = new Date();
       var dfdf = (curDate.getMonth() + 1) + "/" + curDate.getDate() + "/" + curDate.getFullYear();
       var cDate = new Date(dfdf);
       diff = Math.abs(rDate.getTime() - cDate.getTime());
       var dt = 1000 * 60 * 60 * 24
       var resultDay = (diff / dt)+eval(1);

       if(document.getElementById("businessType").value=="Renewal"){

if(window.XMLHttpRequest){
        xmlHttp = new XMLHttpRequest();
    }
    else if(window.ActiveXObject){
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var url=''
    var ynIBB = document.getElementById("ynIBBApplicable").value;
    
    if(ynIBB=='Y'){
            //url ="../motor/cust_NewMotorPolicySecondAction.do?param=getiibIDV"+"&variantName2="+document.getElementById('selectVariant').value+"&vehicleClassName5="+document.getElementById('v_make').value+"&manufacturerName2="+document.getElementById('selectedNumNameCode').value+"&typeOfVehicleName2="+document.getElementById('typeOfVehicle').value+"&makeMotorDisplayName2="+document.getElementById('makeMotorDisplay').value+"&stateCode2="+document.getElementById('STATE_CODE1').value+"&purchaseStringdate="+document.getElementById('purchaseString').value+"&polIssueDtTemp="+document.getElementById('polIssueDtTemp').value;
              url ="../motor/cust_NewMotorPolicySecondAction.do?param=getiibIDV"+"&vehicleClassName5="+document.getElementById('v_make').value+"&manufacturerName2="+document.getElementById('selectedNumNameCode').value+"&makeMotorDisplayName2="+document.getElementById('makeMotorDisplay').value+"&stateCode2="+document.getElementById('STATE_CODE1').value+"&purchaseStringdate="+document.getElementById('purchaseString').value+"&polIssueDtTemp="+document.getElementById('polIssueDtTemp').value;
    }else{
   //url ="../motor/cust_NewMotorPolicySecondAction.do?param=secondpage1"+"&variantName2="+document.getElementById('selectVariant').value+"&vehicleClassName5="+document.getElementById('v_make').value+"&manufacturerName2="+document.getElementById('selectedNumNameCode').value+"&typeOfVehicleName2="+document.getElementById('typeOfVehicle').value+"&makeMotorDisplayName2="+document.getElementById('makeMotorDisplay').value+"&stateCode2="+document.getElementById('STATE_CODE1').value+"&purchaseStringdate="+document.getElementById('purchaseString').value;
     url ="../motor/cust_NewMotorPolicySecondAction.do?param=secondpage1"+"&vehicleClassName5="+document.getElementById('v_make').value+"&manufacturerName2="+document.getElementById('selectedNumNameCode').value+"&makeMotorDisplayName2="+document.getElementById('makeMotorDisplay').value+"&stateCode2="+document.getElementById('STATE_CODE1').value+"&purchaseStringdate="+document.getElementById('purchaseString').value;
  }
  //alert("Url2:" +url);
    url = url+"&sid="+ Math.random();
   //alert("Url:" +url);
      xmlHttp.open('GET', url, true);
      xmlHttp.onreadystatechange = callback11;
      xmlHttp.send(null);


           }

      else{

      if(rDate>cDate){
          alert('Date of purchase/Registration Can Not Be Future Date');
        document.getElementById("purchaseString").value="";
        document.getElementById("SumInsure").value="0.0";
        document.getElementById("totod").innerText="0.0";
        document.getElementById("tottp").innerText="0.0";
        document.getElementById("sInsure").innerText="0.0";
        showHideButton();
      }else{

    var currentDate = new Date();
       var formattedcurrentDate = (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear();
       var sDate = new Date(formattedcurrentDate);

var tomorrow = new Date(sDate.getTime() + (24 * 60 * 60 * 1000));
          var dd1 = tomorrow.getDate();
          var mm1 = tomorrow.getMonth()+1;
          var yyyy1 = tomorrow.getFullYear();
          var polIssueDt=dd1+'/'+mm1+'/'+yyyy1;

          document.getElementById("polIssueDtTemp").value=polIssueDt;





    if(window.XMLHttpRequest){
        xmlHttp = new XMLHttpRequest();
    }
    else if(window.ActiveXObject){
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }



  var url=''
    var ynIBB = document.getElementById("ynIBBApplicable").value;
  
    if(ynIBB=='Y'){
        //url ="../motor/cust_NewMotorPolicySecondAction.do?param=getiibIDV"+"&variantName2="+document.getElementById('selectVariant').value+"&vehicleClassName5="+document.getElementById('v_make').value+"&manufacturerName2="+document.getElementById('selectedNumNameCode').value+"&typeOfVehicleName2="+document.getElementById('typeOfVehicle').value+"&makeMotorDisplayName2="+document.getElementById('makeMotorDisplay').value+"&stateCode2="+document.getElementById('STATE_CODE1').value+"&purchaseStringdate="+document.getElementById('purchaseString').value+"&polIssueDtTemp="+document.getElementById('polIssueDtTemp').value;
          url ="../motor/cust_NewMotorPolicySecondAction.do?param=getiibIDV"+"&vehicleClassName5="+document.getElementById('v_make').value+"&manufacturerName2="+document.getElementById('selectedNumNameCode').value+"&makeMotorDisplayName2="+document.getElementById('makeMotorDisplay').value+"&stateCode2="+document.getElementById('STATE_CODE1').value+"&purchaseStringdate="+document.getElementById('purchaseString').value+"&polIssueDtTemp="+document.getElementById('polIssueDtTemp').value;
    }else{
   //url ="../motor/cust_NewMotorPolicySecondAction.do?param=secondpage1"+"&variantName2="+document.getElementById('selectVariant').value+"&vehicleClassName5="+document.getElementById('v_make').value+"&manufacturerName2="+document.getElementById('selectedNumNameCode').value+"&makeMotorDisplayName2="+document.getElementById('makeMotorDisplay').value+"&stateCode2="+document.getElementById('STATE_CODE1').value+"&purchaseStringdate="+document.getElementById('purchaseString').value;
     url ="../motor/cust_NewMotorPolicySecondAction.do?param=secondpage1"+"&vehicleClassName5="+document.getElementById('v_make').value+"&manufacturerName2="+document.getElementById('selectedNumNameCode').value+"&makeMotorDisplayName2="+document.getElementById('makeMotorDisplay').value+"&stateCode2="+document.getElementById('STATE_CODE1').value+"&purchaseStringdate="+document.getElementById('purchaseString').value;
   }
    //alert("Url:" +url);
    url = url+"&sid="+ Math.random();
 //  alert("Url33s:" +url);
      xmlHttp.open('POST', url, true);
     xmlHttp.onreadystatechange = callback11;
     xmlHttp.send(null);
      }

      }
    }
    }
    //} ////////////////////////////////////////////////////////////////rrrrrrrrrrrrrrrrrrrrr
    //alert(purpose_dt);
     if(purpose_dt=='age'){
        var isValid=setAgeForPBBY(document.getElementById("dateOfBirth"), document.getElementById("age"));

        if(isValid==false){
            document.getElementById("dateOfBirth").value="";
        }
   }
    if(purpose_dt == 'setDateOfExpiry')
    {

    if ((document.getElementById("policystartdate").value !=null) || (document.getElementById("policystartdate").value="" )){
    var pStartDate = document.getElementById("policystartdate").value.split("/");
    var formattedpStartDate = pStartDate[1] + "/" + pStartDate[0] + "/" + pStartDate[2];
    var pDate = new Date(formattedpStartDate);
    var curDate = new Date();

    //alert('pDate='+pDate);
var purchaseDate = document.NewMotorPolicyForm.dateOfPurchaseString.value.split("/");

    var formattedpurchaseDate = purchaseDate[1] + "/" + purchaseDate[0] + "/" + purchaseDate[2];
    var purDate = new Date(formattedpurchaseDate);
     //alert('purDate='+purDate);
     //alert(pDate<purDate);
     if (pDate<purDate){
      alert('Policy Start Date can not be less than purchasing date');
      document.getElementById("policystartdate").value=document.NewMotorPolicyForm.dateOfPurchaseString.value;
      setPolicyDate(document.getElementById("policystartdate"), document.getElementById("dateOfExpiryOfPolicyString"))
   }
  /* else if(pDate<curDate){
   alert('Policy Start Date can not be less than current date');
      document.getElementById("policystartdate").value=document.NewMotorPolicyForm.dateOfPurchaseString.value;
   } */
    else{
      document.NewMotorPolicyForm.action="../motor/NewMotorPolicyThirdAction.do?param=ExpiryDate";
      document.NewMotorPolicyForm.submit();
      document.forms[0].target="";
      }
    }
    }
  if(purpose_dt == 'polStartDateValidation'){
       var regDate = document.getElementById("dateOfIssueOfPolicyString").value.split("/");
       var formattedRegDate = regDate[1] + "/" + regDate[0] + "/" + regDate[2];
       var rDate = new Date(formattedRegDate);
       var curDate = new Date();
       rDate.setHours(0, 0, 0, 0);
       curDate.setHours(0, 0, 0, 0);
       if(rDate<curDate){
          alert('Back Date cannot be given for Policy Start date');
          var dd = curDate.getDate();
          var mm = curDate.getMonth()+1;
          var yyyy = curDate.getFullYear();

          if(dd<10) {
                  dd='0'+dd
          }

         if(mm<10) {
                    mm='0'+mm
         }

         curDate = dd+'/'+mm+'/'+yyyy;
         document.getElementById("dateOfIssueOfPolicyString").value=curDate;
       }
   }
}






function callback11(){

    if( xmlHttp.readyState==4 ){

    if( xmlHttp.status==200 ) {


    var ynIBB = document.getElementById("ynIBBApplicable").value;

    if(ynIBB=='N'){


    respText = xmlHttp.responseXML.getElementsByTagName("autoRiskIdvXml");

     //alert('test');
    for(i=0;i<respText.item(0).childNodes.length;i++) {
        //alert(respText.item(0).childNodes.item(i).nodeName);
        //alert(respText.item(0).childNodes.length);
        if(respText.item(0).childNodes.item(i).nodeName=="autoRiskIdvCode") {
            var option=document.createElement("OPTION");
            option.text=respText.item(0).childNodes.item(i).firstChild.nodeValue;
            option.value=respText.item(0).childNodes.item(i).attributes.getNamedItem("key").nodeValue;
        //    document.getElementById("makeMotorDisplay").options.add(option);
         document.getElementById("SumInsure").value='';
             //alert(respText.item(0).childNodes.item(i).attributes.getNamedItem("key").nodeValue);
             document.getElementById("SumInsure").value=respText.item(0).childNodes.item(i).attributes.getNamedItem("key").nodeValue;
             //document.getElementsByName("autoRiskIdv")[0].value = respText.item(0).childNodes.item(i).attributes.getNamedItem("key").nodeValue ;
                  }
         if(respText.item(0).childNodes.item(i).nodeName=="autoRiskIdvCode1") {

            var option=document.createElement("OPTION");
            option.text=respText.item(0).childNodes.item(i).firstChild.nodeValue;
            option.value=respText.item(0).childNodes.item(i).attributes.getNamedItem("key1").nodeValue;
        //    document.getElementById("makeMotorDisplay").options.add(option);
          // alert(respText.item(0).childNodes.item(i).attributes.getNamedItem("key1").nodeValue);
             document.getElementById("temp").value=respText.item(0).childNodes.item(i).attributes.getNamedItem("key1").nodeValue;

             if(parseFloat(document.getElementById("temp").value)>60.0)
             {


              document.getElementById("idvmsg").style.display="block";

               document.getElementById("specifymsg").style.display="block";

              document.getElementById("SumInsure").readOnly =false;
             }
             else
             {
              document.getElementById("SumInsure").readOnly =true;
             }
        }
        if(respText.item(0).childNodes.item(i).nodeName=="autoRiskIdvCode3") {

            var option=document.createElement("OPTION");
            option.text=respText.item(0).childNodes.item(i).firstChild.nodeValue;
            option.value=respText.item(0).childNodes.item(i).attributes.getNamedItem("key3").nodeValue;
        //    document.getElementById("makeMotorDisplay").options.add(option);
          // alert(respText.item(0).childNodes.item(i).attributes.getNamedItem("key3").nodeValue);
             document.getElementById("temp5").value=respText.item(0).childNodes.item(i).attributes.getNamedItem("key3").nodeValue;
          //alert(respText.item(0).childNodes.item(i).attributes.getNamedItem("key3").nodeValue)
          if(respText.item(0).childNodes.item(i).attributes.getNamedItem("key3").nodeValue=='3'){
                document.getElementById("sidecardiv").style.display="block";
          }
          else{
            document.getElementById("sidecardiv").style.display="none";
          }

          if(respText.item(0).childNodes.item(i).attributes.getNamedItem("key3").nodeValue!='3'&& respText.item(0).childNodes.item(i).attributes.getNamedItem("key3").nodeValue!='7'&&respText.item(0).childNodes.item(i).attributes.getNamedItem("key3").nodeValue!='17'){
            document.getElementById("trailerdiv").style.display="block";
          }
          else{
            document.getElementById("trailerdiv").style.display="none";
          }

          if(respText.item(0).childNodes.item(i).attributes.getNamedItem("key3").nodeValue!='7' && respText.item(0).childNodes.item(i).attributes.getNamedItem("key3").nodeValue!='17'){
            document.getElementById("fueldiv").style.display="block";
          }
          else{
            document.getElementById("fueldiv").style.display="none";
          }

        }
         if(respText.item(0).childNodes.item(i).nodeName=="autoRiskIdvCode2") {

            var option=document.createElement("OPTION");
           // option.text=respText.item(0).childNodes.item(i).firstChild.nodeValue;
          //  option.value=respText.item(0).childNodes.item(i).attributes.getNamedItem("key2").nodeValue;
        //    document.getElementById("makeMotorDisplay").options.add(option);
          // alert(respText.item(0).childNodes.item(i).attributes.getNamedItem("key2").nodeValue);

             document.getElementById("temp1").value=respText.item(0).childNodes.item(i).attributes.getNamedItem("key2").nodeValue;

        }

  }

    }else{


        document.getElementById("iibAutoRiskIdv").value='0.0';
    idv=xmlHttp.responseXML.documentElement.getElementsByTagName("IIBIDV")[0].firstChild.nodeValue;
    age=xmlHttp.responseXML.documentElement.getElementsByTagName("VEHICLEAGE")[0].firstChild.nodeValue;
    showroomprice=xmlHttp.responseXML.documentElement.getElementsByTagName("IIBSHOWROOMPRICE")[0].firstChild.nodeValue;
    document.getElementById("iibAutoRiskIdv").value=idv;
    //alert(age);

    if(showroomprice==0.0 || showroomprice==''){

     alert('Ex showroom Price not available in IIB Master');
     //document.getElementById("dtPurchaseStr").value="";
    return;
    }else{

       document.getElementById('exShowRoomPrice').value=showroomprice;


    }
    if(age<=10.0 && idv==0.0){
    document.getElementById("iibAutoRiskIdv").readOnly=true;
    alert('IDV not defined in IIB Master for vehicle age less than 10 years');
     //document.getElementById("dtPurchaseStr").value="";
    return;
    }

    if(age<=10.0 && idv!=0.0){
    document.getElementById("iibAutoRiskIdv").readOnly=false;

    }

    if(age>10.0){
    document.getElementById("iibAutoRiskIdv").readOnly=false;

    }



    }
   //Customer portal breakin insurance

    //var liabilityPol= document.getElementById("liabilityPolicy").checked;
    //alert(liabilityPol);
    if (document.getElementById("liabilityPolicy").checked){
     document.getElementById("iibAutoRiskIdv").value='0.0';
     document.getElementById("SumInsure").value='0.0';
    }



   }

}
showHideButton();

}

function showHideButton(){
     document.getElementById('qucikonlinepolicy').style.display="none";
     document.getElementById("totod").innerText="0.0";
     document.getElementById("tottp").innerText="0.0";
 }

 function checkdate(startdate,curdate)
 {
  var travelDateToken = startdate.value.split("/");
    var formattedTravleDate = travelDateToken[1] + "/" + travelDateToken[0] + "/" + travelDateToken[2];
    var myDate = new Date(formattedTravleDate);
     var today = new Date();
     var dfdf = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
     var formattedToay = new Date(dfdf);
     if (myDate>formattedToay)
     {
        document.getElementById('hoursEffectiveFromString').value='00:00';
        return true;
     }else if(myDate<formattedToay){
        document.getElementById('policystartdate').value=curdate;
        alert('Policy Start Date can not be before current date');
        return false;
     }else{
        document.getElementById('hoursEffectiveFromString').value=today.getHours() + ":" +today.getMinutes();
        return true;
     }
}

function setPolicyDate(theField,fName)
{
    var dateToken = theField.value.split("/");

	var formattedDate = dateToken[1] + "/" + dateToken[0] + "/" + dateToken[2];

	var fDate = new Date(formattedDate);
     //alert('today'+today);

    //var fDate = new Date(theField.value);
    //alert("fDate.."+fDate);

    //var daysToAdd = document.getElementById('trvlDays').value;
    //alert("daysToAdd.."+daysToAdd);

    fDate.setDate(fDate.getDate()+eval(365));

    fDate.setDate(fDate.getDate());
    //fDate.setDate(fDate.getDate() - 1);

    var MM = ((fDate.getMonth()+1)< 10) ? '0' + (fDate.getMonth()+1) : (fDate.getMonth()+1);
    //alert("MM.."+MM);

    var DD = (fDate.getDate()< 10) ? '0' + fDate.getDate() : fDate.getDate();
    //alert("DD.."+DD);

    var YY = (fDate.getFullYear()< 1000) ? fDate.getFullYear() + 1900 : fDate.getFullYear();
    //alert("YY.."+YY);

    fName.value = DD+"/"+MM+"/"+YY;
}
function getParentOffset(el, positions)
{
	positions[0] += el.offsetLeft;
	positions[1] += el.offsetTop;
	if (el.offsetParent)
		positions = getParentOffset(el.offsetParent, positions);
	return positions;
}




function daysCount()
{
 var startDate=document.getElementById('trvlStartDate').value;
 var arrivalDate=document.getElementById('arivDate').value;
 //alert(startDate);
 //alert(arrivalDate);

 var travelDateToken = startDate.split("/");

    var formattedTravleDate = travelDateToken[1] + "/" + travelDateToken[0] + "/" + travelDateToken[2];
            //alert(formattedTravleDate);
    var travelDate = new Date(formattedTravleDate);
            //  alert(travelDate);
    var arriveDateToken = arrivalDate.split("/");

    var formattedArriveDate = arriveDateToken[1] + "/" + arriveDateToken[0] + "/" + arriveDateToken[2];
            //alert(formattedArriveDate);
    var arriveDate = new Date(formattedArriveDate);
             // alert(arriveDate);
    var diff;

    //alert(arriveDate);
    //alert(travelDate);
    if(startDate == arrivalDate){

        //alert('hi');
        document.getElementById('trvlDays').value=1;
        return true;

    }else if(arriveDate > travelDate){
        //alert('helloooooooooo');
        diff = Math.abs(arriveDate.getTime() - travelDate.getTime());

        var ONE_DAY = 1000 * 60 * 60 * 24

        var resultDay = (diff / ONE_DAY)+eval(1);

        //alert('resultDay::::'+resultDay);
        if(resultDay > 180){
            alert("Travel Days shuld not be beyond 180 days !!");
           // fldName.value = '';
            document.getElementById('trvlDays').value='';
          //  fldName.select();
            return false;
        }else
          {  //fldName.value = resultDay;
            //alert('hiiiii');
       // return true;

       // fldName.value = (resultDay + 1);
         document.getElementById('trvlDays').value=resultDay;
       // alert(resultDay);
        return true;
      }
    }else if(arriveDate < travelDate){
        alert("Arrival Date should be greater than Travel Start Date");
       // arriveField.select();
        return false;
    }
}

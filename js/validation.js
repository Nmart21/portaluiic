 /*
   to use this validation first add below css with in the pages
    input.error, textarea.error
            {
            border:2px solid #FF0000 !important;
            }

            input.valid, textarea.valid
            {
            border:1px solid #ccc !important;
            }
    then add this jquery file to pages
 */



$(document).ready(function() {


       $(document.body).on('keyup', '.dynewNameClass' ,function(){
          var name = $(this).val();

		//$("#test").html(sEmail);
		//var id = "#"+$(this).attr("id");

        if ($.trim(name) != null && $.trim(name).length > 0 ) {

		    
            $(this).removeClass( "error" );
            
            $(this).addClass( "valid" );

        }

        else {

            
            $(this).removeClass( "valid" );
            
            $(this).addClass( "error" );

        }
        });

      $(document.body).on('blur', '.dynewNameClass' ,function(){
       var name = $(this).val();

		//$("#test").html(sEmail);
		//var id = "#"+$(this).attr("id");

        if ($.trim(name) != null && $.trim(name).length > 0 ) {

		    
            $(this).removeClass( "error" );
           
            $(this).addClass( "valid" );

        }

        else {

            
            $(this).removeClass( "valid" );
            
            $(this).addClass( "error" );

        }
    });
   $(document.body).on('keyup', '.dynewNumericClass' ,function(){

        //var sEmail = $('#email').val();
        //alert("test");
		var numeric = $(this).val();

		//$("#test").html(sEmail);
		//var id = "#"+$(this).attr("id");

        if ($.trim(numeric) != null && $.trim(numeric).length > 0 ) {

        if(validateNumeric($.trim(numeric)))
        {
            
            $(this).removeClass( "error" );
            
            $(this).addClass( "valid" );
        }
        else
        {
              
            $(this).removeClass( "valid" );
            
            $(this).addClass( "error" );


            }

        } else {

            
            $(this).removeClass( "valid" );
            
            $(this).addClass( "error" );

        }
    });
   $(document.body).on('blur', '.dynewNumericClass' ,function(){

       //var sEmail = $('#email').val();
        //alert("test");
		var numeric = $(this).val();

		//$("#test").html(sEmail);
		//var id = "#"+$(this).attr("id");

        if ($.trim(numeric) != null && $.trim(numeric).length > 0 ) {

        if(validateNumeric($.trim(numeric)))
        {
            
            $(this).removeClass( "error" );
           
            $(this).addClass( "valid" );
        }
        else
        {
             
            $(this).removeClass( "valid" );
            
            $(this).addClass( "error" );


            }

        } else {

            
            $(this).removeClass( "valid" );
            
            $(this).addClass( "error" );

        }
    });


    // Validation for blank like name, Address, city Start
     $('.newNameClass').keyup(function() {
        //var sEmail = $('#email').val();
        //alert("test");
		var name = $(this).val();

		//$("#test").html(sEmail);
		//var id = "#"+$(this).attr("id");

        if ($.trim(name) != null && $.trim(name).length > 0 ) {

            $(this).removeClass( "error" );
            $(this).addClass( "valid" );

        }

        else {

            $(this).removeClass( "valid" );
            $(this).addClass( "error" );

        }
    });

     $(".newNameClass").blur(function(){
       var name = $(this).val();

		//$("#test").html(sEmail);
		//var id = "#"+$(this).attr("id");

        if ($.trim(name) != null && $.trim(name).length > 0 ) {

		    $(this).removeClass( "error" );
            $(this).addClass( "valid" );

        }

        else {

            $(this).removeClass( "valid" );
            $(this).addClass( "error" );

        }
    });
   // Validation for blank like name, Address, city Ends

   //Validation for numeric fields Start like pincode, STD,land Phone Start

   $('.newNumericClass').keyup(function() {
        //var sEmail = $('#email').val();
        //alert("test");
		var numeric = $(this).val();

		//$("#test").html(sEmail);
		//var id = "#"+$(this).attr("id");

        if ($.trim(numeric) != null && $.trim(numeric).length > 0 ) {

        if(validateNumeric($.trim(numeric)))
        {
            
            $(this).removeClass( "error" );
            
            $(this).addClass( "valid" );
        }
        else
        {
              
            $(this).removeClass( "valid" );
            
            $(this).addClass( "error" );


            }

        } else {

           
            $(this).removeClass( "valid" );
            
            $(this).addClass( "error" );

        }
    });

     $(".newNumericClass").blur(function(){
       //var sEmail = $('#email').val();

		var numeric = $(this).val();

		//$("#test").html(sEmail);
		//var id = "#"+$(this).attr("id");

        if ($.trim(numeric) != null && $.trim(numeric).length > 0 ) {

        if(validateNumeric($.trim(numeric)))
        {
            
            $(this).removeClass( "error" );
            
            $(this).addClass( "valid" );
        }
        else
        {
              
            $(this).removeClass( "valid" );
            
            $(this).addClass( "error" );


            }

        } else {

           
            $(this).removeClass( "valid" );
            
            $(this).addClass( "error" );

        }
    });


   //Validation for numeric fields Start like STD,land Phone Start

   //Validation Start for email field

   $('.newEmailClass').keyup(function() {
        //var sEmail = $('#email').val();
		var sEmail = $(this).val();
		
		//$("#test").html(sEmail);
		// var id = "#"+$(this).attr("id");

        if ($.trim(sEmail).length == 0) {
			
            $(this).removeClass( "valid" );
            
            $(this).addClass( "error" );
            
        }
        if (validateEmail(sEmail)) {
		
            $(this).removeClass( "error" );
            
            $(this).addClass( "valid" );
        }
        else {
		
            $(this).removeClass( "valid" );
            
            $(this).addClass( "error" );
            
        }
    });

    $('.newEmailClass').blur(function() {
        //var sEmail = $('#email').val();
		var sEmail = $(this).val();

		//$("#test").html(sEmail);
		// var id = "#"+$(this).attr("id");

        if ($.trim(sEmail).length == 0) {
			
            $(this).removeClass( "valid" );
            
            $(this).addClass( "error" );

        }
        if (validateEmail(sEmail)) {
		
            $(this).removeClass( "error" );
            
            $(this).addClass( "valid" );
        }
        else {
		
            $(this).removeClass( "valid" );
            
            $(this).addClass( "error" );

        }
    });

    //Validation End for email field
	
	//Validation for mobile number start
	$('.newMobileClass').keyup(function() {
        //var sEmail = $('#email').val();
		var mobile = $(this).val();
		
		//$("#test").html(mobile);
		//var id = "#"+$(this).attr("id");
        if ($.trim(mobile).length == 0) {
			
            $(this).removeClass( "valid" );
            
            $(this).addClass( "error" );
            
        }
        if (validatePhone(mobile)) {
		
            $(this).removeClass( "error" );
            
            $(this).addClass( "valid" );
        }
        else {
		
            $(this).removeClass( "valid" );
            
            $(this).addClass( "error" );
            
        }
    });

    $('.newMobileClass').blur(function() {
        //var sEmail = $('#email').val();
		var mobile = $(this).val();

		//$("#test").html(mobile);
		//var id = "#"+$(this).attr("id");
        if ($.trim(mobile).length == 0) {
			
            $(this).removeClass( "valid" );
            
            $(this).addClass( "error" );

        }
        if (validatePhone(mobile)) {
		
            $(this).removeClass( "error" );
            
            $(this).addClass( "valid" );
        }
        else {
		
            $(this).removeClass( "valid" );
            
            $(this).addClass( "error" );

        }
    });

    //Validation for mobile number Ends


    $('.newSelectClass').change(function() {
        //var sEmail = $('#email').val();
		var sSelect = $(this).val();

		//$("#test").html(sEmail);
		 //var id = "#"+$(this).attr("id");

        if ($.trim(sSelect) == "select") {
			
            $(this).removeClass( "valid" );
            
            $(this).addClass( "error" );

        }else{

        
            $(this).removeClass( "error" );
            
            $(this).addClass( "valid" );
        }

    });

	$('.newSelectClassBlank').change(function() {
        //var sEmail = $('#email').val();
		var sSelect = $(this).val();

		//$("#test").html(sEmail);
		// var id = "#"+$(this).attr("id");

        if ($.trim(sSelect) == "") {
			
            $(this).removeClass( "valid" );
            
            $(this).addClass( "error" );

        }else{

        
            $(this).removeClass( "error" );
            
            $(this).addClass( "valid" );
        }

    });
	$(document.body).on("keyup paste", '.name-inp' ,function(){
		$(this).val($(this).val().replace(/[^a-z0-9 ]/gi, '')); 
	});
	$(document.body).on("keyup paste", '.numericals' ,function(){
		if(validateNumeric($(this).val())==false){
			
		$(this).val($(this).val().replace(/[^0-9 ]/gi, '')); 
		}
	});
	$(document).on("blur", '.email-inp' ,function(){
		var val = $(this).val();
		if(validateEmail(val)){
			return true;
		}else{
			alert("Enter valid email");
			$(this).val('');
			return false;
		}
	});
	$(document).on("blur", '.email-inp2' ,function(){
		var val = $(this).val();
		if(validateEmail(val)){
			return true;
		}else{
			alert("Enter valid alternate email");
			$(this).val('');
			return false;
		}
	});
	$(document).on("change", '.pan-inp' ,function(){
		validatePanCard(this);
	});
	$(document).on("change", '.enrolementNo' ,function(){
		if($(this).val()==null || $(this).val()==""){
			$('.enrolementDt').val("");
		}
	});
	$(document).on("change", '.aadhar-inp' ,function(){
		validateAadhar(this);
	});
	$(document.body).on("change", '.mobile-inp' ,function(){
		var val = $(this).val();
		if(validatePhone(val)){
			return true;
		}else{
			alert("Enter valid mobile no.");
			$(this).val('');
			return false;
		}
	});
	$(document.body).on("change", '.mobile-inp2' ,function(){
		var val = $(this).val();
		if(validatePhone(val)){
			return true;
		}else{
			alert("Enter valid phone no");
			$(this).val('');
			return false;
		}
	});
	$(document.body).on("change", '.idno' ,function(){
		var tp = $('.idtype').val();
		var val = $(this).val();
//		alert(tp);
		if(tp!=null){
			if(tp=="UID"){
				var aadhar = val;
				var adharcardTwelveDigit = /^\d{12}$/;
		        var adharSixteenDigit = /^\d{16}$/;
		        if (aadhar != '') {
		            if (aadhar.match(adharcardTwelveDigit)) {
		                return true;
		            }
		            else if (aadhar.match(adharSixteenDigit)) {
		                return true;
		            }
		            else {
		                alert("Enter valid Aadhar Number");
		                $(this).val("");
		                return false;
		            }
		        }
			}
			if(tp=="Passport"){
				var psp = val;
				var passport = /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/ig;
		        if (psp != '') {
		            if (psp.match(passport)) {
		                return true;
		            }
		            else {
		                alert("Enter valid Passport Number");
		                $(this).val("");
		                return false;
		            }
		        }	
			}
			if(tp=="PANCard"){
				
				var panPat = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
				var code = /([C,P,H,F,A,T,B,L,J,G])/;
				var ObjVal = val;
		        if (ObjVal != '') {
		        	var code_chk = ObjVal.substring(3,4);
		            if (ObjVal.search(panPat) == -1) {
		                alert("Invalid Pan Card No");
		                $(this).val("");
		                return false;
		            }
		            if (code.test(code_chk) == false) {
		                alert("Invaild PAN Card No.");
		                $(this).val("");
		                return false;
		            }
		        }
			}
			if(tp=="EPIC"){
				
			}
			if(tp=="RationCard"){
							
			}
			if(tp=="DrivingLicense"){
							
			}
		}
    });
});
function validateAadhar(elm){
	var aadhar = $(elm).val();
	var adharcardTwelveDigit = /^\d{12}$/;
    var adharSixteenDigit = /^\d{16}$/;
    if (aadhar != '') {
        if (aadhar.match(adharcardTwelveDigit)) {
            return true;
        }
        else if (aadhar.match(adharSixteenDigit)) {
            return true;
        }
        else {
            alert("Enter valid Aadhar Number");
            $(elm).val("");
            return false;
        }
    }
}
function validatePanCard(elm){
	var panPat = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
	var code = /([C,P,H,F,A,T,B,L,J,G])/;
	var ObjVal = $(elm).val();
    if (ObjVal != '') {
    	var code_chk = ObjVal.substring(3,4);
        if (ObjVal.search(panPat) == -1) {
            alert("Invalid Pan Card No");
            $(elm).val("");
            return false;
        }
        if (code.test(code_chk) == false) {
            alert("Invaild PAN Card No.");
            $(elm).val("");
            return false;
        }
    }
}
function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	if(sEmail.length==0){
		return true
	}
    if (filter.test(sEmail)) {
        //alert("true");
		return true;
		
    }
    else {
		//alert("false");
        return false;
    }
}

function validateFastag(fastag)
{
	
	var value=fastag.value;
	
	var pat=/^[0-9a-zA-Z]+$/;
	
	if(pat.test(value))
		{
		console.log("true");
		return true;
		}else
			{
			fastag.value="";
			alert("Please enter a valid Fastag ID")
			return false;
			}
	
	}


function validatePhone(sMobile) {
 var mob = /^[1-9]{1}[0-9]{9}$/;
 	if(sMobile.length==0)
 		{
 		return true;
 		}
    if (mob.test($.trim(sMobile))) {
         //alert(sMobile);
        return true;
    } else {
       return false;
    }

}

function validateNumeric(sNumeric) {
 var num = /[0-9 -()+]+$/;

    if (num.test($.trim(sNumeric))) {
         //alert(sMobile);
        return true;
    } else {
       return false;
    }

}
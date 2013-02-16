var currentUser = Parse.User.current();

if(currentUser){

	$(document).ready(
		function(){
			var d = new Date();
				var month=new Array();
				month[0]="January";
				month[1]="February";
				month[2]="March";
				month[3]="April";
				month[4]="May";
				month[5]="June";
				month[6]="July";
				month[7]="August";
				month[8]="September";
				month[9]="October";
				month[10]="November";
				month[11]="December";
			if ($("#CurrentDate").length > 0){
				$("#CurrentDate").append("" + month[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear());
			}

					var User = Parse.Object.extend("User");

					var facebookUserId = Parse.User.current().get("authData");
					var universityKey = Parse.User.current().relation("Universities").parent.get("universityId").id;
					var Universities = Parse.Object.extend("Universities");
					var query = new Parse.Query(Universities);

					query.get(universityKey, {
						success: function(results){
							var universityFullName = results.get("university");
							var universityShortName = results.get("universityKey");
						$("#UniversityFullNameDash").append(universityFullName);
						$("#UniversityShortFormDash").append(universityShortName);
						}
					});



      // end of Parse data


					$.getJSON("https://graph.facebook.com/"+facebookUserId.facebook.id+"?fields=first_name", function(response) {
					    var firstName = response["first_name"];
					    $("#firstName").append(firstName);

					});

/*					$.getJSON("https://graph.facebook.com/"+facebookUserId.facebook.id+"?fields=cover", function(response) {
					    var coverUrl = response["cover"].source;
					    $("#coverPicture").append("<img src='"+coverUrl+"'>");

					});*/

					$("#profilePicture").append("<img width='80' src='https://graph.facebook.com/" +facebookUserId.facebook.id+"/picture?type=normal'>");

						$("#logOut1").click(
							function (){
								Parse.User.logOut();
								var currentUser = Parse.User.current();  // this will now be null
								window.location.replace("../auth/login.html");
							}
						);
						$("#logOut2").click(
							function (){
								Parse.User.logOut();
								var currentUser = Parse.User.current();  // this will now be null
								window.location.replace("../auth/login.html");
							}
						);
						$("#logOut3").click(
							function (){
								Parse.User.logOut();
								var currentUser = Parse.User.current();  // this will now be null
								window.location.replace("../auth/login.html");
							}
						);


		}
	);
}
else{
		window.location.replace("../auth/login.html");

}

var currentUser = Parse.User.current();
$(document).ready(
	function(){
		if(!currentUser){
			window.location.replace("../auth/login.html");
		}
		else{
					var User = Parse.Object.extend("User");

					var facebookUserId = Parse.User.current().get("authData");


					$.getJSON("https://graph.facebook.com/"+facebookUserId.facebook.id+"?fields=first_name", function(response) {
					    var firstName = response["first_name"];
					    $("#firstName").append(firstName);

					});

/*					$.getJSON("https://graph.facebook.com/"+facebookUserId.facebook.id+"?fields=cover", function(response) {
					    var coverUrl = response["cover"].source;
					    $("#coverPicture").append("<img src='"+coverUrl+"'>");

					});*/

					$("#profilePicture").append("<img width='80' src='https://graph.facebook.com/" +facebookUserId.facebook.id+"/picture?type=normal'>");


				$("#logOut").click(

					function (){

						Parse.User.logOut();
						 
						var currentUser = Parse.User.current();  // this will now be null

						window.location.replace("../auth/login.html");

					}
				);

		}
	}
	);
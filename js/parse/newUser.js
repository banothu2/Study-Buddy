var currentUser = Parse.User.current();
$(document).ready(
	function(){
		if(!currentUser){
			window.location.replace("../auth/login.html");
		}
		else{
					var User = Parse.Object.extend("User");
					var facebookUserId = Parse.User.current().get("authData");
					//var universityKey = Parse.User.current().relation("Universities").parent.get("universityId").id;

					var user = new User();
					user.id = Parse.User.current().id;


					$.getJSON("https://graph.facebook.com/"+facebookUserId.facebook.id, function(response) {
					    var firstName = response["first_name"];
					    var lastName = response["last_name"];
					    $("#firstName").append(firstName);
					    $("#firstNameInput").empty()
					    $("#lastNameInput").empty()
					    $("#firstNameInput").append("<input type='text' name='bazinga' id='firstNameOutput' value='" + firstName + "' disabled='disabled'/>");
					    $("#lastNameInput").append("<input type='text' name='bazinga' id='lastNameOutput' value='"+ lastName+ "' disabled='disabled'/>");

					});

					/* $.getJSON("https://graph.facebook.com/"+facebookUserId.facebook.id+"?fields=cover", function(response) {
					    var coverUrl = response["cover"].source;
					    $("#coverPicture").append("<img src='"+coverUrl+"'>");

					});*/

					$("#profilePicture").append("<img width='80' src='https://graph.facebook.com/" +facebookUserId.facebook.id+"/picture?type=normal'>");

					  $("form").submit(
					  	function(){
					  	var University = Parse.Object.extend("Universities");

					  	var university = new University();
						university.id = $("#universityInput").val();
						var firstName = $("#firstNameOutput").val();
						var lastName = $("#lastNameOutput").val();
					    var email = $("#emailInput").val();
					    var phone = $("#phoneInput").val();
					    var graduationYear = $("#graduationYearInput").val();
						
						user.set("firstName", firstName);
						user.set("lastName", lastName);
					    user.set("email", email);
					    user.set("phone", phone);
					    user.set("graduationYear", yearInSchool);
					    user.set("universityId", university);

					    user.save(null, {
					    	success: function(user){
					    		window.location.replace("../public/index.html");

					    	}, 
					  		error: function(user, error){
					  			alert("Error: " + error.code + " " + error.message);
					  		}

					  	});
					  });	
		}
	}
	);
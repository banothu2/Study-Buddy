var currentUser = Parse.User.current();
$(document).ready(
	function(){
					var User = Parse.Object.extend("User");

					var facebookUserId = Parse.User.current().get("authData");
					var universityKey = Parse.User.current().relation("Universities").parent.get("universityId").id;
					var Universities = Parse.Object.extend("Universities");
					var universityDetails = new Parse.Query(Universities);

					universityDetails.get(universityKey, {
						success: function(results){
							var universityFullName = results.get("university");
							var universityShortName = results.get("universityKey");
						$("#profileUniversityFullName").append(universityFullName);
						$("#profileUniversityShortName").append(universityShortName);
						}
					});

							Parse.User.current().fetch({
							    success: function(myObject) {
								    // The object was refreshed successfully.
								 },
								error: function(myObject, error) {
								    // The object was not refreshed successfully.
								    // error is a Parse.Error with an error code and description.
								}
							});

							var firstName = Parse.User.current().get("firstName") || "";
							var lastName = Parse.User.current().get("lastName") || "";
							var email = Parse.User.current().get("email") || "";
							var phone = Parse.User.current().get("phone") || "";
							var graduationYear = Parse.User.current().get("graduationYear") || "";

							$("#profileFirstName").prepend('<input type="text" name="readonly" readonly="readonly" value="'+ firstName +'" />');
							$("#profileLastName").prepend('<input type="text" name="readonly" readonly="readonly" value="'+ lastName +'" />');
							$("#profileEmail").prepend('<input type="text" name="placeholder" value="'+ email+'" />');
							$("#profilePhone").prepend('<input type="text" class="maskPhone" value="'+ phone +'" />');
							$("#profileGraduationYear").prepend('<input type="text" name="regular" value="'+ graduationYear+'" />');

							var courseOne = Parse.User.current().get("courseOne") || "Independent Study";
							var courseTwo = Parse.User.current().get("courseTwo") || "Independent Study";
							var courseThree = Parse.User.current().get("courseThree") || "Independent Study";
							var courseFour = Parse.User.current().get("courseFour") || "Independent Study";
							var courseFive = Parse.User.current().get("courseFive") || "Independent Study";
							var courseSix = Parse.User.current().get("courseSix") || "Independent Study";
							var courseSeven = Parse.User.current().get("courseSeven") || "Independent Study";
							
							$("#profileCourseOne").prepend('<input type="text" name="regular" value="' + courseOne + '" />');
							$("#profileCourseTwo").prepend('<input type="text" name="regular" value="' + courseTwo + '" />');
							$("#profileCourseThree").prepend('<input type="text" name="regular" value="' + courseThree + '" />');
							$("#profileCourseFour").prepend('<input type="text" name="regular" value="' + courseFour + '" />');
							$("#profileCourseFive").prepend('<input type="text" name="regular" value="' + courseFive + '" />');
							$("#profileCourseSix").prepend('<input type="text" name="regular" value="' + courseSix + '" />');
							$("#profileCourseSeven").prepend('<input type="text" name="regular" value="' + courseSeven + '" />');


					$("#profileFacebookPicture").empty();
					$("#profileFacebookPicture").append("<img width='100' src='https://graph.facebook.com/" +facebookUserId.facebook.id+"/picture?type=normal'>");


					$.getJSON("https://graph.facebook.com/"+facebookUserId.facebook.id, function(response) {
					    var fullName = response["name"];

					    $("#profileFullName").append(fullName);


					});

					$.getJSON("https://graph.facebook.com/"+facebookUserId.facebook.id+"?fields=cover", function(response) {
					    var coverUrl = response["cover"].source;
					    $("#profileCoverPicture").append("<img width=100% src='"+coverUrl+"'>");

					});
	}
);


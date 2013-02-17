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
							$("#profileEmail").prepend('<input type="text" name="placeholder" value="'+ email+'" id="outputEmail" />');
							$("#profilePhone").prepend('<input type="text" class="maskPhone" value="'+ phone +'" id="outputPhone" />');
							$("#profileGraduationYear").prepend('<input type="text" name="regular" value="'+ graduationYear+'" id="outputGrad" />');

							var courseOne = Parse.User.current().get("courseOne") || "Independent Study";
							var courseTwo = Parse.User.current().get("courseTwo") || "Independent Study";
							var courseThree = Parse.User.current().get("courseThree") || "Independent Study";
							var courseFour = Parse.User.current().get("courseFour") || "Independent Study";
							var courseFive = Parse.User.current().get("courseFive") || "Independent Study";
							var courseSix = Parse.User.current().get("courseSix") || "Independent Study";
							var courseSeven = Parse.User.current().get("courseSeven") || "Independent Study";
							
							$("#profileCourseOne").prepend('<input type="text" name="regular" value="' + courseOne + '" id="outputCourseOne"/>');
							$("#profileCourseTwo").prepend('<input type="text" name="regular" value="' + courseTwo + '" id="outputCourseTwo"/>');
							$("#profileCourseThree").prepend('<input type="text" name="regular" value="' + courseThree + '" id="outputCourseThree" />');
							$("#profileCourseFour").prepend('<input type="text" name="regular" value="' + courseFour + '" id="outputCourseFour" />');
							$("#profileCourseFive").prepend('<input type="text" name="regular" value="' + courseFive + '" id="outputCourseFive" />');
							$("#profileCourseSix").prepend('<input type="text" name="regular" value="' + courseSix + '" id="outputCourseSix" />');
							$("#profileCourseSeven").prepend('<input type="text" name="regular" value="' + courseSeven + '" id="outputCourseSeven" />');


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


				      var Map = Parse.Object.extend("Map");
				      var mapPoints = new Parse.Query(Map);

				  mapPoints.equalTo("universityId", Parse.User.current().relation("Universities").parent.get("universityId"));
				  mapPoints.equalTo("userId", Parse.User.current());
				  mapPoints.descending("createdAt");

				  mapPoints.find({

				    success: function(results){

				          for (var i = 0; i < results.length; i++) {


				            var contact = results[i].get("contact") || "";
				            var date = results[i].get("studyDate") || "";
				            var subject = results[i].get("subject") || "";
				            var notes = results[i].get("notes") || "";
				            var ending = results[i].get("endTime") || "";
				            var latitudeParse = results[i].get("latitude") || "";
				            var longitudeParse = results[i].get("longitude") || "";
				            var starting = results[i].get("startTime") || "";
				            var name = results[i].get("name");

				           $("#tableBody").append("<tr><td>" + name + "</td><td>" + subject + "</td><td>" + notes + "</td><td>" + contact + "</td><td>" + date + "</td><td>" + starting + "</td><td>" + ending + "</td> </tr>"); 

				          }

				          },
				          error: function(mapperList, error){
				            alert(error.code + " " + error.message);
				          }


				    });

					
						$("#updateClasses").click(
							function (){
										var user = new User();
										user.id = Parse.User.current().id;

										user.set("courseOne", $("#outputCourseOne").val());
										user.set("courseTwo", $("#outputCourseTwo").val());
										user.set("courseThree", $("#outputCourseThree").val());
										user.set("courseFour", $("#outputCourseFour").val());
										user.set("courseFive", $("#outputCourseFive").val());
										user.set("courseSix", $("#outputCourseSix").val());
										user.set("courseSeven", $("#outputCourseSeven").val());

										user.save(null, {
											success: function(user){
												//send over to the main page
												$("#errorClasses").empty();
												$("#errorClasses").append("<div class='formRow'> <div class='nNote nSuccess'><p>Your Courses have been updated!</p></div></div>");
												$("#updateClassesButton").empty();
												$("#updateClassesButton").append("<a class='buttonM bDefault' ><span class='icon-checkmark-3'></span><span>Updated!</span></a>");
												Parse.User.current().fetch({
												  success: function(myObject) {
												    // The object was refreshed successfully.
												  },
												  error: function(myObject, error) {
												    // The object was not refreshed successfully.
												    // error is a Parse.Error with an error code and description.
												  }
												});
											},
											error: function(user, error){
												$("#errorClasses").empty();
												$("#errorClasses").append("<div class='formRow'> <div class='nNote nFailure'><p>Error: "+error.message+"</p></div></div>");
												}
										});
							}
						);
      					
						$("#updateBasicInfo").click(
							function (){
										var user = new User();
										user.id = Parse.User.current().id;

										user.set("email", $("#outputEmail").val());
										user.set("phone", $("#outputPhone").val());
										user.set("graduationYear", parseInt($("#outputGrad").val(),10));

										user.save(null, {
											success: function(user){
												//send over to the main page
												$("#errorBasic").empty();
												$("#errorBasic").append("<div class='formRow'> <div class='nNote nSuccess'><p>Your info have been updated!</p></div></div>");
												$("#updateBasicInfoButton").empty();
												$("#updateBasicInfoButton").append("<a class='buttonM bDefault'><span class='icon-checkmark-3'></span><span>Updated!</span></a>");
												Parse.User.current().fetch({
												  success: function(myObject) {
												    // The object was refreshed successfully.
												  },
												  error: function(myObject, error) {
												    // The object was not refreshed successfully.
												    // error is a Parse.Error with an error code and description.
												  }
												});
											},
											error: function(user, error){
												$("#errorBasic").empty();
												$("#errorBasic").append("<div class='formRow'> <div class='nNote nFailure'><p>Error: "+error.message+"</p></div></div>");
											}
										});
							}
						);





	}
);


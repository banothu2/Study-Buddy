		$(document).ready(//Wait for document to be ready
			function () {

				var User = Parse.Object.extend("User");
				var query = new Parse.Query(User);

				query.find({
					success: function(){
						var firstName = Parse.User.current().get("firstName");
						var lastName = Parse.User.current().get("lastName");
						var email = Parse.User.current().get("email");
						$("#inputEmail").empty();
						$("#inputEmail").append("<input type='text' name='regular' placeholder='Email/Phone' value='"+email+"' id='inputEmailLoaded'/>");
						$("#inputFullName").empty();
						$("#inputFullName").append("<input type='text' name='regular' disabled='disabled' value='" + firstName + " " + lastName +"' id='inputFullNameLoaded'/>");
						
						var courseOne = Parse.User.current().get("courseOne") || "Independent Study";
						var courseTwo = Parse.User.current().get("courseTwo") || "Independent Study";
						var courseThree = Parse.User.current().get("courseThree") || "Independent Study";
						var courseFour = Parse.User.current().get("courseFour") || "Independent Study";
						var courseFive = Parse.User.current().get("courseFive") || "Independent Study";
						var courseSix = Parse.User.current().get("courseSix") || "Independent Study";
						var courseSeven = Parse.User.current().get("courseSeven") || "Independent Study";

						$("#inputSubject").empty();
						$("#inputSubject").append("<option value='"+courseOne+"'>"+ courseOne+"</option><option value='"+courseTwo+"'>"+ courseTwo+"</option><option value='"+courseThree+"'>"+ courseThree+"</option><option value='"+courseFour+"'>"+ courseFour+"</option><option value='"+courseFive+"'>"+ courseFive+"</option><option value='"+courseSix+"'>"+ courseSix+"</option><option value='"+courseSeven+"'>"+ courseSeven+"</option>");

					}
				})
                      
/*                    $('#viewOnMap').click(function(){
                      		$("#mapStatic").empty();
                        var url = GMaps.staticMapURL({
                          size: [610, 350],
                          zoom: 16,
                          lat: $("#inputLatitude").val(),
                          lng: $("#inputLongitude").val(),
                          markers: [
                            {lat: $("#inputLatitude").val(), lng: $("#inputLongitude").val(), color: 'blue'}
                          ]
                        });
                        $('<img/>').attr('src', url).appendTo('#mapStatic');
                      });*/




			}
		);

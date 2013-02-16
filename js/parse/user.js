var currentUser = Parse.User.current();
if(!currentUser){
  window.location.replace("../auth/login.html");
}
else{
      
            var currentUser = Parse.User.current();
            var Map = Parse.Object.extend("Map");
            var mapPoints = new Parse.Query(Map);
            var d = new Date();
            var dateCheck = d.getTime() - 1728000000000;

        mapPoints.equalTo("universityId", Parse.User.current().relation("Universities").parent.get("universityId"));

        mapPoints.find({

          success: function(results){

                for (var i = 0; i < results.length; i++) {


                  var contact = results[i].get("contact") || "";
                  var date = results[i].get("date") || "";
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

}

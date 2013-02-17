<?php 
require_once('../../system/templates/header_template.php');
?>
<script type="text/javascript" src="../../js/parse/profile.js"> </script>
<script type="text/javascript" src="../../js/parse/submitStudyData.js"> </script>


<!-- Start of maps javascript -->
  <script type="text/javascript" src="http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerclusterer/1.0/src/markerclusterer.js"></script>
  <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
  <script type="text/javascript" src="../../js/gmaps/gmaps.js"></script>
  <link rel="stylesheet" type="text/css" href="../../css/maps.css" />
  <script type="text/javascript">
    var map;
      //Search form - Geocoding

        $(document).ready(//Wait for document to be ready
            function (){
            $('#UseThisLocation').click(
                function (){
                  GMaps.geocode({
                    address: $('#inputAddress').val().trim(),
                    callback: function(results, status){
                      if(status=='OK'){
                        var latlng = results[0].geometry.location;


                        url = GMaps.staticMapURL({
                          size: [300, 234],
                          lat: latlng.lat(),
                          lng: latlng.lng(),
                          markers: [
                            {lat: latlng.lat(), lng: latlng.lng(),
                              color: 'blue'}
                          ]
                        });
                        $("#mapStatic").empty();
                        $('<img/>').attr('src', url)
                          .appendTo('#mapStatic');

                        $("#inputLatitude").empty();
                        $("#inputLatitude").append('<input type="text" name="regular" placeholder="Latitude1" value="' +latlng.lat()+'" disabled="disabled" id="inputLatitudeLoaded">');
                        $("#inputLongitude").empty();
                        $("#inputLongitude").append('<input type="text" name="regular" placeholder="Latitude1" value="' +latlng.lng()+'" disabled="disabled" id="inputLongitudeLoaded">');

                      //alert(latlng.lat() + " " + latlng.lng());
                      }
                    }
                  });
                }
            );



$("#submitGeoData").click(
    function(){


            //              Parse.User.logIn($("#inputUsername").val(), $("#inputPassword").val(), {
                            var Map = Parse.Object.extend("Map");
                            var Map = new Map();
                                                        

                            var d = new Date();
                            var dateCheck = d.getTime();
                            if($("#inputLatitudeLoaded").length == 0  || $("#inputLongitudeLoaded").length == 0 ){
                                $("#error").empty();
                                $("#error").append("<div class='nNote nFailure'>Oh oh! The location is missing! </div>");
                            }
                            else{
                            Map.save({

                              universityId: Parse.User.current().relation("Universities").parent.get("universityId"),
                              userId: Parse.User.current(),
                              address: $("#inputAddress").val(),
                              latitude: $("#inputLatitudeLoaded").val(),
                              longitude: $("#inputLongitudeLoaded").val(),
                              name: $("#inputFullNameLoaded").val(),
                              subject: $("#inputSubject").val(),
                              startTime: $("#outputStartTime").val(),
                              endTime: $("#outputEndTime").val(),
                              notes: $("#outputNotes").val(),
                              contact: $("#inputEmailLoaded").val(),
                              studyDate: $("#date").val(),
                              date: dateCheck
                              
                            }, {
                              success: function(map) {
                                // The object was saved successfully.
                                $("#error").empty();
                                $("#error").append("<div class='nNote nSuccess'><p>Your submission has been successfully recorded and added to the map!</p></div>");
                              },
                              error: function(map, error) {
                                // The save failed.
                                $("#error").empty();
                                $("#error").append("<div class='nNote nFailure'>Oh oh! Something went wrong! Please try again. </div>");
                                // error is a Parse.Error with an error code and description.
                              }
                            }); 
                            }

    });

});

/*
    var map;
      //Search form - Geocoding
            $('#UseThisLocation').click(
                function (){
                  GMaps.geocode({
                    address: $('#address').val().trim(),
                    callback: function(results, status){
                      if(status=='OK'){
                        var latlng = results[0].geometry.location;
                        $("#inputLatitude").empty();
                        $("#inputLatitude").append('<input type="text" name="regular" placeholder="Latitude1" value="' +latlng.lat()+'" >');


                      //alert(latlng.lat() + " " + latlng.lng());
                      }
                    }
                  });
                }
            );*/
  </script>

<!-- Content begins -->
<div id="content">
    <?php 
        require_once('../../system/templates/contentTop.php');
    ?>
    <!-- Breadcrumbs line -->
    <div class="breadLine">
        <div class="bc">
            <ul id="breadcrumbs" class="breadcrumbs">
                <li><a href="../public/index.html">Dashboard</a></li>
                <li class="current"><a href="../map/submitGeo.php" title="">Submit a Geo Point</a></li>
            </ul>
        </div>
    </div>
    
    <!-- Main content -->
    <div class="wrapper">
        <div class="enterMessage">
            <input type="text" name="enterMessage" placeholder="Enter your location..." id="inputAddress"/>
            <div class="sendBtn">
                <input type="submit" name="sendMessage" class="buttonS bLightBlue"  id="UseThisLocation" value="Use this Location!" />
            </div>
            <div id="error"></div>
        </div>


                            <div class="fluid">

                                <div class="widget grid6">
                                    <div class="formRow fluid">
                                        <div class="grid12" id="inputFullName" disabled="disabled"></div>
                                    </div>

                                    <div class="formRow fluid">
                                        <div class="grid6" id="inputEmail"></div>
                                        <div class="grid3" ><input type="text" name="regular" placeholder="9:30 PM" id="outputStartTime"/></div>
                                        <div class="grid3" ><input type="text" name="regular" placeholder="11:30 PM" id="outputEndTime"/></div>
                                    </div>
                                    <div class="formRow fluid">
                                        <div class="grid12" ><input type="text" class="datepicker" placeholder="Date" id="date"/></div>
                                    </div>
                                    <div class="formRow fluid">
                                        <div class="grid6">
                                            <select name="styled-dropdown" class="styled" id="inputSubject">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="formRow fluid">
                                        <div class="grid12" ><input type="text" name="regular" placeholder="Details of Location" id="outputNotes" /></div>
                                    </div>                                  
                                </div>
                                <div class="widget grid6">
                                    <div class="formRow fluid">
                                        <div class="grid6" id="inputLatitude"><input type="text" name="regular" placeholder="Enter your location above! "  disabled="disabled" ></div>
                                        <div class="grid6" id="inputLongitude"><input type="text" name="regular" placeholder="Enter your location above! "  disabled="disabled" ></div>
                                    </div>
                                    <div class="formRow fluid">
                                        <div id="mapStatic">
                                          <img width="100%" src="../../images/placeholder/mapPlaceholder.jpg">
                                        </div>
                                    </div>
                              
                                </div>
                            </div>



                    <div class="wButton"><a href="#" title="" class="buttonL bLightBlue first" id="submitGeoData">Submit your data!</a></div>


    </div>
    <!-- Main content ends -->
    
</div>
<!-- Content ends -->

</body>
</html>

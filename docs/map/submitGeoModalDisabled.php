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
                          size: [300, 300],
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
        <div class="fluid">
            <div class="widget grid12">
                <div class="whead"><h6>Submit your Study Location:</h6></div>
                <div class="body">
                    <ul class="updates">
                        <li>
                            <span class="uNotice">
                                <a href="#" title="" id="mapper">Meat a new team member - Don Corleone</a>
                                <span>Very dyplomatic and flexible sales manager</span>
                            </span>
                        </li>
                    </ul>            
                    <div class="wButton"><a href="#" title="" class="buttonL bLightBlue first" id="modal_open">Submit your data!</a></div>

                        <div id="dialog-modal" title="Basic modal dialog">
                                    <div class="enterMessage">
                                        <input type="text" name="enterMessage" placeholder="Enter your location..." id="inputAddress"/>
                                        <div class="sendBtn">
                                            <input type="submit" name="sendMessage" class="buttonS bLightBlue"  id="UseThisLocation" value="Use this Location!" />
                                        </div>
                                        <div id="error"></div>
                                    </div>
                                      <div class="divider"><span></span></div>
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
                                        <div class="grid6" id="inputLatitude"></div>
                                        <div class="grid6" id="inputLongitude"></div>
                                    </div>
                                    <div class="formRow fluid">
                                        <div id="mapStatic"> </div>
                                    </div>
                              
                                </div>
                            </div>
                               
                        </div>
                </div>
            </div>
        </div>

    </div>
    <!-- Main content ends -->
    
</div>
<!-- Content ends -->

</body>
</html>

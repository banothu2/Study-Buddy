<?php 
require_once('../../system/templates/header_template.html');
?>
<!-- script for maps -->
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
  <script type="text/javascript" src="http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerclusterer/1.0/src/markerclusterer.js"></script>
  <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
  <script type="text/javascript" src="../../js/gmaps/gmaps.js"></script>
  <link rel="stylesheet" type="text/css" href="../../css/maps.css" />
  <script type="text/javascript" src="../../js/gmaps/index.js"></script>
<!-- end of script for maps -->

<script type="text/javascript" src="../../js/parse/user.js"> </script>

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
                <li class="current"><a href="../public/index.php" title="">Index</a></li>
            </ul>
        </div>
    </div>
    
    <!-- Main content -->
    
    <!-- Main content -->
    <div class="wrapper">
    
        <!-- Chart -->


        <div class="widget">
                <div class="whead">
                    <h6>Maps</h6>
                    <div class="headInput">
                        <form method="post" id="geocoding_form">
                            <input type="text" name="headSearch" placeholder="Enter Address Here..." name="address" id="address"/>
                            <input type="submit" name="find" class="srch" value="" />
                        </form>
                    </div>
                </div>
            <div class="body">

                <div id="map">
                </div>
            </div>
        </div>

        <div class="widget">
        <div class="whead"><h6>Quick view of Geos</h6></div>
        <div id="dyn" class="hiddenpars">
            <a class="tOptions" title="Options"><img src="../../images/icons/options" alt="" /></a>
            <table cellpadding="0" cellspacing="0" border="0" class="dTable" id="dynamic">
            <thead>
            <tr>
            <th>Full Name<span class="sorting" style="display: block;"></span></th>
            <th>Subject</th>
            <th>Notes</th>
            <th>Contact Info</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            </tr>
            </thead>
            <tbody id="tableBody">
            </tbody>
            </table> 
        </div>
        </div>    
        
        
        
        
    </div>
    <!-- Main content ends -->
    
</div>
<!-- Content ends -->

</body>
</html>

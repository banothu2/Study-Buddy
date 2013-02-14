<?php 
require_once('system/template/class_template.php');
?>
    
<!-- Content begins -->
<div id="content">
    <div class="contentTop">
        <span class="pageTitle"><span class="icon-screen"></span><span id="UniversityFullNameDash"> </span></span>
        <ul class="quickStats">
            <li>
                <a href="" class="blueImg"><img src="../../images/icons/quickstats/plus.png" alt="" /></a>
                <div class="floatR"><strong class="blue">5489</strong><span>Geos</span></div>
            </li>
            <li>
                <a href="" class="redImg"><img src="../../images/icons/quickstats/user.png" alt="" /></a>
                <div class="floatR"><strong class="blue">4658</strong><span>Users</span></div>
            </li>
            <li>
                <a href="" class="greenImg"><img src="../../images/icons/quickstats/money.png" alt="" /></a>
                <div class="floatR"><strong class="blue">0</strong><span>Donated</span></div>
            </li>
        </ul>
    </div>
<!--     <div id="coverPicture">

    </div> -->
    <!-- Breadcrumbs line -->
    <div class="breadLine">
        <div class="bc">
            <ul id="breadcrumbs" class="breadcrumbs">
                <li><a href="#">Dashboard</a></li>
                <li class="current"><a href="ui_grid.html" title="">Home Page</a></li>
            </ul>
        </div>
    </div>
    
    <!-- Main content -->
    <div class="wrapper">
    
    	<!-- Chart -->


        <div class="widget">
            <div class="whead">
                <h6>Maps</h6>
            </div>
            <div class="body">
                <div class="searchLine">
                    <form method="post" id="geocoding_form">
                        <input type="text" placeholder="Enter Address Here..." name="address" id="address">
                        <button type="submit" value="" name="find">
                            <span class="icos-search">
                            </span>
                        </button>
                    </form>

                </div>
                <div class="divider">
                    <span>
                    </span>
                </div>
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

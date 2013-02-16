<?php 
require_once('../../system/templates/header_template.php');
?>
<script type="text/javascript" src="../../js/parse/profile.js"> </script>
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
                <div class="whead"><h6>Grid12</h6></div>
                <div class="body">    
                <ul class="updates">
                        <li>
                            <span class="uNotice">
                                <a href="#" title="">Meat a new team member - Don Corleone</a>
                                <span>Very dyplomatic and flexible sales manager</span>
                            </span>
                        </li>
                    </ul>            
                    <div class="wButton"><a href="#" title="" class="buttonL bLightBlue first">Submit your study details!</a></div>
                </div>
            </div>
        </div>

    </div>
    <!-- Main content ends -->
    
</div>
<!-- Content ends -->

</body>
</html>

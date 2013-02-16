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
                <li><a href="index.html">Dashboard</a></li>
                <li class="current"><a href="ui_grid.html" title="">Profile</a></li>
            </ul>
        </div>
    </div>
    
    <!-- Main content -->
    <div class="wrapper">
            <div class="grid12">
                <div class="widget">
                    <div id="profileCoverPicture"></div>
                </div>
            </div>
        <div class="fluid">

            <div class="grid5">
                <!-- Quick settings widget -->
                <div class="widget">
                    <div class="whead"><h6>Profile</h6></div>
                    <ul class="niceList params">
                        <li>
                            <div class="myPic" id="profileFacebookPicture"><img src="../../images/user.png" alt="" /></div>
                            <div class="myInfo">
                                <h5 id="profileFullName"></h5>
                                <span class="myRole" id="profileUniversityFullName"></span>
                                <span class="followers" id="profileUniversityShortName"></span>
                            </div>
                        </li>
                        <!-- <li class="on_off">
                            <label for="ch1"><span class="icon-key"></span>Keep me logged in:</label>
                            <input type="checkbox" id="ch1" checked="checked" name="chbox" />
                        </li>
                        <li class="on_off">
                            <label for="ch2"><span class="icon-reload-CW"></span>Enable quick changes:</label>
                            <input type="checkbox" id="ch2" name="chbox" />
                        </li>
                        <li class="on_off">
                            <label for="ch3"><span class="icon-fullscreen"></span>Allow quick view:</label>
                            <input type="checkbox" id="ch3" name="chbox" />
                        </li>
                        <li class="on_off">
                            <label for="ch4"><span class="icon-locked-2"></span>Auto log off:</label>
                            <input type="checkbox" id="ch4" checked="checked" name="chbox" />
                        </li> -->
                    </ul>
                </div>

                <form action="" class="main">
                    <fieldset>
                        <div class="widget fluid">
                            <div class="whead"><h6>Course Details</h6></div>
                            <div class="formRow">
                                <div class="grid3"><label>Course One:</label></div>
                                <div class="grid9" id="profileCourseOne"><span class="note">Caps & short form. Ex: CHEM 102, CSIS 1119, 5.067</span></div>
                            </div>
                            <div class="formRow">
                                <div class="grid3"><label>Course Two:</label></div>
                                <div class="grid9" id="profileCourseTwo"><span class="note">Caps & short form. Ex: CHEM 102, CSIS 1119, 5.067</span></div>
                            </div>
                            <div class="formRow">
                                <div class="grid3"><label>Course Three:</label></div>
                                <div class="grid9" id="profileCourseThree"><span class="note">Caps & short form. Ex: CHEM 102, CSIS 1119, 5.067</span></div>
                            </div>
                            <div class="formRow">
                                <div class="grid3"><label>Course Four:</label></div>
                                <div class="grid9" id="profileCourseFour"><span class="note">Caps & short form. Ex: CHEM 102, CSIS 1119, 5.067</span></div>
                            </div>
                            <div class="formRow">
                                <div class="grid3"><label>Course Five:</label></div>
                                <div class="grid9" id="profileCourseFive"><span class="note">Caps & short form. Ex: CHEM 102, CSIS 1119, 5.067</span></div>
                            </div>
                            <div class="formRow">
                                <div class="grid3"><label>Course Six:</label></div>
                                <div class="grid9" id="profileCourseSix"><span class="note">Caps & short form. Ex: CHEM 102, CSIS 1119, 5.067</span></div>
                            </div>
                            <div class="formRow">
                                <div class="grid3"><label>Course Seven:</label></div>
                                <div class="grid9" id="profileCourseSeven"><span class="note">Caps & short form. Ex: CHEM 102, CSIS 1119, 5.067</span></div>
                            </div>
                 </div>
                    </fieldset>
                </form>




            </div>

            <div class="grid7">
            
                <form action="" class="main">
                    <fieldset>
                        <div class="widget fluid">
                            <div class="whead"><h6>Personal Information</h6></div>
                            <div class="formRow">
                                <div class="grid3"><label>First Name:</label></div>
                                <div class="grid9" id="profileFirstName"></div>
                            </div>
                            <div class="formRow">
                                <div class="grid3"><label>Last Name:</label></div>
                                <div class="grid9" id="profileLastName"></div>
                            </div>
                            <div class="formRow">
                                <div class="grid3"><label>Email:</label></div>
                                <div class="grid9" id="profileEmail"></div>
                            </div>
                            <div class="formRow">
                                <div class="grid3"><label>Phone Number:</label></div>
                                <div class="grid9" id="profilePhone">
                                    <span class="note">(999) 999-9999</span>
                                </div>                            
                            </div>
                            <div class="formRow">
                                <div class="grid3"><label>Graduation Year:</label></div>
                                <div class="grid9" id="profileGraduationYear"></div>
                            </div>
                 </div>
                    </fieldset>
                </form>
                
                
                
            </div>
        </div>




                <div class="widget">
            <div class="whead"><h6>My Past Geo Posts:</h6></div>
            
            <table cellpadding="0" cellspacing="0" width="100%" class="tDefault">
                <thead>
                    <tr>
                        <td>Subject</td>
                        <td>Notes</td>
                        <td>Contact Info</td>
                        <td>Date</td>
                        <td>State Time</td>
                        <td>End Time</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Row 1</td>
                        <td>Row 2</td>
                        <td>Row 3</td>
                        <td>Row 4</td>
                        <td>Row 5</td>
                        <td>Row 5</td>
                    </tr>
                    <tr>
                        <td>Row 1</td>
                        <td>Row 2</td>
                        <td>Row 3</td>
                        <td>Row 4</td>
                        <td>Row 5</td>
                        <td>Row 5</td>
                    </tr>
                    <tr>
                        <td>Row 1</td>
                        <td>Row 2</td>
                        <td>Row 3</td>
                        <td>Row 4</td>
                        <td>Row 5</td>
                        <td>Row 5</td>
                    </tr>
                    <tr>
                        <td>Row 1</td>
                        <td>Row 2</td>
                        <td>Row 3</td>
                        <td>Row 4</td>
                        <td>Row 5</td>
                        <td>Row 5</td>
                    </tr>
                    <tr>
                        <td>Row 1</td>
                        <td>Row 2</td>
                        <td>Row 3</td>
                        <td>Row 4</td>
                        <td>Row 5</td>
                        <td>Row 5</td>
                    </tr>

                </tbody>
            </table>
        </div>
    

        
        
    </div>
    <!-- Main content ends -->
    
</div>
<!-- Content ends -->

</body>
</html>
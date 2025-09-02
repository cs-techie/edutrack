
<?php
session_start();
if(!isset($_SESSION['username']))
{
  header("location:login.php");
}
elseif($_SESSION['usertype']=='student')
{
    header("location:login.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="faculty1.css">
    <title>Document</title>
      <script defer src="faculty.js"></script>

</head>
<body>
    <header>
        <nav>
            <div class="logo">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxPu63BIngm-TO1GIP0t1ONL8tj0Cv08OYZA&s" alt="EduTrack Logo" width="90" height="90">
            </div>
            <ul class="items">
                <li><a href="facass.html">Assignment</a></li>
                <li><a href="update_results.php">Attendence</a></li>
                <li><a href="facres.html">Result</a></li>
                <li><a href="fshcedules.html">Shedules</a></li>
                <li><a href="services.html" target="_blank">Services</a></li>
                <li><a href="about.html">About</a></li>
            </ul>
            <div class="profile-icon">
                <img src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png" alt="Profile Icon" width="50" height="50">
                <div class="profile-dropdown">
                    <!--<p><strong>Profile</strong></p>!-->
                    <p><a href="#profile-settings">Profile</a></p>
                    <p><a href="#EID-settings">EID</a></p>
                    <p><a href="#privacy-settings">Privacy</a></p>
                    <p><a href="#settings">Settings</a></p>
                    <p><strong><a href="#logout">Logout</a></strong></p>
                </div>
            </div>
        </nav>
    </header>
    <section class="b1">
        <div class="slider"></div>
        <div class="notification">
            <marquee>This is a notification</marquee>
        </div>
    </section>
    <main>
        <section id="Entry" class="super-section">
            <h1 id="assign">STUDENT ENTRY</h1>
            <div class="collection">
                <div class="box">
                    <div class="boxcontent">
                      <h2>Assignments</h2>
                      <a href="faculty_upload.php">
                        <div class="boximg">
                            <img src="https://t3.ftcdn.net/jpg/10/14/69/86/360_F_1014698613_vqw76KqH68xRz4GlajZIAb18xrHiLFDY.jpg" alt="Books" height="120" width="100">
                        </div>
                      </a>
                      <a href="faculty_view.php">
                        <button>check submitted assignments</button>
                      </a>
            
                    </div>
                </div>
                <div class="box">
                    <div class="boxcontent">
                        <h2>Attendance</h2>
                      <a href="index.php">
                        <div class="boximg">
                            <img src="https://static.thenounproject.com/png/3649887-200.png" alt="Attendance">
                        </div>
                      </a>
                    </div>
                </div>
                <div class="box">
                    <div class="boxcontent">
                        <h2>Results</h2>
                      <a href="admin.php">
                        <div class="boximg">
                            <img src="https://static.vecteezy.com/system/resources/previews/019/519/658/non_2x/schedule-icon-for-your-website-mobile-presentation-and-logo-design-free-vector.jpg" alt="Results">
                        </div>
                      </a>
                    </div>
                </div>
                <div class="box">
                    <div class="boxcontent">
                        <h2>Schedules</h2>
                      <a href="fschedules.html">
                        <div class="boximg">
                            <img src="https://cdn-icons-png.flaticon.com/512/9913/9913579.png" alt="Schedules">
                        </div>
                      </a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <div class="foot">
            <div class="left">
              <button><a href="about.html">About</a></button>
                    <button onclick="openFeedback()">Feedback</button> <!-- Feedback Button -->

            </div>
            <div class="right">
                <h4>Contact us</h4>
                <p>Email: <a href="mailto:edutrack24@gmail.com">insta@edutrack</a></p>
                <p>Facebook: <a href="https://facebook.com/edutrack24">facebook@edutrack24</a></p>
            </div>
        </div>
    </footer>




<!-- Feedback Form (Initially hidden) -->
<div id="feedback-overlay" onclick="closeFeedback()"></div>

<div id="feedback-form" class="hidden-form">
  <h2>Feedback</h2>
  <button class="close-btn" onclick="closeFeedback()">X</button> <!-- Close Button -->
  <form>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required><br>

    <label for="gender">Gender:</label>
    <select id="gender" name="gender">
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select><br>

    <label for="feedback">Feedback:</label>
    <textarea id="feedback" name="feedback" rows="4" required></textarea><br>

    <button type="submit">Submit</button>
  </form>
</div>
</body>
</html>
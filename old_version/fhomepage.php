<?php
session_start();
if(!isset($_SESSION['username']))
{
  header("location:login.php");
}
elseif($_SESSION['usertype']=='admin')
{
    header("location:login.php");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="EduTrack - Enhance student engagement with interactive assignments and quizzes.">
    <meta name="keywords" content="EduTrack, assignments, student engagement, LMS">
    <title>EduTrack - Academics</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="fhomepage.css">
    <script defer src="fhomepage1.js"></script>
  <!-- For interactive elements -->

  </head>
<body>
    <!-- Header with profile icon -->
    <header>
        <nav>
            <div class="logo">
              <a href="fhomepage.php>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxPu63BIngm-TO1GIP0t1ONL8tj0Cv08OYZA&s" alt="EduTrack Logo" width="90" height="90">
              </a>
            </div>
            <ul class="items">
                <li><a href="#academics">Academics</a></li>
                <li><a href="services.html" target="_blank">Services</a></li>
                <li><a href="about.html">About</a></li>
            </ul>
            <div class="profile-icon">
                <img src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png" alt="Profile Icon" width="50" height="50">
                <div class="profile-dropdown">
                    <!--<p><strong>Profile</strong></p>!-->
                    <p><a href="resume.html">Profile</a></p>
                    <!-- <p><a href="#rank-settings">Rank</a></p>
                    <p><a href="#privacy-settings">Privacy</a></p>
                    <p><a href="#settings">Settings</a></p> -->
                    <p><strong><a href="logout.php">Logout</a></strong></p>
                </div>
            </div>
        </nav>
    </header>

    <!-- EDUTRACK Sliding Button and Notification -->
    <section class="scrolling-ad">
        <button id="prev-ad">&#9664;</button>
        <div class="ad-content">
            <h2 class="slide-title">EDU<i class="fa-solid fa-book-open-reader"></i>TRACK</h2>
        </div>
        <button id="next-ad">&#9654;</button>
    </section>

    <!-- Scrolling Notification -->
    <div class="notification-scrolling">
        <marquee>This is a scrolling notification! Stay tuned for updates.</marquee>
    </div>

    <!-- ACADEMICS Section -->
    <main>
        <section id="academics" class="super-section">
            <h1 id="acad">ACADEMICS</h1>
            <div class="collection">
                <!-- Subsection 1: Assignments -->
                <div class="box">
                    <div class="boxcontent">
                        <h2>Assignments</h2>
                      <a href="student_submit.php">
                        <div class="boximg">
                            <img src="https://t3.ftcdn.net/jpg/10/14/69/86/360_F_1014698613_vqw76KqH68xRz4GlajZIAb18xrHiLFDY.jpg" alt="Assignments" width="100" height="100">
                        </div>
                      </a>
                    </div>
                </div>
                <!-- Subsection 2: Attendance -->
                <div class="box">
                    <div class="boxcontent">
                        <h2>Attendance</h2>
                      <a href="index.php">
                        <div class="boximg">
                            <img src="https://static.thenounproject.com/png/3649887-200.png" alt="Attendance" width="100" height="100">
                        </div>
                      </a>
                    </div>
                </div>
                <!-- Subsection 3: Results -->
                <div class="box">
                    <div class="boxcontent">
                        <h2>Results</h2>
                      <a href="login.php">
                        <div class="boximg">
                            <img src="https://static.vecteezy.com/system/resources/previews/019/519/658/non_2x/schedule-icon-for-your-website-mobile-presentation-and-logo-design-free-vector.jpg" alt="Results" width="100" height="100">
                        </div>
                      </a>
                    </div>
                </div>
                <!-- Subsection 4: Schedules -->
                <div class="box">
                    <div class="boxcontent">
                        <h2>Schedules</h2>
                      <a href="fsschedules.html"><div class="boximg">
                            <img src="https://cdn-icons-png.flaticon.com/512/9913/9913579.png" alt="Schedules" width="100" height="100">
                  </div></a>
                    </div>
                </div>
                <!-- Subsection 5: Certificates -->
                <div class="box">
                    <div class="boxcontent">
                       <h2>Certificates</h2>
                        <div class="boximg">
                          <a href="display.html">
                            <img src="https://icons.veryicon.com/png/o/miscellaneous/cloud-his-icon/35-personal-information.png" alt="Certificates" width="100" height="100">
                            </a>
                        </div>
                      
                    </div>
                </div>
                <!-- Subsection 6: References -->
                <div class="box">
                    <div class="boxcontent">
                        <h2>References</h2>
                          <a href="links.html">
                            <div class="boximg">
                              <img src="https://www.shutterstock.com/shutterstock/photos/1519946174/display_1500/stock-vector-reference-icon-in-trendy-flat-style-recommendation-symbol-for-your-web-site-design-logo-app-ui-1519946174.jpg" alt="References" width="100" height="100">
                            </div>
                          </a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer with About and Feedback Buttons -->
<footer>
  <div class="footer-container">
    <div class="footer-left">
      <h3>About</h3>
      <button><a href="about.html">About Us</a></button>
      <button onclick="openFeedback()">Feedback</button> <!-- Feedback Button -->
    </div>

    <div class="footer-center">
      <h3>Services</h3>
      <ul>
        <li><a href="#academics">Academics</a></li>
        <li><a href="#quizzes">Quizzes</a></li>
        <li><a href="#assignments">Assignments</a></li>
      </ul>
    </div>

    <div class="footer-right">
      <h3>Contact Us</h3>
      <ul>
        <li><a href="mailto:edutrack24@gmail.com" target="_blank">Email</a></li>
        <li><a href="https://facebook.com" target="_blank">Facebook</a></li>
        <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
      </ul>
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
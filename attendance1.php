
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Attendance</title>
  <link rel="stylesheet" href="attendance1.css">
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="title">EDUTRACK</span>
    </div>
    
    <div class="content">
      <div class="tag-cloud">
        <span>Attendance</span>
        <span>Certificates</span>
        <span>Almanac</span>
        <span>Communications</span>
        <span>Evaluations</span>
        <span>Courses</span>
        <span>Library</span>
        <span>Staff Management</span>
        <span>Admissions</span>
        <span>Fees and Scholarships</span>
      </div>

      <div class="login-box">
        <h2>Sign in</h2>
        <form id="loginForm" action="login_check1.php" method="post" class="login post">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required>
          
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required>
          <a href="attendance2.html">       
            SUBMIT
          </a>
        </form>
        <a href="#" class="forgot-password">Forgot your password?</a>
      </div>
    </div>

    <div class="footer">
      <p>©2024 Supported by <a href="https://edutrack.com">edutrack.com</a></p>
    </div>
  </div>

  <script src="attendance1.js"></script>
</body>
</html>

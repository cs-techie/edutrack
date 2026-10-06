<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
            display: flex;
            display: flex;
            justify-content: center;
            align-items: center;
            height:100vh;
            flex-direction: column;

            overflow-y: scroll;
            display: flex;


        }
        .login-container {
            background-color: white;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            padding: 30px;
            width: 300px;
            margin-top: 50px;
            transition: all 0.5s ease-in-out;
        }
        h2 {
            text-align: center;
            margin-bottom: 20px;
        }
        label {
            font-size: 14px;
            margin: 5px 0;
            display: block;
        }
        input[type="text"], input[type="password"] {
            width: 100%;
            padding: 10px;
            margin: 10px 0 20px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }
        input[type="submit"] {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 4px;
            width: 100%;
            font-size: 16px;
            cursor: pointer;
        }
        input[type="submit"]:hover {
            background-color: #45a049;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group h3 {
            text-align: center;
            font-size: 18px;
        }
        /* Hide Faculty Login Form initially */
        #facultyLogin {
            display: none;
        }
    </style>
    <script>
        // Function to show Faculty Login when the button is clicked
        function showFacultyLogin() {
            document.getElementById('studentLogin').style.display = 'none';  // Hide Student Login
            document.getElementById('facultyLogin').style.display = 'block'; // Show Faculty Login
        }

        // Form validation for Student Login
        function validateLoginForm() {
            var username = document.forms["studentForm"]["username"].value;
            var password = document.forms["studentForm"]["password"].value;
            if (username == "" || password == "") {
                alert("Both fields must be filled out for Student login.");
                return false;
            }
            return true;
        }

        // Form validation for Faculty Login
        function validateFacultyLoginForm() {
            var facultyID = document.forms["facultyForm"]["faculty_id"].value;
            var password = document.forms["facultyForm"]["password"].value;
            if (facultyID == "" || password == "") {
                alert("Both fields must be filled out for Faculty login.");
                return false;
            }
            return true;
        }
    </script>
</head>
<body>

    <!-- Student Login Form -->
    <div class="login-container" id="studentLogin">
        <div class="form-group">
            <h3>Student Login</h3>
            <form name="studentForm" action="student_login.php" method="post" onsubmit="return validateLoginForm()">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
                <input type="submit" value="Login as Student">
            </form>
        </div>

        <div class="form-group">
            <!-- Button to show Faculty Login Form -->
            <button onclick="showFacultyLogin()" style="background-color: #4CAF50; color: white; padding: 10px; width: 100%; border-radius: 4px; font-size: 16px;">Show Faculty Login</button>
        </div>
    </div>

    <!-- Faculty Login Form (Initially hidden) -->
    <div class="login-container" id="facultyLogin">
        <div class="form-group">
            <h3>Faculty Login</h3>
            <form name="facultyForm" action="faculty_login.php" method="post" onsubmit="return validateFacultyLoginForm()">
                <label for="faculty_id">Faculty ID:</label>
                <input type="text" id="faculty_id" name="faculty_id" required>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
                <input type="submit" value="Login as Faculty">
            </form>
        </div>
    </div>

</body>
</html>
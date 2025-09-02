<?php 
session_start(); 

// Redirect to index.php if user is already logged in
if (isset($_SESSION["user"])) {     
    header("Location: index.php");     
    exit(); // Stop further script execution after redirection
} 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

<div class="form-group">
    <header>
        <nav>
            <div class="logo">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxPu63BIngm-TO1GIP0t1ONL8tj0Cv08OYZA&s" alt="EduTrack Logo" width="90" height="90">
            </div>
            <ul class="items">
                <li><a href="#academics">Academics</a></li>
                <li><a href="services.html" target="_blank">Services</a></li>
                <li><a href="about.html">About</a></li>
            </ul>
        </nav>
    </header>

    <div class="container">
        <form action="login_check2.php" method="post" class="login post">
            <div class="form-group">
                <h4>
                    <?php
                    // Output any session messages (e.g., login failure)
                    if (isset($_SESSION['loginMessage'])) {
                        echo htmlspecialchars($_SESSION['loginMessage']); // Sanitize output
                        unset($_SESSION['loginMessage']); // Clear message after displaying
                    }
                    ?>
                </h4>
                <input type="text" placeholder="Enter Username" name="username" class="label_deg" required>
            </div>

            <div class="form-group">
                <input type="password" placeholder="Enter Password" name="password" class="label_deg" required>
            </div>
            
            <br><br>

            <center>
                <input type="submit" value="Login" name="login" class="btn btn-primary">
            </center>
        </form>
    </div>
</div>

</body>
</html>

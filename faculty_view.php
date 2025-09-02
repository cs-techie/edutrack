<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "edu_track";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query = "SELECT * FROM student_assignments";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    echo "<h1>Student Assignments</h1>";
    while ($row = mysqli_fetch_assoc($result)) {
        echo "<h3>Student Name: " . $row['student_name'] . "</h3>";
        echo "<p>Subject: " . $row['subject'] . "</p>";
        echo "<p>Submitted at: " . $row['submitted_at'] . "</p>";
        echo "<a href='" . $row['file_url'] . "' target='_blank'>Download Assignment</a><br><br>";
    }
} else {
    echo "No student assignments available.";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Faculty view</title>
    <link rel="stylesheet" href="faculty_viewfinal.css">
</head>
<body>
    
</body>
</html>  
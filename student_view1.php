<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "edu_track"; // Your database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve all assignments with their file URLs
$query = "SELECT * FROM assignments";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    echo "<h1>Assignments</h1>";
    while ($row = mysqli_fetch_assoc($result)) {
        echo "<h3>Subject: " . $row['subject'] . "</h3>";
        echo "<a href='" . $row['file_url'] . "' target='_blank'>Download Assignment</a><br><br>";
    }
} else {
    echo "No assignments available.";
}
?>

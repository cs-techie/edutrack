<?php
session_start();
include 'config.php';

if (!isset($_SESSION['faculty_id'])) {
    echo "You need to log in as faculty to post assignments.";
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $faculty_id = $_SESSION['faculty_id'];
    $subject = $_POST['subject'];
    $due_date = $_POST['due_date'];
    $description = $_POST['description'];

    $sql = "INSERT INTO assignments (faculty_id, subject, due_date, description)
            VALUES ('$faculty_id', '$subject', '$due_date', '$description')";

    if ($conn->query($sql) === TRUE) {
        echo "Assignment posted successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Post Assignment</title>
    <style>
        /* Add your CSS for styling the form here */
    </style>
</head>
<body>

<h2>Post Assignment</h2>

<form method="POST">
    Subject: <input type="text" name="subject" required><br><br>
    Due Date: <input type="date" name="due_date" required><br><br>
    Description: <textarea name="description" rows="5" required></textarea><br><br>
    <input type="submit" value="Post Assignment">
</form>

</body>
</html>
<?php
session_start();
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $faculty_id = $_POST['faculty_id'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM faculty WHERE faculty_id = '$faculty_id' AND password = '$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $faculty = $result->fetch_assoc();
        $_SESSION['faculty_id'] = $faculty['faculty_id'];
        $_SESSION['subject'] = $faculty['subject'];
        header("Location: mark_attendance.php");
    } else {
        echo "Invalid login credentials!";
    }
}
?>
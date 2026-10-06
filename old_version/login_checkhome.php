<?php

error_reporting(E_ALL);
session_start();
$host = "localhost";
$user = "root";
$password = "";
$db = "login_register";

$data = mysqli_connect($host, $user, $password, $db);

if ($data == false) {
    die("Connection error");
}

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $name = $_POST['username'];
    $pass = $_POST['password'];

    // Prepare and execute the SQL statement
    $stmt = $data->prepare("SELECT * FROM user WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $name, $pass);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    if ($row) {
        // Store username and usertype in session
        $_SESSION['username'] = $name;
        $_SESSION['usertype'] = $row['usertype']; // Store usertype dynamically

        // Redirect based on usertype or to a general homepage
        switch ($row['usertype']) {
            case "student":
                header("location: fhomepage.php");
                break;
            case "admin":
                header("location: faculty1.php");
                break;
            default:
                header("location: loginhome.php"); // Redirect for other types
                break;
        }
        exit();
    } else {
        $message = "Username or password do not match";
        $_SESSION['loginMessage'] = $message;
        header("location:loginhome.php");
        exit();
    }
}
?>

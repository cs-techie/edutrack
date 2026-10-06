<?php

error_reporting(E_ALL); // Enable error reporting for all types of errors
session_start();

// Database connection parameters
$host = "localhost";
$user = "root";
$password = "";
$db = "edutrack";

// Establish database connection
$data = mysqli_connect($host, $user, $password, $db);

// Check for connection errors
if (!$data) {
    die("Connection failed: " . mysqli_connect_error());
}

// Check if the form has been submitted
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    // Retrieve the user input from the form
    $name = $_POST['username'];
    $pass = $_POST['password'];

    // Prepare the SQL statement to prevent SQL injection
    $stmt = $data->prepare("SELECT * FROM students WHERE username = ? AND password = ?");
    
    // Check if prepare() failed
    if ($stmt === false) {
        die('MySQL prepare error: ' . $data->error);
    }

    // Bind the parameters to the prepared statement
    if (!$stmt->bind_param("ss", $name, $pass)) {
        die('Error binding parameters: ' . $stmt->error);
    }

    // Execute the query
    if (!$stmt->execute()) {
        die('Error executing query: ' . $stmt->error);
    }

    // Get the result
    $result = $stmt->get_result();

    // Check if a matching user was found
    $row = $result->fetch_assoc();
    if ($row) {
        // Store the username and usertype in the session
        $_SESSION['username'] = $name;
        $_SESSION['usertype'] = $row['usertype']; // Store usertype dynamically

        // Redirect based on usertype
        switch ($row['usertype']) {
            case "student":
                header("location: student.php");
                break;
            case "admin":
                header("location: admin.php");
                break;
            default:
                header("location: login.php"); // Redirect for other types
                break;
        }
        exit(); // Ensure the script stops execution after the redirect
    } else {
        // If no user was found, show an error message
        $message = "Username or password do not match";
        $_SESSION['loginMessage'] = $message;
        header("location: login.php");
        exit(); // Ensure the script stops execution after redirecting
    }
}

?>

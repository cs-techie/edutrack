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

// If form is submitted and file is uploaded
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['studentAssignment'])) {
    // Check if student_name is provided
    if (isset($_POST['student_name'])) {
        $studentName = $_POST['student_name'];
    } else {
        echo "Student name not provided.";
        exit;
    }

    $file = $_FILES['studentAssignment'];

    // Store the file in the uploads directory
    $filePath = 'uploads/' . basename($file['name']);
    if (move_uploaded_file($file['tmp_name'], $filePath)) {
        // Get the URL of the file
        $fileUrl = "http://localhost/loginsystem/uploads/" . basename($file['name']);
        
        // Get the subject from the form
        $subject = $_POST['subject'];

        // Insert into database
        $query = "INSERT INTO student_assignments (student_name, subject, file_url) VALUES ('$studentName', '$subject', '$fileUrl')";
        if ($conn->query($query) === TRUE) {
            // Display success message and uploaded file URL
            $message = "Assignment submitted successfully!";
            $uploadedFile = $fileUrl;
        } else {
            $message = "Error: " . $conn->error;
        }
    } else {
        $message = "Failed to upload file.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Assignment Submission</title>
    <link rel="stylesheet" href="student_submit.css"> <!-- Link to the CSS file -->
</head>
<body>
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

    <h1>Submit Your Assignment</h1>
    <form action="student_submit.php" method="post" enctype="multipart/form-data">
        <label for="studentName">Your Name:</label>
        <input type="text" name="student_name" id="studentName" required><br><br>

        <label for="subject">Subject:</label>
        <select name="subject" id="subject" required>
            <option value="C">C</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
        </select><br><br>

        <label for="studentAssignment">Upload Assignment (PDF only):</label>
        <input type="file" name="studentAssignment" id="studentAssignment" accept=".pdf" required><br><br>

        <button type="submit">Submit Assignment</button>
    </form>

    <?php if (isset($message)) { echo "<p>$message</p>"; } ?>

    <?php if (isset($uploadedFile)) { ?>
        <h2>Your Submitted Assignment:</h2>
        <p><a href="<?php echo $uploadedFile; ?>" target="_blank">Click here to view/download your assignment</a></p>
    <?php } ?>
</body>
</html>

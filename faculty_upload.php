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
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['assignmentFile'])) {
    // Assume file is uploaded to a cloud storage (Amazon S3)
    $file = $_FILES['assignmentFile'];
    
    // For demonstration, the uploaded file will be saved to a server folder (in reality, you should upload to a cloud service)
    $filePath = 'uploads/' . basename($file['name']);
    move_uploaded_file($file['tmp_name'], $filePath);
    
    // Get the URL of the file (this should be the cloud URL, for now, it's the server path)
    $fileUrl = "http://localhost/loginsystem/uploads/" . basename($file['name']);

    // Insert the file URL into the database
    $subject = $_POST['subject'];
    $query = "INSERT INTO assignments (subject, file_url) VALUES ('$subject', '$fileUrl')";
    
    if ($conn->query($query) === TRUE) {
        echo "File uploaded successfully. URL: " . $fileUrl;
    } else {
        echo "Error: " . $conn->error;
    }
}
?>

<!-- HTML form to upload a file -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Faculty Upload Assignment</title>
</head>
<body>
    <h1>Upload Assignment</h1>
    <form action="faculty_upload.php" method="post" enctype="multipart/form-data">
        <label for="subject">Subject:</label>
        <select name="subject" id="subject">
            <option value="C">C</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
        </select><br><br>

        <label for="assignmentFile">Upload Assignment File (PDF only):</label>
        <input type="file" name="assignmentFile" id="assignmentFile" accept=".pdf" required><br><br>
        
        <button type="submit">Upload Assignment</button>
    </form>
</body>
</html>

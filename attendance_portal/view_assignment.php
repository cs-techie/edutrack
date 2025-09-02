<?php
session_start();
include 'config.php';

if (!isset($_SESSION['student_id'])) {
    echo "You need to log in as a student to view and submit assignments.";
    exit;
}

$student_id = $_SESSION['student_id'];

// Fetch all assignments for the student
$sql_assignments = "SELECT * FROM assignments WHERE subject IN (SELECT subject FROM enrollment WHERE student_id = $student_id)";
$result_assignments = $conn->query($sql_assignments);

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES['assignment_file'])) {
    // Handle file upload
    $assignment_id = $_POST['assignment_id'];
    $submission_text = $_POST['submission_text'];

    // Handle file upload (file)
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["assignment_file"]["name"]);
    move_uploaded_file($_FILES["assignment_file"]["tmp_name"], $target_file);

    // Insert the submission into the database
    $sql_submission = "INSERT INTO submissions (assignment_id, student_id, submission_text, submission_file) 
                       VALUES ('$assignment_id', '$student_id', '$submission_text', '$target_file')";
    if ($conn->query($sql_submission) === TRUE) {
        echo "Assignment submitted successfully!";
    } else {
        echo "Error: " . $sql_submission . "<br>" . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View and Submit Assignment</title>
    <style>
        /* Add your CSS for styling the assignments page */
    </style>
</head>
<body>

<h2>Your Assignments</h2>

<?php
if ($result_assignments->num_rows > 0) {
    while ($row = $result_assignments->fetch_assoc()) {
        echo "<h3>" . $row['subject'] . " - Due: " . $row['due_date'] . "</h3>";
        echo "<p>" . $row['description'] . "</p>";
        ?>

        <form method="POST" enctype="multipart/form-data">
            <input type="hidden" name="assignment_id" value="<?php echo $row['assignment_id']; ?>">
            <textarea name="submission_text" rows="5" placeholder="Write your assignment here..."></textarea><br><br>
            <input type="file" name="assignment_file"><br><br>
            <input type="submit" value="Submit Assignment">
        </form>

        <hr>

        <?php
    }
} else {
    echo "No assignments available.";
}
?>

</body>
</html>
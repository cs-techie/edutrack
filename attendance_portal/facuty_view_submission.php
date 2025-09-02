<?php
session_start();
include 'config.php';

if (!isset($_SESSION['faculty_id'])) {
    echo "You need to log in as faculty to view student submissions.";
    exit;
}

$faculty_id = $_SESSION['faculty_id'];

// Fetch assignments posted by the faculty
$sql_assignments = "SELECT * FROM assignments WHERE faculty_id = $faculty_id";
$result_assignments = $conn->query($sql_assignments);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Submissions</title>
</head>
<body>

<h2>Your Assignments and Submissions</h2>

<?php
if ($result_assignments->num_rows > 0) {
    while ($row = $result_assignments->fetch_assoc()) {
        echo "<h3>" . $row['subject'] . " - Due: " . $row['due_date'] . "</h3>";
        echo "<p>" . $row['description'] . "</p>";

        // Fetch the submissions for this assignment
        $assignment_id = $row['assignment_id'];
        $sql_submissions = "SELECT * FROM submissions WHERE assignment_id = $assignment_id";
        $result_submissions = $conn->query($sql_submissions);

        if ($result_submissions->num_rows > 0) {
            while ($submission = $result_submissions->fetch_assoc()) {
                echo "<p>Student ID: " . $submission['student_id'] . "</p>";
                echo "<p>Submission Text: " . $submission['submission_text'] . "</p>";
                if ($submission['submission_file']) {
                    echo "<p>File: <a href='" . $submission['submission_file'] . "' target='_blank'>View File</a></p>";
                }
                echo "<hr>";
            }
        } else {
            echo "<p>No submissions for this assignment.</p>";
        }
    }
} else {
    echo "No assignments posted by you.";
}
?>

</body>
</html>
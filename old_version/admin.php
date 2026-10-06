<?php
include 'database.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $subject = $_POST['subject'];
    $marks = $_POST['marks'];

    // Check if the record already exists
    $stmt = $pdo->prepare("SELECT * FROM results WHERE username = :username AND subject = :subject");
    $stmt->execute(['username' => $username, 'subject' => $subject]);
    $existingRecord = $stmt->fetch();

    if ($existingRecord) {
        // Update existing record
        $stmt = $pdo->prepare("UPDATE results SET marks = :marks WHERE username = :username AND subject = :subject");
        $stmt->execute(['marks' => $marks, 'username' => $username, 'subject' => $subject]);
        echo "Result updated successfully.";
    } else {
        // Insert new record
        $stmt = $pdo->prepare("INSERT INTO results (username, subject, marks) VALUES (:username, :subject, :marks)");
        $stmt->execute(['username' => $username, 'subject' => $subject, 'marks' => $marks]);
        echo "Result added successfully.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin - Manage Results</title>
    <link rel="stylesheet" href="adminstyling.css">
</head>
<body>
    <header>Manage Student Results</header>
    <center>
        <div class="container">
            <form action="admin.php" method="POST">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required><br><br>

                <label for="subject">Subject:</label>
                <input type="text" id="subject" name="subject" required><br><br>

                <label for="marks">Marks:</label>
                <input type="number" id="marks" name="marks" required><br><br>

                <button type="submit">Submit</button>
            </form>
        </div>
    <center>
</body>
</html>

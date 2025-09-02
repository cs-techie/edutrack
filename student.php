<?php
session_start();
include 'database.php';

// Check if the student is logged in
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

// Get the logged-in student's username
$username = $_SESSION['username'];

// Fetch results for the student
$stmt = $pdo->prepare("SELECT subject, marks FROM results WHERE username = :username");
$stmt->execute(['username' => $username]);
$results = $stmt->fetchAll();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Student - View Results</title>
    <link rel="stylesheet" href="styling.css">
</head>
<body>
    <header>Results</header>
    <div class="container">
        <h2>View Results</h2>
        <h3>Results for <?php echo htmlspecialchars($username); ?></h3>

        <?php if (!empty($results)): ?>
            <table border="1">
                <tr>
                    <th>Subject</th>
                    <th>Marks</th>
                </tr>
                <?php foreach ($results as $result): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($result['subject']); ?></td>
                        <td><?php echo htmlspecialchars($result['marks']); ?></td>
                    </tr>
                <?php endforeach; ?>
            </table>
        <?php else: ?>
            <p>No results found.</p>
        <?php endif; ?>
    </div>
</body>
</html>

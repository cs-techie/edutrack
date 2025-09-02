<?php
include 'config.php';

$student_id = 1; // Hardcoded for example; ideally, this would be dynamic or based on session.

$sql = "SELECT date, status FROM attendance WHERE student_id = $student_id";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Student Attendance</title>
</head>
<body>
    <h1>Your Attendance</h1>
    <table border="1">
        <tr>
            <th>Date</th>
            <th>Status</th>
        </tr>
        <?php
        while ($row = $result->fetch_assoc()) {
            echo "<tr>
                    <td>{$row['date']}</td>
                    <td>{$row['status']}</td>
                  </tr>";
        }
        ?>
    </table>
</body>
</html>
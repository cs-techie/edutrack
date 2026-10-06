<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $date = $_POST['date'];
    $faculty_id = $_POST['faculty_id'];
    
    foreach ($_POST['attendance'] as $student_id => $status) {
        $sql = "INSERT INTO attendance (student_id, faculty_id, date, status) 
                VALUES ($student_id, $faculty_id, '$date', '$status')";
        $conn->query($sql);
    }
    echo "Attendance marked successfully!";
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Faculty Dashboard</title>
</head>
<body>
    <h1>Mark Attendance</h1>
    <form method="post">
        <input type="hidden" name="faculty_id" value="1"> <!-- Hardcoded for example -->
        Date: <input type="date" name="date" required><br><br>
        
        <table border="1">
            <tr>
                <th>Roll Number</th>
                <th>Name</th>
                <th>Present</th>
                <th>Absent</th>
            </tr>
            <?php
            $result = $conn->query("SELECT * FROM students");
            while ($row = $result->fetch_assoc()) {
                echo "<tr>
                        <td>{$row['roll_number']}</td>
                        <td>{$row['student_name']}</td>
                        <td><input type='radio' name='attendance[{$row['student_id']}]' value='Present' required></td>
                        <td><input type='radio' name='attendance[{$row['student_id']}]' value='Absent'></td>
                      </tr>";
            }
            ?>
        </table>
        <br>
        <input type="submit" value="Submit Attendance">
    </form>
</body>
</html>
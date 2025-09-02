<?php
session_start();
include 'config.php';

if (!isset($_SESSION['student_id'])) {
    echo "You need to log in to view attendance.";
    exit;
}

$student_id = $_SESSION['student_id'];

// Fetch the student details (name and roll number)
$sql_student_details = "SELECT student_name, roll_number FROM students WHERE student_id = $student_id";
$result_student = $conn->query($sql_student_details);
$student = $result_student->fetch_assoc();

// Fetch all unique subjects
$sql_subjects = "SELECT DISTINCT subject FROM attendance WHERE student_id = $student_id";
$result_subjects = $conn->query($sql_subjects);
$subjects = [];
while ($row = $result_subjects->fetch_assoc()) {
    $subjects[] = $row['subject'];
}

// Fetch all attendance records for the student
$sql_attendance = "SELECT subject, date, status FROM attendance WHERE student_id = $student_id ORDER BY date DESC";
$result_attendance = $conn->query($sql_attendance);

// Organize attendance data by date and subject
$attendance_data = [];
while ($row = $result_attendance->fetch_assoc()) {
    $attendance_data[$row['date']][$row['subject']] = $row['status'];
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Attendance</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .attendance-container {
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            width: 80%;
            max-width: 800px;
        }

        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 20px;
        }

        .student-details {
            background-color: #f1f1f1;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
        }

        .student-details h2 {
            margin: 0;
            font-size: 20px;
        }

        .student-details p {
            margin: 5px 0;
        }

        table {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
        }

        th, td {
            padding: 12px;
            text-align: center;
            border: 1px solid #ddd;
        }

        th {
            background-color: #f1f1f1;
        }

        .no-records {
            text-align: center;
            color: #888;
            font-style: italic;
        }

        .attendance-container button {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            width: 100%;
            margin-top: 20px;
        }

        .attendance-container button:hover {
            background-color: #45a049;
        }

    </style>
</head>
<body>

    <div class="attendance-container">
        <h1>Your Attendance Record</h1>

        <!-- Display Student Details -->
        <div class="student-details">
            <h2>Student Name: <?php echo $student['student_name']; ?></h2>
            <p><strong>Roll Number:</strong> <?php echo $student['roll_number']; ?></p>
        </div>

        <!-- Attendance Table -->
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <?php foreach ($subjects as $subject) { ?>
                        <th><?php echo $subject; ?></th>
                    <?php } ?>
                </tr>
            </thead>
            <tbody>
                <?php
                if (count($attendance_data) > 0) {
                    foreach ($attendance_data as $date => $subjects_attended) {
                        // Start a new row for each date
                        echo "<tr><td>{$date}</td>";
                        
                        // For each subject, display the status (e.g., Present, Absent, etc.)
                        foreach ($subjects as $subject) {
                            $status = isset($subjects_attended[$subject]) ? $subjects_attended[$subject] : "Not Marked";
                            echo "<td>{$status}</td>";
                        }

                        echo "</tr>";
                    }
                } else {
                    echo "<tr><td colspan='" . (count($subjects) + 1) . "' class='no-records'>No attendance records found</td></tr>";
                }
                ?>
            </tbody>
        </table>

        <button onclick="window.location.href='index.php'">Go Back</button>
    </div>

</body>
</html>

<?php
$conn->close();
?>
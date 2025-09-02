<?php
session_start();
include 'config.php';

if (!isset($_SESSION['faculty_id'])) {
    echo "You need to log in to mark attendance.";
    exit;
}

$faculty_id = $_SESSION['faculty_id'];
$subject = $_SESSION['subject'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $date = $_POST['date'];

    foreach ($_POST['attendance'] as $student_id => $status) {
        $sql = "REPLACE INTO attendance (student_id, faculty_id, subject, date, status) 
                VALUES ($student_id, $faculty_id, '$subject', '$date', '$status')";
        $conn->query($sql);
    }
    echo "<script>alert('Attendance updated successfully!');</script>";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mark Attendance</title>
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

        form {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        .form-group {
            margin-bottom: 15px;
        }

        label {
            font-weight: bold;
        }

        input[type="date"] {
            padding: 8px;
            margin: 5px;
            width: 200px;
            border: 1px solid #ccc;
            border-radius: 4px;
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

        input[type="radio"] {
            margin: 0 10px;
        }

        input[type="submit"] {
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

        input[type="submit"]:hover {
            background-color: #45a049;
        }

        .error {
            color: red;
            font-size: 14px;
            margin-top: 10px;
        }
    </style>
    <script>
        // Form validation to ensure each student has an attendance status (Present or Absent)
        function validateAttendanceForm() {
            const radios = document.querySelectorAll('input[type="radio"]');
            let isValid = true;

            radios.forEach(radio => {
                const name = radio.name;
                const isChecked = document.querySelector(input[name="${name}"]:checked);
                if (!isChecked) {
                    isValid = false;
                    alert(Please mark attendance (Present/Absent) for all students.);
                    return false;
                }
            });

            return isValid;
        }
    </script>
</head>
<body>

    <div class="attendance-container">
        <h1>Mark Attendance for <?php echo $subject; ?></h1>

        <form method="post" onsubmit="return validateAttendanceForm()">
            <div class="form-group">
                <label for="date">Date:</label>
                <input type="date" id="date" name="date" required>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Roll Number</th>
                        <th>Name</th>
                        <th>Present</th>
                        <th>Absent</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $result = $conn->query("SELECT * FROM students");
                    while ($row = $result->fetch_assoc()) {
                        echo "<tr>
                                <td>{$row['roll_number']}</td>
                                <td>{$row['student_name']}</td>
                                <td><input type='radio' name='attendance[{$row['student_id']}]' value='Present'></td>
                                <td><input type='radio' name='attendance[{$row['student_id']}]' value='Absent'></td>
                              </tr>";
                    }
                    ?>
                </tbody>
            </table>

            <input type="submit" value="Submit Attendance">
        </form>
    </div>

</body>
</html>
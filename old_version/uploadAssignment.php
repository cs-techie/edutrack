<?php
// Check if file is uploaded
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file'])) {
    // Directory to store uploaded files
    $uploadDir = 'uploads/';

    // Create the directory if it does not exist
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Get file details
    $file = $_FILES['file'];
    $fileName = basename($file['name']);
    $fileTmpName = $file['tmp_name'];
    $fileSize = $file['size'];
    $fileError = $file['error'];
    $fileType = $file['type'];

    // Allow certain file formats (for security purposes)
    $allowedTypes = ['application/pdf'];
    if (!in_array($fileType, $allowedTypes)) {
        echo json_encode(['success' => false, 'message' => 'Invalid file type']);
        exit;
    }

    // Move file to upload directory
    $fileDestination = $uploadDir . $fileName;
    if (move_uploaded_file($fileTmpName, $fileDestination)) {
        echo json_encode(['success' => true, 'filePath' => $fileDestination]);
    } else {
        echo json_encode(['success' => false, 'message' => 'File upload failed']);
    }
}
?>

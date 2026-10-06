<?php
// Directory containing uploaded files
$uploadDir = 'uploads/';

// Check if the directory exists
if (is_dir($uploadDir)) {
    // Get all files in the directory
    $files = array_diff(scandir($uploadDir), array('..', '.')); // Remove "." and ".." entries

    // Return the list of files as JSON
    echo json_encode(['files' => $files]);
} else {
    echo json_encode(['files' => []]);
}
?>

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

// Setup for file uploads
const upload = multer({ dest: 'uploads/' });
app.use('/uploads', express.static('uploads')); // Serve files from 'uploads' folder

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST endpoint for file upload (from both student and faculty)
app.post('/uploadAssignment', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Save file details in a database (simulated here as a local file move)
    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    
    // Renaming file (optional)
    fs.rename(req.file.path, filePath, (err) => {
        if (err) return res.status(500).json({ success: false, message: 'Error saving file' });

        // Simulate saving file to DB (return success)
        res.json({ success: true, filePath: `/uploads/${req.file.filename}` });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

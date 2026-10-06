const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');
const { protect, authorize } = require('../middleware/auth');

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// POST /api/assignments/upload - Faculty assignment file upload
router.post('/upload', protect, authorize('faculty', 'admin'), upload.single('assignmentFile'), async (req, res) => {
  try {
    const { subject, title, description, dueDate } = req.body;

    if (!subject) {
      return res.status(400).json({ message: 'Subject is required' });
    }

    let fileUrl = '';
    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
    }

    const newAssignment = new Assignment({
      facultyId: req.session.user.id,
      facultyName: req.session.user.name || req.session.user.username,
      subject,
      title: title || `${subject} Assignment`,
      description: description || '',
      fileUrl,
      dueDate: dueDate ? new Date(dueDate) : null
    });

    await newAssignment.save();

    res.status(201).json({
      message: 'File uploaded successfully.',
      fileUrl,
      assignment: newAssignment
    });
  } catch (err) {
    console.error('Error uploading assignment:', err);
    res.status(500).json({ message: 'Server error uploading assignment' });
  }
});

// GET /api/assignments - List all posted assignments
router.get('/', protect, async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json(assignments);
  } catch (err) {
    console.error('Error fetching assignments:', err);
    res.status(500).json({ message: 'Server error fetching assignments' });
  }
});

// POST /api/assignments/submit - Student assignment solution submission
router.post('/submit', protect, authorize('student', 'admin'), upload.single('studentAssignment'), async (req, res) => {
  try {
    const { student_name, subject, submissionText, assignmentId } = req.body;
    const studentName = student_name || req.session.user.name || req.session.user.username;

    if (!subject) {
      return res.status(400).json({ message: 'Subject is required' });
    }

    let fileUrl = '';
    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
    }

    const newSubmission = new Submission({
      assignmentId: assignmentId || null,
      studentId: req.session.user.id,
      studentName,
      subject,
      fileUrl,
      submissionText: submissionText || ''
    });

    await newSubmission.save();

    res.status(201).json({
      message: 'Assignment submitted successfully!',
      fileUrl,
      submission: newSubmission
    });
  } catch (err) {
    console.error('Error submitting assignment:', err);
    res.status(500).json({ message: 'Server error submitting assignment' });
  }
});

// GET /api/assignments/my-submissions - Student view their own submissions
router.get('/my-submissions', protect, async (req, res) => {
  try {
    const studentId = req.session.user.id;
    const submissions = await Submission.find({ studentId }).sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    console.error('Error fetching student submissions:', err);
    res.status(500).json({ message: 'Server error fetching your submissions' });
  }
});

// GET /api/assignments/submissions - Faculty view student submissions
router.get('/submissions', protect, authorize('faculty', 'admin'), async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    console.error('Error fetching submissions:', err);
    res.status(500).json({ message: 'Server error fetching submissions' });
  }
});

// PUT /api/assignments/submissions/:id/grade - Faculty grade & feedback
router.put('/submissions/:id/grade', protect, authorize('faculty', 'admin'), async (req, res) => {
  try {
    const { grade, feedback } = req.body;
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    if (grade !== undefined) submission.grade = grade;
    if (feedback !== undefined) submission.feedback = feedback;

    await submission.save();

    res.json({ message: 'Grade and feedback saved successfully', submission });
  } catch (err) {
    console.error('Error grading submission:', err);
    res.status(500).json({ message: 'Server error updating grade' });
  }
});

module.exports = router;

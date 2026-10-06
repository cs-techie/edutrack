const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

// POST /api/results - Faculty/Admin add or update student result
router.post('/', protect, authorize('faculty', 'admin'), async (req, res) => {
  const { username, subject, marks } = req.body;

  if (!username || !subject || marks === undefined) {
    return res.status(400).json({ message: 'Username, subject, and marks are required' });
  }

  try {
    const studentUser = await User.findOne({ username });
    
    // Check if result record exists
    let existingRecord = await Result.findOne({ username, subject });
    let message = '';

    if (existingRecord) {
      existingRecord.marks = Number(marks);
      if (studentUser) existingRecord.studentId = studentUser._id;
      await existingRecord.save();
      message = 'Result updated successfully.';
    } else {
      const newResult = new Result({
        studentId: studentUser ? studentUser._id : null,
        username,
        subject,
        marks: Number(marks)
      });
      await newResult.save();
      message = 'Result added successfully.';
    }

    res.json({ message });
  } catch (err) {
    console.error('Error managing result:', err);
    res.status(500).json({ message: 'Server error managing result' });
  }
});

// GET /api/results/my-results - Fetch results for current logged-in student
router.get('/my-results', protect, async (req, res) => {
  try {
    const username = req.session.user.username;
    const results = await Result.find({ username }).sort({ subject: 1 });
    res.json({ username, results });
  } catch (err) {
    console.error('Error fetching student results:', err);
    res.status(500).json({ message: 'Server error fetching results' });
  }
});

// GET /api/results/all - Fetch all results for admin/faculty
router.get('/all', protect, authorize('faculty', 'admin'), async (req, res) => {
  try {
    const results = await Result.find().sort({ username: 1, subject: 1 });
    res.json(results);
  } catch (err) {
    console.error('Error fetching all results:', err);
    res.status(500).json({ message: 'Server error fetching all results' });
  }
});

module.exports = router;

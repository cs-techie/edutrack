const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

// GET /api/attendance/students - Fetch list of students for attendance marking
router.get('/students', protect, authorize('faculty', 'admin'), async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('_id username name rollNumber');
    res.json(students);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ message: 'Error fetching student list' });
  }
});

// POST /api/attendance - Mark / Update attendance for students
router.post('/', protect, authorize('faculty', 'admin'), async (req, res) => {
  const { date, subject, attendance } = req.body;

  if (!date || !attendance || typeof attendance !== 'object') {
    return res.status(400).json({ message: 'Please provide date and attendance data' });
  }

  const attendanceSubject = subject || req.session.user.subject || 'Computer Science';
  const attendanceDate = new Date(date);

  try {
    const studentIds = Object.keys(attendance);
    const operations = [];

    for (const studentId of studentIds) {
      const status = attendance[studentId];
      const student = await User.findById(studentId);
      if (student) {
        operations.push(
          Attendance.findOneAndUpdate(
            { studentId, subject: attendanceSubject, date: attendanceDate },
            {
              studentId,
              studentName: student.name || student.username,
              rollNumber: student.rollNumber || 'N/A',
              subject: attendanceSubject,
              date: attendanceDate,
              status
            },
            { upsert: true, new: true }
          )
        );
      }
    }

    await Promise.all(operations);
    return res.json({ message: 'Attendance updated successfully!' });
  } catch (err) {
    console.error('Error updating attendance:', err);
    return res.status(500).json({ message: 'Server error updating attendance' });
  }
});

// GET /api/attendance/records - Fetch all attendance records
router.get('/records', protect, async (req, res) => {
  try {
    const { subject, date } = req.query;
    let query = {};
    if (subject) query.subject = subject;
    if (date) query.date = new Date(date);

    if (req.session.user.role === 'student') {
      query.studentId = req.session.user.id;
    }

    const records = await Attendance.find(query).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    console.error('Error fetching attendance records:', err);
    res.status(500).json({ message: 'Server error fetching attendance' });
  }
});

module.exports = router;

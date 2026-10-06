const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Attendance = require('../models/Attendance');
const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');
const Result = require('../models/Result');
const { protect, authorize } = require('../middleware/auth');

// GET /api/dashboard/student - Fetch student dashboard & personalized record
router.get('/student', protect, authorize('student', 'admin'), async (req, res) => {
  try {
    const userId = req.session.user.id;
    const student = await User.findById(userId).select('-password');

    if (!student) {
      return res.status(404).json({ message: 'Student account not found' });
    }

    // Fetch attendance records for this student
    const attendanceRecords = await Attendance.find({ 
      $or: [{ studentId: userId }, { username: student.username }] 
    }).sort({ date: -1 });

    // Extract unique subjects & attendance map
    const subjectsSet = new Set();
    const attendanceMap = {};
    let totalPresent = 0;
    let totalMarked = 0;

    attendanceRecords.forEach(record => {
      const dateStr = record.date ? record.date.toISOString().split('T')[0] : 'Unknown Date';
      subjectsSet.add(record.subject);
      if (!attendanceMap[dateStr]) {
        attendanceMap[dateStr] = {};
      }
      attendanceMap[dateStr][record.subject] = record.status;

      if (record.status === 'Present') {
        totalPresent++;
        totalMarked++;
      } else if (record.status === 'Absent') {
        totalMarked++;
      }
    });

    const subjects = Array.from(subjectsSet);
    const attendanceData = Object.keys(attendanceMap).map(date => ({
      date,
      statuses: attendanceMap[date]
    }));

    const attendancePercentage = totalMarked > 0 ? parseFloat(((totalPresent / totalMarked) * 100).toFixed(1)) : 0;

    // Fetch student results
    const results = await Result.find({ 
      $or: [{ studentId: userId }, { username: student.username }] 
    }).sort({ subject: 1 });

    const totalMarks = results.reduce((sum, r) => sum + (Number(r.marks) || 0), 0);
    const averageMarks = results.length > 0 ? parseFloat((totalMarks / results.length).toFixed(1)) : 0;

    // Fetch student's submitted assignments
    const submissions = await Submission.find({ 
      $or: [{ studentId: userId }, { studentName: student.name }, { studentName: student.username }] 
    }).sort({ createdAt: -1 });

    // Fetch available course assignments
    const availableAssignments = await Assignment.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      student: {
        id: student._id,
        name: student.name || student.username,
        username: student.username,
        rollNumber: student.rollNumber || '2451-23-733-001',
        email: student.email || `${student.username}@edutrack.edu`,
        role: student.role
      },
      subjects,
      attendanceData,
      attendanceStats: {
        totalPresent,
        totalMarked,
        percentage: attendancePercentage,
        isEligible: attendancePercentage >= 75
      },
      results,
      resultStats: {
        totalSubjects: results.length,
        averageMarks,
        totalMarks
      },
      submissions,
      availableAssignments
    });
  } catch (err) {
    console.error('Student dashboard error:', err);
    res.status(500).json({ message: 'Error loading student dashboard' });
  }
});

// GET /api/dashboard/faculty - Fetch faculty dashboard metrics & stats
router.get('/faculty', protect, authorize('faculty', 'admin'), async (req, res) => {
  try {
    const facultyId = req.session.user.id;
    const faculty = await User.findById(facultyId).select('-password');

    const assignmentCount = await Assignment.countDocuments({ facultyId });
    const submissionCount = await Submission.countDocuments();
    const studentCount = await User.countDocuments({ role: 'student' });

    res.json({
      faculty: {
        id: faculty._id,
        name: faculty.name || faculty.username,
        subject: faculty.subject || 'General'
      },
      stats: {
        assignments: assignmentCount,
        submissions: submissionCount,
        students: studentCount
      },
      notification: "This is a notification: Mid-term assessments & attendance marking deadline approaching."
    });
  } catch (err) {
    console.error('Faculty dashboard error:', err);
    res.status(500).json({ message: 'Error loading faculty dashboard' });
  }
});

// GET /api/dashboard/admin - Admin management overview
router.get('/admin', protect, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    const studentCount = await User.countDocuments({ role: 'student' });
    const facultyCount = await User.countDocuments({ role: 'faculty' });
    const adminCount = await User.countDocuments({ role: 'admin' });

    res.json({
      counts: {
        totalUsers: users.length,
        students: studentCount,
        faculty: facultyCount,
        admins: adminCount
      },
      users
    });
  } catch (err) {
    console.error('Admin dashboard error:', err);
    res.status(500).json({ message: 'Error loading admin dashboard' });
  }
});

module.exports = router;

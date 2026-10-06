const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const resultRoutes = require('./routes/resultRoutes');
const profileRoutes = require('./routes/profileRoutes');

const User = require('./models/User');
const Attendance = require('./models/Attendance');
const Assignment = require('./models/Assignment');
const Submission = require('./models/Submission');
const Result = require('./models/Result');

const app = express();

// 1. Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. CORS Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// 3. Express Session Middleware (Synchronous MemoryStore guarantee)
app.use(session({
  secret: process.env.SESSION_SECRET || 'edutrack_secret_key_2026',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
    sameSite: 'lax'
  }
}));

// 4. Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 5. Routes Registration
const toolRoutes = require('./routes/toolRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/tools', toolRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'EduTrack MERN Backend Running' });
});

// Seed Initial Demo Users and Mock Data
const seedInitialData = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('Seeding initial demo users and mock data...');
      
      const student1 = await User.create({
        username: 'student1',
        password: 'password123',
        role: 'student',
        name: 'John Doe',
        rollNumber: '2451-23-733-001',
        email: 'student1@edutrack.com'
      });

      const faculty1 = await User.create({
        username: 'faculty1',
        password: 'password123',
        role: 'faculty',
        name: 'Prof. Smith',
        subject: 'Computer Science',
        email: 'faculty1@edutrack.com'
      });

      const admin1 = await User.create({
        username: 'admin1',
        password: 'password123',
        role: 'admin',
        name: 'System Admin',
        email: 'admin1@edutrack.com'
      });

      // Seed Attendance
      await Attendance.create([
        {
          studentId: student1._id,
          studentName: student1.name,
          rollNumber: student1.rollNumber,
          subject: 'Computer Science',
          date: new Date('2026-09-20'),
          status: 'Present'
        },
        {
          studentId: student1._id,
          studentName: student1.name,
          rollNumber: student1.rollNumber,
          subject: 'Mathematics',
          date: new Date('2026-09-20'),
          status: 'Present'
        },
        {
          studentId: student1._id,
          studentName: student1.name,
          rollNumber: student1.rollNumber,
          subject: 'Computer Science',
          date: new Date('2026-09-21'),
          status: 'Present'
        },
        {
          studentId: student1._id,
          studentName: student1.name,
          rollNumber: student1.rollNumber,
          subject: 'Mathematics',
          date: new Date('2026-09-21'),
          status: 'Absent'
        }
      ]);

      // Seed Assignment
      const assignment1 = await Assignment.create({
        facultyId: faculty1._id,
        facultyName: faculty1.name,
        subject: 'Computer Science',
        title: 'MERN Stack Data Modeling & Architecture',
        description: 'Implement Express routes and Mongo Mongoose schemas for student management.',
        dueDate: new Date('2026-10-05')
      });

      // Seed Submission
      await Submission.create({
        assignmentId: assignment1._id,
        studentId: student1._id,
        studentName: student1.name,
        subject: 'Computer Science',
        submissionText: 'Completed Mongoose data models and Express authentication controller.',
        fileUrl: ''
      });

      // Seed Results
      await Result.create([
        {
          studentId: student1._id,
          username: student1.username,
          subject: 'Computer Science',
          marks: 95
        },
        {
          studentId: student1._id,
          username: student1.username,
          subject: 'Mathematics',
          marks: 88
        }
      ]);

      console.log('Initial mock data seeded successfully!');
    }
  } catch (err) {
    console.error('Error seeding initial data:', err);
  }
};

// Connect DB and Start Server
const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await seedInitialData();
  const server = app.listen(PORT, () => {
    console.log(`======================================================`);
    console.log(`EduTrack Express Server running on http://localhost:${PORT}`);
    console.log(`======================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Note: Port ${PORT} is already in use by active server instance. Backend is ready!`);
    } else {
      console.error('Server error:', err);
    }
  });
}).catch(err => {
  console.error('Failed to start DB:', err);
});

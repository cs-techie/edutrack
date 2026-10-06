const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');
const Resume = require('../models/Resume');
const { protect } = require('../middleware/auth');

// GET /api/tools/schedules - Fetch active schedules (within 24h)
router.get('/schedules', async (req, res) => {
  try {
    const activeTime = Date.now() - 86400000;
    const schedules = await Schedule.find({ timestamp: { $gte: activeTime } }).sort({ timestamp: -1 });
    res.json(schedules);
  } catch (err) {
    console.error('Error fetching schedules:', err);
    res.status(500).json({ message: 'Error loading schedules' });
  }
});

// POST /api/tools/schedules - Add a schedule
router.post('/schedules', async (req, res) => {
  const { teacher, date, time, details } = req.body;
  if (!teacher || !date || !time || !details) {
    return res.status(400).json({ message: 'All schedule fields are required' });
  }

  try {
    const newSchedule = new Schedule({
      teacher,
      date,
      time,
      details,
      timestamp: Date.now()
    });

    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (err) {
    console.error('Error creating schedule:', err);
    res.status(500).json({ message: 'Error adding schedule' });
  }
});

// GET /api/tools/resume - Fetch current student resume
router.get('/resume', protect, async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.session.user.id });
    res.json(resume || {});
  } catch (err) {
    console.error('Error fetching resume:', err);
    res.status(500).json({ message: 'Error loading resume' });
  }
});

// POST /api/tools/resume - Save/Update resume
router.post('/resume', protect, async (req, res) => {
  const { name, email, phone, education, skills, experience } = req.body;
  try {
    let resume = await Resume.findOne({ userId: req.session.user.id });
    if (resume) {
      resume.name = name;
      resume.email = email;
      resume.phone = phone;
      resume.education = education;
      resume.skills = skills;
      resume.experience = experience;
      await resume.save();
    } else {
      resume = new Resume({
        userId: req.session.user.id,
        name,
        email,
        phone,
        education,
        skills,
        experience
      });
      await resume.save();
    }

    res.json({ message: 'Resume saved successfully', resume });
  } catch (err) {
    console.error('Error saving resume:', err);
    res.status(500).json({ message: 'Error saving resume' });
  }
});

module.exports = router;

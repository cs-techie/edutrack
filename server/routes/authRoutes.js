const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, faculty_id, password, role } = req.body;
  const loginId = username || faculty_id;

  if (!loginId || !password) {
    return res.status(400).json({ message: 'Please provide credentials' });
  }

  try {
    let query = { username: loginId };
    if (role) {
      query.role = role;
    }

    const user = await User.findOne(query);

    if (!user) {
      return res.status(401).json({ message: 'Invalid login credentials!' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid login credentials!' });
    }

    req.session.user = {
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      rollNumber: user.rollNumber,
      subject: user.subject
    };

    return res.json({
      message: 'Login successful',
      user: req.session.user
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error during login' });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { fullname, email, password, repeat_password, role } = req.body;

  if (!fullname || !email || !password || !repeat_password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  if (password !== repeat_password) {
    return res.status(400).json({ message: 'Password does not match' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists!' });
    }

    const newUser = new User({
      username: email.split('@')[0],
      name: fullname,
      email,
      password,
      role: role || 'student'
    });

    await newUser.save();

    return res.status(201).json({ message: 'You are registered successfully.' });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ message: 'Server error during registration' });
  }
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  if (req.session && req.session.user) {
    return res.json({ user: req.session.user });
  }
  return res.status(401).json({ message: 'Not authenticated' });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out' });
    }
    res.clearCookie('connect.sid');
    return res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;

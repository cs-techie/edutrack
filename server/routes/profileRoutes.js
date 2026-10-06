const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// GET /api/profile
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/profile
router.put('/', protect, async (req, res) => {
  try {
    const { name, email, githubProfile, leetcodeProfile, bio } = req.body;
    
    let user = await User.findById(req.session.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    if (githubProfile !== undefined) user.githubProfile = githubProfile;
    if (leetcodeProfile !== undefined) user.leetcodeProfile = leetcodeProfile;
    if (bio !== undefined) user.bio = bio;

    await user.save();
    
    // Update session user info if needed
    req.session.user.name = user.name;
    
    res.json({ message: 'Profile updated successfully', user: {
      id: user._id,
      name: user.name,
      email: user.email,
      githubProfile: user.githubProfile,
      leetcodeProfile: user.leetcodeProfile,
      bio: user.bio,
      role: user.role
    }});
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

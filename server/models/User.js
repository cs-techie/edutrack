const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'faculty', 'admin'],
    required: true
  },
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  rollNumber: {
    type: String,
    default: ''
  },
  subject: {
    type: String,
    default: ''
  },
  githubProfile: {
    type: String,
    default: ''
  },
  leetcodeProfile: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  }
}, { timestamps: true });

UserSchema.methods.matchPassword = async function(enteredPassword) {
  if (this.password.startsWith('$2a$') || this.password.startsWith('$2b$')) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
  return enteredPassword === this.password;
};

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  if (!this.password.startsWith('$2a$') && !this.password.startsWith('$2b$')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  email: String,
  phone: String,
  education: String,
  skills: String,
  experience: String
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);

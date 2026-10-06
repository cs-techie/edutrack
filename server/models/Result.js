const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  username: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  marks: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Result', ResultSchema);

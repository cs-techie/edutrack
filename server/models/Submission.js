const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment'
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  studentName: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    default: ''
  },
  submissionText: {
    type: String,
    default: ''
  },
  grade: {
    type: String,
    default: ''
  },
  feedback: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Submission', SubmissionSchema);

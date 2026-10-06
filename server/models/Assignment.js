const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  facultyName: {
    type: String,
    default: 'Faculty'
  },
  subject: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  fileUrl: {
    type: String,
    default: ''
  },
  dueDate: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', AssignmentSchema);

const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  teacher: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
    default: () => Date.now()
  }
}, { timestamps: true });

module.exports = mongoose.model('Schedule', ScheduleSchema);

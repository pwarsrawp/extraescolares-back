const { Schema, model } = require('mongoose');

const activitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cicle: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  numberDays: {
    type: String,
    required: true,
  },
  daysWeek: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  memberPrice: {
    type: String,
    required: true,
  },
  noMemberPrice: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  slots: {
    type: Number,
    required: true,
  },
  currentList: [{ studentId: { type: Schema.Types.ObjectId, ref: 'Student' }, createdAt: { type: Date, default: new Date() } }],
  waitingList: [{ studentId: { type: Schema.Types.ObjectId, ref: 'Student' }, createdAt: { type: Date, default: new Date() } }],
});

const Activity = model('Activity', activitySchema);

module.exports = Activity;

const mongoose = require('mongoose');

const waitingListEntrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactInformation: {
    phone: String,
    email: String,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  priorityLevel: {
    type: String,
    enum: ['high', 'medium', 'low'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'canceled'],
    default: 'pending',
  },
  notes: String,
});

const waitingListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  entries: [waitingListEntrySchema],
});

const WaitingList = mongoose.model('WaitingList', waitingListSchema);

module.exports = WaitingList;






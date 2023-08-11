const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    forUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    feedback: {
      type: String,
    },
    feedbackStatus: {
      type: String,
      enum: ['Pending', 'Submitted'],
      default: 'Pending',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model('Review', feedbackSchema);
module.exports = Feedback;

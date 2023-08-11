// const User = require('../models/user');
const Review = require('../models/review');

module.exports.feedbackForm = async function (req, res) {
  try {
    let review = await Review.findOne({
      forUser: req.body.for_user,
      fromUser: req.user.id,
    }).populate('forUser');

    return res.render('feedbackForm', {
      layout: false,
      review: review,
    });
  } catch (err) {
    console.log('Error in feedbackForm Controller', err);
    return;
  }
};

module.exports.viewFeedback = async function (req, res) {
  try {
    let review = await Review.findOne({
      forUser: req.body.for_user,
      fromUser: req.user.id,
    }).populate('forUser');

    return res.render('view-feedback', {
      layout: false,
      review: review,
    });
  } catch (err) {
    console.log('Error in ViewFeedback Controller', err);
    return;
  }
};

module.exports.updateFeedback = async function (req, res) {
  try {
    let feedbackStatus = 'Submitted';
    if (!req.body.feedback) {
      feedbackStatus = 'Pending';
    }
    let review = await Review.findByIdAndUpdate(req.body.review_id, {
      feedback: req.body.feedback,
      feedbackStatus: feedbackStatus,
    });

    return res.status(200).json({
      data: {
        previousStatus: review.reviewStatus,
        reviewStatus: feedbackStatus,
        employee: {
          id: req.body.forUser,
          name: req.body.forUser_name,
          email: req.body.forUser_email,
        },
      },
      message: 'Feedback Updated Successfully',
    });
  } catch (err) {
    console.log('Error in ViewFeedback Controller', err);
    return;
  }
};

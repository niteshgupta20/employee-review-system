const User = require('../models/user');
const Review = require('../models/review');

module.exports.home = async function (req, res) {
  try {
    let users = await User.find();
    let pending_reviews = await Review.find({
      fromUser: req.user.id,
      feedbackStatus: 'Pending',
    }).populate('forUser');
    let submitted_reviews = await Review.find({
      fromUser: req.user.id,
      feedbackStatus: 'Submitted',
    }).populate('forUser');
    return res.render('employee', {
      title: 'Home',
      users: users,
      pending_reviews: pending_reviews,
      submitted_reviews: submitted_reviews,
    });
  } catch (err) {
    console.log('Error in Employye Home Controller', err);
    return;
  }
};

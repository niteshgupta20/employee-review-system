const User = require('../models/user');
const Review = require('../models/review');

module.exports.home = async function (req, res) {
  try {
    let users = await User.find({});
    let pending_reviews = await Review.find({
      fromUser: req.user.id,
      feedbackStatus: 'Pending',
    }).populate('forUser');
    let submitted_reviews = await Review.find({
      fromUser: req.user.id,
      feedbackStatus: 'Submitted',
    }).populate('forUser');
    return res.render('admin', {
      title: 'Home',
      users: users,
      pending_reviews: pending_reviews,
      submitted_reviews: submitted_reviews,
    });
  } catch (err) {
    console.log('Error in admin home controller', err);
    return;
  }
};

module.exports.addUserForm = function (req, res) {
  return res.render('add-user', {
    layout: false,
  });
};

module.exports.createUser = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      req.flash('error', 'Password and Confirm Password are not Same');
      return res.redirect('back');
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      req.flash('error', 'User already exists in DB');
      return res.redirect('back');
    } else {
      user = await User.create(req.body);
      req.flash('success', 'User Created Successfully');
      return res.redirect('back');
    }
  } catch (err) {
    console.log('Error in createUser controller', err);
    return;
  }
};

module.exports.editUserForm = async function (req, res) {
  try {
    let user = await User.findById(req.body.user_id);
    return res.render('edit-user', {
      layout: false,
      employee: user,
    });
  } catch (err) {
    console.log('Error in editUserFrom controller', err);
    return;
  }
};

module.exports.updateUser = async function (req, res) {
  try {
    const options = { new: true };

    let user = await User.findByIdAndUpdate(
      req.body.employee_id,
      req.body,
      options
    );

    return res.status(200).json({
      data: {
        user: user,
      },
      message: 'User Updated Successfully',
    });
  } catch (err) {
    console.log('Error in updateUser controller', err);
    return;
  }
};

module.exports.deleteUser = async function (req, res) {
  try {
    await User.findByIdAndDelete(req.body.user_id);

    await Review.deleteMany({
      $or: [
        { from_user: req.body.employee_id },
        { for_user: req.body.employee_id },
      ],
    });
    await User.updateMany({ $pull: { reviewers: req.body.employee_id } });

    return res.status(200).json({
      message: 'User Removed Successfully',
    });
  } catch (err) {
    console.log('Error in deleteUser controller', err);
    return;
  }
};

module.exports.assignReviewersForm = async function (req, res) {
  try {
    let user = await User.findById(req.body.user_id);
    let reviewers = await User.find({
      _id: { $nin: user.reviewers, $ne: user.id },
    });
    return res.render('assign-reviewers', {
      layout: false,
      employee: user,
      reviewers: reviewers,
    });
  } catch (err) {
    console.log('Error in assignReviewersForm controller', err);
    return;
  }
};

module.exports.assignReviewers = async function (req, res) {
  try {
    let reviewer_ids = req.body.reviewers;
    let records = await reviewer_ids.map((reviewer) => {
      return {
        forUser: req.body.employee_id,
        fromUser: reviewer,
      };
    });
    await Review.insertMany(records);
    await User.findByIdAndUpdate(req.body.employee_id, {
      $push: { reviewers: { $each: reviewer_ids } },
    });
    return res.status(200).json({
      message: 'Reviewers Assigned Successfully',
    });
  } catch (err) {
    console.log('Error in assignReviewers controller', err);
    return;
  }
};

module.exports.viewReviewers = async function (req, res) {
  try {
    let user = await User.findById(req.params.user_id).populate('reviewers');
    return res.render('view-reviewers', {
      title: 'Employee Feedback',
      employee: user,
    });
  } catch (err) {
    console.log('Error in viewReviewers Controller', err);
    return;
  }
};

module.exports.editFeedbackForm = async function (req, res) {
  try {
    let review = await Review.findOne({
      forUser: req.body.for_user,
      fromUser: req.body.from_user,
    })
      .populate('forUser')
      .populate('fromUser');
    return res.render('edit-feedback', {
      layout: false,
      review: review,
    });
  } catch (err) {
    console.log('Error in editFeedbackForm Controller', err);
    return;
  }
};

function addUserForm(ele) {
  $.ajax({
    url: '/user/admin/add-user-form',
    type: 'get',
    data: {},
    success: function (response) {
      $('#modal .modal-content').html(response);
    },
    error: function (err) {
      console.log(err);
      $('.modal').modal('hide');
    },
  });
}

function editUserForm(ele, user_id) {
  $.ajax({
    url: '/user/admin/edit-user-form',
    type: 'post',
    data: {
      user_id: user_id,
    },
    success: function (response) {
      $('#modal .modal-content').html(response);
    },
    error: function (err) {
      console.log(err);
      $('.modal').modal('hide');
    },
  });
}

function updateUser(ele, event) {
  event.preventDefault();
  let form = $(ele);
  let formData = form.serialize();
  $.ajax({
    url: form.attr('action'),
    type: form.attr('method'),
    data: formData,
    success: function (response) {
      $('.modal').modal('hide');
      console.log(response);
      let user = response.data.user;
      $(`#row-${user._id} .user-name`).html(user.name);
      $(`#row-${user._id} .user-email`).html(user.email);
      $(`#row-${user._id} .user-role`).html(user.role);
      showNotification('success', response.message);
    },
    error: function (err) {
      $('.modal').modal('hide');
      console.log(err);
    },
  });
}

function removeUser(ele, user_id) {
  $.ajax({
    url: '/user/admin/delete-user',
    type: 'post',
    data: {
      user_id: user_id,
    },
    success: function (response) {
      $(`#row-${user_id}`).remove();
      showNotification('success', response.message);
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function assignReviewersForm(ele, user_id) {
  $.ajax({
    url: '/user/admin/assign-reviewers-form',
    type: 'post',
    data: {
      user_id: user_id,
    },
    success: function (response) {
      $('#modal .modal-content').html(response);
    },
    error: function (err) {
      console.log(err);
      $('.modal').modal('hide');
    },
  });
}

function assignReviewers(ele, event) {
  event.preventDefault();
  let form = $(ele);
  let formData = form.serialize();
  $.ajax({
    url: form.attr('action'),
    type: form.attr('method'),
    data: formData,
    success: function (response) {
      $('.modal').modal('hide');
      showNotification('success', response.message);
    },
    error: function (err) {
      $('.modal').modal('hide');
      console.log(err);
    },
  });
}

function editFeedbackForm(ele, for_user, from_user) {
  $.ajax({
    url: '/user/admin/edit-feedback-form',
    type: 'post',
    data: {
      for_user: for_user,
      from_user: from_user,
    },
    success: function (response) {
      $('#modal .modal-content').html(response);
    },
    error: function (err) {
      console.log(err);
      $('.modal').modal('hide');
    },
  });
}

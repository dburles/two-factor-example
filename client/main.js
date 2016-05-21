import { isVerifying, getAuthCode, verifyAndLogin } from 'meteor/dburles:two-factor';

Template.body.helpers({
  isVerifying() {
    return isVerifying();
  }
});

Template.body.events({
  'click #logout'() {
    Meteor.logout();
  }
});

Template.login.helpers({
  loginError() {
    return Session.get('loginError');
  }
});

Template.login.events({
  'submit form'(event, template) {
    event.preventDefault();

    const user = template.$('input#user').val();
    const password = template.$('input#password').val();

    getAuthCode(user, password, error => {
      if (error) {
        return Session.set('loginError', error.reason);
      }

      Session.set('loginError', '');
    });
  }
});

Template.verify.helpers({
  verifyError() {
    return Session.get('verifyError');
  }
});

Template.verify.events({
  'submit form'(event, template) {
    event.preventDefault();

    const code = template.$('#code').val();

    verifyAndLogin(code, error => {
      if (error) {
        return Session.set('verifyError', error.reason);
      }

      Session.set('verifyError', '');
    });
  }
});

import { options } from 'meteor/dburles:two-factor';

options.sendCode = (user, code) => {
  console.log(`Authentication code for '${user.username}' user is: ${code}`);
};

options.fieldName = 'twoFactor';

// Gives us an account to test with
Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      username: 'example',
      password: 'password'
    });
  }
});
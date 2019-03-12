const validator = require('validator');

const ragistrationValidator = data => {
  const error = {};

  if (!data.firstName) {
    error.firstName = 'You Have to Provide First Name';
  }

  if (!data.lastName) {
    error.lastName = 'You Have to Provide Last Name';
  }

  if (!data.userName) {
    error.userName = 'You Have to Provide an Username';
  }

  if (!data.email) {
    error.email = 'You Have to Provide a Email';
  } else if (!validator.isEmail(data.email)) {
    error.email = 'You Have to Provide a Valid Email';
  }

  if (!data.password) {
    error.password = 'You Have to Provide a Valid Password';
  } else if (data.password.length < 6) {
    error.password = 'Password must be gather than six character';
  }

  if (!data.confirmPassword) {
    error.confirmPassword = 'You Have to Confirm your Password';
  } else if (!(data.password === data.confirmPassword)) {
    error.confirmPassword = "Password doesn't matched";
  }

  return {
    error,
    isValid: Object.keys(error).length === 0
  };
};

module.exports = ragistrationValidator;

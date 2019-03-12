const passwordResetValidator = data => {
  const error = {};

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

module.exports = passwordResetValidator;

const validator = require('validator');

const ragistrationValidator = data => {
  const error = {};

  if (!data.userName) {
    error.userName = 'You Have to Provide an Username';
  }

  if (!data.password) {
    error.password = 'You Have to Provide a Valid Password';
  }

  return {
    error,
    isValid: Object.keys(error).length === 0
  };
};

module.exports = ragistrationValidator;

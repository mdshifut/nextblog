module.exports = async (UserModel, { userName, email }) => {
  //   Find email already exist or not
  const checkEmail = await UserModel.findOne({ email: email });

  //   Find userName already exist or not
  const checkUserName = await UserModel.findOne({ userName: userName });

  if (checkUserName && checkEmail) {
    return {
      userExist: true,
      user: checkEmail,
      error: {
        userName: 'User name already exist',
        email: 'Email already exist'
      }
    };
  } else if (checkEmail) {
    return {
      user: checkEmail,
      userExist: true,
      error: { email: 'Email already exist' }
    };
  } else if (checkUserName) {
    return {
      user: checkUserName,
      userExist: true,
      error: {
        userName: 'User name already exist'
      }
    };
  }

  return {
    userExist: false
  };
};

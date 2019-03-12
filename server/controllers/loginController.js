const UserModel = require('../models/UserModel');
const loginValidator = require('../validator/loginValidator');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const catchError = require('../utils/catchError');
const jwt = require('jsonwebtoken');
const loginController = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    const result = loginValidator({
      userName,
      password
    });

    // Check user data is valid
    if (!result.isValid) {
      return res.status(200).json({
        error: result.error
      });
    }

    let user = null;

    //   Find the user
    if (validator.isEmail(userName)) {
      user = await UserModel.findOne({ email: userName });
    } else {
      user = await UserModel.findOne({ userName: userName });
    }

    if (!user) {
      return res.json({
        error: { userName: "User doesn't found" }
      });
    }

    const passwordVarify = await bcryptjs.compare(password, user.password);

    if (!passwordVarify) {
      return res.json({
        error: { password: 'Invalid password' }
      });
    }
    const { _id, firstName, lastName, profileAvatar } = user;
    let token = jwt.sign(
      { _id, userName, firstName, lastName, profileAvatar },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    token = 'Bearer ' + token;

    return res.status(200).json({
      message: 'Login Successfully',
      token
    });
  } catch (error) {
    return catchError(res, error);
  }
};

module.exports = loginController;

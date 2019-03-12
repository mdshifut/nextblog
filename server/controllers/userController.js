const UserModel = require('../models/UserModel');
const registrationValidator = require('../validator/registrationValidator');
const passwordResetValidator = require('../validator/passwordResetValidator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const catchError = require('../utils/catchError');
const isUserExist = require('../utils/isUserExist');
const transporter = require('../mailer/transporter');
const mailOption = require('../mailer/mailOption');
const activationTokenGenerator = require('../utils/activationTokenGenerator');

// Get All users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    return res.json(users);
  } catch (error) {
    return catchError(res, error);
  }
};

// Create a  New User or Rregister a New User
const createNewUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    userName,
    email,
    password,
    confirmPassword
  } = req.body;

  const result = registrationValidator({
    firstName,
    lastName,
    userName,
    email,
    password,
    confirmPassword
  });

  // Check user data is valid
  if (!result.isValid) {
    return res.status(200).json({
      error: result.error
    });
  }

  try {
    //   Find email and userName already exist or not
    const checkUser = await isUserExist(UserModel, { userName, email });

    if (checkUser.userExist) {
      const { user, error } = checkUser;

      // If user is exist(Based on email) but not varified then send an new activation link to the user email
      if (!user.active && error.email) {
        await activationTokenGenerator(user);

        return res.json({
          id: user._id,
          message:
            'User already exist.A new activation link has been send to your account.'
        });
      }

      return res.json({
        error: checkUser.error
      });
    }

    if (checkUser.isError) {
      return catchError(res, checkUser.error);
    }

    //   Hash password
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt);

    //   Create new user
    const user = new UserModel({
      firstName,
      lastName,
      userName,
      email,
      password: hash
    });

    await activationTokenGenerator(user, true);

    return res.json({
      id: user._id,
      message: 'User created successfully.Please varify your email.'
    });
  } catch (error) {
    return catchError(res, error);
  }
};

// Resend activation link
const resendActivationLink = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);

    // If the account already activated
    if (user.active)
      return res.json({
        type: 'ACTIVATED',
        message:
          'Account already activated.Please login with your Username/Email and Password'
      });

    await activationTokenGenerator(user);

    res.json({
      id: user._id,
      message: 'A new activation link has been sent to your email.'
    });
  } catch (error) {
    res.json({ error: { message: 'Sever Error' } });
  }
};

const activeAccount = async (req, res, next) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await UserModel.findById(decoded.id);

    // If the account already activated
    if (user.active)
      return res.json({
        type: 'ACTIVATED',
        message:
          'Account already activated.Please login with your Username/Email and Password'
      });

    // If token isn't matched
    if (user.activateToken !== token)
      return res.json({ error: { message: 'Invalid activation Link' } });

    // If token is exppired
    if (decoded.exp * 1000 < new Date().getTime()) {
      await activationTokenGenerator(user);
      return res.json({
        id: user._id,

        error: {
          message:
            'Activation link expired.A new activation link has been sent to your email'
        }
      });
    }

    await UserModel.findByIdAndUpdate(decoded.id, {
      activateToken: '',
      active: true
    });

    return res.json({
      type: 'ACTIVATED',
      message:
        'Account Activated successfully.Now you can login with your Username/Email and Password'
    });
  } catch (error) {
    res.json({ error: { message: 'Invalid activation Link' } });
  }
};

const resetPasswordLinkGenerator = async (req, res, next) => {
  const { userInfo } = req.body;

  try {
    let user = null;
    if (validator.isEmail(userInfo)) {
      user = await UserModel.findOne({ email: userInfo });
    } else {
      user = await UserModel.findOne({ username: userInfo });
    }

    // If the user not found
    if (!user) {
      return res.json({
        error: { userInfo: 'User not found' }
      });
    }

    const passwordResetToken = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      {
        expiresIn: '1d'
      }
    );

    await UserModel.findByIdAndUpdate(user._id, { passwordResetToken });

    // Send new activation link to the user email.
    await transporter.sendMail(
      mailOption({
        to: user.email,
        subject: 'reset password',
        template: `<a>${process.env.DOMAIN +
          '/createnewpassword/' +
          passwordResetToken}</a>`
      })
    );

    return res.json({
      message: 'A new password reset link has been sent to your email.'
    });
  } catch (error) {
    res.json({ error: { message: 'Sever Error' } });
  }
};

const createNewPassword = async (req, res, next) => {
  const { password, confirmPassword, token } = req.body;

  const result = passwordResetValidator({
    password,
    confirmPassword
  });

  // Check password reset data is valid
  if (!result.isValid) {
    return res.status(200).json({
      error: result.error
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await UserModel.findById(decoded.id);

    // If token isn't matched
    if (user.passwordResetToken !== token)
      return res.json({
        error: { message: 'Invalid password reset link' }
      });

    // If token is exppired
    if (decoded.exp * 1000 < new Date().getTime()) {
      return res.json({
        error: {
          message: 'Password reset link is expired'
        }
      });
    }

    //   Hash password
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt);
    await UserModel.findByIdAndUpdate(decoded.id, {
      passwordResetToken: '',
      password: hash
    });

    // Send password reset notification to the user email.
    await transporter.sendMail(
      mailOption({
        to: user.email,
        subject: 'Password has been reset',
        template: `<p>Password has been reset</p>`
      })
    );

    return res.json({
      message: 'Password reset successfully'
    });
  } catch (error) {
    res.json({ error: { message: 'Invalid password reset Link' } });
  }
};

// Get Single user
const getSingleUser = async (req, res, next) => {
  try {
    let user = await UserModel.findById(req.userData.userId);

    if (!user) {
      return res.json({
        message: 'Server Error'
      });
    }

    return res.json(user);
  } catch (error) {
    return catchError(res, error);
  }
};

// Edit an user
const editUser = async (req, res, next) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.userData.userId, {
      $set: req.body
    });

    if (!updatedUser) {
      return res.json({
        message: 'Update failed'
      });
    }

    return res.json({
      message: 'Updated successfully'
    });
  } catch (error) {
    return catchError(res, error);
  }
};

// Delete an user
const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.userData.userId);

    if (!deletedUser) {
      return res.json({
        message: 'Operation failed'
      });
    }

    return res.json({
      message: 'Delete user successfully'
    });
  } catch (error) {
    return catchError(res, error);
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  activeAccount,
  resendActivationLink,
  resetPasswordLinkGenerator,
  createNewPassword,
  editUser,
  getSingleUser,
  deleteUser
};

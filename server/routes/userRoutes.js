const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  createNewUser,
  activeAccount,
  resendActivationLink,
  resetPasswordLinkGenerator,
  createNewPassword,
  editUser,
  getSingleUser,
  deleteUser
} = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const authenticateUser = require('../middlewares/authentication');

// Get all user info
router.get('/allusers', getAllUsers);

// Create a New user/account
router.post('/register', createNewUser);

// Active an account
router.get('/activeaccount/:token', activeAccount);

// resend activation link
router.get('/resendlink/:id', resendActivationLink);

// Generate new reset password link
router.post('/resetpasswordlinkgenerator', resetPasswordLinkGenerator);

// Create new reset password link
router.post('/createnewpassword', createNewPassword);

// Get single user info
router.get('/profile', authenticateUser, getSingleUser);

// Edit an user
router.patch('/edit', authenticateUser, editUser);

// Delete an user
router.delete('/delete', authenticateUser, deleteUser);

// Login route
router.post('/login', loginController);

module.exports = router;

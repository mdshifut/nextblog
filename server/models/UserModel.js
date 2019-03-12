const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    email: String,
    userBio: String,
    profileAvatar: String,
    activateToken: { type: String, default: '' },
    passwordResetToken: { type: String, default: '' },
    active: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const userModel = mongoose.model('UserModel', userSchema);

module.exports = userModel;

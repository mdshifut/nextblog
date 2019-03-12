const mailOption = require('../mailer/mailOption');
const jwt = require('jsonwebtoken');
const transporter = require('../mailer/transporter');
const UserModel = require('../models/UserModel');

module.exports = async (user, isNewUser = false) => {
  const activateToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: '1d'
  });

  // Send  activation link to user email.
  await transporter.sendMail(
    mailOption({
      to: user.email,
      subject: 'test email',
      template: `<a>${process.env.DOMAIN +
        '/activeaccount/' +
        activateToken +
        '/' +
        user._id}</a>`
    })
  );

  if (isNewUser) {
    user.activateToken = activateToken;
    return await user.save();
  } else {
    return await UserModel.findByIdAndUpdate(user._id, { activateToken });
  }
};

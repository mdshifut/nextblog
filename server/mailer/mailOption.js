const mailOption = ({ to, subject, template }) => {
  return {
    from: 'admin@shifuthossain.com', // sender address
    to, // list of receivers
    subject, // Subject line
    html: template // html body
  };
};

module.exports = mailOption;

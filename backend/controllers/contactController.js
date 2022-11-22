const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const sendEmail = require('../utils/sendEmail');

const contactUs = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;
  console.log(req.body);

  // find user
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error('User not found, please sign-up!');
  }

  // subject and message validation
  if (!subject || !message) {
    res.status(400);
    throw new Error('Please provide both subject and message!');
  }

  // send email
  const send_to = process.env.EMAIL_USER;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = user.email;

  try {
    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: 'email sent' });
  } catch (error) {
    res.status(500);
    throw new Error('email not sent, please try again');
  }
});

module.exports = {
  contactUs,
};

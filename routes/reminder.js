const express = require('express');
const router = express.Router();
const User = require('../models/User');
const dotenv = require('dotenv');
const sendReminderMail = require('../sendgrid-reminder-mail');
const auth = require('../middleware/auth');

dotenv.config();
router.post('/', auth, async (req, res) => {
  try {
    const { email, username } = await User.findById(req.body.user.id);
    const { amount, tradeId } = req.body;
    const mailCont = {
      email,
      username,
      amount,
      tradeId,
    };
    sendReminderMail(mailCont);
    res.json({ message: 'Reminder Mail sent successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

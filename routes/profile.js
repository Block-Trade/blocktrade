const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');

router.post('/user-avatar', auth, async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.file);
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    return res.send(`File has been uploaded.`);
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload image: ${error}`);
  }
});

router.post('/edit-profile', async (req, res) => {
  try {
    const { token } = req.headers;
    console.log(req.headers);
    const {
      name,
      mobileNo,
      companyName,
      companyAddress,
      companyEmail,
      companyTelNo,
      city,
      country,
    } = req.body;
    const userInfo = {
      name,
      mobileNo,
      companyName,
      companyAddress,
      companyEmail,
      companyTelNo,
      city,
      country,
    };
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    if (decoded) {
      const { user } = decoded;
      try {
        const response = await User.findByIdAndUpdate(user.id, userInfo);
        res.json('User Info saved successfully');
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;

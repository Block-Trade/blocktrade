const express = require('express');
const router = express.Router();
const Trade = require('../models/trade');
const auth = require('../middleware/auth');
const User = require('../models/User');

router.get('/', auth, async (req, res) => {
  try {
    const userId = await User.findById(req.body.user.id);
    const trade = await Trade.find({$or:[{exporterUserName:userId},{importerUserName:userId}]});
    console.log(trade);
    return res.status(200).json({ users: trade });
  } catch (e) {
    res.status(400).send({ e });
  }
});

module.exports = router;
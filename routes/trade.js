const express = require('express');
const router = express.Router();
const Trade = require('../models/trade');
const auth = require('../middleware/auth');
const User = require('../models/User');
var crypto = require('crypto');
const { Timestamp } = require('mongodb');

router.get('/', auth, async (req, res) => {
  try {
    const userId = await User.findById(req.body.user.id);
    console.log(userId)
    const trade = await Trade.find({$or:[{exporterUserName:userId.username},{importerUserName:userId.username}]});
    console.log(trade);
    return res.status(200).json({ users: trade });
  } catch (e) {
    res.status(400).send({ e });
  }
});

router.post('/',auth,async(req,res) => {
  try{
    const { user, expUser,impUser,inco,dueDate,amount } = req.body;
    console.log(new Date().getTime());
    var a = expUser+impUser+new Date().getTime();
    const tradeId = crypto.createHash('sha256').update(a).digest('base64');
    console.log(tradeId);
    const trade = new Trade({
      TradeId: tradeId,
      exporterUserName:expUser,
      importerUserName: impUser,
      incoterms:inco,
      dueDate,
      amount,
      tradeStatus: 'DU'
    });
    await trade.save();
    res.status(200).send({trade});
  }catch(e){
    res.status(400).send({e});
  }
});

module.exports = router;
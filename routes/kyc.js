// const express = require('express');
// const router = express.Router();

// router.get('/',(req,res)=>{
//     res.json({msg:"KYC"});
// })

// module.exports = router;

const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Dl = require('../models/Kyc_dl');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.post('/dl/put',async(req,res)=>{
    const {cc ,dl_no}=req.body;
    let dl = new Dl({cc,dl_no});
    await dl.save();
    res.json({msg:'dl registered!'}); 
})

router.post('/dl',[
    check('dl_no','Driving license no is required').exists(),
    check("cc","Invalid Country code").isIn(['AU','AG','BG','AS','CO','CA','IN'])
]
,async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const { token } = req.headers;

        if(!token) {
            return res.json({msg: 'Unauthorized access'});
        }

        const {cc, dl_no} = req.body;

        let dl = await User.findOne({dl_no});
        if(dl) {
            return res.json({msg: 'Unauthorized DL'});
        } 
        dl = await Dl.findOne({dl_no});

        if(!dl) {
            return res.json({msg: 'Not valid DL'});
        }

       const decoded = jwt.verify(token, process.env.JWTSECRET);
        
       const { user } = decoded;

       let user_ = await User.findByIdAndUpdate(user.id, { kyc: dl._id });

        res.json({msg:"KYC done"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
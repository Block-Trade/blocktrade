const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { check, validationResult } = require('express-validator/check');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const sendMail = require('../sendgrid-mail');

dotenv.config();
router.post('/', [
    check('name','Please enter name').not().isEmpty(),
    check('username','Please enter username').not().isEmpty(),
    check('email','Please enter email').isEmail(),
    check('password','Please enter password of min 5 letters').isLength({min:5})
],async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const { name,username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        let user1 = await User.findOne({ username });
        if(user) {
            return res.status(400).json({msg: 'email already in use!'});
        }
        if(user1) {
            return res.status(400).json({msg: 'username already in use!'});
        }
        
        user = new User({
            name,
            username,
            email,
            password
        });
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        const payload= {
           name,
           username,
           email,
           password:user.password 
        }
        const token = jwt.sign(payload, process.env.JWTSECRET, {
            expiresIn:3600
        });
    
        const mailCont = {
            email,
            token
        }
        sendMail(mailCont);
        res.json({msg: 'Mail sent successfully'});

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
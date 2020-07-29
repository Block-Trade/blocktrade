const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
    const {token } = req.body;

    if(token) {
        try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        if(decoded) {
            const {name, email, password} = decoded;
            var user = await User.findOne({email});
            if(user) {
                return res.json({ message: 'User already exists' });
            }
            user = new User({
                name,
                email,
                password
            });

            await user.save();

            res.json({message : 'Signup successful'});
        

        } else {
            return res.json({ message: 'Expired or invalid token' });
        }
    } catch (err) {
        return res.json({message: 'Invalid signature or token'});
    }
        
    } else {
        return res.json({ message: 'No token present'});
    }
});

module.exports = router;
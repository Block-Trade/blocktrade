const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // Get the token
    const token = req.header('token');
<<<<<<< HEAD
    console.log(token);
=======

>>>>>>> 7c3901c3c2b087fff632d5fc5782601122dabac1
    if(!token) {
        return res.status(401).json({msg:'Authorization denied'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET);

        req.body.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token invalid'});
    }
    
}

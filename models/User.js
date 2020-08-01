const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required:true,
        unique:true
    },
    email: {
        type:String,
        required:true,
        unique: true
    },
    password: {
        type:String,
        required:true
    },
    kycVerifiedThrough: {
        type: String,
        default:'',
    },
    kycStatus:{
        type: Boolean,
        default:false
    }
});

module.exports = mongoose.model('user', UserSchema);
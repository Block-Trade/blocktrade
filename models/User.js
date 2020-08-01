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
    kyc: {
        type: ObjectId,
        ref: 'dl',
        default: null
    }
});

module.exports = mongoose.model('user', UserSchema);
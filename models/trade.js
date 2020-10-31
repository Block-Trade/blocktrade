const mongoose = require('mongoose');

const TradeSchema = mongoose.Schema({
    TradeId: {
        type: String,
        required: true
    },
    exporterUserName: {
        type: String,
        required:true
    },
    importerUserName: {
        type:String,
        required:true
    },
    incoterms: {
        type:String,
        default:'',
    },
    paymentType:{
        type: String,
        default:'',
    },
    creditPeriod: {
        type: Number,
        default:0,
    },
    amount:{
        type: String,
        default:'',
    },
    tradeStatus: {
        type: String,
        default:'',
    },
});

module.exports = mongoose.model('trade', TradeSchema);
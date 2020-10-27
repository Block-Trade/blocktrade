const mongoose = require('mongoose');

const TradeSchema = mongoose.Schema({
    TradeId: {
        type: String,
        required: true
    },
    exporterUsername: {
        type: String,
        required:true,
        unique:true
    },
    importerUserName: {
        type:String,
        required:true,
        unique: true
    },
    incoterms: {
        type:String,
        default:'',
    },
    dueDate: {
        type: String,
        default:'',
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
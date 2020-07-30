const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const db = process.env.MONGOURI;

/*const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(db, { useNewUrlParser: true, useUnifiedTopology: true });
const connectDB = () => {
    try {
        client.connect(err => {
            const collection = client.db("test").collection("devices");
            // perform actions on the collection object
            console.log('MongoDB connected');

          });
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
}
*/

const connectDB = async () => {
    try {
        await mongoose.connect(db,{
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:false,
            useUnifiedTopology:true
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }                                                                                                                                                                                                                                                                                               
}

module.exports = connectDB;
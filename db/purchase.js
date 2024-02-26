const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
// var db = require(__dirname + "/connection.js");
mongoose.set('strictQuery', true);

// const uri = "mongodb://127.0.0.1:27017/gitportalDB";
// async function database() {
//   await mongoose.connect(uri);
// }
//database().catch(err => console.log(err));

const guestPaymentInfoSchema = new mongoose.Schema({
    buyerID:[{
        name:String,
        email:String,
        phone:String,
    }],
    packageInfo: [{
        name:String,
        amount:String,
    }],
    date:String,
    totalAmount:Number,
    paymentGateway:String,
}, {timestamps: true});




userInfoSchema.plugin(passportLocalMongoose , {selectFields: "username password"});


module.exports = guestPaymentInfoSchema;

const mongoose = require("mongoose");
// const passportLocalMongoose = require("passport-local-mongoose");
// var db = require(__dirname + "/connection.js");
mongoose.set('strictQuery', true);

// const uri = "mongodb://127.0.0.1:27017/gitportalDB";
// async function database() {
//   await mongoose.connect(uri);
// }
//database().catch(err => console.log(err));




const packageSchema = new mongoose.Schema({
  packageUrl:String,
  packageName:String,
  packageinfo:String,
  price:Number,
  images:String,
  
  
},
{timestamps: true}

);

// productSchema.plugin(passportLocalMongoose);


module.exports = packageSchema;
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
// var db = require(__dirname + "/connection.js");
mongoose.set('strictQuery', true);

// const uri = "mongodb://127.0.0.1:27017/gitportalDB";
// async function database() {
//   await mongoose.connect(uri);
// }
//database().catch(err => console.log(err));

const paymentInfoSchema = new mongoose.Schema({
    packageID:String,
    packageName:String,
    packageAmount:String,
    date:String,
});


const userInfoSchema = new mongoose.Schema({
  username:String,
  firstname:String,
  lastname:String,
  email:{
    type:String,
    unique:true,
    required: true,
  },
  password:String,
  phone:String,
  regDate:String,
  country:String,
  isAdmin:Boolean,
  profile_pic:String,

  purchase:[paymentInfoSchema],

},
{timestamps: true}

);

userInfoSchema.plugin(passportLocalMongoose , {selectFields: "username password"});


module.exports = userInfoSchema;

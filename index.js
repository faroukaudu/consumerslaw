const express = require('express');
const dotenv = require('dotenv').config()
const app = express();
// const lodash = require('lodash');
const ejs = require('ejs');
const bodyParser = require("body-parser");
var https = require("https");
const _ = require('lodash');
const mongoose = require("mongoose");
var db = require(__dirname + "/db/connection.js");
var userschema = require(__dirname + "/db/userdb.js");
var packageSchema = require(__dirname + "/db/packagedb.js");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
// const passportLocalMongoose = require("passport-local-mongoose");


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');




app.use(session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    // store: new MongoStore({mongoUrl: 'mongodb://127.0.0.1:27017/lawDB',
    //                         ttl:14*60*1000}),
    cookie: { 
        //Expire Session after 1min.
        maxAge: 60000,
     }
  }));



  // Initialize Seesion start
app.use(passport.initialize());
app.use(passport.session());

// Initialize Seesion end


const uri = "mongodb://127.0.0.1:27017/lawDB";
// const uri = "mongodb+srv://consumerlaw:"+process.env.PASSWORDDB+"@consumerlaw.vfwut3x.mongodb.net/?retryWrites=true&w=majority";

database().catch(err => console.log(err));


async function database() {
  await mongoose.connect(uri);
  // await mongoose.connect('mongodb://127.0.0.1:27017/emcDB');
}
const PackageAdd = mongoose.model("PackageInfo",packageSchema);

function appDb(){
    // userschema.plugin(uniqueValidator);
    const Admindb = mongoose.model("User",userschema);
    passport.use(Admindb.createStrategy());
  
    passport.serializeUser(function(user, cb) {
      console.log("serializing user uwuss:" + JSON.stringify(user))
      process.nextTick(function() {
        console.log(user.id);
          return cb(null, user.id)
      })
  });
  
  passport.deserializeUser(function (id, cb) {
    console.log("trying to GET" + id);
      console.log("deserializing user owo:" + JSON.stringify(id))
      Admindb.findById({_id:id}).then((user)=>{
        console.log("GETTING");
        return cb(null, user);
      }).catch((err)=>{
        return cb(err);
      });   
  });
  
     return Admindb;
  }

  const User = appDb();




app.get("/", (req,res)=>{
    PackageAdd.find({}).then((homeItems)=>{
        if(homeItems){
            res.render("index", {package:homeItems});
        }else{
            res.render("index");
        }
        
    }).catch((err)=>{
        res.send("Issues connecting to Database"+err);
    })
    // res.send("Hello World");
    
})
app.get("/about", (req,res)=>{
    // res.send("Hello World");
    res.render("about");
})
// dispute letter pagination
app.get("/dispute-letters", (req,res)=>{
    PackageAdd.find({}).then((products)=>{
        if(products){
            res.render("letters", {"product":products});
        }else{
            res.render("letters");
        }
    });
    // res.render("letters");
})
app.get("/dispute-letters-2", (req,res)=>{
    PackageAdd.find({}).then((products)=>{
        if(products){
            res.render("letters-2", {"product":products});
        }else{
            res.render("letters");
        }
    });
    // res.render("letters");
})
app.get("/dispute-letters-3", (req,res)=>{
    PackageAdd.find({}).then((products)=>{
        if(products){
            res.render("letters-3", {"product":products});
        }else{
            res.render("letters");
        }
    });
    // res.render("letters");
})
app.get("/dispute-letters-4", (req,res)=>{
    PackageAdd.find({}).then((products)=>{
        if(products){
            res.render("letters-4", {"product":products});
        }else{
            res.render("letters");
        }
    });
    // res.render("letters");
})
// PAGINATION END

app.get("/contact", (req,res)=>{
    // res.send("Hello World");
    res.render("contact");
});

app.get("/checkout", (req,res)=>{
    var cook = req.session;
    // cook.push("Hairuuopop");
    // cook = [];
    // res.send("Hello World");
    // req.session.value.push("Ibrahim");
    // res.render("checkout");
    res.send(cook);
});

app.post("/checkout", (req,res)=>{
    
    res.render("checkout")
})

 function cartCount (realNum){
    var mainCount = realNum +1;
    console.log("my num", mainCount);
    return mainCount;
}
function totalAmount (oriAmount, newAmount){
    var totalCost = originalAmount +newAmount;
    console.log("my num", totalCost);
    return totalCost;
}


app.get("/add-to-cart/:id/:route", (req,res)=>{

    PackageAdd.findById({_id:req.params.id}).then((packFound)=>{
        console.log(packFound.packageName);
        console.log(packFound.price);
        

        var packages = {name:packFound.packageName, 
            amount:packFound.price};

        if (req.session.value == null){
            console.log("empty");
            var cookies = {
                items_count:1,
                total_price:packFound.price,
                items: [packages],
            }
            req.session.value = cookies;
        }else{
            console.log("not empty");
            var tempStore = req.session.value; 
            console.log(cartCount(tempStore.items_count));
            tempStore.items_count = cartCount(tempStore.items_count);
            
        }
        // req.session.value = cookies;


        // console.log(req.params.id);
        // console.log(req.params.route);
        
        var cookies = {
            items_count:1,
            total_price:0,
            items: [packages],
        }
        // req.session.value=cookies;
        res.send(req.session);

    })


 

})

app.get("/login", (req,res)=>{
    res.render("login");
})

app.get("/sign-up", (req,res)=>{
    res.render("register");
})

// app.get("/product/:proId",(req,res)=>{
//     console.log(req.params.proId);
//     PackageAdd.findById(req.params.proId).then((foundItem)=>{
//        if(foundItem){
//         res.render('product');
//        }else{
//         res.send(err)
//        }
//     }).catch((err)=>{
//         res.send(err);
//     })

// })


// app.get("/add-to-cart", (req,res)=>{
//     console.log("in cart");
//     req.session.value = ["Farouk"];
//     req.session.value.push("Musa");
//     var item = req.session;
//     // var previous      = req.session.value || "Farouk";
//     // req.session.value = previous + 1;
//     res.send(item);
// })

module.exports = {
    main:app,
    packageDB:PackageAdd
//     db:appDb(),
//     payment:paymentModel,
  }
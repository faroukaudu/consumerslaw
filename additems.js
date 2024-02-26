
// var packageSchema = require(__dirname + "/db/packagedb.js");
const mongoose = require("mongoose");
const myModule = require("./index.js");
const app = myModule.main;
const PackageAdd = myModule.packageDB;
const _ = require('lodash');
const e = require("express");


// const PackageAdd = mongoose.model("PackageInfo",packageSchema);

app.get("/add-product",(req,res)=>{
    // console.log(_.startCase(_.toLower("farouk audu")));
    // res.send("Adding items page");
    PackageAdd.find({}).then((products)=>{
        if(products){
            res.render("add-pro", {"product":products,cookies:req.session});
        }else{
            res.render("add-pro");
        }
    });
    
});


app.post("/add-package", (req,res)=>{
    const packageinvoice = {
        packageName:_.startCase(_.toLower(req.body.pacName)),
        packageinfo:_.capitalize(req.body.pacName),
        packageUrl:req.body.url,
        price:49,
    }
    PackageAdd.create(packageinvoice).then((done)=>{
       res.redirect("/add-product");
    }).catch((err)=>{
        res.send(err);
    })

    
})

app.post("/single-package",(req,res)=>{
    console.log(req.body.packageID);
    PackageAdd.findById({_id:req.body.packageID}).then((found)=>{
        res.render("product", {packages:found,cookies:req.session});
    }).catch((err)=>{
        res.send(err);
    })
})


app.get("/cart", (req,res)=>{
    res.render("cart-page",{cookies:req.session});
})

// Remove Itesm from Cart
app.get("/remove/:index/:price/:route",(req,res)=>{
    var myArr = req.session.value.items;
    console.log("My ARR b4 splice"+ myArr);
    console.log("my index is::"+ req.params.index);
    var indx = Number(req.params.index);
    var count = req.session.value.items_count;
    count --;
    req.session.value.items_count = count;
    console.log("COUNTER IS"+ count);

    console.log("$$$$$$"+req.params.price);
    var tAmount = req.session.value.total_price - req.params.price;
    console.log("TOTAL AMOUNT"+ tAmount);
    req.session.value.total_price = tAmount;
    
    console.log("lebgth is"+ req.session.value.items.length);
    // req.session.value.items.splice(indx);
    myArr.splice(indx, 1)
    // console.log("Remaining ARR"+myArr);
    // req.session.value.items = [];
    // myArr = [];

    if(req.params.route === "home"){
        res.redirect("/");
    }else {
        res.redirect("/"+req.params.route);
    }
    // console.log("remaining Array is"+ req.session.value.items);
    // console.log("SECOND LENGTH lebgth is"+ req.session.value.items.length)
})


// CHECKOUT

app.get("/checkout", (req,res)=>{
    var cook = req.session;
    // cook.push("Hairuuopop");
    // cook = [];
    // res.send("Hello World");
    // req.session.value.push("Ibrahim");
    // res.render("checkout");
    res.render("checkout", {cookies:req.session})
});

app.post("/checkout", (req,res)=>{
    
    res.render("checkout")
})
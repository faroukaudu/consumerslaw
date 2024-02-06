
// var packageSchema = require(__dirname + "/db/packagedb.js");
const mongoose = require("mongoose");
const myModule = require("./index.js");
const app = myModule.main;
const PackageAdd = myModule.packageDB;
const _ = require('lodash');


// const PackageAdd = mongoose.model("PackageInfo",packageSchema);

app.get("/add-product",(req,res)=>{
    // console.log(_.startCase(_.toLower("farouk audu")));
    // res.send("Adding items page");
    PackageAdd.find({}).then((products)=>{
        if(products){
            res.render("add-pro", {"product":products});
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
        res.render("product", {packages:found});
    }).catch((err)=>{
        res.send(err);
    })
})
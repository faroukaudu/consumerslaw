
// var packageSchema = require(__dirname + "/db/packagedb.js");
const mongoose = require("mongoose");
const myModule = require("./index.js");
var paypal = require('paypal-rest-sdk');
const app = myModule.main;
const PackageAdd = myModule.packageDB;
const _ = require('lodash');
const e = require("express");


// const PackageAdd = mongoose.model("PackageInfo",packageSchema);

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.CLIENTID,
    'client_secret': process.env.CLIENTSECRET,
  });

  app.get("/pay",(req,res)=>{
   

  })




var totalAmount;








app.get("/success",(req,res)=>{
    const payerId = req.query.PayerID;
    console.log("PayInfo"+ JSON.stringify(req.query));
    console.log("payerIIDD"+ payerId);
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id":payerId,
        "transactions":[{
            "amount":{
                "currency":"USD",
                "total":JSON.stringify(req.session.value.total_price),
            }
        }]
    }

    paypal.payment.execute(paymentId,execute_payment_json,function (error,payment){
        if(error){
            console.log(error.response);
            throw error;
        }else{
            res.send(payment);
            // console.log(JSON.stringify(payment));
            // res.render("success",{cookies:req.session});
        }
    })


})





app.post("/payment-form",(req,res)=>{
    // Payment for Non Users
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var email = req.body.email;
    var phoneNumber = req.body.phone;
    var deliMail = req.body.emailtosend;
    var orderComment = req.body.ordercomment;
    console.log(JSON.stringify(req.body.totalprice));
    console.log(req.session.value.items.length);
    // var paymentMeth = req.body.payment;
    console.log(
        firstName +" "+ lastName +" "+ email+" "+
        phoneNumber+" "+deliMail+" "+orderComment+" Cart items"
    );
    // res.send(req.session.total_price);
    // PAYPAL
    paypay_info = [];
    req.session.value.items.forEach(function(transactions){
         paypay_info.push({"name":transactions.name,"sku":transactions.name,"price":JSON.stringify(transactions.amount),
        "currency":"USD", "quantity":1});
    })
    console.log(paypay_info);
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:5000/success",
            "cancel_url": "http://cancel.url"
        },
        "transactions": [{
            "item_list": {
                "items": paypay_info,
            },
            "amount": {
                "currency": "USD",
                "total": JSON.stringify(req.session.value.total_price),
            },
            "description": "This is the payment description."
        }]
    };
     
     
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            for(let i = 0; i < payment.links.length; i++){
                if(payment.links[i].rel === "approval_url"){
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });

})


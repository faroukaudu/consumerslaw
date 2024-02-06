const myModule = require('./index.js');
const addPackages = require('./additems.js');
// const appadmin = require('./admin.js');
// const front = require('./front.js');

const app = myModule.main;



app.listen(process.env.PORT || 5000, function(req,res){
  console.log("server is now starting @ 5000!");
});

// app.use(function(req, res, next){
//   res.status(404).render("userdash/html/error");
// })

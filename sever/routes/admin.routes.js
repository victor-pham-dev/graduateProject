const auth = require("../middleware/auth");

module.exports = app => {
    const admins = require("../controller/admin.controller");
  
    var router = require("express").Router();
 
    router.post("/account/login", admins.LogIn);

    router.post("/account/register", admins.Register);


 
  
    app.use('/admin', router);
  };
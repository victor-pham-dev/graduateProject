const auth = require("../middleware/auth");

module.exports = app => {
    const homepages = require("../controller/homepage.controller");
  
    var router = require("express").Router();
 
    router.get("/", homepages.GetHomePage);

    router.post("/editbanner", homepages.EditBanner);

    router.post("/editslider", homepages.EditSlider);
    
    router.post("/editproductcarousel", homepages.EditProductCarousel);

    router.post("/editnewproduct", homepages.EditNewProduct);



 
  
    app.use('/homepage', router);
  };
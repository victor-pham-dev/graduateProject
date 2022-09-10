const auth = require("../middleware/auth");

module.exports = app => {
    const products = require("../controller/product.controller");
  
    var router = require("express").Router();
 
    router.post("/add",auth, products.Add);
    router.post("/edit/:id",auth, products.Edit);
    router.post("/search", products.Search);
    router.post("/customerreview",auth, products.CustomerReview);
    router.post("/getquantity",auth, products.getQuantity);
    //admin confirm sold
    router.post("/admin/confirmsold",auth, products.confirmSold);
    router.get("/all", products.GetAll);
    router.get("/find/:category", products.FindByCategory);
    router.get("/find/:category/:brand", products.FindByCategoryAndBrand);
    router.get("/detail/:id", products.FindById);
    router.get("/same/:category/:id", products.getSame);
    router.post("/admin/statistic/totalproduct",auth, products.getTotalProduct);

 




 
  
    app.use('/product', router);
  };
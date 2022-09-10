const auth = require("../middleware/auth");

module.exports = app => {
    const users = require("../controller/user.controller");
  
    var router = require("express").Router();
 
    // them moi' user
    router.post("/account/register", users.Register);
    // dang nhap
    router.post("/account/login", users.LogInEmail);
    // Đăng nhập = FACEBOOK
    router.post("/facebooklogin", users.FaceBookLogIn);
    // Thêm SẢN PHẨM VÀO GIỎ HÀNG
    router.post("/cart/add",auth, users.AddToCart);
    //CẬP NHẬT GIỎ HÀNG KHI TẠO ĐƠN BẰNG newCART
    router.post("/cart/update",auth, users.updateCart);
    // THÊM MỚI ĐỊA CHỈ
    router.post("/account/addaddress",auth, users.AddAddress);
    // UPDATE PROFILE
    router.post("/account/updateprofile",auth, users.updateProfile);
    // UPDATE AVATAR
    router.post("/account/updateavatar",auth, users.updateAvatar);
    // UPDATE FACEBOOK
    router.post("/account/updatefacebookid",auth, users.updateFacebook);
    //CHANGE PASSWORD
    router.post("/account/changepassword",auth, users.changePassword);
    // Get ALL USER QUANTITY
    router.post("/statistic/totaluser",auth, users.getTotalUser);
    // Get ALL USER 
    router.get("/all/:id",auth, users.getAllUser);
    // UPDATE ordersQuantity
    router.put("/updateorderquantity",auth, users.updateOrdersQuantity);



  
    app.use('/user', router);
  };
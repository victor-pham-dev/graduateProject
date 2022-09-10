const auth = require("../middleware/auth");
module.exports = app => {
    const orders = require("../controller/order.controller");
  
    var router = require("express").Router();
    //TẠO ĐƠN HÀNG MỚI
    router.post("/create",auth, orders.createOrder);
    //LẤY ĐƠN HÀNG CHƯA XÁC NHẬN
    router.get("/confirming/:userId",auth, orders.getConfirmingByUserId);
    //LẤY ĐƠN HÀNG ĐANG VẬN CHUYỂN
    router.get("/shiping/:userId",auth, orders.getShipingByUserId);
    //HỦY ĐƠN = ID ĐƠN HÀNG
    router.get("/done/:userId",auth, orders.getDoneByUserId);
    //HỦY ĐƠN = ID ĐƠN HÀNG
    router.post("/cancelbyid",auth, orders.cancelOrderWithId);
    //XÁC NHẬN ĐÃ THANH TOÁN
    router.post("/comfirmpaid",auth, orders.orderHasPaid);
    //XÁC NHẬN ĐÃ Đánh giá
    router.post("/confirmreview",auth, orders.confirmReview);

    
    //ADMIN
    router.get("/admin/unconfirmed/:adminid",auth, orders.getUnconfirmed);
    router.get("/admin/processing/:adminid",auth, orders.getProcessing);
    router.post("/admin/getdone",auth, orders.getDone);
    //XÁC NHẬN
    router.post("/admin/confirm",auth, orders.confirmOrder);
    //XÁC NHẬN ĐÃ HOÀN THÀNH
    router.post("/admin/confirmdone",auth, orders.confirmDone);
    //Lấy tổng đơn đã hoàn thành
    router.post("/statistic/totaldone",auth, orders.getTotalDone);
    
    //Lấy tổng đơn đã hoàn thành
    router.post("/statistic/totaldonebymonth",auth, orders.getTotalDoneByMonth);
    
    app.use('/order', router);
  };
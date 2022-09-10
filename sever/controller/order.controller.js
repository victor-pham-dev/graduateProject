const e = require("express");
const db = require("../models/model.index");
const Order = db.order;
const Admin = db.admin;
exports.createOrder = async (req, res) => {
  try{
    const {userId,value,items,total} = req.body;
    const data = await Order.create({
      "userId": userId,
      "items": items,
      "total": total,
      "payMethod": value.payMethod,
      "receiveAdd": value.receiveAdd,
      "status": "Chờ xác nhận",
      "statusNote": "",
      "review": false,
      "shipingInfo": []
    })
    if(data){
      res.status(200).send(data)
    }else{
      res.status(400).send("Invalid")
    }
  }catch (err){
    console.log(err)
  }
};
exports.getConfirmingByUserId = async (req, res) => {
  try{
    const {userId} = req.params;
    const data = await Order.find({"userId": userId,"status":"Chờ xác nhận"})
    if(data){
      res.status(200).send(data)
    }else{
      res.status(400).send("Invalid")
    }
  }catch (err){
    console.log(err)
  }
};
exports.getShipingByUserId = async (req, res) => {
  try{
    const {userId} = req.params;
    const data = await Order.find({"userId": userId,"status":"Vận chuyển"})
    if(data){
      res.status(200).send(data)
    }else{
      res.status(400).send("Invalid")
    }
  }catch (err){
    console.log(err)
  }
};
exports.getDoneByUserId = async (req, res) => {
  try{
    const {userId} = req.params;
    const data = await Order.find({"userId": userId,"status":"Hoàn thành"}).sort({"updatedAt": -1})
    if(data){
      res.status(200).send(data)
    }else{
      res.status(400).send("Invalid")
    }
  }catch (err){
    console.log(err)
  }
};
exports.cancelOrderWithId = async (req, res) => {
  try{
    const {userId,cancelId} = req.body


    const data = await Order.findOneAndUpdate({"userId": userId,"_id":cancelId},{"status": "Đã hủy"})
    if(data){
      res.status(200).send("cancelled")
    }else{
      res.status(400).send("Invalid")
    }
  }catch (err){
    console.log(err)
  }
};
exports.confirmReview = async (req, res) => {
  try{
    const id = req.body.orderId;


    const data = await Order.findByIdAndUpdate(id,{"review": true})
    if(data){
      res.status(200).send("OK")
    }else{
      res.status(400).send("Invalid")
    }
  }catch (err){
    console.log(err)
  }
};
//Xác nhận đơn đã thanh toán
exports.orderHasPaid = async (req, res) => {

  const userId = req.body.userId;
  const orderId = req.body.orderId;
  const transId = req.body.transId;
  try{

    const data = await Order.findOneAndUpdate({"userId": userId,"_id": orderId},{"status": "Vận chuyển","statusNote": "Đã thanh toán, Mã giao dịch : "+transId})
    if(data){
      res.status(200).send("confirmed")
    }

  }catch (err){
    console.log(err)
  }
};

//ADMIN
exports.getUnconfirmed = async (req, res) => {
  const id = req.params.adminid;
  try{
    const isAdmin = await Admin.findById(id)
    if(isAdmin){
      const data = await Order.find({"status": "Chờ xác nhận","payMethod": "Thanh toán khi nhận hàng"})
      if(data){
        res.status(200).send(data)
      }
    }else{
      res.status(403).send("INVALID")
    }
  }catch (err){
    console.log(err)
  }
};
exports.getProcessing = async (req, res) => {
  const id = req.params.adminid;
  try{
    const isAdmin = await Admin.findById(id)
    if(isAdmin){
      const data = await Order.find({"status": "Vận chuyển"})
      if(data){
        res.status(200).send(data)
      }
    }else{
      res.status(403).send("INVALID")
    }
  }catch (err){
    console.log(err)
  }
};
exports.confirmOrder = async (req, res) => {

  const adminId = req.body.adminId;
  const orderId = req.body.orderId;
  try{
    const isAdmin = await Admin.findById(adminId)
    if(isAdmin){
      const data = await Order.findByIdAndUpdate(orderId,{"status": "Vận chuyển"})
      if(data){
        res.status(200).send("confirmed")
      }
    }else{
      res.status(403).send("INVALID")
    }
  }catch (err){
    console.log(err)
  }
};
exports.confirmDone = async (req, res) => {

  const adminId = req.body.adminId;
  const orderId = req.body.orderId;
  try{
    const isAdmin = await Admin.findById(adminId)
    if(isAdmin){
      const data = await Order.findByIdAndUpdate(orderId,{"status": "Hoàn thành"})
      if(data){
        res.status(200).send("confirmed")
      }
    }else{
      res.status(403).send("INVALID")
    }
  }catch (err){
    console.log(err)
  }
};
exports.getDone = async (req, res) => {

  const id = req.body.id;
  try{
    const isAdmin = await Admin.findById(id)
    if(isAdmin){
      const data = await Order.find({"status": "Hoàn thành"})
      if(data){
        res.status(200).json(data)
      }
    }else{
      res.status(403).send("INVALID")
    }
  }catch (err){
    console.log(err)
  }
};

exports.getTotalDone =  (req, res) => {
  const id =  req.body.id;
 
    const admin =  Admin.findById(id);
   
    if(!admin){
      res.status(401).send("you are not admin");
    }else{
      Order.find({"status": "Hoàn thành"}).then(data=>{
        if(data){
          res.status(200).json({"datalength": data.length})
        }else{
          res.status(500).send("error")
        }
      })
    }
};
exports.getTotalDoneByMonth =  (req, res) => {
  const id =  req.body.id;
  const data = req.body.mounth;
  const firstDay =new Date(data + "-01");
  const lastDay =new Date(data + "-31");;

  const admin =  Admin.findById(id);
    if(!admin){
      res.status(401).send("you are not admin");
    }else{
      Order.find({createdAt:{$gte: firstDay.toISOString(),$lt: lastDay.toISOString()}}).then(data=>{
        if(data){
          res.status(200).json(data)
        }else{
          res.status(500).send("error")
        }
      })
    }
};


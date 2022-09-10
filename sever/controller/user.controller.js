const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require('jsonwebtoken');
const db = require("../models/model.index");

const User = db.user;
const Admin = db.admin;
exports.FaceBookLogIn = async (req, res) => {
  try {
    const password = 'secret';
    const {facebookId,email,name,avatar} = req.body.value;
    const user = await User.findOne({facebookId});
    if (user) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "48h",
        }
      );
      user.token = token;
      res.status(200).json({user});
    }else{
      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        facebookId: facebookId,
        name: name,
        email: email,
        avatar: avatar,
        phone: "",
        ordersQuantity:0,
        amountSpent:0,
        password: encryptedPassword,
        address :[]
      });
      const token = jwt.sign(
        { user_id: user._id, facebookId },
        process.env.TOKEN_KEY,
        {
          expiresIn: "48h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      res.status(201).json({user});
      
    }
    
  } catch (err) {
    console.log(err);
  }
};

exports.Register =  async (req, res) => {
      try {
        const {name,password, email,phone} = req.body;
        const oldUser = await User.findOne({ email });
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
          email: email.toLowerCase(), 
          password: encryptedPassword,
          name: name,
          phone: phone,
          facebookId:"",
          address :[],
          ordersQuantity:0,
          amountSpent:0
        });


        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "48h",
          }
        );
        user.token = token;

        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
    

  };

exports.LogInEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "48h",
        }
      );

      user.token = token;
      res.status(200).json(user);
    }else{
      res.status(400).send("Invalid");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.AddToCart = async (req, res) => {
  try{
    const {userId,value} = req.body;
    const data = await User.findByIdAndUpdate(userId,{$push: {cart: {$each:[value],$position: 0}}})
    if(data){
      res.status(200).send("add success")
    }else{
      res.status(400).send("Invalid")
    }
  }catch (err){
    console.log(err)
  }

};
exports.AddAddress = async (req, res) => {
  try{
    const {userId,value} = req.body;
    const newAdd = {
      "name": value.name,
      "phone": value.phone,
      "specificAdd": value.specificAddress,
      "district": value.district,
    }
    const data = await User.findByIdAndUpdate(userId,{$push: {"address": {$each:[newAdd],$position: 0}}})
    if(data){
      res.status(200).json(data.address)
    }else{
      res.status(400).send("Invalid")
    }
  }catch (err){
    console.log(err)
  }
};

exports.updateCart = async (req, res) => {
  try{
    const {userId,newCart} = req.body


    const data = await User.findByIdAndUpdate(userId,{"cart": newCart})
    if(data){
      res.status(200).send("Update success")
    }else{
      res.status(400).send("Invalid")
    }
  }catch (err){
    console.log(err)
  }
};
exports.updateAvatar = async (req, res) => {
  try{
    const id = req.body.id;
    const img = req.body.data;


    const data = await User.findByIdAndUpdate(id,{"avatar": img})
    if(data){
      res.status(200).send("Update success")
    }else{
      res.status(400).send("Invalid")
    }
  }catch (err){
    console.log(err)
  }
};
exports.updateFacebook = async (req, res) => {
  try{
    const value = req.body.value;
    const id = value.id;
    const facebookId = value.facebookId;
 
    const data = await User.findByIdAndUpdate(id,{"facebookId": facebookId})
    if(data){
      res.status(200).send("Update success")
    }else{
      res.status(400).send("Invalid")
    }
  }catch (err){
    console.log(err)
  }
};

exports.updateProfile = async (req, res) => {
  try{
    const id = req.body.id;
    const phone = req.body.phone;
    const email = req.body.email;
    const existPhone = await User.findOne({"phone": phone});
    const existEmail = await User.findOne({"email": email})
    if(existPhone && existPhone._id != id){
      res.status(200).send("phoneexist")
    }
    else if(existEmail && existEmail._id != id){
      res.status(200).send("emailexist")
    }else{
      User.findByIdAndUpdate(id,{"phone":phone,"email": email})
      .then(data=>{
        if(data){
          res.status(201).send("update success")
        }
      })
    }
  }catch (err){
    console.log(err)
  }
};
exports.changePassword = async (req, res) => {
  
  try{
    const {newValues} = req.body;
    let currentPassword = newValues.currentPassword;
    if(currentPassword == "noway"){
      currentPassword = 'secret';
    }

    const newPassword = newValues.newPassword;
    const currUser = await User.findById(newValues.userId);
    if (currUser && (await bcrypt.compare(currentPassword, currUser.password))) {
      const encryptedPassword = await bcrypt.hash(newPassword, 10);
      User.findByIdAndUpdate(newValues.userId,{"password": encryptedPassword}).then(data=>{
        if(data){
          res.status(200).send("ok")
        }
      })
    }else{
      res.status(200).send("incorrect")
    }
   
    
  }catch (err){
    console.log(err)
  }
};



exports.getTotalUser =  (req, res) => {
  const id =  req.body.id;
 
    const admin =  Admin.findById(id);
   
    if(!admin){
      res.status(401).send("you are not admin");
    }else{
      User.find({}).then(data=>{
        if(data){
          res.status(200).json({"datalength": data.length})
        }else{
          res.status(500).send("error")
        }
      })
    }

  
};
exports.getAllUser =  (req, res) => {
  const id =  req.params.id;
 
    const admin =  Admin.findById(id);
   
    if(!admin){
      res.status(401).send("you are not admin");
    }else{
      User.find({}).then(data=>{
        if(data){
          res.status(200).json(data)
        }else{
          res.status(500).send("error")
        }
      })
    }

  
};
exports.updateOrdersQuantity =  (req, res) => {
  const id =  req.body.id;
  const userId =  req.body.userId;
  const amountSpent =  req.body.amountSpent;
 
  const admin =  Admin.findById(id);
   
    if(!admin){
      res.status(401).send("you are not admin");
    }else{
      User.findByIdAndUpdate(userId,{$inc: {"ordersQuantity":1,"amountSpent":amountSpent}}).then(data=>{
        if(data){
          res.status(200).send("updated")
        }else{
          res.status(500).send("error")
        }
      })
    }

  
};

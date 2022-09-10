const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require('jsonwebtoken');
const db = require("../models/model.index");

const Admin = db.admin;
//admion tạo tài khoản
exports.Register =  async (req, res) => {
  try {
    // Get user input

    const {username,password, password2} = req.body;
    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Admin.findOne({ username });

    if (oldUser) {
      return res.status(409).send("Tên người dùng đã tồn tại !");
    }else if(password2 !== 'code'){
      return res.status(406).send("Yêu cầu không hợp lệ !")
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const admin = await Admin.create({
      username: username.toLowerCase(), 
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: admin._id, username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );
    // save user token
    admin.token = token;

    // return new user
    res.status(201).json(admin);
  } catch (err) {
    console.log(err);
  }


};

//admin đăng nhập
exports.LogIn = async (req, res) => {

  try {
    // Get user input
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: admin._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "12h",
        }
      );

      // save user token
      admin.token = token;

      // user
      res.status(200).json(admin);
    }else{
      res.status(403).send("Invalid");
    }

  } catch (err) {
    console.log(err);
  }
};
exports.UpdateUserAsset =   (req, res) => {
    const {record, done, adminEmail} = req.body
     User.findByIdAndUpdate(record.id,{"$inc":{"asset": record.amount}})
    .then(data=>{
      if(data){
        Transaction.findByIdAndUpdate(record.transId,
          {"$set":{"seller":adminEmail,"doneTime": done,"note": "Thành công","status":3}})
          .then(data=>{
            res.status(200).send("xong")
          })  
      }
      else{
        res.status(400)
      }
  })
}


exports.conFirmWithdraw =   (req, res) => {
  const {id,done, adminEmail} = req.body

  Transaction.findByIdAndUpdate(id,{"seller":adminEmail,"doneTime": done,"note": "Thành công","status":3})
  .then(data=>{
    if(data){
      res.status(200).send("ok")
    }else{
      res.status(401).send('err')
    }
  })
       

}
exports.addResult =   (req, res) => {
  const {openId, value} = req.body
  Lucky.findByIdAndUpdate(openId,{"winnumber":value.winnumber})
  .then(data=>{
    if(data){
      res.status(200).send("ok")
    }else{
      res.status(401).send('err')
    }
  })
}
exports.updateWinner =  (req, res) => {
  const {id, data} = req.body
  Lucky.findByIdAndUpdate(id,{"players":data,"ischeck": true})
  .then(data=>{
    if(data){
      res.status(200).send("ok")
    }else{
      res.status(401).send('err')
    }
  })
}
exports.awardLuckyNumber =  (req, res) => {
  const {userEmail, claim} = req.body
  User.findOneAndUpdate({"email":userEmail},{"$inc":{"asset": claim}})
  .then(data=>{
    if(data){
      res.status(200).send("ok")
    }else{
      res.status(401).send('err')
    }
  })
}
exports.craetenewlucky =  (req, res) => {
  const luckykey= req.params.luckykey;

  var now = new Date();

  const date = now.toLocaleDateString();

  Lucky.findOne({"date":date,"luckykey":luckykey}).then(data=>{
    if(data == null){

      const lucky = new Lucky({
        date:date,
        winnumber: null,
        status: "opening",
        luckykey: luckykey,
        players:[],
        ischeck: false,
        awards: false
      })
      lucky.save(lucky)
        .then(data => {
          res.status(200).send(data._id);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the lucky round."
          });
        });
    }else{
      res.status(501).send("exist")
    }
  
  })
}
exports.endLucky =  (req, res) => {
  const {id} = req.body
  Lucky.findByIdAndUpdate(id,{"status": "end"})
  .then(data=>{
    if(data){
      res.status(200).send("ok")
    }else{
      res.status(401).send('err')
    }
  })
}



const db = require("../models/model.index");

const HomePage = db.homepage;
//Lấy dữ liệu Homepage
exports.GetHomePage = (req, res) => {
 
  HomePage.find()
  .then(data=>{
    if(data){
          res.status(200).json(data[0])
    }else{res.status(400).send("err")}
})
}
//Chỉnh sửa banner
exports.EditBanner = (req, res) => {
    const data = req.body.data;
    const id = req.body.id;
    HomePage.findByIdAndUpdate(id,{"banner": data})
    .then(data=>{
      if(data){
            res.status(200).send("ok")
      }
      else{
        res.status(400)
      }
  })
}
//Chỉnh sửa slider
exports.EditSlider = (req, res) => {
    const data = req.body.data;
    const id = req.body.id;
    HomePage.findByIdAndUpdate(id,{"slider": data})
    .then(data=>{
      if(data){
            res.status(200).send("ok")
      }
      else{
        res.status(400)
      }
  })
}
//Chỉnh sửa product carousel
exports.EditProductCarousel = (req, res) => {
    const data = req.body.data;
    const id = req.body.id;
    HomePage.findByIdAndUpdate(id,{"productCarousel": data})
    .then(data=>{
      if(data){
            res.status(200).send("ok")
      }
      else{
        res.status(400)
      }
  })
}
//Chỉnh sửa new product 
exports.EditNewProduct = (req, res) => {
    const data = req.body.data;
    const id = req.body.id;
    HomePage.findByIdAndUpdate(id,{"hotProduct": data})
    .then(data=>{
      if(data){
            res.status(200).send("ok")
      }
      else{
        res.status(400)
      }
  })
}


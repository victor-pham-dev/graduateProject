const db = require("../models/model.index");

const Product = db.product;
const Admin = db.admin;

//Thêm sản phẩm mới
exports.Add =  async (req, res) => {
try{
    const {category,config,brand,name,status,classify,imgurl,productinfo} = req.body;

    var priceRange = "";
    if(!classify) {
      res.status(402).send("classify required")
    }

    var listPrice =[];
    classify.forEach(item => {
      listPrice.push(item.classifyprice)
    });
    const low = Math.min(...listPrice);
    const high =  Math.max(...listPrice);
    
    if(low == high){
      priceRange = high.toLocaleString();
    }else{
      priceRange = low.toLocaleString() + "-"+high.toLocaleString();
    }
    
    const product = new Product({
        category: category,
        brand: brand,
        name: name,
        pricerange: priceRange,
        highestprice: high,
        status: status,
        config: config,
        classify: classify,
        cardimg: imgurl[0],
        imgurl: imgurl,
        productinfo: productinfo,
        sold: 0,
      });
      product
        .save(product)
        .then(data => {
          res.status(200).send(data._id);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Đã có lỗi khi thêm mới sản phẩm !"
          });
        });
}catch (err){
    console.log(err)
}
};
//Sửa theo ID
exports.Edit =  async (req, res) => {
try{
    const id = req.params.id;
    const {category,brand,config,name,status,classify,imgurl,productinfo} = req.body;

    var priceRange = "";
    if(!classify) {
      res.status(402).send("classify required")
    }
    var listPrice =[];
    classify.forEach(item => {
      listPrice.push(item.classifyprice)
    });
    const low = Math.min(...listPrice);
    const high =  Math.max(...listPrice);
    
    if(low == high){
      priceRange = high.toLocaleString();
    }else{
      priceRange = low.toLocaleString() + "-"+high.toLocaleString();
    }
    
    Product.findByIdAndUpdate(id,{
      "category": category,
      "brand": brand,
      "name": name,
      "pricerange": priceRange,
      "highestprice": high,
      "status": status,
      "config":config,
      "classify": classify,
      "cardimg": imgurl[0],
      "imgurl": imgurl,
      "productinfo": productinfo,
    })
    .then(data => {
      res.status(200).send(data._id);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Đã có lỗi khi thêm mới sản phẩm !"
      });
    });
}catch (err){
    console.log(err)
}
};
//Tìm theo CATEGORY
exports.FindByCategory = (req, res) => {

    Product.find({"category": req.params.category },{_id:1,name: 1,category:1,config:1,brand:1,lowestprice:1,classify:1,highestprice:1,sold:1,cardimg:1,status: 1,pricerange:1,highestprice: 1,createdAt:1}).sort({createdAt: -1})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error ."
        });
      });
  };
//Tìm theo MENU & BRAND
exports.FindByCategoryAndBrand = (req, res) => {
 
    Product.find({"category": req.params.category, "brand": req.params.brand },{_id:1,config:1,category:1,name: 1,brand:1,classify:1,lowestprice:1,sold:1,highestprice:1,cardimg:1,status: 1,pricerange:1,highestprice: 1,createdAt:1}).sort({createdAt: -1})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error ."
        });
      });
  };
//Lấy tất cả sản phẩm
exports.GetAll = (req, res) => {
    Product.find({},{_id:1,name: 1,sold:1,config:1,category:1,classify:1,lowestprice:1,highestprice:1,cardimg:1,status: 1,pricerange:1,highestprice: 1}).sort({updatedAt: -1})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error ."
        });
      });
  };
  // Tìm theo ID
exports.FindById = (req, res) => {

    const {id} = req.params;
    Product.findOne({"_id": id})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error ."
        });
      });
  };
exports.confirmSold = async (req, res) => {
  try{
    const quantity = req.body.quantity;
    const classifyname = req.body.classifyname;
    const id = req.body.id;

    const data = await  Product.findById(id);
    if(data){
      const newSold =  data.sold + quantity;
      const cloneClassify =  data.classify;
      cloneClassify.map((value,key)=>{
        if(value.classifyname == classifyname && !value.classifysold){
          cloneClassify[key].classifyquantity =  cloneClassify[key].classifyquantity - quantity;
          cloneClassify[key].classifysold = quantity;
          return cloneClassify;
        }else if(value.classifyname == classifyname && value.classifysold){
          cloneClassify[key].classifyquantity =  cloneClassify[key].classifyquantity - quantity;
          cloneClassify[key].classifysold = cloneClassify[key].classifysold+ quantity;
          return cloneClassify;
        }else{
          return null;
        }
      })
      Product.findByIdAndUpdate(id,{"classify": cloneClassify, "sold": newSold})
      .then(data=>{
        if(data){
          res.status(200);
        }else{
          res.status(500);
        }
      })
    }
   

    }catch(err){
      console.log(err)
    }
     
  };
exports.getSame = (req, res) => {

    const {id,category} = req.params;
    Product.find({"category":category, "_id":{$ne: id}},{_id:1,name:1,status:1,cardimg:1,lowestprice:1,pricerange:1}).limit(4)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error ."
        });
      });
  };
exports.getQuantity = (req, res) => {

    const id = req.body.id;
    const type = req.body.classifyname;
    Product.findById(id)
      .then(data => {
       
        const classifyArr = data.classify;
        
        classifyArr.forEach(item=>{
          if(item.classifyname == type){
            res.status(200).json(item.classifyquantity)
          }
        })
       
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error ."
        });
      });
  };
exports.Search = (req, res) => {

    const {text} = req.body;
    Product.find({"name" : {'$regex' : text,'$options': 'i'}},{_id:1,config:1,name:1,category:1,sold:1,cardimg:1,pricerange:1,status:1})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err)
      });
};
exports.CustomerReview = (req, res) => {
    const value =req.body.value;
    const item = {
        "userId": value.id,
        "username": value.username,
        "avatar": value.avatar,
        "reviewText": value.reviewText,
        "rateStar": value.rateStar,
        "classifyname": value.classifyname,
      }
      Product.findOneAndUpdate({"name": value.name,"cardimg": value.cardimg},
      {
        $push: {"reviews": {$each:[item],$position: 0}}
      }
      ).then(data=>{
          if(data){
            res.status(200).send('OK')
          }else{
            res.status(500).send("ERROR")
          }
      })
  
};



exports.getTotalProduct =  (req, res) => {
  const id =  req.body.id;
 
    const admin =  Admin.findById(id);
   
    if(!admin){
      res.status(401).send("you are not admin");
      console.log("ok");
    }else{
      Product.find({}).then(data=>{
        if(data){
          res.status(200).json({"datalength": data.length})
        }else{
          res.status(500).send("error")
        }
      })
    }
};

exports.getBestSeller =  (req, res) => {
  const id =  req.body.id;
 
    const admin =  Admin.findById(id);
   
    if(!admin){
      res.status(401).send("you are not admin");
      console.log("ok");
    }else{
      Product.find({}).sort({"sold": -1}).limit(10).then(data=>{
        if(data){
          res.status(200).json(data)
        }else{
          res.status(500).send("error")
        }
      })
    }
};



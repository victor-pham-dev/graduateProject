
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models/model.index");
const fs = require("fs")
const bodyParser = require("body-parser");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const Image = db.image;

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
    }
})
var upload = multer({ storage: storage });
app.post('/file/singleupload', upload.single('file'), (req, res) => {
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    var finalImg = {
        contentType: req.file.mimetype,
        image:Buffer.from(encode_image, 'base64')
    };

    Image.create(finalImg, (err, result) => {
        if (err){ return console.log(err)
        }else{
          res.status(200).send(result._id)
        }
    })
})
app.get('/file/:id', async (req, res) => {
  try {
    var id = req.params.id;
    const img = await  Image.findById(id);

    if(img){
      res.contentType('image/jpeg');
      res.send(new Buffer.from(img.image.buffer, 'base64'))
    }
  } catch (error) {
    console.log(error)
  }
  
})
require("./routes/admin.routes")(app);
require("./routes/product.routes")(app);
require("./routes/user.routes")(app);
require("./routes/order.routes")(app);
require("./routes/homepage.routes")(app);





const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
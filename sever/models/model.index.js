const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js")(mongoose);
db.admin = require("./admin.model")(mongoose);
db.product = require("./product.model")(mongoose);
db.order = require("./order.model")(mongoose);
db.image = require("./image.model")(mongoose);
db.homepage = require("./homepage.model")(mongoose);

module.exports = db;
module.exports = mongoose => {
    const Product = mongoose.model(
      "product",
      mongoose.Schema(
        {
          "name": String,
          "category": String,
          "brand": String,
          "status": String,
          "classify": [{
            "classifyname": String,
            "classifyprice": Number,
            "classifyquantity": Number,
            "classifysold": Number
          }],
          "config": Object,
          "pricerange": String,
          "highestprice": Number,
          "productinfo":String,
          "cardimg": String,
          "imgurl": Array,
          "reviews": Array,
          "sold": Number
        },
        { timestamps: true }
      )
    );
  
    return Product;
  };
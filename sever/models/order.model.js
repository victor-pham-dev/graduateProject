module.exports = mongoose => {
    const Order = mongoose.model(
      "order",
      mongoose.Schema(
        {
          "userId": String,
          "items": Array,
          "total": Number,
          "payMethod": String,
          "receiveAdd": Object,
          "status": String,
          "review": Boolean,
          "statusNote": String,
          "shipingInfo": Array
        },
        { timestamps: true }
      )
    );
  
    return Order;
  };
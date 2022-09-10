module.exports = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          username:String,
          facebookId: String,
          name: String,
          email : String,
          phone : String,
          avatar: String,
          password: String,
          token:String,
          cart: Array,
          ordersQuantity: Number,
          amountSpent: Number,
          address: Array,
          paymethod: Array
        }
      )
    );
  
    return User;
  };
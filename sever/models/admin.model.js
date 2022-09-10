module.exports = mongoose => {
    const Admin = mongoose.model(
      "admin",
      mongoose.Schema(
        {
            username: { type: String },
            password: {type: String},
            token: { type: String }
        },
        { timestamps: true }
      )
    );
  
    return Admin;
  };
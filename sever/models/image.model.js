module.exports = mongoose => {
    const Image = mongoose.model(
      "image",
      mongoose.Schema(
        {
          contentType: String,
          image: Buffer
        }
      )
    );
  
    return Image;
  };
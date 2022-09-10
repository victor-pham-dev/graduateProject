module.exports = mongoose => {
    const HomePage = mongoose.model(
      "homePage",
      mongoose.Schema(
        {
            slider: Array,
            banner: {type: String},
            productCarousel: Array,
            hotProduct: Array
        })
    );
  
    return HomePage;
  };
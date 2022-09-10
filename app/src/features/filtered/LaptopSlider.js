import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../img/lap1.webp"
import img2 from "../img/lap2.webp"
import img3 from "../img/lap3.webp"
import img4 from "../img/lap4.webp"
import img5 from "../img/lap5.webp"
import img6 from "../img/lap6.webp"
function LaptopSlider (props){
  
 
  const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
      <div >
        <Slider {...settings}>
          <div>
            <img style={{width: "100%"}} src={img1} alt="laptop" />
          </div>
          <div>
            <img style={{width: "100%"}} src={img2} alt="laptop" />
          </div>
          <div>
            <img style={{width: "100%"}} src={img3} alt="laptop" />
          </div>
          <div>
            <img style={{width: "100%"}} src={img4} alt="laptop" />
          </div>
          <div>
            <img style={{width: "100%"}} src={img5} alt="laptop" />
          </div>
          <div>
            <img style={{width: "100%"}} src={img6} alt="laptop" />
          </div>
        </Slider>
      </div>
    );
  }

export default LaptopSlider;
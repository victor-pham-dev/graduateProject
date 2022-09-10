import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../productCard/ProductCard";
function HotCarousel (props){
  const [data,setData]= useState([]);
  useEffect(()=>{
        if(props.data){
            setData(props.data)
        }
  },[props.data])
  const mapData = data.map((value,key)=>{
    if(value){
      return (
        <div   key={key}>
            <ProductCard  data={value} />
      
        </div>
    )
    }else{
      return null;
    }
      
  })
  const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      autoplay: false,
      slidesToShow: 4,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
           
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
           
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    }
    return (
      <div style={{margin: "0 16px 0 16px"}} >
        <Slider {...settings}>
          {mapData}
        </Slider>
      </div>
    );
  }

export default HotCarousel;
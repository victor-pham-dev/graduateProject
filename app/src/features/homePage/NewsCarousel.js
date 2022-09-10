import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import  './style.css'
function NewsCarousel(props) {
    const [data,setData]= useState([]);
    useEffect(()=>{
        if(props.data){
            setData(props.data)
        }
    },[props.data])
    const mapData = data.map((value,key)=>{
        if(value){
            return (
                <div key={key}>
                    <img style={{height: 280,width: "100%"}} src={process.env.REACT_APP_SERVER_URL+ "/file/"+value} alt='Thông tin khuyến mãi' />
              
                </div>
            )
        }
       
    })
    return (
            <Carousel className='newsCarousel'
                autoPlay={true}
                infiniteLoop={true}
                interval={4000}
                showStatus={false}
                showThumbs={false}
                showArrows={true}

            >
                {mapData}
            </Carousel>
    );
}

export default NewsCarousel;        
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Banner (props){
  const [data,setData]= useState('');
  useEffect(()=>{
        if(props.data){
            setData(props.data)
        }
  },[props.data])

    return (
      <Link to={"/khuyen-mai"}>
        <img  style={{height: "100%",width: "100%", boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}} src={process.env.REACT_APP_SERVER_URL+ "/file/"+data} alt="Khuyến mãi đặc biệt" />
      </Link>
    );
  }

export default Banner;
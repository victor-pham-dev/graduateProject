import React, { useEffect, useState } from 'react';
import { Card, Badge, Row, Col } from 'antd';
import './ProductCard.css'
import { Link } from 'react-router-dom';
import { BsCpu,BsLaptop } from 'react-icons/bs';
import { FaMemory } from 'react-icons/fa';
import { GiCpu } from 'react-icons/gi';
import { AiOutlineMobile } from 'react-icons/ai';
import { BiMemoryCard } from 'react-icons/bi';
const { Meta } = Card;

const removeMarkUrl = (str) => {
    str = str.toLowerCase();     
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');
    str = str.replace(/([^0-9a-z-\s])/g, '');
    str = str.replace(/(\s+)/g, '-');
    str = str.replace(/^-+/g, '');
    str = str.replace(/-+$/g, '');
    return str;
}

function ProductCard(props) {
    const data = props.data;
    const removedUrl = removeMarkUrl(data.name);
    const cardimg = process.env.REACT_APP_SERVER_URL + "/file/"+ data.cardimg;
    const [ribbonColor,setRibbonColor] = useState("red")
    useEffect(()=>{
        if(data.status === "Còn hàng"){
            setRibbonColor("#02d6cc")
        }else if(data.status === "Sắp về"){
            setRibbonColor("#1890ff")
        }else if(data.status === "Trả góp 0%"){
            setRibbonColor("#0dbf8a")
        }
    },[data.status])
    const checkType = ()=>{
        const config = data.config;
       
        if(data.category === 'mobile'){
            return (
                <Row gutter={[4,4]} >
                    <Col span={24}><BsCpu  /> <span style={{lineHeight: "10px"}} >{config.cpu}</span></Col>
                    <Col><FaMemory /> <span>{config.ram}GB</span></Col>
                   
                    <Col><AiOutlineMobile /> <span>{config.monitorSize} inch</span></Col>
                    <Col><BiMemoryCard /> <span>{config.rom}</span></Col>
                </Row>
            )
        }else if(data.category === 'laptop'){
            return (
                <Row gutter={[1,1]} >
                <Col span={24}><BsCpu  /> <span style={{lineHeight: "10px"}} >{config.cpu}</span></Col>
                <Col span={12}><FaMemory /> <span>{config.ram}GB</span></Col>
                <Col span={12}><BiMemoryCard /> <span>{config.rom}</span></Col>
                <Col span={24}><BsLaptop /> <span>{config.monitorSize} inch</span></Col>
              
                <Col><GiCpu /> <span>{config.gpu}</span></Col>
               
            </Row>
            )
        }
    }
   
    return (

        <Badge.Ribbon text={data.status} color={ribbonColor}>
        <Link to={"/chi-tiet-san-pham/"+removedUrl+"/"+data._id }>     
            <Card
                hoverable
                style={{borderRadius: 8, width: "100%",opacity: 0.9, border: "1px solid #1890ff" }}
                cover={
                <img
                    style={{padding: 2,width: "100%"}}
                    alt={data.name}
                    src={cardimg}
                />
                }
            >
                <Meta
                title={data.name}
                />
               {checkType()}
                <h4 style={{color: "red"}}>{data.pricerange}</h4>
               
            </Card>
        </Link>  
        </Badge.Ribbon>

    );
}

export default ProductCard;
import React, { useEffect, useState } from 'react';
import  './style.css'
import ProductCard from '../productCard/ProductCard'
import { Col,Row } from 'antd';
function NewProduct(props) {
    const [data,setData]= useState([]);
    useEffect(()=>{
        if(props.data){
            setData(props.data)
        }
    },[props.data])
    const mapData = data.map((value,key)=>{
        if(value){
            return (
                <Col xl={{span:6}} lg={{span:8}} md={{span:8}} sm={{span:12}} xs={{span:12}} key={key}>
                    <ProductCard data={value} />
                </Col>
            )
        }else{
            return null;
        }
       
    })
    return (
        <Row gutter={[8,8]}>
            {mapData}
        </Row>
    );
}

export default NewProduct;        
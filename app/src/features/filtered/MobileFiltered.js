import { Col, Radio, Row, Select, } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from '../productCard/ProductCard';
import MobileNav from './MobileNav';
import MobileSlider from './MobileSlider';
function MobileFiltered(props) {
   
    const kw = props.category;
    const [data,setData] = useState([]);


    useEffect(()=>{
        if(props.brand === null){
           
            let getData = async ()=>{
                const res = await axios.get(process.env.REACT_APP_SERVER_URL+ "/product/find/"+kw);
                if(res.data){
                    setData(res.data)
                }
            }
            getData();
        }else{
            let getData = async ()=>{
                const res = await axios.get(process.env.REACT_APP_SERVER_URL+ "/product/find/"+kw+"/"+props.brand);
                if(res.data){
                    setData(res.data)
                }
            }
            getData();
        }
       
      
    },[kw,props.brand])
    const mapProduct = data.map((value,key)=>{
        if(value){
            return(
                <Col key={key} xl={{span:6}} lg={{span:6}}>
                    <ProductCard data={value}  />
                </Col>
            )
        }else{
            return null;
        }
    })
    const filterChange =  (e) =>{
        const value = e.target.value;
        var cloneData = [...data];
        if(value === 'descending'){
            cloneData.sort((a, b) => a.highestprice - b.highestprice);
            
        }else if(value === 'ascending'){
           
            cloneData.sort((a, b) => b.highestprice - a.highestprice);
        }else if(value === 'newest'){
           
            cloneData.sort((a, b) =>new Date(b.createdAt) - new Date(a.createdAt));
        }else if(value === 'bestseller'){
           
            cloneData.sort((a, b) => b.sold - a.sold);
        }
        setData(cloneData);
    }
    return (
        <>
        <MobileSlider />
        <MobileNav  /> 
        <Row  style={{background: "white",padding: 5,marginBottom: 5}} >

           

        </Row>
        <Row gutter={[8,8]} style={{padding:8,borderRadius: 16, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
            <Col span={24}>
            <span style={{fontSize: "1rem"}}>Sắp xếp theo</span>
            <Radio.Group onChange={filterChange} defaultValue="newest">
                <Radio.Button value="newest">Mới nhất</Radio.Button>
                <Radio.Button value="descending">Giá từ thấp đến cao</Radio.Button>
                <Radio.Button value="ascending">Giá từ cao đến thấp</Radio.Button>
                <Radio.Button value="bestseller">Bán chạy nhất</Radio.Button>
            </Radio.Group>
            </Col>
            {mapProduct}
         
            
        </Row>
        </>
    );
}

export default MobileFiltered;
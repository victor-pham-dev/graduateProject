import { Col, Divider, Row } from 'antd';
import React,{useState,useEffect} from 'react';
import HotCarousel from './HotCarousel';
import NewsCarousel from './NewsCarousel';
import axios from 'axios';
import Banner from './Banner';
import NewProduct from './NewProduct';

function HomePage(props) {
    const [data,setData]= useState('');
    if(props.isScroll){
        window.scrollTo(0,0);
    }
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "/homepage")
        .then(res=>{
            if(res.status === 200){
                setData(res.data)
            }
          
        })
    },[])

    return (
        <>
        <Row gutter={[16,16]}  >
            <Col md={24} lg={{span: 16}} xl={16} xxl={16}>
                <NewsCarousel data={data.slider} />
            </Col>
            <Col  style={{maxHeight: 280}} xl={{span: 8,push:0}} lg={{span: 8,push: 0}} md={{span:10, push: 6}} xxl={{span:8,push: 0}}>
               <Banner data={data.banner} />

            </Col>
        </Row>
        <div style={{
            height: 50,
            background: "#2bbbf0",
            color: "white",
            padding: 10,
            lineHeight:50,
            marginTop: 20
            }}>
                <Divider style={{color:"white",margin:0}}> SẢN PHẨM NỔI BẬT</Divider>
               
        </div>
       
        <HotCarousel data={data.productCarousel} />
     
        <div style={{
            height: 50,
            background: "#2bbbf0",
            color: "white",
            padding: 10,
            lineHeight:50,
            marginTop: 10,
            marginBottom: 10
            }}>
                <Divider style={{color:"white",margin:0}}> SẢN PHẨM MỚI  </Divider>
               
        </div>
        <NewProduct data={data.hotProduct} />

        </>
    );
}

export default HomePage;
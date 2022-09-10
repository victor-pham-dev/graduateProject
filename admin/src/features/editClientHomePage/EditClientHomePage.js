import { Col, Divider, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import EditHotCarousel from './EditHotCarousel';
import EditNewsCarousel from './EditNewsCarousel'
import EditBanner from './EditBanner';
import EditNewProduct from './EditNewProduct';
import axios from 'axios';
function EditClientHomePage(props) {
    const [data, setData] = useState('');
    useEffect(()=>{
        axios.get(process.env.REACT_APP_SERVER_URL+ "/homepage")
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
                <EditNewsCarousel data={data.slider} id={data._id} />
            </Col>
            <Col  style={{maxHeight: 280}} xl={{span: 8,push:0}} lg={{span: 8,push: 0}} md={{span:10, push: 6}} xxl={{span:8,push: 0}}>
               <EditBanner data={data.banner} id={data._id} />
               
               

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
    
        <EditHotCarousel data={data.productCarousel} id={data._id} />

        <div style={{
            height: 50,
            background: "#2bbbf0",
            color: "white",
            padding: 10,
            lineHeight:50,
            marginTop: 20
            }}>
                <Divider style={{color:"white",margin:0}}> SẢN PHẨM MỚI  </Divider>
               
        </div>
       <EditNewProduct data={data.hotProduct} id={data._id} />

        </>
    );
}

export default EditClientHomePage;
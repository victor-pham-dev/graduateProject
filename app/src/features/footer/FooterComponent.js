import React from 'react';
import {FacebookOutlined,YoutubeOutlined} from '@ant-design/icons';
import {Row,Col,Divider,Button} from "antd";
import { Link } from 'react-router-dom';
function FooterComponent(props) {
    return (
        <>
       <Row justify="center">
            <Col xl={{span: 8}}>
               <Row>Thông tin liên hệ: 0343241299</Row>
               <Row>Địa chỉ : HN</Row>
            </Col>
            <Col xl={{span: 8}}></Col>
            <Col xl={{span: 8}}>
            
                    <a href={"https://facebook.com/truongpham2412"}>
                        <Button style={{color: "blue"}} icon={<FacebookOutlined  />} >Facebook</Button>
                    </a>
              
                
                    <a href={"https://facebook.com/truongpham2412"}>
                        <Button  style={{color: "red"}} icon={<YoutubeOutlined />} >Youtube</Button>
                    </a> 
               
                
              
            </Col>
       </Row>
        <Divider> Made by truongpham</Divider>
        </>
    );
}

export default FooterComponent;
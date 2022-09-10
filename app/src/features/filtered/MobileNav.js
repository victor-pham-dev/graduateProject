import { Col, Divider, Row } from 'antd';
import React from 'react';
import apple from '../img/apple.jpg';
import samsung from '../img/samsung.jpg';
import xiaomi from '../img/xiaomi.jpg';
import oppo from '../img/oppo.jpg';
import vivo from '../img/vivo.jpg';
import nokia from '../img/nokia.jpg';
import asus from '../img/asus.jpg';
import realme from '../img/realme.jpg';
import { Link } from 'react-router-dom';
function MobileNav(props) {
    return (
        <div style={{padding:8,borderTopLeftRadius:8,borderTopRightRadius:8, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
        <Row>
            <Col span={24}>
                <Divider orientation='left'>Thương hiệu</Divider>
            </Col>
       </Row>

       <Row gutter={[4,4]} >
            <Col lg={3}>
                <Link to={"/dien-thoai/iphone"}>
                    <img src={apple} alt="iphone" />
                </Link>
            </Col>
            <Col lg={3}>
                <Link to={"/dien-thoai/samsung"}>
                    <img src={samsung} alt="samsung" />
                </Link>
            </Col>
            <Col lg={3}>
                <Link to={"/dien-thoai/xiaomi"}>
                    <img src={xiaomi} alt="xiaomi" />
                </Link>
            </Col>
            <Col lg={3}>
                <Link to={"/dien-thoai/oppo"}>
                    <img src={oppo} alt="oppo" />
                </Link>
            </Col>
            <Col lg={3}>
                <Link to={"/dien-thoai/vivo"}>
                    <img src={vivo} alt="vivo" />
                </Link>
            </Col>
            <Col lg={3}>
                <Link to={"/dien-thoai/nokia"}>
                    <img src={nokia} alt="nokia" />
                </Link>
            </Col>
            <Col lg={3}>
                <Link to={"/dien-thoai/asus"}>
                    <img src={asus} alt="asus" />
                </Link>
            </Col>
            <Col lg={3}>
                <Link to={"/dien-thoai/realme"}>
                    <img src={realme} alt="realme" />
                </Link>
            </Col>
       </Row>
       </div>

    );
}

export default MobileNav;           
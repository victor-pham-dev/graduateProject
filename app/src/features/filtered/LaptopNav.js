import React from 'react';
import macbook from '../img/macbook.jpg';
import asus from '../img/asus.jpg';
import hp from '../img/hp.jpg';
import acer from '../img/acer.jpg';
import msi from '../img/msi.jpg';
import lenovo from '../img/lenovo.jpg';
import dell from '../img/dell.jpg';
import gigabyte from '../img/giga.jpg';
import { Col, Divider, Row } from 'antd';
import { Link } from 'react-router-dom';
function LaptopNav(props) {
    return (
        <div style={{padding:8,borderTopLeftRadius:8,borderTopRightRadius:8, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
        <Row>
            <Col span={24}>
                <Divider orientation='left'>Thương hiệu</Divider>
            </Col>
       </Row>

       <Row gutter={[4,4]} >
            <Col lg={3}>
                <Link to={"/laptop/macbook"}>
                    <img src={macbook} alt="macbook" />
                </Link>
            </Col>
            <Col lg={3}>
                <Link to={"/laptop/asus"}>
                    <img src={asus} alt="asus" />
                </Link>
            </Col>
            <Col lg={3}>
                <Link to={"/laptop/hp"}>
                    <img src={hp} alt="hp" />
                </Link>
            </Col>
            <Col lg={3}>
                <Link to={"/laptop/acer"}>
                    <img src={acer} alt="acer" />
                </Link>
            </Col>
            <Col lg={3}>
                <Link to={"/laptop/msi"}>
                    <img src={msi} alt="msi" />
                </Link>
            </Col>
            <Col lg={3}>
                <Link to={"/laptop/lenovo"}>
                    <img src={lenovo} alt="lenovo" />
                </Link>
            </Col>
            <Col lg={3}>
                <Link to={"/laptop/dell"}>
                    <img src={dell} alt="dell" />
                </Link>
            </Col>
            <Col lg={3}>
                <Link to={"/laptop/gigabyte"}>
                    <img src={gigabyte} alt="gigabyte" />
                </Link>
            </Col>
        </Row>
        </div>
    );
}

export default LaptopNav;
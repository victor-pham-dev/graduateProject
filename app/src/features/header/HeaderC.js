import { Col, Layout, Row } from 'antd';
import React from 'react';
import logo from './logo.jpg'
import logoText from './logotext.jpg'
import './style.css'
import User from '../user/User';
import { Link } from 'react-router-dom';
import SearchBox from "../searchBox/SearchBox";

const { Header } = Layout;

function HeaderC() {
    return (
        <Header className='topHeader'  style={{background: "#d6d6d6" }} >
           
            <Row style={{height: "100%"}} >
              
                <Col className='logoBox' xs={{order: 0,span: 9,push:1}} sm={{order: 0,span:8,push:1}} md={{order: 0,span:8}} lg={{order: 0,span:6,push:1}} xl={{order: 0,span: 6,push:1}} xxl={{order: 0,span: 6,push:1}}>
                    <Link to={"/"}>
                        <img style={{height: "90%",maxWidth: 64,marginBottom: "1%"}} className='logo' src={logo} alt="cdtt" />
                        <img style={{height: "90%",marginBottom: "1%"}} className='logotext' src={logoText} alt="cdtt" />
                    </Link>
                  
                </Col>
                <Col xs={{span:24,order: 2}} sm={{order:2,span:24}} xl={{span: 10,order: 1}} md={{order:2,span:24}} lg={{order: 1,push: 1,span:10}}>
                    <SearchBox />
                </Col>
                <Col xs={{span: 13, order:1}} sm={{order:1}}  md={{push: 4, span: 7,order:1}}  lg={{push:1,order: 2}} xl={{push:1,span: 6}} xxl={{span: 3}}>   
                    <User />
                </Col>

                    
                
            </Row>

        </Header>

    );
}

export default HeaderC;
import { Col, Layout, Row } from 'antd';
import React from 'react';
import logo from './logo.jpg'
import logoText from './logotext.jpg'
import './style.css'
import User from '../user/User';
import { Link } from 'react-router-dom';

const { Header } = Layout;
function HeaderC() {
    return (
        <Header className='topHeader'  style={{background: "#d6d6d6" }} >
            <Row style={{height: "100%"}} >
                <Col className='logoBox' xs={{span: 23}} sm={{span:8,pull:8}} md={{span:8,pull:8}} lg={{span:8,pull:8}} xl={{span: 6,push:1}}>
                    <Link to={"/"}>
                        <img style={{height: "100%"}} className='logo' src={logo} alt="Phamgiawooden" />
                        <img style={{height: "100%"}} className='logotext' src={logoText} alt="Phamgiawooden" />
                    </Link>
                </Col>
                <Col xl={{offset: 13}}>
                    <Row>
                        <Col>
                            <User />
                        </Col>
                    </Row>
                  
                    
                </Col>

                    
                
            </Row>

        </Header>

    );
}

export default HeaderC;
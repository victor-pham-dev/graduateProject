import {UpSquareTwoTone} from '@ant-design/icons';
import { Col, Layout, Row,BackTop  } from "antd";
import Navigation from "./navigation/Navigation";
import 'antd/dist/antd.css';
import HeaderC from "./header/HeaderC";
import './App.css'
import bg from "./img/bg2.jpg";
import sale from "./img/sale.png";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router"; 
import FooterComponent from "./footer/FooterComponent";


const {  Content, Footer } = Layout;
function App() {


  return (
  <BrowserRouter>

  
    
        <Row justify='center'>
                <img style={{width: "100%"}} src={sale} alt="CTKM"></img>
            </Row>
    <Layout  style={{ minHeight: '100vh' }}>
    <Row justify="center" style={{background: "#d6d6d6" }} >
      <Col span={24}>
        <HeaderC />
      </Col>
    
        
        <Col  sm={{span:24}} xs={{span: 24}} md={{span: 24}} lg={{span:24}} xl={{span: 20}}>
          <Layout className="site-layout">
              
              <Navigation />
              

              <Content className="contentSite" style={{ margin: '0 1px',backgroundImage:`url(${bg})`,backgroundRepeat: "repeat",backgroundAttachment: "fixed" }}>
                
                <div className="site-layout-background" style={{ padding: 4, minHeight: 600 }}>
                
                <Router>
                  
                </Router>
              
                </div>
              </Content>
            
          </Layout>
        </Col>
        <Col span={24}>
          <Footer style={{ textAlign: 'center' }}>
              <FooterComponent />
            </Footer>
        </Col>
           
        </Row>
        <BackTop >
          <UpSquareTwoTone style={{fontSize: "30px"}} />
        </BackTop>

        </Layout>

 
      
  </BrowserRouter>
  );
}

export default App;

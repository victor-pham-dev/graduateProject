import { Col, Layout, Row } from "antd";
import Navigation from "./navigation/Navigation";
import HeaderC from "./header/HeaderC";
import './App.css'
import { BrowserRouter, useLocation } from "react-router-dom";
import Router from "./Router"; 
import { useSelector } from "react-redux";


const {  Content, Footer } = Layout;
function App() {
  const admin = useSelector(state=>state.user);

  // const checkLogin = ()=>{
  //   if(!admin.isLogIn){
  //     return(<>BẠN CHƯA ĐĂNG NHẬP</>)
  //   }else{
  //     return (
  //         <Layout className="site-layout">  
  //                 <Navigation />
  //               <Content className="contentSite" style={{ margin: '0 16px'}}>
  //                 <div className="site-layout-background" style={{ padding: 24, minHeight: 600 }}>
  //                   <SearchBox />
  //                   <Router>
  //                   </Router>
  //                 </div>
  //               </Content>
  //         </Layout>
  //     )
  //   }
  // }
  return (
      <BrowserRouter>
      <Row justify="center" style={{background: "#d6d6d6" }} >
        <Col xl={{span: 20}}>
        <Layout  style={{ minHeight: '100vh' }}>
            <HeaderC />

            <Layout className="site-layout">  
                  <Navigation />
                <Content className="contentSite" style={{ margin: '0 16px'}}>
                  <div className="site-layout-background" style={{ padding: 24, minHeight: 600 }}>
                  
                    <Router>
                    </Router>
                  </div>
                </Content>
          </Layout>


            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
              
        </Layout>
        </Col>
      </Row>
          
      </BrowserRouter>
  );
}

export default App;

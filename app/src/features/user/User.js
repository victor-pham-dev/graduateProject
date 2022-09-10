
import { Avatar, Badge, Button, Col, message, Popover, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import userSlice from './userSlice';
import "./style.css"
import axios from 'axios';
import { ShoppingCartOutlined,SettingOutlined } from '@ant-design/icons';
function User(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state=>state.user)
    const cart = useSelector(state=>state.user.cart)
    const isLoggedIn = useSelector(state=> state.user.isLoggedIn)
    const keepLogin = useSelector(state=> state.user.keepLogin)
    const userAcc = JSON.parse(localStorage.getItem("userAcc"))
    const facebookAcc = JSON.parse(localStorage.getItem("facebook"));
    const cartNumber = cart.length;
    const [visible, setVisible] = useState(false);
    useEffect(()=>{
        const userAcc=JSON.parse(localStorage.getItem("userAcc")) ;
      
        const autoLoginEmail = ()=> {
            console.log("do it")
            axios.post(process.env.REACT_APP_SERVER_URL +'/user/account/login',userAcc)
            .then((res)=>
            {
                if(res.status === 200){
                    dispatch(userSlice.actions.logIn(res.data))
                    message.success('Xin chào '+ res.data.name );
                    const now = new Date()
                    const item = {
                        value: res.data.token,
                        expiry: now.getTime() + 2000000, 
                    }
                    localStorage.setItem("userToken", JSON.stringify(item))
                }
               
            }
        )
        }
        const autoLoginFacebook = ()=> {
            const value = facebookAcc;
            axios.post(process.env.REACT_APP_SERVER_URL +'/user/facebooklogin',{value})
            .then((res)=>
            {
                if(res.status === 200){
                    dispatch(userSlice.actions.logIn(res.data.user))
                    message.success('Xin chào '+ res.data.user.name );
                    const now = new Date()
                    const item = {
                        value: res.data.user.token,
                        expiry: now.getTime() + 2000000, 
                    }
                    localStorage.setItem("userToken", JSON.stringify(item));
                    navigate("/")
                }
               
            }
        )
        }
        if(!isLoggedIn && keepLogin && userAcc){
            autoLoginEmail();
          
        }else if(!isLoggedIn && keepLogin && facebookAcc){
            
            autoLoginFacebook()
        }

    },[isLoggedIn,keepLogin,userAcc,dispatch])
  
    setInterval(() => {
          const now = new Date();
          const userToken = localStorage.getItem("userToken")
          if(!userToken){
          return null
          }
          const token = JSON.parse(userToken);
          if(now.getTime() > token.expiry){
          localStorage.removeItem("userToken")
          dispatch(userSlice.actions.tokenExpired())
          }
      }, 60000);
 
    const handleVisibleChange = (newVisible) => {
        setVisible(newVisible);
    };
    const hide = () => {
        setVisible(false);
    };
    const content = (
        <div>
            <Link to={"/khach-hang/tai-khoan/thong-tin"}><Button onClick={hide} block type='default'>Tài khoản của tôi</Button></Link>
            <Link to={"/khach-hang/don-hang"}><Button onClick={hide} block type='default'>Đơn hàng của tôi</Button></Link>
            <Button onClick={(e)=>logout(e)} block type='default'>Đăng xuất</Button>  
        </div>
      )
    const logout = (e)=>{
        dispatch(userSlice.actions.logOut());
        navigate("/");
        localStorage.removeItem("userAcc");
        localStorage.removeItem("userToken");
    }
    const checkLogin  = ()=>{
        if(user.isLoggedIn){
            return(
               
                <Row gutter={6}>
                    <Col>
                        <Avatar src={user.avatar} alt={user.name} />
                    </Col>
                    <Col>
                        <h4 style={{maxWidth: 200,overflow: "hidden"}} className='userName'>{user.name}</h4>
                    </Col>
                    <Col>
                        <Popover  visible={visible}   onVisibleChange={handleVisibleChange} trigger={['click']} content={content} title={null}>
                            <SettingOutlined style={{background: "white",padding: 6, borderRadius: 5}} />
                        </Popover>
                    </Col>
                </Row>
              
            )
        }else{
            return (
                <Space>
                    <Link to={"/khach-hang/tai-khoan/dang-nhap"}>Đăng Nhập</Link>
                    <span style={{color: "#1890ff"}}>|</span>
                    <Link to={"/khach-hang/tai-khoan/dang-ki"}>Đăng Kí</Link>
                </Space>
            )
        }
    }
    
    return (
        <Row>
            <Col  >
                {checkLogin()}
            </Col>
            <Col push={1} span={4} >
                <Badge offset={[0, 10]} count={cartNumber} >
                    <Link to={"/khach-hang/gio-hang"}><Button style={{marginTop: "5px"}} icon={<ShoppingCartOutlined />} shape='circle' ></Button></Link>
                </Badge> 
            </Col>
      </Row>     
    );
}

export default User;
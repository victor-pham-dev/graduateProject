
import { Avatar, Badge, Button, Col, message, Popover, Row, Space } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import orderSlice from '../orderManager/orderSlice';
import userSlice from './userSlice';
import { AlertOutlined  } from '@ant-design/icons';
function User(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newOrder,setNewOrder] = useState(0)
    const [processingOrder,setProcessingOrder] = useState(0)
    const user = useSelector(state=>state.user)
    const isLoggedIn = useSelector(state=> state.user.isLogIn)
    const keepLogin = useSelector(state=> state.user.keepLogin)
    const adminPgAccount = JSON.parse(localStorage.getItem("adminPgAccount"))

    useEffect(()=>{
        if(isLoggedIn){
            axios.get(process.env.REACT_APP_SERVER_URL+"/order/admin/unconfirmed/"+user.id,{headers: {"x-access-token": user.token}})
            .then(res=>{
                dispatch(orderSlice.actions.updateUnconfirmed(res.data))
                setNewOrder(res.data.length)
                navigate("/")
            })
            axios.get(process.env.REACT_APP_SERVER_URL+"/order/admin/processing/"+user.id,{headers: {"x-access-token": user.token}})
            .then(res=>{
                dispatch(orderSlice.actions.updateProcessing(res.data))
                setProcessingOrder(res.data.length)
            })
          }
       
    },[isLoggedIn,user,dispatch])
    // setInterval(() => {
    //     if(isLoggedIn){
    //         axios.get(process.env.REACT_APP_SERVER_URL+"/order/admin/unconfirmed/"+user.id,{headers: {"x-access-token": user.token}})
    //         .then(res=>{
    //             dispatch(orderSlice.actions.updateUnconfirmed(res.data))
    //             setNewOrder(res.data.length)
    //         })
    //       }
       
    // }, 300000);

    useEffect(()=>{
        const autoLogin = ()=> {
            axios.post(process.env.REACT_APP_SERVER_URL +'/admin/account/login',adminPgAccount)
            .then((res)=>
            {
                if(res.status === 200){
                    dispatch(userSlice.actions.logIn(res.data))
                   
                    const now = new Date()
                    const item = {
                        value: res.data.token,
                        expiry: now.getTime() + 20000000, 
                    }
                    localStorage.setItem("adminPgToken", JSON.stringify(item))
                }
               
            }
        )
        }
        if(!isLoggedIn && keepLogin){
            autoLogin();
        }
        
       
    },[isLoggedIn,keepLogin,adminPgAccount,dispatch])
  
    setInterval(() => {
          const now = new Date();
          const adminPgToken = localStorage.getItem("adminPgToken")
          if(!adminPgToken){
          return null
          }
          const token = JSON.parse(adminPgToken);
          if(now.getTime() > token.expiry){
          localStorage.removeItem("adminPgToken")
          dispatch(userSlice.actions.tokenExpired())
          }
      }, 60000);
    const logout = (e)=>{
        dispatch(userSlice.actions.logOut());
        navigate("/");
        localStorage.removeItem("adminPgToken");
        localStorage.removeItem("adminPgAccount");
    }
    const checkLogin  = ()=>{
        if(user.isLogIn){
            return(
                <Popover content={content} title={null}>
                <Row gutter={6}>
                    <Badge  color={"green"} count={processingOrder +" đơn đang xử lý"} offset={[-70, 20]}>
                        <AlertOutlined  />
                    </Badge>
                    <Col>
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                    </Col>
                    <Col>
                        <h4 className='userName'>{user.username}</h4>
                    </Col>
                    <Col>
                    <Badge  count={newOrder +" đơn COD mới"} offset={[60, 0]}>
                        <AlertOutlined  />
                    </Badge>
                   
                        
                    </Col>
                </Row>
              </Popover>
            )
        }else{
            return (
                <Space>
                    <Link to={"/admin/account/login"}>Đăng Nhập</Link>
                    <span style={{color: "#1890ff"}}>|</span>
                    <Link to={"/admin/account/register"}>Đăng Kí</Link>
                </Space>
            )
        }
    }
    const content = (
        <div>
         
            <Link to={"/user/account/profile"}><Button block type='default'>Tài khoản của tôi</Button></Link>
            <Button onClick={(e)=>logout(e)} block type='default'>Đăng xuất</Button>
          
        </div>
      )
    return (
    <>
  
         {checkLogin()}
      </>     
    );
}

export default User;
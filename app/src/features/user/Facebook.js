import {  message } from 'antd';
import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { FacebookOutlined } from '@ant-design/icons';
import axios from 'axios';
import userSlice from './userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Facebook(props) {
    const navigate = useNavigate();
    const dispatch =  useDispatch();
    const [state,setState] = useState('')

    const responseFacebook = (res) => {
  
        setState(res)
        if(res){
            const value= {"facebookId": res.id,"email":res.email,"name":res.name,"avatar": res.picture.data.url}
            const login = async ()=>{
                try{
                    const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/user/facebooklogin",{value})
                    if(res){
                        const data =res.data.user;
                        navigate("/")
                        dispatch(userSlice.actions.logIn(data))
                        const facebook = {"facebookId": data.facebookId}
                        localStorage.setItem("facebook", JSON.stringify(facebook))
                        const now = new Date()
                        const item = {
                            value: data.token,
                            expiry: now.getTime() + 2000000, 
                        }
                        localStorage.setItem("userToken", JSON.stringify(item))
                    }
                }catch (err){
                    message.error("Thông tin đăng nhập không chính xác !")
                    console.log(err)
                }
                
            }
            login()
        }else{
            message.warning("Đăng nhập không thành công !!!")
        }
      }
  
    const checkLoggedIn = ()=>{
        if(state.isLoggedIn){
            return null;
        }else{
            return (
                <FacebookLogin
                appId="666516681113279"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                icon={<FacebookOutlined />}
                isMobile={true}
                disableMobileRedirect={true}
                textButton="  Đăng nhập bằng Facebook"
                />
                
            )
        }
    }

    return (
        <div>
            {checkLoggedIn()}
            
        </div>
    );
}

export default Facebook;
import {  Col, Row, Form,Input, Button, message } from 'antd';
import { useNavigate  } from "react-router-dom";
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import userSlice from './userSlice';
import { useDispatch } from 'react-redux';

function Login(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinishFailed = () => {
        message.error('Thông tin không hợp lệ !!');
    };

    const login =async (value) => {
        try{
            const res = await axios.post(process.env.REACT_APP_SERVER_URL+'/admin/account/login', (value))
            if(res) {
                const data = res.data;
                if(res.status === 200){
                    navigate("/");
                    dispatch(userSlice.actions.logIn(data));
                    const adminPgAccount = JSON.stringify(value)
                    localStorage.setItem("adminPgAccount", adminPgAccount)
                    const now = new Date()
                    const item = {
                        value: data.token,
                        expiry: now.getTime() + 20000000, 
                    }
                    localStorage.setItem("adminPgToken", JSON.stringify(item))
                }
            }   
        }catch (err){

            if(err.response.status === 403) {
                message.warning("Thông tin đăng nhập không chính xác  !!");
            }
            else{
            message.error("Đã có lỗi xảy ra !")
            }
        }
    }

    return (

            <Row justify='center'>


                <Col style={{background: "white",borderRadius: "30px",padding: "30px"}} xl={16} sm={24} xs={24} >
                    
                    <Form
                    name="user"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={login}
                    onFinishFailed={onFinishFailed}
                    autoComplete="true"
                    >
                    <Form.Item
                        label="Tên người dùng"
                        name="username"
                        rules={[{ required: true, message: 'Hãy nhập Tên người dùng !' },{min:6,message: "Tài khoản tối thiểu 8 kí tự" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Hãy nhập mật khẩu !'},{min:8,message: "Mật khẩu tối thiểu 8 kí tự" }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button block type="primary" htmlType="submit">
                        Đăng Nhập
                        </Button>
                    </Form.Item>
                    </Form>
                    <div>Chưa có tài khoản, hãy đăng kí</div>
                    <Link to={"/user/account/register"}><Button type="dashed" danger block>Đăng Nhập</Button></Link>
                </Col>

               

            </Row>

    );
}

export default Login;
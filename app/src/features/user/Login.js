import {  Col, Row, Form,Input, Button, message, Space } from 'antd';
import { useNavigate  } from "react-router-dom";
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import userSlice from './userSlice';
import { useDispatch } from 'react-redux';
import Facebook from './Facebook';
function Login(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinishFailed = () => {
        message.error('Thông tin không hợp lệ !!');
    };

    const login =async (value) => {
        try{
            const res = await axios.post(process.env.REACT_APP_SERVER_URL+'/user/account/login', (value))
            if(res) {
                const data = res.data;
                if(res.status === 200){
                    navigate("/");
                    message.success("Xin chào"+ data.name + " !!");
                    dispatch(userSlice.actions.logIn(data));
                    const userAcc = JSON.stringify(value)
                    localStorage.setItem("userAcc", userAcc)
                    const now = new Date()
                    const item = {
                        value: data.token,
                        expiry: now.getTime() + 2000000, 
                    }
                    localStorage.setItem("userToken", JSON.stringify(item))
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
                        label="Email"
                        name="email"
                        
                        rules={[{ required: true, message: 'Hãy nhập Email !' },
                        {type: 'email',message: "Email không hợp lệ !"}]}
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
                        <Button  type="primary" htmlType="submit">
                        Đăng Nhập
                        </Button>
                    </Form.Item>
                    </Form>
                    <div>Chưa có tài khoản, hãy đăng kí</div>
                    <Link to={"/khach-hang/tai-khoan/dang-ki"}><Button type="dashed" danger block>Đăng Kí</Button></Link>
                    <Row style={{marginTop: "10px"}} >
                        <Space>
                            <span>Hoặc :</span>
                            <Facebook />
                        </Space>
                     
                    </Row>
                   
                </Col>

               

            </Row>

    );
}

export default Login;
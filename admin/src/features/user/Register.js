import {  Col, Row, Form,Input, Button, message } from 'antd';
import { useNavigate  } from "react-router-dom";
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function User(props) {
    const navigate = useNavigate();
    const onFinishFailed = () => {
        message.error('Thông tin không hợp lệ !!');
    };

    const register =async (value) => {
        try{
            const res = await axios.post(process.env.REACT_APP_SERVER_URL+'/admin/account/register', (value))
            if(res) {
                if(res.status === 201){
                    message.success("Đăng ký tài khoản thành công !!");
                    navigate("/admin/account/login")
                }
            }   
        }catch (err){

            if(err.response.status === 409) {
                message.warning("Tên người dùng đã tồn tại  !!");
            }
            else if(err.response.status === 406) {
                message.warning("Mã tạo tài khoản không hợp lệ  !!");
            }else{
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
                    onFinish={register}
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
                    <Form.Item
                        label="Mã tạo tài khoản"
                        name="password2"
                        rules={[{ required: true, message: 'Hãy nhập Mã tạo !' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button block type="primary" htmlType="submit">
                        Đăng ký
                        </Button>
                    </Form.Item>
                    </Form>
                    <div>Đã có tài khoản, hãy đăng nhập</div>
                    <Link to={"/user/account/login"}><Button type="dashed" danger block>Đăng Nhập</Button></Link>
                </Col>

               

            </Row>

    );
}

export default User;
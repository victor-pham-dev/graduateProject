import {  Col, Row, Form,Input, Button, message } from 'antd';
import { useNavigate  } from "react-router-dom";
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import userSlice from './userSlice';
import { useDispatch } from 'react-redux';

function User(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinishFailed = () => {
        message.error('Thông tin không hợp lệ !!');
    };

    const register =async (value) => {
        
        try{
            const res = await axios.post(process.env.REACT_APP_SERVER_URL+'/user/account/register', (value))
            if(res) {
                if(res.status === 201){
                    const data= res.data;
                    message.success("Đăng ký tài khoản thành công !!");
                    dispatch(userSlice.actions.logIn(data))
                    navigate("/")
                }
            }   
        }catch (err){

            if(err.response.status === 409) {
                message.warning("Email đã được dùng  !!");
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
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Hãy nhập email !' },{type: 'email',message: "Email không hợp lệ !"}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Họ và tên"
                        name="name"
                        rules={[{ required: true, message: 'Hãy nhập Họ tên !' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Chưa nhập sdt !' },
                        { pattern: new RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/g), message: 'Số điện thoại không hợp lệ !' }]}
                        
                        >
                            <Input placeholder='Số điện thoại'/>
                        </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Hãy nhập mật khẩu !'},{min:8,message: "Mật khẩu tối thiểu 8 kí tự" }]}
                    >
                        <Input.Password />
                    </Form.Item>
                   
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">
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
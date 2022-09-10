import { Avatar, Button, Upload,message,Row,Col, Space, Input, Modal, Form } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { UploadOutlined,FacebookOutlined } from '@ant-design/icons';
import userSlice from '../userSlice';
import FacebookLogin from 'react-facebook-login';
function Profile(props) {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user);
    const token = useSelector(state=>state.user.token);
    const [data,setData] = useState('');
    const [avatar,setAvatar] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState(null);
    const [btnDisable,setBtnDisable] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    useEffect(()=>{
       setData(user);
       setAvatar(user.avatar);
       setEmail(user.email)
       setPhone(user.phone)
    },[user])
    useEffect(()=>{
        if(phone  && phone!== data.phone){      
            setBtnDisable(false)
        }else if(email !== data.email){
            setBtnDisable(false)
           
        }else{
            setBtnDisable(true)
        }
    },[email,phone,data])

    const url = process.env.REACT_APP_SERVER_URL + "/file/singleupload";
    const prop = {
        name: "file",
        action: url,
        headers: {
            "x-access-token": token
        },    
        onChange(info) {
            if (info.file.status !== 'uploading') {
               
            }
        
            if (info.file.status === 'done') {
                setData(info.file.response)
                const imgData = process.env.REACT_APP_SERVER_URL + "/file/" + info.file.response;
                console.log(imgData)
                axios.post(process.env.REACT_APP_SERVER_URL + "/user/account/updateavatar",{"id": user.id,"data": imgData},{
                    headers: {"x-access-token": token}
                }).then(res=>{
                    if(res.status === 200){
                        message.success(`${info.file.name} Đã tải lên thành công`);
                        dispatch(userSlice.actions.updateAvatar(imgData))
                    }
                    else{
                        message.error("Chưa cập nhật được vào DB")
                    }
                })
               
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} Tải ảnh lên không thành công`);
            }
            }
    }
    const checkImg = () =>{
        if(avatar){
            return(
                <Space>
                    <Avatar size={"large"} src={avatar} alt={data.name} />
                    <Upload {...prop} >
                        <Button type='primary' icon={<UploadOutlined />}>Thay đổi ảnh khác</Button>
                    </Upload>
                </Space>
               
            )
        }else{
            return(
                <Space>
                <Avatar size={"large"} src={null} alt={data.name} />
                <Upload {...prop} >
                    <Button type='primary' icon={<UploadOutlined />}>Cập nhật Avatar</Button>
                </Upload>
                </Space>
            )
        }
    }

    const emailChange = (e) =>{
        setEmail(e.target.value)
    }
    const phoneChange = (e) =>{
        setPhone(e.target.value)
    }
    const saveChange = async ()=>{
        const reg = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if(reg.test(phone) || !phone){
            const res= await axios.post(process.env.REACT_APP_SERVER_URL + "/user/account/updateprofile",{
                "id": user.id,
                "phone": phone,
                "email": email
            },{headers:{
                "x-access-token": token
            }})
            
            if(res.data === 'phoneexist'){
                message.warning("Số điện thoại đã được dùng")
            }else if(res.data === 'emailexist'){
                message.warning("Email đã được dùng")
            }else if(res.status === 201){
                message.success("Đã cập nhật")
                dispatch(userSlice.actions.updateEmail(email))
                dispatch(userSlice.actions.updatePhone(phone))

            }
            console.log(res)
        }else{
            message.warning("Số điện thoại không hợp lệ")
        }

    }

    const responseFacebook = (fbres) => {
        console.log(fbres)
        if(fbres){
            const value= {"facebookId": fbres.id,"id": user.id}
            const connect = async ()=>{
                try{
                    const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/user/account/updatefacebookid",{value},{headers: {"x-access-token":token}})
                    if(res.status  === 200){
                        message.success("Liên kết thành công facebook: "+ fbres.name);
                        dispatch(userSlice.actions.updateFacebookId(fbres.id))
                        dispatch(userSlice.actions.updatefbToken(fbres.accessToken))
                    }
                }catch (err){
                    message.error("Đã có lỗi xảy ra !")
                    console.log(err)
                }
                
            }
            connect()
        }else{
            message.warning("Đăng nhập không thành công !!!")
        }
    }


    const checkFacebookId = ()=>{
        if(user.facebookId){
            return(
            <span style={{background: "#1890ff",padding: 8,color: "white",borderRadius: 4}}>Đã liên kết với tài khoản {user.name}</span>
            )
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
                textButton="Liên kết với Facebook"
            />
            
            )
        }
    }

    const onFinish =async (values) => {

        const newValues = {...values,"userId": user.id};
        if(!values.currentPassword){
            newValues.currentPassword = "noway";
        }
        const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/user/account/changepassword",{newValues},
        {headers: {
            "x-access-token": token
        }})
        if(res.data === "ok"){
            message.success("Đã thay đổi mật khẩu");
            const localUser = JSON.parse(localStorage.getItem("userAcc"));
                localUser.password = values.newPassword;
            const newLocal = JSON.stringify(localUser);
            localStorage.setItem("userAcc", newLocal)
            handleCancel();
        }else if(res.data === 'incorrect'){
            message.warning("Mật khẩu hiện tại không đúng")
        }
      
      };
    


    return (
        <>
            <Row gutter={[8,8]} style={{background: "white",padding: 8}}>
                <Col span={24} >
                    <h3>Avatar</h3>
                    {checkImg()}
                </Col>
                <Col span={24}>
                    <h3>Họ tên</h3>
                    <h3 style={{padding: 5,borderRadius: 5, background: "lightgray"}}>
                        {data.name}
                    </h3>
                </Col>
                <Col span={24}>
                    <h3>Email</h3>
                    <Input value={email} placeholder="youremail@gmail.com" onChange={emailChange} />
                </Col>
                <Col span={24}>
                    <h3>Số điện thoại</h3>
                    <Input value={phone} placeholder="03xxxxxxxx" onChange={phoneChange} />
                </Col>
                <Button block type="primary" disabled={btnDisable} onClick={saveChange}>Lưu thay đổi</Button> 
                <Col span={24}>
                    <Button type="primary" onClick={showModal}>
                       Đổi mật khẩu
                    </Button>
                    <Modal title="Đổi mật khẩu" footer={null} visible={isModalVisible}  onCancel={handleCancel}>
                    <Form
                        name="pw"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                        >
                        <Form.Item
                            label="Mật khẩu hiện tại"
                            name="currentPassword"
                            rules={[
                            {
                                required: false,
                               
                            }
                            ]}
                        >
                            <Input.Password placeholder='Để trống nếu là lần đầu tiên đặt mật khẩu' />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu mới"
                            name="newPassword"
                            rules={[
                            {
                                required: true,
                                message: 'Hãy nhập mật khẩu mới',
                            },{
                                min: 8,
                                message: "Mật khẩu tối thiểu 8 kí tự"
                            }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                            offset: 8,
                            span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Đổi mật khẩu
                            </Button>
                        </Form.Item>
                        </Form>
                    </Modal>
                </Col>
                <Col span={24}>
                    <h3>FaceBook</h3>
                    {checkFacebookId()}
                </Col>
            </Row>
           
        </>
    );
}

export default Profile;
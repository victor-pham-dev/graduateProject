import { Button,message,Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
function EditBanner(props) {
    const [data,setData] = useState("")
    const token= useSelector(state=>state.user.token)
    const url = process.env.REACT_APP_SERVER_URL + "/file/singleupload";
    useEffect(()=>{
        setData(props.data)
    },[props])

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
                axios.post(process.env.REACT_APP_SERVER_URL + "/homepage/editbanner",{"id": props.id,"data": info.file.response},{
                    headers: {"x-access-token": token}
                }).then(res=>{
                    if(res.status === 200){
                        message.success(`${info.file.name} Đã tải lên thành công`);
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
    const checkData = ()=>{
        if(!data){
            return  (
                <div>
        
                    <Upload {...prop}>
                        <Button type='primary' icon={<UploadOutlined />}>Tải ảnh mới lên</Button>
                    </Upload>
                </div>
                )
        }else{
            const imgsrc = process.env.REACT_APP_SERVER_URL + "/file/"+data; 
            return (
                <div style={{position: "relative"}}>
                <img  style={{height: "100%",width: "100%",maxHeight: 280, boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}} src={imgsrc} alt="Khuyến mãi đặc biệt" />
               <Upload {...prop} style={{position: "absolute"}}>
                   <Button type='primary' icon={<UploadOutlined />}>Thay đổi ảnh khác</Button>
               </Upload>
           </div>
            )
        }
    }
    return (
        <>
        {checkData()}
        </>
    );
}

export default EditBanner;
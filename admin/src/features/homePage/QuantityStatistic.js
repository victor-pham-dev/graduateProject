import { Row,Col } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {BookTwoTone } from '@ant-design/icons';
function QuantityStatistic(props) {
    const admin = useSelector(state=>state.user);
    const [product,setProduct] = useState(0);
    const [user,setUser] = useState(0);
    const [order,setOrder] = useState(0);
   
    useEffect(()=>{
        axios.post(process.env.REACT_APP_SERVER_URL + "/product/admin/statistic/totalproduct",{
            "id": admin.id
        },{
            headers: {"x-access-token": admin.token}
        }).then(res=>{
            if(res){
                setProduct(res.data.datalength);
            }
          
        })
        axios.post(process.env.REACT_APP_SERVER_URL + "/user/statistic/totaluser",{
            "id": admin.id
        },{
            headers: {"x-access-token": admin.token}
        }).then(res=>{
            if(res){
                setUser(res.data.datalength);
            }
           
        })
        axios.post(process.env.REACT_APP_SERVER_URL + "/order/statistic/totaldone",{
            "id": admin.id
        },{
            headers: {"x-access-token": admin.token}
        }).then(res=>{
            if(res){
                setOrder(res.data.datalength);
            }
           
        })
    },[admin.id,admin.token])
    return (
        <Row gutter={[8,8]} justify="center">
            <Col lg={6}  >
                <div  style={{borderRadius: 8,background: "#1890ff",padding: 8,color: "white"}}>
                    <h2 style={{color: "white"}} >{product}</h2>
                <span style={{fontWeight: "bold"}}> Sản phẩm</span>
                </div>
               
            </Col>
           
            <Col lg={6}   >
                <div  style={{borderRadius: 8,background: "#1890ff",padding: 8,color: "white"}}>
                    <h2 style={{color: "white"}}>{user}</h2>
                    <span style={{fontWeight: "bold"}}>Người dùng</span>
                </div>
               
            </Col>
            <Col lg={6}   >
                <div  style={{borderRadius: 8,background: "#1890ff",padding: 8,color: "white"}}>
                    <h2 style={{color: "white"}}>{order}</h2>
                    <span style={{fontWeight: "bold"}}>Đơn hoàn thành</span>
                </div>
               
            </Col>
       
           
            
            
        </Row>
    );
}

export default QuantityStatistic;
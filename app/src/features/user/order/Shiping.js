import {  Col, Row, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Shiping(props) {
    const userId = useSelector(state=>state.user.id)
    const token = useSelector(state=>state.user.token)
    const [data,setData] = useState([])
    const [tbData,setTbData] = useState([]);
    useEffect(()=>{
      if(userId && token){
        axios.get(process.env.REACT_APP_SERVER_URL+ "/order/shiping/"+userId,{headers:{"x-access-token": token}})
        .then(res=>{
          if(res.status=== 200){
            props.get(res.data.length)
            setData(res.data)
          }
        })
      }
    },[userId,token,props])
    useEffect(()=>{
        let newTb =  [];
        data.map((value,key)=>{
                var newItem = {
                    "key": key,
                    "_id": value._id,
                    "userId": value.userId,
                    "items": value.items,
                    "total": value.total,
                    "payMethod": value.payMethod,
                    "receiveAdd": value.receiveAdd,
                    "status": value.status,
                    "statusNote": value.statusNote,
                    "shipingInfo": value.shipingInfo,
                }
                return newTb.push(newItem)
            })
            setTbData(newTb)   
    },[data])
    const columns = [
        {
          title: '',
          dataIndex: 'items',
          render: (items,record) =>{
              return (
              <div>
                {items.map((value,key)=>{
                  const imgsrc= process.env.REACT_APP_SERVER_URL + "/file/" +  value.img;
                return (
                    <Row key={key} gutter={[8,8]}>
                        <Col>
                            <img style={{width: 80,height: 80}} src={imgsrc} alt={value.name} />
                        </Col>
                        <Col>
                            <p style={{width: "100%"}}>{value.name}</p>
                            <div style={{width: "100%"}}><small>PL: {value.classifyname}</small></div>
                            <div style={{width: "100%"}}><small>SL: {value.quantity}</small></div>
                            

                        </Col>
                    </Row>)
              })}
              <Row>
                <span style={{color: "red"}}>Tổng tiền : {record.total.toLocaleString()} đ</span>
              </Row>
              <Row>
                <p> Người nhận : {record.receiveAdd.receiver}</p>
              </Row>
              <Row>
                <p> Số điện thoại : {record.receiveAdd.phone}</p>
              </Row>
              <Row>
                <span>Địa chỉ :</span>
                <br/>
                <p style={{borderRadius: 5,background: "lightgray",padding: 2}}>{record.receiveAdd.add}</p>
              </Row>
              <Row style={{margin: 3}}>
                <span>Phương thức thanh toán  : </span>
                <br/>
                <span>{record.payMethod}</span>
              </Row>
              <Row style={{margin: 3}}>
                <span>Trạng thái : </span>
                <br/>
                <small style={{borderRadius: 5,background: "lightgray",padding: 2}}>{record.statusNote}</small>
              </Row>
              <Row>
                Thông tin vận chuyển:
              </Row>
            </div>
          
            )
          }
        }
      ];
    return (
        <div>
             <Table locale={{emptyText: "Chưa có đơn hàng nào"}}  columns={columns} dataSource={tbData} />
        </div>
    );
}

export default Shiping;
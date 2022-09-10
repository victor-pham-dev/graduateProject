import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  Row,Col,Table } from 'antd';

function Done(props) {

    const navigate = useNavigate();
    const isLogIn= useSelector(state=>state.user.isLogIn)
    const adminId= useSelector(state=>state.user.id)
    const token= useSelector(state=>state.user.token);
    const [data,setData] = useState([]);
    const [tbData,setTbData] = useState([]);
    useEffect(()=>{
        axios.post(process.env.REACT_APP_SERVER_URL + "/order/admin/getdone",{"id": adminId},{headers:{
            "x-access-token": token
        }})
        .then(res=>{
            if(res.status === 200){
                setData(res.data)
            }
        })
    },[adminId])
    useEffect(()=>{
        if(!isLogIn){
            navigate("/admin/account/login")
          }
    },[isLogIn,navigate])
    useEffect(()=>{
        var newTbData= [];
        data.map((value,key)=>{
            const newTbItem = {...value,"key": key}
            return newTbData.push(newTbItem)
        })
        setTbData(newTbData)
    },[data])

    const columns = [
        {
          title: 'Đơn hàng',
          dataIndex: 'items',
          render: items =>{
              return (
              <div>
                {items.map((value,key)=>{
                    const imgurl = process.env.REACT_APP_SERVER_URL + "/file/" +value.img;
                    return (
                        <Row key={key} gutter={[8,8]}>
                            <Col span={8}>
                                <img style={{minWidth: 60,maxWidth: 80}} src={imgurl} alt={value.name} />
                            </Col>
                            <Col>
                                <p style={{width: "100%"}}>{value.name}</p>
                                <div style={{width: "100%"}}><small>PL: {value.classifyname}</small></div>
                                <div style={{width: "100%"}}><small>SL: {value.quantity}</small></div>
                            </Col>

                        
                            
                        </Row>)
                })}
            </div>)
          }
        },
        {
          title: 'Tổng giá trị',
          dataIndex: 'total',
          render: total=> <>{total.toLocaleString()}</>
        },
        {
          title: 'Thanh toán',
          dataIndex: 'payMethod',
        },
        {
          title: 'Địa chỉ nhận hàng',
          dataIndex: 'receiveAdd',
          render: (text,record)=>{
            return (
               <>
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
                </>
            )
          }
        },
        {
          title: '',
          dataIndex: '',
          render: (text,record)=>{
            const create =new Date(record.createdAt) ;
            const update =new Date(record.updatedAt) ;
            
            return (<>
            <span>Ngày tạo : <br/>{create.toLocaleString()}</span>
            <br/>
            <span>Hoàn thành : <br/> {update.toLocaleString()}</span>

                </>)
               
        }},
      ];
    return (
        <div>
            <Table locale={{emptyText: "Chưa có đơn hàng nào"}} pagination={false}  columns={columns} dataSource={tbData} />
        </div>
    );
}

export default Done;
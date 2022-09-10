import { Button, Col, Input, message, Modal, Popconfirm, Row, Space, Table, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import info from "./info.jpg"
import exTranId from "./exTranId.jpg"
const { Text} = Typography;
function Confirming(props) {
    const userId = useSelector(state=>state.user.id)
    const token = useSelector(state=>state.user.token)
    const [data,setData] = useState([])
    const [tbData,setTbData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [momoTransId, setMomoTransId] = useState(false);
    const momoTransIdChange = (e)=>{
      setMomoTransId(e.target.value)

    }
    const showModal = () => {
      setIsModalVisible(true);
    };
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    useEffect(()=>{
      if(userId && token){
        axios.get(process.env.REACT_APP_SERVER_URL+ "/order/confirming/"+userId,{headers:{"x-access-token": token}})
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
                    "createdAt": value.createdAt,
                }
                return newTb.push(newItem)
            })
            setTbData(newTb)   
    },[data])
    const columns = [
        {
          title: 'Đơn hàng',
          dataIndex: 'items',
          render: (items,record,index) =>{
            
              const create =new Date(record.createdAt) ;
              const total = record.total;
              const confirmDelete = ()=>{
                var cloneTbData = [...tbData]
                    cloneTbData.splice(index,1)
                axios.post(process.env.REACT_APP_SERVER_URL+"/order/cancelbyid",{"userId": userId,"cancelId": record._id},
                {headers: {
                    "x-access-token": token
                }}).then(res=>{
                    if(res.status === 200){
                        setTbData(cloneTbData);
                        props.get(cloneTbData.length - 1)
                        message.success("Đã hủy đơn")
                    }else{
                        message.warning("Đã có lỗi xảy ra")
                    }
                })
              }
              const checkPaymethod = ()=>{
                if(record.payMethod === "Thanh toán khi nhận hàng"){
                  return (
                      <Row >
                          <Col>
                          <Popconfirm
                            title="Bạn có chắc muốn hủy đơn này"
                            onConfirm={confirmDelete}
                            okText="Có"
                            cancelText="Không"
                          >
                            <Button style={{color: "red"}} type="dashed">Hủy đơn hàng</Button>
                          </Popconfirm></Col>
                        
                      </Row>
                  )
                }else if(record.payMethod === "Ví MOMO"){
                  const qrsrc = "https://momosv3.apimienphi.com/api/QRCode?phone=0343241299&amount="+record.total+"& note="+record._id;
                  
                  const checkOut = async ()=>{
                    const res= await axios.post("https://momosv3.apimienphi.com/api/checkTranId",
                    {
                      "access_token": "1u9cr7e300RaYjNGI2pGpK2FiHvJyKVLc96SdWKhHypoj7iK6z",
                      "tranId": momoTransId
                    })
                    if(res.status === 200){
                      const data = res.data.data;
                      var cloneTbData = [...tbData]
                          cloneTbData.splice(index,1)
                          
                      if(res.data.error === 1){message.warning("Chưa xác nhận được, vui lòng chờ 30s và thử lại")}
                      const toInt = parseInt(data.amount, 10)
                     
                      if(toInt === record.total && data.comment === record._id){ 
                      axios.post(process.env.REACT_APP_SERVER_URL + "/order/comfirmpaid",{"userId":userId,"orderId": record._id,"transId": momoTransId},
                      {headers:{
                        "x-access-token" : token
                      }})
                        .then(res=>{
                          if(res.status === 200){
                            setTbData(cloneTbData);
                            props.get(cloneTbData.length - 1)
                            message.success("Đã xác nhận thanh toán");
                            handleCancel()
                          }
                        })
                      }else{
                        message.error("Đã có lỗi xảy ra, vui lòng chờ 30s và thử lại")
                      }
                    }
                  }
                  return (
                  <Row  >
                    <Modal title="Thanh toán MOMO" visible={isModalVisible}  onCancel={handleCancel} footer={null} >
                      <h4>Bước 1:</h4>
                      <span>--Chuyển tiền đến tài khoản bên dưới với nội dung (copy để chính xác):</span>
                        <Text style={{fontWeight: "bold",color:"green",fontSize: "1.2rem"}} copyable={true} code>{record._id}</Text>
                      <Row gutter={[12,12]}>
                        <Col xl={{span:24}}>
                          <img style={{width: "100%"}} src={info} alt="VD" />
                        </Col>
                        <Col span={24}> <h4>Hoặc sử dụng QRCode và ghi nội dung bên dưới </h4></Col>
                        <Col xl={{span:24}}>
                          <img style={{maxWidth: 200}} src={qrsrc} alt="QR" />
                        </Col>
                      </Row>
                      <h4>Bước 2:</h4>
                      <span>Điền mã giao dịch để hoàn thành thanh toán</span>
                        
                      <Row gutter={[12,12]}>
                        <Col xl={{span:24}}>
                          <img style={{width: "100%"}} src={exTranId} alt="VD" />
                        </Col>
                        <Col span={24}>
                        <span>Nếu chưa được xác nhận hãy thử lại sau 30 giây</span>
                          <Space>
                            
                            <Input style={{width: 300}}
                                placeholder="Điền mã giao dịch"
                                onChange={momoTransIdChange}
                            />
                            <Button type="primary" onClick ={checkOut}>Xác Nhận</Button>
                          </Space>
                        </Col>
                      </Row>
                    </Modal>
                    <Col><Button type='primary' onClick={showModal} >Thanh toán ví MoMo</Button></Col>
                    <Col>
                    <Popconfirm
                      title="Bạn có chắc muốn hủy đơn này"
                      onConfirm={confirmDelete}
                      okText="Có"
                      cancelText="Không"
                    >
                      <Button style={{color: "red"}} type="dashed">Hủy đơn hàng</Button>
                    </Popconfirm></Col>
                  
                  </Row>
                )
                }
              }
              return (
              <div>
                {items.map((value,key)=>{
                  
                const imgsrc  = process.env.REACT_APP_SERVER_URL + "/file/" + value.img
                return (
                    <Row key={key} gutter={[8,8]} >
                        <Col >
                            <img style={{height: "80px"}} src={imgsrc} alt={value.name} />
                        </Col>
                        <Col>
                            <p style={{width: "100%"}}>{value.name}</p>
                            <div style={{width: "100%"}}><small>PL: {value.classifyname}</small></div>
                            <div style={{width: "100%"}}><small>SL: {value.quantity}</small></div>
                        </Col>
                    </Row>)
              })}
              <Row>
                <span style={{color: "red"}}>Tổng tiền : {total.toLocaleString()} đ</span>
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
              <Row >
                <span>Phương thức thanh toán  : </span>
                <br/>
                <span>{record.payMethod}</span>
              </Row>
              <Row >
                <span>Ngày tạo : <br/>{create.toLocaleString()}</span>
              </Row>

              {checkPaymethod()}


            </div>)
          }
        }
      ];
    return (
        <div >
             <Table locale={{emptyText: "Chưa có đơn hàng nào"}}  columns={columns} dataSource={tbData} />
        </div>
    );
}

export default Confirming;
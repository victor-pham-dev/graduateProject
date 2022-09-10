import { Button, Form, Input, Modal, Row, Table,Select, message, Radio, Space, Col } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userSlice from '../userSlice';
import cartSlice from './cartSlice';

const {Option} = Select;
function CreateOrder(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const  selectedItems = useSelector(state=>state.cart);
  const  items = useSelector(state=>state.cart.items);
  const  userCart = useSelector(state=>state.user.cart);
  const total = selectedItems.total;
  const userId  = useSelector(state => state.user.id)
  const token  = useSelector(state => state.user.token)
  const  address = useSelector(state=>state.user.address);
  const [adds,setAdds] = useState(address);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [provinceList, setProvinceList] = useState([]);
  const [comuneList, setComuneList] = useState([]);
  const [districtList, setDistrictList] = useState([]);

  const [comuneOpen, setComuneOpen] = useState(false);
  const [districtOpen, setDistrictOpen] = useState(false);
  // const [province, setProvince] = useState([]);
    useEffect(()=>{
        axios.get('https://api.mysupership.vn/v1/partner/areas/province')
        .then(res => {
          setProvinceList(res.data.results)
        })
    },[])
    const mapProvince = provinceList.map((value,key)=>{
      if(value){
        return <Option key={key} value={value.code} name={value.name} >{value.name}</Option>
      }else {
        return null;
      }
    })
    const onProvinceFocus = ()=>{
      setComuneOpen(false)
    }
    const onProvinceChange =(value)=>{
      setComuneOpen(true)
      axios.get('https://api.mysupership.vn/v1/partner/areas/district?province='+value)
      .then(res => {
        setComuneList(res.data.results)
      })
    }

    const mapComune = comuneList.map((value,key)=>{

      if(value){
        return <Option key={key} value={value.code} name={value.name} >{value.name}</Option>
      }else {
        return null;
      }
    })
    const onComuneChange =(value)=>{
      setComuneOpen(false)
      setDistrictOpen(true)
        axios.get('https://api.mysupership.vn/v1/partner/areas/commune?district='+value)
        .then(res => {
          setDistrictList(res.data.results)
         
        })
    }


    const mapDistrict = districtList.map((value,key)=>{
      if(value){
        return <Option key={key} value={value.name +"-"+ value.district+"-" + value.province} >{value.name}</Option>
      }else {
        return null;
      }
    })
    const onDistrictChange  = (value) =>{
      setDistrictOpen(false)
    }
    const columns = [
        {
          title: '',
          dataIndex: 'img',
          render: (img,record) =>{
            const src = process.env.REACT_APP_SERVER_URL + "/file/"+img;
              return ( 
              <Row gutter={[10,0]}>
                <Col><img style={{width: "60px",height: "60px"}} src={src} alt={src} /></Col>
                <Col> <h4 style={{overflow: 'auto',margin: 0}}>{record.name}</h4>
                <small style={{borderRadius: 5,background: "lightgray",padding: 2}}>Phân loại : {record.classifyname}</small>
                <br/>   
                <small style={{color: "red"}}>Giá : {record.classifyprice.toLocaleString()}</small>
                <br/>
                <small>Số lượng : {record.quantity}  </small></Col>
              </Row>
                
               
              
              )
          }
        },

    ];
 


    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    const onAdd = async (value)=>{
      try{
        const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/user/account/addaddress",{"userId": userId,"value": value},
        {headers: {"x-access-token": token}})
        if(res.status === 200){
          const newAdd = {
            "name": value.name,
            "phone": value.phone,
            "specificAdd": value.specificAddress,
            "district": value.district,
          }
          message.success("Đã thêm địa chỉ mới !");
          setIsModalVisible(false);
          const addsClone = [...adds];
              addsClone.push(newAdd)
          setAdds(addsClone);
          dispatch(userSlice.actions.updateAdds(addsClone))
        }else{
          message.warning("Đã có lỗi xảy ra")
        }
      }catch(err){
        if(err.response.status === 401) {
          message.warning("Lỗi xác thực  !!");
        }
        else{
        message.error("Đã có lỗi xảy ra !")
        }
      }
    }
    const mapAdds = adds.map((value,key)=>{
      if(value){ 
        const finalValue = value.name+ "-"+ value.phone+"-"+value.specificAdd+ "-" + value.district;
        const addressValue = {"receiver": value.name,"phone": value.phone,"add": value.specificAdd+ "-" + value.district}
        return <Radio key={key}  value={addressValue}>{finalValue}</Radio> ;
      }else{return null}
    
   })
    const onFinishOrder =async (value) =>{
      try{
          const res = await axios.post(process.env.REACT_APP_SERVER_URL+ "/order/create",{"items":items,"userId": userId,"value": value,"total": total  },{
            headers: {"x-access-token": token}
          })
          if(res.status === 200){
            const cloneUserCart = [...userCart];
            for (let i = items.length -1; i >= 0; i--) {
              const item = items[i]
              cloneUserCart.splice(item.key,1)           
            }
            axios.post(process.env.REACT_APP_SERVER_URL+ "/user/cart/update",{"userId": userId,"newCart": cloneUserCart},
            {headers: {"x-access-token": token}}).then(res=>{if(res.status ===200){message.success("Thành công")}})
            dispatch(userSlice.actions.updateCart(cloneUserCart))
            dispatch(cartSlice.actions.updateItems([]))
            navigate("/khach-hang/don-hang")
          } 


      }catch (err){  
        if(err.response.status === 401) {
          message.warning("Lỗi xác thực  !!");
        }
        else{
        message.error("Đã có lỗi xảy ra !")
        }}
    }
    return (
        <>
            <Table pagination={false}  columns={columns} dataSource={selectedItems.items} />
           
            <Row gutter={[0,16]} style={{padding: 8, background: "lightgray"}}>
                <div style={{width: "100%"}} >Tổng giá trị: <b style={{color: "#1890ff"}}> {total.toLocaleString()} đ </b> </div>
                <Form
                  name="basic"
                  labelCol={{span: 24,}}
                  wrapperCol={{span: 24,}}
                  onFinish={onFinishOrder}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Địa chỉ nhận hàng"
                    name="receiveAdd"
                    rules={[
                      {
                        required: true,
                        message: 'Chọn địa chỉ nhận hàng !',
                      },
                    ]}
                  >
                    <Radio.Group style={{background:"white",borderRadius: "10px",padding: "10px"}} >
                      <Space direction="vertical">
                        
                      {mapAdds}
                     
                      </Space>
                    </Radio.Group>

                  </Form.Item>

                  <div style={{width: "100%"}}>  
                    <Button block type='dashed' onClick={showModal}>Thêm địa chỉ</Button>
                  </div>
                  <Form.Item
                    label="Phương thức thanh toán"
                    name="payMethod"
                    rules={[
                      {
                        required: true,
                        message: 'Chọn Phương thức thanh toán !',
                      },
                    ]}
                  >
                     <Select placeholder="Chọn phương thức thanh toán">
                      <Option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</Option>
                     
                      <Option value="Ví MOMO">
                        Ví MOMO
                      </Option>
                    </Select>

                  </Form.Item>
                  <Form.Item
                    wrapperCol={{
                      offset: 0,
                      span: 24,
                    }}
                  >
                    <Button block type="primary" htmlType="submit">
                      Đặt hàng
                    </Button>
                  </Form.Item>

                </Form>
             
                
            </Row>
            <Modal title="Thêm địa chỉ nhận hàng" footer={null} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onAdd}
                autoComplete="off"
              >
                <Form.Item
                  label="Tỉnh,Thành phố"
                  name="province"
                  rules={[{ required: true, message: 'Hãy chọn tỉnh, thành phố!' }]}
                >
                      <Select style={{zIndex: 5}}
                        onFocus={onProvinceFocus}
                        showSearch
                        placeholder="Tỉnh,Thành phố"
                        optionFilterProp="children"
                        onChange={onProvinceChange}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {mapProvince}
                      </Select>
                </Form.Item>
                <Form.Item
                  label="Quận, Huyện"
                  name="comune"
                  rules={[{ required: true, message: 'Hãy chọn Quận, Huyện !' }]}
                >
                      <Select
                        style={{zIndex: 4}}
                        showSearch
                        allowClear
                        open={comuneOpen}
                        placeholder="Quận, Huyện"
                        optionFilterProp="children"
                        onChange={onComuneChange}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {mapComune}
                      </Select>
                </Form.Item>
                <Form.Item
                  label="Phường, Xã"
                  name="district"
                  rules={[{ required: true, message: 'Hãy chọn Phường, xã !' }]}
                >
                      <Select
                        showSearch
                        allowClear
                        open={districtOpen}
                        placeholder="Phường, xã"
                        optionFilterProp="children"
                        onChange={onDistrictChange}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {mapDistrict}
                      </Select>
                </Form.Item>
                <Form.Item
                  label="Số nhà, Đường (VD: số 1 ngõ 1 đường Láng)"
                  name="specificAddress"
                  rules={[{ required: true, message: 'Hãy nhập số nhà, đường !' }]}
                >
                      <Input placeholder='Địa chỉ cụ thể'/>
                </Form.Item>
                <Form.Item
                  label="Họ tên người nhận"
                  name="name"
                  rules={[{ required: true, message: 'Hãy nhập tên người nhận !' }]}
                >
                      <Input placeholder='Tên người nhận'/>
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[{ required: true, message: 'Chưa nhập sdt !' },
                  { pattern: new RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/g), message: 'Số điện thoại không hợp lệ !' }]}
                
                >
                      <Input placeholder='Số điện thoại'/>
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                  <Button block type="primary" htmlType="submit">
                    Thêm địa chỉ
                  </Button>
                </Form.Item>
              </Form>
                
            </Modal>
        </>
    );
}

export default CreateOrder;
import {Button, Card, Col, Modal, Row, Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { EyeOutlined,EditOutlined } from '@ant-design/icons';
import ChangeStock from './ChangeStock';
const { Option } = Select;
const { Meta } = Card;
function WareHouse(props) {
    const [filter,setFilter] = useState({category:"",brand: ""})
    const [mobileValue,setMobileValue] = useState("")
    const [laptopValue,setLaptopValue] = useState("")
    const [tabletValue,setTabletValue] = useState("")
    const [data,setData] = useState([]);
    const [classifyModal,setClassifyModal] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});
    const [editModalData, setEditModalData] = useState("");
    const mobileChange = (value)=>{
       setMobileValue(value);
       setLaptopValue("")
       setTabletValue("")
       setFilter({category: "mobile", brand: value})
    }
    const laptopChange = (value)=>{
       setMobileValue("");
       setLaptopValue(value)
       setTabletValue("")
       setFilter({category: "laptop", brand: value})
    }
    const tabletChange = (value)=>{
       setMobileValue("");
       setLaptopValue("")
       setTabletValue(value)
       setFilter({category: "tablet", brand: value})
    }
    const viewAll = ()=>{
        setMobileValue("");
        setLaptopValue("")
        setTabletValue("")
        setFilter({category: "", brand: ""})
    }
    useEffect(()=>{
        if(filter.brand  === "" && filter.category === ""){
            axios.get(process.env.REACT_APP_SERVER_URL+ "/product/all").then(res=>setData(res.data))
        }
        else if(filter.category !== "" && filter.brand === ""){
           
            let getData = async ()=>{
                const res = await axios.get(process.env.REACT_APP_SERVER_URL+ "/product/find/"+filter.category);
                if(res.data){
                    setData(res.data)
                   
                }
            }
            getData();
        }else{
            let getData = async ()=>{
                const res = await axios.get(process.env.REACT_APP_SERVER_URL+ "/product/find/"+filter.category+"/"+filter.brand);
                if(res.data){
                    setData(res.data)
                    
                }
            }
            getData();
        }
    },[filter])
    const mapData = data.map((item,key)=>{
        if(item){
            
            const classify = item.classify;

            let almostOut = 0;
            let out = 0;
            classify.forEach(item => {
                if(item.classifyquantity < 10 & item.classifyquantity > 0){
                    almostOut = almostOut+ 1;
                }
                if(item.classifyquantity === 0){
                    out = out + 1;
                }
            });
            const checkAlmostOut = ()=>{
                if(almostOut > 0){
                    return (<span style={{color: "#1890ff"}}>{almostOut + "-phân loại sắp hết hàng"}</span>)
                }else {
                return null
                }
            }
            const checkIsOut = ()=>{
                if(out > 0){
                    return (<span style={{color: "red"}}>{out + "-phân loại hết hàng"}</span>
                      
                            )
                }else {
                return null
                }
            }
            const showModal = (item) => {
                setIsModalVisible(true);
                setModalData(item);
                let c = item.classify;
                c.sort((a,b)=>b.classifyquantity - a.classifyquantity)
                setClassifyModal(c)
            };
            
            const showEditModal = (data) => {
                setIsEditModalVisible(true);
                setEditModalData(data);
               
            };
            
            const cardimg = process.env.REACT_APP_SERVER_URL + "/file/"+ item.cardimg;
            return (
                <Col key={key} xl={{span:5}} lg={{span:5}}>
                   
                    
                        <Card
                            hoverable
                            style={{ width: "100%",opacity: 0.9 }}
                            cover={
                            <img
                            style={{maxHeight: 234}}
                                alt={item.name}
                                src={cardimg}
                            />
                            }
                            actions={[   
                                    <EyeOutlined onClick={()=>showModal(item)} key="view" />,
                                    <EditOutlined onClick={()=>showEditModal(item._id)} key="view" />,

                            ]}
                        >
                            <Meta
                                title={item.name}
                            />
                            <span>{classify.length + "-Phân loại"}</span>
                            <br/>
                           {checkAlmostOut()}
                           <br/>
                           {checkIsOut()}
                        </Card>
                
                   
                    </Col>
            )
        }else{
            return null;
        }
    })
   
    
    const handleCancel = () => {
        setIsModalVisible(false);
        setModalData({})
    };
    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        setModalData("")
    };
    const mapModalClassify = classifyModal.map((item,key)=>{
        
        if(!item.classifysold){
            item.classifysold = 0;
        }
        if(item.classifyquantity === 0){
            return (<div  key={key} style={{margin:3, background: "red",color: "white",padding: 3}}>
            <Row>Phân loại : {item.classifyname}</Row>
            <Row >Kho : {item.classifyquantity}-- Đã bán: {item.classifysold}</Row>
            </div>)
        }
        else if(item.classifyquantity !== 0 && item.classifyquantity < 10){
            return (<div  key={key} style={{margin:3, background: "blue",color: "white",padding: 3}}>
            <Row>Phân loại : {item.classifyname}</Row>
            <Row >Kho : {item.classifyquantity}-- Đã bán: {item.classifysold}</Row>
            </div>)
        }
        else {
            return (<div  key={key} style={{margin:3, background: "lightgray",padding: 3}}>
            <Row>Phân loại : {item.classifyname}</Row>
            <Row >Kho : {item.classifyquantity}-- Đã bán: {item.classifysold}</Row>
            </div>)
        }
    })
    
  
    return (
        <div>
            <Row gutter={[16,16]}>
                <Col span={4}><Button type='primary' onClick={viewAll}>Xem tất cả</Button> </Col>
                <Col span={6}>
                <span style={{padding:4}}>Điện thoại</span>
                <Select
                    name="mobile"
                    
                    onChange={mobileChange}
                    style={{width: 120}}
                    value={mobileValue}
                    placeholder="Lọc thương hiệu"
                    >
                    <Option value="">Tất cả</Option>
                    <Option value="apple">IPHONE</Option>
                    <Option value="samsung">SAMSUNG</Option>
                    <Option value="xiaomi">XIAOMI</Option>
                    <Option value="oppo">OPPO</Option>
                    <Option value="vivo">VIVO</Option>
                    <Option value="nokia">NOKIA</Option>
                    <Option value="asus">ASUS</Option>
                    <Option value="realme">REALME</Option>
                   
                    </Select>
                </Col>
                <Col span={6}>
                <span style={{padding:4}}>Laptop</span>
                <Select
                    style={{width: 120}}
                    placeholder="Lọc thương hiệu"
                    name="laptop"
                    onChange={laptopChange}
                    value={laptopValue}
                    >
                    <Option value="">Tất cả</Option>
                    <Option value="apple">MACBOOK</Option>
                    <Option value="hp">HP</Option>
                    <Option value="acer">ACER</Option>
                    <Option value="msi">MSI</Option>
                    <Option value="lenovo">LENOVO</Option>
                    <Option value="dell">DELL</Option>
                    <Option value="asus">ASUS</Option>
                    <Option value="gigabyte">GIGABYTE</Option>
                   
                    </Select>
                </Col>
                <Col span={8}>
                <span style={{padding:4}}>Máy tính bảng</span>
                <Select
                    style={{width: 120}}
                    placeholder="Lọc thương hiệu"
                    name="tabletChange"
                    onChange={tabletChange}
                    value={tabletValue}
                    >
                    <Option value="">Tất cả</Option>
                    <Option value="apple">IPAD</Option>
                    <Option value="samsung">SAMSUNG</Option>
                    <Option value="xiaomi">XIAOMI</Option>
                   
                    <Option value="lenovo">LENOVO</Option>
                   
                    </Select>
                </Col>
            </Row>
            <Row gutter={[4,4]} justify="center" style={{marginTop: 12}}>
                {mapData}
            </Row>
            <Modal footer={null} title="Chi tiết số lượng hàng" visible={isModalVisible} onCancel={handleCancel}>
               <h4>{modalData.name}</h4> 
                {mapModalClassify}
            </Modal>
            <Modal footer={null} title="Thay đổi số lượng" visible={isEditModalVisible} onCancel={handleEditCancel}>
                <ChangeStock data={editModalData} />
            </Modal>
        </div>
    );
}

export default WareHouse;
import { Col, Divider, Radio, Row, Select, Space, } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from '../productCard/ProductCard';
import LaptopNav from './LaptopNav';
import LaptopSlider from './LaptopSlider';
function Filtered(props) {
   
    const kw = props.category;
    const [data,setData] = useState([]);
    const [filteredData,setFilteredData] = useState([]);
    const [filter,setFilter] = useState({
        "priceRange": "all",
        "cpu": '',
        "ram": '',
        "gpu":'',
        "monitorSize": '',
        "rom": ''
    })
    useEffect(()=>{
        if(props.brand === null){
           
            let getData = async ()=>{
                const res = await axios.get(process.env.REACT_APP_SERVER_URL+ "/product/find/"+kw);
                if(res.data){
                    setData(res.data)
                    setFilteredData(res.data)
                }
            }
            getData();
        }else{
            let getData = async ()=>{
                const res = await axios.get(process.env.REACT_APP_SERVER_URL+ "/product/find/"+kw+"/"+props.brand);
                if(res.data){
                    setData(res.data)
                    setFilteredData(res.data)
                }
            }
            getData();
        }
       
      
    },[kw,props.brand])
    const mapProduct = filteredData.map((value,key)=>{
        if(value){
            return(
                <Col key={key} xl={{span:6}} lg={{span:6}}>
                    <ProductCard data={value}  />
                </Col>
            )
        }else{
            return null;
        }
    })
    const filterChange =  (e) =>{
        const value = e.target.value;
        var cloneData = [...filteredData];
        if(value === 'descending'){
            cloneData.sort((a, b) => a.highestprice - b.highestprice);
            
        }else if(value === 'ascending'){
           
            cloneData.sort((a, b) => b.highestprice - a.highestprice);
        }else if(value === 'newest'){
           
            cloneData.sort((a, b) =>new Date(b.createdAt) - new Date(a.createdAt));
        }else if(value === 'bestseller'){
           
            cloneData.sort((a, b) => b.sold - a.sold);
        }
        setFilteredData(cloneData);
    }
    const onChange = (e)=>{
        const {name,value}= e.target;
       
        
        setFilter({...filter, [name] : value})
    }
    useEffect(()=>{

        const newArr = data.filter(item=>{
            const config  = item.config;
           
            if(filter.priceRange !== "all"){
                
                if(filter.priceRange === 510){
                    return item.highestprice >= 5000000 && item.highestprice <= 10000000 && config.cpu.toLowerCase().includes(filter.cpu) && config.gpu.toLowerCase().includes(filter.gpu) && config.ram.includes(filter.ram) && config.monitorSize.includes(filter.monitorSize) && config.rom.includes(filter.rom)
                }else if(filter.priceRange === 1015){
                    return item.highestprice >= 10000000 && item.highestprice <= 15000000 && config.cpu.toLowerCase().includes(filter.cpu) && config.gpu.toLowerCase().includes(filter.gpu) && config.ram.includes(filter.ram) && config.monitorSize.includes(filter.monitorSize) && config.rom.includes(filter.rom)
                }else if(filter.priceRange === 1520){
                    return item.highestprice >= 15000000 && item.highestprice <= 20000000 && config.cpu.toLowerCase().includes(filter.cpu) && config.gpu.toLowerCase().includes(filter.gpu) && config.ram.includes(filter.ram) && config.monitorSize.includes(filter.monitorSize) && config.rom.includes(filter.rom)
                }else if(filter.priceRange === 20){
                    return item.highestprice >= 20000000 && config.cpu.toLowerCase().includes(filter.cpu) && config.gpu.toLowerCase().includes(filter.gpu) && config.ram.includes(filter.ram) && config.monitorSize.includes(filter.monitorSize) && config.rom.includes(filter.rom)
                }
            }else{
                console.log("co");
                return  config.cpu.toLowerCase().includes(filter.cpu) && config.gpu.toLowerCase().includes(filter.gpu) && config.ram.includes(filter.ram) && config.monitorSize.includes(filter.monitorSize) && config.rom.includes(filter.rom)
            }
        })
        setFilteredData(newArr)
    },[filter])
    return (
        <>
        <LaptopSlider />
        <LaptopNav />
        <Row  style={{background: "white",padding: 5,marginBottom: 5}} >

           

        </Row>
        <Row gutter={[8,8]} style={{padding:8,borderRadius: 16, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
            <Col span={24}>
            <span style={{fontSize: "1rem"}}>Sắp xếp theo</span>
            <Radio.Group onChange={filterChange} defaultValue="newest">
                <Radio.Button value="newest">Mới nhất</Radio.Button>
                <Radio.Button value="descending">Giá từ thấp đến cao</Radio.Button>
                <Radio.Button value="ascending">Giá từ cao đến thấp</Radio.Button>
                <Radio.Button value="bestseller">Bán chạy nhất</Radio.Button>
            </Radio.Group>
            </Col>
            <Col span={24}>
                <Row gutter={[8,8]}>
                    <Col lg={{span:3.5}}>
                        <h4>Mức giá</h4>
                        
                        <Radio.Group name="priceRange"  defaultValue={"all"} onChange={onChange} >
                            <Space direction='vertical'>
                            <Radio value="all">Tất cả</Radio>
                            <Radio value={510}>5-10 triệu</Radio>
                            <Radio value={1015}>10-15 triệu</Radio>
                            <Radio value={1520}>15-20 triệu</Radio>
                            <Radio value={20}>trên 20 triệu</Radio>
                            </Space>
                        </Radio.Group>
                    </Col>
                    <Col lg={{span:3}}>
                        <h4>RAM</h4>
                        <Radio.Group name="ram" defaultValue="" onChange={onChange} >
                        <Space direction='vertical'>
                            <Radio value="">Tất cả</Radio>
                            <Radio value={4}>4GB</Radio>
                            <Radio value={8}>8GB</Radio>
                            <Radio value={16}>16GB</Radio>
                            <Radio value={32}>32GB</Radio>
                        </Space>
                        </Radio.Group>
                    </Col>
                    <Col lg={{span:3.5}}>
                        <h4>Màn hình</h4>
                        <Radio.Group defaultValue="" name="monitorSize" onChange={onChange} >
                        <Space direction='vertical'>
                            <Radio value="">Tất cả</Radio>
                            <Radio value={13}>Khoảng 13 inch</Radio>
                            <Radio value={14}>Khoảng 14 inch</Radio>
                            <Radio value={15}>Trên 15inch</Radio>
                        
                        </Space>
                        </Radio.Group>
                    </Col>
                    <Col lg={{span:3.5}}>
                        <h4>GPU-Card đồ họa</h4>
                        <Radio.Group name="gpu" defaultValue="" onChange={onChange} >
                        <Space direction='vertical'>
                            <Radio value="">Tất cả</Radio>
                            <Radio value={"amd"}>AMD Radeon</Radio>
                            <Radio value={"nvidia"}>NVIDIA Geforce</Radio>
                            <Radio value={"intel"}>Intel Graohics</Radio>
                        </Space>
                        </Radio.Group>
                    </Col>
                    <Col lg={{span:8}}>
                    <h4>CPU</h4>
                    <Radio.Group name="cpu" defaultValue="" onChange={onChange} >
                        <Row>
                            <Col span={12}>
                                <Radio value="">Tất cả</Radio>
                            </Col>
                            <Col span={12}>
                                <Radio value={"pentium"}>Intel pentium</Radio>
                            </Col>
                            <Col span={12}>
                                <Radio value={"celeron"}>Intel celeron</Radio>
                            </Col>
                            <Col span={12}>
                                <Radio value={"i3"}>Intel core i3</Radio>
                            </Col>
                            <Col span={12}>
                                <Radio value={"i5"}>Intel core i5</Radio>
                            </Col>
                            <Col span={12}>
                                <Radio value={"i7"}>Intel core i7</Radio>
                            </Col>
                            <Col span={12}>
                                <Radio value={"i9"}>Intel core i9</Radio>
                            </Col>
                            <Col span={12}>
                                <Radio value={"r3"}>Amd Ryzen 3</Radio>
                            </Col>
                            <Col span={12}>
                                <Radio value={"r5"}>Amd Ryzen 5</Radio>
                            </Col>
                            <Col span={12}>
                                <Radio value={"r7"}>Amd Ryzen 7</Radio>
                            </Col>
                            <Col span={12}>
                                <Radio value={"r9"}>Amd Ryzen 9</Radio>
                            </Col>
                        </Row>
                       
                       
                        
                       
                       
                       
                       
                       
                       
                        
                       
                   
                    </Radio.Group>
                    </Col>
                </Row>
                
                    


               
    
  

            </Col>
            <Divider></Divider>
            {mapProduct}
         
            
        </Row>
        </>
    );
}

export default Filtered;
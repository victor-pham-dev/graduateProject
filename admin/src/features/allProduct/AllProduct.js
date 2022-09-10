import { Row, Select,Col,Button } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from '../productCard/ProductCard';
import SearchBox from "../searchBox/SearchBox";
const {Option} = Select;
function AllProduct(props) {
    const [filter,setFilter] = useState({category:"",brand: ""})
    const [mobileValue,setMobileValue] = useState("")
    const [laptopValue,setLaptopValue] = useState("")
    const [tabletValue,setTabletValue] = useState("")
    const [data,setData] = useState([]);

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
 
    const mapProduct = data.map((value,key)=>{
        if(value){
            return(
                <ProductCard data={value} key={key} />
            )
        }else{
            return null;
        }
    })
    const filterChange =  (value) =>{
        var cloneData = [...data];
        if(value === 'descending'){
            cloneData.sort((a, b) => a.highestprice - b.highestprice);
            
        }else if(value === 'ascending'){
           
            cloneData.sort((a, b) => b.highestprice - a.highestprice);
        }
        else if(value === 'bestseller'){
           
            cloneData.sort((a, b) => b.sold - a.sold);
        }
        setData(cloneData);
    }
    return (
        <>
        <SearchBox type="edit" />
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
        <Row justify='center' style={{background: "white",padding: 5,marginBottom: 5}} >

            <Select
                style={{witdh: 300}}
                placeholder="_________Sắp xếp_________"
                optionFilterProp="children"
                onChange={filterChange}
            >
                <Option value="descending">Giá từ thấp đến cao</Option>
                <Option value="ascending">Giá từ cao đến thấp</Option>
                <Option value="bestseller">Bán chạy</Option>
            </Select>

        </Row>
        <Row gutter={[16,16]}>
            {mapProduct}
         
            
        </Row>
        </>
    );
}

export default AllProduct;
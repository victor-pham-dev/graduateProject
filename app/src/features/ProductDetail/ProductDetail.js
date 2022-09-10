import { Avatar, Button, Col, Divider, Form, InputNumber, message, Radio, Rate, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import SlideImage from './SlideImage';
import axios from 'axios';
import {  useParams } from 'react-router-dom';
import SameProduct from './SameProduct';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../user/userSlice';
function ProductDetail(props) {
   
    const dispatch= useDispatch()
    const {id} = useParams();
    const token = useSelector(state=>state.user.token);
    const isLoggedIn = useSelector(state=>state.user.isLoggedIn);
    const userId = useSelector(state=>state.user.id)
    const userCart = useSelector(state=>state.user.cart)
    const [data,setData] = useState('')
    const [classify,setClassify] = useState([])
    const [reviews,setReviews] = useState([])
    const [urls,setUrls] = useState([])
    const [priceRange,setPriceRange] = useState('')
    const [selected,setSelected] = useState('')
    const [cart,setCart] = useState(userCart);
    const [disabled,setDisable] = useState(false);
    const [selectedQuantity,setSelectedQuantity] = useState('Vui lòng chọn phân loại');
    if(props.isScroll){
        window.scrollTo(0,0);
    }
    useEffect(()=>{
        setCart(userCart)
    },[userCart])

    const checkIsLogin = ()=>{
        if(!isLoggedIn){
            return <>Vui lòng đăng nhập để mua hàng</>
        }else{
            return (
                    <Form.Item
                        wrapperCol={{
                        offset: 0,
                        span: 24,
                        }}
                    >
                        <Space>
                            <Button disabled={disabled} icon={<ShoppingCartOutlined />} shape='round'  htmlType="submit">
                            Thêm vào giỏ hàng
                            </Button>
                    
                        </Space>
                    </Form.Item>
            )
        }
    }
    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios.get(process.env.REACT_APP_SERVER_URL+"/product/detail/"+id)
            if(res){
                setData(res.data);
                setClassify(res.data.classify);
                setUrls(res.data.imgurl);
                setPriceRange(res.data.pricerange)
                    if(res.data.reviews){
                        setReviews(res.data.reviews)
                    }
               
                }
                
            }
        getData();
    },[id])
    const mapClassify = classify.map((value,key)=>{
        const price = value.classifyprice;
        const quantity = value.classifyquantity;
        if(value.classifyquantity >0){
            return (
                <Radio.Button key={key} onClick={e=>selectedOption(e,price,quantity)}   value={value.classifyname}>{value.classifyname}</Radio.Button>
            )
        }else{
            return(
                <Radio.Button  key={key} disabled >{value.classifyname}-Hết hàng</Radio.Button>
            )
        }
    })
    // const classifyChange = (key)=>{
    //     console.log(key)
    // }
    const createMarkup = () => {
        return { __html: data.productinfo };
    }

    const selectedOption = (e,price,quantity)=>{
        setPriceRange(price.toLocaleString() +"đ")
        setSelected({classifyname: e.target.value, classifyprice: price});
        setSelectedQuantity(quantity);
        if(quantity <= 0 ){
            setDisable(true);
        }else{
            setDisable(false)
        }
    }
    const onFinish = (value) => {
            if(value.soluong > selectedQuantity){
                message.warning("Số lượng khả dụng: "+ selectedQuantity)
            }
            else{
                const newItem = {
                    "name": data.name,
                    "img": data.cardimg,
                    "classifyname": selected.classifyname,
                    "classifyprice": selected.classifyprice,
                    "quantity": value.soluong,
                    "productId": id
                    };
    
                var clone = [...cart]
                const  checkExist = cart.some(item => item.name === newItem.name && item.classifyname === newItem.classifyname)
                if(checkExist){
                    cart.map((value,key)=>{
                    var cloneItem = {...clone[key]}
                    if(value.name === newItem.name && value.classifyname === newItem.classifyname){
                        cloneItem.quantity = cloneItem.quantity + newItem.quantity;
                        return clone[key] = cloneItem;   
                    }else{return null}
                })
                }else{
                    clone.splice(0,0,newItem)
                }
    
                axios.post(process.env.REACT_APP_SERVER_URL+"/user/cart/update",
                    {
                        "userId": userId,
                        "newCart": clone
                    },{
                        headers: {"x-access-token": token}
                })
                .then(res=>{
                    if(res.status === 200){
                        message.success("Đã thêm vào giỏ hàng !!!");
                        dispatch(userSlice.actions.updateCart(clone))
                    }else{
                        message.warning("Đã có lỗi xảy ra !")
                    }
                })
            }
            
        
    };
    const mapReviews = reviews.map((item,key)=>{
        if(reviews.length >0){
            return(
                <>
                <Row key={key} style={{margin:4,padding: 8,background:"#f7faff",borderRadius: 6}}>
                    <Col span={24}>
                        <Space>
                          <Avatar size={"small"} src={item.avatar}></Avatar>
                            <span style={{fontWeight: "bold"}}>{item.username}</span>
                        </Space>
                    </Col>
                    <Col span={24}>
                        <span style={{color: "#1890ff"}}>
                            Phân loại: {item.classifyname}
                        </span>
                    </Col>
                    <Col span={24}>
                        <Rate allowHalf  disabled value={item.rateStar} />
                    </Col>
                    <Col span={24}>
                        <p>{item.reviewText}</p>
                    </Col>
                    
                   
                    
                </Row>
                </>
            )
        }else{
            return <>Chưa có đánh giá nào</>
        }
       
    })
    const checkMaxQuantity = (e)=>{
        
        if (e > selectedQuantity){
            message.warning("Số lượng khả dụng: "+selectedQuantity)
        }
    
    }
    return (
        <Row justify='center' style={{paddingTop: "20px",background: "#E8E8E8",borderRadius: "20px"}}>
            <Col span={22} style={{marginBottom: 8}}>
                <Row>
                    <Col xl={{span: 12}} >
                    <SlideImage urls={urls} />
                    </Col>
                    <Col xl={{span: 11,push: 1}} style={{paddingLeft: "10px"}}>
                        <h2 style={{color: "#1890ff"}} >{data.name}</h2>
                        <p>Đã bán : {data.sold} </p>
         
                        
                        <h2 style={{color: "red",textAlign: "center",background: "#d6d6d6",borderRadius: "10px"}}>{priceRange} </h2>
                        <Row>
                            
                            <Form
                                name="basic"
                                labelCol={{
                                    span: 24,
                                }}
                                wrapperCol={{
                                    span: 24,
                                }}
                            
                                onFinish={onFinish}
                                initialValues={{soluong: 1}}
                                autoComplete="off"
                                >
                                <Form.Item
                                    label="Loại sản phẩm"
                                    name="phanloai"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Hãy chọn phân loại muốn mua',
                                    },
                                    ]}
                                >
                                    <Radio.Group   buttonStyle="solid">
                                        {mapClassify}
                                    </Radio.Group>
                                   
                                </Form.Item>
                                <p>Trong kho còn : {selectedQuantity}  </p>
                               
                                <Form.Item
                                    label="Số lượng"
                                    name="soluong"
                                
                                    
                                >
                                    <InputNumber min={1}  onChange={(e)=>checkMaxQuantity(e)} />
                                </Form.Item>
                                {checkIsLogin()}
                                </Form>
                        </Row>
                    </Col>
                   
                </Row>
                <Row justify='center' gutter={[4,4]} style={{background: "white",borderRadius: "25px",padding: 15,marginTop: 6}}>
                    
                    <Col xl={18} >
                    <Divider>Thông tin sản phẩm</Divider>
                        <div dangerouslySetInnerHTML={createMarkup()} className='ck-content'></div>
                    
                    </Col>
                    
                    <Col xl={6}>
                        <Row>
                            <Col span={24}>
                            <Divider>Đánh giá sản phẩm</Divider>
                                {mapReviews}
                            </Col>
                            <Col xl={{span: 24}}>
                                <SameProduct category={data.category} id={data._id} />
                                </Col>
                        </Row>
                       
                    </Col>
              
                </Row>
               
                    
              


            </Col>
        </Row>
    );
}

export default ProductDetail;
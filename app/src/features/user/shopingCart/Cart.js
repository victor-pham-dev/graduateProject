import React, { useEffect, useState } from 'react';
import { Button,Table,InputNumber, Row, Popconfirm, message, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import cartSlice from './cartSlice';
import userSlice from '../userSlice';
import axios from 'axios';
function Cart(props) {
    const dispatch = useDispatch();
    const cartItem = useSelector((state)=> state.user.cart);
    const userId = useSelector((state)=> state.user.id);
    const token = useSelector((state)=> state.user.token);
    const [tbData,setTbData] = useState([])
    const [selectedRowKeys,setSelectedRowKeys] = useState([]);
    const [selectedItems,setSelectedItems] = useState([]);
    const [totalBill,setTotalBill] = useState(0);
    const [limit,setLimit] = useState(100);
    useEffect(()=>{
    let newTb =  [];
        cartItem.map((value,key)=>{
            
            var newItem = {
                "key": key,
                "name": value.name,
                "img": value.img,
                "classifyname": value.classifyname,
                "classifyprice": value.classifyprice,
                "quantity": value.quantity,
                "priceQuantity": value.classifyprice * value.quantity,
                "productId": value.productId,
                "isDisable": false
            }
            return newTb.push(newItem)
        })
        setTbData(newTb)
      
    },[cartItem])

    const onSelectChange = (selectedRowKeys,selectedRows) => {
        setSelectedRowKeys(selectedRowKeys)
        setSelectedItems(selectedRows)
        dispatch(cartSlice.actions.updateItems(selectedRows))
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        getCheckboxProps: (record) => ({
            disabled: record.isDisable === true,
           
          }),
    };
    const hasSelected = selectedRowKeys.length > 0;
    useEffect(()=>{
        var total = 0;
        selectedItems.forEach(item => {
            total = total + item.priceQuantity;
        })
        setTotalBill(total)
        dispatch(cartSlice.actions.updateTotal(total))
    },[selectedItems,dispatch])
    
    const columns = [
        {
          title: '',
          dataIndex: 'img',
          colSpan: 1,
          render: img =>{
              const src = process.env.REACT_APP_SERVER_URL + "/file/"+img;
              return (<img style={{width: "60px",height: "60px"}} src={src} alt={img} />)
          }
        },
        {
          title: 'Giỏ hàng',
          dataIndex: 'name',
          render: (name,record,index) =>{
            
            const quantityChange = (value)=>{
                axios.post(process.env.REACT_APP_SERVER_URL + '/product/getquantity',{
                    "classifyname": record.classifyname,
                    "id": record.productId
                },{headers: {
                    "x-access-token": token
                }}).then(res=>{setLimit(res.data)})
                setSelectedRowKeys([])
                setSelectedItems([]);
                let cloneRecord = {...record};
                if(value > limit){
                    cloneRecord.isDisable = true
                }else{
                    cloneRecord.isDisable = false
                }
              
                cloneRecord.quantity = value;
                cloneRecord.priceQuantity = value * cloneRecord.classifyprice;
                let cloneTbData = [...tbData];
                    cloneTbData[index] = cloneRecord;
                setTbData(cloneTbData)
                
            }
            const defaultQuantity = record.quantity;
            const price = record.classifyprice.toLocaleString();
            const classifyname = record.classifyname;
            return(
              <>
                  <h4 style={{overflow: 'auto',margin: 0}}>{name}</h4>
                  <small style={{borderRadius: 5,background: "lightgray",padding: 2}}>Phân loại : {classifyname}</small>
                  <br/>   
                  <small style={{color: "red"}}>Giá : {price}</small>
                  <br/>
                  <small>Số lượng :  </small>
                  <Form
                    name="basic"
                    initialValues={{
                        quantity: defaultQuantity,
                    }}
                  
                    autoComplete="off"
                    >
                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[

                            {
                                type: 'number',
                                max: limit,
                                message: 'Số lượng khả dụng: '+ limit,
                              }
                        ]}
                    >
                        <InputNumber min={1} record={record} index={index}  onChange={quantityChange} />

                    </Form.Item>

                    </Form>
                  </>
                )
            }
            
        },
        {
            title: '',
            dataIndex: '',
            render: (text,record,index) =>{
                const confirmDelete = ()=>{
                    var cloneTbData = [...tbData];
                        cloneTbData.splice(index,1);
                    var cloneCart = [...cartItem]
                        cloneCart.splice(index,1)
                    axios.post(process.env.REACT_APP_SERVER_URL+"/user/cart/update",{"userId": userId,"newCart": cloneCart},
                    {headers: {
                        "x-access-token": token
                    }}).then(res=>{
                        if(res.status === 200){
                            setTbData(cloneTbData);
                            dispatch(userSlice.actions.updateCart(cloneCart))
                        }else{
                            message.warning("Đã có lỗi xảy ra")
                        }
                    })
                  }
                return (
                    <Popconfirm
                        title="Bạn có chắc muốn xóa"
                        onConfirm={confirmDelete}
                        okText="Có"
                        cancelText="Không"
                        >
                        <Button style={{color: "red"}} type="dashed">Xóa</Button>
                        </Popconfirm>
                )
            }
          },
      ];

    return (
        
        <>

            <Table locale={{emptyText: "Chưa có sản phẩm nào trong giở hàng"}} style={{overflow: "scroll"}} pagination={false} rowSelection={rowSelection} columns={columns} dataSource={tbData} />
            <Row justify='end' style={{ padding: 8,background: "lightgray" }}>
                <span style={{ padding: 8}}>
                    {hasSelected  ? ` ${selectedRowKeys.length} Sản Phẩm Đã Chọn ` : 'Chưa chọn sản phẩm nào'}
                </span>
                <Link to={"/khach-hang/gio-hang/dat-hang"}>
                <Button type="primary"  disabled={!hasSelected &&totalBill <= 0} >
                  Thanh toán {totalBill.toLocaleString()} đ
                </Button>
                </Link>
            </Row>
        </>
        
    );
}

export default Cart;
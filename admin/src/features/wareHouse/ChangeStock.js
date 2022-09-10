import { Button, Form, Input, InputNumber, Row, Space, message } from 'antd';
import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { MinusCircleOutlined, PlusOutlined  } from '@ant-design/icons';

import axios from 'axios';
function ChangeStock(props) {
    const [form] = Form.useForm();
    const {id} = useParams();

    const navigate = useNavigate();
    const isLogIn= useSelector(state=>state.user.isLogIn)
    const token= useSelector(state=>state.user.token)
 
    const [data,setData]= useState('');


    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios.get(process.env.REACT_APP_SERVER_URL+"/product/detail/"+props.data)
            if(res){
                setData(res.data)
               
                }
            }
        getData();
    },[props.data])
    useEffect(()=>{
        const config = data.config;
        if(config){
            form.setFieldsValue({
               
                classify: data.classify
               
            })
        }
    },[data,form])
    useEffect(()=>{
        if(!isLogIn){
            navigate("/admin/account/login")
          }
    },[isLogIn,navigate])



    const editStock =async (value)=> {
        try{

                const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/product/edit/"+data._id,
                {category: data.category,
                    status: data.status,
                    name: data.productname,
                    classify: value.classify,
                    imgurl: data.imgurl,
                    config: {
                        "cpu": data.config.cpu,
                        "ram": data.config.ram,
                        "monitorSize": data.config.monitorSize,
                        "gpu": data.config.gpu,
                        "rom": data.config.rom
                    },
                    productinfo: data.productinfo},
                {headers:
                    {"x-access-token": token}
                })
                if(res.status === 200){
                    message.success("Đã lưu");
                    navigate("/chinh-sua-san-pham")
                }else{
                    message.error("Đã có lỗi xảy ra")
                }
            
            
        }catch (err){
            if(err.response.status === 403) {
                message.warning("Lỗi xác thực  !!");
            }
        }
    }
    return (
        <Row style={{backgroundColor: "#d6d6d6",borderRadius: "25px",padding: "30px"}}>
            <Form
                form={form}
                name="addnewproduct"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onFinish={editStock}
                autoComplete="false"

            >

            <label>Phân loại hàng</label>
            <Form.List name="classify">
                        {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                {...restField}
                                label="Phân loại"
                                
                                name={[name, 'classifyname']}
                                rules={[{ required: true, message: 'Chưa nhập tên phân loại' }]}
                                >
                                <Input placeholder="Hãy nhập phân loại sản phẩm " />
                                </Form.Item>
                                <Form.Item
                                {...restField}
                                name={[name, 'classifyprice']}
                                label="Giá phân loại"
                                rules={[{ required: true, message: 'Chưa nhập giá phân loại' }]}
                                >
                                     <InputNumber style={{width: "100%"}}
                                     formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                     parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                     placeholder='Giá phân loại' />
                                </Form.Item>
                                <Form.Item
                                {...restField}
                                name={[name, 'classifyquantity']}
                                label="Số lượng kho"
                                rules={[{ required: true, message: 'Chưa nhập Số lượng' }]}
                                >
                                     <InputNumber style={{width: "100%"}}
                                     placeholder='Số lượng' />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                            ))}
                            <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Thêm phân loại
                            </Button>
                            </Form.Item>
                        </>
                        )}
                    </Form.List>            
        
                    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                        <Button block type="primary" htmlType="submit">
                        Xác nhận sửa
                        </Button>
                    </Form.Item>
                    </Form>
        </Row>
    );
}

export default ChangeStock;
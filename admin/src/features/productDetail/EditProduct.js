import { Button, Select, Form, Input, InputNumber, Row, Space,TreeSelect, message } from 'antd';
import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { MinusCircleOutlined, PlusOutlined  } from '@ant-design/icons';
import ImagesUpload from './ImagesUpload';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
const {Option} = Select;
function AddNew(props) {
    const [form] = Form.useForm();
    const {id} = useParams();

    const navigate = useNavigate();
    const isLogIn= useSelector(state=>state.user.isLogIn)
    const token= useSelector(state=>state.user.token)
    const [value,setValue]= useState('')
    const [ckData,setCkData]= useState('')
    const [imgurl,setImgurl]= useState([]);
    const [imgdata,setImgData]= useState([]);
    const [data,setData]= useState('');

    const [initImg,setInitImg]= useState([]);
    const [cate,setCate]= useState([])
    const category=["mobile","laptop","tablet"];
    const mobilebrand=["apple","samsung","xiaomi","oppo","vivo","nokia","asus","realme"];
    const laptopbrand=["apple","asus","hp","acer","msi","lenovo","dell","gigabyte"];
    const tabletbrand=["apple","samsung","xiaomi","lenovp"];
    useEffect(()=>{
        if(value=== 'mobile'){
            setCate(mobilebrand)
        }else if(value === 'laptop'){
            setCate(laptopbrand)
        }else if(value === 'tablet'){
            setCate(tabletbrand)
        }
    },[value])

    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios.get(process.env.REACT_APP_SERVER_URL+"/product/detail/"+id)
            if(res){
                setData(res.data)
                setCkData(res.data.productinfo)
                setImgData(res.data.imgurl)
                }
            }
        getData();
    },[id])
    useEffect(()=>{
        const config = data.config;
        if(config){
            form.setFieldsValue({
                category: data.category,
                productname: data.name,
                brand: data.brand,
                status: data.status,
                classify: data.classify,
                cpu: config.cpu,
                monitorSize: config.monitorSize,
                ram: config.ram,
                gpu: config.gpu,
                rom: config.rom
               
            })
        }
        
    },[data,form])
    useEffect(()=>{
        var newList= [];
        imgdata.map((value,key)=>{
            const newItem = {
                uid: key,
                name: "image.jpeg",
                status: 'done',
                url: process.env.REACT_APP_SERVER_URL + "/file/" + value,
                response: value
            }
            return newList.push(newItem)
        })
        setInitImg(newList)
    },[imgdata])

    useEffect(()=>{
        if(!isLogIn){
            navigate("/admin/account/login")
          }
    },[isLogIn,navigate])




    const getImgData =(data)=>{
        setImgurl(data)
       
    }

    const edit =async (value)=> {
        try{
            if(imgurl.length === 0){
                message.warning("Chưa có ảnh sản phẩm !")
            }else{
                const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/product/edit/"+data._id,
                {category: value.category,
                    status: value.status,
                    name: value.productname,
                    classify: value.classify,
                    imgurl: imgurl,
                    config: {
                        "cpu": value.cpu,
                        "ram": value.ram,
                        "monitorSize": value.monitorSize,
                        "gpu": value.gpu,
                        "rom": value.rom
                    },
                    productinfo: ckData},
                {headers:
                    {"x-access-token": token}
                })
                if(res.status === 200){
                    message.success("Đã lưu");
                    navigate("/chinh-sua-san-pham")
                }else{
                    message.error("Đã có lỗi xảy ra")
                }
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
                onFinish={edit}
                autoComplete="false"

            >
                <Form.Item
                    label="Danh mục sản phẩm"
                    name="category"
                    rules={[{ required: true, message: 'Chọn danh mục sản phẩm !' }]}
                >
                    <Select value={value} onChange={e=>setValue(e)}>
                        {category.map((value,key)=>{
                            return(
                                <Option value={value} key={key}>{value}</Option>
                            )
                        })}
                       
                    </Select>

                </Form.Item>
                <Form.Item
                    label="Thương hiệu"
                    name="brand"
                    rules={[{ required: true, message: 'Chọn Thương hiệu !' }]}
                >
                    
                    <Select>
                        {cate.map((value,key)=>{
                            return(
                                <Option value={value} key={key}>{value}</Option>
                            )
                        })}
                       
                    </Select>

                </Form.Item>
                <Form.Item
                    label="Tên sản phẩm"
                    name="productname"
                    rules={[{ required: true, message: 'Hãy nhập Tên sản phẩm !' }]}
                >
                        <Input />
                </Form.Item>
                    
                    <Form.Item
                        label="Tình trạng (Sẵn hàng, sắp về, Hết hàng)"
                        name="status"
                        rules={[{ required: true, message: 'Hãy chọn trạng thái sản phẩm !'}]}
                    >
                        <Select
                            placeholder="Chọn"
                            optionFilterProp="children"
                        >
                            <Option value="Còn hàng">Còn hàng</Option>
                            <Option value="Sắp về">Sắp về</Option>
                            <Option value="Ngừng kinh doanh">Ngừng kinh doanh</Option>
                            <Option value="Trả góp 0%">Trả góp 0%</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="CPU - vi xử lý"
                        name="cpu"
                        rules={[{ required: true, message: 'Hãy nhập tên CPU !'}]}
                    >
                         <Input />
                    </Form.Item>
                    <Form.Item
                        label="RAM"
                        name="ram"
                        rules={[{ required: true, message: 'Hãy nhập thông số ram !'}]}
                    >
                         <Input />
                    </Form.Item>
                    <Form.Item
                        label="Kích thước màn hình"
                        name="monitorSize"
                        rules={[{ required: true, message: 'Hãy nhập kích thước màn hình !'}]}
                    >
                         <Input />
                    </Form.Item>
                    <Form.Item
                        label="GPU"
                        name="gpu"
                        rules={[{ required: true, message: 'Hãy nhập tên GPU !'}]}
                    >
                         <Input />
                    </Form.Item>
                    <Form.Item
                        label="ROM"
                        name="rom"
                        rules={[{ required: true, message: 'Hãy nhập ROM !'}]}
                    >
                         <Input />
                    </Form.Item>
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

                    <label>Ảnh sản phẩm</label>
                    <ImagesUpload initImg={initImg} getImgData={(data)=>getImgData(data)} />
     
                    <label>Thông tin và đánh giá sản phẩm</label>
                    <CKEditor
                                editor={ ClassicEditor }
                                data={ckData}
                                onReady={ editor => {
                                    // You can store the "editor" and use when it is needed.
                                   
                                } }
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                   setCkData(data)
                                } }
                                onBlur={ ( event, editor ) => {
                                    //
                                } }
                                onFocus={ ( event, editor ) => {
                                    //
                                } }
                        /> 
                

        
                    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                        <Button block type="primary" htmlType="submit">
                        Xác nhận sửa
                        </Button>
                    </Form.Item>
                    </Form>
        </Row>
    );
}

export default AddNew;
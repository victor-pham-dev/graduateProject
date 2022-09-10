import { Button, Divider, Form, Input, TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function NavManager(props) {
    const navigate = useNavigate();
    const isLogIn= useSelector(state=>state.user.isLogIn)

    useEffect(()=>{
        if(!isLogIn){
            navigate("/admin/account/login")
          }
    },[isLogIn])
    const [value,setValue]= useState('')
    const treeData = [
        {
          title: 'Bàn ghế',
          value: 'banghe',
          children: [
            {
              title: 'Bàn ghế gỗ',
              value: 'banghego',
              children: []
            },
            {
              title: 'Bàn làm việc, học tập',
              value: 'banlamviechoctap',
              children: []
            },
          ],
        }
      ];
    const onChange = value=>{
        setValue(value)
        console.log(value)
    }
    const addNavFiel = value=>{

    }
    return (
        <div>
            
           
            <Divider>Chọn 1 Mục để thêm tiếp DANH MỤC CON</Divider>
            <span>Thêm menu con cho : {value}</span>
            <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 10 }}
                initialValues={{ remember: true }}
                onFinish={addNavFiel}
                autoComplete="off"
                >
                <Form.Item
                    label="Chọn danh mục để thêm DANH MỤC CON"
                    name="navname"
                    rules={[{ required: true, message: 'Chưa nhập Tên danh mục!' }]}
                >
                     <TreeSelect
                        style={{ width: '100%' }}
                        value={value}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={treeData}
                        placeholder="Please select"
                        treeDefaultExpandAll
                        onChange={onChange}
                        />
                </Form.Item>
                <Form.Item
                    label="Tên danh mục (Viết thường)"
                    name="navname"
                    rules={[{ required: true, message: 'Chưa nhập Tên danh mục!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Tên danh mục( viết thường không có dấu cách)"
                    name="navcode"
                    rules={[{ required: true, message: 'Chưa nhập kí hiệu' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                    Thêm danh mục
                    </Button>
                </Form.Item>
                </Form>
        </div>
    );
}

export default NavManager;      
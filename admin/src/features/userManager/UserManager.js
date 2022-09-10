import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UserManager(props) {
    const navigate = useNavigate();
    const isLogIn= useSelector(state=>state.user.isLogIn)
    const adminId= useSelector(state=>state.user.id)
    const token= useSelector(state=>state.user.token);
    const [data,setData] = useState([]);
    const [tbData,setTbData] = useState([]);
    useEffect(()=>{
        if(isLogIn){
            axios.get(process.env.REACT_APP_SERVER_URL + "/user/all/"+adminId,{headers:{
                "x-access-token": token
            }})
            .then(res=>{
                if(res.status === 200){
                    setData(res.data)
                }
            })
        }
       
    },[adminId])
    useEffect(()=>{
        if(!isLogIn){
            navigate("/admin/account/login")
          }
    },[isLogIn,navigate])
    useEffect(()=>{
        var newTbData= [];
        data.map((value,key)=>{
            const newTbItem = {...value,"key": key}
            return newTbData.push(newTbItem)
        })
        setTbData(newTbData)
    },[data])

    const columns = [
        {
          title: 'FB',
          dataIndex: 'facebookId',
          render: text =>{
            if(text !== ""){
                return (
                    <div>
                        <a target="_blank" href={'https://www.facebook.com/profile.php?id='+ text}>Link</a>
                    </div>)
            }else{
                return <>Chưa LK</>
            }
              
          }
        },
        {
          title: 'Avatar',
          dataIndex: 'avatar',
          render: text =>{
              return (
              <div>

                <img style={{width:60}} src={text} alt="avatar" />
                </div>)
          }
        },
        {
          title: 'Khách hàng',
          dataIndex: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
          title: 'Số điện thoại',
          dataIndex: 'phone'
        },
        {
          title: 'Số đơn hàng',
          dataIndex: 'ordersQuantity',
          sorter: (a, b) => b.name.length - a.name.length,
          sortDirections: ['descend','ascend'],
        },
        {
          title: 'Chi tiêu',
          dataIndex: 'amountSpent',
          render: text=>(<>{text.toLocaleString()} đ</>),
          sorter: (a, b) => b.name.length - a.name.length,
          sortDirections: ['descend','ascend'],
        },
      ];
    return (
        <div>
            <Table locale={{emptyText: "NO USER"}} pagination={false}  columns={columns} dataSource={tbData} />
        </div>
    );
}

export default UserManager;
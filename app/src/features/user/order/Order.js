import { Badge, Row, Tabs } from 'antd';
import React, { useState } from 'react';

import Confirming from './Confirming';
import Done from './Done';
import Shiping from './Shiping';
const {TabPane} = Tabs;
function Order(props) {
    const [confirm,setConfirm]= useState(0)
    const [shiping,setShiping]= useState(0)
    const badgeConfirm = (value)=>{
        setConfirm(value)
    }
    const badgeShiping = (value)=>{
        setShiping(value)
    }
    return (
        
          <Tabs defaultActiveKey="1">
                <TabPane tab={
                    <Badge count={confirm} offset={[15, 0]}>
                        <span>Chờ xác nhận</span>
                    </Badge>
                }
                key="1">
                    <Confirming get={(value)=>badgeConfirm(value)}   />
                </TabPane>
                <TabPane  tab={
                    <Badge count={shiping} offset={[15, 0]} color={"#1890ff"}>
                        <span>Đang giao hàng</span>
                    </Badge>
                } key="2">
                    <Shiping get={(value)=>badgeShiping(value)} />
                </TabPane>
                <TabPane tab="Đã hoàn thành" key="3">
                    <Done />
                </TabPane>
            </Tabs>
    
    );
}

export default Order;
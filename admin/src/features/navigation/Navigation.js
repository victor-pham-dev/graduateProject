import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

import { TagTwoTone } from '@ant-design/icons';
import './style.css'
const { Sider } = Layout;
const { SubMenu } = Menu;
function Navigation(props) {

    return (
        <Sider breakpoint="md" collapsedWidth="0" style={{zIndex: 2}} theme="light" >
          <Menu theme="light" mode="inline" defaultOpenKeys={["order"]} >
            <SubMenu icon={<TagTwoTone rotate={45} twoToneColor={"#1890ff"} />}  key="order" title="Đơn hàng">
              
              <Menu.Item  key="confirming">
                <Link to="/don-hang/cho-xac-nhan">
                Đơn chờ xác nhận 
                </Link>
              </Menu.Item>
              <Menu.Item  key="shiping">
                <Link to="/don-hang/dang-xu-ly">
                  Đơn đang xử lý
                </Link>
              </Menu.Item>
              <Menu.Item  key="done">
                <Link to="/don-hang/da-hoan-thanh">
                  Đơn đã hoàn thành
                </Link>
              </Menu.Item>
            </SubMenu>
           
            <SubMenu icon={<TagTwoTone rotate={45} twoToneColor={"#1890ff"} />} style={{color: "#1890ff"}} title="Kho hàng"  key="kho">
            <Menu.Item  key="khohang">
                <Link to="/kho-hang">
                Kho hàng 
                </Link>
              </Menu.Item>
                
                
            </SubMenu>
            
            <SubMenu icon={<TagTwoTone rotate={45} twoToneColor={"#1890ff"} />}  key="banghe" title="Quản lý sản phẩm">
              <Menu.Item  key="allproduct">
                <Link to="/chinh-sua-san-pham">
                Chỉnh sửa sản phẩm
                </Link>
              </Menu.Item>
              <Menu.Item  key="ban">
                <Link to="/them-moi-san-pham">
                Thêm mới sản phẩm
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu icon={<TagTwoTone rotate={45} twoToneColor={"#1890ff"} />}  key="usermanager" title="Khách hàng">
              <Menu.Item  key="user">
                <Link to="/quan-ly-khach-hang">
                 Quản lý khách hàng
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu icon={<TagTwoTone rotate={45} twoToneColor={"#1890ff"} />}  key="basnghe" title="Quản lý trang">
              
              <Menu.Item  key="navmanager">
                <Link to="/quan-li-menu">
                  Quản lý menu
                </Link>
              </Menu.Item>
              <Menu.Item  key="basn">
                <Link to="/edit-trang-chu">
                  Chỉnh sửa trang chủ
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
          
        </Sider>
    );
}

export default Navigation;                      
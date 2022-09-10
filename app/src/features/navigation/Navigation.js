import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

import { TagTwoTone,MenuOutlined,MobileTwoTone,LaptopOutlined,TabletOutlined,DesktopOutlined,UsbTwoTone } from '@ant-design/icons';
import './style.css'
const { Sider } = Layout;
const { SubMenu } = Menu;
function Navigation(props) {
  const [widthView,setWidthView] = useState(window.innerWidth);
  const [isCollapse,setIsCollapse] = useState(true);
  useEffect(()=>{
    setWidthView(setWidthView)
  },[])
  const closeMenu = () =>{
    setIsCollapse(true)
    
  }
  const onCollapse = () =>{
    setIsCollapse(!isCollapse)
  }
  const checkWitdhView = () =>{
    if(widthView <= 768){
      return (
        <Sider breakpoint="lg" collapsedWidth="0" style={{zIndex: 2}} theme="light" collapsed={isCollapse} onCollapse={onCollapse}
          trigger={<MenuOutlined />}
        >
        <Menu theme="light" mode="inline" >
        <SubMenu icon={<MobileTwoTone  twoToneColor={"#1890ff"} />}  key="mobile" title="Điện thoại">
          <Menu.Item onClick={closeMenu} key="allmobile">
            <Link to="/dien-thoai">
              Tất cả điện thoại
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="iphone">
            <Link to="/dien-thoai/iphone">
              Apple (Iphone)
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="samsungmobile">
            <Link to="/dien-thoai/samsung">
              Samsung
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="xiaomimobile">
            <Link to="/dien-thoai/xiaomi">
             Xiaomi
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="oppomobile">
            <Link to="/dien-thoai/oppo">
              Oppo
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="vivomobile">
            <Link to="/dien-thoai/vivo">
              Vivo
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="nokiamobile">
            <Link to="/dien-thoai/nokia">
              Nokia
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="asusmobile">
            <Link to="/dien-thoai/asus">
            Asus
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="realmemobile">
            <Link to="/dien-thoai/realme">
            Realme
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu icon={<LaptopOutlined  twoToneColor={"#1890ff"} />}  key="laptop" title="Laptop">
          
          <Menu.Item onClick={closeMenu} key="alllaptop">
            <Link to="/laptop">
            Tất cả laptop
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="macbook">
            <Link to="/laptop/macbook">
            Macbook
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="asuslaptop">
            <Link to="/laptop/asus">
            Asus
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="hplaptop">
            <Link to="/laptop/hp">
            HP
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="acerlaptop">
            <Link to="/laptop/acer">
            Acer
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="msilaptop">
            <Link to="/laptop/msi">
            Msi
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="lenovolaptop">
            <Link to="/laptop/lenovo">
            Lenovo
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="dell">
            <Link to="/laptop/dell">
            Dell
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="gigabytelaptop">
            <Link to="/laptop/gigabyte">
            Gigabyte
            </Link>
          </Menu.Item>
         
        
        </SubMenu>
        <SubMenu icon={<TabletOutlined  />}  key="tablet" title="Máy tính bảng">
          
          <Menu.Item onClick={closeMenu} key="alltablet">
            <Link to="/tablet">
            Tất cả máy tính bảng
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="ipad">
            <Link to="/tablet/ipad">
            Ipad (Apple)
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="samsungtablet">
            <Link to="/tablet/samsung">
            Samsung
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="xiaomitablet">
            <Link to="/tablet/xiaomi">
            Xiaomi
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="lenovotablet">
            <Link to="/tablet/lenovo">
            Lenovo
            </Link>
          </Menu.Item>
          
        
        </SubMenu>
        <SubMenu icon={<DesktopOutlined />}  key="pc" title="PC - Linh kiện">
          
          <Menu.Item onClick={closeMenu} key="mayrapsan">
            <Link to="/may-tinh-de-ban">
            PC
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="pccomponent">
            <Link to="/linh-kien-pc">
            Linh kiện PC
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="monitor">
            <Link to="/man-hinh">
            Màn hình
            </Link>
          </Menu.Item>  
        </SubMenu>
        <SubMenu icon={<UsbTwoTone />}  key="phukien" title="Phụ kiện">
          
          <Menu.Item onClick={closeMenu} key="router">
            <Link to="/phu-kien/router">
            Router
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="loa">
            <Link to="/phu-kien/loa">
            Loa
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="tainghe">
            <Link to="/phu-kien/tai-nghe">
            Tai nghe
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="thenho">
            <Link to="/phu-kien/the-nho">
            Thẻ nhớ,USB
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="chuot">
            <Link to="/phu-kien/chuot">
            Chuột
            </Link>
          </Menu.Item>
          <Menu.Item onClick={closeMenu} key="phukiendienthoai">
            <Link to="/phu-kien/dien-thoai">
            Phụ kiện điện thoại
            </Link>
          </Menu.Item>
         
        </SubMenu>
      </Menu>
      </Sider>
      )
    }else{
      return (
        <Sider  breakpoint="lg" width={240} collapsedWidth="0" style={{zIndex: 2}} theme="light">
        <Menu theme="light" mode="inline">
        <SubMenu icon={<MobileTwoTone  twoToneColor={"#1890ff"} />}  key="mobile" title="Điện thoại">
          <Menu.Item  key="allmobile">
            <Link to="/dien-thoai">
              Tất cả điện thoại
            </Link>
          </Menu.Item>
          <Menu.Item  key="iphone">
            <Link to="/dien-thoai/iphone">
              Apple (Iphone)
            </Link>
          </Menu.Item>
          <Menu.Item  key="samsungmobile">
            <Link to="/dien-thoai/samsung">
              Samsung
            </Link>
          </Menu.Item>
          <Menu.Item key="xiaomimobile">
            <Link to="/dien-thoai/xiaomi">
             Xiaomi
            </Link>
          </Menu.Item>
          <Menu.Item  key="oppomobile">
            <Link to="/dien-thoai/oppo">
              Oppo
            </Link>
          </Menu.Item>
          <Menu.Item  key="vivomobile">
            <Link to="/dien-thoai/vivo">
              Vivo
            </Link>
          </Menu.Item>
          <Menu.Item  key="nokiamobile">
            <Link to="/dien-thoai/nokia">
              Nokia
            </Link>
          </Menu.Item>
          <Menu.Item  key="asusmobile">
            <Link to="/dien-thoai/asus">
            Asus
            </Link>
          </Menu.Item>
          <Menu.Item  key="realmemobile">
            <Link to="/dien-thoai/realme">
            Realme
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu icon={<LaptopOutlined  twoToneColor={"#1890ff"} />}  key="laptop" title="Laptop">
          
          <Menu.Item  key="alllaptop">
            <Link to="/laptop">
            Tất cả laptop
            </Link>
          </Menu.Item>
          <Menu.Item  key="macbook">
            <Link to="/laptop/macbook">
            Macbook
            </Link>
          </Menu.Item>
          <Menu.Item  key="asuslaptop">
            <Link to="/laptop/asus">
            Asus
            </Link>
          </Menu.Item>
          <Menu.Item  key="hplaptop">
            <Link to="/laptop/hp">
            HP
            </Link>
          </Menu.Item>
          <Menu.Item key="acerlaptop">
            <Link to="/laptop/acer">
            Acer
            </Link>
          </Menu.Item>
          <Menu.Item  key="msilaptop">
            <Link to="/laptop/msi">
            Msi
            </Link>
          </Menu.Item>
          <Menu.Item  key="lenovolaptop">
            <Link to="/laptop/lenovo">
            Lenovo
            </Link>
          </Menu.Item>
          <Menu.Item  key="dell">
            <Link to="/laptop/dell">
            Dell
            </Link>
          </Menu.Item>
          <Menu.Item  key="gigabytelaptop">
            <Link to="/laptop/gigabyte">
            Gigabyte
            </Link>
          </Menu.Item>
         
        
        </SubMenu>
        <SubMenu icon={<TabletOutlined  />}  key="tablet" title="Máy tính bảng">
          
          <Menu.Item key="alltablet">
            <Link to="/tablet">
            Tất cả máy tính bảng
            </Link>
          </Menu.Item>
          <Menu.Item  key="ipad">
            <Link to="/tablet/ipad">
            Ipad (Apple)
            </Link>
          </Menu.Item>
          <Menu.Item  key="samsungtablet">
            <Link to="/tablet/samsung">
            Samsung
            </Link>
          </Menu.Item>
          <Menu.Item  key="xiaomitablet">
            <Link to="/tablet/xiaomi">
            Xiaomi
            </Link>
          </Menu.Item>
          <Menu.Item  key="lenovotablet">
            <Link to="/tablet/lenovo">
            Lenovo
            </Link>
          </Menu.Item>
          
        
        </SubMenu>
        <SubMenu icon={<DesktopOutlined />}  key="pc" title="PC - Linh kiện">
          
          <Menu.Item  key="mayrapsan">
            <Link to="/may-tinh-de-ban">
            PC
            </Link>
          </Menu.Item>
          <Menu.Item  key="pccomponent">
            <Link to="/linh-kien-pc">
            Linh kiện PC
            </Link>
          </Menu.Item>
          <Menu.Item  key="monitor">
            <Link to="/man-hinh">
            Màn hình
            </Link>
          </Menu.Item>  
        </SubMenu>
        <SubMenu icon={<UsbTwoTone />}  key="phukien" title="Phụ kiện">
          
          <Menu.Item  key="router">
            <Link to="/phu-kien/router">
            Router
            </Link>
          </Menu.Item>
          <Menu.Item  key="loa">
            <Link to="/phu-kien/loa">
            Loa
            </Link>
          </Menu.Item>
          <Menu.Item  key="tainghe">
            <Link to="/phu-kien/tai-nghe">
            Tai nghe
            </Link>
          </Menu.Item>
          <Menu.Item  key="thenho">
            <Link to="/phu-kien/the-nho">
            Thẻ nhớ,USB
            </Link>
          </Menu.Item>
          <Menu.Item  key="chuot">
            <Link to="/phu-kien/chuot">
            Chuột
            </Link>
          </Menu.Item>
          <Menu.Item key="phukiendienthoai">
            <Link to="/phu-kien/dien-thoai">
            Phụ kiện điện thoại
            </Link>
          </Menu.Item>
         
        </SubMenu>
      </Menu>
      </Sider>
      )
    }
  }
  return (
      <>

          {checkWitdhView()}
      </>
    );
}

export default Navigation;                      
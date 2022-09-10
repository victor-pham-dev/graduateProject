import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NoMatch from './noMatch/NoMatch';
import HomePage from './homePage/HomePage';
import MobileFiltered from './filtered/MobileFiltered';
import LaptopFillter from './filtered/LaptopFillter';
import ProductDetail from './ProductDetail/ProductDetail';
import Login from './user/Login'
import Register from './user/Register'
import Cart from './user/shopingCart/Cart';
import CreateOrder from './user/shopingCart/CreateOrder';
import Order from './user/order/Order';
import Profile from './user/profile/Profile';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage isScroll ={false} />}  />

            <Route path="/dien-thoai"  >
                <Route path="" element={<MobileFiltered isScroll ={true} category="mobile" brand={null} />} />
                <Route path="iphone" element={<MobileFiltered isScroll ={true} category="mobile" brand="apple" />} />
                <Route path="samsung" element={<MobileFiltered isScroll ={true} category="mobile" brand="samsung" />} />
                <Route path="xiaomi" element={<MobileFiltered isScroll ={true} category="mobile" brand="xiaomi" />} />
                <Route path="oppo" element={<MobileFiltered isScroll ={true} category="mobile" brand="oppo" />} />
                <Route path="vivo" element={<MobileFiltered isScroll ={true} category="mobile" brand="vivo" />} />
                <Route path="nokia" element={<MobileFiltered isScroll ={true} category="mobile" brand="nokia" />} />
                <Route path="asus" element={<MobileFiltered isScroll ={true} category="mobile" brand="asus" />} />
                <Route path="realme" element={<MobileFiltered isScroll ={true} category="mobile" brand="realme" />} />
            </Route>


            <Route path="/laptop">
                <Route path="" element={<LaptopFillter isScroll ={true} category="laptop" brand={null} />} />
                <Route path="macbook" element={<LaptopFillter isScroll ={true} category="laptop" brand="apple" />} />
                <Route path="asus" element={<LaptopFillter isScroll ={true} category="laptop" brand="asus" />} />
                <Route path="hp" element={<LaptopFillter isScroll ={true} category="laptop" brand="hp" />} />
                <Route path="acer" element={<LaptopFillter isScroll ={true} category="laptop" brand="acer" />} />
                <Route path="msi" element={<LaptopFillter isScroll ={true} category="laptop" brand="msi" />} />
                <Route path="lenovo" element={<LaptopFillter isScroll ={true} category="laptop" brand="lenovo" />} />
                <Route path="dell" element={<LaptopFillter isScroll ={true} category="laptop" brand="dell" />} />
                <Route path="gigabyte" element={<LaptopFillter isScroll ={true} category="laptop" brand="gigabyte" />} />
            </Route>
  

            {/* <Route path="/tablet"   >
                <Route path="" element={<Filtered isScroll ={true} category="laptop" brand={null} />} />
                <Route path="ipad" element={<Filtered isScroll ={true} category="laptop" brand="apple" />} />
                <Route path="samsung" element={<Filtered isScroll ={true} category="laptop" brand="samsung" />} />
                <Route path="xiaomi" element={<Filtered isScroll ={true} category="laptop" brand="xiaomi" />} />
                <Route path="lenovo" element={<Filtered isScroll ={true} category="laptop" brand="lenovo" />} />
            </Route> */}






            <Route path="/chi-tiet-san-pham/:name/:id" element={<ProductDetail isScroll ={true} />} >
               
            </Route>
            <Route path="/khach-hang" >
                <Route path="tai-khoan/dang-nhap" element={<Login isScroll ={true} />} />
                <Route path="tai-khoan/dang-ki" element={<Register isScroll ={true} />} />
                <Route path="gio-hang" element={<Cart isScroll ={true} />} />
                <Route path="gio-hang/dat-hang" element={<CreateOrder isScroll ={true} />}  />
                <Route path="don-hang" element={<Order isScroll ={true} />}  />
                <Route path="tai-khoan/thong-tin" element={<Profile />}  />
            </Route>


            <Route path="*" element={<NoMatch />} />
            
        </Routes>
    );
}

export default Router;                
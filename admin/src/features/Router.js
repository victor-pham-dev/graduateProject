import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NoMatch from './noMatch/NoMatch';
import HomePage from './homePage/HomePage';
import AllProduct from './allProduct/AllProduct';
import ProductDetail from './productDetail/ProductDetail';
import EditProduct from './productDetail/EditProduct';
import Register from './user/Register'
import Login from './user/Login';
import AddNew from './addNew/AddNew';
import NavManager from './navmanager/NavManager';
import Unconfirmed from './orderManager/Unconfirmed';
import Processing from './orderManager/Processing';
import EditClientHomePage from './editClientHomePage/EditClientHomePage';
import Done from './orderManager/Done';
import WareHouse from './wareHouse/WareHouse';
import UserManager from './userManager/UserManager';
function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chinh-sua-san-pham" element={<AllProduct/>} >
            </Route>
            <Route path="/chi-tiet-san-pham/:name/:id" element={<ProductDetail />} />
            <Route path="/edit-san-pham/:name/:id" element={<EditProduct />} />
            <Route path="/them-moi-san-pham" element={<AddNew />} >
            
            </Route>
            <Route path="/kho-hang" element={<WareHouse />} />
            <Route path="/edit-trang-chu" element={<EditClientHomePage />} />
            <Route path="/don-hang"  >
                <Route path="cho-xac-nhan" element={<Unconfirmed />} />
                <Route path="dang-xu-ly" element={<Processing />} />
                <Route path="da-hoan-thanh" element={<Done />} />
            </Route>

            
               

            <Route path="/quan-ly-khach-hang" element={<UserManager />} />
            <Route path="/quan-li-menu" element={<NavManager />} />
            <Route path="/admin" >
                <Route path="account" >
                    <Route path='register'  element={<Register />}/>
                    <Route path='login'  element={<Login />}/>
                </Route>
            </Route>
         
            <Route path="*" element={<NoMatch />} />
            
        </Routes>
    );
}

export default Router;                
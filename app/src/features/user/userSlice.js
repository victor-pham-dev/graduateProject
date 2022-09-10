import { createSlice } from "@reduxjs/toolkit";

const initState = {
    id: null,
    name: "",
    email : "",
    phone : null,
    avatar: null,
    token:null,
    fbToken:null,
    facebookId:null,
    cart: [],
    address: [],
    isLoggedIn: false,
    keepLogin: true
}
export default createSlice({
    name: "user",
    initialState: initState,
    reducers: {
        logIn: (state,action) => {
            state.id = action.payload._id;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.phone = action.payload.phone;
            state.avatar = action.payload.avatar;
            state.token = action.payload.token;
            state.facebookId = action.payload.facebookId;
            state.cart = action.payload.cart;
            state.address = action.payload.address;
            state.isLoggedIn = true;
            state.keepLogin = true
        },
        logOut: (state) => {
            state.id = "";
            state.email = "";
            state.name = "";
            state.phone = "";
            state.avatar = "";
            state.token = "";
            state.cart = [];
            state.address = [];
            state.isLoggedIn = false;
            state.keepLogin = false
        },
        tokenExpired: (state) => {
            state = initState;
        },
        updateAdds: (state,action)=>{
            state.address = action.payload;
        },
        updateCart: (state,action)=>{
            state.cart = action.payload;
        },
        updatePhone: (state,action)=>{
            state.phone = action.payload;
        },
        updateEmail: (state,action)=>{
            state.email = action.payload;
        },
        updateAvatar: (state,action)=>{
            state.avatar = action.payload;
        },
        updateFacebookId: (state,action)=>{
            state.facebookId = action.payload;
        },
        updatefbToken: (state,action)=>{
            state.fbToken = action.payload;
        }
    }
})
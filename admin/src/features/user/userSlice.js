import { createSlice } from "@reduxjs/toolkit";

const initState = {
    id: "",
    username : "",
    avatar: "",
    token:"",
    isLogIn: false,
    keepLogin: true
}
export default createSlice({
    name: "user",
    initialState: initState,
    reducers: {
        logIn: (state,action) => {
            state.id = action.payload._id;
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.isLogIn = true;
            state.keepLogin = true
        },
        logOut: (state) => {
            state.id = "";
            state.username = "";
            state.avatar = "";
            state.token = "";
            state.keepLogin = false;
            state.isLogIn = false;
        },
        tokenExpired: (state) => {
            state.id = "";
            state.email = "";
            state.asset = "";
            state.token = "";
            state.keepLogin = true;
            state.isSignIn = false;
        }
    }
})
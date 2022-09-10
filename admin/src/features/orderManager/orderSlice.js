import { createSlice } from "@reduxjs/toolkit";

const initState = {
    unconfirmed : [],
    processing : [],
}
export default createSlice({
    name: "order",
    initialState: initState,
    reducers: {
        updateUnconfirmed: (state,action)=>{
            state.unconfirmed = action.payload;
        },
        updateProcessing: (state,action)=>{
            state.processing = action.payload;
        }
    }
})
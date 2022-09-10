import { createSlice } from "@reduxjs/toolkit";

const initState = {
    items: [],
    total: 0
}
export default createSlice({
    name: 'cart',
    initialState: initState,
    reducers: {
        updateItems: (state,action)=>{
            state.items = action.payload;

        },
        updateTotal: (state,action)=>{
            state.total = action.payload;
        }
    }
})
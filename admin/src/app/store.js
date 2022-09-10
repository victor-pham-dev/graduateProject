import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import orderSlice from "../features/orderManager/orderSlice"
export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        order: orderSlice.reducer
    }
})
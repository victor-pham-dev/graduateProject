import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/user/shopingCart/cartSlice";
import userSlice from "../features/user/userSlice";
export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        cart: cartSlice.reducer
    }
})
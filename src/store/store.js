import {configureStore} from "@reduxjs/toolkit";
import productReducer from "../store/productSlice/productSlice.js";
import cartReducer from "./cart/cartSlice.js";

 const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer
    }
})
export default store;
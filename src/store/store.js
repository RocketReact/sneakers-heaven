import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./productSlice/productSlice.js";
import cartReducer from "./cart/cartSlice.js";
import { cartMiddleware } from './cart/cartSlice.js'

 const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cartMiddleware)
})
export default store;
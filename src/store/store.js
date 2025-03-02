import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./productSlice/productSlice.js";
import cartReducer from "./cart/cartSlice.js";
import { cartMiddleware } from './cart/cartSlice.js'
import filterReducer from "./searchSlice/searchSlice.js"

 const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        filter: filterReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cartMiddleware)
})
export default store;

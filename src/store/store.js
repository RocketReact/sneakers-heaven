import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./productSlice/productSlice.js";
import cartReducer from "././cartSlice/cartSlice.js";
import { cartMiddleware } from '././cartSlice/cartSlice.js'
import filterReducer from "./searchSlice/searchSlice.js"
import checkoutSlice from "./checkoutSlice/checkoutSlice.js";

 const store = configureStore({
    reducer: {
        products: productReducer,
        filter: filterReducer,
        cart: cartReducer,
        checkoutSlice: checkoutSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cartMiddleware)
})
export default store;

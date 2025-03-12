import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./productSlice/productSlice.js";
import cartReducer from "././cartSlice/cartSlice.js";
import { cartMiddleware } from '././cartSlice/cartSlice.js'
import filterReducer from "./searchSlice/searchSlice.js"
import checkoutReducer from "./checkoutReducer/checkoutReducer.js";

 const store = configureStore({
    reducer: {
        products: productReducer,
        filter: filterReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cartMiddleware)
})
export default store;

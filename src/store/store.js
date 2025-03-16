import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./productSlice/productSlice.js";
import cartReducer from "././cartSlice/cartSlice.js";
import { cartMiddleware } from '././cartSlice/cartSlice.js'
import filterReducer from "./searchSlice/searchSlice.js"
import checkoutSlice from "./checkoutSlice/checkoutSlice.js";
import paymentSlice from "./paymentSlice/paymentSlice.js";
import {loadStateCheckout, saveStateCheckout} from "./checkoutSlice/storage.js";

const persistedCheckoutState = loadStateCheckout();

 const store = configureStore({
    reducer: {
        products: productReducer,
        filter: filterReducer,
        cart: cartReducer,
        checkout: checkoutSlice,
        paymentSlice: paymentSlice,
    },
     preloadedState: {
        checkout: persistedCheckoutState || undefined,
     },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cartMiddleware)
})

store.subscribe(() => {
    saveStateCheckout(store.getState().checkout);
})
export default store;

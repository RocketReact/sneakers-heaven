import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice/productSlice.js";
import cartReducer from "././cartSlice/cartSlice.js";
import { cartMiddleware } from '././cartSlice/cartSlice.js'
import filterReducer from "./searchSlice/searchSlice.js"
import checkoutSlice from "./checkoutSlice/checkoutSlice.js";
import paymentSlice from "./paymentSlice/paymentSlice.js";
import { loadStateCheckout, saveStateCheckout } from "./checkoutSlice/storage.js";

/**
 * Loads persisted checkout state from storage
 * @description Retrieves previously saved checkout state to maintain user session
 */
const persistedCheckoutState = loadStateCheckout();

/**
 * Redux Store Configuration
 *
 * @description Centralizes application state management
 * - Combines multiple reducers for different app domains
 * - Configures custom middleware
 * - Enables state persistence for checkout process
 */
const store = configureStore({
    // Root reducers for different app features
    reducer: {
        products: productReducer,    // Manages product-related state
        filter: filterReducer,        // Handles search and filtering
        cart: cartReducer,            // Manages shopping cart state
        checkout: checkoutSlice,      // Manages checkout process
        paymentSlice: paymentSlice,   // Handles payment-related state
    },
    // Preload specific state from persistent storage
    preloadedState: {
        checkout: persistedCheckoutState || undefined,
    },
    // Extend default middleware with custom cart middleware
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cartMiddleware)
})

/**
 * Persist checkout state on every store update
 * @description Saves checkout state to storage after each state change
 */
store.subscribe(() => {
    saveStateCheckout(store.getState().checkout);
})

export default store;
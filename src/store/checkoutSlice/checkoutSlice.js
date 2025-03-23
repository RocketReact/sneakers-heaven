import { createSlice } from "@reduxjs/toolkit";

// Default shipping option for initial state
const freeShipping = "Free shipping, Arrives by Mon, Jun 17"

/**
 * Initial checkout state with default shipping options
 * Tracks multistep checkout process
 */
const initialState = {
    step: "shipping",              // Current checkout step
    shippingMethod: "ship",        // Delivery method (ship or pickup)
    deliverySpeed: freeShipping,   // Selected shipping speed
    customerData: [],              // Customer address and contact info
    isEditingDelivery: false,      // Whether delivery details are being edited
    isOpenToggleWhatInBag: false,  // Mobile UI state for cart summary
};

/**
 * Checkout slice for managing checkout flow state
 */
const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        setStep: (state, action) => { state.step = action.payload },
        setShippingMethod: (state, action) => { state.shippingMethod = action.payload },
        setDeliverySpeed: (state, action) => { state.deliverySpeed = action.payload },
        setCustomerData: (state, action) => { state.customerData = action.payload },
        toggleEditingDelivery: (state) => { state.isEditingDelivery = !state.isEditingDelivery },
        setOpenToggleWhatInBag: (state) => {state.isOpenToggleWhatInBag = !state.isOpenToggleWhatInBag},

    }
});

// Export actions and reducer
export const {
    setStep,
    setShippingMethod,
    setDeliverySpeed,
    setCustomerData,
    toggleEditingDelivery,
    setOpenToggleWhatInBag,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
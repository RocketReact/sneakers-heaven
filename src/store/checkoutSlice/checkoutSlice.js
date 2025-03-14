import { createSlice } from "@reduxjs/toolkit";

const freeShipping = "Free shipping, Arrives by Mon, Jun 17";

const initialState = {
    step: "shipping",
    shippingMethod: "ship",
    deliverySpeed: freeShipping,
    customerData: [],
    isEditing: false,
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        setStep: (state, action) => { state.step = action.payload },
        setShippingMethod: (state, action) => { state.shippingMethod = action.payload },
        setDeliverySpeed: (state, action) => { state.deliverySpeed = action.payload },
        setCustomerData: (state, action) => { state.customerData = action.payload },
        toggleEditing: (state) => { state.isEditing = !state.isEditing }
    }
});


export const {
    setStep,
    setShippingMethod,
    setDeliverySpeed,
    setCustomerData,
    toggleEditing } = checkoutSlice.actions;
export default checkoutSlice.reducer;
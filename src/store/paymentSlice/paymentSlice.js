import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    selectedPaymentMethod:null,
    isCheckedBillAddress:true,
    isTooltipVisibleCVV: false,
    cardNumber: '',
    cvvCardNumber: '',
    expiryDateCard: ''
}

const paymentSlice = createSlice ( {
    name: "checkout",
    initialState,
    reducers: {
        setSelectedPaymentMethod: (state, action) => {state.selectedPaymentMethod = action.payload },
        setCheckedBillAddress:(state) => {state.isCheckedBillAddress = !state.isCheckedBillAddress },
        setTooltipVisibleCVV: (state) => {state.isTooltipVisibleCVV = !state.isTooltipVisibleCVV },
        setCardNumber: (state, action) => {state.cardNumber = action.payload },
        setCvvCardNumber: (state, action) => {state.cvvCardNumber = action.payload },
        setExpiryDateCard: (state, action) => {state.expiryDateCard = action.payload },
    }
}
)


export const {
    setSelectedPaymentMethod,
    setCheckedBillAddress,
    setTooltipVisibleCVV,
    setCardNumber,
    setCvvCardNumber,
    setExpiryDateCard
} = paymentSlice.actions;

export default paymentSlice.reducer

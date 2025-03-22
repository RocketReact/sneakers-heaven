import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    selectedPaymentMethod:'',
    isCheckedBillAddress:true,
    isTooltipVisibleCVV: false,
    cardNumber: '',
    cvvCardNumber: '',
    expiryDateCard: '',
    billAddress: {
                  email: '',
                  firstName: '',
                  lastName: '',
                  country: '',
                  city: '',
                  postalCode: '',
                  phoneNumber: ''
},
    isEditingPayment: false,
    isPaymentFormSubmitted: false,
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
        setBillAddress: (state, action) => {state.billAddress = action.payload },
        setEditingPayment: (state) => {state.isEditingPayment = !state.payload },
        setPaymentFormSubmitted: (state) => {state.paymentFormSubmitted = !state.payload },
    }
}
)


export const {
    setSelectedPaymentMethod,
    setCheckedBillAddress,
    setTooltipVisibleCVV,
    setCardNumber,
    setCvvCardNumber,
    setExpiryDateCard,
    setBillAddress,
    setEditingPayment,
    setPaymentFormSubmitted
} = paymentSlice.actions;

export default paymentSlice.reducer

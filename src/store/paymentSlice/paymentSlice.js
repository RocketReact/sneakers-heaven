import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    selectedPaymentMethod:null,
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
    setBillAddress
} = paymentSlice.actions;

export default paymentSlice.reducer

import {createSlice} from "@reduxjs/toolkit";

/**
 * Initial state for payment processing
 * Tracks payment method, card details, and billing address
 */
const initialState = {
    selectedPaymentMethod: '',      // Current payment method (Card, PayPal, etc.)
    isCheckedBillAddress: true,     // Whether billing address matches shipping
    isTooltipVisibleCVV: false,     // CVV help tooltip visibility
    cardNumber: '',                 // Credit card number
    cvvCardNumber: '',              // Card verification value
    expiryDateCard: '',             // Card expiration date
    billAddress: {                  // Billing address fields
        email: '',
        firstName: '',
        lastName: '',
        country: '',
        city: '',
        postalCode: '',
        phoneNumber: ''
    },
    isEditingPayment: false,        // Payment editing mode
    isPaymentFormSubmitted: false,  // Form submission status
}

/**
 * Payment slice for managing payment form state
 */
const paymentSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        // Payment method selection
        setSelectedPaymentMethod: (state, action) => {state.selectedPaymentMethod = action.payload},

        // Toggle billing address same as shipping
        setCheckedBillAddress: (state) => {state.isCheckedBillAddress = !state.isCheckedBillAddress},

        // Toggle CVV help tooltip
        setTooltipVisibleCVV: (state) => {state.isTooltipVisibleCVV = !state.isTooltipVisibleCVV},

        // Card detail updates
        setCardNumber: (state, action) => {state.cardNumber = action.payload},
        setCvvCardNumber: (state, action) => {state.cvvCardNumber = action.payload},
        setExpiryDateCard: (state, action) => {state.expiryDateCard = action.payload},

        // Address and form state management
        setBillAddress: (state, action) => {state.billAddress = action.payload},
        setEditingPayment: (state, action) => {state.isEditingPayment = action.payload},
        setPaymentFormSubmitted: (state, action) => {state.isPaymentFormSubmitted = action.payload},
    }
})

// Export actions and reducer
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
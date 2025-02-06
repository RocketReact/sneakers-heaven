import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingCartItems = state.cartItems.find((product) =>
                product.id === item.id);

            if (existingCartItems) {
                existingCartItems.quantity += 1
            } else {
                state.cartItems.push ({...item, quantity:1})
            }
            state.totalQuantity += 1;
            state.totalPrice = item.price;
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            const item = state.cartItems.find((product) => product.id === id);


            if (item) {
                state.totalQuantity -= item.quantity;
                state.totalPrice -= item.price * item.quantity;
                state.cartItems = state.cartItems.filter((product) => product.id !== id);
            }
        },

        decreaseQuantity: (state, action) => {
            const id = action.payload;
            const item = state.cartItems.find((product) => product.id === id);

            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    state.totalQuantity -= 1;
                    state.totalPrice -= item.price;
                } else {
                    state.cartItems = state.cartItems.filter((product) => product.id !== id)
                    state.totalQuantity -= 1;
                    state.totalPrice -= item.price;
                }
            }
        },

        clearCart: (state, action) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        }
    }
})

export const {
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;


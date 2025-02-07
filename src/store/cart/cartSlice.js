import { createSlice } from "@reduxjs/toolkit";

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

            const items = Array.isArray(action.payload) ? action.payload : [action.payload];

            let newCartItems = [...state.cartItems]; // Создаем новый массив

            items.forEach(item => {
                const existingCartItem = newCartItems.find(product => product.id === item.id);

                if (existingCartItem) {
                    existingCartItem.quantity += 1;
                } else {
                    newCartItems.push({ ...item, quantity: 1 });
                }
            });

            state.cartItems = newCartItems;
            state.totalQuantity += items.length;
            state.totalPrice += items.reduce((sum, item) => sum + item.price, 0);

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
                    state.cartItems = state.cartItems.filter((product) => product.id !== id);
                    state.totalQuantity -= 1;
                    state.totalPrice -= item.price;
                }
            }

        },

        clearCart: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart } = cartSlice.actions;
export default cartSlice.reducer;
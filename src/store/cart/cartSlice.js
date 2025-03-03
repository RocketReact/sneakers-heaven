import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Get data cart from localStorage
const localCartFromStorage = () => {
    try {
        const savedCart = localStorage.getItem("cart");
        return savedCart
            ? JSON.parse(savedCart)
            : { cartItems: [], totalQuantity: 0, totalPrice: 0 };
    } catch (error) {
        console.error("Error downloading cart from localStorage", error);
        return { cartItems: [], totalQuantity: 0, totalPrice: 0 };
    }
};

// Middleware for saving data in localStorage
const cartMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState().cart;

    // сheck if the action is one of the actions of the basket
    if (cartSlice.actions[action.type.split("/")[1]]) {
        try {
            localStorage.setItem("cart", JSON.stringify(state));
        } catch (error) {
            console.error("Error saving cart to localStorage", error);
        }
    }
    return result;
};

// General function of counting the results (for reuse)
const calculateCartTotals = (cartItems) => {
    const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity ?? 0)), 0);

    return { totalQuantity, totalPrice };
};

// Cart slice logic
const cartSlice = createSlice({
    name: "cart",
    initialState: localCartFromStorage(),
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingCartItem = state.cartItems.find(product => product.id === item.id);

            if (existingCartItem) {
                existingCartItem.quantity += 1; // Увеличиваем количество, если товар уже в корзине
            } else {
                const newItem = { ...item, id: item.id || uuidv4(), quantity: 1 }; // Присваиваем ID, если его нет
                state.cartItems.push(newItem);
            }

            // Update the general values of the basket
            const totals = calculateCartTotals(state.cartItems);
            state.totalQuantity = totals.totalQuantity;
            state.totalPrice = totals.totalPrice;
        },

        decreaseQuantity: (state, action) => {
            const id = action.payload;
            const itemIndex = state.cartItems.findIndex(product => product.id === id);

            if (itemIndex !== -1) {
                const item = state.cartItems[itemIndex];
                if (item.quantity > 1) {
                    item.quantity -= 1; // Уменьшаем количество
                } else {
                    state.cartItems.splice(itemIndex, 1); // Удаляем товар, если количество достигло 0
                }
            }

            // Update the general values of the basket
            const totals = calculateCartTotals(state.cartItems);
            state.totalQuantity = totals.totalQuantity;
            state.totalPrice = totals.totalPrice;
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter(product => product.id !== id);

            // Update the general values of the basket
            const totals = calculateCartTotals(state.cartItems);
            state.totalQuantity = totals.totalQuantity;
            state.totalPrice = totals.totalPrice;
        },

        clearCart: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            // Additional call to update the totals for the purity of logic
            const totals = calculateCartTotals(state.cartItems);
            state.totalQuantity = totals.totalQuantity;
            state.totalPrice = totals.totalPrice;
        },
    },
});

// Export actions to reducer
export const {
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
export { cartMiddleware };
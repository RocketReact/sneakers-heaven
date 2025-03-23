import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

/**
 * Retrieve cart state from localStorage
 * Handles error cases with empty cart fallback
 */
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

/**
 * Redux middleware to persist cart state to localStorage
 * Only runs for cart-related actions
 */
const cartMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState().cart;

    // Save to localStorage only for cart actions
    if (cartSlice.actions[action.type.split("/")[1]]) {
        try {
            localStorage.setItem("cart", JSON.stringify(state));
        } catch (error) {
            console.error("Error saving cart to localStorage", error);
        }
    }
    return result;
};

/**
 * Calculate cart totals for quantity and price
 * Used across multiple reducers to maintain consistency
 */
const calculateCartTotals = (cartItems) => {
    const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity ?? 0)), 0);

    return { totalQuantity, totalPrice };
};

/**
 * Cart slice with add, decrease, remove, and clear operations
 * Maintains totalQuantity and totalPrice in sync with items
 */
const cartSlice = createSlice({
    name: "cart",
    initialState: localCartFromStorage(),
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingCartItem = state.cartItems.find(product => product.id === item.id);

            if (existingCartItem) {
                existingCartItem.quantity += 1; // Increase quantity for existing item
            } else {
                const newItem = { ...item, id: item.id || uuidv4(), quantity: 1 }; // Assign ID if none exists
                state.cartItems.push(newItem);
            }

            // Update cart totals
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
                    item.quantity -= 1; // Decrease quantity if more than 1
                } else {
                    state.cartItems.splice(itemIndex, 1); // Remove item if quantity reaches 0
                }
            }

            // Update cart totals
            const totals = calculateCartTotals(state.cartItems);
            state.totalQuantity = totals.totalQuantity;
            state.totalPrice = totals.totalPrice;
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter(product => product.id !== id);

            // Update cart totals
            const totals = calculateCartTotals(state.cartItems);
            state.totalQuantity = totals.totalQuantity;
            state.totalPrice = totals.totalPrice;
        },

        clearCart: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;

            // Recalculate totals for consistency
            const totals = calculateCartTotals(state.cartItems);
            state.totalQuantity = totals.totalQuantity;
            state.totalPrice = totals.totalPrice;
        },
    },
});

// Export individual actions and the reducer
export const {
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
export { cartMiddleware };
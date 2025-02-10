import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";


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

const cartMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState().cart;

    if (
        Object.values(cartSlice.actions)
            .map((action) => action.type)
            .includes(action.type)
    ) {
        try {
            localStorage.setItem("cart", JSON.stringify(state));
        } catch (error) {
            console.error("Error saving cart to localStorage", error);
        }
    }
    return result;
};

const updateCartTotals = (state) => {
    console.log("cartItems:", state.cartItems);

    state.totalQuantity = state.cartItems.reduce(
        (sum, item) => sum + (item.quantity ?? 0),
        0
    );

    state.totalPrice = state.cartItems.reduce(
        (sum, item) => sum + (item.price * (item.quantity ?? 0)),
        0
    );

    console.log("Updated totals:", {
        totalQuantity: state.totalQuantity,
        totalPrice: state.totalPrice,
    });
};

const cartSlice = createSlice({
    name: "cart",
    initialState: localCartFromStorage(),
    reducers: {

        addToCart: (state, action) => {
            const item = action.payload;
            const existingCartItem = state.cartItems.find(
                (product) => product.id === item.id
            );

            if (existingCartItem) {
                state.cartItems = state.cartItems.map((product) =>
                    product.id === item.id
                        ? { ...product, quantity: product.quantity + 1 }
                        : product
                );
            } else {
                // Генерируем уникальный ID, если он отсутствует
                const newItem = { ...item, id: item.id || uuidv4(), quantity: 1 };
                state.cartItems.push(newItem);
            }

            console.log("Updated cart items:", state.cartItems);

            updateCartTotals(state);
        },

        decreaseQuantity: (state, action) => {
            const id = action.payload;
            const existingCartItem = state.cartItems.find(
                (product) => product.id === id
            );

            if (existingCartItem) {
                if (existingCartItem.quantity > 1) {
                    state.cartItems = state.cartItems.map((product) =>
                        product.id === id
                            ? { ...product, quantity: product.quantity - 1 }
                            : product
                    );
                } else {
                    state.cartItems = state.cartItems.filter(
                        (product) => product.id !== id
                    );
                }

                updateCartTotals(state);
            }
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter(
                (product) => product.id !== id
            );
            updateCartTotals(state);
        },

        clearCart: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            updateCartTotals(state);
        },
    },
});

export const {
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
export { cartMiddleware };

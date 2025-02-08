import { createSlice } from "@reduxjs/toolkit";

const localCartFromStorage = () => {
    try {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : { cartItems: [], totalQuantity: 0, totalPrice: 0 };
    } catch (error) {
        console.error("Error downloading cart from localStorage", error);
        return { cartItems: [], totalQuantity: 0, totalPrice: 0 };
    }
};



const cartMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState().cart;

    if (Object.values(cartSlice.actions).map (action =>
       action.type).includes(action.type))

    {
        try {
            localStorage.setItem("cart", JSON.stringify(state));
        } catch (error) {
            console.error("Error saving cart to localStorage", error);
        }
    }
    return result;
}

const updateCartTotals = (state) => {

    state.totalQuantity = state.cartItems.reduce (
        (sum, item) => sum + item.quantity || 0, 0);
    state.totalPrice = state.cartItems.reduce ((sum, item) =>
        sum + item.price * item.quantity || 0, 0);


}


const cartSlice = createSlice({

    name: "cart",
    initialState: localCartFromStorage(),
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingCartItem = state.cartItems.find
            (product => product.id === item.id);

            if (existingCartItem) {
                existingCartItem.quantity += 1;
            } else {
                state.cartItems.push({...item, quantity: 1});
            }
            updateCartTotals(state)

        },

        decreaseQuantity: (state, action) => {
            const id = action.payload;
            const item =
                state.cartItems.find((product) =>
                product.id === id);

            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;

                } else {
                    state.cartItems = state.cartItems.filter
                    ((product) => product.id !== id);
                }
                updateCartTotals(state)
            }
        },
        removeFromCart: (state, action) => {

            const id = action.payload;
            state.cartItems = state.cartItems.filter((product) =>
                product.id !== id);
            updateCartTotals(state)

        },

        clearCart: (state) => {
            state.cartItems = [];
            updateCartTotals(state)
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
export {cartMiddleware};
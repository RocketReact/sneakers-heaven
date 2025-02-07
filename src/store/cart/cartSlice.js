import { createSlice } from "@reduxjs/toolkit";

// Загрузка корзины из localStorage
const localCartFromStorage = () => {
    try {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : { cartItems: [], totalQuantity: 0, totalPrice: 0 };
    } catch (error) {
        console.error("Error downloading cart from localStorage", error);
        return { cartItems: [], totalQuantity: 1, totalPrice: 0 };
    }
};

// Сохранение корзины в localStorage
const saveCartStorage = (state) => {
    try {
        localStorage.setItem("cart", JSON.stringify(state));
    } catch (error) {
        console.error("Error saving cart to localStorage", error);
    }
};

const initialState = localCartFromStorage();

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            let newCartItems = [...state.cartItems]; // Создаем новый массив
            const existingCartItem = newCartItems.find(product => product.id === item.id);


            if (existingCartItem) {
                existingCartItem.quantity += 1;
                state.totalQuantity += 1;
                state.totalPrice += item.price;
            } else {
                newCartItems.push({...item, quantity: 1});
                state.totalQuantity += 1;
                state.totalPrice += item.price;
            }


            // Обновляем состояние корзины
            state.cartItems = newCartItems;
            saveCartStorage(state);
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            const item = state.cartItems.find((product) => product.id === id);

            if (item) {
                state.totalQuantity -= item.quantity;
                state.totalPrice -= item.price * item.quantity;
                state.cartItems = state.cartItems.filter((product) => product.id !== id);
            }

            // Сохраняем корзину в localStorage
            saveCartStorage(state);
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

            saveCartStorage(state);
        },

        clearCart: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;

            // Очищаем localStorage
            localStorage.removeItem("cart");
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
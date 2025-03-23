import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Async thunk to fetch products from the FakeStore API
 */
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        return response.json();
    }
)

/**
 * Product slice for managing product catalog and filtering
 */
const productSlice = createSlice({
        name: 'products',
        initialState: {
            products: [],           // Product catalog array
            status: "idle",         // API fetch status: 'idle', 'loading', 'succeeded', 'failed'
            error: null,            // Error message if fetch fails
            filteredCategory: '',   // Selected category filter
        },
        reducers: {
            setCategoryFilter: (state, action) => {
                state.filteredCategory = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder
                // Handle fetch product states
                .addCase(fetchProducts.pending, (state) => {
                    state.status = "loading";
                })
                .addCase(fetchProducts.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.products = action.payload;
                })
                .addCase(fetchProducts.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message;
                })
        }
    }
)

export const {setCategoryFilter} = productSlice.actions;
export default productSlice.reducer;
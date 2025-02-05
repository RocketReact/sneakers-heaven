import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk (
    'products/fetchProducts',
    async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        return response.json();
    }
)

const productSlice = createSlice({
        name: 'products',
        initialState: {
            products: [],
            status: "idle",
            error: null,
            filteredCategory: '',
        },
        reducers: {
           setCategoryFilter: (state, action) => {
                state.filteredCategory = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder
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

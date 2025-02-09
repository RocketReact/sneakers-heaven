import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const fetchProductsSearch = createAsyncThunk (
    ('products/fetchProductsSearch'), async () => {
        const response = await
            fetch ('https://fakestoreapi.com/products');
        return await response.json ();
    }
)

const searchSlice = createSlice ({
    name: "filter",
    initialState: {
        items: [],
        searchingItems: [],
        status: "idle",
        searchQuery: "",

    },
    reducers: {
        setSearchQuery (state, action) {
            state.searchQuery = action.payload;

            state.searchingItems = state.items.filter((product) =>
                product.title.toLowerCase().includes(action.payload.toLowerCase()))
        }
    },
    extraReducers (builder) {
        builder
            .addCase(fetchProductsSearch.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProductsSearch.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
                state.searchingItems = action.payload;
            })
            .addCase(fetchProductsSearch.rejected, (state, action) => {
                state.status = "failed";
            })
    }
})

export const {setSearchQuery} = searchSlice.actions;
export default searchSlice.reducer;

























// dddd
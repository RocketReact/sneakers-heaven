import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Async thunk for fetching products from the API
 *
 * @description Creates an async action to retrieve all products
 * @returns {Promise} A promise resolving to an array of product objects
 */
export const fetchProductsSearch = createAsyncThunk(
    'products/fetchProductsSearch',
    async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        return await response.json();
    }
)

/**
 * Products Search Slice
 *
 * @description Manages the state for product searching and fetching
 * - Handles product data fetching via async thunk
 * - Provides search functionality by filtering product titles
 * - Tracks loading status of product fetch operation
 */
const searchSlice = createSlice({
    name: "search",
    initialState: {
        // Array of all fetched products
        items: [],
        // Array of products matching current search query
        searchingItems: [],
        // Status of async fetch operation
        status: "idle",
        // Current search query string
        searchQuery: "",
    },
    reducers: {
        /**
         * Updates search query and filters products
         *
         * @param {Object} state - Current slice state
         * @param {Object} action - Action with search query payload
         * @description Filters products based on case-insensitive title match
         */
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;

            state.searchingItems = state.items.filter((product) =>
                product.title.toLowerCase().includes(action.payload.toLowerCase()))
        }
    },
    extraReducers(builder) {
        builder
            // Handle pending state when fetch is in progress
            .addCase(fetchProductsSearch.pending, (state) => {
                state.status = "loading";
            })
            // Handle successful fetch, update items and reset search
            .addCase(fetchProductsSearch.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
                state.searchingItems = [];
            })
            // Handle fetch failure
            .addCase(fetchProductsSearch.rejected, (state) => {
                state.status = "failed";
            })
    }
})

// Export action creator for search query
export const { setSearchQuery } = searchSlice.actions;
// Export reducer for store configuration
export default searchSlice.reducer;
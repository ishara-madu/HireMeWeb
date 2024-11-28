import { createSlice } from "@reduxjs/toolkit";
import { fetchFavorites } from "./favoritesThunk";

const favoritesSlice = createSlice({
    name:'favorites',
    initialState: {
        data: [],
        error: null,
        loading: true
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchFavorites.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchFavorites.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchFavorites.rejected, (state, action) => {
            state.loading = true;
            state.error = action.payload;
        });
    },
})

export default favoritesSlice.reducer;
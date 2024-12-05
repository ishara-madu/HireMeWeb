import { createSlice } from "@reduxjs/toolkit";
import { fetchBasedOnRating } from "./basedOnRatingThunk";

const basedOnRatingSlice = createSlice({
    name: 'basedOnRating',
    initialState: {
        data: [],
        error: null,
        loading: true
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchBasedOnRating.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchBasedOnRating.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchBasedOnRating.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
})

export default basedOnRatingSlice.reducer;
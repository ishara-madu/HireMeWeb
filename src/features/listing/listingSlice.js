import { createSlice } from "@reduxjs/toolkit";
import { fetchListning } from "./listingThunk";

const listingSlice = createSlice({
    name: 'listings',
    initialState: {
        data: [],
        error: null,
        loading: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchListning.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchListning.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchListning.rejected, (state, action) => {
            state.loading = true;
            state.error = action.payload;
        });

    }
})
export default listingSlice.reducer;
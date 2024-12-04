import { createSlice } from "@reduxjs/toolkit";
import {  deleteListing, fetchListning, updateListing } from "./listingThunk";

const listingSlice = createSlice({
    name: 'listings',
    initialState: {
        data: [],
        upadate_data: [],
        filters: {},
        error: null,
        loading: true,
        upadate_loading: false,
        upadate_error: null,
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        clearFilters: (state) => {
            state.filters = {};
        },
        processFilters: (state) => {
            const { uid, lid } = state.filters;
            const filtered = [...state.data].filter(val => val.id === lid && val.uid === uid);
            state.data = filtered;
            state.error = null;
        },
    },
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
                state.loading = false;
                state.error = action.payload;
            })
            // Update Listing
            .addCase(updateListing.pending, (state) => {
                state.upadate_loading = true;
                state.upadate_error = null;
            })
            .addCase(updateListing.fulfilled, (state, action) => {
                state.upadate_loading = false;
                state.upadate_data = action.payload;
            })
            .addCase(updateListing.rejected, (state, action) => {
                state.upadate_loading = false;
                state.upadate_error = action.payload;
            })
            // Delete Listing
            .addCase(deleteListing.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(deleteListing.rejected, (state, action) => {
                state.error = action.payload;
            });

    }
})

export const { setFilters, clearFilters, processFilters } = listingSlice.actions;
export default listingSlice.reducer;

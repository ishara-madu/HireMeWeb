import { createSlice } from "@reduxjs/toolkit";
import { createListing, deleteListing, fetchListning, updateListing } from "./listingThunk";

const listingSlice = createSlice({
    name: 'listings',
    initialState: {
        data: [],
        filters: {},
        error: null,
        loading: true,
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
            // Create Listing
            .addCase(createListing.fulfilled, (state, action) => {
                state.listings.push(action.payload);
            })
            .addCase(createListing.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Update Listing
            .addCase(updateListing.fulfilled, (state, action) => {
                const index = state.listings.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) state.listings[index] = action.payload;
            })
            .addCase(updateListing.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Delete Listing
            .addCase(deleteListing.fulfilled, (state, action) => {
                state.listings = state.listings.filter((item) => item.id !== action.payload);
            })
            .addCase(deleteListing.rejected, (state, action) => {
                state.error = action.payload;
            });

    }
})

export const { setFilters, clearFilters, processFilters } = listingSlice.actions;
export default listingSlice.reducer;

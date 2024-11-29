import { createSlice } from "@reduxjs/toolkit";
import { fetchResult } from "./searchThunk";

const searchSlice = createSlice(
    {
        name: 'search',
        initialState: {
            filters: {},
            results: [],
            loading: false,
            error: null
        },
        reducers: {
            setFilters: (state, action) => {
                state.filters = action.payload;
            },
            clearFilters: (state) => {
                state.filters = {};
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchResult.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchResult.fulfilled, (state, action) => {
                    state.loading = false;
                    state.results = action.payload;
                })
                .addCase(fetchResult.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
        }
    }
)
export const { setFilters, clearFilters } = searchSlice.actions;
export default searchSlice.reducer;
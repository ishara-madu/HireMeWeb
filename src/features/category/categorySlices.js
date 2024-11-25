import { createSlice } from "@reduxjs/toolkit";
import { categoryData } from "./categoryThunk";

const categorySlice = createSlice(
    {
        name: 'category',
        initialState: {
            items: [],
            error: null,
        },
        reducers: {},
        extraReducers: async(builder) => {
            builder
                .addCase(categoryData.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(categoryData.fulfilled, (state, action) => {
                    state.loading = false;
                    state.items = action.payload;
                })
                .addCase(categoryData.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                });
        },
    }
)
export default categorySlice.reducer;

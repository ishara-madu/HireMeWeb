import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile } from "./profileThunk";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        data: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})

export default profileSlice.reducer;
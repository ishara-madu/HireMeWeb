import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile, updateProfile, updateProfileWithImage } from "./profileThunk";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        data: [],
        error: null,
        loading: false,
        image_update_loading: false,
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
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfileWithImage.pending, (state) => {
                state.image_update_loading = true;
                state.loading = false;
                state.error = null;
            })
            .addCase(updateProfileWithImage.fulfilled, (state) => {
                state.image_update_loading = false;
                state.error = null;
            })
    },
})

export default profileSlice.reducer;
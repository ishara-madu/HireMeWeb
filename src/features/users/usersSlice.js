import { createSlice } from "@reduxjs/toolkit";
import { userData } from "./usersThunk";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(userData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})
export default usersSlice.reducer;

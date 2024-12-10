import { createSlice } from "@reduxjs/toolkit";
import { fetchOnlineStatue, updateOnlineStatue } from "./onlineStatueThunk";

const onlineStatueSlice = createSlice({
    name: 'onlineStatue',
    initialState: {
        data: null,
        error: null,
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchOnlineStatue.pending,(statue)=>{
            statue.loading = true;
            statue.error = null;
        })
        .addCase(fetchOnlineStatue.fulfilled,(statue,action)=>{
            statue.loading = false;
            statue.data = action.payload;
        })
        .addCase(fetchOnlineStatue.rejected,(statue,action)=>{
            statue.loading = false;
            statue.error = action.payload;
        })
        .addCase(updateOnlineStatue.pending,(statue)=>{
            statue.loading = true;
            statue.error = null;
        })
        .addCase(updateOnlineStatue.fulfilled,(statue)=>{
            statue.loading = false;
            statue.error = null;
        })
    }
})
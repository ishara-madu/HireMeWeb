import { createSlice } from "@reduxjs/toolkit";
import { languagesData } from "./languagesThunk";

const languagesSlice = createSlice({
    name: 'languages',
    initialState:{
        data: [],
        error: null,
        loading: true
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(languagesData.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(languagesData.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        })
        .addCase(languagesData.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default languagesSlice.reducer;
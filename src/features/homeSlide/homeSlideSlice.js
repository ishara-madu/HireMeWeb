import { createSlice } from "@reduxjs/toolkit";

const homeSlideSlice = createSlice(
    {
        name: 'homeSlide',
        initialState: {
            images: [],
            error: null,
        },
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase('home/fetchSlides/pending', (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase('home/fetchSlides/fulfilled', (state, action) => {
                    state.loading = false;
                    state.images = action.payload;
                })
                .addCase('home/fetchSlides/rejected', (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                });
        },
    }
)
export default homeSlideSlice.reducer;
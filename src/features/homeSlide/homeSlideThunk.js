import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

export const homeSlideData = createAsyncThunk(
    'home/fetchSlides',
    async (_, thunkAPI) => {
        try {
            let { data, error } = await supabase.from('homeSlide').select('*');
            if(error) throw error;
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
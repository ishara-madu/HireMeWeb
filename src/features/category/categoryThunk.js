import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

export const categoryData = createAsyncThunk(
    'category/fetchData',
    async (_, thunkAPI) => {
        try {
            const { data, error } = await supabase.from('categories').select('*');
            if (error) throw error;            
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
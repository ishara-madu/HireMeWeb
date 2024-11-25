import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

export const userData = createAsyncThunk(
    'users/fetchData',
    async (_, thunkAPI) => {
        try {
            const { data, error } = await supabase.from('users').select('*');
            if (error) throw error;
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
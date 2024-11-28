import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

export const fetchFavorites = createAsyncThunk(
    'fetchFavorites',
    async (inputIds, thunkAPI) => {
        try {
            const { data, error } = await supabase
                .from('listings')
                .select('*, users(*)')
                .in('id', inputIds);
            if (error) throw error;
            const orderedData = inputIds
                .slice() // Create a shallow copy to avoid mutating the original array
                .reverse() 
                .map(id => data.find(item => item.id === id));
            return orderedData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
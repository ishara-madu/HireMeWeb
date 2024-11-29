import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

export const fetchResult = createAsyncThunk(
    'fetchResult',
    async (filters, thunkAPI) => {
        try {
            let query = supabase.from('listings').select('*');

            if (filters.searchResult) {
                query = query.or(
                    `title.ilike.%${filters.query}%,description.ilike.%${filters.searchResult}%`
                );
            }
            if (filters.location) {
                query = query.ilike('users(locationName)', `%${filters.location}%`);
            }
            const { data, error } = await query;
            if (error) throw error;
            console.log(data);
            
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
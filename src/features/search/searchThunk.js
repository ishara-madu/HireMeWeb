import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

export const fetchResult = createAsyncThunk(
    'fetchResult',
    async (filters, thunkAPI) => {
        try {
            let query = supabase.from('listings').select('*,users(*)');

            if (filters.searchResult) {
                query = query.or(
                    // `description ->> long.ilike.%${filters.searchResult}%,description ->> short.ilike.%${filters.searchResult}%,description ->> keypoints.ilike.%${filters.searchResult}%,title.ilike.%${filters.searchResult}%,image.ilike.%${filters.searchResult}%,tags ->> tagList.ilike.%${filters.searchResult}%`
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
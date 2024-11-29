import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

export const fetchResult = createAsyncThunk(
    'fetchResult',
    async (filters, thunkAPI) => {
        try {
            let query = supabase.from('listings').select('*,users!inner(*)');

            if (filters.searchResult) {
                query = query.or(
                    `description ->> long.ilike.%${filters.searchResult}%,description ->> short.ilike.%${filters.searchResult}%,description ->> keypoints.ilike.%${filters.searchResult}%,title.ilike.%${filters.searchResult}%,image.ilike.%${filters.searchResult}%,tags ->> tagList.ilike.%${filters.searchResult}%`
                );
            }
            if (filters.location) {
                query = query.ilike('users.locationName', `%${filters.location}%`);
            }
            
            let {data} = await query;


            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
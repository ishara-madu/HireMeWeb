import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

export const fetchResult = createAsyncThunk(
    'fetchResult',
    async (filters, thunkAPI) => {
        try {
            let query = supabase.from('listings').select('*,users!inner(*)');

            if (filters.searchResult) {
                query = query.or(
                    `description ->> long.ilike.%${filters.searchResult}%,description ->> short.ilike.%${filters.searchResult}%,description ->> keypoints.ilike.%${filters.searchResult}%,title.ilike.%${filters.searchResult}%,tags ->> tagList.ilike.%${filters.searchResult}%,category.ilike.%${filters.searchResult}%,options ->> availability.ilike.%${filters.searchResult}%,options ->> experienceLevel.ilike.%${filters.searchResult}%`
                );
            }
            if (filters.rating) {
                query = query.gt('rating->>perc', filters.rating);
            }
            if (filters.language) {
                query = query.eq('users.languages', filters.language);
            }
            let { data } = await query;


            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
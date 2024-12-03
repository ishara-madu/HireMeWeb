import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

export const fetchListning = createAsyncThunk(
    'fetchListning',
    async(filters,thunkAPI)=>{
        try {
            let query = supabase.from('listings').select('*,users!inner(*)');
            if (filters.id) {
                query = query.eq('id', filters.id);
            }
            if (filters.userId) {
                query = query.eq('uid', filters.userId);
            }
            let { data,error } = await query;
            if(error) throw error;
            
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error); 
        }
    }
)
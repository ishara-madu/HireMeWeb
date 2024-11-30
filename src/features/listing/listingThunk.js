import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

export const fetchListning = createAsyncThunk(
    'fetchListning',
    async(input,thunkAPI)=>{
        try {
            let query = supabase.from('listings').select('*,users!inner(*)');
            if (input.id) {
                query = query.eq('id', input.id);
            }
            let { data,error } = await query;
            if(error) throw error;
            
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error); 
        }
    }
)
import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

export const languagesData = createAsyncThunk(
    'languages/FetchLanguages',
    async(_,thunkAPI)=>{
        try {
            const {data,error} = await supabase.from('languages').select('*');
            if(error) throw error;
            return data;
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }

    }
)
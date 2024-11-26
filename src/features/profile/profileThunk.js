import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";
import getCookie from '../../util/getCookie';

export const fetchProfile = createAsyncThunk(
    'users/fetchProfile',
    async (_, thunkAPI) => {
        try {
            const { data, error } = await supabase.from('users').select('*').eq('id',getCookie('uid'));
            if (error) throw error;     
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }

)
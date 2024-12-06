import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";
import getCookie from '../../util/getCookie';

export const fetchProfile = createAsyncThunk(
    'users/fetchProfile',
    async (_, thunkAPI) => {
        try {
            const { data, error } = await supabase.from('users').select('*').eq('id', getCookie('uid'));
            if (error) throw error;
            sessionStorage.setItem('history',JSON.stringify(data?.[0]?.searchHistory?.history || []))
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }

)
export const updateProfile = createAsyncThunk(
    'users/updateProfile',
    async (updates, thunkAPI) => {
        try {
            const { data, error } = await supabase
                .from('users')
                .update({ ...updates })
                .eq('id', getCookie('uid'));
            if (error) throw error;
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }

)
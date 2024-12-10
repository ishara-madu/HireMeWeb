import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

export const updateOnlineStatue = createAsyncThunk(
    'updateOnlineStatue',
    async ({ id, updates }, thunkAPI) => {        
        try {

            const { data, error } = await supabase
                .from('users')
                .update({ ...updates })
                .eq('id', id)
                .select()

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)



import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";
import getCookie from '../../util/getCookie';
import { v4 } from "uuid";

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
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }

)

export const updateProfileWithImage = createAsyncThunk(
    "users/updateWithImage",
    async ({ oldImagePath, newImageFile }, thunkAPI) => {
        const newpath = `${getCookie('uid')}${v4()}`
        try {
            if (oldImagePath && oldImagePath !== 0) {
                
                const { error: deleteError } = await supabase.storage
                    .from('profile_bucket')
                    .remove([oldImagePath]);

                if (deleteError) throw deleteError;
            }

            if (newImageFile ) {
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('profile_bucket')
                    .upload(`images/${newpath}`, newImageFile);

                sessionStorage.setItem('old_profile_image', `images/${newpath}`)

                if (uploadError) throw uploadError;
                const { data: publicURL, error: urlError } = supabase.storage.from('profile_bucket').getPublicUrl(uploadData.path);

                if (urlError) throw urlError;



                await supabase
                    .from("users")
                    .update({ image: { ...publicURL, oldImage: `images/${newpath}` } })
                    .eq("id", getCookie('uid'))

                return { publicURL };

            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
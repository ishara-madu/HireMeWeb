import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";
import { v4 } from "uuid";

export const fetchListning = createAsyncThunk(
    'fetchListning',
    async (filters, thunkAPI) => {
        try {
            let query = supabase.from('listings').select('*,users!inner(*)');
            if (filters.id) {
                query = query.eq('id', filters.id);
            }
            if (filters.userId) {
                query = query.eq('uid', filters.userId);
            }
            if (filters?.uid || filters?.lid) {
                if (!filters?.lid && filters?.uid) {
                    const tempid = v4();
                    sessionStorage.setItem('listingFilter', tempid);
                    await supabase.from("listings").insert([{ id: tempid, uid: filters.uid }]);
                    query = query.eq('uid', filters.uid).eq('id', tempid);
                } else {
                    query = query.eq('uid', filters.uid).eq('id', filters.lid);
                }
            }

            let { data, error } = await query;
            if (error) throw error;

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const updateListing = createAsyncThunk(
    "listings/update",
    async ({ id, updates }, thunkAPI) => {
        try {
            // eslint-disable-next-line no-unused-vars
            const { data, error } = await supabase
                .from("listings")
                .update({ ...updates, updated_at: new Date() })
                .eq("id", id.lid)
                .eq("uid", id.uid);
            if (error) throw error;
            const { data: now } = await supabase.from('listings').select('*,users!inner(*)').eq('id', id.lid).eq("uid", id.uid);
            return now;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateListingWithImage = createAsyncThunk(
    "listings/updateWithImage",
    async ({ id, oldImagePath, newImageFile }, thunkAPI) => {
        const path = `${v4()}${newImageFile.name}`;
        try {
            if (oldImagePath) {
                const { error: deleteError } = await supabase.storage
                    .from('listings_bucket') 
                    .remove([oldImagePath]);

                if (deleteError) throw deleteError;
            }

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('listings_bucket') 
                .upload(`images/${path}`, newImageFile);

                sessionStorage.setItem('old_image',`images/${path}`)

                
            if (uploadError) throw uploadError;
            const { data:publicURL, error: urlError } = supabase.storage.from('listings_bucket').getPublicUrl(uploadData.path);

            if (urlError) throw urlError;

            
            
            await supabase
                .from("listings")
                .update({ image:{...publicURL,oldImage:`images/${path}`}, updated_at: new Date() })
                .eq("id", id.lid)
                .eq("uid", id.uid);
                
            return { id, publicURL };

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteListing = createAsyncThunk(
    "listings/delete",
    async (id, thunkAPI) => {
        try {
            const { data, error } = await supabase.from("listings").delete().eq("id", id);
            if (error) throw error;

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
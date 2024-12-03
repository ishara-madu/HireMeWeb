import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

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
            if (filters.uid && filters.lid) {
                query = query
                    .eq('uid', filters.uid || null)
                    .eq('id', filters.lid || null);
            } else if (filters.uid || filters.lid) {
                ''
            }
            let { data, error } = await query;
            if (error) throw error;

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)
// Create Listing
export const createListing = createAsyncThunk(
    "listings/create",
    async (newListing, thunkAPI) => {
        try {
            const { data, error } = await supabase
                .from("listings")
                .insert([newListing]);
            if (error) throw error;

            return data[0]; // Assuming only one listing is created
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Update Listing
export const updateListing = createAsyncThunk(
    "listings/update",
    async ({ id, updates }, thunkAPI) => {
        try {
            const { data, error } = await supabase
                .from("listings")
                .update(updates)
                .eq("id", id);
            if (error) throw error;

            return data[0]; // Assuming only one listing is updated
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Delete Listing
export const deleteListing = createAsyncThunk(
    "listings/delete",
    async (id, thunkAPI) => {
        try {
            const { data, error } = await supabase
                .from("listings")
                .delete()
                .eq("id", id);
            if (error) throw error;

            return id; // Return the ID of the deleted listing for reference
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
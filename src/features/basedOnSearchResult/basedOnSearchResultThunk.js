import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";


export const fetchBasedOnSearchResult = createAsyncThunk(
    'users/basedOnSearchResult',
    async (_,thunkAPI) => {
        
        try {

            const {data:allListings} = await supabase
                .from('listings')
                .select('*,users(*)')
                .eq('submission', true);

            const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            const allVal = allListings.map(val => val.id);
            const updatedFav = favorites.filter(item => allVal.includes(item));
            localStorage.setItem("favorites", JSON.stringify(updatedFav))
                        
            return allListings;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

const history = JSON.parse(sessionStorage.getItem("history")) || [""];

export const fetchBasedOnRating = createAsyncThunk(
    'users/basedOnRating',
    async (_, thunkAPI) => {
        try {
            const { data:matchData, error } = await supabase
                .from('listings')
                .select('*,users(*)')
                .or(
                    history.map(val => `description ->> long.ilike.%${val}%,description ->> short.ilike.%${val}%,description ->> keypoints.ilike.%${val}%,title.ilike.%${val}%,image.ilike.%${val}%,tags ->> tagList.ilike.%${val}%`)
                )
                .order('rating->>perc',{ ascending: false })       
                if(error) throw error;  
                const allListings = await supabase.from('listings').select('*,users(*)');
                const notSortedData = allListings.data.filter(row => !matchData.some(match => match.id === row.id));
                const unmatchData = notSortedData.sort((a, b) => b.rating.perc - a.rating.perc);
                const allData = [...matchData,...unmatchData];
            return allData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

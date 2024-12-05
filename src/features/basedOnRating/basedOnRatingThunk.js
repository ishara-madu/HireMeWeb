import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

const history = JSON.parse(sessionStorage.getItem("history")) || [""];
console.log(history);

export const fetchBasedOnRating = createAsyncThunk(
    'users/basedOnRating',
    async (_, thunkAPI) => {
        try {
            const query = supabase.from('listings')
                .select('*,users(*)')
                .eq('submission', true)
                .or(
                    history?.map(val => `description ->> long.ilike.%${val}%,description ->> short.ilike.%${val}%,description ->> keypoints.ilike.%${val}%,title.ilike.%${val}%,tags ->> tagList.ilike.%${val}%`)
                )
                .order('rating->>perc', { ascending: false })
            const { data: matchData, error } = await query;

            if (error) throw error;

            const allListings = await supabase
                .from('listings')
                .select('*,users(*)')
                .eq('submission', true);

            const notSortedData = allListings?.data.filter(row => !matchData?.some(match => match?.id === row?.id));
            const unmatchData = notSortedData?.sort((a, b) => b.rating?.perc - a.rating?.perc);
            const allData = [...matchData, ...unmatchData];
            return allData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

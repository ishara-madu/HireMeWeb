import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

const history = JSON.parse(sessionStorage.getItem('history')) || [""];

export const fetchBasedOnRating = createAsyncThunk(
    'users/basedOnRating', 
    async (_, thunkAPI) => {
        try {
            const { data: matchedUsers, error: matchedError } = await supabase
                .from('users')
                .select('*')
                .or(
                    history.map(item => `listings->>title.ilike.%${item}%`).join(',') + ',' +
                    history.map(item => `listings->>images.ilike.%${item}%`).join(',') + ',' +
                    history.map(item => `listings->>description.ilike.%${item}%`).join(',')
                )
                .order('rating->>perc', { ascending: false });
            if (matchedError) throw matchedError;
            const matchedUserIds = matchedUsers.map(user => user.id);
            const { data: unmatchedUsers, error: unmatchedError } = await supabase
                .from('users')
                .select('*')
                .not('listings->>title', 'ilike', history.join('|')) 
                .not('listings->>images', 'ilike', history.join('|')) 
                .not('listings->>description', 'ilike', history.join('|')) 
                .order('rating->>perc', { ascending: false });  
            if (unmatchedError) throw unmatchedError;
            const uniqueUnmatchedUsers = unmatchedUsers.filter(user => !matchedUserIds.includes(user.id));
            const allUsers = [...matchedUsers, ...uniqueUnmatchedUsers];
            return allUsers;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

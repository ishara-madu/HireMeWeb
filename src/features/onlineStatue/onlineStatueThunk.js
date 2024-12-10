import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

export const fetchOnlineStatue = createAsyncThunk(
    'fetchOnlineStatue',
    async (id,thunkAPI) => {
        try {

            const { data, error } = await supabase
                .from('users')
                .select('last_seen')
                .eq('id',id)
                const timeAgo = (lastSeen) => {
                    if (!lastSeen) return "Never";
                    const lastSeenDate = new Date(lastSeen);
                    const now = new Date();
                    const diffMs = now - lastSeenDate;
            
                    const seconds = Math.floor(diffMs / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours = Math.floor(minutes / 60);
                    const days = Math.floor(hours / 24);
            
                    if (days > 0) return `${days} day(s) ago`;
                    if (hours > 0) return `${hours} hour(s) ago`;
                    if (minutes > 0) return `${minutes} minute(s) ago`;
                    return `${seconds} second(s) ago`;
                };        
                console.log(timeAgo(data[0].last_seen));
                        
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
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


// const channels = supabase.channel('custom-all-channel')
//     .on(
//         'postgres_changes',
//         { event: '*', schema: 'public', table: 'users',filter: "online=eq.true" },
//         (payload) => {
//             fetchOnlineStatue()
//         }
//     )
//     .subscribe()
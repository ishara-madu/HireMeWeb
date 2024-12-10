import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";

// export const fetchOnlineStatue = createAsyncThunk(
//     'fetchOnlineStatue',
//     async (_,thunkAPI) => {
//         try {

//             const { data, error } = await supabase
//                 .from('users')
//                 .select('online,lastSeen')
//             return data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// )
export const updateOnlineStatue = createAsyncThunk(
    'updateOnlineStatue',
    async ( id, thunkAPI) => {
        console.log(id);
        
        try {

            const { data, error } = await supabase
                .from('users')
                .update({
                    last_seen: new Date().toISOString(),
                })
                .eq("id", id);

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
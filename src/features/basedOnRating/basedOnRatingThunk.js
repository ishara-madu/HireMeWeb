import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../config/supabaseClient";
import getCookie from "../../util/getCookie";
import { getDistance } from 'geolib';

const history = JSON.parse(sessionStorage.getItem("history")) || [""];

export const fetchBasedOnRating = createAsyncThunk(
    'users/basedOnRating',
    async (_, thunkAPI) => {
        
        try {
            const { data: userLocation } = await supabase.from('users').select('latitude,longitude').eq('id', getCookie('uid'));

            let query = supabase.from('listings')
                .select('*,users(*)')
                .eq('submission', true)
                .order('rating->>perc', { ascending: false })

            if (history) {
                query = query
                    .or(
                        history?.map(val => `description ->> long.ilike.%${val}%,description ->> short.ilike.%${val}%,description ->> keypoints.ilike.%${val}%,title.ilike.%${val}%,tags ->> tagList.ilike.%${val}%`)
                    )
            }
            const { data: matchData, error } = await query;

            if (error) throw error;

            const allListings = await supabase
                .from('listings')
                .select('*,users(*)')
                .eq('submission', true);

            const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            const allVal = allListings.data.map(val => val.id);
            const updatedFav = favorites.filter(item => allVal.includes(item));
            localStorage.setItem("favorites", JSON.stringify(updatedFav))

            const notSortedData = allListings?.data.filter(row => !matchData?.some(match => match?.id === row?.id));
            const unmatchData = notSortedData?.sort((a, b) => b.rating?.perc - a.rating?.perc);
            const allData = [...matchData, ...unmatchData];

            const usersWithDistance = allData?.map((user) => ({
                ...user,
                distance: getDistance(
                    { latitude: userLocation?.[0].latitude, longitude: userLocation?.[0].longitude },
                    { latitude: user.latitude, longitude: user.longitude }
                ),
            }));
            const sortedUsers = usersWithDistance.sort((a, b) => a.distance - b.distance);
            return sortedUsers;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

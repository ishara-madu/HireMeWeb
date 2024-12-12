import { createSlice } from "@reduxjs/toolkit";
import { fetchBasedOnSearchResult } from "./basedOnSearchResultThunk";
import { getDistance } from "geolib";

const basedOnSearchResultSlice = createSlice({
    name: 'basedOnSearchResult',
    initialState: {
        data: [],
        error: null,
        loading: true
    },
    reducers: {
        filterLocation: (state, action) => {
            const userLocation = action.payload;

            const usersWithDistance = [...state.results]?.map((list) => {

                return {
                    ...list,
                    distance: getDistance(
                        { latitude: userLocation.lat, longitude: userLocation.lng },
                        { latitude: list.users.latitude, longitude: list.users.longitude }
                    ),
                };
            });

            const filteredLocation = usersWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
            state.results = filteredLocation;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBasedOnSearchResult.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBasedOnSearchResult.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchBasedOnSearchResult.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})

export default basedOnSearchResultSlice.reducer;
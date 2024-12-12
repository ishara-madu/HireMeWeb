import { createSlice } from "@reduxjs/toolkit";
import { fetchBasedOnSearchResult } from "./basedOnSearchResultThunk";
import { getDistance } from "geolib";

const basedOnSearchResultSlice = createSlice({
    name: 'basedOnSearchResult',
    initialState: {
        data: [],
        filters: {},
        error: null,
        loading: true
    },
    reducers: {
        filterLocation: (state, action) => {
            const userLocation = action.payload;
            const val = userLocation.word;
            const lowerVal = val?.toLowerCase();


let filteredData = [];

state.data?.forEach(item => {
    if (
        (item.title?.toLowerCase().indexOf(lowerVal) !== -1) ||
        (item.description?.long?.toLowerCase().indexOf(lowerVal) !== -1) ||
        (item.description?.short?.toLowerCase().indexOf(lowerVal) !== -1) ||
        item.description?.keypoints?.some(point => point.toLowerCase().indexOf(lowerVal) !== -1) || // Handles arrays
        item.tags?.tagList?.some(tag => tag.toLowerCase().indexOf(lowerVal) !== -1) || // Handles arrays
        (item.category?.toLowerCase().indexOf(lowerVal) !== -1) ||
        (item.options?.availability?.toLowerCase().indexOf(lowerVal) !== -1) ||
        (item.options?.experienceLevel?.toLowerCase().indexOf(lowerVal) !== -1)
    ) {
        filteredData.push(item); // Push the item to the filteredData array if it matches
    }
});

            
            const usersWithDistance = [...filteredData]?.map((list) => {

                return {
                    ...list,
                    distance: getDistance(
                        { latitude: userLocation?.lat, longitude: userLocation?.lng },
                        { latitude: list.users.latitude, longitude: list.users.longitude }
                    ),
                };
            });

            const filteredLocation = usersWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));

            state.filters ={...state.filters,[userLocation.key]:[filteredLocation]};
            console.log(val);
            
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

export const { filterLocation } = basedOnSearchResultSlice.actions;
export default basedOnSearchResultSlice.reducer;
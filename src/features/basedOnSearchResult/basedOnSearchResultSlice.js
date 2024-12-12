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

            const searchConditions = [
                item => item.title?.toLowerCase().includes(lowerVal),
                item => item.description?.long?.toLowerCase().includes(lowerVal),
                item => item.description?.short?.toLowerCase().includes(lowerVal),
                item => item.description?.keypoints?.some(point => point.toLowerCase().includes(lowerVal)),
                item => item.tags?.tagList?.some(tag => tag.toLowerCase().includes(lowerVal)),
                item => item.category?.toLowerCase().includes(lowerVal),
                item => item.options?.availability?.toLowerCase().includes(lowerVal),
                item => item.options?.experienceLevel?.toLowerCase().includes(lowerVal)
            ];
            
            const filteredData = state.data.filter(item => 
                searchConditions.some(condition => condition(item))
            );
            
            
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
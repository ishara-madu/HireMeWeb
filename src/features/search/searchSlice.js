import { createSlice } from "@reduxjs/toolkit";
import { fetchResult } from "./searchThunk";
import { getDistance } from 'geolib';

const searchSlice = createSlice(
    {
        name: 'search',
        initialState: {
            filters: {},
            results: [],
            unsorted: [],
            loading: false,
            error: null
        },
        reducers: {
            setFilters: (state, action) => {
                state.filters = action.payload;
            },
            sortReviewed: (state) => {
                const sortedReviewed = [...state.results].sort((a, b) => {
                    const sumA = a.users.rating.rating.reduce(
                        (accumulator, currentValue) => accumulator + currentValue,
                        0
                    );
                    const sumB = b.users.rating.rating.reduce(
                        (accumulator, currentValue) => accumulator + currentValue,
                        0
                    );
                    return sumB - sumA;
                });
                state.results = sortedReviewed;
            },
            sortRated: (state) => {
                const sortedRated = [...state.results].sort((a, b) => {
                    return b.users.rating.perc - a.users.rating.perc;
                });
                state.results = sortedRated;
            },
            sortNewest: (state) => {
                const sortedNewest = [...state.results].sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at);
                });
                state.results = sortedNewest;
            },
            clearSorting: (state) => {
                state.results = [...state.unsorted];
            },
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
                .addCase(fetchResult.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchResult.fulfilled, (state, action) => {
                    state.loading = false;
                    state.results = action.payload;
                    state.unsorted = action.payload;
                })
                .addCase(fetchResult.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
        }
    }
)
export const { sortReviewed, sortRated, sortNewest, clearSorting, filterLocation,filterRatings,setFilters } = searchSlice.actions;
export default searchSlice.reducer;
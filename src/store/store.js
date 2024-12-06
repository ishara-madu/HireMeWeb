import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice'; // Import the data slice reducer
import categoryReducer from '../features/category/categorySlices';
import profileReducer from '../features/profile/profileSlice';
import homeSliderReducer from '../features/homeSlide/homeSlideSlice';
import basedOnRatingReducer from '../features/basedOnRating/basedOnRatingSlice'
import favoritesReducer from '../features/favorites/favoritesSlice'
import searchReducer from '../features/search/searchSlice'
import listingReducer from '../features/listing/listingSlice'
import languagesReducer from '../features/languages/languagesSlice'

export const store = configureStore({
    reducer: {
        users: usersReducer,
        category:categoryReducer,
        homeSlider: homeSliderReducer,
        profile:profileReducer,
        basedOnRating:basedOnRatingReducer,
        favorites: favoritesReducer,
        search:searchReducer,
        listings:listingReducer,
        languages:languagesReducer

    },
});

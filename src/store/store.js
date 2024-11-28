import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice'; // Import the data slice reducer
import categoryReducer from '../features/category/categorySlices';
import profileReducer from '../features/profile/profileSlice';
import homeSliderReducer from '../features/homeSlide/homeSlideSlice';
import basedOnRatingReducer from '../features/basedOnRating/basedOnRatingSlice'
import favoritesReducer from '../features/favorites/favoritesSlice'
export const store = configureStore({
    reducer: {
        users: usersReducer,
        category:categoryReducer,
        homeSlider: homeSliderReducer,
        profile:profileReducer,
        basedOnRating:basedOnRatingReducer,
        favorites: favoritesReducer
    },
});

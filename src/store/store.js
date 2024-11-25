import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice'; // Import the data slice reducer
import categoryReducer from '../features/category/categorySlices';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        category:categoryReducer,
    },
});

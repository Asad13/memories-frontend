import { configureStore } from "@reduxjs/toolkit";
import posts from './features/posts/postsSlice';
import auth from './features/auth/authSlice';

const store = configureStore({
    reducer: {
        posts,
        auth,
    }
});

export default store;
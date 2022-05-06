import { configureStore } from "@reduxjs/toolkit";
import posts from './features/posts/postsSlice';

const store = configureStore({
    reducer: {
        posts,
    }
});

export default store;
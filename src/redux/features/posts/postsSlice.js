import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import * as api from '../../../api/posts';

export const getAllPosts = createAsyncThunk(
    'posts/getAllPosts',
    async () => {
        const response = await api.fetchPosts();
        return response.data;
    }
);

export const updateLikeCount = createAsyncThunk(
    'posts/updateLikeCount',
    async (id) => {
        const response = await api.updateLike(id);
        return response.data;
    }
)

export const deletePost = createAsyncThunk(
    'posts/updateLikeCount',
    async (id) => {
        const response = await api.deletePost(id);
        return response.data;
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        isLoading: true,
        posts: [],
        selectedPost: {
            _id: null,
            author: "",
            title: "",
            message: "",
            tags: "",
            selectedFile: "",
        },
    },
    reducers:{
        addPost: (state,action) => {
            state.posts.unshift(action.payload);
        },
        selectPost: (state,action) => {
            state.selectedPost = action.payload;
        },
        changePost: (state,action) => {
            const index = state.posts.findIndex(post => post._id === action.payload._id);
            state.posts.splice(index,1,action.payload);
        }
    },
    extraReducers: {
        [getAllPosts.pending]: (state,action) => {
            state.isLoading = true;
        },
        [getAllPosts.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.posts = action.payload;
        },
        [getAllPosts.rejected]: (state,action) => {
            state.isLoading = false;
        },
        [updateLikeCount.fulfilled]: (state,action) => {
            const index = state.posts.findIndex(post => post._id === action.payload._id);
            state.posts[index].likeCount = action.payload.likeCount;
        },
        [deletePost.fulfilled]: (state,action) => {
            const newPosts = state.posts.filter(post => post._id !== action.payload._id);
            state.posts = newPosts;
        },
    }
})

const {actions,reducer} = postsSlice;

export const {addPost,selectPost,changePost} = actions;

export default reducer;
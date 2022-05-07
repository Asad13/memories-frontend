import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import * as api from '../../../api/posts';

export const getAllPosts = createAsyncThunk(
    'posts/getAllPosts',
    async (page) => {
        const response = await api.fetchPosts(page);
        return response.data;
    }
);


export const getPost = createAsyncThunk(
    'posts/getPost',
    async (id) => {
        const response = await api.fetchPost(id);
        return response.data;
    }
);

export const updateLikeCount = createAsyncThunk(
    'posts/updateLikeCount',
    async (id,thunkAPI) => {
        const response = await api.updateLike(id,{
            headers: {
                "Authorization": `Bearer ${thunkAPI.getState().auth.token}`,
            }
        });
        return response.data;
    }
)

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (id,thunkAPI) => {
        const response = await api.deletePost(id,{
            headers: {
                "Authorization": `Bearer ${thunkAPI.getState().auth.token}`,
            }
        });
        return response.data;
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        isLoading: true,
        currentPage: 1,
        totalNumberOfPages: 1,
        posts: [],
        post: null,
        isPostLoading: true,
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
            state.posts = action.payload.data;
            state.currentPage = action.payload.currentPage;
            state.totalNumberOfPages = action.payload.totalNumberOfPages;
        },
        [getAllPosts.rejected]: (state,action) => {
            state.isLoading = false;
        },
        
        [getPost.pending]: (state,action) => {
            state.isPostLoading = true;
        },
        [getPost.fulfilled]: (state,action) => {
            state.isPostLoading = false;
            state.post = action.payload;
        },
        [getPost.rejected]: (state,action) => {
            state.isPostLoading = false;
        },
        [updateLikeCount.fulfilled]: (state,action) => {
            const index = state.posts.findIndex(post => post._id === action.payload._id);
            state.posts[index].likes = action.payload.likes;
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
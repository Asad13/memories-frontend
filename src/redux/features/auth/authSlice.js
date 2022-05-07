import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import * as api from '../../../api/auth';
import jwtDecode from 'jwt-decode';

export const signInUser = createAsyncThunk(
    'auth/signInUser',
    async (body) => {
        const response = await api.signInUser(body);
        return response.data;
    }
);

export const signUpUser = createAsyncThunk(
    'auth/signUpUser',
    async (body) => {
        const response = await api.signUpUser(body);
        return response.data;
    }
);

const saveUserData = userData => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
    const decoded = jwtDecode(userData.token);
    const expirationTime = new Date(decoded.exp * 1000);
    localStorage.setItem('expirationTime', expirationTime);
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        errorMsg: '',
        user: null,
        token: null,
    },
    reducers:{
        logout: (state,action) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('expirationTime');

            state.user = null;
            state.token = null;
        },
        saveUser: (state,action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        }
    },
    extraReducers: {
        [signInUser.fulfilled]: (state,action) => {
            saveUserData(action.payload);
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        [signUpUser.fulfilled]: (state,action) => {
            saveUserData(action.payload);
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
    }
})

const {actions,reducer} = authSlice;

export const {logout,saveUser} = actions;

export default reducer;
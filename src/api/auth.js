import axios from 'axios';
const url = process.env.REACT_APP_BACKEND_URL+'/auth';

export const signInUser = (body) => axios.post(url+'/signin',body);
export const signUpUser = (body) => axios.post(url+'/signup',body);
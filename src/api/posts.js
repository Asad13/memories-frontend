import axios from 'axios';
const url = process.env.REACT_APP_BACKEND_URL+'/posts';

export const fetchPosts = (page) => axios.get(`${url}?page=${page}`);
export const createPost = (body,headers) => axios.post(url,body,headers);
export const fetchPost = (id) => axios.get(url+`/${id}`);
export const updatePost = (id,body,headers) => axios.patch(url+`/${id}`,body,headers);
export const deletePost = (id,headers) => axios.delete(url+`/${id}`,headers);
export const updateLike = (id,headers) => axios.patch(url+`/${id}/likes`,{},headers);
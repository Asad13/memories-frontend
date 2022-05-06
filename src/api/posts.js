import axios from 'axios';
const url = process.env.REACT_APP_BACKEND_URL+'/posts';

export const fetchPosts = () => axios.get(url);
export const createPost = (body) => axios.post(url,body);
export const getPost = (id) => axios.get(url+`/${id}`);
export const updatePost = (id,body) => axios.patch(url+`/${id}`,body);
export const deletePost = (id) => axios.delete(url+`/${id}`);
export const updateLike = (id) => axios.patch(url+`/${id}/likes`);
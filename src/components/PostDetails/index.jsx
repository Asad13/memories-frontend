import { useEffect } from "react";
import {Typography} from '@mui/material';
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getPost } from "../../redux/features/posts/postsSlice";
import Loader from '../Loader';
import './PostDetails.css';

const PostDetails = () => {
    const {post,isPostLoading} = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getPost(id));
    },[dispatch,id]);

    if(!post) return null;

    if(isPostLoading){
        return <Loader />
    }

    return (
        <div className='card'>
            <div className='section'>
                <Typography variant="h3" component="h2">{post.title}</Typography>
                <Typography gutterBottom variant="h6" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                <Typography variant="h6">Created by: {post.author}</Typography>
                <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className='imageSection'>
                <img className='media' src={post.selectedFile} alt={post.title} />
            </div>
        </div>
    );
}

export default PostDetails;
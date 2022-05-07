import {Pagination,PaginationItem} from '@mui/material';
import {Link} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getAllPosts } from '../redux/features/posts/postsSlice';

const Paginate = ({page}) => {
    const dispatch = useDispatch();
    const { totalNumberOfPages} = useSelector((state) => state.posts);
    useEffect(() => {
        if(page) dispatch(getAllPosts(page));
    },[dispatch,page]);

    return (
        <Pagination
            count={totalNumberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color='primary'
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    );
}

export default Paginate;
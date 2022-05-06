import {Grid, CircularProgress} from '@mui/material';
import Post from './Post';

const Posts = ({posts}) => {
    return (
        !posts.length ? <CircularProgress /> : (
            <Grid sx={styles.conatiner} container alignItems='stretch' spacing={3}>
                {
                    posts.map(post => <Post key={post._id} post={post} />)
                }
            </Grid>
        )
    )
}

const styles = {
    conatiner: {
        
    }
}

export default Posts;
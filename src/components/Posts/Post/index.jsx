import {Grid,Card, CardActions,CardContent,CardMedia,Typography,Button} from '@mui/material';
import moment from 'moment';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useDispatch} from 'react-redux';
import { selectPost,updateLikeCount,deletePost } from '../../../redux/features/posts/postsSlice';

const Post = ({post}) => {
    const dispatch = useDispatch();
    return (
        <Grid item xs={12} md={6} xl={4}>
            <Card sx={styles.card}>
                <CardMedia image={post.selectedFile} sx={styles.media} title={post.title}/>
                <div style={styles.overlay}>
                    <Typography variant="h6">{post.author}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                <div style={styles.overlay2}>
                    <Button style={{ color: 'white' }} size="small" onClick={() => {
                        let tags = "";
                        for(let i = 0; i < post.tags.length; i++){
                            tags += post.tags[i];
                            if(i !== (post.tags.length - 1)){
                                tags += " ";
                            }
                        }
                        dispatch(selectPost({
                            ...post,
                            tags: tags,

                        }))
                    }}><MoreHorizIcon fontSize='large' /></Button>
                </div>
                <div style={styles.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography sx={styles.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
                <CardActions sx={styles.cardActions}>
                    <Button size="small" color="primary" onClick={() => {dispatch(updateLikeCount(post._id))}}><ThumbUpAltIcon fontSize="small" /> Like {post.likeCount} </Button>
                    <Button size="small" color="primary" onClick={() => {dispatch(deletePost(post._id))}}><DeleteIcon fontSize="small" /> Delete</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

const styles = {
    media: {
      height: 0,
      paddingTop: '56.25%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backgroundBlendMode: 'darken',
    },
    border: {
      border: 'solid',
    },
    fullHeightCard: {
      height: '100%',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderRadius: '15px',
      height: '100%',
      position: 'relative',
    },
    overlay: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      color: 'white',
    },
    overlay2: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      color: 'white',
    },
    grid: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '20px',
    },
    title: {
      padding: '0 16px',
    },
    cardActions: {
      padding: '0 16px 8px 16px',
      display: 'flex',
      justifyContent: 'space-between',
    },
  }

export default Post;
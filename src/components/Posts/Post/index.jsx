import {Grid,Card, CardActions,CardContent,CardMedia,Typography,Button} from '@mui/material';
import moment from 'moment';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Post.css';
import { selectPost,updateLikeCount,deletePost } from '../../../redux/features/posts/postsSlice';

const Post = ({post}) => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    return (
        <Grid item xs={12} md={6} lg={4} xl={3}>
            <Card sx={styles.card}>
              <div className='cursor' style={styles.cardInsideContent} onClick={() => {navigate(`/posts/${post._id}`)}}>
                <CardMedia image={post.selectedFile} sx={styles.media} title={post.title}/>
                <div style={styles.overlay}>
                    <Typography variant="h6">{post.author}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {
                  (user && user._id === post.authorId) && (
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
                  )
                }
                <div style={styles.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography sx={styles.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
              </div>
                <CardActions sx={styles.cardActions}>
                    <Button size="small" color="primary" onClick={() => {dispatch(updateLikeCount(post._id))}}><ThumbUpAltIcon fontSize="small" /> Like {post.likes} </Button>
                    {
                      (user && user._id === post.authorId) && (
                          <Button size="small" color="primary" onClick={() => {dispatch(deletePost(post._id))}}><DeleteIcon fontSize="small" /> Delete</Button>
                      )
                    }
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
    cardInsideContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      /*
      position: 'relative',*/
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
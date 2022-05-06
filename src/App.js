import { useEffect } from 'react';
import {Container, AppBar, Typography, Grow, Grid} from '@mui/material';
import memories from './images/memories.png';
import {useDispatch,useSelector} from'react-redux';
import { getAllPosts } from './redux/features/posts/postsSlice';
import Loader from './components/Loader';
import Posts from './components/Posts';
import Form from './components/Form';

const App = () => {
  const {isLoading,posts} = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  },[dispatch]);

  let postsComponent = null;
  if(isLoading){
    postsComponent = <Loader />;
  }else{
    postsComponent = <Posts posts={posts}/>;
  }

  return (
    <Container maxWidth={false}>
      <AppBar position='static' color='inherit' style={styles.appBar}>
        <Typography variant='h2' component='h1' style={styles.heading}>Memories</Typography>
        <img src={memories} alt='Memories' style={styles.image}/>
      </AppBar>
      <Grow in={true}>
        <Container>
          <Grid container justifyContent='space-between' alignItems='flex-start' spacing={2}>
            <Grid item xs={12} md={7}>
              {postsComponent}
            </Grid>
            <Grid item xs={12} md={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

const styles = {
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
  },
  image: {
    marginLeft: '15px',
    maxWidth: '60px',
    height: 'auto',
  },
}

export default App;

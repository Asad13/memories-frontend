import {Container, Grow, Grid,Card, Paper} from '@mui/material';
import {useLocation} from 'react-router-dom';
import {useSelector} from'react-redux';
import Paginate from '../Pagination';
import Loader from '../Loader';
import Posts from '../Posts';
import Form from '../Form';

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Home = ({token}) => {
  const {isLoading,posts} = useSelector((state) => state.posts);
  const query = useQuery();
  const page = query.get('page') || 1;

  let postsComponent = null;
  if(isLoading){
    postsComponent = <Loader />;
  }else{
    postsComponent = <Posts posts={posts}/>;
  }
    return (
    <Grow in={true}>
        <Container>
            <Grid container justifyContent='space-between' alignItems='flex-start' spacing={2}>
            <Grid item xs={12} sm={6} md={9}>
              {postsComponent}
              <Paper sx={{padding: '8px',margin: '1rem 0',}} elevation={6}>
                <Grid container justifyContent='center' alignItems='center'>
                  <Grid item>
                    <Paginate page={page}/>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                {token ? <Form /> : (
                    <Card sx={{
                        textAlign: 'center',
                        padding: '16px',
                        fontSize: '1.3rem',
                        color: 'red',
                    }}>You must be logged in to create a post</Card>
                )}
            </Grid>
            </Grid>
        </Container>
    </Grow>
    );
}

export default Home;
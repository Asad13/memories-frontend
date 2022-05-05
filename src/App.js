import {Container, AppBar, Typography, Grow, Grid} from '@mui/material';
import memories from './images/memories.png';

const App = () => {
  return (
    <Container maxWidth={false}>
      <AppBar position='static' color='inherit' style={styles.appBar}>
        <Typography variant='h2' component='h1' style={styles.heading}>Memories</Typography>
        <img src={memories} alt='Memories' style={styles.image}/>
      </AppBar>
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

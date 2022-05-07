import {AppBar, Typography,Avatar, Button} from '@mui/material';
import { Link } from 'react-router-dom';
import memories from '../../images/memories.png';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/features/auth/authSlice';

const Navbar = ({user,token}) => {
    const dispatch = useDispatch();
    return (
        <AppBar position='static' color='inherit' style={styles.appBar}>
            <div style={styles.item}>
                <Typography variant='h2' component={Link} to="/" style={styles.heading}>Memories</Typography>
                <img src={memories} alt='Memories' style={styles.image}/>
            </div>
            {
                (token !== null) ? (
                    <div style={styles.item}>
                        <Avatar sx={styles.avatar} alt={user.name} src={user.imageUrl}>{user.name.charAt(0)}</Avatar>
                        <Typography sx={styles.name} variant="h6">{user.name}</Typography>
                        <Button sx={styles.innerItem} variant="contained" color="secondary" onClick={() => {dispatch(logout())}}>Logout</Button>
                    </div>
                ) : (
                    <div style={styles.item}>
                        <Button sx={styles.innerItem} component={Link} variant="contained" to="/signin" color="primary">Sign in</Button>
                        <Button sx={styles.innerItem} component={Link} variant="contained" to="/signup" color="secondary">Sign up</Button>
                    </div>
                )
            }
      </AppBar>
    );
}

const styles = {
    appBar: {
      borderRadius: 15,
      margin: '30px 0',
      padding: '0 1rem',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    avatar: {
        width: '30px',
        height: '30px',
        textAlign: 'center',
        lineHeight: '30px',
        borderRadius: '50%',
        background: '#020202',
        color: '#ffffff',
        margin: '0 8px',
    },
    name: {
        color: '#020202',
        margin: '0 8px',
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    heading: {
      color: 'rgba(0,183,255, 1)',
      textDecoration: 'none',
    },
    image: {
      marginLeft: '15px',
      maxWidth: '60px',
      height: 'auto',
    },
    innerItem: {
        margin: '0 8px',
    }
  }
export default Navbar;
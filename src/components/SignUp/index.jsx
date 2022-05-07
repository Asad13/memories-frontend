import {useState} from 'react';
import {Grid,Paper,TextField,Button,Avatar, InputAdornment, IconButton, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import {signUpUser} from '../../redux/features/auth/authSlice';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const dispatch = useDispatch();
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const [authValue,setAutValue] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const handleSubmit = event => {
        event.stopPropagation();
        event.preventDefault();
        if(authValue.name && authValue.email && authValue.password){
            //authValue.password.length >= 8 && 
            if(authValue.password === authValue.confirmPassword){
                dispatch(signUpUser({
                    name: authValue.name,
                    email: authValue.email,
                    password: authValue.password
                }));
            }
        }
    }

    const handleChange = event => {
        setAutValue({
            ...authValue,
            [event.target.name]: event.target.value,
        })
    }
    return (
        <Grid container justifyContent='center'>
            <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
                <Paper sx={styles.paper}>
                    <Avatar sx={{margin: '0 auto'}}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <form autoComplete="off" noValidate sx={styles.form} onSubmit={(event) => handleSubmit(event)}>
                        <TextField name="name" type="text" sx={styles.input} label="Name" fullWidth value={authValue.name} onChange={(event) => handleChange(event)} />
                        <TextField name="email" type="email" sx={styles.input} label="Email" fullWidth value={authValue.email} onChange={(event) => handleChange(event)} />
                        <TextField name="password" type={showPassword ? "text" : "password"} sx={styles.input} label="Password" fullWidth value={authValue.password} onChange={(event) => handleChange(event)} InputProps={
                            {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        } />
                        <TextField name="confirmPassword" type={showConfirmPassword ? "text" : "password"} sx={styles.input} label="Confirm Password" fullWidth value={authValue.confirmPassword} onChange={(event) => handleChange(event)} InputProps={
                            {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                            {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        } />
                        <Button sx={styles.input} size="large" fullWidth color='primary' type='submit' variant='contained'>Sign Up</Button>
                    </form>
                    <div>
                        <Typography component='span' variant="p">Already have an account?</Typography>
                        <Button component={Link} variant="text" to="/signin">Sign In</Button>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
}

const styles = {
    paper: {
      textAlign: 'center',
      padding: '16px',
    },
    form: {
        margin: '8px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    input: {
      margin: '10px 0',
    },
}
export default SignUp;
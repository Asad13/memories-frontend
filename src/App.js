import { useEffect } from 'react';
import {Route,Navigate, Routes} from 'react-router-dom';
import {Container} from '@mui/material';
import {useDispatch,useSelector} from'react-redux';
import { logout,saveUser } from './redux/features/auth/authSlice';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PostDetails from './components/PostDetails';

const App = () => {
  const {user,token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logout());
    } else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        if (expirationTime <= new Date()) {
          dispatch(logout());
        } else {
            dispatch(saveUser({
              token: token,
              user: JSON.parse(localStorage.getItem('user')),
            }));
        }
    }
  },[dispatch]);

  let routes = null;
  if(token){
    routes = (
      <Routes>
        <Route path="/" element={<Navigate to="/posts"/>}/>
        <Route path="/posts" element={<Home token={token} />} />
        <Route path="/posts/:id" element={<PostDetails />}/>
        <Route path="*" element={<Navigate to="/posts"/>} />
      </Routes>
    );
  }else{
    routes = (
      <Routes>
        <Route path="/" element={<Navigate to="/posts"/>}/>
        <Route path="/posts" element={<Home token={token} />} />
        <Route path="/posts/:id" element={<PostDetails />}/>
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/posts"/>} />
      </Routes>
    );
  }
  
  return (
    <Container maxWidth={false}>
      <Navbar user={user} token={token} />
      {routes}
    </Container>
  );
};

export default App;

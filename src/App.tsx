import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Login from './pages/login';
import Signup from './pages/signup';
import SplashScreen from './pages/splash';
import Home from './pages/home';
import ProtectedRoutes from './protectedRoutes';

const App = () => {
  const [splashScreen, setSplashScreen] = useState<boolean>(true);
  const token = localStorage.getItem('token') || '';
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setSplashScreen(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (token) {
      navigate('/')
    } else {
      navigate('/login')
    }
  }, [token]);

  return (
    <>
      {splashScreen ?
        <SplashScreen />
        :
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoutes isLoggedIn={token}><Home /></ProtectedRoutes>} />
        </Routes>
      }
    </>
  );
}

export default App;

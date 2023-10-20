import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/login';
import Signup from './pages/signup';
import SplashScreen from './pages/splash';
import Home from './pages/home';
import ProtectedRoutes from './protectedRoutes';

const App = () => {
  const [splashScreen, setSplashScreen] = useState<boolean>(true);
  const isLoggedIn = localStorage.getItem('token');

  useEffect(() => {
    setTimeout(() => {
      setSplashScreen(false);
    }, 1500);
  }, []);

  return (
    <>
      {splashScreen ?
        <SplashScreen />
        :
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoutes isLoggedIn={isLoggedIn}><Home /></ProtectedRoutes>} />
        </Routes>
      }
    </>
  );
}

export default App;

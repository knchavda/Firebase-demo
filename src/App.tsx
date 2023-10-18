import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/login';
import Signup from './pages/signup';
import SplashScreen from './pages/splash';

const App = () => {
  // const navigate = useNavigate();
  const [splashScreen, setSplashScreen] = useState<boolean>(true);

  // const loggedIn = false;
  // useEffect(() => {
  //   if (!loggedIn) {
  //     navigate("/login")
  //   }
  // }, [navigate]);

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
          <Route path="/signup" element={< Signup />} />
        </Routes>
      }
    </>
  );
}

export default App;

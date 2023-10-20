import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { FirebaseContext } from '../context/firebase';

import { Typography, Grid } from '@mui/material';
import theme from '../theme';
import useMediaQuery from '@mui/material/useMediaQuery';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Input from '../forms/input';
import ContainedButton from '../forms/containedButton';
import TextButton from '../forms/textButton';

import GoogleIcon from '../assests/svg/google';
import FacebookIcon from '../assests/svg/facebook.svg';
import Logo from '../assests/images/logo.png';
import Welcome from '../assests/images/welcome.jpeg';

import { LoginDetails } from '../type/interface';

const Login = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const firebase = useContext(FirebaseContext);

  const [showPass, setShowPass] = useState<boolean>(false);
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    email: '',
    password: ''
  });

  const LoginHandleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLButtonElement
    setLoginDetails({
      ...loginDetails,
      [name]: value
    })
  }

  const Login = async () => {
    const { email, password } = loginDetails;
    await firebase.Login(email, password);
  }

  const LoginWithGoogle = async () => await firebase.SignInWithGoogle();

  return (
    <Grid container style={{ fontSize: 0 }}>
      <Grid item xs={6} sm={7} md={8} lg={9}>
        <img src={Welcome} alt="welcome" className={`${isSmallScreen ? "welcome-image-hide" : "welcome-image"}`} />
      </Grid>
      <Grid item xs={12} sm={5} md={4} lg={3}>

        <div className="login">
          <img src={Logo} alt="logo" className="signup-logo" />
          <Typography variant="h5" component="h5" className="login-title">Login to your Account</Typography>

          <div className="login-inputfields">
            <Input type="text" id="email" name="email" placeholder="Email" value={loginDetails.email} onChnage={LoginHandleChange} autoComplete="off" />
            <Input type={`${showPass ? "text" : "password"}`} id="password" name="password" placeholder="Password" value={loginDetails.password} onChnage={LoginHandleChange} endIcon={<button className="signup-inputfields-icon" onClick={() => setShowPass(!showPass)}>
              {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>} autoComplete="off" />
          </div>

          <Typography variant="h5" component="h5" className="login-forget-password-text">Forget Password?</Typography>
          <ContainedButton label="Log In" className="login-btn" onClick={Login} />
          <div className="login-border"></div>

          <div>
            <Typography variant="h5" component="h5" className="login-with-text">Or sign in with</Typography>
            <div className="login-with-icons">
              <button className="login-with--icon" onClick={LoginWithGoogle}><GoogleIcon /></button>
              <button className="login-with--icon"><img src={FacebookIcon} alt="facebook" /></button>
            </div>
          </div>

          <Typography variant="h5" component="h5" className="login-footer-text">Don’t have an account? <span><TextButton label="Sign Up" className="sign-up-text-btn" onClick={() => navigate("/signup")} /></span></Typography>
        </div>
      </Grid>
    </Grid>
  )
}

export default Login  
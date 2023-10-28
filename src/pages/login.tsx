import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import * as Yup from "yup";
import { useFormik } from 'formik';

import { FirebaseContext } from '../context/firebase';

import { Typography, Grid } from '@mui/material';
import theme from '../theme';
import useMediaQuery from '@mui/material/useMediaQuery';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import Input from '../forms/input';
import ContainedButton from '../forms/containedButton';
import TextButton from '../forms/textButton';

import GoogleIcon from '../assests/svg/google';
import FacebookIcon from '../assests/svg/facebook.svg';
import Logo from '../assests/images/logo.png';
import Welcome from '../assests/images/welcome.jpeg';

const Login = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const firebase = useContext(FirebaseContext);

  const [showPass, setShowPass] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email").required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .min(8, "Pasword must be 8 or more characters")
      .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
      .matches(/\d/, "Password should contain at least one number")
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
  });


  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await firebase.Login(values.email, values.password);
    },
  }); 

  const LoginWithGoogle = async () => await firebase.SignInWithGoogle();

  const handleClose = (_: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    firebase.setIsError('');
  }

  return (
    <Grid container style={{ fontSize: 0 }}>
      <Snackbar open={firebase.isError} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "right" }} onClose={handleClose}>
        <MuiAlert severity="error" variant="filled" sx={{ width: '100%' }}>{firebase.isError}</MuiAlert>
      </Snackbar>
      <Grid item xs={6} sm={7} md={8} lg={9}>
        <img src={Welcome} alt="welcome" className={`${isSmallScreen ? "welcome-image-hide" : "welcome-image"}`} />
      </Grid>
      <Grid item xs={12} sm={5} md={4} lg={3}>

        <div className="login">
          <img src={Logo} alt="logo" className="signup-logo" />
          <Typography variant="h5" component="h5" className="login-title">Login to your Account</Typography>

          <div className="login-inputfields">
            <Input type="text" id="email" name="email" placeholder="Email" formik={formik} autoComplete="off" />
            <Input type={`${showPass ? "text" : "password"}`} id="password" name="password" formik={formik} placeholder="Password" endIcon={<button className="signup-inputfields-icon" onClick={() => setShowPass(!showPass)}>
              {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>} autoComplete="off" />
          </div>

          <Typography variant="h5" component="h5" className="login-forget-password-text">Forget Password?</Typography>
          <ContainedButton label="Log In" className="login-btn" onClick={() => formik.handleSubmit()} />
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
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import * as Yup from "yup";
import { useFormik } from 'formik';

import { FirebaseContext } from '../context/firebase';

import { Grid, Typography } from '@mui/material';
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

const Signup = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const firebase = useContext(FirebaseContext);

  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfPass, setShowConfPass] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email").required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .min(8, "Pasword must be 8 or more characters")
      .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
      .matches(/\d/, "Password should contain at least one number")
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
    confirmPassword: Yup.string().when("password", (password: any, field: any) => {
      if (password) {
        return field.required("The passwords do not match").oneOf([Yup.ref("password")], "The passwords do not match");
      }
    }),
  });

  const formik = useFormik({ 
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await firebase.Signup(values.email, values.password);
    }, 
  }); 

  const SignupWithGoogle = async () => await firebase.SignInWithGoogle();

  return (
    <>
      <Grid container style={{ fontSize: 0 }}>

        <Grid item xs={6} sm={7} md={8} lg={9}>
          <img src={Welcome} alt="welcome" className={`${isSmallScreen ? "welcome-image-hide" : "welcome-image"}`} />
        </Grid>

        <Grid item xs={12} sm={5} md={4} lg={3}>
          <div className="signup">
            <img src={Logo} alt="logo" className="signup-logo" />
            <Typography variant="h5" component="h5" className="signup-title">Create your Account</Typography>

            <div className="signup-inputfields">
              <Input type="text" id="email" name="email" placeholder="Email" autoComplete="off" formik={formik}/>
              <Input type={`${showPass ? "text" : "password"}`} id="password" name="password" placeholder="Password" formik={formik} endIcon={<button className="signup-inputfields-icon" onClick={() => setShowPass(!showPass)}>
                {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </button>} autoComplete="off" />
              <Input type={`${showConfPass ? "text" : "password"}`} id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" formik={formik} endIcon={<button className="signup-inputfields-icon" onClick={() => setShowConfPass(!showConfPass)}>{showConfPass ? <VisibilityIcon /> : <VisibilityOffIcon />}</button>} autoComplete="off" />
            </div>

            <ContainedButton label="Sign Up" className="signup-btn" onClick={() => formik.handleSubmit()} />
            <div className="signup-border"></div>

            <div>
              <Typography variant="h5" component="h5" className="login-with-text">Or sign in with</Typography>
              <div className="login-with-icons">
                <button className="login-with--icon" onClick={SignupWithGoogle}><GoogleIcon /></button>
                <button className="login-with--icon"><img src={FacebookIcon} alt="facebook" /></button>
              </div>
            </div>

            <Typography variant="h5" component="h5" className="signup-footer-text">Already have an account? <span><TextButton label="Log In" className="login-text-btn" onClick={() => navigate("/login")} /></span></Typography>
          </div>
        </Grid>

      </Grid>

    </>
  )
}

export default Signup;  
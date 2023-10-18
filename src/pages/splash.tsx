import SplashImage  from '../assests/images/Splash.png';

import theme from '../theme';

import useMediaQuery from '@mui/material/useMediaQuery';

const SplashScreen = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="splash">
      <img src={SplashImage} alt="SplashImage" className={isSmallScreen ? "splash-small-logo" : "splash-logo"} />
    </div>
  )
}

export default SplashScreen;
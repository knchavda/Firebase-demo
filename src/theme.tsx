import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  breakpoints: {
    values: {
      xs: 300,
      sm: 600, 
      md: 900, 
      lg: 1200, 
      xl: 1536 
    }
  },
});

export default customTheme;

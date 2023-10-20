import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';

import customTheme from './theme';
import App from './App';

import './styles/index.scss';

import { FirebaseProvider } from './context/firebase';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <Router>
        <FirebaseProvider>
          <App />
        </FirebaseProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);



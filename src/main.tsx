import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import './index.css'
import Layout from './layout';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/portfolio">
    <ThemeProvider>
          <Layout /> 
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

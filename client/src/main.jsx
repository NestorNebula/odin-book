import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from '@routes/routes';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styles';
import './index.css';

const router = createBrowserRouter(routes, {});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);

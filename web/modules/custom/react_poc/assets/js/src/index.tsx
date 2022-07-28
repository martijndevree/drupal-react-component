import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { TranslationStateProvider } from './lib/translationContext';
import { ThemeProps } from './types';

const theme: ThemeProps = {
  fonts: {
    primary: 'Arial, sans-serif'
  },
  colors: {
    purple: '#865cfe',
    yellow: '#f4e100',
    white: '#fff'
  }
};

const root = ReactDOM.createRoot(
  document.getElementById('react-app') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <TranslationStateProvider>
        <App />
      </TranslationStateProvider>
    </ThemeProvider>
  </React.StrictMode>
);

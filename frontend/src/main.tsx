import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import './index.css';
import { AppContextProvider } from './contexts/AppContent';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
    <QueryClientProvider client={queryClient}>
    <AppContextProvider>
    <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
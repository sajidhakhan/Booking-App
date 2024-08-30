import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import './index.css';
import { AppContextProvider } from './contexts/AppContext';
import { SearchContextProvider } from './contexts/SearchContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
    <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>    
    </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
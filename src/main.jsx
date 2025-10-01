import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import {
  
  RouterProvider
} from "react-router-dom";
import router from './router/router.jsx';
import AuthProvider from './pages/Context/AuthProvider.jsx';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist max-w-7xl mx-auto'>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router}  />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
     
)

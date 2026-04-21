import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './Dashboard.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // Import this

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

    
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
import React from 'react'
import { BrowserRouter } from "react-router-dom"
import { Toaster } from 'react-hot-toast'  // Keep the import for Toaster
import AppRouter from './AppRouter'
import { HelmetProvider } from 'react-helmet-async'



function App() {


  return (
    <>
      <HelmetProvider>
        <BrowserRouter>
          <Toaster /> {/* This will show toast notifications */}
          <AppRouter />

        </BrowserRouter>
      </HelmetProvider>
    </>
  )
}

export default App

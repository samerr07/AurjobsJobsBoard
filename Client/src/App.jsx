import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar'
import MainPage from './pages/MainPage'
import CandidateRegisterPage from './pages/CandidateRegisterPage'
import CandidateLoginPage from './pages/CandidateLoginPage'
import ContactPage from './pages/ContactPage'
import Dashboard from './components/Dashboard/Dashboard'  // Keep the import for Dashboard
import { Toaster } from 'react-hot-toast'  // Keep the import for Toaster
import CompanyLogin from './components/CompanyLogin'
import CompanyRegistration from './components/CompanyRegistration'
import JobsPage from './pages/JobsPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster /> {/* This will show toast notifications */}
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/candidate_register' element={<CandidateRegisterPage />} />
          <Route path='/candidate_login' element={<CandidateLoginPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/candidate_dashboard' element={<Dashboard />} /> 
          <Route path='/company_login' element={<CompanyLogin/>}/>
          <Route path='/company_register' element={<CompanyRegistration/>}/>
          <Route path='/jobs' element={<JobsPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

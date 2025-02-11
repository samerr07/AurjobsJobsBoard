import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
// import './App.css'
import Navbar from './components/Navbar'
import MainPage from './pages/MainPage'
import CandidateRegisterPage from './pages/CandidateRegisterPage'
import CandidateLoginPage from './pages/CandidateLoginPage'
import ContactPage from './pages/ContactPage'
import { Toaster } from 'react-hot-toast'

function App() {
  

  return (
    <>
    
      <BrowserRouter>
      <Toaster/>
      <Navbar/>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path='/candidate_register' element={<CandidateRegisterPage/>}/>
          <Route path='/candidate_login' element={<CandidateLoginPage/>}/>
          <Route path='/contact' element={<ContactPage/>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

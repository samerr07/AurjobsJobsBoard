import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import FeaturedJobs from '../components/FeaturedJobs'
import Category from '../components/Category'
import TopRecruiters from '../components/TopRecruiters'
import Footer from '../components/Footer'
import Testimonials from '../components/Testimonials'
import Platform from '../components/Platform'
import FAQ from '../components/FAQ'

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-50  font-roboto">
      
      <HeroSection/>
      <FeaturedJobs/>
      <Category/>
      <TopRecruiters/>
      <Platform/>
      <Testimonials/>
      <FAQ/>
      <Footer/>
    </div>
  )
}

export default MainPage

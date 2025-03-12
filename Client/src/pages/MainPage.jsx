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
import { Helmet } from 'react-helmet-async'

const MainPage = () => {
  return (
    <>
      <Helmet>
        <title>Aurjobs Job Portal - Discover Top Talent & Career Opportunities</title>

        <meta name="description" id="description"
          content="Aurjobs Job Portal offers seamless job postings for employers and an AI-driven experience for job seekers. Post jobs, apply to opportunities, and enhance your recruitment with AI-powered tools for screening, assessments, and interviews." />


        <meta property="og:title" id="og-title" content="Aurjobs Job Portal - Discover Top Talent & Career Opportunities" />


        <meta property="og:description" id="og-description"
          content="Welcome to Aurjobs Job Portal, your go-to platform for posting jobs, finding talent, and enhancing your hiring process with AI-driven features. Start hiring smarter today." />


        <meta property="og:url" content="https://jobs.aurjobs.com" />

        <meta name="application-name" content="Aurjobs Job Portal" />

        <meta property="og:site_name" content="Aurjobs Job Portal" />

        

      </Helmet>

      <div className="min-h-screen bg-gray-50  font-roboto">

        <HeroSection />
        <FeaturedJobs />
        <Category />
        <TopRecruiters />
        <Platform />
        <Testimonials />
        <FAQ />
        <Footer />
      </div>
    </>
  )
}

export default MainPage

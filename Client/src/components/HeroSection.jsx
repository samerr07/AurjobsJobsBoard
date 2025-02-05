import React, { useEffect, useState } from 'react'
import { ChevronDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import HeroImg from "../assets/HeroImg.png"

const HeroSection = () => {

  
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-4 py-28">
                <div className="text-center mb-8">
                    <div className="inline-block bg-gray-100 px-4 py-2 rounded-full mb-4">
                        <span className="text-gray-600">The best job seekers</span>
                        <span className="text-blue-600 ml-2">Explore →</span>
                    </div>

                    <h1 className="lg:text-6xl md:text-6xl text-4xl font-bold lg:mb-6 lg:leading-[1] leading-[1.45]">
                        FIND YOUR
                        <br />
                        <span className="inline-block lg:mt-4">
                            D<span className="text-blue-600">REAM JOB</span> BOARD
                        </span>
                    </h1>
                    <p className="text-gray-600 mt-4 mb-8 max-w-2xl mx-auto">
                        Find all recent job circulars available in the India and around the globe in one place with an easy job application feature.
                    </p>

                    {/* Search Bar */}

                    <div className="bg-white rounded-xl shadow-lg px-8 py-5 border border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1 group">
                                <select className="w-full appearance-none bg-gray-50 border-0 rounded-lg px-4 py-2 cursor-pointer focus:outline-none focus:bg-gray-100 group-hover:bg-gray-100 transition-colors">
                                    <option value="">Keyword</option>
                                    <option value="physical">Software</option>
                                    <option value="visual">Medical</option>
                                    <option value="hearing">Finance</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            </div>

                            <div className="w-px h-10 bg-gray-200"></div>

                            <div className="relative flex-1 group">
                                <select className="w-full appearance-none bg-gray-50 border-0 rounded-lg px-4 py-2 cursor-pointer focus:outline-none focus:bg-gray-100 group-hover:bg-gray-100 transition-colors">
                                    <option value="">Location</option>
                                    <option value="delhi">Delhi</option>
                                    <option value="mumbai">Mumbai</option>
                                    <option value="bangalore">Bangalore</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            </div>

                            <div className="w-px h-10 bg-gray-200"></div>

                            <div className="relative flex-1 group">
                                <select className="w-full appearance-none bg-gray-50 border-0 rounded-lg px-4 py-2 cursor-pointer focus:outline-none focus:bg-gray-100 group-hover:bg-gray-100 transition-colors">
                                    <option value="">Qualification</option>
                                    <option value="graduate">Graduate</option>
                                    <option value="postgraduate">Post Graduate</option>
                                    <option value="diploma">Diploma</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            </div>

                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                                <Search size={18} />
                                Find Jobs
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative mt-16">
                    <img
                        src={HeroImg}
                        alt="Team of professionals"
                        className="w-full rounded-lg"
                    />


                </div>

                

            </div>

        </div>









    )
}

export default HeroSection



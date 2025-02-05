import React, { useEffect, useState } from 'react'
import { ChevronDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import HeroImg from "../assets/HeroImg.png"

const HeroSection = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const companies = [
        {
            name: 'Conneqt Business Solutions',
            logo: `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
            <text x="10" y="45" font-family="Arial" font-size="24" font-weight="bold" fill="#2563eb">Conneqt</text>
            <text x="10" y="65" font-family="Arial" font-size="14" fill="#64748b">Business Solutions</text>
          </svg>`,
            description: 'Leading business process management company'
        },
        {
            name: 'Amazon',
            logo: `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M45,20 C45,20 35,25 35,40 C35,55 45,60 45,60 L155,60 C155,60 165,55 165,40 C165,25 155,20 155,20 Z" fill="#232f3e"/>
            <text x="60" y="45" font-family="Arial" font-size="24" font-weight="bold" fill="#ff9900">amazon</text>
          </svg>`,
            description: 'Global e-commerce and technology leader'
        },
        {
            name: 'Teleperformance',
            logo: `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
            <text x="10" y="45" font-family="Arial" font-size="20" font-weight="bold" fill="#0066cc">Teleperformance</text>
            <rect x="10" y="50" width="180" height="2" fill="#0066cc"/>
          </svg>`,
            description: 'Worldwide leader in digital business services'
        },
        {
            name: 'IndiGo Airlines',
            logo: `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="20" width="160" height="40" rx="5" fill="#0b2343"/>
            <text x="40" y="47" font-family="Arial" font-size="24" font-weight="bold" fill="#white">IndiGo</text>
          </svg>`,
            description: 'India largest passenger airline'
        },
        {
            name: 'Vishal Mega Mart',
            logo: `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
            <text x="20" y="40" font-family="Arial" font-size="24" font-weight="bold" fill="#e11d48">VISHAL</text>
            <text x="20" y="60" font-family="Arial" font-size="16" fill="#475569">MEGA MART</text>
          </svg>`,
            description: 'Leading fashion and retail chain'
        },
        {
            name: 'Jio Digital Life',
            logo: `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="40" r="30" fill="#0f52ba"/>
            <text x="85" y="48" font-family="Arial" font-size="24" font-weight="bold" fill="white">Jio</text>
          </svg>`,
            description: 'Digital services and telecommunications giant'
        }
    ];

    const visibleCompanies = 4; // Number of companies visible at once

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === companies.length - visibleCompanies ? 0 : prevIndex + 1
            );
        }, 3000); // Slide every 3 seconds

        return () => clearInterval(timer);
    }, [companies.length]);


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

                <div className="bg-blue-600 text-white text-center py-3 rounded-lg mb-8">
                    <h2 className="text-2xl ">Join our team of professionals</h2>
                    <p className="text-lg">We are always looking for talented individuals to join our team.</p>
                </div>

                {/* Company Logos */}
               
                <div className="relative overflow-hidden mb-1">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / visibleCompanies)}%)`,
                        }}
                    >
                        {companies.map((company, index) => (
                            <div
                                key={index}
                                className="flex-none w-1/4 px-4"
                            >
                                <div className="w-full hover:shadow-lg transition-all duration-300 p-4 rounded-lg">
                                    <div
                                        className="w-full h-20 mb-2"
                                        dangerouslySetInnerHTML={{ __html: company.logo }}
                                    />
                                    <div className="text-center">
                                        <h3 className="font-semibold text-gray-800">{company.name}</h3>
                                        <p className="text-sm text-gray-600">{company.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>

    )
}

export default HeroSection



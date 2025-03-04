import React from 'react'
import TeamImg from "../assets/Team.png"
import { Link } from 'react-router-dom'

const Platform = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          {/* Left  Image */}
          <div className="relative">

            <div className="mt-12 relative">
              <img
                src={TeamImg}
                alt="Happy team members"
                className="rounded-xl w-full"
              />


            </div>
          </div>

          {/* Right Side Content */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">
              Millions Of Jobs.
              <br />
              Find The One That's
              <br />
              <span className="text-blue-600">Right</span> For You
            </h1>
            <p className="text-gray-600">
            Millions of opportunities are waiting for you. Discover jobs that match your skills, interests, and career goals.
            </p>
            <div className="flex gap-4">
              <Link to={"/jobs"}>
                <button className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg font-medium">
                  Search Job
                </button>
              </Link>
              <button className="text-gray-600 px-6 py-3 font-medium">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {/* Completed Cases */}
          <div className="space-y-4">
            <p className="text-gray-600">
            We provide end-to-end solutions for job seekers and employers to make hiring and job searching seamless.
            </p>
            <h3 className="text-2xl font-bold">Successful Placements</h3>
            <div className="text-5xl font-bold text-blue-600">25k+</div>
          </div>

          {/* Our Office */}
          <div className="space-y-4">
            <p className="text-gray-600">
            Build a strong network connecting you with top employers, industry leaders, and career opportunities for continuous growth.
            </p>
            <h3 className="text-2xl font-bold">Office Locations</h3>
            <div className="text-5xl font-bold text-blue-600">17+</div>
          </div>

          {/* Skilled People */}
          <div className="space-y-4">
            <p className="text-gray-600">
            Bridging the gap between skilled professionals and top employers to create meaningful career opportunities worldwide.
            </p>
            <h3 className="text-2xl font-bold">Skilled Professionals</h3>
            <div className="text-5xl font-bold text-blue-600">86+</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Platform

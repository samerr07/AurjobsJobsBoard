import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import Logo from '../assets/Aurjobs_Logo.jpg'


const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (

    <>

      <nav className="w-full flex items-center justify-between px-4 md:px-8 py-3 fixed top-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        {/* Mobile Menu + Logo */}
        <div className="flex items-center space-x-4 md:space-x-0">
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-10 h-10 text-gray-800"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </div>

          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Aurjobs Logo" className="w-16 h-12 rounded-md" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-1">
          <li>
            <Link
              to="/"
              className="px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-colors"
            >
              Jobs
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-colors"
            >
              For Employers
            </Link>
          </li>

          <li>
            <Link
              to="/pricing"
              className="px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-colors"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Sign Up Button */}
        <div className="md:flex space-x-4 gap-4">
          <Link to={"/candidate_register"}>
            <button className="bg-transparent border-2 border-indigo-600 rounded-lg px-6 py-2 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300">
              Sign Up
            </button>
           
          </Link>
          <button className="px-6 py-2 hidden lg:block text-white bg-blue-600 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Post Job for Free
            </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:hidden z-40`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <span className="text-lg font-semibold text-gray-900">Aurjobs</span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-700"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Jobs
              </Link>
              <Link
                to="/"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                For Employers
              </Link>
              <Link
                to="/pricing"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100">
            <div className="space-y-3">
              {/* <Link
              to="/login"
              className="block w-full px-3 py-2 text-center rounded-lg border border-gray-200 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Log in
            </Link> */}
              <Link
                to="/signup"
                className="block w-full px-3 py-2 text-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>

  );
};

export default Navbar;
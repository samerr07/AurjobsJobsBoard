import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import {  getCandidateProfile, setAuthentication } from '../../redux/candidateSlice';
import { BASEURL } from '../../utility/config';


const CandidateLogin = ({ navigateToRegister }) => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    try {
      setLoading(true)
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${BASEURL}/candidates/CandidateLogin`, formData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })

      if (res?.data?.success) {
        toast.success(res?.data?.message || 'User Logged In successfully!', {
          duration: 4000,
          position: 'top-right',
          style: {
            background: '#4CAF50',
            color: 'white',
            fontWeight: 'bold',
            padding: '16px',
            borderRadius: '8px'
          },
          iconTheme: {
            primary: 'white',
            secondary: '#4CAF50'
          }
        });
        navigate("/")
        // document.cookie = `authToken=${res.data.token}; path=/; secure; samesite=strict`;
        dispatch(getCandidateProfile(res?.data?.candidate))
        dispatch(setAuthentication(true))

      } 
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Something went wrong', {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#FF6B6B',
          color: 'white',
          fontWeight: 'bold',
          padding: '16px',
          borderRadius: '8px'
        }
      });
      dispatch(setAuthentication(false))
    } finally {
      setLoading(false)
    }


    setFormData({
      email: "",
      password: ""
    })

  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="flex flex-col md:flex-row w-[85%] max-w-4xl justify-center">
        {/* This empty div creates space to shift content right */}


        {/* for the left side */}
        {/* <div className="w-3/5 bg-orange-100 flex items-center justify-center p-12">
        <img src="/src/assets/5038a172634305.5cf7cacf5a32f.jpg" alt="Login illustration" 
        className="w-full max-w-lg max-h-lg shadow-xl rounded-lg transition-all duration-300 hover:scale-102" 
      />
    </div> */}

        {/* right */}
        <div className="w-full md:w-2/3 p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Login to your account</h2>
          <p className="text-gray-600 text-center mb-6">Welcome back!</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 peer"
                placeholder=" "
                name="email"
                required
              />
              <label
                htmlFor="email"
                className="absolute top-2 left-3  text-md text-gray-600 transition-all duration-300 ${formData.email ? ' text-orange-500' : 'top-1/2 -translate-y-1/2 peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-orange-500'}"
              >
                Email address
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 peer"
                placeholder=" "
                name="password"
                required
              />
              <label
                htmlFor="password"
                className="absolute top-2 left-3  text-md text-gray-600 transition-all duration-300 ${formData.password ? ' text-orange-500' : 'top-1/2 -translate-y-1/2 peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-orange-500'}"
              >
                Password
              </label>
            </div>

            {loading ? (
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition flex items-center justify-center"
                disabled
              >
                <Loader2 className='mr-2 h-5 w-5 animate-spin' />Please Wait
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition"
              >
                Sign in
              </button>
            )}
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don't have an account?
              <Link to="/candidate_register">
                <span className="text-orange-500 hover:text-orange-700 font-medium cursor-pointer">
                  Create an account
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )

}

export default CandidateLogin;

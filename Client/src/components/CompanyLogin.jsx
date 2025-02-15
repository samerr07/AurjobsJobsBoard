import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from '../assets/Login.png';
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASEURL } from "../utility/config";
import toast from "react-hot-toast";
import { getEmployerProfile, setEmployerAuthentication } from "../redux/employerSlice";

function CompanyLogin() {
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
      company_email: '',
      company_password: '',
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      console.log(e.target.value)
      console.log(name)
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData)
    try {
      setLoading(true)
      const res = await axios.post(`${BASEURL}/employers/EmployerLogin`, formData, {
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
       
        dispatch(getEmployerProfile(res?.data?.employer))
        dispatch(setEmployerAuthentication(true))

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
      dispatch(setEmployerAuthentication(false))
    } finally {
      setLoading(false)
    }


    // setFormData({
    //   email: "",
    //   password: ""
    // })

  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white animate-slide-out">
      <div className="flex flex-col md:flex-row items-center justify-center bg-white rounded-lg shadow-lg p-8 md:p-12 w-full max-w-4xl">
        
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-black mb-2">Login to your account</h2>
              <p className="text-gray-600">Welcome back!</p>
            </div>
            <hr />
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  id="company_email"
                  value={formData.company_email}
                  onChange={handleChange}
                  className="block w-full p-2 border-black border-b-[1.5px] focus:outline-none peer"
                  placeholder=" "
                  name="company_email"
                />
                <label
                  htmlFor="email"
                  className="absolute text-md text-black duration-300 transform top-0 -translate-y-4 scale-75 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Email address
                </label>
              </div>

              <div className="relative">
                <input
                  type="password"
                  id="company_password"
                  value={formData.company_password}
                  onChange={handleChange}
                  className="block w-full p-2 border-black border-b-[1.5px] focus:outline-none peer"
                  placeholder=" "
                  name="company_password"
                />
                <label
                  htmlFor="password"
                  className="absolute text-md text-black duration-300 transform top-0 -translate-y-4 scale-75 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Password
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              LOG IN
            </button>

            <div className="text-center space-y-3">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to={"/company_register"}>
                  <span className="text-blue-500 hover:text-blue-600 font-medium cursor-pointer">
                    Create an account
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Right: Image */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center">
          <img src={LoginImage} className="max-w-full h-auto" alt="Login" />
        </div>
      </div>
    </div>
  );
}

export default CompanyLogin;
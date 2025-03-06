import axios from 'axios';
import React, { useState } from 'react';
import { BASEURL } from '../../utility/config';
import { CheckCircle, Loader2,  X } from 'lucide-react';

const CompanyRegistrationForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company_display_name: '',
    company_website: '',
    company_logo: '',
    industry: '',
    description: ''
  });

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Marketing",
    "Media & Entertainment",
    "Real Estate",
    "Transportation",
    "Energy",
    "Construction",
    "Agriculture",
    "Hospitality",
    "Telecommunications",
    "Consulting",
    "Aerospace",
    "Automotive",
    "Biotechnology",
    "E-commerce",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Basic validation
      setLoading(true)
      if (!formData.company_display_name || !formData.industry) {
        alert('Please fill in required fields');
        return;
      }
      const res = await axios.post(`${BASEURL}/external_jobs/create_external_company`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })

      if (res?.data?.success) {
        setLoading(false)
        setShowModal(true);
      }

      // Here you would typically send the form data to a backend
      console.log('Submitting', formData);
    } catch (error) {
      console.error('Registration error:', error);
      setLoading(false)
    }
    setFormData({
      company_display_name: '',
      company_website: '',
      company_logo: '',
      industry: '',
      description: ''
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-blue-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-8">
          <h2 className="text-center text-4xl font-extrabold text-white tracking-tight">
            Company Registration
          </h2>
          <p className="text-center text-blue-100 mt-3 text-lg">
            Create your company profile with ease
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          {/* Logo Preview and URL Section */}
          <div className="flex items-center space-x-6 mb-6">
            <div className="shrink-0">
              {formData.company_logo ? (
                <img
                  className="h-24 w-24 object-cover rounded-full border-4 border-blue-300"
                  src={formData.company_logo}
                  alt="Company Logo"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/96';
                  }}
                />
              ) : (
                <div className="h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Logo URL
              </label>
              <input
                type="url"
                name="company_logo"
                value={formData.company_logo}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>

          {/* Input Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Company Display Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Display Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="company_display_name"
                value={formData.company_display_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                placeholder="Enter company name"
              />
            </div>

            {/* Company Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Website
              </label>
              <input
                type="url"
                name="company_website"
                value={formData.company_website}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                placeholder="https://www.example.com"
              />
            </div>
          </div>

          {/* Industry and Description */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry <span className="text-red-500">*</span>
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                required
              >
                <option value="">Select Industry</option>
                {industries.map((industry, index) => (
                  <option key={index} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out resize-none"
                placeholder="Brief company description..."
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            {
              loading ? (
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                  disabled
                >
                  <Loader2 className='mr-2 h-5 w-5 animate-spin' />Please Wait
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-101 shadow-lg"
                >
                  Register Company
                </button>
              )
            }

          </div>
        </form>
      </div>

      {
        showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100 overflow-hidden">
              <div className="p-1">
                <div className="bg-gradient-to-r from-green-400 to-teal-500 h-2 w-full"></div>
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="p-6 pt-8">
                  <div className="flex justify-center mb-6">
                    <div className="bg-green-100 rounded-full p-4">
                      <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Company Created Successfully!</h3>
                    <p className="text-gray-600 mb-6">Your company has been created and is now live for posting a job.</p>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setShowModal(false)}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 font-medium"
                      >
                        View Job
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default CompanyRegistrationForm;


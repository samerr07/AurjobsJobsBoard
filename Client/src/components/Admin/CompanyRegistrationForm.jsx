import React, { useState } from 'react';

const CompanyRegistrationForm = () => {
  const [formData, setFormData] = useState({
    company_display_name: '',
    company_website: '',
    company_logo: '',
    industry: '',
    description: ''
  });

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
      if (!formData.company_display_name || !formData.industry) {
        alert('Please fill in required fields');
        return;
      }

      // Here you would typically send the form data to a backend
      console.log('Submitting', formData);
    } catch (error) {
      console.error('Registration error:', error);
    }
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
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              >
                <option value="">Select Industry</option>
                <option value="tech">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
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
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-101 shadow-lg"
            >
              Register Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegistrationForm;


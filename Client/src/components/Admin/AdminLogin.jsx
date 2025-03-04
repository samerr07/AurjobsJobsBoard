import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { setAdminAuthentication, getAdminProfile } from '../redux/adminSlice';
import { ShieldCheck, Eye, EyeOff } from 'lucide-react';
import Logo from '../assets/Aurjobs_Logo.jpg';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
//   const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    // setError(null);

    // try {
    //   // Simulate API call to authenticate admin
    //   // Replace with actual API call
    //   // const response = await fetch('/api/admin/login', {
    //   //   method: 'POST',
    //   //   headers: {
    //   //     'Content-Type': 'application/json',
    //   //   },
    //   //   body: JSON.stringify(formData),
    //   // });
      
    //   // For demo purposes, we'll use hardcoded credentials
    //   // In production, use your actual authentication logic
    //   if (formData.email === 'admin@aurjobs.com' && formData.password === 'admin123') {
    //     // Mock admin profile data
    //     const adminData = {
    //       admin_id: 'admin-001',
    //       admin_name: 'Admin User',
    //       email: formData.email,
    //       role: 'super_admin',
    //       permissions: ['manage_jobs', 'manage_users', 'manage_employers', 'manage_settings']
    //     };

    //     // Set authentication state
    //     dispatch(setAdminAuthentication(true));
    //     dispatch(getAdminProfile(adminData));
        
    //     // Show success message
    //     toast.success('Admin login successful!', {
    //       duration: 3000,
    //       position: 'top-right',
    //       style: {
    //         background: '#4CAF50',
    //         color: 'white',
    //         fontWeight: 'bold',
    //         padding: '16px',
    //         borderRadius: '8px'
    //       }
    //     });
        
    //     // Redirect to admin dashboard
    //     navigate('/admin_dashboard');
    //   } else {
    //     throw new Error('Invalid credentials');
    //   }
    // } catch (error) {
    //   setError(error.message || 'Login failed. Please check your credentials.');
    //   toast.error('Login failed. Please check your credentials.', {
    //     duration: 3000,
    //     position: 'top-right'
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <img src={Logo} alt="Aurjobs Logo" className="h-20 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
          <div className="flex items-center justify-center mt-2 space-x-2">
            <ShieldCheck className="h-5 w-5 text-red-600" />
            <p className="text-sm text-gray-600">
              Restricted access for Aurjobs administrators
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <ShieldCheck className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
              </span>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
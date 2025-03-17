// import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// // import { setAdminAuthentication, getAdminProfile } from '../redux/adminSlice';
// import { ShieldCheck, Eye, EyeOff } from 'lucide-react';
// // import Logo from '../assets/Aurjobs_Logo.jpg';
// import toast from 'react-hot-toast';

// const AdminLogin = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  
// //   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // setLoading(true);
//     // setError(null);

//     // try {
//     //   // Simulate API call to authenticate admin
//     //   // Replace with actual API call
//     //   // const response = await fetch('/api/admin/login', {
//     //   //   method: 'POST',
//     //   //   headers: {
//     //   //     'Content-Type': 'application/json',
//     //   //   },
//     //   //   body: JSON.stringify(formData),
//     //   // });
      
//     //   // For demo purposes, we'll use hardcoded credentials
//     //   // In production, use your actual authentication logic
//     //   if (formData.email === 'admin@aurjobs.com' && formData.password === 'admin123') {
//     //     // Mock admin profile data
//     //     const adminData = {
//     //       admin_id: 'admin-001',
//     //       admin_name: 'Admin User',
//     //       email: formData.email,
//     //       role: 'super_admin',
//     //       permissions: ['manage_jobs', 'manage_users', 'manage_employers', 'manage_settings']
//     //     };

//     //     // Set authentication state
//     //     dispatch(setAdminAuthentication(true));
//     //     dispatch(getAdminProfile(adminData));
        
//     //     // Show success message
//     //     toast.success('Admin login successful!', {
//     //       duration: 3000,
//     //       position: 'top-right',
//     //       style: {
//     //         background: '#4CAF50',
//     //         color: 'white',
//     //         fontWeight: 'bold',
//     //         padding: '16px',
//     //         borderRadius: '8px'
//     //       }
//     //     });
        
//     //     // Redirect to admin dashboard
//     //     navigate('/admin_dashboard');
//     //   } else {
//     //     throw new Error('Invalid credentials');
//     //   }
//     // } catch (error) {
//     //   setError(error.message || 'Login failed. Please check your credentials.');
//     //   toast.error('Login failed. Please check your credentials.', {
//     //     duration: 3000,
//     //     position: 'top-right'
//     //   });
//     // } finally {
//     //   setLoading(false);
//     // }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
//         <div className="flex flex-col items-center">
//           <div className="bg-indigo-100 p-3 rounded-full">
//             <ShieldCheck className="h-10 w-10 text-indigo-600" />
//           </div>
//           <h2 className="mt-4 text-center text-3xl font-bold text-gray-900">
//             Admin Login
//           </h2>
//           <div className="flex items-center justify-center mt-2">
//             <p className="text-sm text-gray-600">
//               Restricted access for Aurjobs administrators
//             </p>
//           </div>
//         </div>

//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r-md">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="admin@aurjobs.com"
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   autoComplete="current-password"
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5" />
//                   ) : (
//                     <Eye className="h-5 w-5" />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 id="remember-me"
//                 name="remember-me"
//                 type="checkbox"
//                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//               />
//               <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                 Remember me
//               </label>
//             </div>

//             <div className="text-sm">
//               <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
//                 Forgot password?
//               </a>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
//                 loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
//               } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 shadow-md`}
//             >
//               <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//                 <ShieldCheck className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200" />
//               </span>
//               {loading ? 'Signing in...' : 'Sign in to Dashboard'}
//             </button>
//           </div>
          
//           <div className="text-center mt-4">
//             <p className="text-xs text-gray-500">
//               By signing in, you agree to the 
//               <a href="#" className="text-indigo-600 hover:text-indigo-500 ml-1">Terms of Service</a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;


import React, { useState } from 'react';
import { ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAdminAuthentication } from '../../redux/adminSlice';

const AdminLogin = () => {
  // State for form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  // State for UI controls
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle remember me checkbox
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  // Mock credentials - in a real app, this would be validated against a server
  const validCredentials = {
    email: 'admin@aurjobs.com',
    password: 'admin123'
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate server request
    setTimeout(() => {
      if (formData.email === validCredentials.email && formData.password === validCredentials.password) {
        // Successful login
        console.log('Login successful');
        // In a real app, you would redirect to the dashboard or set auth state
        // alert('Login successful! Redirecting to dashboard...');
        dispatch(setAdminAuthentication(true));
        navigate("/admin_dashboard")
      } else {
        // Failed login
        setError('Invalid email or password. Please try again.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <div className="bg-indigo-100 p-3 rounded-full">
            <ShieldCheck className="h-10 w-10 text-indigo-600" />
          </div>
          <h2 className="mt-4 text-center text-3xl font-bold text-gray-900">
            Admin Login
          </h2>
          <div className="flex items-center justify-center mt-2">
            <p className="text-sm text-gray-600">
              Restricted access for Aurjobs administrators
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="admin@aurjobs.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="••••••••"
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
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 shadow-md`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <ShieldCheck className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200" />
              </span>
              {loading ? 'Signing in...' : 'Sign in to Dashboard'}
            </button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              By signing in, you agree to the 
              <a href="#" className="text-indigo-600 hover:text-indigo-500 ml-1">Terms of Service</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
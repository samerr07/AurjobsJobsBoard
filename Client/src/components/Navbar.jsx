import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Logo from '../assets/Aurjobs_Logo.jpg';
import { User, LogOut, LayoutDashboard } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidateProfile, setAuthentication } from '../redux/candidateSlice';
import { getEmployerProfile, setEmployerAuthentication } from '../redux/employerSlice';

// const Navbar = () => {

//   const navigate = useNavigate();
//   const { candidateProfile, isAuthenticated } = useSelector((state) => state.candidate)
//   const {isAuthenticated : isEmployerAuthenticated, employerProfile} = useSelector((state)=> state.employer)

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const dispatch = useDispatch()
//   const menuRef = useRef(null)

//   //  console.log(candidateProfile)



//   const handleLogout = () => {

//     dispatch(setAuthentication(false))
//     setIsProfileMenuOpen(false);
//     dispatch(getCandidateProfile(null))
//     dispatch(getEmployerProfile(null))
//     dispatch(setEmployerAuthentication(false))
//     toast.success('Logout successfully!', {
//       duration: 4000,
//       position: 'top-right',
//       style: {
//         background: '#4CAF50',
//         color: 'white',
//         fontWeight: 'bold',
//         padding: '16px',
//         borderRadius: '8px'
//       },
//       iconTheme: {
//         primary: 'white',
//         secondary: '#4CAF50'
//       }
//     });
//     navigate("/")
//   };

//   const AuthButtons = () => {
//     if (!isAuthenticated && !isEmployerAuthenticated) {
//       return (
//         <div className="md:flex space-x-4 gap-4">
//           <Link to="/candidate_register">
//             <button className="bg-transparent border-2 border-indigo-600 rounded-lg px-6 py-2 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300">
//              Get Job
//             </button>
//           </Link>
//           <Link to={"/company_register"}>
//             <button className="px-6 py-2 cursor-pointer hidden lg:block text-white bg-blue-600 rounded-lg font-medium hover:bg-blue-700 transition-colors">
//               Post Job for Free
//             </button>
//           </Link>
//         </div>
//       );
//     }

//     return (
//       <div className="relative"
//       ref={menuRef}
//       onMouseEnter={() => setIsProfileMenuOpen(true)}
//       // onMouseLeave={() => setIsProfileMenuOpen(false)}
//       >
//         <button
//           onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
//           className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
//         >
//           <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
//             <User className="w-5 h-5 text-white" />
//           </div>
//           {
//             isEmployerAuthenticated ? (<span className="hidden md:inline text-gray-700">{employerProfile?.company_display_name}</span>)
//             :(<span className="hidden md:inline text-gray-700">{candidateProfile?.candidate_first_name}</span>)
//           }



//         </button>

//         {/* Profile Dropdown Menu */}
//         {isProfileMenuOpen && (
//           <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
//           onMouseLeave={() => setIsProfileMenuOpen(false)}
//           >

//             <Link
//               // to="/candidate_dashboard"
//               to={isAuthenticated ? "/candidate_dashboard" : "/employer_dashboard"}
//               className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
//             >
//               <User className="w-4 h-4 mr-2" />
//               Profile
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
//             >
//               <LogOut className="w-4 h-4 mr-2" />
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };



//   return (
//     <>
//       <nav className="w-full flex items-center justify-between px-4 md:px-8 py-3 fixed top-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
//         {/* Mobile Menu + Logo */}
//         <div className="flex items-center space-x-4 md:space-x-0">
//           <div
//             className="md:hidden cursor-pointer"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="2"
//               stroke="currentColor"
//               className="w-10 h-10 text-gray-800"
//             >
//               {isMenuOpen ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </svg>
//           </div>

//           <Link to="/" className="flex items-center">
//             <img src={Logo} alt="Aurjobs Logo" className="w-16 h-12 rounded-md" />
//           </Link>
//         </div>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex items-center space-x-1">
//           <li>
//             <Link
//               to="/"
//               className="px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-colors"
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/jobs"
//               className="px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-colors"
//             >
//               Jobs
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/jobs"
//               className="px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-colors"
//             >
//               Services
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/company_register"
//               className="px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-colors"
//             >
//               For Employers
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/pricing"
//               className="px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-colors"
//             >
//               Pricing
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/contact"
//               className="px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-colors"
//             >
//               Contact
//             </Link>
//           </li>
//         </ul>

//         <AuthButtons />
//       </nav>

//       {/* Mobile Navigation */}
//       <div
//         className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
//           } transition-transform duration-300 ease-in-out md:hidden z-40`}
//       >
//         <div className="flex flex-col h-full">
//           <div className="p-4 border-b border-gray-100">
//             <div className="flex items-center justify-between">
//               <Link to="/" className="flex items-center space-x-2">
//                 <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
//                   <span className="text-white font-bold">A</span>
//                 </div>
//                 <span className="text-lg font-semibold text-gray-900">Aurjobs</span>
//               </Link>
//               <button
//                 onClick={() => setIsMenuOpen(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="w-6 h-6 text-gray-700"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           <div className="flex-1 overflow-y-auto">
//             <div className="p-4 space-y-1">
//               <Link
//                 to="/"
//                 className="block px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/jobs"
//                 className="block px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Jobs
//               </Link>
//               <Link
//                 to="/company_register"
//                 className="block px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 For Employers
//               </Link>
//               <Link
//                 to="/pricing"
//                 className="block px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Pricing
//               </Link>
//               <Link
//                 to="/contact"
//                 className="block px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Contact
//               </Link>

//               {/* Additional mobile menu items for logged-in users */}
//               {isAuthenticated && (
//                 <>
//                   <Link
//                     to="/candidate_dashboard"
//                     className="block px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Dashboard
//                   </Link>
//                   <Link
//                     to="/candidate_dashboard"
//                     className="block px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Profile
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>

//           <div className="p-4 border-t border-gray-100">
//             <div className="space-y-3">
//               {isAuthenticated ? (
//                 <button
//                   onClick={handleLogout}
//                   className="block w-full px-3 py-2 text-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium"
//                 >
//                   Logout
//                 </button>
//               ) : (
//                 <Link
//                   to="/signup"
//                   className="block w-full px-3 py-2 text-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Sign up
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Overlay */}
//       {isMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-30"
//           onClick={() => setIsMenuOpen(false)}
//         />
//       )}

//       {/* Profile Menu Overlay */}
//       {isProfileMenuOpen && (
//         <div
//           className="fixed inset-0 z-40"
//           onClick={() => setIsProfileMenuOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Navbar;


const Navbar = () => {
  const navigate = useNavigate();
  const { candidateProfile, isAuthenticated } = useSelector((state) => state.candidate);
  const { isAuthenticated: isEmployerAuthenticated, employerProfile } = useSelector((state) => state.employer);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const servicesRef = useRef(null);
  const servicesTimeoutRef = useRef(null);

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
      servicesTimeoutRef.current = null;
    }
    setIsServicesMenuOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesMenuOpen(false);
    }, 100); // Small delay to prevent flickering
  };

  const handleDropdownMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
      servicesTimeoutRef.current = null;
    }
  };

  const handleDropdownMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesMenuOpen(false);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (servicesTimeoutRef.current) {
        clearTimeout(servicesTimeoutRef.current);
      }
    };
  }, []);

  const handleLogout = () => {
    dispatch(setAuthentication(false));
    setIsProfileMenuOpen(false);
    dispatch(getCandidateProfile(null));
    dispatch(getEmployerProfile(null));
    dispatch(setEmployerAuthentication(false));
    toast.success('Logout successfully!', {
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
    navigate("/");
  };

  // Close dropdown menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setIsServicesMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [servicesRef]);

  const AuthButtons = () => {
    if (!isAuthenticated && !isEmployerAuthenticated) {
      return (
        <div className="md:flex space-x-4 gap-4">
          <Link to="/candidate_register">
            <button className="bg-transparent border-2 border-indigo-600 rounded-lg px-6 py-2 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300">
              Get Job
            </button>
          </Link>
          <Link to={"/company_register"}>
            <button className="px-6 py-2 cursor-pointer hidden lg:block text-white bg-blue-600 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Post Job for Free
            </button>
          </Link>
        </div>
      );
    }

    return (
      <div className="relative"
        ref={menuRef}
        onMouseEnter={() => setIsProfileMenuOpen(true)}
      >
        <button
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          {
            isEmployerAuthenticated ?
              (<span className="hidden md:inline text-gray-700">{employerProfile?.company_display_name}</span>) :
              (<span className="hidden md:inline text-gray-700">{candidateProfile?.candidate_first_name}</span>)
          }
        </button>

        {/* Profile Dropdown Menu */}
        {isProfileMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
            onMouseLeave={() => setIsProfileMenuOpen(false)}
          >
            <Link
              to={isAuthenticated ? "/candidate_dashboard" : "/employer_dashboard"}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    );
  };

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
              to="/jobs"
              className="px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-colors"
            >
              Jobs
            </Link>
          </li>
          {/* <li
            className="relative"
            ref={servicesRef}
            onMouseEnter={() => setIsServicesMenuOpen(true)}
            onMouseLeave={() => setIsServicesMenuOpen(false)}
            // onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
          >
            <button
              className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-colors"
              onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
            >
              Services
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${isServicesMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

          
            {isServicesMenuOpen && (
              <div className="absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100 animate-fadeIn">
                <Link
                  to="/resume-builder"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 group"
                >
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium block">AI Resume Builder</span>
                 
                  </div>
                </Link>
                <Link
                  to="/career-coaching"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 group"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium block">ATS Score Checker</span>
                  
                  </div>
                </Link>
              </div>
            )}
          </li> */}
          <li 
            className="relative" 
            ref={servicesRef}
          >
            <button
              className={`flex items-center px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition-colors ${isServicesMenuOpen ? 'bg-gray-100/80' : ''}`}
              onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              Services
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${isServicesMenuOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Services Dropdown */}
            {isServicesMenuOpen && (
              <div 
                className="absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <Link
                  to="/ai_resume_builder"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 group"
                >
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium block">AI Resume Builder</span>
                   
                  </div>
                </Link>
                <Link
                  to="/ats_score_checker"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 group"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium block">ATS Score Checker</span>
                    {/* <span className="text-xs text-gray-500">Expert advice to advance your career</span> */}
                  </div>
                </Link>
              </div>
            )}
          </li>
          <li>
            <Link
              to="/company_register"
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

        <AuthButtons />
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
                to="/jobs"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Jobs
              </Link>

              {/* Services Dropdown for Mobile */}
              <div className="py-1">
                <div className="px-3 py-2 text-gray-700 font-medium">Services</div>
                <Link
                  to="/resume-builder"
                  className=" pl-8 pr-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-6 h-6 bg-indigo-100 rounded-md flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  AI Resume Builder
                </Link>
                <Link
                  to="/career-coaching"
                  className=" pl-8 pr-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  ATS Score Checker
                </Link>
              </div>

              <Link
                to="/company_register"
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

              {/* Additional mobile menu items for logged-in users */}
              {isAuthenticated && (
                <>
                  <Link
                    to="/candidate_dashboard"
                    className="block px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/candidate_dashboard"
                    className="block px-3 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-gray-100">
            <div className="space-y-3">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="block w-full px-3 py-2 text-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/signup"
                  className="block w-full px-3 py-2 text-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              )}
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

      {/* Profile Menu Overlay */}
      {isProfileMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
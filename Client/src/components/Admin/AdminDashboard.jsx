import React, { useState, useEffect } from 'react';
import JobPost from './JobPost';
import { UserCircle, BriefcaseIcon, ChevronLeft, ChevronRight } from 'lucide-react';
// import EmployerProfile from './section/EmployerProfile';
import { useLocation, useNavigate } from 'react-router-dom';
import CompanyRegistrationForm from './CompanyRegistrationForm';
import RegisteredCompanies from './RegisteredCompanies';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminAuthentication } from '../../redux/adminSlice';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("job_post");
  const [isExpanded, setIsExpanded] = useState(true);
  const { isAdminAuthenticated } = useSelector((state) => state.admin)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const navItems = [
    { id: 'profile', icon: UserCircle, label: 'Company Registraion' },
    { id: 'job_post', icon: BriefcaseIcon, label: 'Job Post' },
    { id: 'registered_company', icon: BriefcaseIcon, label: 'Registered Companies' }
  ];

  const location = useLocation();  // Hook to access location state


  const handleLogout = ()=>{
      dispatch(setAdminAuthentication(false))
      navigate('/admin_login')
  }

  useEffect(() => {
    // Check if the state contains the 'section' and set the active section accordingly
    if (location.state && location.state.section) {
      setActiveSection(location.state.section);
    }
  }, [location.state]);

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate("/admin_login")
    }
  }, [])

  return (
    <div className="flex min-h-screen w-full bg-gray-50 mt-20">

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-20 z-50 
        ${isExpanded ? 'w-64' : 'w-20'} 
        h-screen transition-width duration-300 ease-in-out
        bg-white border-r border-gray-200 shadow-sm`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3 top-1/60 z-50 hidden lg:flex
            items-center justify-center h-6 w-6
            bg-white border border-gray-200 
            rounded-full shadow-sm text-gray-600 
            hover:bg-gray-50 hover:text-gray-900 
            transition-colors"
        >
          {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 p-4 pt-8">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center gap-3 p-3 rounded-lg 
              transition-all duration-200
              ${isExpanded ? 'justify-start' : 'justify-center'}
              ${activeSection === id
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
            >
              <Icon size={24} />
              {isExpanded && <span className="whitespace-nowrap font-medium">{label}</span>}
            </button>
          ))}

          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 p-3 rounded-lg mt-auto
            transition-all duration-200
            ${isExpanded ? 'justify-start' : 'justify-center'}
            text-red-600 hover:bg-red-50 hover:text-red-700`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            {isExpanded && <span className="whitespace-nowrap font-medium">Logout</span>}
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded ? 'ml-64' : 'ml-20'}`}>
        {activeSection === 'profile' && <CompanyRegistrationForm />}
        {activeSection === 'job_post' && <JobPost />}
        {activeSection === 'registered_company' && <RegisteredCompanies />}
      </main>
    </div>
  );
};

export default AdminDashboard;
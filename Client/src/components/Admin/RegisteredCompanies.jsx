// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Building,
//   Briefcase,
//   MapPin,
//   Clock,
//   Search,
//   Filter,
//   ChevronDown,
//   ChevronRight,
//   ExternalLink,
//   Users,
//   Calendar,
//   IndianRupee,
// } from "lucide-react";

// const RegisteredCompanies = () => {
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [industryFilter, setIndustryFilter] = useState("");
//   const [expandedCompanies, setExpandedCompanies] = useState({});

//   const industries = [
//     "All Industries",
//     "Technology",
//     "Healthcare",
//     "Finance",
//     "Education",
//     "Manufacturing",
//     "Retail",
//     "Marketing",
//     "Media & Entertainment",
//     "Real Estate",
//     "Transportation",
//     "Energy",
//     "Construction",
//     "Agriculture",
//     "Hospitality",
//     "Telecommunications",
//     "Consulting",
//     "Aerospace",
//     "Automotive",
//     "Biotechnology",
//     "E-commerce",
//   ];

//   // Mock data - replace with actual API call
//   useEffect(() => {
//     const fetchCompanies = async () => {
//       setLoading(true);
//       try {
//         // In a real app, replace this with actual API call
//         // const response = await axios.get(`${BASEURL}/companies/with-active-jobs`);
//         // setCompanies(response.data);

//         // Mock data for demonstration
//         setTimeout(() => {
//           setCompanies([
//             {
//               id: 1,
//               name: "TechCorp Solutions",
//               logo: "/api/placeholder/120/120",
//               industry: "Technology",
//               location: "Mumbai, India",
//               description: "A leading technology solutions provider specializing in AI and cloud services.",
//               employeeCount: "501-1000",
//               foundedYear: 2010,
//               website: "https://techcorp.example.com",
//               activeJobs: [
//                 {
//                   id: 101,
//                   title: "Senior Frontend Developer",
//                   location: "Mumbai (Hybrid)",
//                   employmentType: "Full-time",
//                   salaryRange: "₹18,00,000 - ₹25,00,000",
//                   postedDate: "2025-02-15",
//                   skills: ["React", "TypeScript", "Tailwind CSS"]
//                 },
//                 {
//                   id: 102,
//                   title: "DevOps Engineer",
//                   location: "Remote",
//                   employmentType: "Full-time",
//                   salaryRange: "₹20,00,000 - ₹30,00,000",
//                   postedDate: "2025-02-28",
//                   skills: ["AWS", "Docker", "Kubernetes", "CI/CD"]
//                 }
//               ]
//             },
//             {
//               id: 2,
//               name: "HealthPlus Medical Systems",
//               logo: "/api/placeholder/120/120",
//               industry: "Healthcare",
//               location: "Bangalore, India",
//               description: "Healthcare technology company that builds innovative solutions for hospitals and clinics.",
//               employeeCount: "201-500",
//               foundedYear: 2015,
//               website: "https://healthplus.example.com",
//               activeJobs: [
//                 {
//                   id: 201,
//                   title: "Medical Software Developer",
//                   location: "Bangalore (On-site)",
//                   employmentType: "Full-time",
//                   salaryRange: "₹15,00,000 - ₹22,00,000",
//                   postedDate: "2025-02-20",
//                   skills: ["Java", "Spring Boot", "FHIR", "Healthcare IT"]
//                 }
//               ]
//             },
//             {
//               id: 3,
//               name: "FinEdge Banking Solutions",
//               logo: "/api/placeholder/120/120",
//               industry: "Finance",
//               location: "Pune, India",
//               description: "Leading financial technology provider with solutions for banking and investment firms.",
//               employeeCount: "1001-5000",
//               foundedYear: 2008,
//               website: "https://finedge.example.com",
//               activeJobs: [
//                 {
//                   id: 301,
//                   title: "Backend Developer",
//                   location: "Pune (Hybrid)",
//                   employmentType: "Full-time",
//                   salaryRange: "₹16,00,000 - ₹24,00,000",
//                   postedDate: "2025-03-01",
//                   skills: ["Node.js", "MongoDB", "Express", "Financial APIs"]
//                 },
//                 {
//                   id: 302,
//                   title: "Financial Data Analyst",
//                   location: "Pune (On-site)",
//                   employmentType: "Full-time",
//                   salaryRange: "₹12,00,000 - ₹18,00,000",
//                   postedDate: "2025-02-25",
//                   skills: ["SQL", "Python", "Data Analysis", "Financial Modeling"]
//                 },
//                 {
//                   id: 303,
//                   title: "UX/UI Designer",
//                   location: "Remote",
//                   employmentType: "Contract",
//                   salaryRange: "₹8,00,000 - ₹15,00,000",
//                   postedDate: "2025-02-18",
//                   skills: ["Figma", "Adobe XD", "User Research", "UI/UX"]
//                 }
//               ]
//             },
//             {
//               id: 4,
//               name: "EduTech Innovations",
//               logo: "/api/placeholder/120/120",
//               industry: "Education",
//               location: "Delhi, India",
//               description: "Educational technology company creating digital learning platforms for schools and universities.",
//               employeeCount: "51-200",
//               foundedYear: 2018,
//               website: "https://edutech.example.com",
//               activeJobs: []
//             }
//           ]);
//           setLoading(false);
//         }, 1000);

//       } catch (err) {
//         console.error("Error fetching companies:", err);
//         setError("Failed to load companies. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchCompanies();
//   }, []);

//   const toggleCompanyExpansion = (companyId) => {
//     setExpandedCompanies(prev => ({
//       ...prev,
//       [companyId]: !prev[companyId]
//     }));
//   };

//   // Filter companies based on search term and industry
//   const filteredCompanies = companies.filter(company => {
//     const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          company.description.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesIndustry = industryFilter === "" || 
//                            industryFilter === "All Industries" || 
//                            company.industry === industryFilter;

//     return matchesSearch && matchesIndustry;
//   });

//   // Format date to display in a more readable format
//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString('en-IN', options);
//   };

//   // Calculate days ago for job posting
//   const getDaysAgo = (dateString) => {
//     const postedDate = new Date(dateString);
//     const today = new Date();
//     const diffTime = Math.abs(today - postedDate);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     if (diffDays === 0) return "Today";
//     if (diffDays === 1) return "Yesterday";
//     return `${diffDays} days ago`;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <h1 className="text-2xl font-bold text-gray-900">Companies & Active Jobs</h1>
//           <p className="mt-1 text-sm text-gray-600">Browse registered companies and their current job openings</p>
//         </div>
//       </div>

//       {/* Search and Filter Section */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div className="relative flex-grow max-w-lg">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 placeholder="Search companies by name or description..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             <div className="flex items-center space-x-2">
//               <Filter className="h-5 w-5 text-gray-500" />
//               <select
//                 className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 value={industryFilter}
//                 onChange={(e) => setIndustryFilter(e.target.value)}
//               >
//                 <option value="">All Industries</option>
//                 {industries.slice(1).map((industry, index) => (
//                   <option key={index} value={industry}>
//                     {industry}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         ) : error ? (
//           <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
//             <div className="flex">
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">{error}</p>
//               </div>
//             </div>
//           </div>
//         ) : filteredCompanies.length === 0 ? (
//           <div className="bg-white shadow rounded-lg p-10 text-center">
//             <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900">No companies found</h3>
//             <p className="mt-1 text-sm text-gray-500">
//               Try adjusting your search or filter criteria.
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             <div className="flex justify-between items-center">
//               <p className="text-sm text-gray-600">
//                 Showing {filteredCompanies.length} {filteredCompanies.length === 1 ? 'company' : 'companies'}
//               </p>
//             </div>

//             {filteredCompanies.map((company) => (
//               <div key={company.id} className="bg-white shadow rounded-lg overflow-hidden">
//                 {/* Company Header */}
//                 <div className="p-6 border-b border-gray-100">
//                   <div className="flex items-start">
//                     <div className="flex-shrink-0">
//                       <img 
//                         src={company.logo} 
//                         alt={`${company.name} logo`} 
//                         className="h-16 w-16 rounded-md object-cover border border-gray-200"
//                       />
//                     </div>
//                     <div className="ml-4 flex-1">
//                       <div className="flex items-center justify-between">
//                         <h2 className="text-xl font-bold text-gray-900">{company.name}</h2>
//                         <button
//                           onClick={() => toggleCompanyExpansion(company.id)}
//                           className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
//                         >
//                           {expandedCompanies[company.id] ? (
//                             <>
//                               <span>Hide Details</span>
//                               <ChevronDown className="h-4 w-4" />
//                             </>
//                           ) : (
//                             <>
//                               <span>Show Details</span>
//                               <ChevronRight className="h-4 w-4" />
//                             </>
//                           )}
//                         </button>
//                       </div>
//                       <div className="mt-1 flex items-center gap-4">
//                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                           {company.industry}
//                         </span>
//                         <span className="text-sm text-gray-500 flex items-center">
//                           <MapPin className="h-4 w-4 mr-1" />
//                           {company.location}
//                         </span>
//                         <span className="text-sm text-gray-500 flex items-center">
//                           <Briefcase className="h-4 w-4 mr-1" />
//                           {company.activeJobs.length} {company.activeJobs.length === 1 ? 'job' : 'jobs'}
//                         </span>
//                       </div>
//                       <p className="mt-2 text-sm text-gray-600">{company.description}</p>
//                     </div>
//                   </div>

//                   {/* Expanded Company Details */}
//                   {expandedCompanies[company.id] && (
//                     <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                       <div className="flex items-center text-gray-700">
//                         <Users className="h-4 w-4 mr-2 text-gray-500" />
//                         <span className="font-medium">Employees:</span>
//                         <span className="ml-2">{company.employeeCount}</span>
//                       </div>
//                       <div className="flex items-center text-gray-700">
//                         <Calendar className="h-4 w-4 mr-2 text-gray-500" />
//                         <span className="font-medium">Founded:</span>
//                         <span className="ml-2">{company.foundedYear}</span>
//                       </div>
//                       <div className="flex items-center text-gray-700">
//                         <ExternalLink className="h-4 w-4 mr-2 text-gray-500" />
//                         <span className="font-medium">Website:</span>
//                         <a 
//                           href={company.website} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="ml-2 text-blue-600 hover:text-blue-800 truncate"
//                         >
//                           {company.website.replace(/(^\w+:|^)\/\//, '')}
//                         </a>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Job Listings */}
//                 <div className="bg-gray-50 px-6 py-4">
//                   <h3 className="text-md font-medium text-gray-900 mb-4">
//                     Active Job Openings ({company.activeJobs.length})
//                   </h3>

//                   {company.activeJobs.length === 0 ? (
//                     <p className="text-sm text-gray-500 italic">No active job openings at this time.</p>
//                   ) : (
//                     <div className="space-y-4">
//                       {company.activeJobs.map((job) => (
//                         <div key={job.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
//                           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//                             <div>
//                               <h4 className="text-lg font-medium text-gray-900 hover:text-blue-600 cursor-pointer">{job.title}</h4>
//                               <div className="mt-1 flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-gray-500">
//                                 <span className="flex items-center">
//                                   <MapPin className="h-4 w-4 mr-1" />
//                                   {job.location}
//                                 </span>
//                                 <span className="flex items-center">
//                                   <Clock className="h-4 w-4 mr-1" />
//                                   {job.employmentType}
//                                 </span>
//                                 <span className="flex items-center">
//                                   <IndianRupee className="h-4 w-4 mr-1" />
//                                   {job.salaryRange}
//                                 </span>
//                               </div>
//                             </div>
//                             <div className="mt-2 md:mt-0">
//                               <span className="text-xs text-gray-500">
//                                 Posted: {getDaysAgo(job.postedDate)}
//                               </span>
//                               <button className="ml-4 md:ml-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition duration-150 ease-in-out">
//                                 View Job
//                               </button>
//                             </div>
//                           </div>

//                           <div className="mt-3 flex flex-wrap gap-2">
//                             {job.skills.map((skill, idx) => (
//                               <span
//                                 key={idx}
//                                 className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
//                               >
//                                 {skill}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RegisteredCompanies;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Building,
    Briefcase,
    MapPin,
    Clock,
    Search,
    Filter,
    ChevronDown,
    ChevronRight,
    ExternalLink,
    Users,
    Calendar,
    Share2,
    Heart,
    Bookmark,
    Star,
    DollarSign,
} from "lucide-react";

// CompaniesPage component
const RegisteredCompanies = () => {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [industryFilter, setIndustryFilter] = useState("");
    const [expandedCompanies, setExpandedCompanies] = useState({});

    const industries = [
        "All Industries",
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

    // Mock data - replace with actual API call
    useEffect(() => {
        const fetchCompanies = async () => {
            setLoading(true);
            try {
                // In a real app, replace this with actual API call
                // const response = await axios.get(`${BASEURL}/companies/with-active-jobs`);
                // setCompanies(response.data);

                // Mock data for demonstration
                setTimeout(() => {
                    setCompanies([
                        {
                            id: 1,
                            name: "TechCorp Solutions",
                            logo: "/api/placeholder/120/120",
                            industry: "Technology",
                            location: "Mumbai, India",
                            description: "A leading technology solutions provider specializing in AI and cloud services.",
                            employeeCount: "501-1000",
                            foundedYear: 2010,
                            website: "https://techcorp.example.com",
                            rating: 4.5,
                            activeJobs: [
                                {
                                    id: 101,
                                    title: "Senior Frontend Developer",
                                    location: "Mumbai (Hybrid)",
                                    employmentType: "Full-time",
                                    salaryRange: "₹18,00,000 - ₹25,00,000",
                                    postedDate: "2025-02-15",
                                    skills: ["React", "TypeScript", "Tailwind CSS"]
                                },
                                {
                                    id: 102,
                                    title: "DevOps Engineer",
                                    location: "Remote",
                                    employmentType: "Full-time",
                                    salaryRange: "₹20,00,000 - ₹30,00,000",
                                    postedDate: "2025-02-28",
                                    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"]
                                }
                            ]
                        },
                        {
                            id: 2,
                            name: "HealthPlus Medical Systems",
                            logo: "/api/placeholder/120/120",
                            industry: "Healthcare",
                            location: "Bangalore, India",
                            description: "Healthcare technology company that builds innovative solutions for hospitals and clinics.",
                            employeeCount: "201-500",
                            foundedYear: 2015,
                            website: "https://healthplus.example.com",
                            rating: 4.2,
                            activeJobs: [
                                {
                                    id: 201,
                                    title: "Medical Software Developer",
                                    location: "Bangalore (On-site)",
                                    employmentType: "Full-time",
                                    salaryRange: "₹15,00,000 - ₹22,00,000",
                                    postedDate: "2025-02-20",
                                    skills: ["Java", "Spring Boot", "FHIR", "Healthcare IT"]
                                }
                            ]
                        },
                        {
                            id: 3,
                            name: "FinEdge Banking Solutions",
                            logo: "/api/placeholder/120/120",
                            industry: "Finance",
                            location: "Pune, India",
                            description: "Leading financial technology provider with solutions for banking and investment firms.",
                            employeeCount: "1001-5000",
                            foundedYear: 2008,
                            website: "https://finedge.example.com",
                            rating: 4.7,
                            activeJobs: [
                                {
                                    id: 301,
                                    title: "Backend Developer",
                                    location: "Pune (Hybrid)",
                                    employmentType: "Full-time",
                                    salaryRange: "₹16,00,000 - ₹24,00,000",
                                    postedDate: "2025-03-01",
                                    skills: ["Node.js", "MongoDB", "Express", "Financial APIs"]
                                },
                                {
                                    id: 302,
                                    title: "Financial Data Analyst",
                                    location: "Pune (On-site)",
                                    employmentType: "Full-time",
                                    salaryRange: "₹12,00,000 - ₹18,00,000",
                                    postedDate: "2025-02-25",
                                    skills: ["SQL", "Python", "Data Analysis", "Financial Modeling"]
                                },
                                {
                                    id: 303,
                                    title: "UX/UI Designer",
                                    location: "Remote",
                                    employmentType: "Contract",
                                    salaryRange: "₹8,00,000 - ₹15,00,000",
                                    postedDate: "2025-02-18",
                                    skills: ["Figma", "Adobe XD", "User Research", "UI/UX"]
                                }
                            ]
                        },
                        {
                            id: 4,
                            name: "EduTech Innovations",
                            logo: "/api/placeholder/120/120",
                            industry: "Education",
                            location: "Delhi, India",
                            description: "Educational technology company creating digital learning platforms for schools and universities.",
                            employeeCount: "51-200",
                            foundedYear: 2018,
                            website: "https://edutech.example.com",
                            rating: 3.9,
                            activeJobs: []
                        }
                    ]);
                    setLoading(false);
                }, 1000);

            } catch (err) {
                console.error("Error fetching companies:", err);
                setError("Failed to load companies. Please try again later.");
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    const toggleCompanyExpansion = (companyId) => {
        setExpandedCompanies(prev => ({
            ...prev,
            [companyId]: !prev[companyId]
        }));
    };

    // Filter companies based on search term and industry
    const filteredCompanies = companies.filter(company => {
        const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesIndustry = industryFilter === "" ||
            industryFilter === "All Industries" ||
            company.industry === industryFilter;

        return matchesSearch && matchesIndustry;
    });

    // Navigate to jobs page for a specific company
    const navigateToCompanyJobs = (companyId) => {
        navigate(`/admin_dashboard/companies/${companyId}/jobs`);
    };

    // Render star rating component
   

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h1 className="text-3xl font-bold">Discover Top Companies</h1>
                    

                    {/* Search and Filter Section */}
                    <div className="mt-8 bg-white rounded-lg shadow-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block text-black w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Search companies by name or description..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center space-x-2 min-w-[200px]">
                                <Filter className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                <select
                                    className="block text-black w-full pl-3 pr-10 py-3 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    value={industryFilter}
                                    onChange={(e) => setIndustryFilter(e.target.value)}
                                >
                                    <option value="">All Industries</option>
                                    {industries.slice(1).map((industry, index) => (
                                        <option key={index} value={industry}>
                                            {industry}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        <p className="ml-3 text-lg text-gray-700">Loading companies...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                ) : filteredCompanies.length === 0 ? (
                    <div className="bg-white shadow rounded-lg p-10 text-center">
                        <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No companies found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Try adjusting your search or filter criteria.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-600">
                                Showing {filteredCompanies.length} {filteredCompanies.length === 1 ? 'company' : 'companies'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {filteredCompanies.map((company) => (
                                <div key={company.id} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                                    {/* Company Header */}
                                    <div className="p-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={company.logo}
                                                    alt={`${company.name} logo`}
                                                    className="h-20 w-20 rounded-lg object-cover border border-gray-200 shadow-sm"
                                                />
                                            </div>
                                            <div className="ml-5 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h2 className="text-xl font-bold text-gray-900">{company.name}</h2>
                                                    {/* <div className="flex space-x-2">
                                                        <button className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100">
                                                            <Bookmark className="h-5 w-5" />
                                                        </button>
                                                        <button className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100">
                                                            <Share2 className="h-5 w-5" />
                                                        </button>
                                                    </div> */}
                                                </div>
                                                <div className="mt-1 flex items-center gap-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {company.industry}
                                                    </span>
                                                    <span className="text-sm text-gray-500 flex items-center">
                                                        <MapPin className="h-4 w-4 mr-1" />
                                                        {company.location}
                                                    </span>
                                                    
                                                </div>
                                                <div className="mt-1 flex items-center">
                                                    <span className="text-sm text-gray-500 flex items-center">
                                                        <Briefcase className="h-4 w-4 mr-1" />
                                                        <span className="font-medium text-blue-600">{company.activeJobs.length}</span> active {company.activeJobs.length === 1 ? 'job' : 'jobs'}
                                                    </span>
                                                </div>
                                                <p className="mt-3 text-sm text-gray-600 line-clamp-2">{company.description}</p>

                                                <div className="mt-4 flex justify-between items-center">
                                                    <button
                                                        onClick={() => toggleCompanyExpansion(company.id)}
                                                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
                                                    >
                                                        {expandedCompanies[company.id] ? (
                                                            <>
                                                                <span>Hide Details</span>
                                                                <ChevronDown className="h-4 w-4" />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span>Show Details</span>
                                                                <ChevronRight className="h-4 w-4" />
                                                            </>
                                                        )}
                                                    </button>

                                                    {company.activeJobs.length > 0 && (
                                                        <button
                                                            onClick={() => navigateToCompanyJobs(company.id)}
                                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition duration-150 ease-in-out flex items-center"
                                                        >
                                                            <Briefcase className="h-4 w-4 mr-2" />
                                                            View Jobs
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Expanded Company Details */}
                                        {expandedCompanies[company.id] && (
                                            <div className="mt-6 pt-4 border-t border-gray-100">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                                                    <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
                                                        <Users className="h-5 w-5 mr-3 text-blue-500" />
                                                        <div>
                                                            <p className="font-medium text-gray-500">Employees</p>
                                                            <p className="font-semibold">{company.employeeCount}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
                                                        <Calendar className="h-5 w-5 mr-3 text-blue-500" />
                                                        <div>
                                                            <p className="font-medium text-gray-500">Founded</p>
                                                            <p className="font-semibold">{company.foundedYear}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
                                                        <ExternalLink className="h-5 w-5 mr-3 text-blue-500" />
                                                        <div>
                                                            <p className="font-medium text-gray-500">Website</p>
                                                            <a
                                                                href={company.website}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="font-semibold text-blue-600 hover:text-blue-800 truncate"
                                                            >
                                                                {company.website.replace(/(^\w+:|^)\/\//, '')}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisteredCompanies;

// JobsPage component - this will be a separate page showing jobs for a specific company

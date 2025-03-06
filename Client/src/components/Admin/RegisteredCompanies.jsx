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
import axios from "axios";
import { BASEURL } from "../../utility/config";

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
                const res = await axios.get(`${BASEURL}/external_jobs/external_companies_details`);
                if (res?.data?.success) {
                    setCompanies(res?.data?.companies);
                    console.log("Companies loaded:", res?.data?.companies);
                    setLoading(false);
                }

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
        const matchesSearch = company.company_display_name
            .toLowerCase().includes(searchTerm.toLowerCase()) ||
            company?.description.toLowerCase().includes(searchTerm.toLowerCase());

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
                                                    src={company.company_logo}
                                                    alt={`${company.company_display_name} logo`}
                                                    className="h-20 w-20 rounded-lg object-cover border border-gray-200 shadow-sm"
                                                />
                                            </div>
                                            <div className="ml-5 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h2 className="text-xl font-bold text-gray-900">{company.company_display_name}</h2>
                                                    
                                                </div>
                                                <div className="mt-1 flex items-center gap-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {company.industry}
                                                    </span>
                                                    {/* <span className="text-sm text-gray-500 flex items-center">
                                                        <MapPin className="h-4 w-4 mr-1" />
                                                        {company.location}
                                                    </span> */}

                                                </div>
                                                {/* <div className="mt-1 flex items-center">
                                                    <span className="text-sm text-gray-500 flex items-center">
                                                        <Briefcase className="h-4 w-4 mr-1" />
                                                        <span className="font-medium text-blue-600">{company.activeJobs.length}</span> active {company.activeJobs.length === 1 ? 'job' : 'jobs'}
                                                    </span>
                                                </div> */}
                                                <p className="mt-3 text-sm text-gray-600 line-clamp-2">{company.description}</p>

                                                <div className="mt-4 flex justify-between items-center">
                                                    <button
                                                        onClick={() => toggleCompanyExpansion(company.employer_id )}
                                                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
                                                    >
                                                        {expandedCompanies[company.employer_id] ? (
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

                                                    {/* {company.activeJobs.length > 0 && (
                                                        <button
                                                            onClick={() => navigateToCompanyJobs(company.employer_id)}
                                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition duration-150 ease-in-out flex items-center"
                                                        >
                                                            <Briefcase className="h-4 w-4 mr-2" />
                                                            View Jobs
                                                        </button>
                                                    )} */}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Expanded Company Details */}
                                        {expandedCompanies[company.id] && (
                                            <div className="mt-6 pt-4 border-t border-gray-100">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                                                    {/* <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
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
                                                    </div> */}
                                                    <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
                                                        <ExternalLink className="h-5 w-5 mr-3 text-blue-500" />
                                                        <div>
                                                            <p className="font-medium text-gray-500">Website</p>
                                                            <a
                                                                href={company.company_website}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="font-semibold text-blue-600 hover:text-blue-800 truncate"
                                                            >
                                                                {company.company_website.replace(/(^\w+:|^)\/\//, '')}
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

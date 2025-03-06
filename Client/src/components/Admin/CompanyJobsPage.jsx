// import { Briefcase, Calendar, ChevronRight, Clock, DollarSign, ExternalLink, MapPin } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
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

const CompanyJobsPage = () => {
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // In a real application, you would extract the companyId from the URL using React Router
    // const { companyId } = useParams();
    const companyId = 1; // For demonstration purposes

    useEffect(() => {
        const fetchCompanyWithJobs = async () => {
            setLoading(true);
            try {
                // In a real app, replace this with actual API call
                // const response = await axios.get(`${BASEURL}/companies/${companyId}`);
                // setCompany(response.data);

                // Mock data for demonstration
                setTimeout(() => {
                    setCompany({
                        id: 1,
                        name: "TechCorp Solutions",
                        logo: "/api/placeholder/120/120",
                        industry: "Technology",
                        location: "Mumbai, India",
                        description: "A leading technology solutions provider specializing in AI and cloud services.",
                        employeeCount: "501-1000",
                        foundedYear: 2010,
                        website: "https://techcorp.example.com",
                        activeJobs: [
                            {
                                id: 101,
                                title: "Senior Frontend Developer",
                                location: "Mumbai (Hybrid)",
                                employmentType: "Full-time",
                                salaryRange: "₹18,00,000 - ₹25,00,000",
                                postedDate: "2025-02-15",
                                skills: ["React", "TypeScript", "Tailwind CSS"],
                                description: "We are looking for a skilled Frontend Developer with experience in React to join our growing product team. The ideal candidate will have a strong understanding of modern frontend technologies and best practices.",
                                responsibilities: [
                                    "Develop and maintain web applications using React and TypeScript",
                                    "Collaborate with UX/UI designers to implement responsive designs",
                                    "Write clean, reusable, and well-documented code",
                                    "Optimize applications for maximum performance"
                                ],
                                requirements: [
                                    "3+ years of experience with React",
                                    "Proficiency in TypeScript and modern JavaScript",
                                    "Experience with CSS frameworks like Tailwind",
                                    "Knowledge of state management solutions",
                                    "Good understanding of frontend performance optimization"
                                ]
                            },
                            {
                                id: 102,
                                title: "DevOps Engineer",
                                location: "Remote",
                                employmentType: "Full-time",
                                salaryRange: "₹20,00,000 - ₹30,00,000",
                                postedDate: "2025-02-28",
                                skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
                                description: "We're seeking an experienced DevOps Engineer to help us build and maintain our cloud infrastructure. In this role, you will be responsible for deployment automation, infrastructure management, and ensuring system reliability.",
                                responsibilities: [
                                    "Design and implement CI/CD pipelines",
                                    "Manage and optimize AWS infrastructure",
                                    "Implement and maintain container orchestration using Kubernetes",
                                    "Collaborate with development teams to improve deployment processes",
                                    "Monitor system performance and troubleshoot issues"
                                ],
                                requirements: [
                                    "4+ years of experience in DevOps or SRE roles",
                                    "Strong knowledge of AWS services",
                                    "Experience with Docker and Kubernetes",
                                    "Proficiency in scripting languages (Python, Bash)",
                                    "Understanding of infrastructure as code (Terraform, CloudFormation)",
                                    "Experience with monitoring and logging tools"
                                ]
                            }
                        ]
                    });
                    setLoading(false);
                }, 1000);

            } catch (err) {
                console.error("Error fetching company jobs:", err);
                setError("Failed to load company jobs. Please try again later.");
                setLoading(false);
            }
        };

        fetchCompanyWithJobs();
    }, [companyId]);

    // Calculate days ago for job posting
    const getDaysAgo = (dateString) => {
        const postedDate = new Date(dateString);
        const today = new Date();
        const diffTime = Math.abs(today - postedDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        return `${diffDays} days ago`;
    };

    return (
        <div className="min-h-screen mt-20 bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <button
                        onClick={() => navigate("/companies")}
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center mb-4"
                    >
                        <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                        Back to Companies
                    </button>

                    {loading ? (
                        <div className="h-20 flex items-center">
                            <div className="animate-pulse h-8 w-1/3 bg-gray-200 rounded"></div>
                        </div>
                    ) : error ? (
                        <h1 className="text-2xl font-bold text-gray-900">Company Jobs</h1>
                    ) : (
                        <div className="flex items-center">
                            <img
                                src={company.logo}
                                alt={`${company.name} logo`}
                                className="h-16 w-16 rounded-lg object-cover border border-gray-200 shadow-sm mr-4"
                            />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
                                <div className="mt-1 flex items-center gap-3">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {company.industry}
                                    </span>
                                    <span className="text-sm text-gray-500 flex items-center">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        {company.location}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Company Brief Overview */}
            {!loading && !error && company && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <p className="text-gray-700">{company.description}</p>
                            <div className="flex flex-shrink-0 space-x-4">
                                <a
                                    href={company.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                                >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Visit Website
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        <p className="ml-3 text-lg text-gray-700">Loading jobs...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            Job Openings ({company.activeJobs.length})
                        </h2>

                        {company.activeJobs.length === 0 ? (
                            <div className="bg-white shadow rounded-lg p-10 text-center">
                                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">No active job openings</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    This company doesn't have any active job postings at the moment.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {company.activeJobs.map((job) => (
                                    <div key={job.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                                        <div className="p-6">
                                            <div className="flex justify-between">
                                                <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                                                <div className="flex items-center space-x-2">
                                                    <button className="text-gray-400 hover:text-blue-600">
                                                        <Bookmark className="h-5 w-5" />
                                                    </button>
                                                    <button className="text-gray-400 hover:text-red-500">
                                                        <Heart className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-3 grid grid-cols-2 gap-3">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                                                    {job.location}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                                                    {job.employmentType}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
                                                    {job.salaryRange}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                                                    Posted {getDaysAgo(job.postedDate)}
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-sm text-gray-600 line-clamp-3">{job.description}</p>
                                            </div>

                                            <div className="mt-4">
                                                <div className="text-xs font-medium uppercase text-gray-500">
                                                    <div className="text-xs font-medium uppercase text-gray-500 mb-2">Skills</div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {job.skills.map((skill, index) => (
                                                            <span
                                                                key={index}
                                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                
                                            </div>
                                        </div>
                
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}  
            </div>
        </div>
    );
};




export default CompanyJobsPage

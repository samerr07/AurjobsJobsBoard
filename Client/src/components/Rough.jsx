import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
    Search,
    MapPin,
    Briefcase,
    Filter,
    CheckCircle2,
    XCircle,
    ChevronDown,
     X
} from 'lucide-react';
import JobCard from './JobCard';
import axios from 'axios';
import { BASEURL } from '../utility/config';


const Rough = () => {
    const filterCategories = [
        {
            title: "Industry",
            options: [
                { label: "Technology", checked: false },
                { label: "Design", checked: false },
                { label: "Science", checked: false },
                { label: "Business", checked: false },
                { label: "Finance", checked: false },
                { label: "Marketing", checked: false }
            ]
        },
        {
            title: "Experience",
            options: [
                { label: "0-2 years", checked: false },
                { label: "3-5 years", checked: false },
                { label: "6-8 years", checked: false },
                { label: "9+ years", checked: false }
            ]
        }
    ];

    const sortOptions = [
        { value: 'posted_at', label: 'Most Recent' },
        { value: 'company_az', label: 'Company (A-Z)' },
        { value: 'company_za', label: 'Company (Z-A)' },
        { value: 'salary_high_low', label: 'Salary (High to Low)' }
    ];

    // State management
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        searchTerm: '',
        workMode: 'all',
        employmentType: 'all',
        salaryRange: 0,
        categories: [...filterCategories]
    });
    const [sortBy, setSortBy] = useState('posted_at');
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const [salaryRange, setSalaryRange] = useState(0);

    const handleFilterChange = (filterType, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: value
        }));
    };

    const parseSalaryString = (salaryString) => {
        if (!salaryString) return [0, 0]; // Return default values if salary is undefined or null
        
        try {
            const numbers = salaryString.replace(/[^0-9-]/g, '')
                .split('-')
                .map(num => parseInt(num.trim()));
            return numbers.length >= 2 ? [numbers[0], numbers[1]] : [0, 0];
        } catch (error) {
            console.warn('Error parsing salary:', error);
            return [0, 0];
        }
    };

    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:3000/jobs_post/jobs', {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            setJobs(response.data);
            setLoading(false);
        } catch (err) {
            // setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleWorkModeChange = (e) => {
        handleFilterChange('workMode', e.target.value);
    };

    const handleEmploymentTypeChange = (e) => {
        handleFilterChange('employmentType', e.target.value);
    };

    const toggleOption = (categoryIndex, optionIndex) => {
        const newFilters = { ...filters };
        newFilters.categories[categoryIndex].options[optionIndex].checked =
            !newFilters.categories[categoryIndex].options[optionIndex].checked;
        setFilters(newFilters);
    };

    const clearAll = () => {
        setFilters({
            searchTerm: "",
            workMode: 'all',
            employmentType: 'all',
            salaryRange: 0,
            categories: filterCategories.map(category => ({
                ...category,
                options: category.options.map(option => ({ ...option, checked: false }))
            }))
        });
        setSalaryRange(0);
    };

    const sortedJobs = useMemo(() => {
        if (!jobs.length) return [];

        const jobsCopy = [...jobs];

        switch (sortBy) {
            case 'posted_at':
                return jobsCopy.sort((a, b) => new Date(b.posted_at) - new Date(a.posted_at));
            case 'company_az':
                return jobsCopy.sort((a, b) => a.company_display_name.localeCompare(b.company_display_name));
            case 'company_za':
                return jobsCopy.sort((a, b) => b.company_display_name.localeCompare(a.company_display_name));
            case 'salary_high_low':
                return jobsCopy.sort((a, b) => {
                    const [aMin] = parseSalaryString(a.salary_range);
                    const [bMin] = parseSalaryString(b.salary_range);
                    return bMin - aMin;
                });
            default:
                return jobsCopy;
        }
    }, [jobs, sortBy]);

    // const filteredJobs = useMemo(() => {
    //     return sortedJobs.filter(job => {
    //         // Search term filter
    //         if (filters.searchTerm) {
    //             const searchTerm = filters.searchTerm.toLowerCase();
    //             const searchableFields = [
    //                 job.job_title,
    //                 job.job_location,
    //                 job.company_display_name,
    //                 job.job_description
    //             ].map(field => field?.toLowerCase());

    //             if (!searchableFields.some(field => field?.includes(searchTerm))) {
    //                 return false;
    //             }
    //         }

    //         // Work mode filter
    //         if (filters.workMode !== 'all' && 
    //             job?.work_mode.toLowerCase() !== filters.workMode.toLowerCase()) {
    //             return false;
    //         }

    //         // Employment type filter
    //         if (filters.employmentType !== 'all' && 
    //             job.employment_type.toLowerCase() !== filters.employmentType.toLowerCase()) {
    //             return false;
    //         }

    //         // Salary range filter
    //         const [minSalary] = parseSalaryString(job.salary_range);
    //         if (salaryRange > 0 && minSalary < salaryRange) {
    //             return false;
    //         }

    //         // Industry filter
    //         const selectedIndustries = filters.categories[0].options.filter(opt => opt.checked);
    //         if (selectedIndustries.length > 0 && 
    //             !selectedIndustries.some(industry => 
    //                 industry.label.toLowerCase() === job.industry.toLowerCase())) {
    //             return false;
    //         }

    //         return true;
    //     });
    // }, [sortedJobs, filters, salaryRange]);
    const matchesExperienceFilter = (jobExperience, selectedExperiences) => {
        if (selectedExperiences.length === 0) return true;

        const years = parseInt(jobExperience);
        return selectedExperiences.some(exp => {
            const [min, max] = exp.label.split('-').map(num => parseInt(num));
            if (exp.label.includes('+')) {
                return years >= parseInt(exp.label);
            }
            return years >= min && years <= max;
        });
    };

    const filteredJobs = useMemo(() => {
        return sortedJobs.filter(job => {
            // Search term filter
            if (filters.searchTerm) {
                const searchTerm = filters.searchTerm.toLowerCase();
                const searchableFields = [
                    job.job_title,
                    job.job_location,
                    job.company_display_name,
                    job.job_description
                ].filter(Boolean); // Remove null/undefined values
    
                const searchableText = searchableFields
                    .map(field => field.toLowerCase())
                    .join(' ');
    
                if (!searchableText.includes(searchTerm)) {
                    return false;
                }
            }
    
            // Work mode filter
            if (filters.workMode !== 'all' && job.work_mode) {
                if (job.work_mode.toLowerCase() !== filters.workMode.toLowerCase()) {
                    return false;
                }
            }
    
            // Employment type filter
            if (filters.employmentType !== 'all' && job.employment_type) {
                if (job.employment_type.toLowerCase() !== filters.employmentType.toLowerCase()) {
                    return false;
                }
            }
    
            // Salary range filter
            if (salaryRange > 0 && job.salary_range) {
                const [minSalary] = parseSalaryString(job.salary_range);
                if (minSalary < salaryRange) {
                    return false;
                }
            }

            const selectedExperiences = filters.categories[1].options.filter(opt => opt.checked);
            if (!matchesExperienceFilter(job.experience, selectedExperiences)) {
                return false;
            }
    
            // Industry filter
            const selectedIndustries = filters.categories[0].options.filter(opt => opt.checked);
            if (selectedIndustries.length > 0 && job.industry) {
                if (!selectedIndustries.some(industry => 
                    industry.label.toLowerCase() === job.industry.toLowerCase())) {
                    return false;
                }
            }
    
            return true;
        });
    }, [sortedJobs, filters, salaryRange]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-16">
            {/* Header filters */}
            <div className="bg-gradient-to-br from-indigo-50 to-white shadow-md mb-1 p-4 lg:p-7 border border-indigo-100">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
                        {/* Search Input */}
                        <div className="group">
                            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-indigo-100 
                                transition-all duration-300 hover:shadow-md hover:border-indigo-300
                                group-focus-within:ring-2 group-focus-within:ring-indigo-500">
                                <Search className="w-5 h-5 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search jobs, skills, or locations..."
                                    className="bg-transparent outline-none w-full text-gray-800 font-medium 
                                    placeholder-gray-400 hover:text-indigo-700"
                                    value={filters.searchTerm || ''}
                                    onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                                />
                                {filters.searchTerm && (
                                    <button
                                        onClick={() => handleFilterChange('searchTerm', '')}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Work Mode Filter */}
                        <div className="group">
                            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-indigo-100 
                                transition-all duration-300 hover:shadow-md hover:border-indigo-300
                                group-focus-within:ring-2 group-focus-within:ring-indigo-500">
                                <MapPin className="w-5 h-5 text-green-500 group-hover:text-green-600 transition-colors" />
                                <select
                                    className="bg-transparent outline-none w-full text-gray-800 font-medium 
                                    placeholder-gray-400 hover:text-green-700"
                                    value={filters.workMode}
                                    onChange={handleWorkModeChange}
                                >
                                    <option value="all">All Work Modes</option>
                                    <option value="remote">Remote</option>
                                    <option value="hybrid">Hybrid</option>
                                    <option value="onsite">On-site</option>
                                </select>
                            </div>
                        </div>

                        {/* Employment Type Filter */}
                        <div className="group">
                            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-indigo-100 
                                transition-all duration-300 hover:shadow-md hover:border-indigo-300
                                group-focus-within:ring-2 group-focus-within:ring-indigo-500">
                                <Briefcase className="w-5 h-5 text-purple-500 group-hover:text-purple-600 transition-colors" />
                                <select
                                    className="bg-transparent outline-none w-full text-gray-800 font-medium 
                                    placeholder-gray-400 hover:text-purple-700"
                                    value={filters.employmentType}
                                    onChange={handleEmploymentTypeChange}
                                >
                                    <option value="all">All Employment Types</option>
                                    <option value="full-time">Full-time</option>
                                    <option value="part-time">Part-time</option>
                                    <option value="contract">Contract</option>
                                    <option value="internship">Internship</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Salary Range Slider */}
                    <div className="w-full lg:w-72">
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between text-sm text-gray-700">
                                <span className="font-semibold">Salary Range</span>
                                <span className="font-bold text-indigo-600">
                                    ${salaryRange.toLocaleString()} - $200,000
                                </span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="200000"
                                step="10000"
                                value={salaryRange}
                                onChange={(e) => setSalaryRange(Number(e.target.value))}
                                className="w-full h-2.5 bg-indigo-100 rounded-full appearance-none cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-12">
                {/* Sidebar filters */}
                <div className="w-full lg:w-72">
                    <div className="bg-gradient-to-br from-indigo-50 to-white p-4 lg:p-6 border border-indigo-100 rounded-lg shadow-sm">
                        <div
                            className="flex items-center justify-between mb-6 cursor-pointer"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            <div className="flex items-center gap-3">
                                <Filter className="w-6 h-6 text-indigo-600" />
                                <h3 className="font-bold text-xl text-gray-800">Job Filters</h3>
                            </div>
                            <ChevronDown className={`w-5 h-5 text-gray-500 hover:text-indigo-600 transform transition-transform duration-300 
                                ${isFilterOpen ? '' : '-rotate-180'}`}
                            />
                        </div>

                        {/* Filter Content */}
                        <div className={`transition-all duration-300 ease-in-out overflow-hidden
                            ${isFilterOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            {filters.categories.map((category, categoryIndex) => (
                                <div key={categoryIndex} className="mb-6 group">
                                    <h4 className="text-gray-600 mb-4 font-semibold text-sm uppercase tracking-wider">
                                        {category.title}
                                    </h4>
                                    <div className="space-y-3">
                                        {category.options.map((option, optionIndex) => (
                                            <label
                                                key={optionIndex}
                                                className="flex items-center gap-3 group cursor-pointer"
                                                onClick={() => toggleOption(categoryIndex, optionIndex)}
                                            >
                                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300
                                                    ${option.checked
                                                        ? 'bg-indigo-600 border-indigo-600'
                                                        : 'border-gray-300 bg-white group-hover:border-indigo-400'}`}
                                                >
                                                    {option.checked && <CheckCircle2 className="w-4 h-4 text-white" />}
                                                </div>
                                                <span className={`text-sm transition-colors
                                                    ${option.checked
                                                        ? 'text-indigo-700 font-semibold'
                                                        : 'text-gray-700 group-hover:text-indigo-600'}`}
                                                >
                                                    {option.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* Filter Actions */}
                            <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                                <button
                                    onClick={clearAll}
                                    className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                                >
                                    <XCircle className="w-5 h-5" />
                                    Clear All
                                </button>
                                <button
                                    onClick={() => handleFilterChange('applyFilters', true)}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job listings */}
                <div className="flex-1 max-h-screen overflow-y-auto [&::-webkit-scrollbar]:hidden">
                    <div className="flex items-center justify-between mb-6 sticky top-0 bg-gray-50 z-10 p-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold">Available Jobs</h2>
                            <span className="bg-gray-200 px-3 py-0.5 rounded-full text-sm">
                                {filteredJobs.length}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-sm hidden sm:inline">Sort by:</span>
                            <select
                                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium 
                                    hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                {sortOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map(job => (
                            <JobCard 
                                key={job.job_id} 
                                job={job} 
                            />
                        ))}
                    </div>

                    {filteredJobs.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No jobs found matching your criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Rough;
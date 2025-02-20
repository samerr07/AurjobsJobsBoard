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
import JobCard from '../components/JobCard';
import axios from 'axios';
import { BASEURL } from '../utility/config';

const JobsPage = () => {

   
    const filterCategories = [
        {
            title: "Salary Range",
            options: [
                { label: "Technology", checked: false },
                { label: "Design", checked: false },
                { label: "Science", checked: false },
                { label: "Business", checked: false },
                { label: "Finance", checked: false },
                { label: "Marketing", checked: false },
                { label: "Customer Service", checked: false },
                { label: "Human Resource", checked: false }
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
        },
    ];

    const sortOptions = [
        { value: 'lastUpdated', label: 'Most Recent' },
        { value: 'companyAZ', label: 'Company (A-Z)' },
        { value: 'companyZA', label: 'Company (Z-A)' },
        { value: 'salaryHighToLow', label: 'Salary (High to Low)' }
    ];

    // State management
    const [jobs, setJobs] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        searchTerm: '',
        jobTitle: 'all',
        workMode: 'all',
        industryType: 'all',
        workType: 'all',
        salaryRange: 0,
        categories: [...filterCategories]
    });
    const [sortBy, setSortBy] = useState('lastUpdated');
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const [salaryRange, setSalaryRange] = useState(0);

    const handleFilterChange = (filterType, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: value
        }));
    };
    // const parseSalaryString = (salaryString) => {
    //     // Extract numbers from strings like "$120,000 - $150,000/year"
    //     const numbers = salaryString.replace(/[^0-9-]/g, '')
    //         .split('-')
    //         .map(num => parseInt(num.trim()));

    //     // Return [minSalary, maxSalary]
    //     return numbers.length >= 2 ? [numbers[0], numbers[1]] : [0, 0];
    // };

    const fetchAllJobs = async()=>{
        try{
            console.log("APi calling initated")
            const res = await axios.get(`${BASEURL}/jobs_post/jobs`, {
                headers: {
                  "Content-Type": "application/json"
                },
                withCredentials: true
        })
            console.log("Api called")
           
                console.log(res?.data)
                setJobs(res?.data);
                
            
        }catch(err){
            console.log(err)
        }
    }

    // Load initial jobs
    useEffect(() => {
        fetchAllJobs()
        
        setLoading(false);
    }, []);

    // Event handlers
    const handleWorkModeChange = (e) => {
        handleFilterChange('workMode', e.target.value);
    };

    const handleWorkTypeChange = (e) => {
        handleFilterChange('workType', e.target.value);
    };

    const handleIndustryTypeChange = (e)=>{
        handleFilterChange('industryType', e.target.value);
    }

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };


    

    const toggleOption = (categoryIndex, optionIndex) => {
        const newFilters = { ...filters };
        newFilters.categories[categoryIndex].options[optionIndex].checked =
            !newFilters.categories[categoryIndex].options[optionIndex].checked;
        setFilters(newFilters);
    };

    // Helper function to check if a job matches the experience filter
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

    // const matchesIndustryFilter = (jobIndustry, selectedIndustries) => {
    //     if (selectedIndustries.length === 0) return true;
    //     return selectedIndustries.some(industry =>
    //         industry.label.toLowerCase() === jobIndustry.toLowerCase() && industry.checked
    //     );
    // };

    const clearAll = () => {
        setFilters({
            searchTerm:"",
            workMode: 'all',
            workType: 'all',
            industryType: 'all',
            salaryRange: 0,
            categories: filterCategories.map(category => ({
                ...category,
                options: category.options.map(option => ({ ...option, checked: false }))
            }))
        });
        setSalaryRange(0);
    };


    // Memoized sorting function
    const sortedJobs = useMemo(() => {
        if (!jobs?.length) return [];

        const jobsCopy = [...jobs];

        switch (sortBy) {
            case 'lastUpdated':
                return jobsCopy.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
            case 'companyAZ':
                return jobsCopy.sort((a, b) => a.company_display_name
                .localeCompare(b.company_display_name
                ));
            case 'companyZA':
                return jobsCopy.sort((a, b) => b.company_display_name
                .localeCompare(a.company_display_name
                ));
            // case 'salaryHighToLow':
            //     return jobsCopy.sort((a, b) => {
            //         const [aMin] = parseSalaryString(a.salary_range);
            //         const [bMin] = parseSalaryString(b.salary_range);
            //         return bMin - aMin;
            //     });
            default:
                return jobsCopy;
        }
    }, [jobs, sortBy]);



    // Memoized filtering function
    const filteredJobs = useMemo(() => {
        return sortedJobs.filter(job => {
            if (filters.searchTerm) {
                const searchTerm = filters.searchTerm.toLowerCase();
                const searchableFields = [
                    job.job_title,
                    job.job_location,
                    // Add more searchable fields as needed
                ].map(field => field.toLowerCase());
    
                // Check if any field contains the search term
                const matchesSearch = searchableFields.some(field => 
                    field.includes(searchTerm)
                );
    
                if (!matchesSearch) {
                    return false;
                }
            }
            // if (filters.jobTitle !== 'all' && !job.jobTitle.toLowerCase().includes(filters.jobTitle.toLowerCase())) {
            //     return false;
            // }

            if (filters.workMode !== 'all' && filters.workMode !== 'Work Mode' &&
                job?.work_mode?.toLowerCase() !== filters.workMode.toLowerCase()) {
                return false;
            }
            if (filters.workType !== 'all' && filters.workType !== 'Work Type' &&
                job?.employment_type.toLowerCase() !== filters.workType.toLowerCase()) {
                return false;
            }

            if (filters.industryType !== 'all' && filters.industryType !== 'Industry Type' &&
                job?.industry.toLowerCase() !== filters.industryType.toLowerCase()) {
                return false;
            }

            // const [minSalary] = parseSalaryString(job.salary_range);
            // if (salaryRange > 0 && minSalary < salaryRange) {
            //     return false;
            // }

           
            // Experience filter
            const selectedExperiences = filters.categories[1].options.filter(opt => opt.checked);
            if (!matchesExperienceFilter(job.job_experience_required, selectedExperiences)) {
                return false;
            }

            // const selectedIndustries = filters.categories[0].options.filter(opt => opt.checked);
            // if (!matchesIndustryFilter(job.industry, selectedIndustries)) {
            //     return false;
            // }


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
                        {/* Job Title Filter */}
                        

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

                        {/* Work Type Filter */}
                        <div className="group">
                            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-indigo-100 
                                transition-all duration-300 hover:shadow-md hover:border-indigo-300
                                group-focus-within:ring-2 group-focus-within:ring-indigo-500">
                                <Briefcase className="w-5 h-5 text-purple-500 group-hover:text-purple-600 transition-colors" />
                                <select
                                    className="bg-transparent outline-none w-full text-gray-800 font-medium 
                                    placeholder-gray-400 hover:text-purple-700"
                                    value={filters.workType}
                                    onChange={handleWorkTypeChange}
                                >
                                    <option value="all">All Work Types</option>
                                    <option value="full-time">Full time</option>
                                    <option value="internship">Internship</option>
                                    <option value="contract">Contract</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="group">
                            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-indigo-100 
                                transition-all duration-300 hover:shadow-md hover:border-indigo-300
                                group-focus-within:ring-2 group-focus-within:ring-indigo-500">
                                <MapPin className="w-5 h-5 text-green-500 group-hover:text-green-600 transition-colors" />
                                <select
                                    className="bg-transparent outline-none w-full text-gray-800 font-medium 
                                    placeholder-gray-400 hover:text-green-700"
                                    value={filters.industryType}
                                    onChange={handleIndustryTypeChange}
                                >
                                    <option value="all">All Industry</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Design">Design</option>
                                    <option value="Science">Science</option>
                                    <option value="Business">Business</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Customer Service">Customer Service</option>
                                    <option value="Human Resource">Human Resource</option>
                                    
                                </select>
                            </div>
                        </div>

                    {/* Salary Range Slider */}
                    {/* <div className="w-full lg:w-72">
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
                                className="w-full h-2.5 bg-indigo-100 rounded-full appearance-none cursor-pointer 
                                    [&::-webkit-slider-thumb]:appearance-none 
                                    [&::-webkit-slider-thumb]:w-5 
                                    [&::-webkit-slider-thumb]:h-5 
                                    [&::-webkit-slider-thumb]:bg-indigo-600 
                                    [&::-webkit-slider-thumb]:rounded-full 
                                    [&::-webkit-slider-thumb]:shadow-xl 
                                    hover:[&::-webkit-slider-thumb]:bg-indigo-700 
                                    transition-all duration-300"
                            />
                        </div>
                    </div> */}
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-12">
                {/* Sidebar filters */}
                <div className="w-full lg:w-72">
                    <div className="bg-gradient-to-br from-indigo-50 to-white p-4 lg:p-6 border border-indigo-100 rounded-lg shadow-sm">
                        {/* Filter Header */}
                        <div
                            className="flex items-center justify-between mb-6 cursor-pointer"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            <div className="flex items-center gap-3">
                                <Filter className="w-6 h-6 text-indigo-600" />
                                <h3 className="font-bold text-xl text-gray-800">Job Filters</h3>
                            </div>
                            <ChevronDown
                                className={`w-5 h-5 text-gray-500 hover:text-indigo-600 transform transition-transform duration-300 
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
                            <h2 className="text-xl font-semibold">Recommended Jobs</h2>
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
                                onChange={handleSortChange}
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
                            <JobCard key={job.companyName + job.jobTitle} job={job} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobsPage;
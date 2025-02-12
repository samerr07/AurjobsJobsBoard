import React, { useMemo, useState } from 'react';
import {
    Search,
    MapPin,
    Briefcase,
    DollarSign, Filter,
    CheckCircle2,
    XCircle, ChevronDown, Bookmark
} from 'lucide-react';

const JobsPage = () => {

    const [sortBy, setSortBy] = useState('lastUpdated');
    const [salaryRange, setSalaryRange] = useState(5000);
    const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(true);

    const jobs = [
        {
          id: 1,
          company: 'Amazon',
          position: 'Senior UI/UX Designer',
          date: '2023-05-20',
          location: 'San Francisco, CA',
          salary: 250,
          salaryDisplay: '$250/hr',
          experience: 'Senior level',
          tags: ['Part time', 'Senior level', 'Remote', 'Project work'],
          bgColor: 'bg-orange-50',
          relevanceScore: 95
        },
        {
          id: 2,
          company: 'Google',
          position: 'Junior UI/UX Designer',
          date: '2023-02-04',
          location: 'Mountain View, CA',
          salary: 150,
          salaryDisplay: '$150/hr',
          experience: 'Junior level',
          tags: ['Full time', 'Junior level', 'On-site', 'Project work'],
          bgColor: 'bg-green-50',
          relevanceScore: 88
        },
        {
          id: 3,
          company: 'Microsoft',
          position: 'Frontend Developer',
          date: '2023-06-15',
          location: 'Seattle, WA',
          salary: 200,
          salaryDisplay: '$200/hr',
          experience: 'Mid level',
          tags: ['Full time', 'Mid level', 'Hybrid', 'Long term'],
          bgColor: 'bg-blue-50',
          relevanceScore: 92
        },
        {
          id: 4,
          company: 'Apple',
          position: 'Product Designer',
          date: '2023-07-01',
          location: 'Cupertino, CA',
          salary: 280,
          salaryDisplay: '$280/hr',
          experience: 'Senior level',
          tags: ['Full time', 'Senior level', 'On-site', 'Long term'],
          bgColor: 'bg-gray-50',
          relevanceScore: 90
        },
        {
          id: 5,
          company: 'Netflix',
          position: 'UX Researcher',
          date: '2023-08-12',
          location: 'Los Gatos, CA',
          salary: 180,
          salaryDisplay: '$180/hr',
          experience: 'Mid level',
          tags: ['Contract', 'Mid level', 'Remote', 'Project work'],
          bgColor: 'bg-red-50',
          relevanceScore: 85
        },
        {
          id: 6,
          company: 'Meta',
          position: 'Interaction Designer',
          date: '2023-09-30',
          location: 'Menlo Park, CA',
          salary: 220,
          salaryDisplay: '$220/hr',
          experience: 'Senior level',
          tags: ['Full time', 'Senior level', 'Hybrid', 'Long term'],
          bgColor: 'bg-blue-50',
          relevanceScore: 89
        },
        {
          id: 7,
          company: 'Adobe',
          position: 'Visual Designer',
          date: '2023-10-15',
          location: 'San Jose, CA',
          salary: 175,
          salaryDisplay: '$175/hr',
          experience: 'Mid level',
          tags: ['Part time', 'Mid level', 'Remote', 'Project work'],
          bgColor: 'bg-red-50',
          relevanceScore: 82
        },
        {
          id: 8,
          company: 'Salesforce',
          position: 'UI Developer',
          date: '2023-11-01',
          location: 'San Francisco, CA',
          salary: 190,
          salaryDisplay: '$190/hr',
          experience: 'Mid level',
          tags: ['Full time', 'Mid level', 'On-site', 'Long term'],
          bgColor: 'bg-blue-50',
          relevanceScore: 87
        },
        {
          id: 9,
          company: 'Twitter',
          position: 'Design Systems Engineer',
          date: '2023-12-05',
          location: 'San Francisco, CA',
          salary: 240,
          salaryDisplay: '$240/hr',
          experience: 'Senior level',
          tags: ['Contract', 'Senior level', 'Remote', 'Project work'],
          bgColor: 'bg-blue-50',
          relevanceScore: 91
        },
        {
          id: 10,
          company: 'Airbnb',
          position: 'Product Designer',
          date: '2024-01-10',
          location: 'San Francisco, CA',
          salary: 210,
          salaryDisplay: '$210/hr',
          experience: 'Mid level',
          tags: ['Full time', 'Mid level', 'Hybrid', 'Long term'],
          bgColor: 'bg-red-50',
          relevanceScore: 86
        },
        {
          id: 11,
          company: 'Uber',
          position: 'UX Engineer',
          date: '2024-01-20',
          location: 'San Francisco, CA',
          salary: 195,
          salaryDisplay: '$195/hr',
          experience: 'Mid level',
          tags: ['Full time', 'Mid level', 'On-site', 'Long term'],
          bgColor: 'bg-green-50',
          relevanceScore: 84
        },
        {
          id: 12,
          company: 'LinkedIn',
          position: 'UI/UX Designer',
          date: '2024-02-01',
          location: 'Sunnyvale, CA',
          salary: 230,
          salaryDisplay: '$230/hr',
          experience: 'Senior level',
          tags: ['Contract', 'Senior level', 'Remote', 'Project work'],
          bgColor: 'bg-blue-50',
          relevanceScore: 93
        }
      ];
   
    const [filterCategories, setFilterCategories] = useState([
        {
            title: "Job Type",
            options: [
                { label: "Full-time", checked: false },
                { label: "Part-time", checked: false },
                { label: "Contract", checked: false },
                { label: "Freelance", checked: false }
            ]
        },
        {
            title: "Experience Level",
            options: [
                { label: "Entry Level", checked: false },
                { label: "Mid Level", checked: false },
                { label: "Senior", checked: false },
                { label: "Executive", checked: false }
            ]
        },
        {
            title: "Work Setting",
            options: [
                { label: "Remote", checked: false },
                { label: "Hybrid", checked: false },
                { label: "On-site", checked: false }
            ]
        },
        {
            title: "Company Size",
            options: [
                { label: "Startup", checked: false },
                { label: "Small (1-50)", checked: false },
                { label: "Medium (51-200)", checked: false },
                { label: "Large (200+)", checked: false }
            ]
        }
    ]);

    const toggleOption = (categoryIndex, optionIndex) => {
        const updatedCategories = [...filterCategories];
        updatedCategories[categoryIndex].options[optionIndex].checked =
            !updatedCategories[categoryIndex].options[optionIndex].checked;
        setFilterCategories(updatedCategories);
    };


    

    const toggleBookmark = (jobId) => {
        setBookmarkedJobs(prev => {
            const newBookmarks = new Set(prev);
            if (newBookmarks.has(jobId)) {
                newBookmarks.delete(jobId);
                setNotificationMessage('Job removed from bookmarks');
            } else {
                newBookmarks.add(jobId);
                setNotificationMessage('Job saved to bookmarks');
            }
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 2000);
            return newBookmarks;
        });
    };

    const sortOptions = [
        { value: 'lastUpdated', label: 'Last Updated' },
        { value: 'relevance', label: 'Relevance' },
        { value: 'salaryHighToLow', label: 'Salary: High to Low' },
        { value: 'salaryLowToHigh', label: 'Salary: Low to High' },
        { value: 'companyAZ', label: 'Company: A to Z' },
        { value: 'companyZA', label: 'Company: Z to A' },
        { value: 'experienceLevel', label: 'Experience Level' }
    ];

    const sortedJobs = useMemo(() => {
        const jobsCopy = [...jobs];
        
        switch (sortBy) {
            case 'lastUpdated':
                return jobsCopy.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            case 'relevance':
                return jobsCopy.sort((a, b) => b.relevanceScore - a.relevanceScore);
            
            case 'salaryHighToLow':
                return jobsCopy.sort((a, b) => b.salary - a.salary);
            
            case 'salaryLowToHigh':
                return jobsCopy.sort((a, b) => a.salary - b.salary);
            
            case 'companyAZ':
                return jobsCopy.sort((a, b) => a.company.localeCompare(b.company));
            
            case 'companyZA':
                return jobsCopy.sort((a, b) => b.company.localeCompare(a.company));
            
            case 'experienceLevel':
                const levelOrder = {
                    'Junior level': 1,
                    'Mid level': 2,
                    'Senior level': 3,
                    'Executive': 4
                };
                return jobsCopy.sort((a, b) => {
                    const aLevel = a.tags.find(tag => tag.includes('level')) || '';
                    const bLevel = b.tags.find(tag => tag.includes('level')) || '';
                    return levelOrder[bLevel] - levelOrder[aLevel];
                });
            
            default:
                return jobsCopy;
        }
    }, [jobs, sortBy]);

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    }

    return (
        
        <div className="min-h-screen bg-gray-50 py-16">

            {showNotification && (
                <div className="fixed top-4 right-4 z-50">
                    <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg">
                        <p>{notificationMessage}</p>
                    </div>
                </div>
            )}
            {/* Header */}
            <div className="bg-gradient-to-br from-indigo-50 to-white shadow-md mb-1 p-4 lg:p-7 border border-indigo-100">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">

                        <div className="group">
                            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-indigo-100 
                transition-all duration-300 hover:shadow-md hover:border-indigo-300
                group-focus-within:ring-2 group-focus-within:ring-indigo-500">
                                <Search className="w-5 h-5 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
                                <select className="bg-transparent outline-none w-full text-gray-800 font-medium 
                  placeholder-gray-400 hover:text-indigo-700">
                                    <option>Designer</option>
                                    <option>Developer</option>
                                    <option>Product Manager</option>
                                </select>
                            </div>
                        </div>


                        <div className="group">
                            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-indigo-100 
                transition-all duration-300 hover:shadow-md hover:border-indigo-300
                group-focus-within:ring-2 group-focus-within:ring-indigo-500">
                                <MapPin className="w-5 h-5 text-green-500 group-hover:text-green-600 transition-colors" />
                                <select className="bg-transparent outline-none w-full text-gray-800 font-medium 
                  placeholder-gray-400 hover:text-green-700">
                                    <option>Work location</option>
                                    <option>Remote</option>
                                    <option>Hybrid</option>
                                    <option>On-site</option>
                                </select>
                            </div>
                        </div>


                        <div className="group">
                            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-indigo-100 
                transition-all duration-300 hover:shadow-md hover:border-indigo-300
                group-focus-within:ring-2 group-focus-within:ring-indigo-500">
                                <Briefcase className="w-5 h-5 text-purple-500 group-hover:text-purple-600 transition-colors" />
                                <select className="bg-transparent outline-none w-full text-gray-800 font-medium 
                  placeholder-gray-400 hover:text-purple-700">
                                    <option>Experience</option>
                                    <option>Entry Level</option>
                                    <option>Mid Level</option>
                                    <option>Senior</option>
                                </select>
                            </div>
                        </div>


                        <div className="group">
                            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-indigo-100 
                transition-all duration-300 hover:shadow-md hover:border-indigo-300
                group-focus-within:ring-2 group-focus-within:ring-indigo-500">
                                <DollarSign className="w-5 h-5 text-teal-500 group-hover:text-teal-600 transition-colors" />
                                <select className="bg-transparent outline-none w-full text-gray-800 font-medium 
                  placeholder-gray-400 hover:text-teal-700">
                                    <option>Per month</option>
                                    <option>Per year</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-72">
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between text-sm text-gray-700">
                                <span className="font-semibold">Salary Range</span>
                                <span className="font-bold text-indigo-600">${salaryRange.toLocaleString()} - $20,000</span>
                            </div>
                            <input
                                type="range"
                                min="1200"
                                max="20000"
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
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-12">
                {/* Sidebar */}


                <div className="w-full lg:w-72">
                    <div className="bg-gradient-to-br from-indigo-50 to-white p-4 lg:p-6 border border-indigo-100">

                        <div
                            className="flex items-center justify-between mb-6 cursor-pointer"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            <div className="flex items-center gap-3">
                                <Filter className="w-6 h-6 text-indigo-600" />
                                <h3 className="font-bold text-xl text-gray-800">Advanced Filters</h3>
                            </div>
                            <ChevronDown
                                className={`w-5 h-5 text-gray-500 hover:text-indigo-600 transform transition-transform duration-300 ${isFilterOpen ? '' : '-rotate-180'
                                    }`}
                            />
                        </div>


                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${isFilterOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            {filterCategories.map((category, categoryIndex) => (
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
                          ${option.checked ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 bg-white group-hover:border-indigo-400'}`}>
                                                    {option.checked && <CheckCircle2 className="w-4 h-4 text-white" />}
                                                </div>
                                                <span className={`text-sm transition-colors 
                          ${option.checked ? 'text-indigo-700 font-semibold' : 'text-gray-700 group-hover:text-indigo-600'}`}>
                                                    {option.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                                <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                                    <XCircle className="w-5 h-5" />
                                    Clear All
                                </button>
                                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Listings */}
                
                <div className="flex-1 max-h-screen overflow-y-auto [&::-webkit-scrollbar]:hidden">
                    <div className="flex items-center justify-between mb-6 sticky top-0 bg-gray-50 z-10">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold">Recommended Jobs</h2>
                            <span className="bg-gray-200 px-3 py-0.5 rounded-full text-sm">
                                {jobs.length}
                            </span>
                        </div>
                        {/* <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-sm hidden sm:inline">Sort by:</span>
                            <select className="bg-transparent text-sm font-medium">
                                <option>Last updated</option>
                                <option>Relevance</option>
                            </select>
                        </div> */}
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

                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {jobs.map(job => (
                            <div key={job.id} className={`${job.bgColor} rounded-2xl overflow-hidden`}>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-gray-500 text-sm mb-2">{job.date}</p>
                                            <h3 className="font-medium">{job.company}</h3>
                                            <p className="text-lg font-semibold">{job.position}</p>
                                        </div>
                                        <button
                                            onClick={() => toggleBookmark(job.id)}
                                            className={`p-2 rounded-full transition-colors duration-200 ${bookmarkedJobs.has(job.id)
                                                    ? 'bg-indigo-100 text-indigo-600'
                                                    : 'bg-gray-100 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
                                                }`}
                                        >
                                            <Bookmark
                                                className={`w-5 h-5 ${bookmarkedJobs.has(job.id) ? 'fill-current' : ''
                                                    }`}
                                            />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {job.tags.map((tag, index) => (
                                            <span key={index} className="bg-white/80 px-3 py-1 rounded-full text-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="font-bold">{job.salary}</p>
                                            <p className="text-gray-500 text-sm">{job.location}</p>
                                        </div>
                                        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedJobs.map(job => (
                            <div key={job?.id} className={`bg-orange-100 rounded-2xl overflow-hidden`}>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-gray-500 text-sm mb-2">
                                                {new Date(job?.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                            <h3 className="font-medium">{job?.company}</h3>
                                            <p className="text-lg font-semibold">{job?.position}</p>
                                        </div>
                                        <button
                                            onClick={() => toggleBookmark(job.id)}
                                            className={`p-2 rounded-full transition-colors duration-200 ${
                                                bookmarkedJobs.has(job?.id) 
                                                    ? 'bg-indigo-100 text-indigo-600' 
                                                    : 'bg-gray-100 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
                                            }`}
                                        >
                                            <Bookmark 
                                                className={`w-5 h-5 ${
                                                    bookmarkedJobs.has(job?.id) ? 'fill-current' : ''
                                                }`} 
                                            />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {job?.tags.map((tag, index) => (
                                            <span key={index} className="bg-white/80 px-3 py-1 rounded-full text-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="font-bold">{job?.salaryDisplay}</p>
                                            <p className="text-gray-500 text-sm">{job?.location}</p>
                                        </div>
                                        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </div>

    );
};

export default JobsPage;
import { Briefcase, MapPin } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {


    const createSlug = (text) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-')     // Replace spaces with hyphens
            .replace(/--+/g, '-')     // Replace multiple hyphens with single hyphen
            .trim();                  // Trim leading/trailing spaces
    };

    return (
        <div
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="p-5">
                {/* Header with Logo */}
                <div className="flex items-start space-x-4 mb-5">
                    <div className="relative">
                        <img
                            src={job.company_logo}
                            alt={`${job.companyName} logo`}
                            className="w-14 h-14 rounded-lg object-cover border border-gray-100 shadow-sm"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                {job.company_display_name}
                            </h3>

                        </div>
                        <p className="text-gray-500 text-sm mt-1">
                            {job.job_location}
                        </p>

                    </div>
                </div>

                {/* Job Details */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {job.job_title}
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium">
                            {/* <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg> */}
                            <Briefcase className='mr-3' />
                            {job.job_experience_required} years
                        </span>
                        <span className="inline-flex items-center bg-green-50 text-green-600 px-3 py-1 rounded-lg text-sm font-medium">

                            <span>₹</span>
                            {job.salary_range}
                        </span>
                        <div className="flex items-center gap-2 text-blue-600">
                            <Briefcase className="w-4 h-4" />
                            <span>{job.employment_type}</span>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-between items-center border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                            <span className="flex items-center text-sm text-gray-500">
                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {job.job_location}
                            </span>
                        </div>
                        <Link to={`/jobs/${createSlug(job.job_title)}`}
                            state={{ jobId: job?.job_id }}
                        >
                            <button className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white 
 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-sm hover:shadow">
                                View Details
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};



export default JobCard

import React from 'react';
import { MapPin, DollarSign, Calendar, Layers, Briefcase, ChevronLeft ,IndianRupee} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobDetailsDisplay = ({ job }) => {
  const navigate = useNavigate();  // Hook to navigate to different routes

  const handleBackButtonClick = () => {
    // Navigate to employer_dashboard and set the active section to 'job_post'
    navigate('/employer_dashboard', { state: { section: 'job_post' } });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      {/* Back Button */}
      <button 
        onClick={handleBackButtonClick} 
        className="text-blue-500 mb-4 flex items-center space-x-2"
      >
        <ChevronLeft className="text-blue-500" />  {/* Using Lucide ChevronLeft icon */}
        <span>Back to Employer Dashboard</span>
      </button>

      <div className="space-y-6">
        {/* Job Title */}
        <div>
          <h1 className="text-2xl font-semibold">{job.job_title}</h1>
        </div>

        {/* Job Description */}
        <div className="pb-4 border-b border-gray-100">
          <label className="text-sm text-gray-500">Job Description</label>
          <p className="text-gray-700 text-lg">{job.job_description}</p>
        </div>

        {/* Job Information (Location, Salary, Date) */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-500">Location</label>
            <MapPin className="text-red-500" /> {/* Red for location */}
            <span className="font-semibold">{job.job_location}</span>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-500">Salary Range</label>
            <IndianRupee className="text-green-500" /> {/* Green for salary */}
            <span className="font-semibold">{job.salary_range}</span>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-500">Posted On</label>
            <Calendar className="text-yellow-500" /> {/* Yellow for date */}
            <span className="font-semibold">{new Date(job.posted_at).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Job Type and Industry */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-500">Employment Type</label>
            <Briefcase className="text-blue-500" /> {/* Blue for employment type */}
            <span className="font-semibold">{job.employment_type}</span>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-500">Industry</label>
            <Layers className="text-purple-500" /> {/* Purple for industry */}
            <span className="font-semibold">{job.industry}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsDisplay;

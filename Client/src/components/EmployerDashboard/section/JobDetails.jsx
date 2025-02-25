import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JobDetailsDisplay from './JobDetailsDisplay';
import JobApplicantsTable from './JobApplicantsTable';
import useFetchJobData from './useFetchJobData'; // Import the custom hook

const JobDetails = () => {
  const { jobId } = useParams(); // Extract jobId from URL
  const navigate = useNavigate();
  
  // Use the custom hook to fetch data
  const { job, applicants, loading } = useFetchJobData(jobId);

  if (loading) {
    return (
      <div className="p-6 text-center mt-20">
        <h3 className="text-xl text-gray-700">Loading...</h3>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="p-6 text-center mt-20">
        <h3 className="text-xl text-gray-700">Job not found</h3>
        <button 
          onClick={() => navigate('/employer_dashboard')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{job.job_title}</h2>
        <button 
          onClick={() => navigate('/employer_dashboard')}
          className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Job Details Section */}
      <JobDetailsDisplay job={job} />

      {/* Applicants Table Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Applicants</h3>
        <JobApplicantsTable applicants={applicants} />
      </div>
    </div>
  );
};

export default JobDetails;

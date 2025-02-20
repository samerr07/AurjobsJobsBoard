import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import JobDetailsDisplay from './JobDetailsDisplay';  // Import the new display component
import JobApplicantsTable from './JobApplicantsTable'; // Import the table component
import { BASEURL } from '../../../utility/config';

const JobDetails = () => {
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const { jobId } = useParams(); // Extract jobId from URL
  const navigate = useNavigate(); // Used for navigation

  // Fetch job details and applicants
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobResponse = await axios.get(`${BASEURL}/jobs_post/job_application/${jobId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,  // Include credentials if necessary
        });

        const jobData = jobResponse.data;
        if (jobData) {
          setJob(jobData);  // Set the job data in state
        } else {
          console.error("Job not found.");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    const fetchJobApplicants = async () => {
      try {
        const applicantsResponse = await axios.get(`${BASEURL}/jobs_post/job_applicants/${jobId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,  // Include credentials if necessary
        });

        const applicantsData = applicantsResponse.data.job;
        setApplicants(applicantsData);  // Set applicants data in state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job applicants:", error);
        setLoading(false);
      }
    };

    fetchJobDetails(); // Fetch job details
    fetchJobApplicants(); // Fetch job applicants
  }, [jobId]);

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

      {/* Pass job data as prop to the JobDetailsDisplay component */}
      <div>
        <JobDetailsDisplay job={job} />
      </div>

      {/* Pass applicants data as prop to the JobApplicantsTable component */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Applicants</h3>
        <JobApplicantsTable applicants={applicants} />
      </div>
    </div>
  );
};

export default JobDetails;

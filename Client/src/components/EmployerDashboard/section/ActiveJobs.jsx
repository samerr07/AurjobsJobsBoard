import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import axios from 'axios';
// import { getEmployerProfile } from '../../../redux/employerSlice';
import { useSelector } from 'react-redux';
import { BASEURL } from '../../../utility/config';


const ActiveJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { employerProfile } = useSelector((state) => state.employer);
    const employerId=employerProfile.employer_id;
    // console.log(employerId);
    
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // Replace with your actual API URL
                const response = await axios.get(`${BASEURL}/jobs_post/employer_jobs/${employerId}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,  // Include credentials if necessary
                });

                if (response.status === 200) {
                    setJobs(response.data);  // Set the fetched jobs
                } else {
                    throw new Error(response.data.error || 'Failed to fetch jobs');
                }
            } catch (error) {
                setError(error.message);  // Handle error if API call fails
            } finally {
                setLoading(false);  // Set loading to false after the fetch completes
            }
        };

        fetchJobs();  // Call the fetchJobs function when the component mounts
    }, [employerId]);
    if (loading) {
        return <div>Loading...</div>;  // Display loading message while fetching data
    }

    if (error) {
        return <div>Error: {error}</div>;  // Display error message if fetch fails
    }

    return (
        <div className="space-y-4">
            {jobs.map((job) => (
                <JobCard key={job.job_id} job={job} />  // Passing job data to JobCard as props
            ))}
        </div>
    );
};

export default ActiveJobs;

import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';

const ActiveJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch jobs from the API
        const fetchJobs = async () => {
            try {
                // Make an API request to fetch jobs
                const response = await fetch('http://localhost:3000/jobs_post/jobs');  // Replace with your API endpoint
                const data = await response.json();

                if (response.ok) {
                    setJobs(data);  // Set the fetched jobs
                } else {
                    throw new Error(data.error || 'Failed to fetch jobs');
                }
            } catch (error) {
                setError(error.message);  // Handle error if API call fails
            } finally {
                setLoading(false);  // Set loading to false after the fetch completes
            }
        };

        fetchJobs();  // Call the fetchJobs function when the component mounts
    }, []);

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

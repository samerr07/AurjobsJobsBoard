import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapPin, DollarSign, Calendar, Layers, Briefcase, Search } from 'lucide-react';
import axios from 'axios';

const JobDetails = () => {
    const [job, setJob] = useState(null);
    const [appliedUsers, setAppliedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { jobId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/jobs_post/jobs_appliaction/${jobId}`);
                setJob(response.data.job);
                console.log(response.data.job)
                setAppliedUsers(response.data.applicants);
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };

        fetchJobDetails();
    }, [jobId]);

    if (!job) {
        return (
            <div className="p-6 text-center">
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

    const filteredUsers = appliedUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );

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

            <div className="space-y-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="space-y-6">
                        <div className="pb-4 border-b border-gray-100">
                            <p className="text-gray-700 text-lg">{job.job_description}</p>
                        </div>
                        {/* Add other job details */}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-900">Applicants ({appliedUsers.length})</h3>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search applicants..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 max-h-[800px] pr-2">
                        {filteredUsers.map(user => (
                            <div key={user.id} className="bg-white p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                                        {/* Add other user details */}
                                    </div>
                                    {/* Add status and View Profile button */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;

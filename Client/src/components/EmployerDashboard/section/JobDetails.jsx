import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapPin, DollarSign, Calendar, Layers, Briefcase, Search } from 'lucide-react';

const JobDetails = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { jobId } = useParams();
    const navigate = useNavigate();

    const appliedUsers = [
        {
            id: 1,
            name: "Sarah Johnson",
            experience: "4 years",
            location: "New York",
            skills: ["React", "Node.js", "TypeScript"],
            status: "shortlisted"
        },
        {
            id: 2,
            name: "Michael Chen",
            experience: "3 years",
            location: "San Francisco",
            skills: ["Python", "Django", "AWS"],
            status: "pending"
        },
        {
            id: 3,
            name: "Emma Davis",
            experience: "5 years",
            location: "London",
            skills: ["React", "Vue.js", "GraphQL"],
            status: "interviewed"
        },
        {
            id: 4,
            name: "Emma Davis",
            experience: "5 years",
            location: "London",
            skills: ["React", "Vue.js", "GraphQL"],
            status: "interviewed"
        }
    ];

    const sampleJobs = [
        {
            job_id: '1',
            employer_id: 'EMP123',
            job_title: 'Software Engineer',
            job_description: 'Develop and maintain web applications.',
            employment_type: 'Full-time',
            job_location: 'Bangalore',
            remote: false,
            salary_range: '$60,000 - $80,000',
            job_experience_required: '2+ years',
            job_skills_required: ['JavaScript', 'React', 'Node.js'],
            industry: 'IT',
            posted_at: '2024-02-14',
            status: 'Open',
        },
        {
            job_id: '2',
            employer_id: 'EMP456',
            job_title: 'Data Scientist',
            job_description: 'Analyze data trends and build ML models.',
            employment_type: 'Full-time',
            job_location: 'Remote',
            remote: true,
            salary_range: '$70,000 - $90,000',
            job_experience_required: '3+ years',
            job_skills_required: ['Python', 'Machine Learning', 'SQL'],
            industry: 'Data Science',
            posted_at: '2024-02-12',
            status: 'Open',
        }
    ];

    const job = sampleJobs.find(j => j.job_id === jobId);

    const filteredUsers = appliedUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );

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

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header with Back Button */}
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
                {/* Job Details Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="space-y-6">
                        <div className="pb-4 border-b border-gray-100">
                            <p className="text-gray-700 text-lg">{job.job_description}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-gray-500" />
                                <p className="text-gray-700"><span className="font-medium">Location:</span> {job.job_location} {job.remote && "(Remote)"}</p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-green-500" />
                                <p className="text-gray-700"><span className="font-medium">Salary:</span> {job.salary_range}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-yellow-500" />
                                <p className="text-gray-700"><span className="font-medium">Experience:</span> {job.job_experience_required}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Layers className="w-5 h-5 text-purple-500" />
                                <p className="text-gray-700"><span className="font-medium">Industry:</span> {job.industry}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-gray-500" />
                                <p className="text-gray-700"><span className="font-medium">Type:</span> {job.employment_type}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3">Required Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {job.job_skills_required.map(skill => (
                                    <span 
                                        key={skill} 
                                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                            job.status === 'Open' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                        }`}>
                            Status: {job.status}
                        </div>

                        <div className="text-sm text-gray-500">
                            Posted on: {job.posted_at}
                        </div>
                    </div>
                </div>

                {/* Applicants Section */}
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
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <Briefcase className="w-4 h-4" />
                                                {user.experience}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {user.location}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {user.skills.map(skill => (
                                                <span 
                                                    key={skill}
                                                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-3">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            user.status === 'shortlisted' 
                                                ? 'bg-green-100 text-green-700'
                                                : user.status === 'interviewed'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {user.status}
                                        </span>
                                        <button className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium">
                                            View Profile
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

export default JobDetails;

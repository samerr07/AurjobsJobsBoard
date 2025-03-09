import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Briefcase, MapPin, DollarSign, ArrowRight, Users, IndianRupee, 
    Calendar, Eye, Clock, MoreHorizontal,  Trash2, Edit, Copy, UserPlus,
    ToggleLeft
} from 'lucide-react';
import axios from 'axios';
import { BASEURL } from '../../utility/config';


const JobCard = ({ job, onRefresh }) => {
    const navigate = useNavigate();
    const [showActions, setShowActions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      };

    // Calculate days left or days since posted
    const calculateDaysInfo = () => {
        const createdDate = new Date(job.created_at);
        const expiryDate = job.expiry_date ? new Date(job.expiry_date) : null;
        const today = new Date();
        
        if (expiryDate && expiryDate > today) {
            const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
            return { text: `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`, isExpiring: daysLeft <= 3 };
        } else {
            const daysSince = Math.ceil((today - createdDate) / (1000 * 60 * 60 * 24));
            return { text: `Posted ${daysSince} day${daysSince !== 1 ? 's' : ''} ago`, isExpiring: false };
        }
    };

    const daysInfo = calculateDaysInfo();

    // Handle status toggle
    const handleToggleStatus = async () => {
        setIsLoading(true);
        try {
            const newStatus = job.status === 'active' ? 'inactive' : 'active';
            const response = await axios.put(`${BASEURL}/jobs_post/${job.job_id}/status`, 
                { status: newStatus },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            
            if (response.status === 200) {
                // Success - refresh the job list
                if (onRefresh) onRefresh();
            } else {
                throw new Error(response.data.error || 'Failed to update job status');
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
            setShowActions(false);
        }
    };

    // Handle job deletion
    const handleDeleteJob = async () => {
        setIsLoading(true);
        try {
            const response = await axios.delete(`${BASEURL}/jobs_post/job_delete/${job.job_id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            
            if (response.status === 200) {
                // Success - refresh the job list
                if (onRefresh) onRefresh();
            } else {
                throw new Error(response.data.error || 'Failed to delete job');
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
            setShowConfirmation(false);
        }
    };

    // Handle job duplication
    const handleDuplicateJob = () => {
        navigate(`/employer_dashboard/post_job`, { state: { duplicateFrom: job } });
    };

    // Action menu items
    const actionMenuItems = [
    //     {
    //         icon: Edit,
    //         text: 'Edit Job',
    //         onClick: () => navigate(`/employer_dashboard/edit_job/${job.job_id}`),
    //     },
    //     {
    //         icon: ToggleLeft,
    //         text: job.status === 'active' ? 'Deactivate Job' : 'Activate Job',
    //         onClick: handleToggleStatus,
    //     },
    //     {
    //         icon: Copy,
    //         text: 'Duplicate Job',
    //         onClick: handleDuplicateJob,
    //     },
        {
            icon: Trash2,
            text: 'Delete Job',
            onClick: () => setShowConfirmation(true),
            danger: true
        },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative">
            {/* Job Status Badge */}
            <div className="absolute top-4 right-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    job.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                }`}>
                    {job.status === 'active' ? 'Active' : 'Inactive'}
                </div>
            </div>

            {/* Actions Menu Button */}
            <div className="absolute top-4 right-16">
                <button 
                    onClick={() => setShowActions(!showActions)}
                    className="p-1 rounded-full hover:bg-gray-100"
                >
                    <MoreHorizontal className="w-5 h-5 text-gray-500" />
                </button>

                {/* Actions Dropdown */}
                {showActions && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100">
                        <div className="py-1">
                            {actionMenuItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={item.onClick}
                                    disabled={isLoading}
                                    className={`w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-50 ${
                                        item.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
                                    }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    <span>{item.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Job</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete "{job.job_title}"? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteJob}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Side - Job Title and details */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Briefcase className="w-6 h-6 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">{job.job_title}</h3>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        <p>{job.job_location} {job.remote && "(Remote)"}</p>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <IndianRupee className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <p>{job.salary_range}</p>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        <p>{job.job_experience_required} Experience</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        {/* Days left or Posted days ago */}
                        {/* <div className={`flex items-center gap-1 text-sm ${
                            daysInfo.isExpiring ? 'text-orange-600' : 'text-gray-600'
                        }`}>
                            <Clock className="w-4 h-4" />
                            <span>{daysInfo.text}</span>
                        </div> */}

                        {/* Job Views */}
                        {/* <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Eye className="w-4 h-4" />
                            <span>{job.views || 0} views</span>
                        </div> */}

                        {/* Posted Date */}
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>Posted {formatDate(job?.posted_at)}</span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Skills, Applicants and Buttons */}
                <div className="space-y-4">
                    {/* Required Skills */}
                    <div>
                        <h4 className="font-semibold mb-3">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {job.job_skills_required.slice(0, 3).map(skill => (
                                <span
                                    key={skill}
                                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                            {job.job_skills_required.length > 3 && (
                                <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm font-medium">
                                    +{job.job_skills_required.length - 3} more
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Applicant Stats */}
                    <div>
                        {/* <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold">Applicants</h4>
                            <span className="text-sm text-blue-600">
                                {job.applicants?.length || 0} total
                            </span>
                        </div> */}
                        
                        {/* Applicant progress bar */}
                        {/* <div className="bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div 
                                className="bg-blue-500 h-full rounded-full" 
                                style={{ width: `${Math.min((job.applicants?.length || 0) / (job.target_applicants || 10) * 100, 100)}%` }}
                            ></div>
                        </div> */}
                        
                        {/* <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0</span>
                            <span>Target: {job.target_applicants || 10}</span>
                        </div> */}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                        <button
                            onClick={() => navigate(`/employer_dashboard/jobs/${job.job_id}`)}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-1"
                        >
                            <Eye className="w-4 h-4" />
                            View Details
                        </button>
                        
                        {/* <button
                            onClick={() => navigate(`/employer_dashboard/jobs/${job.job_id}/applicants`)}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex-1"
                        >
                            <UserPlus className="w-4 h-4" />
                            View Applicants
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
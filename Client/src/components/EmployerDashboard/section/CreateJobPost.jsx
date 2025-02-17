import React, { useState } from "react";
import { Briefcase, MapPin, DollarSign, Calendar, Layers, CheckCircle, ChevronRight, ChevronLeft } from "lucide-react";

const CreateJobPost = ({ addJob }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        job_title: "",
        job_description: "",
        employment_type: "",
        job_location: "",
        remote: false,
        salary_range: "",
        job_experience_required: "",
        job_skills_required: "",
        industry: "",
        status: "Open",
        posted_at: new Date().toISOString().split("T")[0],
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        addJob(formData);
        setFormData({
            job_title: "",
            job_description: "",
            employment_type: "",
            job_location: "",
            remote: false,
            salary_range: "",
            job_experience_required: "",
            job_skills_required: "",
            industry: "",
            status: "Open",
            posted_at: new Date().toISOString().split("T")[0],
        });
        setStep(1);
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-6">
                {["Basic Info", "Job Details", "Skills & Salary"].map((label, index) => (
                    <div key={index} className="flex flex-col items-center">
                        {index + 1 === step ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${index + 1 < step ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"}`}>
                                {index + 1}
                            </div>
                        )}
                        <span className={`text-sm mt-1 ${index + 1 === step ? "font-bold text-blue-600" : "text-gray-500"}`}>{label}</span>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                {/* Step 1: Basic Info */}
                {step === 1 && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Job Title</label>
                            <input type="text" name="job_title" value={formData.job_title} onChange={handleChange} className="w-full p-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Job Description</label>
                            <textarea name="job_description" value={formData.job_description} onChange={handleChange} className="w-full p-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Employment Type</label>
                            <select name="employment_type" value={formData.employment_type} onChange={handleChange} className="w-full p-2 border rounded-md">
                                <option value="">Select Type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Step 2: Job Details */}
                {step === 2 && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input type="text" name="job_location" value={formData.job_location} onChange={handleChange} className="w-full p-2 border rounded-md" required />
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" name="remote" checked={formData.remote} onChange={handleChange} className="mr-2" />
                            <label className="text-sm font-medium text-gray-700">Remote Job</label>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Industry</label>
                            <input type="text" name="industry" value={formData.industry} onChange={handleChange} className="w-full p-2 border rounded-md" required />
                        </div>
                    </div>
                )}

                {/* Step 3: Skills & Salary */}
                {step === 3 && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Salary Range</label>
                            <input type="text" name="salary_range" value={formData.salary_range} onChange={handleChange} className="w-full p-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Experience Required</label>
                            <input type="text" name="job_experience_required" value={formData.job_experience_required} onChange={handleChange} className="w-full p-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Skills Required (comma separated)</label>
                            <input type="text" name="job_skills_required" value={formData.job_skills_required} onChange={handleChange} className="w-full p-2 border rounded-md" required />
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-6 flex justify-between">
                    {step > 1 && (
                        <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded-lg flex items-center gap-2">
                            <ChevronLeft className="w-4 h-4" /> Previous
                        </button>
                    )}
                    {step < 3 ? (
                        <button type="button" onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2">
                            Next <ChevronRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg">
                            Submit
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreateJobPost;

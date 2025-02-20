import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Blocks,
  FileText,
  GraduationCap,
  Send,
  Building,
  Globe
} from "lucide-react";
import { BASEURL } from "../../../utility/config";

const CreateJobPost = () => {
  const { employerProfile } = useSelector((state) => state.employer);
  const [formData, setFormData] = useState({
    job_title: "",
    job_description: "",
    employment_type: "",
    work_mode: "",
    job_location: "",
    remote: false,
    salary_range: "",
    job_experience_required: "",
    job_skills_required: [],
    industry: "",
    status: "Open",
    posted_at: new Date().toISOString().split("T")[0],
    employer_id: employerProfile?.employer_id
  });

  const [skillInput, setSkillInput] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleSkillAdd = () => {
    if (skillInput.trim() && !formData.job_skills_required.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        job_skills_required: [...prev.job_skills_required, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && skillInput.trim()) {
      e.preventDefault();
      handleSkillAdd();
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      job_skills_required: prev.job_skills_required.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASEURL}/jobs_post/create_Job_Post`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      if (response.status === 201) {
        alert('Job post created successfully!');
        setFormData({
          job_title: "",
          job_description: "",
          employment_type: "",
          work_mode: "",
          job_location: "",
          remote: false,
          salary_range: "",
          job_experience_required: "",
          job_skills_required: [],
          industry: "",
          status: "Open",
          posted_at: new Date().toISOString().split("T")[0],
        });
        setSkillInput('');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error creating job post');
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="bg-blue-600 p-4 rounded-t-lg">
          <h2 className="text-xl text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-white" />
            Create Job Post
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Briefcase className="w-4 h-4 text-gray-600" />
                  Job Title
                </label>
                <input
                  type="text"
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <FileText className="w-4 h-4 text-gray-600" />
                  Job Description
                </label>
                <textarea
                  name="job_description"
                  value={formData.job_description}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all h-24"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Clock className="w-4 h-4 text-gray-600" />
                  Employment Type
                </label>
                <select
                  name="employment_type"
                  value={formData.employment_type}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Globe className="w-4 h-4 text-gray-600" />
                  Work Mode
                </label>
                <select
                  name="work_mode"
                  value={formData.work_mode}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                >
                  <option value="">Select Work Mode</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  Location
                </label>
                <input
                  type="text"
                  name="job_location"
                  value={formData.job_location}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Building className="w-4 h-4 text-gray-600" />
                  Industry
                </label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <DollarSign className="w-4 h-4 text-gray-600" />
                  Salary Range
                </label>
                <input
                  type="text"
                  name="salary_range"
                  value={formData.salary_range}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <GraduationCap className="w-4 h-4 text-gray-600" />
                  Experience Required
                </label>
                <input
                  type="text"
                  name="job_experience_required"
                  value={formData.job_experience_required}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Blocks className="w-4 h-4 text-gray-600" />
                  Skills Required
                </label>
                <div className="border rounded p-3">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.job_skills_required.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="text-blue-600 hover:text-blue-800 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={skillInput}
                    onChange={handleSkillInputChange}
                    onKeyDown={handleKeyDown}
                    className="w-full border-none focus:outline-none p-1"
                    placeholder="Type skill and press Enter or comma to add"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center gap-2 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
              Create Job Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobPost;

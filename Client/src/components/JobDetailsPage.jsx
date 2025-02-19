import React, { useEffect, useState } from 'react';
import { CalendarDays, MapPin, Building2, Briefcase, Clock, DollarSign, GraduationCap, Laptop2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from '../utility/config';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const JobDetailsPage = () => {

  const { candidateProfile } = useSelector((state) => state.candidate);
  const candidate_id = candidateProfile.candidate_id;
  const params = useParams()
  const job = {
    company_display_name: "Stark Industries",
    company_logo: "https://www.starkindustries.com/logo.png",
    employer_id: "cc4ea805-ae10-41e0-a6bb-050f16cc0559",
    employment_type: "Internship",
    industry: "Technology",
    job_description: "We are looking for a skilled Software Engineer to develop and maintain applications.",
    job_experience_required: "2+ years",
    job_id: "08cbeaa7-e4fb-4653-8237-4a7eaa8c554a",
    job_location: "New York, USA",
    job_skills_required: ['JavaScript', 'Node.js', 'React', 'PostgreSQL'],
    job_title: "Software Engineer",
    posted_at: "2025-02-14T14:27:43.998021",
    salary_range: "$80,000 - $120,000",
    status: "active",
    work_mode: "Remote",
    // Additional fields
    benefits: [
      "Health, dental, and vision insurance",
      "401(k) matching",
      "Unlimited PTO",
      "Professional development budget",
      "Home office stipend"
    ],
    responsibilities: [
      "Develop and maintain web applications",
      "Write clean, maintainable, and efficient code",
      "Collaborate with cross-functional teams",
      "Participate in code reviews",
      "Troubleshoot and debug applications"
    ]
  };

  const [jobDetails, setJobDetails] = useState(null);

  const fetchJobDetails = async(jobId)=>{
            const res = await axios.get(`${BASEURL}/jobs_post/job_details/${jobId}`)
    
            if(res?.data?.success){
              console.log(res?.data?.job)
              setJobDetails(res?.data?.job)

            }
           
          }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };


  const handleApply = async()=>{
    try{
      const res = await axios.post(`${BASEURL}/jobs_post/apply_job`,{job_id:jobDetails.job_id, candidate_id})
      if(res?.data?.success){
        console.log(res?.data?.message)
        toast.success(res?.data?.message)
      }
    }catch(err){
      console.log(err)
    }

  }

  useEffect(() => {

        fetchJobDetails(params.jobId)
      
      }, []);

  return (
    <div className="min-h-screen mt-20 bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{jobDetails?.job_title}</h1>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  <span>{jobDetails?.company_display_name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{jobDetails?.job_location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>{jobDetails?.salary_range}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {jobDetails?.employment_type}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {jobDetails?.work_mode}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {jobDetails?.industry}
                </span>
              </div>
            </div>
            <button onClick={handleApply} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Apply Now
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Job Details */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <p className="text-gray-600 mb-6">{jobDetails?.job_description}</p>
              
              <h3 className="text-lg font-semibold mb-3">Key Responsibilities</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-6">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {job.job_skills_required.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-semibold mb-3">Benefits</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                {job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Job Overview</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Posted On</p>
                    <p className="text-gray-700">{formatDate(job.posted_at)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Experience Required</p>
                    <p className="text-gray-700">{job.job_experience_required}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Laptop2 className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Work Mode</p>
                    <p className="text-gray-700">{job.work_mode}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Company Info</h2>
              <img 
                src="/api/placeholder/120/60"
                alt="Company Logo" 
                className="mb-4 rounded"
              />
              <p className="text-gray-600 mb-4">
                Stark Industries is a leading technology company specializing in innovative solutions 
                for the modern world. Join our team of exceptional talents working on cutting-edge 
                technologies.
              </p>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Learn more about {job.company_display_name}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
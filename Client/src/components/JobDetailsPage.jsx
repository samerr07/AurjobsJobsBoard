// import React, { useState, useEffect, useRef } from 'react';
// import { Share2, Briefcase, MapPin, DollarSign, Building, Star, Send, Clock, Users, Linkedin, Mail, MessageCircle } from 'lucide-react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// const jobs1 = [
//   {
//       companyLogo: "/api/placeholder/50/50",
//       companyName: "Microsoft",
//       jobTitle: "Frontend Developer",
//       experience: "3+ years",
//       salary: "$120,000 - $150,000/year",
//       location: "Seattle, WA",
//       industry: "Technology",
//       employment_type: "Full time",
//       work_mode: "Hybrid",
//       postedDate: "2024-02-15"
//   },
//   {
//       companyLogo: "/api/placeholder/50/50",
//       companyName: "Google",
//       jobTitle: "Senior Software Engineer",
//       experience: "5+ years",
//       salary: "$160,000 - $200,000/year",
//       location: "Mountain View, CA",
//       industry: "Design",
//       employment_type: "Full time",
//       work_mode: "Onsite",
//       postedDate: "2024-02-16"
//   },
//   {
//       companyLogo: "/api/placeholder/50/50",
//       companyName: "Amazon",
//       jobTitle: "Full Stack Developer",
//       experience: "4+ years",
//       salary: "$130,000 - $170,000/year",
//       location: "Remote",
//       industry: "Science",
//       employment_type: "Contract",
//       work_mode: "Remote",
//       postedDate: "2024-02-12"
//   },
//   {
//       companyLogo: "/api/placeholder/50/50",
//       companyName: "Apple",
//       jobTitle: "iOS Developer",
//       experience: "2+ years",
//       salary: "$110,000 - $140,000/year",
//       location: "Cupertino, CA",
//       industry: "Business",
//       employment_type: "Full time",
//       work_mode: "Onsite",
//       postedDate: "2024-02-17"
//   },
//   {
//       companyLogo: "/api/placeholder/50/50",
//       companyName: "Meta",
//       jobTitle: "React Native Developer",
//       experience: "3+ years",
//       salary: "$125,000 - $160,000/year",
//       location: "Menlo Park, CA",
//       industry: "Finance",
//       employment_type: "Contract",
//       work_mode: "Hybrid",
//       postedDate: "2024-02-14"
//   },
//   {


//       companyLogo: "/api/placeholder/50/50",
//       companyName: "Netflix",
//       jobTitle: "Backend Engineer",
//       experience: "4+ years",
//       salary: "$140,000 - $180,000/year",
//       location: "Los Gatos, CA",
//       industry: "Marketing",
//       employment_type: "Full time",
//       work_mode: "Hybrid",
//       postedDate: "2024-02-13"
//   },
//   {
//       companyLogo: "/api/placeholder/50/50",
//       companyName: "Salesforce",
//       jobTitle: "DevOps Engineer",
//       experience: "5+ years",
//       salary: "$130,000 - $170,000/year",
//       location: "San Francisco, CA",
//       industry: "Customer Service",
//       employment_type: "Full time",
//       work_mode: "Onsite",
//       postedDate: "2024-02-10"
//   },
//   {
//       companyLogo: "/api/placeholder/50/50",
//       companyName: "Adobe",
//       jobTitle: "UI/UX Developer",
//       experience: "2+ years",
//       salary: "$100,000 - $130,000/year",
//       location: "San Jose, CA",
//       industry: "Human Resource",
//       employment_type: "Internship",
//       work_mode: "Hybrid",
//       postedDate: "2024-02-16"
//   },
//   {
//       companyLogo: "/api/placeholder/50/50",
//       companyName: "Twitter",
//       jobTitle: "Node.js Developer",
//       experience: "3+ years",
//       salary: "$115,000 - $145,000/year",
//       location: "Remote",
//       industry: "Technology",
//       employment_type: "Contract",
//       work_mode: "Remote",
//       postedDate: "2024-02-11"
//   },
//   {
//       companyLogo: "/api/placeholder/50/50",
//       companyName: "LinkedIn",
//       jobTitle: "Frontend Architect",
//       experience: "6+ years",
//       salary: "$170,000 - $210,000/year",
//       location: "Sunnyvale, CA",
//       industry: "Marketing",
//       employment_type: "Full time",
//       work_mode: "Onsite",
//       postedDate: "2024-02-15"
//   },
//   {
//       companyLogo: "/api/placeholder/50/50",
//       companyName: "Uber",
//       jobTitle: "Mobile Developer",
//       experience: "4+ years",
//       salary: "$135,000 - $165,000/year",
//       location: "San Francisco, CA",
//       industry: "Science",
//       employment_type: "Full-time",
//       work_mode: "Remote",
//       postedDate: "2024-02-14"
//   }
// ];
// const JobDetailsPage = () => {
//   const [showShareMenu, setShowShareMenu] = useState(false);
//   const shareMenuRef = useRef(null);
//   const [jobDetails, setJobDetails] = useState(null);
//   console.log(jobDetails)

//   const params = useParams()
//   console.log(params)

//   // const jobDetails = {
//   //       title: "Senior Frontend Developer",
//   //       company: "TechCorp Solutions",
//   //       location: "Lucknow",
//   //       salary: "$120,000 - $160,000",
//   //       matchScore: 85,
//   //       postedDate: "2 days ago",
//   //       applicants: "124",
//   //       description: "We're looking for a Senior Frontend Developer to join our growing team",
//   //       responsibilities: [
//   //         "Lead frontend development initiatives",
//   //         "Mentor junior developers",
//   //         "Implement responsive designs",
//   //         "Optimize application performance"
//   //       ],
//   //       requirements: [
//   //         "5+ years of React experience",
//   //         "Strong TypeScript skills",
//   //         "Experience with modern CSS frameworks",
//   //         "Bachelor's degree in Computer Science or related field"
//   //       ],
//   //       benefits: [
//   //         "Competitive salary",
//   //         "Health insurance",
//   //         "401(k) matching",
//   //         "Flexible remote work"
//   //       ],
//   //       similarJobs: [
//   //         { title: "Frontend Team Lead", company: "InnoTech", location: "Remote" },
//   //         { title: "Senior React Developer", company: "StartupX", location: "New York, NY" },
//   //         { title: "UI Engineer", company: "GrowthCo", location: "Austin, TX" }
//   //       ]
//   //     };


//       const fetchJobDetails = async(jobId)=>{
//         const res = await axios.get(`http://localhost:3000/jobs_post/job_details/${jobId}`)

//         if(res?.data?.success){
//           // console.log(res?.data)
//           setJobDetails(res?.data?.job)
//         }
       
//       }
//   useEffect(() => {

//     fetchJobDetails(params.jobId)
//     const handleClickOutside = (event) => {
//       if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
//         setShowShareMenu(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);



//   const handleShare = (platform) => {
//     const shareText = `Check out this ${jobDetails.title} position at ${jobDetails.company}!`;
//     const shareUrl = window.location.href;
    
//     switch (platform) {
//       case 'linkedin':
//         window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`);
//         break;
//       case 'whatsapp':
//         window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`);
//         break;
//       case 'email':
//         window.open(`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`);
//         break;
//     }
//     setShowShareMenu(false);
//   };

//   return (
//     <div className="max-w-5xl mt-20 mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
//       {/* Header Section */}
//       <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-6">
//         <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
//           <div className="space-y-4">
//             <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:space-x-6">
//               <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl md:text-2xl shrink-0">
//                 {jobDetails?.company_display_name.charAt(0)}
//               </div>
//               <div>
//                 <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{jobDetails?.job_title}</h1>
//                 <div className="flex flex-wrap items-center gap-4 text-gray-600 mt-3">
//                   <div className="flex items-center">
//                     <Building className="w-5 h-5 mr-2 text-blue-600" />
//                     {jobDetails?.company_display_name}
//                   </div>
//                   <div className="flex items-center">
//                     <MapPin className="w-5 h-5 mr-2 text-blue-600" />
//                     {jobDetails?.job_location}
//                   </div>
//                   <div className="flex items-center">
//                     <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
//                     {jobDetails?.salary_range}
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex flex-wrap gap-4 text-sm text-gray-500">
//               <div className="flex items-center">
//                 <Clock className="w-4 h-4 mr-2" />
//                 Posted {jobDetails?.posted_at}
//               </div>
//               {/* <div className="flex items-center">
//                 <Users className="w-4 h-4 mr-2" />
//                 {jobDetails.applicants} applicants
//               </div> */}
//             </div>
//           </div>
          
//           {/* Custom Share Menu */}
//           <div className="relative" ref={shareMenuRef}>
//             <button 
//               onClick={() => setShowShareMenu(!showShareMenu)}
//               className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-blue-600 transition-colors"
//             >
//               <Share2 className="w-4 h-4 mr-2" />
//               Share
//             </button>
            
//             {showShareMenu && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
//                 <button
//                   onClick={() => handleShare('linkedin')}
//                   className="w-full px-4 py-2 text-left flex items-center hover:bg-gray-50"
//                 >
//                   <Linkedin className="w-4 h-4 mr-3 text-blue-600" />
//                   LinkedIn
//                 </button>
//                 <button
//                   onClick={() => handleShare('whatsapp')}
//                   className="w-full px-4 py-2 text-left flex items-center hover:bg-gray-50"
//                 >
//                   <MessageCircle className="w-4 h-4 mr-3 text-green-600" />
//                   WhatsApp
//                 </button>
//                 <button
//                   onClick={() => handleShare('email')}
//                   className="w-full px-4 py-2 text-left flex items-center hover:bg-gray-50"
//                 >
//                   <Mail className="w-4 h-4 mr-3 text-gray-600" />
//                   Email
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Job Match Score */}
//         {/* <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-blue-800 font-medium">AI Job Match Score</span>
//             <span className="text-blue-800 font-bold">{jobDetails.matchScore}%</span>
//           </div>
//           <div className="w-full bg-blue-200 rounded-full h-2">
//             <div 
//               className="bg-blue-600 rounded-full h-2 transition-all duration-500"
//               style={{ width: `${jobDetails.matchScore}%` }}
//             />
//           </div>
//         </div> */}
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column - Job Details */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Job Description */}
//           <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
//             <h2 className="text-xl font-semibold mb-4">Job Description</h2>
//             <p className="text-gray-600 leading-relaxed">{jobDetails?.job_description}</p>
//           </div>

//           {/* Responsibilities */}
//           <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
//             <h2 className="text-xl font-semibold mb-4">Responsibilities</h2>
//             {/* <ul className="space-y-3 text-gray-600">
//               {jobDetails.responsibilities.map((item, index) => (
//                 <li key={index} className="flex items-start">
//                   <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3" />
//                   <span>{item}</span>
//                 </li>
//               ))}
//             </ul> */}
//           </div>

//           {/* Requirements */}
//           <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
//             <h2 className="text-xl font-semibold mb-4">Requirements</h2>
//             {/* <ul className="space-y-3 text-gray-600">
//               {jobDetails.requirements.map((item, index) => (
//                 <li key={index} className="flex items-start">
//                   <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3" />
//                   <span>{item}</span>
//                 </li>
//               ))}
//             </ul> */}
//           </div>
//         </div>

//         {/* Right Column - Company Info & Actions */}
//         <div className="space-y-6">
//           {/* Apply Now */}
//           <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
//             <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center font-medium">
//               <Send className="w-5 h-5 mr-2" />
//               Apply Now
//             </button>
//             {/* <button className="w-full mt-3 border-2 border-blue-600 text-blue-600 py-3 px-4 rounded-md hover:bg-blue-50 font-medium">
//               AI-Assisted Application
//             </button> */}
//           </div>

//           {/* Company Benefits */}
//           {/* <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
//             <h2 className="text-xl font-semibold mb-4">Company Benefits</h2>
//             <ul className="space-y-3">
//               {jobDetails.benefits.map((benefit, index) => (
//                 <li key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
//                   <Star className="w-5 h-5 mr-3 text-yellow-500" />
//                   <span className="text-gray-700">{benefit}</span>
//                 </li>
//               ))}
//             </ul>
//           </div> */}

//           {/* Similar Jobs */}
//           {/* <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
//             <h2 className="text-xl font-semibold mb-4">Similar Jobs</h2>
//             <div className="space-y-4">
//               {jobDetails.similarJobs.map((job, index) => (
//                 <div key={index} className="p-4 border rounded-md hover:bg-gray-50 hover:border-blue-600 cursor-pointer transition-colors">
//                   <h3 className="font-medium text-gray-900">{job.title}</h3>
//                   <div className="text-sm text-gray-600 mt-1 flex items-center">
//                     <Building className="w-4 h-4 mr-2" />
//                     {job.company} • {job.location}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div> */}
//         </div>
//       </div>
//     </div>
    
//   );
// };

// export default JobDetailsPage;



import React, { useEffect, useState } from 'react';
import { CalendarDays, MapPin, Building2, Briefcase, Clock, DollarSign, GraduationCap, Laptop2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from '../utility/config';

const JobDetailsPage = () => {

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
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
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
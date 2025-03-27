import React, { useState } from 'react'

const Experience = ({ candidateData, isEditing, handleExperienceArrayItemChange, addExperienceArrayItem, removeExperienceArrayItem }) => {

    const industries = [
        // Technology & IT
        "Technology",
        "Information Technology (IT)",
        "Software Development",
        "Artificial Intelligence (AI) & Machine Learning",
        "Cybersecurity",
        "Cloud Computing",
        "Blockchain",
        "Big Data & Analytics",
        "Telecommunications",
        "Game Development",
        "Web Development",
        "Mobile App Development",
        "Internet of Things (IoT)",
        "Augmented Reality (AR) & Virtual Reality (VR)",

        // Finance & Banking
        "Banking & Financial Services",
        "FinTech",
        "Investment Banking",
        "Insurance",
        "Accounting & Auditing",
        "Wealth Management",
        "Real Estate & Mortgage",

        // Healthcare & Pharmaceuticals
        "Healthcare",
        "Pharmaceuticals",
        "Biotechnology",
        "Medical Devices",
        "HealthTech",
        "Telemedicine",
        "Public Health & Hospitals",
        "Medical Research",

        // Education & Research
        "Education & E-learning",
        "Higher Education",
        "EdTech",
        "Research & Development (R&D)",
        "Training & Coaching",

        // Manufacturing & Engineering
        "Manufacturing",
        "Automotive",
        "Aerospace & Defense",
        "Electronics & Electricals",
        "Industrial Automation",
        "Textiles & Apparel",
        "Chemical Industry",
        "Metallurgy & Mining",

        // Energy & Utilities
        "Energy",
        "Oil & Gas",
        "Renewable Energy",
        "Electricity & Utilities",
        "Nuclear Energy",

        // Retail & E-commerce
        "Retail",
        "E-commerce",
        "Consumer Goods",
        "Luxury & Fashion",
        "Wholesale Distribution",
        "Supply Chain & Logistics",

        // Media & Entertainment
        "Media & Entertainment",
        "Film & Television",
        "Music Industry",
        "Advertising & Marketing",
        "Publishing",
        "Digital Media",
        "Gaming Industry",

        // Travel & Hospitality
        "Tourism & Hospitality",
        "Hotels & Resorts",
        "Airlines & Aviation",
        "Cruise & Maritime",
        "Travel Agencies",
        "Event Management",

        // Government & Nonprofit
        "Government & Public Administration",
        "Nonprofit & NGOs",
        "Legal Services",
        "Law Enforcement & Security",
        "International Relations",
        "Social Work",

        // Construction & Infrastructure
        "Construction",
        "Real Estate",
        "Urban Planning",
        "Architecture & Design",
        "Civil Engineering",

        // Agriculture & Food Industry
        "Agriculture",
        "Food & Beverage",
        "Dairy & Poultry",
        "Fisheries & Aquaculture",
        "AgriTech",

        // Transportation & Logistics
        "Transportation",
        "Logistics & Supply Chain",
        "Shipping & Freight",
        "Railways",
        "Maritime & Ports",

        // Environmental & Sustainability
        "Environmental Services",
        "Sustainable Energy",
        "Recycling & Waste Management",
        "Climate Change & Conservation"
    ];




    return (
        <section className="bg-gradient-to-b from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200 mt-12">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                    <span className="text-3xl">💼</span>
                    <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
                </div>
                {isEditing && (
                    <button
                        type="button"
                        onClick={() => addExperienceArrayItem('experiences', {
                            candidate_job_role: '',
                            candidate_company: '',
                            candidate_job_type: '',
                            candidate_start_date: '',
                            candidate_end_date: '',
                            candidate_industry: ''
                        })}
                        className="px-6 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 
            transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-200 
            flex items-center shadow-md"
                    >
                        <span className="mr-2 text-lg">+</span>
                        Add Experience
                    </button>
                )}
            </div>

            <div className="space-y-8">
                {candidateData.experiences?.map((exp) => (
                    <div
                        key={exp.experience_id}
                        className="relative group rounded-xl bg-white p-6 border border-gray-200 
            shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        {isEditing ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Job Role</label>
                                    <input
                                        type="text"
                                        value={exp.candidate_job_role}
                                        onChange={(e) => handleExperienceArrayItemChange('experiences', exp.experience_id, 'candidate_job_role', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                        placeholder="Enter job role"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Company</label>
                                    <input
                                        type="text"
                                        value={exp.candidate_company}
                                        onChange={(e) => handleExperienceArrayItemChange('experiences', exp.experience_id, 'candidate_company', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                        placeholder="Enter company name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Job Type</label>
                                    <select
                                        value={exp.candidate_job_type}
                                        onChange={(e) => handleExperienceArrayItemChange('experiences', exp.experience_id, 'candidate_job_type', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                    >
                                        <option value="">Select Job Type</option>
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Industry</label>
                                    {/* <input
                                        type="text"
                                        value={exp.candidate_industry}
                                        onChange={(e) => handleExperienceArrayItemChange('experiences', exp.experience_id, 'candidate_industry', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                        placeholder="Enter industry"
                                    /> */}
                                    <select
                                       value={exp.candidate_industry}
                                       onChange={(e) => handleExperienceArrayItemChange('experiences', exp.experience_id, 'candidate_industry', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500
     focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                        required
                                    >
                                        <option value="">Select Industry</option>
                                        {
                                            industries.map((indutsry) => (
                                                <option value={indutsry}>{indutsry}</option>
                                            ))
                                        }



                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Start Date</label>
                                    <input
                                        type="date"
                                        value={exp.candidate_start_date}
                                        onChange={(e) => handleExperienceArrayItemChange('experiences', exp.experience_id, 'candidate_start_date', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">End Date</label>
                                    <input
                                        type="date"
                                        value={exp.candidate_end_date}
                                        onChange={(e) => handleExperienceArrayItemChange('experiences', exp.experience_id, 'candidate_end_date', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Job Role</p>
                                    <p className="text-gray-800">{exp.candidate_job_role || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Company</p>
                                    <p className="text-gray-800">{exp.candidate_company || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Job Type</p>
                                    <p className="text-gray-800">{exp.candidate_job_type || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Industry</p>
                                    <p className="text-gray-800">{exp.candidate_industry || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Start Date</p>
                                    <p className="text-gray-800">{exp.candidate_start_date || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">End Date</p>
                                    <p className="text-gray-800">{exp.candidate_end_date || '-'}</p>
                                </div>
                            </div>
                        )}

                        {isEditing && (
                            <button
                                type="button"
                                onClick={() => removeExperienceArrayItem('experiences', exp.experience_id)}
                                className="absolute -top-3 -right-3 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 
                transition-colors duration-200 opacity-0 group-hover:opacity-100 shadow-sm"
                            >
                                <span className="text-lg">×</span>
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Experience

import React from "react";


const Preference = ({ candidateData, isEditing, handlePreferenceArrayItemChange, addPreferenceArrayItem, removePreferenceArrayItem }) => {
    return (
        <section className="max-w-4xl mx-auto bg-gradient-to-b from-white to-gray-50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                        <span className="text-2xl">⭐</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Candidate Preferences</h2>
                </div>
                {isEditing && (
                    <button
                        type="button"
                        onClick={() => addPreferenceArrayItem('preferences', {
                            work_authorization: '',
                            expected_salary: '',
                            salary_structure: '',
                            job_preference: '',
                            preferred_industry: '',
                            company_size: '',
                            custom_tags: '',
                            star_rating: '',
                            veteran_status: false,
                            pwd: false,
                            preferred_work_location: '',
                            employment_type: '',
                        })}
                        className="px-6 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 
              transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-200 
              flex items-center shadow-md"
                    >
                        <span className="mr-2 text-lg">+</span>
                        Add Preference
                    </button>
                )}
            </div>

            <div className="space-y-8">
                {candidateData.preferences?.map((preference) => (
                    <div
                        key={preference.preference_id}
                        className="relative group rounded-xl bg-white p-6 border border-gray-200 
              shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        {isEditing ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative group">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Work Authorization
                                    </label>
                                    <select
                                        value={preference.work_authorization || ''}
                                        onChange={(e) => handlePreferenceArrayItemChange('preferences', preference.preference_id, 'work_authorization', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    >
                                        <option value="">Select work authorization</option>
                                        <option value="Citizen">Citizen</option>
                                        <option value="Permanent Resident">Permanent Resident</option>
                                        <option value="Work Visa">Work Visa</option>
                                        <option value="Student Visa">Student Visa</option>
                                    </select>
                                </div>

                                <div className="relative group">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Expected Salary
                                    </label>
                                    <input
                                        type="number"
                                        value={preference.expected_salary || ''}
                                        onChange={(e) => handlePreferenceArrayItemChange('preferences', preference.preference_id, 'expected_salary', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        placeholder="Enter expected salary"
                                    />
                                </div>

                                <div className="relative group">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Salary Structure
                                    </label>
                                    <select
                                        value={preference.salary_structure || ''}
                                        onChange={(e) => handlePreferenceArrayItemChange('preferences', preference.preference_id, 'salary_structure', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    >
                                        <option value="">Select salary structure</option>
                                        <option value="Hourly">Hourly</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Annual">Annual</option>
                                    </select>
                                </div>

                                <div className="relative group">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Job Preference
                                    </label>
                                    <textarea
                                        value={preference.job_preference || ''}
                                        onChange={(e) => handlePreferenceArrayItemChange('preferences', preference.preference_id, 'job_preference', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        placeholder="Describe your job preferences"
                                        rows="3"
                                    />
                                </div>

                                <div className="relative group">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Preferred Industry
                                    </label>
                                    <select
                                        value={preference.preferred_industry || ''}
                                        onChange={(e) => handlePreferenceArrayItemChange('preferences', preference.preference_id, 'preferred_industry', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    >
                                        <option value="">Select preferred industry</option>
                                        <option value="Technology">Technology</option>
                                        <option value="Healthcare">Healthcare</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Education">Education</option>
                                        <option value="Manufacturing">Manufacturing</option>
                                        <option value="Retail">Retail</option>
                                    </select>
                                </div>

                                <div className="relative group">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Company Size
                                    </label>
                                    <select
                                        value={preference.company_size || ''}
                                        onChange={(e) => handlePreferenceArrayItemChange('preferences', preference.preference_id, 'company_size', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    >
                                        <option value="">Select company size</option>
                                        <option value="Startup (1-50)">Startup (1-50)</option>
                                        <option value="Small (51-200)">Small (51-200)</option>
                                        <option value="Medium (201-1000)">Medium (201-1000)</option>
                                        <option value="Large (1000+)">Large (1000+)</option>
                                    </select>
                                </div>

                                <div className="relative group">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Custom Tags
                                    </label>
                                    <input
                                        type="text"
                                        value={preference.custom_tags || ''}
                                        onChange={(e) => handlePreferenceArrayItemChange('preferences', preference.preference_id, 'custom_tags', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        placeholder="Enter tags separated by commas"
                                    />
                                </div>

                                <div className="relative group">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Star Rating
                                    </label>
                                    <select
                                        value={preference.star_rating || ''}
                                        onChange={(e) => handlePreferenceArrayItemChange('preferences', preference.preference_id, 'star_rating', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    >
                                        <option value="">Select rating</option>
                                        <option value="1">1 - Poor</option>
                                        <option value="2">2 - Fair</option>
                                        <option value="3">3 - Good</option>
                                        <option value="4">4 - Very Good</option>
                                        <option value="5">5 - Excellent</option>
                                    </select>
                                </div>

                                <div className="relative group">


                                    <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                                        Employment Type
                                    </label>
                                    <select
                                       
                                        value={preference.employment_type || ''}
                                        onChange={(e) => handlePreferenceArrayItemChange('preferences', preference.preference_id, 'employment_type', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white 
               focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
               group-hover:border-blue-300 transition-all duration-300 ease-in-out"
                                    >
                                        <option value="">Select Employment Type</option>
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Freelance">Freelance</option>
                                        <option value="Internship">Internship</option>
                                    </select>


                                </div>

                                <div className="relative group">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Preferred Work Location
                                    </label>
                                    <select
                                        value={preference.preferred_work_location || ''}
                                        onChange={(e) => handlePreferenceArrayItemChange('preferences', preference.preference_id, 'preferred_work_location', e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    >
                                        <option value="">Select work location preference</option>
                                        <option value="Remote">Remote</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="On-site">On-site</option>
                                    </select>
                                </div>

                                <div className="relative group flex items-center md:col-span-2">
                                    <input
                                        type="checkbox"
                                        checked={preference.veteran_status || false}
                                        onChange={(e) => handlePreferenceArrayItemChange('preferences', preference.preference_id, 'veteran_status', e.target.checked)}
                                        className="w-5 h-5 rounded border-2 border-gray-300 focus:ring-2 focus:ring-blue-200 text-blue-600"
                                    />
                                    <label className="ml-2 text-sm font-medium text-gray-700">
                                        Veteran Status
                                    </label>
                                </div>

                                <div className="relative group flex items-center md:col-span-2">
                                    <input
                                        type="checkbox"
                                        checked={preference.pwd || false}
                                        onChange={(e) => handlePreferenceArrayItemChange('preferences', preference.preference_id, 'pwd', e.target.checked)}
                                        className="w-5 h-5 rounded border-2 border-gray-300 focus:ring-2 focus:ring-blue-200 text-blue-600"
                                    />
                                    <label className="ml-2 text-sm font-medium text-gray-700">
                                        Person with Disability
                                    </label>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Work Authorization</p>
                                    <p className="text-gray-800">{preference.work_authorization || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Expected Salary</p>
                                    <p className="text-gray-800">{preference.expected_salary ? `$${preference.expected_salary}` : '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Salary Structure</p>
                                    <p className="text-gray-800">{preference.salary_structure || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Job Preference</p>
                                    <p className="text-gray-800">{preference.job_preference || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Preferred Industry</p>
                                    <p className="text-gray-800">{preference.preferred_industry || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Company Size</p>
                                    <p className="text-gray-800">{preference.company_size || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Custom Tags</p>
                                    <div className="flex flex-wrap gap-2">
                                        {preference.custom_tags ? (
                                            preference.custom_tags.split(',').map((tag, index) => (
                                                <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm">
                                                    {tag.trim()}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-gray-800">-</p>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Star Rating</p>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span key={star} className={`text-xl ${parseInt(preference.star_rating) >= star ? 'text-yellow-400' : 'text-gray-300'}`}>
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Preferred Work Location</p>
                                    <p className="text-gray-800">{preference.preferred_work_location || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Employment Type</p>
                                    <p className="text-gray-800">{preference.employment_type || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Veteran Status</p>
                                    <p className="text-gray-800">{preference.veteran_status ? 'Yes' : 'No'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500">Person with Disability</p>
                                    <p className="text-gray-800">{preference.pwd ? 'Yes' : 'No'}</p>
                                </div>
                            </div>
                        )}

                        {isEditing && (
                            <button
                                type="button"
                                onClick={() => removePreferenceArrayItem('preferences', preference.preference_id)}
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
    );
};

export default Preference;
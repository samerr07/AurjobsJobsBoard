import React from 'react'

const ProfessionalInformation = ({ isEditing, candidateData, handleInputChange, errors }) => {
    return (
        //     <section id="professional" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-12">
        //     <div className="flex items-center mb-6">
        //         <span className="text-2xl mr-3">💼</span>
        //         <h2 className="text-xl font-semibold text-gray-800">Professional Information</h2>
        //     </div>
        //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        //         <div>
        //             <label className="block text-sm font-medium text-gray-700 mb-1">Current Role</label>
        //             <input
        //                 type="text"
        //                 name="candidate_current_role"
        //                 value={candidateData.candidate_current_role}
        //                 onChange={handleInputChange}
        //                 disabled={!isEditing}
        //                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
        //             />
        //         </div>
        //         <div>
        //             <label className="block text-sm font-medium text-gray-700 mb-1">Current Salary</label>
        //             <input
        //                 type="number"
        //                 name="candidate_current_salary"
        //                 value={candidateData.candidate_current_salary}
        //                 onChange={handleInputChange}
        //                 disabled={!isEditing}
        //                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
        //             />
        //         </div>
        //         <div>
        //             <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        //             <input
        //                 type="text"
        //                 name="candidate_location"
        //                 value={candidateData.candidate_location}
        //                 onChange={handleInputChange}
        //                 disabled={!isEditing}
        //                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
        //             />
        //         </div>
        //         <div>
        //             <label className="block text-sm font-medium text-gray-700 mb-1">Work Preference</label>
        //             <select
        //                 name="candidate_work_preference"
        //                 value={candidateData.candidate_work_preference}
        //                 onChange={handleInputChange}
        //                 disabled={!isEditing}
        //                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
        //             >
        //                 <option value="Remote">Remote</option>
        //                 <option value="Hybrid">Hybrid</option>
        //                 <option value="On-site">On-site</option>
        //             </select>
        //         </div>
        //     </div>
        // </section>
        <section className="max-w-4xl mx-auto bg-gradient-to-b from-white to-gray-50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                        <span className="text-2xl">💼</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Professional Information</h2>
                </div>
                <div className="flex items-center gap-4">
                    {isEditing && (
                        <span className="text-sm px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-medium">
                            Editing Mode
                        </span>
                    )}

                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Role */}
                <div className="relative group">
                    {isEditing ? (
                        <>
                            <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                                Current Role
                            </label>
                            <input
                                type="text"
                                name="candidate_current_role"
                                value={candidateData.candidate_current_role}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white 
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                   group-hover:border-blue-300 transition-all duration-300 ease-in-out"
                                placeholder="Enter your current role"
                            />
                        </>
                    ) : (
                        <div className="py-3">
                            <span className="text-sm text-gray-600">Current Role</span>
                            <p className="mt-1 text-gray-900">{candidateData.candidate_current_role || 'Not provided'}</p>
                        </div>
                    )}
                </div>

                {/* Current Salary */}
                <div className="relative group">
                    {isEditing ? (
                        <>
                            <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                                Current Salary
                            </label>
                            <input
                                type="number"
                                name="candidate_current_salary"
                                value={candidateData.candidate_current_salary}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white 
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                   group-hover:border-blue-300 transition-all duration-300 ease-in-out"
                                placeholder="Enter your current salary"
                            />
                        </>
                    ) : (
                        <div className="py-3">
                            <span className="text-sm text-gray-600">Current Salary</span>
                            <p className="mt-1 text-gray-900">
                                {candidateData.candidate_current_salary
                                    ? `$${Number(candidateData.candidate_current_salary).toLocaleString()}`
                                    : 'Not provided'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Location */}
                <div className="relative group">
                    {isEditing ? (
                        <>
                            <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                                Location
                            </label>
                            <input
                                type="text"
                                name="candidate_location"
                                value={candidateData.candidate_location}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white 
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                   group-hover:border-blue-300 transition-all duration-300 ease-in-out"
                                placeholder="Enter your location"
                            />
                        </>
                    ) : (
                        <div className="py-3">
                            <span className="text-sm text-gray-600">Location</span>
                            <p className="mt-1 text-gray-900">{candidateData.candidate_location || 'Not provided'}</p>
                        </div>
                    )}
                </div>

                {/* Work Preference */}
                <div className="relative group">
                    {isEditing ? (
                        <>
                            <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                                Work Preference
                            </label>
                            <select
                                name="candidate_work_preference"
                                value={candidateData.candidate_work_preference}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white 
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                   group-hover:border-blue-300 transition-all duration-300 ease-in-out"
                            >
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="On-site">On-site</option>
                            </select>
                        </>
                    ) : (
                        <div className="py-3">
                            <span className="text-sm text-gray-600">Work Preference</span>
                            <p className="mt-1 text-gray-900">{candidateData.candidate_work_preference || 'Not provided'}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default ProfessionalInformation

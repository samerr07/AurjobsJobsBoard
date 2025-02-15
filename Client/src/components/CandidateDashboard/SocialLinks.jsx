import React from 'react'

const SocialLinks = ({ isEditing, candidateData, handleInputChange, errors, removeArrayItem, addArrayItem,handleArrayItemChange }) => {
  
    const socialLinks = [
        {
          name: 'GitHub',
          icon: (
            <svg className="h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
            </svg>
          ),
          field: 'candidate_github_link',
          placeholder: 'https://github.com/username'
        },
        {
          name: 'LinkedIn',
          icon: (
            <svg className="h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          ),
          field: 'candidate_linkedin_link',
          placeholder: 'https://linkedin.com/in/username'
        }
      ];
  
    return (
    // <section className="max-w-4xl mx-auto bg-gradient-to-b from-white to-gray-50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 mt-12">
    //                         <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
    //                             <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
    //                                 <span className="text-2xl">🔗</span>
    //                             </div>
    //                             <h2 className="text-2xl font-bold text-gray-800">Social Links</h2>
    //                         </div>

    //                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    //                             <div className="group">
    //                                 <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-purple-600 transition-colors duration-200">
    //                                     GitHub
    //                                 </label>
    //                                 <div className="relative">
    //                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    //                                         <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
    //                                             <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
    //                                         </svg>
    //                                     </div>
    //                                     <input
    //                                         type="url"
    //                                         name="candidate_github_link"
    //                                         value={candidateData.candidate_github_link}
    //                                         onChange={handleInputChange}
    //                                         disabled={!isEditing}
    //                                         className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500 hover:border-purple-400"
    //                                         placeholder="https://github.com/username"
    //                                     />
    //                                 </div>
    //                             </div>

    //                             <div className="group">
    //                                 <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-purple-600 transition-colors duration-200">
    //                                     LinkedIn
    //                                 </label>
    //                                 <div className="relative">
    //                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    //                                         <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
    //                                             <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    //                                         </svg>
    //                                     </div>
    //                                     <input 
    //                                         type="url"
    //                                         name="candidate_linkedin_link"
    //                                         value={candidateData.candidate_linkedin_link}
    //                                         onChange={handleInputChange}
    //                                         disabled={!isEditing}
    //                                         className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500 hover:border-purple-400"
    //                                         placeholder="https://linkedin.com/in/username"
    //                                     />
    //                                 </div>
    //                             </div>

                               
    //                         </div>
    //                     </section>

    <section className="max-w-4xl mx-auto bg-gradient-to-b from-white to-gray-50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 mt-12">
    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
      <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center 
      transform transition-transform duration-300 hover:rotate-12">
        <span className="text-2xl">🔗</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Social Links</h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {socialLinks.map((social) => (
        <div key={social.name} className="group transform transition-all duration-200 hover:-translate-y-1">
          <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-purple-600 
          transition-colors duration-200">
            {social.name}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {social.icon}
            </div>
            <input
              type="url"
              name={social.field}
              value={candidateData[social.field]}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 
              ${isEditing 
                ? 'border-gray-200 hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200' 
                : 'border-transparent bg-gray-50'
              } 
              transition-all duration-200 
              disabled:text-gray-500
              ${isEditing ? 'hover:shadow-md' : ''}
              outline-none`}
              placeholder={social.placeholder}
            />
          </div>
        </div>
      ))}
    </div>
  </section>
  )
}

export default SocialLinks

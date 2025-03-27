// import React, { useMemo } from 'react';

// const ProfileCompletionProgress = ({ candidateData }) => {
//   const calculateProfileCompletion = useMemo(() => {
//     // Define the fields to check for completion
//     const checkFields = [
//       // Personal Information
//       'firstName', 'lastName', 'email', 'phone', 
//       'dateOfBirth', 'gender', 'nationality',

//       // Address
//       'addresses', 

//       // Professional Details
//       'skills', 'languages', 'certifications', 
//       'experiences', 'education', 'preferences'
//     ];

//     // Calculate total possible points
//     const totalPoints = checkFields.length;
//     let completedPoints = 0;

//     // Check basic fields
//     checkFields.forEach(field => {
//       if (field === 'addresses' && candidateData.addresses && candidateData.addresses.length > 0) {
//         completedPoints++;
//       } else if (field === 'skills' && candidateData.skills && candidateData.skills.length > 0) {
//         completedPoints++;
//       } else if (field === 'languages' && candidateData.languages && candidateData.languages.length > 0) {
//         completedPoints++;
//       } else if (field === 'certifications' && candidateData.certifications && candidateData.certifications.length > 0) {
//         completedPoints++;
//       } else if (field === 'experiences' && candidateData.experiences && candidateData.experiences.length > 0) {
//         completedPoints++;
//       } else if (field === 'education' && candidateData.education && candidateData.education.length > 0) {
//         completedPoints++;
//       } else if (field === 'preferences' && candidateData.preferences && candidateData.preferences.length > 0) {
//         completedPoints++;
//       } else if (candidateData[field] && candidateData[field].toString().trim() !== '') {
//         completedPoints++;
//       }
//     });

//     // Calculate percentage
//     const completionPercentage = Math.round((completedPoints / totalPoints) * 100);
//     return completionPercentage;
//   }, [candidateData]);

//   const getProgressColor = (percentage) => {
//     if (percentage < 25) return 'bg-red-500';
//     if (percentage < 50) return 'bg-orange-500';
//     if (percentage < 75) return 'bg-yellow-500';
//     return 'bg-green-500';
//   };

//   return (
//     <div className="mb-6">
//       <div className="flex justify-between items-center mb-2">
//         <span className="text-sm font-medium text-gray-600">Profile Completion</span>
//         <span className="text-sm font-bold text-gray-800">{calculateProfileCompletion}%</span>
//       </div>
//       <div className="w-full bg-gray-200 rounded-full h-2.5">
//         <div 
//           className={`h-2.5 rounded-full transition-all duration-300 ${getProgressColor(calculateProfileCompletion)}`}
//           style={{ width: `${calculateProfileCompletion}%` }}
//         ></div>
//       </div>
//       {calculateProfileCompletion < 100 && (
//         <p className="text-xs text-gray-500 mt-2">
//           Complete your profile to increase your chances of getting noticed by recruiters.
//         </p>
//       )}
//     </div>
//   );
// };

// export default ProfileCompletionProgress;

import React, { useMemo } from 'react';

const ProfileCompletionProgress = ({ candidateData }) => {
  const completionChecks = [
    // Basic Personal Information
    {
      name: 'Personal Info',
      check: () => !!(
        candidateData.candidate_first_name && 
        candidateData.candidate_last_name && 
        candidateData.candidate_email && 
        candidateData.candidate_phone && 
        candidateData.candidate_gender && 
        candidateData.candidate_date_of_birth
      )
    },
    // Professional Details
    {
      name: 'Professional Details',
      check: () => !!(
        candidateData.candidate_current_role && 
        candidateData.candidate_work_preference
      )
    },
    // Experiences
    {
      name: 'Work Experience',
      check: () => candidateData.experiences && candidateData.experiences.length > 0
    },
    // Skills
    {
      name: 'Skills',
      check: () => candidateData.skills && candidateData.skills.length > 0
    },
    // Languages
    {
      name: 'Languages',
      check: () => candidateData.languages && candidateData.languages.length > 0
    },
    // Education
    {
      name: 'Education',
      check: () => candidateData.education && candidateData.education.length > 0
    },
    // Certifications
    {
      name: 'Certifications',
      check: () => candidateData.certifications && candidateData.certifications.length > 0
    },
    // Addresses
    {
      name: 'Address',
      check: () => candidateData.addresses && candidateData.addresses.length > 0
    },
    // Preferences
    {
      name: 'Job Preferences',
      check: () => candidateData.preferences && candidateData.preferences.length > 0
    },
    // Online Profiles
    {
      name: 'Online Profiles',
      check: () => !!(
        candidateData.candidate_github_link || 
        candidateData.candidate_linkedin_link
      )
    }
  ];

  const calculateProfileCompletion = useMemo(() => {
    // Calculate completion
    const completedSections = completionChecks.filter(section => section.check());
    const completionPercentage = Math.round((completedSections.length / completionChecks.length) * 100);

    return {
      percentage: completionPercentage,
      completedSections: completedSections.map(section => section.name)
    };
  }, [candidateData, completionChecks]);

  const getProgressColor = (percentage) => {
    if (percentage < 25) return 'bg-red-500';
    if (percentage < 50) return 'bg-orange-500';
    if (percentage < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">Profile Completion</span>
        <span className="text-sm font-bold text-gray-800">{calculateProfileCompletion.percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div 
          className={`h-2.5 rounded-full transition-all duration-300 ${getProgressColor(calculateProfileCompletion.percentage)}`}
          style={{ width: `${calculateProfileCompletion.percentage}%` }}
        ></div>
      </div>
      {calculateProfileCompletion.percentage < 100 && (
        <div>
          <p className="text-xs text-gray-500 mt-2">
            Complete your profile to increase your chances of getting noticed by recruiters.
          </p>
          <details className="text-xs text-gray-600 mt-2">
            <summary>Sections to Complete</summary>
            <ul className="list-disc list-inside">
              {completionChecks
                .filter(section => !section.check())
                .map(section => (
                  <li key={section.name}>{section.name}</li>
                ))}
            </ul>
          </details>
        </div>
      )}
    </div>
  );
};

export default ProfileCompletionProgress;
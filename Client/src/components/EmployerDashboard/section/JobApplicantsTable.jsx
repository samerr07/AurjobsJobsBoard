import React from 'react';

const JobApplicantsTable = ({ applicants }) => {
  console.log(applicants)
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Full Name</th>
            {/* <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">College Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Experience</th> */}
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Current Role</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Location</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Profile</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Gender</th>
          </tr>
        </thead>
        <tbody>
  {applicants.length > 0 ? (
    applicants.map((applicant) => (
      <tr key={applicant.candidate_id} className="border-b hover:bg-gray-50">
        <td className="px-4 py-2 text-sm text-gray-700">
          {applicant.candidate_first_name} {applicant.candidate_last_name}
        </td>
        <td className="px-4 py-2 text-sm text-gray-700">{applicant.candidate_current_role}</td>
        <td className="px-4 py-2 text-sm text-gray-700">{applicant.candidate_location}</td>
        <td className="px-4 py-2 text-sm text-blue-600">
          <a href={applicant.candidate_resume_link} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </td>
        <td className="px-4 py-2 text-sm text-gray-700">{applicant.candidate_gender}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="px-4 py-2 text-sm text-gray-700 text-center">
        No applicants available
      </td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
};

export default JobApplicantsTable;

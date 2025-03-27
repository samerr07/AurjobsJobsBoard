import React from 'react'

const Education = ({ addEducationArrayItem, isEditing, removeEducationArrayItem, handleEducationArrayItemChange, candidateData, handleInputChange, errors, removeArrayItem, addArrayItem, handleArrayItemChange }) => {


  const degreesList = [
    // Undergraduate Degrees
    "Associate of Arts (AA)",
    "Associate of Science (AS)",
    "Associate of Applied Science (AAS)",
    "Bachelor of Arts (BA)",
    "Bachelor of Science (BS)",
    "Bachelor of Business Administration (BBA)",
    "Bachelor of Commerce (BCom)",
    "Bachelor of Engineering (BE)",
    "Bachelor of Technology (BTech)",
    "Bachelor of Computer Applications (BCA)",
    "Bachelor of Fine Arts (BFA)",
    "Bachelor of Architecture (BArch)",
    "Bachelor of Design (BDes)",
    "Bachelor of Pharmacy (BPharm)",
    "Bachelor of Law (LLB)",
    "Bachelor of Education (BEd)",
    "Bachelor of Social Work (BSW)",
    "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
    "Bachelor of Dental Surgery (BDS)",
    "Bachelor of Nursing (BN)",
    "Bachelor of Public Health (BPH)",
  
    // Postgraduate Degrees
    "Master of Arts (MA)",
    "Master of Science (MS/MSc)",
    "Master of Business Administration (MBA)",
    "Master of Commerce (MCom)",
    "Master of Engineering (ME)",
    "Master of Technology (MTech)",
    "Master of Computer Applications (MCA)",
    "Master of Fine Arts (MFA)",
    "Master of Architecture (MArch)",
    "Master of Design (MDes)",
    "Master of Pharmacy (MPharm)",
    "Master of Law (LLM)",
    "Master of Education (MEd)",
    "Master of Social Work (MSW)",
    "Master of Public Administration (MPA)",
    "Master of Public Health (MPH)",
    "Master of Philosophy (MPhil)",
  
    // Doctorate Degrees
    "Doctor of Philosophy (PhD)",
    "Doctor of Science (DSc)",
    "Doctor of Engineering (DEng)",
    "Doctor of Medicine (MD)",
    "Doctor of Dental Medicine (DMD)",
    "Doctor of Pharmacy (PharmD)",
    "Doctor of Public Health (DrPH)",
    "Doctor of Business Administration (DBA)",
    "Doctor of Education (EdD)",
    "Doctor of Laws (LLD)",
    "Doctor of Social Work (DSW)",
  
    // Professional Degrees
    "Juris Doctor (JD)",
    "Doctor of Veterinary Medicine (DVM)",
    "Doctor of Optometry (OD)",
    "Doctor of Physical Therapy (DPT)",
    "Doctor of Chiropractic (DC)",
    "Doctor of Occupational Therapy (OTD)",
  
    // Diplomas & Certificates
    "Diploma in Engineering",
    "Diploma in Nursing",
    "Diploma in Computer Applications",
    "Postgraduate Diploma (PGD)",
    "Advanced Diploma",
    "Certificate Program"
  ];
  
  const educationSpecialties = [
    // Computer Science & IT
    "Computer Science",
    "Software Engineering",
    "Data Science",
    "Artificial Intelligence",
    "Cybersecurity",
    "Information Technology",
    "Cloud Computing",
    "Full Stack Development",
    "Machine Learning",
    "Game Development",
    "Mobile App Development",
    "Blockchain Technology",
    "Computer Networking",
    "Database Management",
    "Web Development",
    "Embedded Systems",
    "Human-Computer Interaction",
    "Big Data Analytics",
    "DevOps",
    "Data Engineering",
  
    // Engineering Fields
    "Mechanical Engineering",
    "Electrical Engineering",
    "Electronics and Communication Engineering",
    "Civil Engineering",
    "Automobile Engineering",
    "Aerospace Engineering",
    "Biomedical Engineering",
    "Chemical Engineering",
    "Environmental Engineering",
    "Industrial Engineering",
    "Robotics Engineering",
  
    // Business & Management
    "Business Administration",
    "Finance and Accounting",
    "Marketing",
    "Entrepreneurship",
    "Supply Chain Management",
    "Human Resource Management",
    "Operations Management",
    "E-commerce",
  
    // Health & Medicine
    "Medicine",
    "Nursing",
    "Pharmacy",
    "Dentistry",
    "Physiotherapy",
    "Public Health",
    "Nutrition and Dietetics",
    "Biotechnology",
    "Biomedical Sciences",
    "Veterinary Science",
  
    // Arts & Humanities
    "English Literature",
    "History",
    "Philosophy",
    "Linguistics",
    "Psychology",
    "Sociology",
    "Political Science",
    "International Relations",
    "Education and Teaching",
    "Fine Arts",
    "Music",
    "Theater and Performing Arts",
    "Journalism and Mass Communication",
  
    // Science & Research
    "Physics",
    "Chemistry",
    "Biology",
    "Mathematics",
    "Astronomy",
    "Geology",
    "Environmental Science",
    "Agriculture",
    "Forestry",
    "Marine Biology",
    "Genetics",
  
    // Law & Legal Studies
    "Law",
    "Criminology",
    "Forensic Science",
    "Intellectual Property Law",
    "Corporate Law",
    "International Law",
    "Human Rights Law",
  
    // Social Sciences & Others
    "Social Work",
    "Anthropology",
    "Economics",
    "Urban Planning",
    "Library and Information Science",
  
    // Design & Creative Fields
    "Graphic Design",
    "UI/UX Design",
    "Fashion Design",
    "Interior Design",
    "Industrial Design",
    "Film and Television Production",
    "Animation and Visual Effects",
    "Photography",
  
    // Education & Training
    "Primary Education",
    "Secondary Education",
    "Higher Education",
    "Special Education",
    "Educational Psychology",
    "E-learning and Instructional Design"
  ];
  

  return (
    // <section id='education' className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-12">
    //   <div className="flex items-center justify-between mb-6">
    //     <div className="flex items-center">
    //       <span className="text-2xl mr-3">🎓</span>
    //       <h2 className="text-xl font-semibold text-gray-800">Education</h2>
    //     </div>
    //     {isEditing && (
    //       <button
    //         type="button"
    //         onClick={() => addEducationArrayItem('education', { candidate_degree: '', candidate_institute: '', candidate_end_year: '', candidate_start_year: '', candidate_score: '', candidate_education_level: '' })}
    //         className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center"
    //       >
    //         <span className="mr-2">+</span>
    //         Add Education
    //       </button>
    //     )}
    //   </div>

    //   <div className="space-y-6">
    //     {
    //       candidateData.education.map((edu) => (
    //         <div key={edu.education_id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
    //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //             <div>
    //               <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
    //               <input
    //                 type="text"
    //                 value={edu.candidate_degree}
    //                 onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_degree', e.target.value)}
    //                 disabled={!isEditing}
    //                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
    //               />
    //             </div>

    //             <div>
    //               <label className="block text-sm font-medium text-gray-700 mb-1">Education Level</label>
    //               <input
    //                 type="text"
    //                 value={edu.candidate_education_level}
    //                 onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_education_level', e.target.value)}
    //                 disabled={!isEditing}
    //                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
    //               />
    //             </div>

    //             <div>
    //               <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
    //               <input
    //                 type="text"
    //                 value={edu.candidate_institute}
    //                 onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_institute', e.target.value)}
    //                 disabled={!isEditing}
    //                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
    //               />
    //             </div>

    //             <div>
    //               <label className="block text-sm font-medium text-gray-700 mb-1">Score</label>
    //               <input
    //                 type="text"
    //                 value={edu.candidate_score}
    //                 onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_score', e.target.value)}
    //                 disabled={!isEditing}
    //                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
    //               />
    //             </div>

    //             <div>
    //               <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
    //               <input
    //                 type="number"
    //                 value={edu.candidate_start_year}
    //                 onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_start_year', e.target.value)}
    //                 disabled={!isEditing}
    //                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
    //               />
    //             </div>

    //             <div>
    //               <label className="block text-sm font-medium text-gray-700 mb-1">End Year</label>
    //               <input
    //                 type="number"
    //                 value={edu.candidate_end_year}
    //                 onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_end_year', e.target.value)}
    //                 disabled={!isEditing}
    //                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
    //               />
    //             </div>


    //           </div>
    //           {isEditing && (
    //           <button
    //               type="button"
    //               onClick={() => removeEducationArrayItem('education', edu.education_id)}
    //               className="text-red-600 hover:text-red-800 transition-colors p-2"
    //           >
    //               🗑
    //           </button>
    //       )}
    //         </div>

    //       ))
    //     }

    //   </div>
    // </section>

    <section className="bg-gradient-to-b from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200 mt-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <span className="text-3xl">🎓</span>
          <h2 className="text-2xl font-bold text-gray-800">Education</h2>
        </div>
        {isEditing && (
          <button
            type="button"
            onClick={() => addEducationArrayItem('education', {
              candidate_degree: '',
              candidate_institute: '',
              candidate_end_year: '',
              candidate_start_year: '',
              candidate_score: '',
              candidate_education_level: '',
              candidate_degree_specialization:''
            })}
            className="px-6 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 
            transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-200 
            flex items-center shadow-md"
          >
            <span className="mr-2 text-lg">+</span>
            Add Education
          </button>
        )}
      </div>

      <div className="space-y-8">
        {candidateData.education.map((edu) => (
          <div
            key={edu.education_id}
            className="relative group rounded-xl bg-white p-6 border border-gray-200 
            shadow-sm hover:shadow-md transition-all duration-200"
          >
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Degree</label>
                  <input
                    type="text"
                    value={edu.candidate_degree}
                    onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_degree', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                    placeholder="Enter degree name"
                    required
                  />
                </div> */}

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Degree</label>
                  <select
                    value={edu.candidate_degree}
                    onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_degree', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500
     focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                    required
                  >
                     <option value="">Select education level</option>
                    {
                      degreesList.map((degree)=>(
                        <option value={degree}>{degree}</option>
                      ))
                    }
                   
                    
                    
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Specialization</label>
                  <select
                    value={edu.candidate_degree_specialization}
                    onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_degree_specialization', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500
     focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                    required
                  >
                     <option value="">Select education specialization</option>
                    {
                      educationSpecialties.map((specialization)=>(
                        <option value={specialization}>{specialization}</option>
                      ))
                    }
                    
                  </select>
                </div>

                {/* <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Education Level</label>
                  <input
                    type="text"
                    value={edu.candidate_education_level}
                    onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_education_level', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                    placeholder="Enter education level"
                    required
                  />
                </div> */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Education Level</label>
                  <select
                    value={edu.candidate_education_level}
                    onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_education_level', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500
     focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                    required
                  >
                    <option value="">Select education level</option>
                    <option value="High School">High School</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="Master's">Master's</option>
                    <option value="PhD">PhD</option>
                    
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Institution</label>
                  <input
                    type="text"
                    value={edu.candidate_institute}
                    onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_institute', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                    placeholder="Enter institution name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Score</label>
                  <input
                    type="text"
                    value={edu.candidate_score}
                    onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_score', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                    placeholder="Enter score"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Start Year</label>
                  <input
                    type="number"
                    value={edu.candidate_start_year}
                    onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_start_year', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                    placeholder="Enter start year"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">End Year</label>
                  <input
                    type="number"
                    value={edu.candidate_end_year}
                    onChange={(e) => handleEducationArrayItemChange('education', edu.education_id, 'candidate_end_year', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                    focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                    placeholder="Enter end year"
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Degree</p>
                  <p className="text-gray-800">{edu.candidate_degree || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Specialization</p>
                  <p className="text-gray-800">{edu.candidate_degree_specialization || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Education Level</p>
                  <p className="text-gray-800">{edu.candidate_education_level || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Institution</p>
                  <p className="text-gray-800">{edu.candidate_institute || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Score</p>
                  <p className="text-gray-800">{edu.candidate_score || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Start Year</p>
                  <p className="text-gray-800">{edu.candidate_start_year || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">End Year</p>
                  <p className="text-gray-800">{edu.candidate_end_year || '-'}</p>
                </div>
              </div>
            )}

            {isEditing && (
              <button
                type="button"
                onClick={() => removeEducationArrayItem('education', edu.education_id)}
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

export default Education

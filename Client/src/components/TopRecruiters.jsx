// import React from 'react';
// import { FiChevronRight, FiStar } from 'react-icons/fi';

// const TopRecruiters = () => {
//     const recruiters = [
//         { name: "Tower Research Capital", logo: "https://media.licdn.com/dms/image/v2/D560BAQH9QThxrRsKZQ/company-logo_200_200/company-logo_200_200/0/1725920289397/tower_research_capital_logo?e=2147483647&v=beta&t=-Oss2fWWy7cNUYFwWhfCj4vM6n0bmSnc6pqX8kRBQAA", rating: 4.8, jobs: 5 },
//         { name: "Payoneer", logo: "https://clemta.com/wp-content/uploads/2023/05/Payoneer.png", rating: 4.5, jobs: 2 },
//         { name: "GoldmanSachs", logo: "https://linxon.com/app/themes/ray/dist/images/linxon-logo_9d05e1b8.png", rating: 4.7, jobs: 3 },
//         { name: "Milliman", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGmwx4iNvExDw3Dlq2Qv3wfd_wnW3dkPoTqg&s", rating: 4.6, jobs: 0 },
//         { name: "Google", logo: "https://yt3.googleusercontent.com/K8WVrQAQHTTwsHEtisMYcNai7p7XIlyEAdZg86qYw78ye57r5DRemHQ9Te4PcD_v98HB-ZvQjQ=s900-c-k-c0x00ffffff-no-rj", rating: 4.3, jobs: 1 },
//         { name: "66 Degrees", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZtbGqb8xFmir-QujUT8G7JgZkUJ8cT3Olrw&s", rating: 4.9, jobs: 4 },
//         { name: "NTT Data", logo: "https://www.temenos.com/wp-content/uploads/2021/09/Logo_NTTDATA_800X800px_Mesa-de-trabajo-400x400.jpg", rating: 4.4, jobs: 2 },
//         { name: "RecruitCRM", logo: "https://media.licdn.com/dms/image/v2/D560BAQEF3uVh-xarsg/company-logo_200_200/company-logo_200_200/0/1735188121657/recruitcrm_logo?e=2147483647&v=beta&t=3eU7bzdAI35hrLLqbRZOeRMqwBnX6oaJi9QePsycfsY", rating: 4.2, jobs: 0 },
//         { name: "DE Shaw", logo: "https://media.licdn.com/dms/image/v2/C510BAQHDSKxLL5iDGA/company-logo_200_200/company-logo_200_200/0/1630564112745/d_e_shaw_india_private_limited_logo?e=2147483647&v=beta&t=OMTrW9QVOwCy3i2_p-dVAuwljDxCLHRzSrhuRRI9z78", rating: 4.7, jobs: 3 },
//         { name: "Cloudsek", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ_aVifFfMfh7JeRNlOvueTIo2F_sGQQqiiaPASGmLwlacvUzJmB2o-KL_vhqqRmkbobc&usqp=CAU", rating: 4.9, jobs: 6 },
//         { name: "DTCC", logo: "https://yt3.googleusercontent.com/bh-p4RXXZKyyRAuxvsbz_kBaxlcmvfp0JVRjYOJRvfzqWuo1Qi1sLK5KO_8E87VsdisDAEW2=s900-c-k-c0x00ffffff-no-rj", rating: 4.3, jobs: 2 },
//         { name: "Visa", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOK-ExH64w4vaz6r2HY7kpEc0SEZKmpq7CKg&s", rating: 4.7, jobs: 5 },
//       ];
      
//   return (
   
    
//     <div className="max-w-6xl mx-auto py-12 px-4">
//       <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">Top Recruiters</h2>
//       <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
//       Connect with leading employers and industry pioneers. Land your dream job with top recruiters today!
//       </p>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {recruiters.map((recruiter, index) => (
//           <div
//             key={index}
//             className="border outline-none border-none rounded-xl p-6 flex flex-col items-center shadow-md hover:shadow-lg transition bg-white"
//           >
//             <div className="text-5xl mb-3">
//               <img src={recruiter.logo} alt="" />
//               </div>
//             <h3 className="font-semibold text-lg text-gray-800">{recruiter.name}</h3>
//             <p className="text-gray-500 text-sm mt-1">⭐ {recruiter.rating} (27 Reviews)</p>
//             <p className="text-gray-400 text-xs mt-1">📍 Chicago, US</p>
//             <p className={`text-sm font-medium mt-2 px-3 py-1 rounded-lg ${recruiter.jobs > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
//               {recruiter.jobs > 0 ? `${recruiter.jobs} Jobs Available` : "Not open a job"}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TopRecruiters;

import React from 'react';
import { FiChevronRight, FiStar, FiMapPin, FiBriefcase } from 'react-icons/fi';

const TopRecruiters = () => {
  const recruiters = [
    { name: "Tower Research Capital",location:"New York", reviews:244, logo: "https://media.licdn.com/dms/image/v2/D560BAQH9QThxrRsKZQ/company-logo_200_200/company-logo_200_200/0/1725920289397/tower_research_capital_logo?e=2147483647&v=beta&t=-Oss2fWWy7cNUYFwWhfCj4vM6n0bmSnc6pqX8kRBQAA", rating: 4.8, jobs: 125 },
    { name: "Payoneer",reviews:204,location:"New York", logo: "https://clemta.com/wp-content/uploads/2023/05/Payoneer.png", rating: 4.5, jobs: 172 },
    { name: "GoldmanSachs",reviews:144,location:"New York", logo: "https://linxon.com/app/themes/ray/dist/images/linxon-logo_9d05e1b8.png", rating: 4.7, jobs: 255 },
    { name: "Milliman", reviews:340, logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGmwx4iNvExDw3Dlq2Qv3wfd_wnW3dkPoTqg&s", rating: 4.6, jobs: 200 },
    { name: "Google",reviews:154, logo: "https://yt3.googleusercontent.com/K8WVrQAQHTTwsHEtisMYcNai7p7XIlyEAdZg86qYw78ye57r5DRemHQ9Te4PcD_v98HB-ZvQjQ=s900-c-k-c0x00ffffff-no-rj", rating: 4.3, jobs: 190 },
    { name: "66 Degrees",reviews:188, logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZtbGqb8xFmir-QujUT8G7JgZkUJ8cT3Olrw&s", rating: 4.9, jobs: 340 },
    { name: "NTT Data",reviews:230, logo: "https://www.temenos.com/wp-content/uploads/2021/09/Logo_NTTDATA_800X800px_Mesa-de-trabajo-400x400.jpg", rating: 4.4, jobs: 220 },
    { name: "RecruitCRM",reviews:250, logo: "https://media.licdn.com/dms/image/v2/D560BAQEF3uVh-xarsg/company-logo_200_200/company-logo_200_200/0/1735188121657/recruitcrm_logo?e=2147483647&v=beta&t=3eU7bzdAI35hrLLqbRZOeRMqwBnX6oaJi9QePsycfsY", rating: 4.2, jobs: 120 },
    { name: "DE Shaw",reviews:190, logo: "https://media.licdn.com/dms/image/v2/C510BAQHDSKxLL5iDGA/company-logo_200_200/company-logo_200_200/0/1630564112745/d_e_shaw_india_private_limited_logo?e=2147483647&v=beta&t=OMTrW9QVOwCy3i2_p-dVAuwljDxCLHRzSrhuRRI9z78", rating: 4.7, jobs: 325 },
    { name: "Cloudsek",reviews:320, logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ_aVifFfMfh7JeRNlOvueTIo2F_sGQQqiiaPASGmLwlacvUzJmB2o-KL_vhqqRmkbobc&usqp=CAU", rating: 4.9, jobs: 246 },
    { name: "DTCC",reviews:310, logo: "https://yt3.googleusercontent.com/bh-p4RXXZKyyRAuxvsbz_kBaxlcmvfp0JVRjYOJRvfzqWuo1Qi1sLK5KO_8E87VsdisDAEW2=s900-c-k-c0x00ffffff-no-rj", rating: 4.3, jobs: 230 },
    { name: "Visa",reviews:260, logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOK-ExH64w4vaz6r2HY7kpEc0SEZKmpq7CKg&s", rating: 4.7, jobs: 165 },
  ];
    
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 text-gray-800">Top Recruiters</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Connect with leading employers and industry pioneers. Land your dream job with top recruiters today!
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recruiters.map((recruiter, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
          >
            {/* Top color bar - unique for each card */}
            <div 
              className="h-2" 
              style={{ 
                background: `linear-gradient(90deg, 
                  hsl(${(index * 30) % 360}, 70%, 60%), 
                  hsl(${((index * 30) + 60) % 360}, 70%, 60%))`
              }}
            ></div>
            
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 flex-shrink-0 mr-4 bg-gray-50 rounded-lg p-2 overflow-hidden flex items-center justify-center">
                  <img 
                    src={recruiter.logo} 
                    alt={`${recruiter.name} logo`} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{recruiter.name}</h3>
                  <div className="flex items-center text-sm mt-1">
                    <div className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full flex items-center">
                      <FiStar className="text-yellow-500 mr-1 fill-current" />
                      <span className="font-medium">{recruiter.rating}</span>
                      {/* <span className="text-gray-500 ml-1">(27 Reviews)</span> */}
                      <span className="text-gray-500 ml-1">{`(${(recruiter.reviews)} Reviews)`}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 text-sm mb-4">
                {/* <div className="flex items-center mr-4">
                  <FiMapPin className="mr-1" />
                  <span>Chicago, US</span>
                </div> */}
                <div className="flex items-center">
                  <FiBriefcase className="mr-1" />
                  <span>{recruiter.jobs > 0 ? `${recruiter.jobs} Jobs` : "No Jobs"}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <div className={`text-sm px-3 py-1.5 rounded-full font-medium ${
                  recruiter.jobs > 0 
                    ? "bg-green-50 text-green-600 border border-green-200" 
                    : "bg-red-50 text-red-600 border border-red-200"
                }`}>
                  {recruiter.jobs > 0 ? `${recruiter.jobs} Jobs Available` : "Not Hiring"}
                </div>
                <button className="flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium text-sm py-1.5 px-3 rounded-full transition-colors">
                  View 
                  <FiChevronRight className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRecruiters;
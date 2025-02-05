// import React from 'react'
// import { FiShoppingBag, FiPenTool, FiUsers, FiSearch, FiCode, FiDollarSign, FiTrendingUp, FiTv } from 'react-icons/fi';

// const Category = () => {
//     const categories = [
//         { title: 'Retail & Product', icon: <FiShoppingBag />, count: 4 },
//         { title: 'Content writer', icon: <FiPenTool />, count: 4 },
//         { title: 'Human resource', icon: <FiUsers />, count: 4 },
//         { title: 'Market research', icon: <FiSearch />, count: 4 },
//         { title: 'Software', icon: <FiCode />, count: 4 },
//         { title: 'Finance', icon: <FiDollarSign />, count: 4 },
//         { title: 'Management', icon: <FiTrendingUp />, count: 4 },
//         { title: 'Marketing', icon: <FiTv />, count: 4 }
//       ];
//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12">
//       <h2 className="text-3xl font-bold mb-8 text-gray-800">Browse by category</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//         {categories.map((category, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2 cursor-pointer"
//           >
//             <div className="flex items-center mb-4">
//               <div className="bg-blue-50 text-blue-600 rounded-full p-3 mr-4">
//                 {category.icon}
//               </div>
//               <h3 className="font-bold text-xl text-gray-800">{category.title}</h3>
//             </div>
//             <p className="text-gray-500 text-sm">
//               {category.count} job{category.count !== 1 ? 's' : ''} available
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Category

import React from "react";
import { FiShoppingBag, FiPenTool, FiUsers, FiSearch, FiCode, FiDollarSign, FiTrendingUp, FiTv } from "react-icons/fi";

const Category = () => {
  const categories = [
    { title: "Retail & Product", icon: <FiShoppingBag />, count: 4 },
    { title: "Content Writer", icon: <FiPenTool />, count: 4 },
    { title: "Human Resource", icon: <FiUsers />, count: 4 },
    { title: "Market Research", icon: <FiSearch />, count: 4 },
    { title: "Software", icon: <FiCode />, count: 4 },
    { title: "Finance", icon: <FiDollarSign />, count: 4 },
    { title: "Management", icon: <FiTrendingUp />, count: 4 },
    { title: "Marketing", icon: <FiTv />, count: 4 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold mb-2 text-gray-900 text-center">Browse by Category</h2>
      <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
        Find the jobs you're looking for in your desired category.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 cursor-pointer group"
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 text-blue-600 rounded-full p-4 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                {category.icon}
              </div>
              <h3 className="font-semibold text-lg text-gray-800 ml-4 group-hover:text-blue-600 transition-all">
                {category.title}
              </h3>
            </div>
            <p className="text-gray-500 text-sm font-medium group-hover:text-gray-700 transition-all">
              {category.count} job{category.count !== 1 ? "s" : ""} available
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;

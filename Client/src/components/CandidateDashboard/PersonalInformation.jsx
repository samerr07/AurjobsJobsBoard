import React, { useState } from 'react'



const PersonalInformation = ({ isEditing, candidateData, handleInputChange, errors }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = () => {
    if (imageUrl) {
   
      handleInputChange({
        target: {
          name: 'candidate_image_link',
          value: imageUrl
        }
      });
      setIsPopupOpen(false);
      setImageUrl('');
    }
  };

  return (
    <section className="max-w-4xl mx-auto bg-gradient-to-b from-white to-gray-50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4 sm:mb-0">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
        </div>
        <div className="flex items-center gap-4">
          {isEditing && (
            <span className="text-sm px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-medium">
              Editing Mode
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center lg:border-r lg:border-gray-200 lg:pr-8">
          <div
            onClick={() => isEditing && setIsPopupOpen(true)}
            className={`relative flex items-center justify-center w-40 h-40 mb-4 rounded-full overflow-hidden border-2 
              ${isEditing ? 'border-gray-300 cursor-pointer hover:border-blue-400' : 'border-gray-200'} 
              transition-all duration-200 group`}
          >
            {candidateData?.candidate_image_link ? (
              <img
                src={candidateData?.candidate_image_link}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-sm text-gray-500">{isEditing ? 'Add Photo' : 'No Photo'}</span>
              </div>
            )}
          </div>
          {errors.profile_image && (
            <p className="mt-1 text-sm text-red-600">{errors.profile_image}</p>
          )}
        </div>

        {/* Form Fields */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {['First Name', 'Last Name', 'Email', 'Phone'].map((field) => {
              const fieldKey = `candidate_${field.toLowerCase().replace(' ', '_')}`;
              return (
                <div key={fieldKey} className="relative group">
                  {isEditing ? (
                    <>
                      <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                        {field}
                      </label>
                      <input
                        type={field === 'Email' ? 'email' : field === 'Phone' ? 'tel' : 'text'}
                        name={fieldKey}
                        value={candidateData[fieldKey]}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 bg-white 
                                focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                group-hover:border-blue-300 transition-all duration-300 ease-in-out
                                ${errors[fieldKey] ? 'border-red-300' : 'border-gray-200'}`}
                        placeholder={`Enter your ${field.toLowerCase()}`}
                      />
                      {errors[fieldKey] && (
                        <p className="mt-1 text-sm text-red-600">{errors[fieldKey]}</p>
                      )}
                    </>
                  ) : (
                    <div className="py-3">
                      <span className="text-sm text-gray-600">{field}</span>
                      <p className="mt-1 text-gray-900">{candidateData[fieldKey] || 'Not provided'}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Image Upload Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm" onClick={() => setIsPopupOpen(false)} />
          <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add Image URL</h3>
              <button onClick={() => setIsPopupOpen(false)} className="text-gray-400 hover:text-gray-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste image URL here"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!imageUrl}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                Add Image
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PersonalInformation;
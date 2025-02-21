import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Briefcase, Globe, Phone, Mail, MapPin, 
  Users, Linkedin, Twitter, Facebook, 
  Edit2, X, Building2, Save, AlertCircle, 
  Hash, Lock
} from 'lucide-react';

const EmployerProfile = () => {
  const dispatch = useDispatch();
  const employerData = useSelector((state) => state.employer?.employerProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  const handleEditClick = () => {
    setEditedProfile({ ...employerData });
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_EMPLOYER_DATA',
      payload: editedProfile
    });
    setIsEditing(false);
  };

  const InfoCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-start space-x-4">
        <div className={`p-3 ${color} rounded-xl`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-grow">
          <h3 className="text-sm font-medium text-gray-500">{label}</h3>
          <p className="mt-1 text-gray-900">{value || 'Not specified'}</p>
        </div>
      </div>
    </div>
  );

  const FormField = ({ label, value, onChange, type = "text" }) => (
    <div className="col-span-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      ) : (
        <input
          type={type}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}
    </div>
  );

  const EditModal = () => (
    <div className="fixed inset-0 bg-transparent bg-opacity-1 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Edit Company Profile</h2>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Company Logo URL"
                  value={editedProfile.company_logo}
                  onChange={(value) => setEditedProfile({ ...editedProfile, company_logo: value })}
                />
                <FormField
                  label="Company Display Name"
                  value={editedProfile.company_display_name}
                  onChange={(value) => setEditedProfile({ ...editedProfile, company_display_name: value })}
                />
                <FormField
                  label="CIN"
                  value={editedProfile.cin}
                  onChange={(value) => setEditedProfile({ ...editedProfile, cin: value })}
                />
                <FormField
                  label="Industry"
                  value={editedProfile.industry}
                  onChange={(value) => setEditedProfile({ ...editedProfile, industry: value })}
                />
                <FormField
                  label="Company Size"
                  value={editedProfile.company_size}
                  onChange={(value) => setEditedProfile({ ...editedProfile, company_size: value })}
                />
                <FormField
                  label="Headquarters"
                  value={editedProfile.headquarters}
                  onChange={(value) => setEditedProfile({ ...editedProfile, headquarters: value })}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Description</h3>
              <FormField
                label="Company Description"
                value={editedProfile.description}
                onChange={(value) => setEditedProfile({ ...editedProfile, description: value })}
                type="textarea"
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Website"
                  value={editedProfile.company_website}
                  onChange={(value) => setEditedProfile({ ...editedProfile, company_website: value })}
                />
                <FormField
                  label="Email"
                  value={editedProfile.employer_email}
                  onChange={(value) => setEditedProfile({ ...editedProfile, employer_email: value })}
                  type="email"
                />
                <FormField
                  label="Phone"
                  value={editedProfile.company_phone_number}
                  onChange={(value) => setEditedProfile({ ...editedProfile, company_phone_number: value })}
                />
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Social Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="LinkedIn"
                  value={editedProfile.company_linkedin}
                  onChange={(value) => setEditedProfile({ ...editedProfile, company_linkedin: value })}
                />
                <FormField
                  label="Twitter"
                  value={editedProfile.company_twitter}
                  onChange={(value) => setEditedProfile({ ...editedProfile, company_twitter: value })}
                />
                <FormField
                  label="Facebook"
                  value={editedProfile.company_facebook}
                  onChange={(value) => setEditedProfile({ ...editedProfile, company_facebook: value })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 sticky bottom-0 bg-white">
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0 relative group">
              <img
                src={employerData?.company_logo || "https://via.placeholder.com/150"}
                alt="Company Logo"
                className="w-40 h-40 rounded-xl shadow-lg object-fill bg-white border-2 border-gray-100"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {employerData?.company_display_name}
                  </h1>
                  <span className="mt-2 inline-block px-4 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-full">
                    {employerData?.industry}
                  </span>
                </div>
                <button
                  onClick={handleEditClick}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-6 h-6 text-blue-500" />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                  {employerData?.headquarters}
                </div>
                <div className="flex items-center text-gray-600">
                  <Globe className="w-5 h-5 mr-2 text-gray-400" />
                  {employerData?.company_website}
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-2 text-gray-400" />
                  {employerData?.employer_email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <InfoCard
            icon={Hash}
            label="CIN"
            value={employerData?.cin}
            color="bg-purple-500"
          />
          <InfoCard
            icon={Building2}
            label="Registered Name"
            value={employerData?.company_registered_name}
            color="bg-indigo-500"
          />
          <InfoCard
            icon={Users}
            label="Company Size"
            value={employerData?.company_size}
            color="bg-green-500"
          />
          <InfoCard
            icon={AlertCircle}
            label="Description"
            value={employerData?.description}
            color="bg-yellow-500"
          />
        </div>

        {/* Social Media Links */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {employerData?.company_linkedin && (
              <a
                href={employerData.company_linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all"
              >
                <Linkedin className="w-6 h-6 text-blue-600" />
                <span className="ml-3">LinkedIn</span>
              </a>
            )}
            {employerData?.company_twitter && (
              <a
                href={employerData.company_twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all"
              >
                <Twitter className="w-6 h-6 text-blue-400" />
                <span className="ml-3">Twitter</span>
              </a>
            )}
            {employerData?.company_facebook && (
              <a
                href={employerData.company_facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all"
              >
                <Facebook className="w-6 h-6 text-blue-600" />
                <span className="ml-3">Facebook</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && <EditModal />}
    </div>
  );
};

export default EmployerProfile;
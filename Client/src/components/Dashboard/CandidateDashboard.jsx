// import React, { useState } from 'react';
// import { X } from 'lucide-react';
// import image from '../../assets/react.svg';
// import ExtraCurricularSection from './CandidateDetails/ExtraCurricularSection';
// import SkillsSection from './CandidateDetails/SkillsSection';
// import PersonalInfoSection from './CandidateDetails/PersonalInfoSection';
// import ExperienceSection from './CandidateDetails/ExperienceSection';
// import AccomplishmentsSection from './CandidateDetails/AccomplishmentsSection';
// import EducationSection from './CandidateDetails/EducationSection';
// import SkillsForm from './CandidateForms/SkillsForm';
// import AccomplishmentsForm from './CandidateForms/AccomplishmentsForm';
// import ExtraCurricularForm from './CandidateForms/ExtraCurricularForm';
// import PersonalInfoForm from './CandidateForms/PersonalInfoForm';
// import ExperienceForm from './CandidateForms/ExperienceForm';
// import EducationForm from './CandidateForms/EducationalForm';
// import { useSelector } from 'react-redux';

// const CandidateDashboard = ({ sectionRefs }) => {





//     const [userData, setUserData] = useState({
//         personalInfo: {
//             name: "hdhgh",
//             email: "df@fuj.com",
//             mobile: "+91 9876543210",
//             location: "India",
//             profileImage: image
//         },
//         educationDetails: [{
//             educationLevel: 'Bachelor of Technology',
//             collegeName: 'SNIST',
//             specialisation: 'Computer Science and Engineering (IoT)',
//             graduationYear: '2025',
//             graduationScore: '8.54 CGPA',
//             twelfthDetails: {
//                 school: 'Gayathri Junior College',
//                 score: '96.8%'
//             },
//             tenthDetails: {
//                 school: 'BMHS',
//                 score: '9.2 GPA'
//             }
//         }],
//         skills: ['React.js', 'HTML', 'CSS', 'JavaScript', 'GraphQL', 'Socket.IO', 'Database Management'],
//         experienceDetails: [{
//             companyName: 'Idea Usher',
//             designation: 'Frontend Developer Intern',
//             startDate: '01/2025',
//             endDate: 'MM/YYYY',
//             isCurrentRole: true
//         }],
//         accomplishments: [
//             'Won first place in college hackathon',
//             'Published research paper on IoT'
//         ],
//         extraCurricular: ['Basketball', 'Piano']
//     });

//     const [editingSection, setEditingSection] = useState(null);
//     const [editData, setEditData] = useState(null);

//     // Determine which section is currently active based on sectionRefs
//     const activeSection = Object.keys(sectionRefs)[0];

//     const Modal = ({ children, onClose }) => (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//                 <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-xl font-semibold">Edit {editingSection}</h3>
//                     <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//                         <X size={20} />
//                     </button>
//                 </div>
//                 {children}
//             </div>
//         </div>
//     );

//     const handleEdit = (section) => {
//         setEditingSection(section);
//     };

//     const handleSave = (section, newData, index = null) => {
//         setUserData(prev => {
//             if (Array.isArray(prev[section]) && index !== null) {
//                 const updatedArray = [...prev[section]];
//                 updatedArray[index] = newData;
//                 return {
//                     ...prev,
//                     [section]: updatedArray
//                 };
//             } else {
//                 return {
//                     ...prev,
//                     [section]: newData
//                 };
//             }
//         });
//         setEditingSection(null);
//         setEditData(null);
//     };

//     // Render only the active section
//     const renderActiveSection = () => {
//         switch(activeSection) {
//             case 'profile':
//                 return <PersonalInfoSection personalInfo={userData.personalInfo} onEdit={handleEdit} />;
//             case 'education':
//                 return <EducationSection educationDetails={userData.educationDetails} onEdit={handleEdit} />;
//             case 'skills':
//                 return <SkillsSection skills={userData.skills} onEdit={handleEdit} />;
//             case 'experience':
//                 return <ExperienceSection experienceDetails={userData.experienceDetails} onEdit={handleEdit} />;
//             case 'accomplishments':
//                 return <AccomplishmentsSection accomplishments={userData.accomplishments} onEdit={handleEdit} />;
//             case 'extraCurricular':
//                 return <ExtraCurricularSection extraCurricular={userData.extraCurricular} onEdit={handleEdit} />;
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="max-w-4xl mx-auto mt-20 p-6">
//             <h1 className="text-3xl font-bold mb-8">Candidate Dashboard</h1>

//             <div className="space-y-8">
//                 {renderActiveSection()}
//             </div>

//             {/* Edit Modal */}
//             {editingSection && (
//                 <Modal onClose={() => setEditingSection(null)}>
//                     {editingSection === 'Personal Information' && <PersonalInfoForm personalInfo={userData.personalInfo} onEdit={handleSave} />}
//                     {editingSection === 'Education' && <EducationForm educationDetails={userData.educationDetails} onEdit={handleSave} />}
//                     {editingSection === 'Skills' && <SkillsForm skills={userData.skills} onEdit={handleSave} />}
//                     {editingSection === 'Experience' && <ExperienceForm experienceDetails={userData.experienceDetails} onEdit={handleSave} />}
//                     {editingSection === 'Accomplishments' && <AccomplishmentsForm accomplishments={userData.accomplishments} onEdit={handleSave} />}
//                     {editingSection === 'Extra Curricular' && <ExtraCurricularForm extraCurricular={userData.extraCurricular} onEdit={handleSave} />}
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default CandidateDashboard;








import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaBriefcase, FaSignOutAlt, FaChevronLeft, FaChevronRight, FaGraduationCap, FaTools, FaTrophy, FaRunning, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const CandidateDashboard = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isExpanded, setIsExpanded] = useState(true);
    const formRef = useRef(null);

    const [candidateData, setCandidateData] = useState({
        candidate_first_name: "Sameer",
        candidate_last_name: "Srivastava",
        candidate_email: "sameer@example.com",
        candidate_phone: "9876543210",
        profile_image: null,
        candidate_current_role: "Software Engineer",
        candidate_current_salary: 85000,
        candidate_location: "San Francisco",
        candidate_work_preference: "Hybrid",
        candidate_availability: "Immediate",
        candidate_github_link: "https://github.com/sameer",
        candidate_linkedin_link: "https://linkedin.com/in/sameer",
        social_links: {
            github: '',
            linkedin: '',
            portfolio: '',
            twitter: ''
        },
        certifications: [
            { id: 1, name: "AWS Certified Solutions Architect", issuer: "Amazon", date: "2024-01" },
            { id: 2, name: "Google Cloud Professional", issuer: "Google", date: "2023-12" }
        ],
        education: [
            { id: 1, degree: "Master of Computer Science", institution: "Stanford University", year: "2020" },
            { id: 2, degree: "Bachelor of Engineering", institution: "IIT Delhi", year: "2018" }
        ],
        languages: [
            { id: 1, name: "English", proficiency: "Beginner" },
            { id: 2, name: "Hindi", proficiency: "Advanced" },
            { id: 3, name: "Spanish", proficiency: "Intermediate" }
        ],
        skills: [
            { id: 1, name: "React.js", level: "Expert" },
            { id: 2, name: "Node.js", level: "Advanced" },
            { id: 3, name: "Python", level: "Intermediate" }
        ]
    });

    const [backupData, setBackupData] = useState(null);
    const [errors, setErrors] = useState({});
    const [activeSection, setActiveSection] = useState('personal');

    const sections = [
        { id: 'personal', name: 'Personal Info', icon: '👤' },
        { id: 'professional', name: 'Professional Info', icon: '💼' },
        { id: 'education', name: 'Education', icon: '🎓' },
        { id: 'skills', name: 'Skills', icon: '⚡' },
        { id: 'certifications', name: 'Certifications', icon: '📜' },
        { id: 'languages', name: 'Languages', icon: '🌐' }
    ];

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCandidateData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!candidateData.candidate_email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.candidate_email = 'Invalid email format';
        }
        if (!candidateData.candidate_phone.match(/^\d{10}$/)) {
            newErrors.candidate_phone = 'Phone number must be 10 digits';
        }
        if (candidateData.candidate_current_salary < 0) {
            newErrors.candidate_current_salary = 'Salary cannot be negative';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const startEditing = () => {
        setBackupData(candidateData);
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setCandidateData(backupData);
        setIsEditing(false);
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSaving(true);
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                setIsSaving(false);
                setIsEditing(false);
                setShowToast(true);
                setToastMessage('Profile updated successfully!');
            } catch (error) {
                setShowToast(true);
                setToastMessage('Error updating profile. Please try again.');
                setIsSaving(false);
            }
        }
    };

    const handleArrayItemChange = (type, id, field, value) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const addArrayItem = (type, defaultItem) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: [...prev[type], { ...defaultItem, id: Date.now() }]
        }));
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
        }
    };

    const removeArrayItem = (type, id) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].filter(item => item.id !== id)
        }));
    };

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };
    const sideNavItems = [
        { id: 'profile', name: 'Candidate Profile', icon: <FaUser/> },
        { id: 'jobs', name: 'Applied Jobs', icon: <FaBriefcase/> }
    ];



    const Toast = () => (
        <div className={`fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 ${showToast ? 'translate-y-0' : 'translate-y-full'}`}>
            {toastMessage}
        </div>
    );


    const toggleSidebar1 = () => {
        setIsExpanded(!isExpanded);
    };

    const handleNavClick = (itemId) => {
        setActiveSection(itemId);
        if (itemId === 'profile') {
            setShowDashboard(true);
        } else {
            setShowDashboard(false);
        }
    };
    const [showDashboard, setShowDashboard] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 mt-16">
            {/* Navigation Sidebar */}


            <div className="relative">
            <div className={`hidden sm:flex flex-col items-center fixed top-16 bottom-0 bg-white shadow-lg transition-all duration-300 overflow-y-visible ${isExpanded ? 'lg:w-60' : 'w-20'}`}>
                {/* Toggle Button */}
                <button
                    onClick={toggleSidebar1}
                    className="hidden lg:block absolute -right-14 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-blue-100 text-blue-600 p-2 rounded-full shadow-md hover:bg-blue-200"
                >
                    {isExpanded ? (
                        <FaAngleDoubleLeft className="w-4 h-4" />
                    ) : (
                        <FaAngleDoubleRight className="w-4 h-4" />
                    )}
                </button>

                <div className="flex-1 pt-6 p-2 w-full">
                    <nav className="space-y-2">
                        {sideNavItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => {handleNavClick(item.id), setIsExpanded(false)}}
                                className={`w-full flex items-center px-4 py-4 ${activeSection === item.id
                                    ? 'bg-blue-200 rounded-md text-blue-600'
                                    : 'hover:bg-blue-100 hover:rounded-md'
                                    }`}
                            >
                                <span className="w-6 h-6">{item.icon}</span>
                                {isExpanded && <span className="ml-3">{item.name}</span>}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {showDashboard && (
                <div className="fixed left-20 top-0 mt-16 h-full w-64 bg-white shadow-lg">
                    <div className="p-6">
                        {/* <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                            <span className="text-blue-600 mr-2">📊</span>
                            Dashboard
                        </h2> */}
                        <nav className="space-y-3">
                            {sections.map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center ${activeSection === section.id
                                            ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="mr-3">{section.icon}</span>
                                    {section.name}
                                </button>
                            ))}
                            <FaAngleDoubleLeft onClick={()=>setShowDashboard(!showDashboard)} className="w-4 h-4" />
                        </nav>
                    </div>
                </div>
            )}
            </div>


            {/* <div className={`hidden sm:flex flex-col items-center fixed top-16 bottom-0 bg-white shadow-lg transition-all duration-300 overflow-y-visible ${isExpanded ? 'lg:w-60' : 'w-20'
                }`}>
              
                <button
                    onClick={toggleSidebar}
                    className="hidden lg:block absolute -right-14 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-blue-100 text-blue-600 p-2 rounded-full shadow-md hover:bg-blue-200"
                >
                    {isExpanded ? (
                        <FaAngleDoubleLeft className="w-4 h-4" />
                    ) : (
                        <FaAngleDoubleRight className="w-4 h-4" />
                    )}
                </button>

                <div className="flex-1 pt-6 p-2 w-full">
                    <nav className="space-y-2">
                        {sideNavItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`w-full flex items-center px-4 py-4 ${activeSection === item.id ? 'bg-blue-200 rounded-md text-blue-600' : 'hover:bg-blue-100 hover:rounded-md'
                                    }`}
                            >
                                <item.icon className="w-6 h-6" />
                                {(isExpanded) && <span className="ml-3">{item.name}</span>}
                            </button>
                        ))}
                    </nav>
                </div>
                
            </div> */}

            {/* <div className="fixed left-0 top-0 mt-16 h-full w-64 bg-white shadow-lg">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                        <span className="text-blue-600 mr-2">📊</span>
                        Dashboard
                    </h2>
                    <nav className="space-y-3">
                        {sections.map(section => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center ${activeSection === section.id
                                    ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <span className="mr-3">{section.icon}</span>
                                {section.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div> */}

            {/* Main Content */}
            <div className="ml-64 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Candidate Profile</h1>
                            <p className="text-gray-500 mt-2">Manage your professional information</p>
                        </div>
                        <div className="space-x-4">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={cancelEditing}
                                        className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSaving}
                                        className={`px-6 py-2 bg-blue-600 text-white rounded-lg transition-colors ${isSaving ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'
                                            }`}
                                    >
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={startEditing}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                                >
                                    <span className="mr-2">✏️</span>
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Information Section */}
                        {/* <section id="personal" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center mb-6">
                                <span className="text-2xl mr-3">👤</span>
                                <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="candidate_first_name"
                                        value={candidateData.candidate_first_name}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="candidate_last_name"
                                        value={candidateData.candidate_last_name}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="candidate_email"
                                        value={candidateData.candidate_email}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 ${errors.candidate_email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.candidate_email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.candidate_email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        name="candidate_phone"
                                        value={candidateData.candidate_phone}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500 ${errors.candidate_phone ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.candidate_phone && (
                                        <p className="mt-1 text-sm text-red-600">{errors.candidate_phone}</p>
                                    )}
                                </div>
                            </div>
                        </section> */}

                        <section className="max-w-4xl mx-auto bg-gradient-to-b from-white to-gray-50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
                            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-6 border-b border-gray-200">
                                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">👤</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                                </div>
                                {isEditing && (
                                    <span className="text-sm px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-medium">
                                        Editing Mode
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Image Upload Section */}
                                <div className="flex flex-col items-center lg:border-r lg:border-gray-200 lg:pr-8">
                                    <div
                                        className={`relative w-40 h-40 mb-4 rounded-full overflow-hidden border-2  'border-gray-300'
                                             cursor-pointer transition-all duration-200 hover:border-blue-400 group`}

                                    >
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                                            <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            <span className="text-sm text-gray-500">Add Photo</span>
                                        </div>

                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"

                                    />

                                </div>

                                {/* Form Fields */}
                                <div className="lg:col-span-2">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="candidate_first_name"
                                                value={candidateData.candidate_first_name}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500 hover:border-blue-400"
                                                placeholder="Enter your first name"
                                            />
                                        </div>

                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="candidate_last_name"
                                                value={candidateData.candidate_last_name}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500 hover:border-blue-400"
                                                placeholder="Enter your last name"
                                            />
                                        </div>

                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="candidate_email"
                                                value={candidateData.candidate_email}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500 hover:border-blue-400 ${errors.candidate_email ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="Enter your email"
                                            />
                                            {errors.candidate_email && (
                                                <p className="mt-1 text-sm text-red-600">{errors.candidate_email}</p>
                                            )}
                                        </div>

                                        <div className="group">
                                            <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                name="candidate_phone"
                                                value={candidateData.candidate_phone}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500 hover:border-blue-400 ${errors.candidate_phone ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="Enter your phone number"
                                            />
                                            {errors.candidate_phone && (
                                                <p className="mt-1 text-sm text-red-600">{errors.candidate_phone}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>



                        {/* Professional Information Section */}
                        <section id="professional" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center mb-6">
                                <span className="text-2xl mr-3">💼</span>
                                <h2 className="text-xl font-semibold text-gray-800">Professional Information</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Role</label>
                                    <input
                                        type="text"
                                        name="candidate_current_role"
                                        value={candidateData.candidate_current_role}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Salary</label>
                                    <input
                                        type="number"
                                        name="candidate_current_salary"
                                        value={candidateData.candidate_current_salary}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <input
                                        type="text"
                                        name="candidate_location"
                                        value={candidateData.candidate_location}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Work Preference</label>
                                    <select
                                        name="candidate_work_preference"
                                        value={candidateData.candidate_work_preference}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                    >
                                        <option value="Remote">Remote</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="On-site">On-site</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* Education Section */}
                        <section id="education" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <span className="text-2xl mr-3">🎓</span>
                                    <h2 className="text-xl font-semibold text-gray-800">Education</h2>
                                </div>
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem('education', { degree: '', institution: '', year: '' })}
                                        className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center"
                                    >
                                        <span className="mr-2">+</span>
                                        Add Education
                                    </button>
                                )}
                            </div>
                            <div className="space-y-6">
                                {candidateData.education.map((edu) => (
                                    <div key={edu.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                                                <input
                                                    type="text"
                                                    value={edu.degree}
                                                    onChange={(e) => handleArrayItemChange('education', edu.id, 'degree', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                                                <input
                                                    type="text"
                                                    value={edu.institution}
                                                    onChange={(e) => handleArrayItemChange('education', edu.id, 'institution', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                                <input
                                                    type="text"
                                                    value={edu.year}
                                                    onChange={(e) => handleArrayItemChange('education', edu.id, 'year', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                                />
                                            </div>
                                        </div>
                                        {isEditing && (
                                            <button
                                                type="button"
                                                onClick={() => removeArrayItem('education', edu.id)}
                                                className="mt-3 text-sm text-red-600 hover:text-red-800 transition-colors flex items-center"
                                            >
                                                <span className="mr-1">🗑</span>
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Skills Section */}
                        <section id="skills" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <span className="text-2xl mr-3">⚡</span>
                                    <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
                                </div>
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem('skills', { name: '', level: 'Beginner' })}
                                        className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center"
                                    >
                                        <span className="mr-2">+</span>
                                        Add Skill
                                    </button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {candidateData.skills.map((skill) => (
                                    <div key={skill.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="flex-grow">
                                            <input
                                                type="text"
                                                value={skill.name}
                                                onChange={(e) => handleArrayItemChange('skills', skill.id, 'name', e.target.value)}
                                                disabled={!isEditing}
                                                placeholder="Skill name"
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                            />
                                        </div>
                                        <div className="w-48">
                                            <select
                                                value={skill.level}
                                                onChange={(e) => handleArrayItemChange('skills', skill.id, 'level', e.target.value)}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                            >
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Advanced">Advanced</option>
                                                <option value="Expert">Expert</option>
                                            </select>
                                        </div>
                                        {isEditing && (
                                            <button
                                                type="button"
                                                onClick={() => removeArrayItem('skills', skill.id)}
                                                className="text-red-600 hover:text-red-800 transition-colors p-2"
                                            >
                                                🗑
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section id="certifications" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <span className="text-2xl mr-3">📜</span>
                                    <h2 className="text-xl font-semibold text-gray-800">Certifications</h2>
                                </div>
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem('certifications', { name: '', issuer: '', date: '' })}
                                        className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center"
                                    >
                                        <span className="mr-2">+</span>
                                        Add Certification
                                    </button>
                                )}
                            </div>
                            <div className="space-y-6">
                                {candidateData.certifications.map((cert) => (
                                    <div key={cert.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
                                                <input
                                                    type="text"
                                                    value={cert.name}
                                                    onChange={(e) => handleArrayItemChange('certifications', cert.id, 'name', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
                                                <input
                                                    type="text"
                                                    value={cert.issuer}
                                                    onChange={(e) => handleArrayItemChange('certifications', cert.id, 'issuer', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                                                <input
                                                    type="month"
                                                    value={cert.date}
                                                    onChange={(e) => handleArrayItemChange('certifications', cert.id, 'date', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                                />
                                            </div>
                                        </div>
                                        {isEditing && (
                                            <button
                                                type="button"
                                                onClick={() => removeArrayItem('certifications', cert.id)}
                                                className="mt-3 text-sm text-red-600 hover:text-red-800 transition-colors flex items-center"
                                            >
                                                <span className="mr-1">🗑</span>
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Languages Section */}
                        <section id="languages" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <span className="text-2xl mr-3">🌐</span>
                                    <h2 className="text-xl font-semibold text-gray-800">Languages</h2>
                                </div>
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem('languages', { name: '', proficiency: 'Beginner' })}
                                        className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center"
                                    >
                                        <span className="mr-2">+</span>
                                        Add Language
                                    </button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {candidateData.languages.map((lang) => (
                                    <div key={lang.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="flex-grow">
                                            <input
                                                type="text"
                                                value={lang.name}
                                                onChange={(e) => handleArrayItemChange('languages', lang.id, 'name', e.target.value)}
                                                disabled={!isEditing}
                                                placeholder="Language name"
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                            />
                                        </div>
                                        <div className="w-48">
                                            <select
                                                value={lang.proficiency}
                                                onChange={(e) => handleArrayItemChange('languages', lang.id, 'proficiency', e.target.value)}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                                            >
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Advanced">Advanced</option>
                                                <option value="Native">Native</option>
                                            </select>
                                        </div>
                                        {isEditing && (
                                            <button
                                                type="button"
                                                onClick={() => removeArrayItem('languages', lang.id)}
                                                className="text-red-600 hover:text-red-800 transition-colors p-2"
                                            >
                                                🗑
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>


                        <section className="max-w-4xl mx-auto bg-gradient-to-b from-white to-gray-50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
                            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
                                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                                    <span className="text-2xl">🔗</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Social Links</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-purple-600 transition-colors duration-200">
                                        GitHub
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                                            </svg>
                                        </div>
                                        <input
                                            type="url"
                                            name="social_github"
                                            value={candidateData.social_links.github}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500 hover:border-purple-400"
                                            placeholder="https://github.com/username"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-purple-600 transition-colors duration-200">
                                        LinkedIn
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="url"
                                            name="social_linkedin"
                                            value={candidateData.social_links.linkedin}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500 hover:border-purple-400"
                                            placeholder="https://linkedin.com/in/username"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-purple-600 transition-colors duration-200">
                                        Portfolio Website
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                        </div>
                                        <input
                                            type="url"
                                            name="social_portfolio"
                                            value={candidateData.social_links.portfolio}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500 hover:border-purple-400"
                                            placeholder="https://yourportfolio.com"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-purple-600 transition-colors duration-200">
                                        Twitter
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="url"
                                            name="social_twitter"
                                            value={candidateData.social_links.twitter}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500 hover:border-purple-400"
                                            placeholder="https://twitter.com/username"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Save Changes Button */}
                        {isEditing && (
                            <div className="sticky bottom-4 flex justify-end bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className={`px-6 py-2 bg-blue-600 text-white rounded-lg transition-colors ${isSaving ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'
                                        }`}
                                >
                                    {isSaving ? 'Saving Changes...' : 'Save All Changes'}
                                </button>
                            </div>
                        )}
                    </form>

                    {/* Toast Notification */}
                    {/* <Toast /> */}
                </div>
            </div>
        </div>
    );
};

export default CandidateDashboard
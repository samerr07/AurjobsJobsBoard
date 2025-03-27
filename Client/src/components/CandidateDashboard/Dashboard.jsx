
import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaBriefcase, FaSignOutAlt, FaChevronLeft, FaChevronRight, FaGraduationCap, FaTools, FaTrophy, FaRunning, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import Profile from './Profile';
import { BarChart, ChevronLeft, ChevronRight, Home, Mail, Search, Settings, UserRoundPen, Users } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'
import { BASEURL } from '../../utility/config';
import AppliedJobs from './AppliedJobs';
import { getCandidateProfile } from '../../redux/candidateSlice';
import ProfileCompletionProgress from './ProfileCompletionProgress';

const Dashboard = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const [showDashboard, setShowDashboard] = useState(false);
    const [activeView, setActiveView] = useState('profile');
    const formRef = useRef(null);

    const dispatch = useDispatch()

    const { candidateProfile } = useSelector((state) => state.candidate);

    // const candidate_id = candidateProfile.candidate_id;

    // console.log(candidateProfile)

    const [candidateData, setCandidateData] = useState(candidateProfile);


    const [backupData, setBackupData] = useState(null);
    const [errors, setErrors] = useState({});
    const [activeSection, setActiveSection] = useState('personal');
    const [activeSection1, setActiveSection1] = useState('analytics');

    console.log(candidateData)


    const candidateData1 = {
        candidate: candidateData
    }

    const sections = [
        { id: 'personal', name: 'Personal Info', icon: '👤' },
        { id: 'professional', name: 'Professional Info', icon: '💼' },
        { id: 'education', name: 'Education', icon: '🎓' },
        { id: 'skills', name: 'Skills', icon: '⚡' },
        { id: 'certifications', name: 'Certifications', icon: '📜' },
        { id: 'languages', name: 'Languages', icon: '🌐' },
        { id: 'links', name: 'Social Links', icon: '🌐' },
        { id: 'resume', name: 'Resume', icon: '🌐' }


    ];

    const navItems = [
        { id: 'home', name: 'Home', icon: <Home className="w-5 h-5" /> },
        { id: 'analytics', name: 'Profile', icon: <UserRoundPen className="w-5 h-5" />, view: 'profile' },
        { id: 'users', name: 'Applied Jobs', icon: <Users className="w-5 h-5" />, view: 'appliedJobs' },
        { id: 'messages', name: 'Messages', icon: <Mail className="w-5 h-5" /> },
        { id: 'settings', name: 'Settings', icon: <Settings className="w-5 h-5" /> },
    ];


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
        // setBackupData(candidateData);
        setBackupData(candidateData);

        setIsEditing(true);
    };

    const cancelEditing = () => {
        // setCandidateData(backupData);
        setCandidateData(backupData);

        setIsEditing(false);
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSaving(true);
            console.log(candidateData1)
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.put(`${BASEURL}/candidates/CandidateProfile/${candidateProfile?.candidate_id}`, candidateData1, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                })
                console.log(candidateData1)
                console.log("API Called")
                if (res?.data?.success) {
                    console.log(res?.data?.updatedCandidate)
                    dispatch(getCandidateProfile(res?.data?.updatedCandidate?.candidate))
                    setIsSaving(false);
                    setIsEditing(false);
                }

                // setShowToast(true);
                // setToastMessage('Profile updated successfully!');
            } catch (error) {
                // setShowToast(true);
                // setToastMessage('Error updating profile. Please try again.');
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
    const handleLanguageArrayItemChange = (type, id, field, value) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].map(item =>
                item.language_id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const handleCertificationArrayItemChange = (type, id, field, value) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].map(item =>
                item.certification_id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const handleSkillsArrayItemChange = (type, id, field, value) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].map(item =>
                item.skill_id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const handleEducationArrayItemChange = (type, id, field, value) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].map(item =>
                item.education_id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const handleExperienceArrayItemChange = (type, id, field, value) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type]?.map(item =>
                item.experience_id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const handleAddressArrayItemChange = (type, id, field, value) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type]?.map(item =>
                item.address_id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const handlePreferenceArrayItemChange = (type, id, field, value) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type]?.map(item =>
                item.preference_id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const addArrayItem = (type, defaultItem) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: [...prev[type], { ...defaultItem, id: uuidv4() }]
        }));
    };

    const addEducationArrayItem = (type, defaultItem) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: [...prev[type], { ...defaultItem, education_id: uuidv4() }]
        }));
    };

    const addLangugeArrayItem = (type, defaultItem) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: [...prev[type], { ...defaultItem, language_id: uuidv4() }]
        }));
    };

    const addSkillArrayItem = (type, defaultItem) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: [...prev[type], { ...defaultItem, skill_id: uuidv4() }]
        }));
    };

    const addCertificationArrayItem = (type, defaultItem) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: [...prev[type], { ...defaultItem, certification_id: uuidv4() }]
        }));
    };

    const addExperienceArrayItem = (type, defaultItem) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: [...prev[type], { ...defaultItem, experience_id_id: uuidv4() }]
        }));
    };

    const addAddressArrayItem = (type, defaultItem) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: [...prev[type], { ...defaultItem, address_id: uuidv4() }]
        }));
    };

    const addPreferenceArrayItem = (type, defaultItem) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: [...prev[type], { ...defaultItem, preference_id: uuidv4() }]
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

    const removeCertificateArrayItem = (type, id) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].filter(item => item.certification_id !== id)
        }));
    };
    const removeLanguageArrayItem = (type, id) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].filter(item => item.language_id !== id)
        }));
    };

    const removeSkillArrayItem = (type, id) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].filter(item => item.skill_id !== id)
        }));
    };

    const removeEducationArrayItem = (type, id) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].filter(item => item.education_id !== id)
        }));
    };

    const removeExperienceArrayItem = (type, id) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].filter(item => item.education_id !== id)
        }));
    };

    const removeAddressArrayItem = (type, id) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].filter(item => item.address_id !== id)
        }));
    };
    const removePreferenceArrayItem = (type, id) => {
        setCandidateData(prev => ({
            ...prev,
            [type]: prev[type].filter(item => item.preference_id !== id)
        }));
    };

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };
    const sideNavItems = [
        { id: 'profile', name: 'Candidate Profile', icon: <FaUser /> },
        { id: 'jobs', name: 'Applied Jobs', icon: <FaBriefcase /> }
    ];




    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setIsExpanded(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNavClick = (id) => {
        setActiveSection1(id);
        const selectedItem = navItems.find(item => item.id === id);
        if (selectedItem && selectedItem.view) {
            setActiveView(selectedItem.view);
            // if (selectedItem.view === 'appliedJobs') {
            //     fetchAppliedJobs();
            // }
        }

        if (id === 'analytics') {
            setShowDashboard(true);
        } else {
            setShowDashboard(false);
        }

        if (isMobile) {
            setIsExpanded(false);
        }
    };






    return (
        <div className="min-h-screen bg-gray-50 mt-16">


            <div>
                {isMobile && isExpanded && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50"
                        onClick={() => setIsExpanded(false)}
                        style={{ zIndex: 40 }}
                    />
                )}

                <div
                    className={`fixed top-0 left-0 h-full mt-20 bg-white shadow-lg`}
                    style={{
                        width: isExpanded ? '256px' : '80px',
                        transform: isMobile && !isExpanded ? 'translateX(-100%)' : 'translateX(0)',
                        transition: 'all 0.3s ease-in-out',
                        zIndex: 50
                    }}
                >

                    <nav className="mt-4">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => { handleNavClick(item.id), setIsExpanded(false) }}
                                className="w-full flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                style={{
                                    backgroundColor: activeSection1 === item.id ? '#EBF5FF' : 'transparent',
                                    borderRight: activeSection1 === item.id ? '4px solid #2563EB' : 'none',
                                    color: activeSection1 === item.id ? '#2563EB' : '#4B5563',
                                    transition: 'all 0.2s ease-in-out'
                                }}
                            >
                                <div className="flex items-center justify-center w-8 h-8">
                                    {item.icon}
                                </div>
                                <span
                                    className="ml-3 font-medium whitespace-nowrap overflow-hidden"
                                    style={{
                                        opacity: isExpanded ? 1 : 0,
                                        transition: 'opacity 0.2s ease-in-out',
                                        visibility: isExpanded ? 'visible' : 'hidden'
                                    }}
                                >
                                    {item.name}
                                </span>
                            </button>
                        ))}
                    </nav>


                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="absolute -right-4 top-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                        style={{
                            transform: 'translateY(-50%)',
                            transition: 'all 0.2s ease-in-out'
                        }}
                    >
                        {/* {isExpanded ? '←' : '→'} */}
                        {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
                    </button>
                </div>


                {showDashboard && activeView === 'profile' && (
                    <div
                        className="fixed top-0 h-full bg-white shadow-lg"
                        style={{
                            left: isExpanded ? '256px' : '80px',
                            width: '256px',
                            marginTop: '80px',
                            transition: 'all 0.3s ease-in-out',
                            zIndex: 40
                        }}
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Profile</h2>
                                <button
                                    onClick={() => { setShowDashboard(false), setIsExpanded(true) }}
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                >
                                    {/* ← */}
                                    <FaChevronLeft />
                                </button>
                            </div>
                            <nav className="space-y-2">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={`w-full cursor-pointer flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg ${activeSection === section.id ? 'bg-blue-50 text-blue-600' : ''
                                            }`}
                                        style={{ transition: 'all 0.2s ease-in-out' }}
                                    >
                                        <span className="mr-3">{section.icon}</span>
                                        <span className="font-medium">{section.name}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                )}
            </div>



            {/* Main Content */}
            <div
                className={`p-8 transition-all duration-300`}
                style={{
                    // marginLeft: isExpanded ? '256px' : '80px',
                    marginLeft: showDashboard && activeView === 'profile' ? (isExpanded ? '512px' : '336px') : (isExpanded ? '256px' : '80px'),
                }}
            >

                {
                    activeView === 'profile' ? (
                        <div className="max-w-4xl mx-auto">

                            <ProfileCompletionProgress candidateData={candidateData} />

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


                                <Profile isEditing={isEditing} candidateData={candidateData} handleInputChange={handleInputChange} errors={errors}
                                    removeArrayItem={removeArrayItem}
                                    addArrayItem={addArrayItem}
                                    handleArrayItemChange={handleArrayItemChange}
                                    removeSkillArrayItem={removeSkillArrayItem}
                                    handleSkillsArrayItemChange={handleSkillsArrayItemChange}
                                    handleLanguageArrayItemChange={handleLanguageArrayItemChange}
                                    removeLanguageArrayItem={removeLanguageArrayItem}
                                    handleCertificationArrayItemChange={handleCertificationArrayItemChange}
                                    removeCertificateArrayItem={removeCertificateArrayItem}
                                    removeEducationArrayItem={removeEducationArrayItem}
                                    handleEducationArrayItemChange={handleEducationArrayItemChange}
                                    addCertificationArrayItem={addCertificationArrayItem}
                                    addLangugeArrayItem={addLangugeArrayItem}
                                    addSkillArrayItem={addSkillArrayItem}
                                    addEducationArrayItem={addEducationArrayItem}
                                    handleExperienceArrayItemChange={handleExperienceArrayItemChange}
                                    addExperienceArrayItem={addExperienceArrayItem}
                                    removeExperienceArrayItem={removeExperienceArrayItem}
                                    removeAddressArrayItem={removeAddressArrayItem}
                                    handleAddressArrayItemChange={handleAddressArrayItemChange}
                                    addAddressArrayItem={addAddressArrayItem}
                                    removePreferenceArrayItem={removePreferenceArrayItem}
                                    addPreferenceArrayItem={addPreferenceArrayItem}
                                    handlePreferenceArrayItemChange={handlePreferenceArrayItemChange}
                                />



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


                        </div>
                    ) : activeView === 'appliedJobs' ? (
                        <AppliedJobs />
                    ) : (
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">hfh</h1>
                            <div className="bg-white rounded-lg shadow p-12 text-center">
                                <h2 className="text-xl text-gray-600">This page is under construction</h2>
                                <p className="mt-4 text-gray-500">We're working on making this feature available soon.</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div >
    );
};

export default Dashboard



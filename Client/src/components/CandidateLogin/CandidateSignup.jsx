import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { User, Info, ArrowRight, ArrowLeft, Mail, Eye, EyeOff, Phone, MapPin, Loader2, UserPlus, KeyRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { BASEURL } from '../../utility/config';
import { getCandidateProfile, setAuthentication } from '../../redux/candidateSlice';
import { useDispatch } from 'react-redux';

const CandidateSignup = ({ navigateToLogin }) => {
    const [loading, setLoading] = useState(false);
    const [verify, setVerify] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: "",
        //II
        location: "",
        password: '',
        confirmPassword: '',
        resume_url: ""
    });

    const [currentSection, setCurrentSection] = useState(1);
    const [passwordVisible, setPasswordVisible] = useState({
        password: false,
        confirmPassword: false
    });
    const [errors, setErrors] = useState({
        password: '',
        confirmPassword: ''
    });

    // OTP related states
    const [showOtpSection, setShowOtpSection] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [timer, setTimer] = useState(0);
    const [generatedOtp, setGeneratedOtp] = useState('');
    const dispatch = useDispatch();
    const [urlStatus, setUrlStatus] = useState({
        message: '',
        color: '',
    });


    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const togglePasswordVisibility = (field) => {
        setPasswordVisible(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const nextSection = () => {
        setCurrentSection(2);
    };

    const previousSection = () => {
        setCurrentSection(1);
    };

    // Handle OTP input change
    const handleOtpChange = (e, index) => {
        const value = e.target.value;

        // Allow only numbers
        if (value && !/^\d+$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(0, 1); // Ensure only one character is stored
        setOtp(newOtp);

        // Auto-move to next input if value is entered
        if (value && index < 5) {
            const nextInput = e.target.form.elements[index + 1];
            nextInput.focus();
        }
    };

    // Handle paste event for OTP
    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();

        // Check if pasted content is numeric and has correct length
        if (/^\d+$/.test(pastedData) && pastedData.length <= 6) {
            const otpArray = pastedData.split('').slice(0, 6);
            const newOtp = [...otp];

            otpArray.forEach((char, index) => {
                if (index < 6) newOtp[index] = char;
            });

            setOtp(newOtp);

            // Focus the next empty input or the last one if all filled
            const lastFilledIndex = Math.min(otpArray.length, 5);
            if (lastFilledIndex < 5) {
                e.target.form.elements[lastFilledIndex + 1].focus();
            }
        }
    };

    // Handle key down for OTP input - for backspace and arrow navigation
    const handleOtpKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            // If current input is empty and backspace is pressed, focus previous input
            e.target.form.elements[index - 1].focus();
        } else if (e.key === 'ArrowLeft' && index > 0) {
            e.target.form.elements[index - 1].focus();
        } else if (e.key === 'ArrowRight' && index < 5) {
            e.target.form.elements[index + 1].focus();
        }
    };

    const generateOTP = () => {
        // Generate a random number between 0 and 999999
        // const randomNumber = Math.floor(Math.random() * 1000000);

        // // Format as a 6-digit string with leading zeros if needed
        // const formattedOTP = randomNumber.toString().padStart(6, '0');
        // setGeneratedOtp(formattedOTP);
        // console.log(generatedOtp)
        const randomNumber = Math.floor(Math.random() * 1000000);
        return randomNumber.toString().padStart(6, '0');
    };

    // Send OTP to user's email
    const sendOtpWithCode = async (otpCode) => {
        if (!formData.email) {
            toast.error('Email is required to send OTP', {
                duration: 4000,
                position: 'top-right',
                style: {
                    background: '#FF6B6B',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '16px',
                    borderRadius: '8px'
                }
            });
            return;
        }

        try {

            setOtpLoading(true);
            // Replace with your actual API endpoint for sending OTP


            const res = await axios.post(`${BASEURL}/candidates/otp_verification`, {
                email: formData.email,
                otp: otpCode
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            console.log(res)


            if (res?.data?.success) {
                setOtpSent(true);
                setTimer(60); // 60 seconds countdown for resend
                toast.success('OTP sent to your email!', {
                    duration: 4000,
                    position: 'top-right',
                    style: {
                        background: '#4CAF50',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '16px',
                        borderRadius: '8px'
                    },
                    iconTheme: {
                        primary: 'white',
                        secondary: '#4CAF50'
                    }
                });
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || 'Failed to send OTP', {
                duration: 4000,
                position: 'top-right',
                style: {
                    background: '#FF6B6B',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '16px',
                    borderRadius: '8px'
                }
            });
        } finally {
            setOtpLoading(false);
        }
    };

    const sendOtp = async () => {
        const newOtp = generateOTP();
        setGeneratedOtp(newOtp);
        await sendOtpWithCode(newOtp);
    };

    // Initiate account creation process
    const initiateSignup = async (e) => {
        e.preventDefault();

        // Validate password match
        if (formData.password !== formData.confirmPassword) {
            setErrors(prev => ({
                ...prev,
                confirmPassword: 'Passwords do not match'
            }));
            return;
        }
        // Generate OTP immediately and store the value in a variable
        const newOtp = generateOTP();

        // Set the state for later verification
        setGeneratedOtp(newOtp);
        // Show OTP verification section
        // generateOTP()
        setShowOtpSection(true);
        // await sendOtp();
        await sendOtpWithCode(newOtp)
    };

    // Verify OTP and complete signup
    const verifyOtpAndSignup = async (e) => {
        e.preventDefault();

        const otpValue = otp.join('');
        if (otpValue.length !== 6) {
            toast.error('Please enter the complete 6-digit OTP', {
                duration: 4000,
                position: 'top-right',
                style: {
                    background: '#FF6B6B',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '16px',
                    borderRadius: '8px'
                }
            });
            return;
        }

        try {
            setLoading(true);
            // First verify OTP


            // if (verifyRes?.data?.success) {
            if (otpValue === generatedOtp) {

                // If OTP is verified, proceed with signup
                const signupRes = await axios.post(`${BASEURL}/candidates/CandidateSignup`, formData, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });

                if (signupRes?.data?.success) {
                    toast.success(signupRes?.data?.message || 'Account created successfully!', {
                        duration: 4000,
                        position: 'top-right',
                        style: {
                            background: '#4CAF50',
                            color: 'white',
                            fontWeight: 'bold',
                            padding: '16px',
                            borderRadius: '8px'
                        },
                        iconTheme: {
                            primary: 'white',
                            secondary: '#4CAF50'
                        }
                    });
                    dispatch(getCandidateProfile(signupRes?.data?.candidate))
                    dispatch(setAuthentication(true))
                    navigate("/candidate_dashboard");
                }
            } else {
                toast.error('Invalid OTP. Please try again.', {
                    duration: 4000,
                    position: 'top-right',
                    style: {
                        background: '#FF6B6B',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '16px',
                        borderRadius: '8px'
                    }
                });
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || 'Verification failed', {
                duration: 4000,
                position: 'top-right',
                style: {
                    background: '#FF6B6B',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '16px',
                    borderRadius: '8px'
                }
            });
        } finally {
            setLoading(false);
        }
    };

    // Timer countdown for OTP resend
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        // Check password match whenever password or confirmPassword changes
        if (formData.confirmPassword) {
            if (formData.password !== formData.confirmPassword) {
                setErrors(prev => ({
                    ...prev,
                    confirmPassword: 'Passwords do not match'
                }));
            } else {
                setErrors(prev => ({
                    ...prev,
                    confirmPassword: ''
                }));
            }
        }
    }, [formData.password, formData.confirmPassword]);

    // Reset form when going back from OTP verification
    const handleBackFromOtp = () => {
        setShowOtpSection(false);
        setOtp(['', '', '', '', '', '']);
        setOtpSent(false);
        setTimer(0);
    };


    // const checkURL = async (url) => {
    //     if (!url) return false; // Don't check if URL is empty
    //     try {
    //         const response = await axios.get(url)
    //         console.log(response)
    //         return response?.data; // Return true if URL is accessible
    //     } catch (error) {
    //         console.error('Error checking URL:', error);
    //         return false; // Error in fetching URL
    //     }
    // };

    // Handle URL validation on blur
   
    

const checkURL = async (url) => {
    if (!url) return false;

    // Basic URL validation regex
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlRegex.test(url)) {
        return false;
    }

    try {
        // Add protocol if not present
        const fullUrl = url.startsWith('http://') || url.startsWith('https://') 
            ? url 
            : `https://${url}`;

        const response = await axios.head(fullUrl, {
            timeout: 5000, // 5 second timeout
            validateStatus: (status) => status >= 200 && status < 300
        });

        return response.status >= 200 && response.status < 300;
    } catch (error) {
        console.error('Error checking URL:', error);
        return false;
    }
};
    const handleURLBlur = async () => {
        const resumeUrl = formData.resume_url.trim();

        if (!resumeUrl) {
            setUrlStatus({
                message: '',
                color: ''
            });
            return;
        }

        try {
            const isAccessible = await checkURL(resumeUrl);

            if (isAccessible) {
                setUrlStatus({
                    message: 'Resume URL is accessible.',
                    color: 'text-green-600'
                });
            } else {
                setUrlStatus({
                    message: 'Resume URL is not accessible.',
                    color: 'text-red-600'
                });
            }
        } catch (error) {
            setUrlStatus({
                message: 'An error occurred while checking the resume URL.',
                color: 'text-red-600'
            });
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-white py-12 px-4 [&::-webkit-scrollbar]:hidden">
            <div className="flex flex-col md:flex-row w-[85%] max-w-4xl justify-center">
                {/* employer button  */}
                <Link
                    to="/company_register"
                    className="absolute top-24 ml-20 right-4 inline-flex items-center px-4 py-2 text-orange-500 rounded-lg hover:text-blue-500 duration-300 text-medium font-medium"
                    style={{
                        position: 'absolute',
                        top: '55px',
                        right: '4px',

                        '@media (max-width: 375px)': {
                            top: '20px',
                            right: '2px',
                            fontSize: '0.8rem',
                        },

                        '@media (min-width: 428px)': {
                            top: '35px',
                            right: '6px',
                        },
                    }}
                >
                    <ArrowRight className="mr-2 h-4 w-4 md:relative" />
                    For Employers
                </Link>
                <div className="space-y-1">
                    <h2 className="text-2xl font-sans font-bold text-black mt-5 text-center">Create a new Account</h2>
                    <p className='text-center ml-4'>Join us today!</p>

                    {!showOtpSection ? (
                        <form onSubmit={initiateSignup} className="w-full max-w-4xl bg-white p-6">
                            <div className="mb-6">
                                <div className="flex items-center mt-2">
                                    <div className="flex items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentSection >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>
                                            <User size={18} />
                                        </div>
                                        <span className="ml-2 text-sm font-medium">Personal Details</span>
                                    </div>
                                    <div className="flex-1 h-0.5 mx-4 bg-gray-200">
                                        <div className={`h-full bg-orange-500 transition-all duration-300 ${currentSection >= 2 ? 'w-full' : 'w-0'}`}></div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentSection >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>
                                            <Info className=" " size={18} />
                                        </div>
                                        <span className="ml-2 text-sm font-medium">Additional Details</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative overflow-hidden">
                                <div className={`transition-transform duration-500 transform ${currentSection === 1 ? 'translate-x-0' : '-translate-x-full'} ${currentSection === 2 ? 'hidden' : ''}`}>
                                    {/* Personal Details Section */}
                                    <div className="space-y-6 mt-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                                    <User className="mr-2 text-orange-500" size={18} />
                                                    First Name <span className="text-red-500 ml-1">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="firstname"
                                                    value={formData.firstname}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2.5 border-2 border-blue-500 rounded-lg text-gray-900 transition-all duration-300 hover:border-orange-500"
                                                    placeholder="Enter first name"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                                    <User className="mr-2 text-orange-500" size={18} />
                                                    Last Name <span className="text-red-500 ml-1">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lastname"
                                                    value={formData.lastname}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2.5 border-2 border-blue-500 rounded-lg text-gray-900 focus:border-transparent transition-all duration-300 hover:border-orange-500"
                                                    placeholder="Enter last name"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                                    <Mail className="mr-2 text-orange-500" size={18} />
                                                    Email <span className="text-red-500 ml-1">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2.5 border-2 border-blue-500 rounded-lg text-gray-900 hover:border-orange-500 transition-all duration-300"
                                                    placeholder="Enter email address"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                                    <Phone className="mr-2 text-orange-500" size={18} />
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2.5 border-2 border-blue-500 rounded-lg text-gray-900 hover:border-orange-500 transition-all duration-300"
                                                    placeholder="Enter phone number"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={`transition-transform duration-500 transform ${currentSection === 2 ? 'translate-x-0' : 'translate-x-full'} ${currentSection === 1 ? 'hidden' : ''}`}>
                                    {/* Additional Details Section */}
                                    <div className="space-y-6 mt-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                                    <MapPin className="mr-2 text-orange-500" size={18} />
                                                    Location
                                                </label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2.5 border-2 border-blue-500 rounded-lg text-gray-900 hover:border-orange-500 transition-all duration-300"
                                                    placeholder="Enter your location"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                                    Resume URL
                                                </label>
                                                <input
                                                    type="text"
                                                    id="resume_url"
                                                    name="resume_url"
                                                    value={formData.resume_url}
                                                    onChange={handleChange}
                                                    onBlur={handleURLBlur}
                                                    className="w-full px-3 py-2.5 border-2 border-blue-500 rounded-lg text-gray-900 hover:border-orange-500 transition-all duration-300"
                                                    placeholder="Enter resume URL"
                                                />
                                                {urlStatus.message && (
                                                    <p className={`mt-2 text-sm ${urlStatus.color}`}>
                                                        {urlStatus.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                                    Password <span className="text-red-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={passwordVisible.password ? "text" : "password"}
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        className="w-full px-3 py-2.5 border-2 border-blue-500 rounded-lg text-gray-900 hover:border-orange-500 transition-all duration-300"
                                                        placeholder="Enter password"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-orange-500 focus:outline-none"
                                                        onClick={() => togglePasswordVisibility('password')}
                                                    >
                                                        {passwordVisible.password ? <EyeOff size={20} /> : <Eye size={20} />}
                                                    </button>
                                                </div>
                                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                                    Confirm Password <span className="text-red-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={passwordVisible.confirmPassword ? "text" : "password"}
                                                        name="confirmPassword"
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}
                                                        className="w-full px-3 py-2.5 border-2 border-blue-500 rounded-lg text-gray-900 hover:border-orange-500 transition-all duration-300"
                                                        placeholder="Confirm password"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-orange-500 focus:outline-none"
                                                        onClick={() => togglePasswordVisibility('confirmPassword')}
                                                    >
                                                        {passwordVisible.confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                    </button>
                                                </div>
                                                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between mt-8">
                                {currentSection === 2 && (
                                    <button
                                        type="button"
                                        onClick={previousSection}
                                        className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 duration-300"
                                    >
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Previous
                                    </button>
                                )}
                                {currentSection === 1 ? (
                                    <button
                                        type="button"
                                        onClick={nextSection}
                                        className="flex items-center ml-auto px-6 py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors duration-300"
                                    >
                                        Next
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`inline-flex items-center px-4 py-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'} text-white rounded-lg duration-300`}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Sending OTP...
                                            </>
                                        ) : (
                                            <>
                                                <UserPlus className="mr-2 h-4 w-4" />
                                                Create Account
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>

                            <div className="text-center mt-4">
                                <p className="text-xs sm:text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <Link
                                        to="/candidate_login"
                                        onClick={navigateToLogin}
                                        className="text-orange-500 font-semibold hover:text-orange-500 transition-colors"
                                    >
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </form>
                    ) : (
                        // OTP Verification Section
                        <form onSubmit={verifyOtpAndSignup} className="w-full max-w-4xl bg-white p-6">
                            <div className="mb-8 text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-orange-100 text-orange-500">
                                        <KeyRound size={32} />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-2">OTP Verification</h3>
                                <p className="text-gray-600">
                                    We've sent a 6-digit verification code to <span className="font-medium">{formData.email}</span>
                                </p>
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                                    Enter the 6-digit code
                                </label>
                                <div className="flex justify-center gap-2 sm:gap-4">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(e, index)}
                                            onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                            onPaste={handleOtpPaste}
                                            className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold border-2 border-blue-500 rounded-lg focus:border-orange-500 focus:ring-orange-500"
                                            required
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="text-center mb-6">
                                {timer > 0 ? (
                                    <p className="text-sm text-gray-600">
                                        Resend code in <span className="font-medium">{timer}</span> seconds
                                    </p>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={sendOtp}
                                        disabled={otpLoading}
                                        className="text-sm text-orange-500 font-medium hover:text-orange-600"
                                    >
                                        {otpLoading ? 'Sending...' : 'Resend OTP'}
                                    </button>
                                )}
                            </div>

                            <div className="flex justify-between mt-8">
                                <button
                                    type="button"
                                    onClick={handleBackFromOtp}
                                    className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 duration-300"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading || otp.some(digit => !digit)}
                                    className={`inline-flex items-center px-6 py-2.5 ${loading || otp.some(digit => !digit)
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-orange-500 hover:bg-orange-600'
                                        } text-white rounded-lg duration-300`}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="mr-2 h-4 w-4" />
                                            Verify & Create Account
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CandidateSignup;
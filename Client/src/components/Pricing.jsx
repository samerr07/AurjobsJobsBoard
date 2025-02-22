import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PaymentGateway from './PaymentGateway';

const Pricing = () => {
    // Prices and features
    const payAsYouGoPrice = '₹399';
    const bundlePlanPrice = '₹7,480';

    const [activeTab, setActiveTab] = useState('jobPosting');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    // Define plan details objects
    const payAsYouGoPlan = {
        name: 'Pay-as-You-Go (Single Credit)',
        price: 399,
        credits: 1,
        fixedCredits: true,
        description: 'Perfect for occasional hiring - No commitment required!',
    };

    const bundlePlan = {
        name: 'Bundle Plan (Best Value)',
        price: 7480,
        credits: 20,
        fixedCredits: true,
        description: '🚀 Most Popular Plan – Save ₹1,500!',
    };

    const handleBuyNow = (plan) => {
        // Navigate to the payments page and pass the selected plan as state
        navigate('/payment_gateway', { state: { selectedPlan: plan } });
    };

    return (
        <div className="bg-white  py-36">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center ">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Aurjobs Pricing Plans – Hire Smarter, Faster!
                    </h2>
                    <p className="mt-2 text-md text-indigo-600">
                        Start Hiring Now
                    </p>
                </div>

                {/* Tabs */}
                <div className="mt-8 flex justify-center">
                    <nav className="space-x-4">
                        <a
                            href="#"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'jobPosting'
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                            onClick={() => handleTabClick('jobPosting')}
                        >
                            Job posting
                        </a>
                        <a
                            href="#"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'database'
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                            onClick={() => handleTabClick('database')}
                        >
                            Database
                        </a>
                    </nav>
                </div>

                {/* Pricing Plans */}
                <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
                    {/* Plan 1: Job Posting - Pay-as-You-Go */}
                    {activeTab === 'jobPosting' && (
                        <div className="flex flex-col rounded-lg shadow-lg overflow-hidden border-b-[1.5px] transition-transform transform hover:scale-105 hover:shadow-xl duration-300" style={{ height: '500px', width: '360px' }}>
                            <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6 flex-grow">
                                <div>
                                    <h3 className=" leading-6 text-2xl font-bold  text-gray-900 text-center">
                                        Pay-as-You-Go (Single Credit)
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500 text-center">
                                        Perfect for occasional hiring - No commitment required!
                                    </p>
                                </div>
                                <div className="mt-6">
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                ✅ 1 Job Post = 1 Credit
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                ✅ Job Live for: 30 Days
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                ✅ Credit Validity: 6 Months
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                ✅ AI-powered candidate matching included (🚀 Free for a limited time!)
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                ⚡ Limited-time Offer – Get started now!
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-white sm:p-10 flex items-center justify-between" style={{ height: '120px' }}>
                                <div className="text-3xl font-extrabold text-gray-900">
                                    ₹399
                                </div>
                                <div className="mt-2">
                                    <button
                                        onClick={() => handleBuyNow(payAsYouGoPlan)}
                                        className="block w-full text-center rounded-md py-3 px-5 bg-orange-500 hover:bg-green-700 text-white font-medium"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Plan 2: Job Posting - Bundle Plan */}
                    {activeTab === 'jobPosting' && (
                        <div className="flex flex-col rounded-lg shadow-lg overflow-hidden border-b-[1.5px] transition-transform transform hover:scale-105 hover:shadow-xl duration-300 relative" style={{ height: '500px', width: '360px' }}>
                            {/* Most Popular Badge */}
                            <div className="absolute top-0 right-0 bg-indigo-600 text-white py-1 px-3 rounded-bl-lg text-xs font-medium">
                                Most Popular
                            </div>
                            <div className="px-6 py-8 sm:p-10 sm:pb-6 flex-grow">
                                <div>
                                    <h3 className=" leading-6 text-2xl font-bold text-gray-900 text-center">
                                        Bundle Plan (Best Value)
                                    </h3>
                                    <p className="mt-2 text-sm text-indigo-700 text-center">
                                        🚀 Most Popular Plan – Save ₹1,500!
                                    </p>
                                </div>
                                <div className="mt-6">
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                ✅ 20 Job Posts (20 Credits)
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                ✅ Job Live for: 30 Days Each
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                ✅ Credit Validity: 6 Months
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                ✅ Free Featured Listing for 2 Jobs (📌 Get 5X more visibility!)
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                ✅ Priority Candidate Matching (🚀 AI-suggested top profiles)
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                🔥 Limited-time Deal – Boost Your Hiring Now!
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-white sm:p-10 flex items-center justify-between" style={{ height: '100px' }}>
                                <div className="text-3xl font-extrabold text-gray-900">
                                    ₹7,480
                                </div>
                                <div className="mt-2">
                                    <button
                                        onClick={() => handleBuyNow(bundlePlan)}
                                        className="block w-full text-center rounded-md py-3 px-5 bg-orange-500 hover:bg-green-700 text-white font-medium"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'jobPosting' && (
                        <div className="flex flex-col rounded-lg shadow-lg overflow-hidden border-b-[1.5px] transition-transform transform hover:scale-105 hover:shadow-xl duration-300" style={{ height: '700px', width: '360px' }}>
                            <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6 flex-grow">
                                <div>
                                    <h3 className=" leading-6 text-2xl font-bold text-gray-900 text-center">
                                        Enterprise Plan - Custom Pricing
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500 text-center">
                                        🚀 Access Top Talent Instantly!
                                    </p>
                                </div>
                                <div className="mt-6">
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                Unlimited Candidate Profiles – Explore a vast talent pool with unrestricted access.
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                ✅ AI-Screened Profiles – Get pre-vetted candidates to save hiring time.
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                ✅                                             44+ Advanced Filters – Find the perfect match with precise filtering.

                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                ✅ Unlimited Resume Downloads – No limits on accessing candidate resumes.
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                ✅ Direct Contact Details – Connect with candidates instantly.
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                ✅ AI-Powered Shortlisting – Smart recommendations tailored to your needs.
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                📞 Get Pricing & Unlock Access
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                💡 Talk to our team & get started today!
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="px-6 py-5 bg-white sm:p-10 flex items-center justify-between" style={{ height: '100px' }}>
                                <div className="text-3xl font-extrabold text-gray-900">
                                    Custom
                                </div>
                                <div className="mt-2">
                                    <a
                                        href="#"
                                        className="block w-full text-center rounded-md py-2 px-5 bg-orange-500 hover:bg-green-700 text-white font-medium"
                                    >
                                        Contact Us
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'database' && (
                        <div className="flex flex-col justify-center items-center rounded-lg shadow-lg overflow-hidden border-b-[1.5px] transition-transform transform hover:scale-105 hover:shadow-xl duration-300" style={{ height: '700px', width: '360px' }}>
                            <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6 flex-grow">
                                {/* Centered Heading */}
                                <div className="flex flex-col items-center justify-center">
                                    <h3 className="text-2xl font-bold leading-6 text-gray-900 text-center">
                                        Enterprise Plan - Custom Pricing
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500 text-center">
                                        🚀 Access Top Talent Instantly!
                                    </p>
                                </div>

                                <div className="mt-6">
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                Unlimited Candidate Profiles – Explore a vast talent pool with unrestricted access.
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                ✅ AI-Screened Profiles – Get pre-vetted candidates to save hiring time.
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                ✅ 44+ Advanced Filters – Find the perfect match with precise filtering.

                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                ✅ Unlimited Resume Downloads – No limits on accessing candidate resumes.
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                ✅ Direct Contact Details – Connect with candidates instantly.
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                ✅ AI-Powered Shortlisting – Smart recommendations tailored to your needs.
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                📞 Get Pricing & Unlock Access
                                            </p>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                            </div>
                                            <p className="ml-3 text-sm text-gray-700">
                                                💡 Talk to our team & get started today!
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* Centered Contact Us Button */}
                            <div className="px-6 py-4 bg-white sm:p-10 flex items-center justify-center" style={{ height: '120px' }}>
                                <div className="mt-2">
                                    <a
                                        href="#"
                                        className="block w-full rounded-md mt-[-30] py-3 px-16 bg-orange-500 hover:bg-green-700 text-white font-medium"
                                    >
                                        Contact Us
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}




                    {/* You can add more plans here following the same structure */}
                </div>
            </div>
        </div>
    );
};

export default Pricing;

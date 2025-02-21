import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../../src/assets/newspaper-icon-260nw-436022437.jpg';

function PaymentGateway() {
    const primaryColor = '#e0f2fe';
    const [jobCredits, setJobCredits] = useState(1);
    const [subtotal, setSubtotal] = useState(0);
    const jobCreditPrice = 300;
    const gstRate = 0.18;
    const [planDetails, setPlanDetails] = useState(null);

    const location = useLocation();
    const { selectedPlan } = location.state || {};

    useEffect(() => {
        if (selectedPlan) {
            setPlanDetails(selectedPlan);
            setJobCredits(selectedPlan.credits || 1);
            setSubtotal(selectedPlan.price);
        } else {
            setSubtotal(jobCredits * jobCreditPrice);
        }
    }, [selectedPlan, jobCredits, jobCreditPrice]);

    const increaseCredits = () => {
        setJobCredits(jobCredits + 1);
    };

    const decreaseCredits = () => {
        if (jobCredits > 1) {
            setJobCredits(jobCredits - 1);
        }
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setJobCredits(value);
        }
    };

    useEffect(() => {
        setSubtotal(jobCredits * jobCreditPrice);
    }, [jobCredits, jobCreditPrice]);

    const gst = subtotal * gstRate;
    const total = subtotal + gst;

    const employerDetails = {
        employerId: 'EMP12345',
        employerMail: 'employer@example.com',
        name: 'John Doe',
        companyName: 'Acme Corp',
        companyWebsite: 'www.acmecorp.com',
        location: 'New York',
        companyPhone: '123-456-7890',
    };

    return (
        <div className="min-h-screen bg-gray-100 py-3 flex items-center justify-center" style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh' }}>
            <div className="container mx-auto w-full shadow-lg rounded-lg overflow-hidden" style={{ maxWidth: '100%', height: '100vh' }}>
                <div className="flex flex-col md:flex-row" style={{ height: '100%' }}>
                    {/* Left Side - Employer Details */}
                    <div className="w-full md:w-1/2 p-6 md:p-20 bg-white">
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6" style={{ color: '#3b82f6' }}>Employer Details</h2>
                        <div className="space-y-2 md:space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">
                                    Name
                                </label>
                                <p className="text-gray-700 text-sm md:text-base">{employerDetails.name}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">
                                    Employer ID
                                </label>
                                <p className="text-gray-700 text-sm md:text-base">{employerDetails.employerId}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">
                                    Email
                                </label>
                                <p className="text-gray-700 text-sm md:text-base">{employerDetails.employerMail}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">
                                    Company Name
                                </label>
                                <p className="text-gray-700 text-sm md:text-base">{employerDetails.companyName}</p>
                            </div>
                            <div className="flex flex-col md:flex-row space-x-0 md:space-x-4">
                                <div className="w-full md:w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">
                                        Company Website
                                    </label>
                                    <p className="text-gray-700 text-sm md:text-base">{employerDetails.companyWebsite}</p>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">
                                        Location
                                    </label>
                                    <p className="text-gray-700 text-sm md:text-base">{employerDetails.location}</p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">
                                    Company Phone Number
                                </label>
                                <p className="text-gray-700 text-sm md:text-base">{employerDetails.companyPhone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Order Summary */}
                    <div className="w-full md:w-1/2 p-6 md:p-20" style={{ backgroundColor: primaryColor, color: 'black' }}>
                        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-gray-800" style={{ color: '#3b82f6' }}>Billing Summary</h2>
                        {planDetails ? (
                            <div className="bg-white rounded-md mb-2 md:mb-4 shadow-md">
                                <div className="p-2 md:p-4">
                                    <div className="flex flex-col md:flex-row items-center justify-between">
                                        <div className="flex items-center space-x-2 md:space-x-4">
                                            <img
                                                src=""
                                                alt="Product"
                                                className="w-16 h-16 md:w-20 md:h-20 rounded"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = {Logo};
                                                }}
                                            />
                                            <div>
                                                <p className="text-sm text-gray-700">{planDetails.name}</p>
                                                <div className="flex items-center space-x-2 mt-1 md:mt-3">
                                                    <button
                                                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-2 md:py-2 md:px-4 rounded"
                                                        onClick={decreaseCredits}
                                                        disabled={planDetails.fixedCredits}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={jobCredits}
                                                        onChange={handleInputChange}
                                                        className="shadow appearance-none border rounded w-16 md:w-20 py-1 px-2 md:py-2 md:px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-black hide-number-arrows"
                                                        min="1"
                                                        disabled={planDetails.fixedCredits}
                                                        style={{ appearance: 'none', fontSize: '0.75rem' }}
                                                    />
                                                    <button
                                                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-2 md:py-2 md:px-4 rounded"
                                                        onClick={increaseCredits}
                                                        disabled={planDetails.fixedCredits}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-base md:text-lg font-semibold text-gray-800">₹{planDetails.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-md mb-2 md:mb-4 shadow-md">
                                <div className="p-2 md:p-4">
                                    <div className="flex flex-col md:flex-row items-center justify-between">
                                        <div className="flex items-center space-x-2 md:space-x-4">
                                            <img
                                                src={Logo}
                                                alt="Product"
                                                className="w-16 h-16 md:w-20 md:h-20 rounded"
                                            />
                                            <div>
                                                <p className="text-sm font-bold text-gray-700">Job Posting Credits</p>
                                                <div className="flex items-center space-x-2 mt-1 md:mt-3">
                                                    <button
                                                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-2 md:py-2 md:px-4 rounded"
                                                        onClick={decreaseCredits}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={jobCredits}
                                                        onChange={handleInputChange}
                                                        className="shadow appearance-none border rounded w-16 md:w-20 py-1 px-2 md:py-2 md:px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-black hide-number-arrows"
                                                        min="1"
                                                        style={{ appearance: 'none', fontSize: '0.75rem' }}
                                                    />
                                                    <button
                                                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-2 md:py-2 md:px-4 rounded"
                                                        onClick={increaseCredits}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-base md:text-lg font-semibold text-gray-800">₹{jobCreditPrice}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="bg-white rounded-md shadow-md p-2 md:p-4">
                            <div className="flex justify-between py-1 md:py-2">
                                <span className="text-gray-700 font-medium text-sm md:text-base">Subtotal</span>
                                <span className="text-gray-700 text-sm md:text-base">₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between py-1 md:py-2">
                                <span className="text-gray-700 font-medium text-sm md:text-base">GST ({gstRate * 100}%)</span>
                                <span className="text-gray-700 text-sm md:text-base">₹{gst.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold py-1 md:py-2">
                                <span className="text-gray-800 text-sm md:text-base">Total</span>
                                <span className="text-gray-800 text-sm md:text-base">₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="bg-green-500 hover:bg-blue-700 text-white text-center py-2 md:py-3 rounded-md font-bold text-md md:text-lg mt-2 md:mt-4 w-full transition duration-300">
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentGateway;

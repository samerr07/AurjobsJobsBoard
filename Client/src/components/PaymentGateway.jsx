// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';

// function PaymentGateway({ selectedPlan, onBackClick }) {
//     // Default styling
//     const primaryColor = '#e0f2fe';

//     const {employerProfile} = useSelector((state)=>state.employer);
//     console.log(employerProfile)

//     // State variables
//     const [jobCredits, setJobCredits] = useState(1);
//     const [subtotal, setSubtotal] = useState(0);
//     const [incrementAmount, setIncrementAmount] = useState(1); // Default increment amount
//     const jobCreditPrice = 399; // Default price for a single credit
//     const gstRate = 0.18;

//     // Set up plan details from props - ONLY when selectedPlan changes
//     useEffect(() => {
//         if (selectedPlan) {
//             setJobCredits(selectedPlan.credits || 1);
//             setSubtotal(selectedPlan.price);

//             // Set increment amount based on the selected plan
//             if (selectedPlan.credits === 20) {
//                 setIncrementAmount(20); // For bundle plan, increment by 20
//             } else {
//                 setIncrementAmount(1); // For single credit plan, increment by 1
//             }
//         } else {
//             setSubtotal(jobCredits * jobCreditPrice);
//             setIncrementAmount(1);
//         }
//     }, [selectedPlan]); // Removed jobCredits to prevent circular dependency

//     // Credit control functions using functional updates and considering increment amount
//     const increaseCredits = () => {
//         setJobCredits(prev => prev + incrementAmount);
//     };

//     const decreaseCredits = () => {
//         setJobCredits(prev => prev > incrementAmount ? prev - incrementAmount : incrementAmount);
//     };

//     const handleInputChange = (e) => {
//         const value = parseInt(e.target.value);
//         if (!isNaN(value) && value > 0) {
//             // Ensure the input value is a multiple of incrementAmount if bundle plan
//             if (incrementAmount > 1) {
//                 const remainder = value % incrementAmount;
//                 const adjustedValue = remainder === 0 ? value : value + (incrementAmount - remainder);
//                 setJobCredits(adjustedValue);
//             } else {
//                 setJobCredits(value);
//             }
//         }
//     };

//     // Calculate price per credit based on the selected plan
//     const calculatePricePerCredit = () => {
//         if (selectedPlan && selectedPlan.credits === 20) {
//             return selectedPlan.price / selectedPlan.credits; // For bundle plan (₹7480 / 20 = ₹374 per credit)
//         }
//         return jobCreditPrice; // Default single credit price (₹399)
//     };

//     // Update subtotal when credits change (for custom credit amounts)
//     useEffect(() => {
//         if (!selectedPlan) {
//             setSubtotal(jobCredits * jobCreditPrice);
//         } else {
//             // Calculate based on the credit pack price, not just default price
//             const pricePerCredit = calculatePricePerCredit();
//             setSubtotal(jobCredits * pricePerCredit);
//         }
//     }, [jobCredits]); // Removed selectedPlan to prevent conflicts

//     // Calculate tax and total
//     const gst = subtotal * gstRate;
//     const total = subtotal + gst;

//     // Mock employer details (would come from authentication/context in real app)
//     const employerDetails = {
//         employerId: 'EMP12345',
//         employerMail: 'employer@example.com',
//         name: 'John Doe',
//         companyName: 'Acme Corp',
//         companyWebsite: 'www.acmecorp.com',
//         location: 'New York',
//         companyPhone: '123-456-7890',
//     };

//     return (
//         <div className="min-h-screen mt-16 bg-gradient-to-b from-gray-50 to-blue-50 py-6 flex flex-col items-center justify-center">
//             {/* Back button */}
//             <div className="container w-full max-w-7xl mx-auto mb-4">
//                 <button
//                     onClick={onBackClick}
//                     className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
//                 >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//                     </svg>
//                     Back to Plans
//                 </button>
//             </div>

//             <div className="container w-full max-w-7xl mx-auto shadow-xl rounded-xl overflow-hidden">
//                 <div className="flex flex-col md:flex-row">
//                     {/* Left Side - Employer Details */}
//                     <div className="w-full md:w-1/2 p-6 md:p-12 bg-white">
//                         <div className="mb-8">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ color: '#3b82f6' }}>
//                                 Employer Details
//                             </h2>
//                             <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
//                         </div>

//                         <div className="grid gap-y-6 md:gap-y-4">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-gray-700 text-sm font-semibold mb-2">
//                                         Name
//                                     </label>
//                                     <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-md border border-gray-100">
//                                         {employerDetails.name}
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700 text-sm font-semibold mb-2">
//                                         CIN No:
//                                     </label>
//                                     <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-md border border-gray-100">
//                                         {employerProfile?.cin}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-gray-700 text-sm font-semibold mb-2">
//                                     Email
//                                 </label>
//                                 <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-md border border-gray-100">
//                                     {employerProfile?.employer_email}
//                                 </p>
//                             </div>

//                             <div>
//                                 <label className="block text-gray-700 text-sm font-semibold mb-2">
//                                     Company Name
//                                 </label>
//                                 <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-md border border-gray-100">
//                                     {employerProfile?.company_registered_name}
//                                 </p>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-gray-700 text-sm font-semibold mb-2">
//                                         Company Website
//                                     </label>
//                                     <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-md border border-gray-100">
//                                         {employerProfile?.company_website}
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700 text-sm font-semibold mb-2">
//                                         Location
//                                     </label>
//                                     <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-md border border-gray-100">
//                                         {employerProfile.headquarters
//                                         }
//                                     </p>
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-gray-700 text-sm font-semibold mb-2">
//                                     Company Phone Number
//                                 </label>
//                                 <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-md border border-gray-100">
//                                     {employerProfile?.company_phone_number}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Side - Order Summary */}
//                     <div className="w-full md:w-1/2 p-6 md:p-12 bg-blue-50">
//                         <div className="mb-8">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ color: '#3b82f6' }}>
//                                 Billing Summary
//                             </h2>
//                             <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
//                         </div>

//                         {/* Product Details */}
//                         <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
//                             <div className="p-4 md:p-6">
//                                 <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
//                                     <div className="flex items-center space-x-4 w-full md:w-auto">
//                                         {/* Product image */}
//                                         <div className="flex-shrink-0 bg-gray-100 rounded-md p-2">

//                                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"
//                                                 className="w-16 h-16 object-contain">

//                                                 <rect width="200" height="200" rx="20" fill="#f0f9ff" />


//                                                 <rect x="40" y="80" width="120" height="80" rx="10" fill="#3b82f6" />
//                                                 <rect x="40" y="80" width="120" height="20" fill="#2563eb" />


//                                                 <path d="M80,80 V60 Q80,40 100,40 Q120,40 120,60 V80" stroke="#2563eb" strokeWidth="12" fill="none" />


//                                                 <circle cx="100" cy="120" r="25" fill="#ffffff" />
//                                                 <path d="M100,105 L100,135" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" />
//                                                 <path d="M90,110 Q100,105 110,110" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" fill="none" />
//                                                 <path d="M90,130 Q100,135 110,130" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" fill="none" />


//                                                 <circle cx="70" cy="105" r="5" fill="#ffffff" opacity="0.6" />
//                                             </svg>
//                                         </div>

//                                         {/* Product details */}
//                                         <div>
//                                             <p className="font-semibold text-gray-800">
//                                                 {selectedPlan ? selectedPlan.name : 'Job Posting Credits'}
//                                             </p>

//                                             {/* Credit counter information */}
//                                             <p className="text-sm text-gray-600 mt-1">
//                                                 {incrementAmount > 1 
//                                                     ? `Credits increase in multiples of ${incrementAmount}`
//                                                     : 'Add credits one at a time'}
//                                             </p>

//                                             {/* Credit counter */}
//                                             <div className="flex items-center space-x-2 mt-3">
//                                                 <button
//                                                     type="button"
//                                                     className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded"
//                                                     onClick={decreaseCredits}
//                                                 >
//                                                     -
//                                                 </button>
//                                                 <input
//                                                     type="number"
//                                                     value={jobCredits}
//                                                     onChange={handleInputChange}
//                                                     className="shadow appearance-none border rounded w-16 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300 text-center"
//                                                     min={incrementAmount}
//                                                     step={incrementAmount}
//                                                 />
//                                                 <button
//                                                     type="button"
//                                                     className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded"
//                                                     onClick={increaseCredits}
//                                                 >
//                                                     +
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Price */}
//                                     <div className="w-full md:w-auto text-center md:text-right">
//                                         <p className="text-lg font-bold text-gray-800">
//                                             ₹{subtotal.toLocaleString()}
//                                         </p>
//                                         <p className="text-sm text-gray-600">
//                                             ₹{(subtotal / jobCredits).toFixed(2)} per credit
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Order Summary */}
//                         <div className="bg-white rounded-lg shadow-md mb-6 p-4 md:p-6">
//                             <div className="space-y-3">
//                                 <div className="flex justify-between py-2 border-b border-gray-100">
//                                     <span className="text-gray-700">Subtotal</span>
//                                     <span className="text-gray-800 font-medium">₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
//                                 </div>
//                                 <div className="flex justify-between py-2 border-b border-gray-100">
//                                     <span className="text-gray-700">GST ({gstRate * 100}%)</span>
//                                     <span className="text-gray-800 font-medium">₹{gst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
//                                 </div>
//                                 <div className="flex justify-between py-2 font-bold text-lg">
//                                     <span className="text-gray-800">Total</span>
//                                     <span className="text-blue-600">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Payment Methods (simplified) */}
//                         <div className="bg-white rounded-lg shadow-md mb-6 p-4 md:p-6">
//                             <h3 className="text-gray-800 font-semibold mb-3">Payment Method</h3>

//                             {/* Payment Methods (simplified) */}
//                             <div className="bg-white rounded-lg shadow-md mb-6 p-4 md:p-6">
//                                 <h3 className="text-gray-800 font-semibold mb-3">Payment Method</h3>
//                                 <div className="grid grid-cols-4 gap-2">
//                                     <div className="bg-gray-50 border border-gray-200 rounded-md p-2 flex items-center justify-center hover:border-blue-500 cursor-pointer">
//                                         <span className="text-sm">Credit Card</span>
//                                     </div>
//                                     <div className="bg-gray-50 border border-gray-200 rounded-md p-2 flex items-center justify-center hover:border-blue-500 cursor-pointer">
//                                         <span className="text-sm">UPI</span>
//                                     </div>
//                                     <div className="bg-gray-50 border border-gray-200 rounded-md p-2 flex items-center justify-center hover:border-blue-500 cursor-pointer">
//                                         <span className="text-sm">NetBanking</span>
//                                     </div>
//                                     <div className="bg-gray-50 border border-gray-200 rounded-md p-2 flex items-center justify-center hover:border-blue-500 cursor-pointer">
//                                         <span className="text-sm">Wallet</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Pay Now Button */}
//                             <button className="w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 px-4 rounded-lg font-bold text-lg transition duration-300 shadow-md transform hover:translate-y-[-2px]">
//                                 Pay Now
//                             </button>

//                             {/* Security & Trust Note */}
//                             <div className="mt-4 text-center text-xs text-gray-600">
//                                 <p>All payments are secure and encrypted.
//                                     <br />Your financial information is never stored on our servers.</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default PaymentGateway;


// import React, { useState, useEffect, useCallback } from 'react';
// import { useSelector } from 'react-redux';

// function PaymentGateway({ selectedPlan, onBackClick,  initialCredits = null }) {
//     // Default styling
//     const primaryColor = '#e0f2fe';

//     const {employerProfile} = useSelector((state)=>state.employer);

//     // State variables
//     const [jobCredits, setJobCredits] = useState(() => {
//         // Initialize credits from initial prop or selectedPlan
//         if (initialCredits) return initialCredits;
//         return selectedPlan ? selectedPlan.credits || 1 : 1;
//     });
//     const [subtotal, setSubtotal] = useState(0);
//     const [incrementAmount, setIncrementAmount] = useState(1);
//     const gstRate = 0.18;

//     // Predefined plans for reference
//     const availablePlans = [
//         {
//             id: 'pay-as-you-go',
//             name: 'Pay-as-You-Go (Single Credit)',
//             price: 399,
//             credits: 1,
//             incrementBy: 1,
//             pricePerCredit: 399
//         },
//         {
//             id: 'bundle-plan',
//             name: 'Bundle Plan (Best Value)',
//             price: 7480,
//             credits: 20,
//             incrementBy: 20,
//             pricePerCredit: 374
//         }
//     ];

//     const findPlanConfig = useCallback((plan) => {
//         return availablePlans.find(p => p.id === plan.id) || {
//             incrementBy: 1,
//             pricePerCredit: 399
//         };
//     }, [availablePlans]);

//    // Set up plan details from props - ONLY when selectedPlan changes
//    useEffect(() => {
//     if (selectedPlan) {
//         // Determine the plan configuration
//         const planConfig = findPlanConfig(selectedPlan);

//         // Set credits to either initial credits, selected plan credits, or 1
//         const creditsToSet = initialCredits || selectedPlan.credits || 1;
//         setJobCredits(creditsToSet);

//         // Calculate subtotal based on credits
//         const pricePerCredit = planConfig.pricePerCredit;
//         setSubtotal(creditsToSet * pricePerCredit);

//         setIncrementAmount(planConfig.incrementBy);
//     } else {
//         // Default to first plan if no plan selected
//         setSubtotal(jobCredits * 399);
//         setIncrementAmount(1);
//     }
// }, [selectedPlan, initialCredits, findPlanConfig]);

//     // Credit control functions using functional updates and considering increment amount
//     const increaseCredits = () => {
//         setJobCredits(prev => prev + incrementAmount);
//     };

//     const decreaseCredits = () => {
//         setJobCredits(prev => prev > incrementAmount ? prev - incrementAmount : incrementAmount);
//     };

//     const handleInputChange = (e) => {
//         const value = parseInt(e.target.value);
//         if (!isNaN(value) && value > 0) {
//             // Ensure the input value is a multiple of incrementAmount
//             const remainder = value % incrementAmount;
//             const adjustedValue = remainder === 0 ? value : value + (incrementAmount - remainder);
//             setJobCredits(adjustedValue);
//         }
//     };

//    // Calculate price per credit based on the selected plan
//    const calculatePricePerCredit = useCallback(() => {
//     // If a specific plan is selected, use its price per credit
//     if (selectedPlan) {
//         const planConfig = findPlanConfig(selectedPlan);
//         return planConfig ? planConfig.pricePerCredit : 399;
//     }
//     return 399; // Default price
// }, [selectedPlan, findPlanConfig]);

//     // Update subtotal when credits change
//     useEffect(() => {
//         const pricePerCredit = calculatePricePerCredit();
//         setSubtotal(jobCredits * pricePerCredit);
//     }, [jobCredits, selectedPlan]);

//     // Calculate tax and total
//     const gst = subtotal * gstRate;
//     const total = subtotal + gst;

//     // Employer details from Redux store
//     const employerDetails = {
//         employerId: employerProfile?.employer_id || 'N/A',
//         employerMail: employerProfile?.employer_email || 'N/A',
//         name: employerProfile?.employer_name || 'N/A',
//         companyName: employerProfile?.company_registered_name || 'N/A',
//         companyWebsite: employerProfile?.company_website || 'N/A',
//         location: employerProfile?.headquarters || 'N/A',
//         companyPhone: employerProfile?.company_phone_number || 'N/A',
//     };

//     const handleBackClick = () => {
//         // Pass back the current credits so it can be restored
//         onBackClick({
//             credits: jobCredits,
//             plan: selectedPlan
//         });
//     };

//     return (
//         <div className="min-h-screen mt-16 bg-gradient-to-b from-gray-50 to-blue-50 py-6 flex flex-col items-center justify-center">
//             {/* Back button */}
//             <div className="container w-full max-w-7xl mx-auto mb-4">
//                 <button
//                     onClick={handleBackClick}
//                     className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
//                 >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//                     </svg>
//                     Back to Plans
//                 </button>
//             </div>

//             <div className="container w-full max-w-7xl mx-auto shadow-xl rounded-xl overflow-hidden">
//                 <div className="flex flex-col md:flex-row">
//                     {/* Left Side - Employer Details */}
//                     <div className="w-full md:w-1/2 p-6 md:p-12 bg-white">
//                         <div className="mb-8">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ color: '#3b82f6' }}>
//                                 Employer Details
//                             </h2>
//                             <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
//                         </div>

//                         <div className="grid gap-y-6 md:gap-y-4">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-gray-700 text-sm font-semibold mb-2">
//                                         Name
//                                     </label>
//                                     <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-md border border-gray-100">
//                                         {employerDetails.name}
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700 text-sm font-semibold mb-2">
//                                         CIN No:
//                                     </label>
//                                     <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-md border border-gray-100">
//                                         {employerProfile?.cin}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-gray-700 text-sm font-semibold mb-2">
//                                     Email
//                                 </label>
//                                 <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-md border border-gray-100">
//                                     {employerProfile?.employer_email}
//                                 </p>
//                             </div>

//                             <div>
//                                 <label className="block text-gray-700 text-sm font-semibold mb-2">
//                                     Company Name
//                                 </label>
//                                 <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-md border border-gray-100">
//                                     {employerProfile?.company_registered_name}
//                                 </p>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-gray-700 text-sm font-semibold mb-2">
//                                         Company Website
//                                     </label>
//                                     <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-md border border-gray-100">
//                                         {employerProfile?.company_website}
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700 text-sm font-semibold mb-2">
//                                         Location
//                                     </label>
//                                     <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-md border border-gray-100">
//                                         {employerProfile?.headquarters}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-gray-700 text-sm font-semibold mb-2">
//                                     Company Phone Number
//                                 </label>
//                                 <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-md border border-gray-100">
//                                     {employerProfile?.company_phone_number}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Side - Order Summary */}
//                     <div className="w-full md:w-1/2 p-6 md:p-12 bg-blue-50">
//                         <div className="mb-8">
//                             <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ color: '#3b82f6' }}>
//                                 Billing Summary
//                             </h2>
//                             <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
//                         </div>

//                         {/* Product Details */}
//                         <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
//                             <div className="p-4 md:p-6">
//                                 <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
//                                     <div className="flex items-center space-x-4 w-full md:w-auto">
//                                         {/* Product image */}
//                                         <div className="flex-shrink-0 bg-gray-100 rounded-md p-2">
//                                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"
//                                                 className="w-16 h-16 object-contain">
//                                                 <rect width="200" height="200" rx="20" fill="#f0f9ff" />
//                                                 <rect x="40" y="80" width="120" height="80" rx="10" fill="#3b82f6" />
//                                                 <rect x="40" y="80" width="120" height="20" fill="#2563eb" />
//                                                 <path d="M80,80 V60 Q80,40 100,40 Q120,40 120,60 V80" stroke="#2563eb" strokeWidth="12" fill="none" />
//                                                 <circle cx="100" cy="120" r="25" fill="#ffffff" />
//                                                 <path d="M100,105 L100,135" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" />
//                                                 <path d="M90,110 Q100,105 110,110" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" fill="none" />
//                                                 <path d="M90,130 Q100,135 110,130" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" fill="none" />
//                                                 <circle cx="70" cy="105" r="5" fill="#ffffff" opacity="0.6" />
//                                             </svg>
//                                         </div>

//                                         {/* Product details */}
//                                         <div>
//                                             <p className="font-semibold text-gray-800">
//                                                 {selectedPlan ? selectedPlan.name : 'Job Posting Credits'}
//                                             </p>

//                                             {/* Credit counter information */}
//                                             <p className="text-sm text-gray-600 mt-1">
//                                                 {incrementAmount > 1 
//                                                     ? `Credits increase in multiples of ${incrementAmount}`
//                                                     : 'Add credits one at a time'}
//                                             </p>

//                                             {/* Credit counter */}
//                                             <div className="flex items-center space-x-2 mt-3">
//                                                 <button
//                                                     type="button"
//                                                     className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded"
//                                                     onClick={decreaseCredits}
//                                                 >
//                                                     -
//                                                 </button>
//                                                 <input
//                                                     type="number"
//                                                     value={jobCredits}
//                                                     onChange={handleInputChange}
//                                                     className="shadow appearance-none border rounded w-16 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300 text-center"
//                                                     min={incrementAmount}
//                                                     step={incrementAmount}
//                                                 />
//                                                 <button
//                                                     type="button"
//                                                     className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded"
//                                                     onClick={increaseCredits}
//                                                 >
//                                                     +
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Price */}
//                                     <div className="w-full md:w-auto text-center md:text-right">
//                                         <p className="text-lg font-bold text-gray-800">
//                                             ₹{subtotal.toLocaleString()}
//                                         </p>
//                                         <p className="text-sm text-gray-600">
//                                             ₹{(subtotal / jobCredits).toFixed(2)} per credit
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Order Summary */}
//                         <div className="bg-white rounded-lg shadow-md mb-6 p-4 md:p-6">
//                             <div className="space-y-3">
//                                 <div className="flex justify-between py-2 border-b border-gray-100">
//                                     <span className="text-gray-700">Subtotal</span>
//                                     <span className="text-gray-800 font-medium">₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
//                                 </div>
//                                 <div className="flex justify-between py-2 border-b border-gray-100">
//                                     <span className="text-gray-700">GST ({gstRate * 100}%)</span>
//                                     <span className="text-gray-800 font-medium">₹{gst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
//                                 </div>
//                                 <div className="flex justify-between py-2 font-bold text-lg">
//                                 <span className="text-gray-800">Total</span>
//                                     <span className="text-blue-600">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Payment Methods */}
//                         <div className="bg-white rounded-lg shadow-md mb-6 p-4 md:p-6">
//                             <h3 className="text-gray-800 font-semibold mb-3">Payment Method</h3>
//                             <div className="grid grid-cols-4 gap-2">
//                                 {[
//                                     'Credit Card', 
//                                     'UPI', 
//                                     'NetBanking', 
//                                     'Wallet'
//                                 ].map((method) => (
//                                     <div 
//                                         key={method}
//                                         className="bg-gray-50 border border-gray-200 rounded-md p-2 flex items-center justify-center hover:border-blue-500 cursor-pointer"
//                                     >
//                                         <span className="text-sm">{method}</span>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Pay Now Button */}
//                             <button 
//                                 className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white text-center py-3 px-4 rounded-lg font-bold text-lg transition duration-300 shadow-md transform hover:translate-y-[-2px]"
//                                 // You can add payment processing logic here
//                             >
//                                 Pay Now
//                             </button>

//                             {/* Security & Trust Note */}
//                             <div className="mt-4 text-center text-xs text-gray-600">
//                                 <p>All payments are secure and encrypted.
//                                     <br />Your financial information is never stored on our servers.</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default PaymentGateway;


import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

function PaymentGateway({ selectedPlans, onBackClick, initialCredits = null }) {
    // Default styling
    const primaryColor = '#e0f2fe';

    const { employerProfile } = useSelector((state) => state.employer);

    // State variables
    const [jobCredits, setJobCredits] = useState(() => {
        // Initialize credits from initial prop or selectedPlan
        if (initialCredits) return initialCredits;
        return selectedPlans ? selectedPlans.credits || 1 : 1;
    });
    const [selectedPlanItems, setSelectedPlanItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [incrementAmount, setIncrementAmount] = useState(1);
    const gstRate = 0.18;

    // Predefined plans for reference
    const availablePlans = [
        {
            id: 'pay-as-you-go',
            name: 'Pay-as-You-Go (Single Credit)',
            price: 399,
            credits: 1,
            incrementBy: 1,
            pricePerCredit: 399
        },
        {
            id: 'bundle-plan',
            name: 'Bundle Plan (Best Value)',
            price: 7480,
            credits: 20,
            incrementBy: 20,
            pricePerCredit: 374
        }
    ];

    const findPlanConfig = useCallback((plan) => {
        return availablePlans.find(p => p.id === plan.id) || {
            incrementBy: 1,
            pricePerCredit: 399
        };
    }, [availablePlans]);

    // Set up plan details from props - ONLY when selectedPlan changes
    //    useEffect(() => {
    //     if (selectedPlan) {
    //         // Determine the plan configuration
    //         const planConfig = findPlanConfig(selectedPlan);

    //         // Set credits to either initial credits, selected plan credits, or 1
    //         const creditsToSet = initialCredits || selectedPlan.credits || 1;
    //         setJobCredits(creditsToSet);

    //         // Calculate subtotal based on credits
    //         const pricePerCredit = planConfig.pricePerCredit;
    //         setSubtotal(creditsToSet * pricePerCredit);

    //         setIncrementAmount(planConfig.incrementBy);
    //     } else {
    //         // Default to first plan if no plan selected
    //         setSubtotal(jobCredits * 399);
    //         setIncrementAmount(1);
    //     }
    // }, [selectedPlan, initialCredits, findPlanConfig]);
    useEffect(() => {
        if (selectedPlans && selectedPlans.length > 0) {
            const initialPlanItems = selectedPlans.map(plan => ({
                ...plan,
                quantity: plan.credits || 1,
                pricePerCredit: findPlanConfig(plan).pricePerCredit
            }));
            setSelectedPlanItems(initialPlanItems);
        }
    }, [selectedPlans]);

    // Credit control functions using functional updates and considering increment amount
    const increaseCredits = () => {
        setJobCredits(prev => prev + incrementAmount);
    };

    const decreaseCredits = () => {
        setJobCredits(prev => prev > incrementAmount ? prev - incrementAmount : incrementAmount);
    };
    // Function to update quantity of a specific plan
    const updatePlanQuantity = (planId, newQuantity) => {
        setSelectedPlanItems(currentItems =>
            currentItems.map(item =>
                item.id === planId
                    ? {
                        ...item,
                        quantity: newQuantity,
                        credits: newQuantity
                    }
                    : item
            )
        );
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            // Ensure the input value is a multiple of incrementAmount
            const remainder = value % incrementAmount;
            const adjustedValue = remainder === 0 ? value : value + (incrementAmount - remainder);
            setJobCredits(adjustedValue);
        }
    };



    useEffect(() => {
        const calculatedSubtotal = selectedPlanItems.reduce((total, item) => {
            const planConfig = findPlanConfig(item);
            return total + (item.quantity * planConfig.pricePerCredit);
        }, 0);
        setSubtotal(calculatedSubtotal);
    }, [selectedPlanItems, findPlanConfig]);

    // Calculate tax and total
    const gst = subtotal * gstRate;
    const total = subtotal + gst;

    // Employer details from Redux store
    const employerDetails = {
        employerId: employerProfile?.employer_id || 'N/A',
        employerMail: employerProfile?.employer_email || 'N/A',
        name: employerProfile?.employer_name || 'N/A',
        companyName: employerProfile?.company_registered_name || 'N/A',
        companyWebsite: employerProfile?.company_website || 'N/A',
        location: employerProfile?.headquarters || 'N/A',
        companyPhone: employerProfile?.company_phone_number || 'N/A',
    };

    const handleBackClick = () => {
        // Pass back the current credits so it can be restored
        onBackClick({
            credits: jobCredits,
            plan: selectedPlans
        });
    };

    return (
        <div className="min-h-screen mt-16 bg-gradient-to-b from-gray-50 to-blue-50 py-6 flex flex-col items-center justify-center">
            {/* Back button */}
            <div className="container w-full max-w-7xl mx-auto mb-4">
                <button
                    onClick={handleBackClick}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Plans
                </button>
            </div>

            <div className="container w-full max-w-7xl mx-auto shadow-xl rounded-xl overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Left Side - Employer Details */}
                    <div className="w-full md:w-1/2 p-6 md:p-12 bg-white">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ color: '#3b82f6' }}>
                                Employer Details
                            </h2>
                            <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
                        </div>

                        <div className="grid gap-y-6 md:gap-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                                        Company Name
                                    </label>
                                    <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-md border border-gray-100">
                                        {employerProfile?.company_registered_name}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                                        CIN No:
                                    </label>
                                    <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-md border border-gray-100">
                                        {employerProfile?.cin}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-2">
                                    Email
                                </label>
                                <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-md border border-gray-100">
                                    {employerProfile?.employer_email}
                                </p>
                            </div>



                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                                        Company Website
                                    </label>
                                    <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-md border border-gray-100">
                                        {employerProfile?.company_website}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                                        Location
                                    </label>
                                    <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-md border border-gray-100">
                                        {employerProfile?.headquarters}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-2">
                                    Company Phone Number
                                </label>
                                <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-md border border-gray-100">
                                    {employerProfile?.company_phone_number}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Order Summary */}
                    <div className="w-full md:w-1/2 p-6 md:p-12 bg-blue-50">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ color: '#3b82f6' }}>
                                Billing Summary
                            </h2>
                            <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
                        </div>


                        {selectedPlanItems.map((planItem) => {
                            const planConfig = findPlanConfig(planItem);
                            return (
                                <div key={planItem.id} className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
                                    <div className="p-4 md:p-6">
                                        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                                            <div className="flex items-center space-x-4 w-full md:w-auto">
                                                {/* Product image */}
                                                <div className="flex-shrink-0 bg-gray-100 rounded-md p-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"
                                                        className="w-16 h-16 object-contain">

                                                        <rect width="200" height="200" rx="20" fill="#f0f9ff" />


                                                        <rect x="40" y="80" width="120" height="80" rx="10" fill="#3b82f6" />
                                                        <rect x="40" y="80" width="120" height="20" fill="#2563eb" />


                                                        <path d="M80,80 V60 Q80,40 100,40 Q120,40 120,60 V80" stroke="#2563eb" strokeWidth="12" fill="none" />


                                                        <circle cx="100" cy="120" r="25" fill="#ffffff" />
                                                        <path d="M100,105 L100,135" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" />
                                                        <path d="M90,110 Q100,105 110,110" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" fill="none" />
                                                        <path d="M90,130 Q100,135 110,130" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" fill="none" />


                                                        <circle cx="70" cy="105" r="5" fill="#ffffff" opacity="0.6" />
                                                    </svg>
                                                </div>

                                                {/* Product details */}
                                                <div>
                                                    <p className="font-semibold text-gray-800">
                                                        {planItem.name}
                                                    </p>

                                                    {/* Credit counter */}
                                                    <div className="flex items-center space-x-2 mt-3">
                                                        <button
                                                            type="button"
                                                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded"
                                                            onClick={() => updatePlanQuantity(planItem.id, Math.max(planConfig.incrementBy, planItem.quantity - planConfig.incrementBy))}
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="number"
                                                            value={planItem.quantity}
                                                            onChange={(e) => {
                                                                const value = parseInt(e.target.value);
                                                                if (!isNaN(value) && value > 0) {
                                                                    // Ensure the input is a multiple of incrementBy
                                                                    const adjustedValue =
                                                                        value % planConfig.incrementBy === 0
                                                                            ? value
                                                                            : Math.ceil(value / planConfig.incrementBy) * planConfig.incrementBy;
                                                                    updatePlanQuantity(planItem.id, adjustedValue);
                                                                }
                                                            }}
                                                            className="shadow appearance-none border rounded w-16 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300 text-center"
                                                            min={planConfig.incrementBy}
                                                            step={planConfig.incrementBy}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded"
                                                            onClick={() => updatePlanQuantity(planItem.id, planItem.quantity + planConfig.incrementBy)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="w-full md:w-auto text-center md:text-right">
                                                <p className="text-lg font-bold text-gray-800">
                                                    ₹{(planItem.quantity * planConfig.pricePerCredit).toLocaleString()}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    ₹{planConfig.pricePerCredit.toFixed(2)} per credit
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Order Summary */}
                        <div className="bg-white rounded-lg shadow-md mb-6 p-4 md:p-6">
                            <div className="space-y-3">
                                <div className="flex justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-700">Subtotal</span>
                                    <span className="text-gray-800 font-medium">₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-700">GST ({gstRate * 100}%)</span>
                                    <span className="text-gray-800 font-medium">₹{gst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between py-2 font-bold text-lg">
                                    <span className="text-gray-800">Total</span>
                                    <span className="text-blue-600">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="bg-white rounded-lg shadow-md mb-6 p-4 md:p-6">


                            {/* Pay Now Button */}
                            <button
                                className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white text-center py-3 px-4 rounded-lg font-bold text-lg transition duration-300 shadow-md transform hover:translate-y-[-2px]"
                            // You can add payment processing logic here
                            >
                                Pay Now
                            </button>

                            {/* Security & Trust Note */}
                            <div className="mt-4 text-center text-xs text-gray-600">
                                <p>All payments are secure and encrypted.
                                    <br />Your financial information is never stored on our servers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentGateway;

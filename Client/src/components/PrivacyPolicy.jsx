import React from 'react';
import AurjobsLogo from '../assets/Aurjobs_Logo.jpg';

const PrivacyPolicy = () => {
 const headingColor = '#040736'; // Define the heading color

 return (
  <div className="bg-gray-50 py-12">
   <div className="container mx-auto px-4 md:px-0">
   <div className="flex justify-center mb-6">
          <img
            src="{AurjobsLogo}"
            alt="Privacy Policy Image"
            className="w-1/3 md:w-1/4" // Adjust width as needed
          />
    </div>
    {/* Header Section */}
    <div
     className="text-white py-6 rounded-md mb-8"
     style={{ backgroundColor: headingColor }}
    >
     <h1 className="text-3xl font-semibold text-center">Privacy Policy</h1>
     <p className="text-center text-lg mt-2">
      To learn more about Privacy at Aurjobs, please read below.
     </p>
    </div>

    {/* Effective Date */}
    <div className="text-gray-700 mb-6">
     <p className="text-sm">Effective Date: February 20, 2025</p>
     <p className="text-sm">Our Privacy Policy has been updated.</p>
    </div>

    {/* Your Privacy Matters Section */}
    <div className="mb-8">
     <h2 className="text-2xl font-semibold text-gray-800 mb-4">
      Your Privacy Matters
     </h2>
     <p className="text-gray-700 mb-2">
      Aurjobs respects your privacy and is committed to protecting it. This
      policy outlines how we collect, use, store, and protect your data.
     </p>
    </div>

    {/* Table of Contents (Basic) */}
    <div className="bg-white rounded-md shadow-md p-4 mb-8">
     <h3 className="text-lg font-semibold text-gray-700 mb-2">
      Table of Contents:
     </h3>
     <ul className="list-none pl-0">
      <li className="mb-1">
       <a href="#introduction" className="text-blue-500 hover:underline">
        Introduction
       </a>
      </li>
      <li className="mb-1">
       <a href="#info-we-collect" className="text-blue-500 hover:underline">
        Information We Collect
       </a>
      </li>
      <li className="mb-1">
       <a href="#how-we-use" className="text-blue-500 hover:underline">
        How We Use Your Data
       </a>
      </li>
      <li className="mb-1">
       <a href="#data-sharing" className="text-blue-500 hover:underline">
        Data Sharing
       </a>
      </li>
      <li className="mb-1">
       <a href="#user-rights" className="text-blue-500 hover:underline">
        User Rights
       </a>
      </li>
      <li className="mb-1">
       <a href="#contact-us" className="text-blue-500 hover:underline">
        Contact Us
       </a>
      </li>
     </ul>
    </div>

    {/* Introduction Section */}
    <section id="introduction" className="mb-8">
     <h2 className="text-xl font-semibold text-gray-800 mb-3">
      1. Introduction
     </h2>
     <p className="text-gray-700">
      AUREDGE AURJOBS PRIVATE LIMITED ("Aurjobs", "we", "us", or "our")
      respects your privacy and is committed to protecting it through this
      Privacy Policy. This document outlines how we collect, use, store, and
      protect your data when you interact with our platform.
     </p>
    </section>

    {/* Information We Collect Section */}
    <section id="info-we-collect" className="mb-8">
     <h2 className="text-xl font-semibold text-gray-800 mb-3">
      2. Information We Collect
     </h2>
     <p className="text-gray-700">
      We collect various types of information from users, including but not
      limited to:
     </p>
     <ul className="list-disc pl-5 text-gray-700">
      <li>
       Personal Information (e.g., Name, Email, Phone Number, Resume, Job
       Preferences)
      </li>
      <li>Account Information (e.g., Login Credentials)</li>
      <li>Cookies and Tracking Data</li>
     </ul>
    </section>

    {/* How We Use Your Data Section */}
    <section id="how-we-use" className="mb-8">
     <h2 className="text-xl font-semibold text-gray-800 mb-3">
      3. How We Use Your Data
     </h2>
     <p className="text-gray-700">
      We use the collected information for the following purposes:
     </p>
     <ul className="list-disc pl-5 text-gray-700">
      <li>To facilitate job matching and recruitment services</li>
      <li>To enhance user experience and platform functionality</li>
      <li>To process payments securely</li>
      <li>To ensure compliance with legal obligations</li>
     </ul>
    </section>

    {/* Data Sharing Section */}
    <section id="data-sharing" className="mb-8">
     <h2 className="text-xl font-semibold text-gray-800 mb-3">
      4. Data Sharing
     </h2>
     <p className="text-gray-700">
      We do not share your data with any third party unless required by law.
     </p>
    </section>

    {/* Data Retention and Deletion Section */}
    <section className="mb-8">
     <h2 className="text-xl font-semibold text-gray-800 mb-3">
      5. Data Retention and Deletion
     </h2>
     <p className="text-gray-700">
      Users can update or delete their personal data at any time through their
      account settings.
     </p>
    </section>

    {/* Security Measures Section */}
    <section className="mb-8">
     <h2 className="text-xl font-semibold text-gray-800 mb-3">
      6. Security Measures
     </h2>
     <p className="text-gray-700">
      We employ encryption and other security measures to protect user data
      from unauthorized access.
     </p>
    </section>

    {/* International Users Section */}
    <section className="mb-8">
     <h2 className="text-xl font-semibold text-gray-800 mb-3">
      7. International Users
     </h2>
     <p className="text-gray-700">
      Aurjobs is accessible globally and complies with India's IT Act.
     </p>
    </section>

    {/* User Rights Section */}
    <section id="user-rights" className="mb-8">
     <h2 className="text-xl font-semibold text-gray-800 mb-3">
      8. User Rights
     </h2>
     <p className="text-gray-700">
      Users have full access to their data and can request modifications or
      deletions.
     </p>
    </section>

    {/* Contact Us Section */}
    <section id="contact-us">
     <h2 className="text-xl font-semibold text-gray-800 mb-3">
      9. Contact Us
     </h2>
     <p className="text-gray-700">
      For any privacy-related concerns, you can reach us at{' '}
      <a href="mailto:info@Aurjobs.com" className="text-blue-500">
       info@Aurjobs.com
      </a>
      .
     </p>
    </section>
   </div>
  </div>
 );
};

export default PrivacyPolicy;

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react';

const FAQ = () => {

    const [activeIndex, setActiveIndex] = useState(null);
    const faqs = [
        {
          question: "What is Aurjobs Job Portal?",
          answer: "Aurjobs Job Portal is a smart hiring platform where employers can post jobs and connect with qualified candidates. Job seekers can apply for opportunities, access AI-powered tools, and enhance their job search experience."
        },
        {
          question: "How does Aurjobs help job seekers?",
          answer: "Aurjobs provides AI-driven job recommendations, resume reviews, skill assessments, and interview preparation tools to help candidates stand out and land the right job."
        },
        {
          question: "How can employers find the right candidates?",
          answer: "Employers can post job openings, set specific hiring criteria, and use AI-powered candidate matching to identify the best-fit professionals efficiently."
        },
        {
          question: "What makes Aurjobs different from other job portals?",
          answer: "Unlike traditional job boards, Aurjobs integrates AI-driven insights, automated screening, and assessment tools, making the hiring process faster, smarter, and more efficient."
        },
        {
          question: "Is Aurjobs free to use for job seekers?",
          answer: "Yes, job seekers can apply for jobs and use AI-powered tools for free. Additional premium services may be available for enhanced career support."
        },
        {
          question: "How do employers manage job postings?",
          answer: "Employers get access to an intuitive dashboard where they can post jobs, track applications, shortlist candidates, and communicate seamlessly."
        },
        {
          question: "Does Aurjobs verify job postings and candidates?",
          answer: "Yes, we ensure job authenticity and candidate verification to maintain a reliable and professional hiring ecosystem."
        },
        {
          question: "How can students and freshers benefit from Aurjobs?",
          answer: "Freshers can explore entry-level jobs, internships, and skill-building resources, making it easier to start their careers with confidence"
        },
        {
            question: "Does Aurjobs offer additional services beyond job postings?",
            answer: "Yes! Aurjobs provides AI-powered resume screening, interview scheduling, skill-based assessments, and hiring analytics to enhance both employer and candidate experiences."
          },
          {
            question: "How can businesses partner with Aurjobs?",
            answer: "Companies can collaborate with Aurjobs for bulk hiring, campus recruitment, and AI-driven hiring solutions to streamline their talent acquisition strategy."
          }
      ];
    
      const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
      };


  return (
    <div  className="bg-gray-50">
    <div 
      className="container mx-auto px-4 py-16"
      
    >
      <div 
        className="text-center mb-16"
      
      >
        <h2 className="text-4xl font-bold mb-2">
          Frequently Asked <span className="text-blue-600">Questions</span>
        </h2>
        <p className="text-xl text-gray-600">Find answers to common questions about our services</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {faqs.map((faq, index) => (
            <div
              key={index}
             
              className="border-b last:border-b-0"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <div
                  style={{
                    transform: `rotate(${activeIndex === index ? 180 : 0}deg)`,
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </div>
              </button>
              
              <div
                style={{
                  height: activeIndex === index ? 'auto' : 0,
                  opacity: activeIndex === index ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease-out'
                }}
              >
                <div className="p-6 pt-0 text-gray-600">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}

export default FAQ

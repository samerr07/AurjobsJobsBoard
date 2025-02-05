import React, { useEffect, useState } from 'react';
import signUpImg from "../assets/Signup2.png"
import CandidateSignup from '../components/CandidateLogin/CandidateSignup';



const CandidateRegister = () => {

  

  const [isMobile, setIsMobile] = useState(false); // To detect mobile view
 

  useEffect(() => {
    // Detect if the screen is mobile
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  

  return (
    <div className="overflow-auto bg-gray-50 [&::-webkit-scrollbar]:hidden">
    
      <div
        className={`flex h-screen py-16 transform duration-500 ease-in-out`}
        style={{
          width: isMobile ? "200%" : "100%", // Mobile: Login and Register, Desktop: Login, Middle, Register
         
        }}
      >
       
        {/* Middle Component (Desktop Only) */}
        {!isMobile && (
          <div className="h-full w-1/2 flex-shrink-0">
            <div className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden">
                                          <img
                                            src={signUpImg}
                                            className={`absolute max-w-full h-auto transition-transform duration-300
                                            }`}
                                          />
                                        </div>
          </div>
        )}

        {/* Right: Company Registration */}
        <div className={`h-full ${isMobile ? "w-1/2" : "w-1/2"} flex-shrink-0`}>
          <CandidateSignup />
        </div>
      </div>
    </div>
    
  );
};

export default CandidateRegister;
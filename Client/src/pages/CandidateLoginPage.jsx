import React, { useEffect, useState } from 'react';
import CandidateLogin from '../components/CandidateLogin/CandidateLogin';
import loginImage from "../assets/CompanyLoginImage.png";

const CandidateLoginPage = () => {


 
    const [isMobile, setIsMobile] = useState(false); // To detect mobile view
    

    useEffect(() => {
        // Detect if the screen is mobile
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize(); // Run on mount
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="overflow-hidden bg-gray-50">

            <div
                className={`flex h-screen transform duration-500 ease-in-out`}
                style={{
                    width: isMobile ? "200%" : "100%", // Mobile: Login and Register, Desktop: Login, Middle, Register

                }}
            >
                {/* Left: Company Login */}
                <div className={`h-full ${isMobile ? "w-1/2" : "w-1/2"} flex-shrink-0`}>
                    <CandidateLogin />
                </div>

                {/* Middle Component (Desktop Only) */}
                {!isMobile && (
                    <div className="h-full w-1/2 flex-shrink-0">
                        <div className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden">
                              <img
                                src={loginImage}
                                className={`absolute max-w-full h-auto transition-transform duration-300
                                }`}
                              />
                            </div>
                    </div>
                )}

            
            </div>
        </div>
    )
}

export default CandidateLoginPage

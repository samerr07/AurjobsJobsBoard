import React from 'react';
import { Briefcase, MapPin, Clock } from 'lucide-react';

const FeaturedJobs = () => {
  const jobs = [
    {
      title: "Digital Marketing Specialist",
      company: "TechNova Solutions",
      location: "Copenhagen, Denmark",
      type: "Full-time",
      salary: "$75,000 - $95,000",
      postedTime: "1 min ago",
      description: "Seeking a creative Digital Marketing Specialist to develop and implement comprehensive marketing strategies.",
      skills: ["SEO", "Social Media Marketing", "Content Strategy"],
      image: "/api/placeholder/200/150"
    },
    {
      title: "Full Stack Developer",
      company: "InnovateX Tech",
      location: "San Francisco, USA",
      type: "Remote",
      salary: "$120,000 - $150,000",
      postedTime: "1 min ago",
      description: "Exciting opportunity for a Full Stack Developer to build scalable web applications using modern technologies.",
      skills: ["React", "Node.js", "MongoDB", "Docker"],
      image: "/api/placeholder/200/150"
    },
    {
      title: "UI/UX Designer",
      company: "CreativeBrands Ltd",
      location: "London, England",
      type: "Hybrid",
      salary: "$85,000 - $110,000",
      postedTime: "3 min ago",
      description: "Design intuitive and engaging user experiences for cutting-edge digital products.",
      skills: ["Figma", "Adobe XD", "User Research"],
      image: "/api/placeholder/200/150"
    },
    {
      title: "Frontend Developer",
      company: "GlobalTech Innovations",
      location: "Bangalore, India",
      type: "Contract",
      salary: "$50,000 - $75,000",
      postedTime: "3 min ago",
      description: "Create responsive and performant web interfaces using modern frontend technologies.",
      skills: ["React", "TypeScript", "CSS Grid"],
      image: "/api/placeholder/200/150"
    },
    {
      title: "Java Software Engineer",
      company: "CloudNative Systems",
      location: "Austin, USA",
      type: "Full-time",
      salary: "$110,000 - $140,000",
      postedTime: "4 min ago",
      description: "Build robust backend systems and microservices using Java and cloud technologies.",
      skills: ["Spring Boot", "Kubernetes", "Microservices"],
      image: "/api/placeholder/200/150"
    },
    {
      title: "Full Stack Engineer",
      company: "DataDrive Solutions",
      location: "Manchester, England",
      type: "Remote",
      salary: "$95,000 - $125,000",
      postedTime: "5 min ago",
      description: "Develop end-to-end web applications with a focus on scalable and efficient solutions.",
      skills: ["Python", "Django", "React", "PostgreSQL"],
      image: "/api/placeholder/200/150"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-2 text-gray-900 text-center">Featured Jobs</h2>
      <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
        Explore our curated list of featured jobs that match your skills and interests.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2"
          >
            <div className="flex items-center mb-4">
              <img 
                src={job.image} 
                alt={job.title} 
                className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-100"
              />
              <div>
                <h3 className="font-bold text-xl text-gray-800">{job.title}</h3>
                <p className="text-gray-500 text-sm">{job.company}</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-sm">{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Briefcase className="w-4 h-4 mr-2 text-green-500" />
                <span className="text-sm">{job.type}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2 text-purple-500" />
                <span className="text-sm">{job.postedTime}</span>
              </div>
            </div>

            <p className="text-gray-700 text-sm mb-4 line-clamp-3">
              {job.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill, skillIndex) => (
                <span 
                  key={skillIndex} 
                  className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div className="text-green-600 font-semibold">{job.salary}</div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedJobs;
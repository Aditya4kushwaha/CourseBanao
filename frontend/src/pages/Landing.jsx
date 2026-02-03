import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Trophy, ArrowRight } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* Purple Corner Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f0f0f0 1px, transparent 1px),
            linear-gradient(to bottom, #f0f0f0 1px, transparent 1px),
            radial-gradient(circle 600px at 0% 200px, #d5c5ff, transparent),
            radial-gradient(circle 600px at 100% 200px, #d5c5ff, transparent)
          `,
          backgroundSize: "20px 20px, 20px 20px, 100% 100%, 100% 100%",
        }}
      />

      <div className="relative z-10 text-gray-900 selection:bg-purple-100 selection:text-purple-900">
        {/* Navbar */}
        <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            CoursePaglu
          </h1>
          <div className="space-x-4">
            <Link to="/login" className="px-4 py-2 hover:text-purple-600 font-medium transition">Login</Link>
            <Link to="/signup" className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition shadow-lg hover:shadow-xl">
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center px-4 mt-20 mb-32">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-gray-900">
            Master New Skills <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Shape Your Future
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl font-medium">
            Join thousands of learners on the most engaging platform for tech, design, and business.
          </p>
          <div className="flex gap-4">
            <Link to="/courses" className="px-8 py-4 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition shadow-xl transform hover:-translate-y-1 flex items-center gap-2">
              Browse Courses <ArrowRight size={20} />
            </Link>
            <Link to="/signup" className="px-8 py-4 border border-gray-300 bg-white text-gray-700 rounded-full hover:bg-gray-50 transition shadow-sm font-semibold">
              Join as Instructor
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 pb-20">
          <FeatureCard 
            icon={<BookOpen size={32} className="text-blue-500" />}
            title="Expert Content"
            desc="Learn from industry leaders and experienced professionals."
          />
          <FeatureCard 
            icon={<Users size={32} className="text-purple-500" />}
            title="Community"
            desc="Join a vibrant community of learners and mentors."
          />
          <FeatureCard 
            icon={<Trophy size={32} className="text-pink-500" />}
            title="Certification"
            desc="Earn recognized certificates upon course completion."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 rounded-2xl bg-white border border-gray-100/50 hover:border-purple-100 transition shadow-xl hover:shadow-2xl hover:shadow-purple-200/50">
    <div className="mb-4 bg-gray-50 w-12 h-12 flex items-center justify-center rounded-xl">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

export default Landing;

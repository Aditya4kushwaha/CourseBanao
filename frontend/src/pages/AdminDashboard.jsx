import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [adminName, setAdminName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/api/v1/admin/course/bulk', {
          headers: { token }
        });
        setCourses(response.data.courses);
        
        const meResponse = await axios.get('http://localhost:3000/api/v1/admin/me', {
          headers: { token }
        });
        setAdminName(meResponse.data.firstName);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* Background */}
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

      <div className="relative z-10 p-8">
        <div className="flex justify-between items-center mb-12 max-w-7xl mx-auto">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Admin Dashboard
            </h1>
            {adminName && <p className="text-gray-600 mt-2 text-lg">Welcome back, {adminName}!</p>}
          </div>
          <div className="flex gap-4">
            <Link 
              to="/create-course" 
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold shadow-lg hover:opacity-90 transition transform hover:-translate-y-0.5"
            >
              + Create New Course
            </Link>
            <button 
              onClick={handleLogout}
              className="px-6 py-3 bg-red-50 text-red-600 border border-red-100 rounded-lg font-bold shadow-sm hover:bg-red-100 transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {courses.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-2xl text-gray-500 mb-6">You haven't created any courses yet.</p>
              <Link to="/create-course" className="text-purple-600 font-bold hover:underline">Get started by creating directly</Link>
            </div>
          ) : (
            courses.map((course) => (
              <div key={course._id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={course.imageUrl} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                    Admin View
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 text-gray-900 line-clamp-1">{course.title}</h2>
                  <p className="text-gray-500 mb-2 line-clamp-2 text-sm">{course.description}</p>
                  {course.date && (
                    <p className="text-xs text-purple-600 font-semibold mb-2">Launch: {new Date(course.date).toLocaleDateString()}</p>
                  )}
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-blue-600">${course.price}</span>
                    <button className="text-gray-400 hover:text-red-500 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

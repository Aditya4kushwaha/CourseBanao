import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/course/preview');
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to enroll');
      navigate('/login');
      return;
    }
    try {
      await axios.post('http://localhost:3000/api/v1/course/purchase', {
        courseId
      }, {
        headers: {
          token: token
        }
      });
      alert('Successfully enrolled!');
    } catch (error) {
      console.error(error);
      alert('Enrollment failed. Already purchased?');
    }
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
        <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Explore Our Courses
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {courses.map((course) => (
            <div key={course._id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-100 transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img 
                  src={course.imageUrl} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-900">{course.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                  <button 
                    onClick={() => handleEnroll(course._id)}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition transform hover:-translate-y-0.5"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

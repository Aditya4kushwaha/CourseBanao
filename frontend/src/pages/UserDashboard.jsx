import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [purchases, setPurchases] = useState([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const purchasesRes = await axios.get('http://localhost:3000/api/v1/user/purchases', {
          headers: { token }
        });
        setPurchases(purchasesRes.data.coursesData);

        const meRes = await axios.get('http://localhost:3000/api/v1/user/me', {
          headers: { token }
        });
        setUserName(meRes.data.firstName);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

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
              My Learning
            </h1>
            {userName && <p className="text-gray-600 mt-2 text-lg">Welcome back, {userName}!</p>}
          </div>
          <div className="flex gap-4">
            <Link 
              to="/courses" 
              className="px-6 py-3 bg-white border border-purple-100 text-purple-600 rounded-lg font-bold shadow-sm hover:shadow-md transition"
            >
              Browse More Courses
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
          {purchases.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-2xl text-gray-500 mb-6">You haven't enrolled in any courses yet.</p>
              <Link to="/courses" className="text-purple-600 font-bold hover:underline">Browse Courses</Link>
            </div>
          ) : (
            purchases.map((course) => (
              <div key={course._id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={course.imageUrl} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 text-gray-900">{course.title}</h2>
                  <p className="text-gray-500 mb-4 line-clamp-2 text-sm">{course.description}</p>
                  
                  {/* Progress Bar (Mock) */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                       <div className="bg-purple-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>

                  <button className="w-full py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition mt-2 shadow-md">
                    Continue Learning
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

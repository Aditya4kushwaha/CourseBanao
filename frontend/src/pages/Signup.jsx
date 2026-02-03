import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isAdmin ? '/admin/signup' : '/user/signup';
    try {
      await axios.post(`http://localhost:3000/api/v1${endpoint}`, formData);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white relative flex items-center justify-center p-4 overflow-hidden">
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

      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Create Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-gray-700 mb-2 text-sm font-medium">First Name</label>
              <input 
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900 placeholder-gray-400 transition"
                placeholder="John"
              />
            </div>
             <div>
              <label className="block text-gray-700 mb-2 text-sm font-medium">Last Name</label>
              <input 
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900 placeholder-gray-400 transition"
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900 placeholder-gray-400 transition"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900 placeholder-gray-400 transition"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="adminCheckbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="adminCheckbox" className="text-sm font-medium text-gray-700">Signup as Admin</label>
          </div>

          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:opacity-90 transition shadow-lg mt-4">
            Sign Up Free
          </button>
        </form>
        <p className="mt-6 text-center text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

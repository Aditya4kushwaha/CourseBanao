import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    date: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:3000/api/v1/admin/course', formData, {
        headers: {
          token: token
        }
      });
      navigate('/admin/dashboard');
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

      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Create New Course</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 text-sm font-medium">Course Title</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900 placeholder-gray-400 transition"
                placeholder="e.g. Advanced React Patterns"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 text-sm font-medium">Price ($)</label>
              <input 
                type="number" 
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900 placeholder-gray-400 transition"
                placeholder="99"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">Description</label>
            <textarea 
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900 placeholder-gray-400 transition"
              placeholder="What will students learn?"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 text-sm font-medium">Course Logo URL</label>
              <input 
                type="url" 
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900 placeholder-gray-400 transition"
                placeholder="https://example.com/logo.jpg"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 text-sm font-medium">Launch Date</label>
              <input 
                type="date" 
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900 placeholder-gray-400 transition"
              />
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-bold hover:opacity-90 transition shadow-lg text-lg">
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;

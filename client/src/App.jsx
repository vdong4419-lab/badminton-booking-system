import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Promotions from './pages/Promotions';
import Register from './pages/Register';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-emerald-600">
            Badminton Booking
          </Link>
          <div className="flex gap-6 font-medium text-gray-600">
            <Link to="/" className="hover:text-emerald-600 transition">Khuyến mãi (PB04)</Link>
            <Link to="/register" className="hover:text-emerald-600 transition">Đăng ký (PB05)</Link>
            <Link to="/profile" className="hover:text-emerald-600 transition">Tài khoản (PB06)</Link>
          </div>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Promotions />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}
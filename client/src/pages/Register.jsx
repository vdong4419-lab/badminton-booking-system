import React, { useState } from 'react';
import { useNavigate, Link } from 'react_router_dom';
import axiosClient from '../api/axiosClient';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Gọi API Đăng ký PB05
      const res = await axiosClient.post('/auth/register', formData);
      setSuccess(res.data.message || 'Đăng ký thành công!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Đã có lỗi xảy ra!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Tạo Tài Khoản Mới</h2>
          <p class="text-sm text-gray-500 mt-1">Đăng ký để đặt sân nhanh chóng và nhận ưu đãi</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        {success && <div className="bg-emerald-50 text-emerald-600 p-3 rounded-lg mb-4 text-sm">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
            <input
              type="text"
              name="full_name"
              required
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Phan Văn Đồng"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="0905123456"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="example@duytan.edu.vn"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-emerald-700 transition"
          >
            Đăng Ký Tài Khoản
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-emerald-600 font-semibold hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
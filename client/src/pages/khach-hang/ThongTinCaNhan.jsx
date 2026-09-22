import React, { useEffect, useState } from 'react';
import axiosClient from '../axiosClient';
import { User, Lock, LogOut, Camera } from 'lucide-react';

export default function Profile() {
  const [user, setUser] = useState({ full_name: '', phone: '', email: '', avatar: '' });
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' hoặc 'password'
  const [passwordData, setPasswordData] = useState({ old_password: '', new_password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Lấy thông tin tài khoản hiện tại từ API PB06
    axiosClient
      .get('/users/profile')
      .then((res) => setUser(res.data))
      .catch((err) => setError('Không thể tải thông tin cá nhân'));
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const res = await axiosClient.put('/users/profile', {
        full_name: user.full_name,
        email: user.email,
        avatar: user.avatar,
      });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Cập nhật thất bại');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const res = await axiosClient.put('/users/change-password', passwordData);
      setMessage(res.data.message);
      setPasswordData({ old_password: '', new_password: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Đổi mật khẩu thất bại');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header Profile */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white flex items-center gap-4">
          <div className="relative">
            <img
              className="w-20 h-20 rounded-full border-4 border-white object-cover"
              src={
                user.avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'
              }
              alt="Avatar"
            />
            <button className="absolute bottom-0 right-0 bg-white text-gray-700 p-1.5 rounded-full shadow hover:bg-gray-100">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.full_name || 'Khách hàng'}</h2>
            <p className="text-emerald-100 text-sm">{user.phone}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 font-semibold flex items-center gap-2 ${
              activeTab === 'profile' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-white' : 'text-gray-500'
            }`}
          >
            <User className="w-4 h-4" /> Thông tin cá nhân
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`px-6 py-3 font-semibold flex items-center gap-2 ${
              activeTab === 'password' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-white' : 'text-gray-500'
            }`}
          >
            <Lock className="w-4 h-4" /> Đổi mật khẩu
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {message && <div className="bg-emerald-50 text-emerald-600 p-3 rounded-lg mb-4 text-sm">{message}</div>}
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}

          {activeTab === 'profile' ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                  <input
                    type="text"
                    value={user.full_name}
                    onChange={(e) => setUser({ ...user, full_name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại (Cố định)</label>
                  <input
                    type="text"
                    value={user.phone}
                    disabled
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email liên hệ</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-red-500 font-semibold hover:underline flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" /> Đăng xuất
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-lg shadow hover:bg-emerald-700 transition"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  required
                  value={passwordData.old_password}
                  onChange={(e) => setPasswordData({ ...passwordData, old_password: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
                <input
                  type="password"
                  required
                  value={passwordData.new_password}
                  onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-lg shadow hover:bg-emerald-700 transition"
              >
                Xác nhận đổi mật khẩu
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import guiYeuCauApi from '../../api/gui-yeu-cau-api';
import { UserPlus, Lock, Mail, Phone, User } from 'lucide-react';

export default function DangKyTaikhoan() {
  const [formData, setFormData] = useState({ ho_ten: '', email: '', mat_khau: '', so_dien_thoai: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await guiYeuCauApi.post('/khach-hang/dang-ky', formData);
      alert('Đăng ký thành công! Hãy đăng nhập.');
      navigate('/dang-nhap');
    } catch (err) {
      alert(err.response?.data?.message || 'Đăng ký thất bại!');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mt-6">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2">
          <UserPlus size={24} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Tạo Tài Khoản Mới</h2>
        <p className="text-sm text-slate-500">Đăng ký để đặt sân nhanh chóng</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Họ và Tên</label>
          <div className="relative">
            <User className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              className="w-full border pl-10 pr-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="Nguyễn Văn A"
              onChange={(e) => setFormData({ ...formData, ho_ten: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Email</label>
          <div className="relative">
            <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
            <input
              type="email"
              required
              className="w-full border pl-10 pr-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="example@gmail.com"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Số Điện Thoại</label>
          <div className="relative">
            <Phone className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
            <input
              type="tel"
              required
              className="w-full border pl-10 pr-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="0905123456"
              onChange={(e) => setFormData({ ...formData, so_dien_thoai: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Mật Khẩu</label>
          <div className="relative">
            <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
            <input
              type="password"
              required
              className="w-full border pl-10 pr-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="••••••••"
              onChange={(e) => setFormData({ ...formData, mat_khau: e.target.value })}
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-emerald-600/20">
          Đăng Ký
        </button>
      </form>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import guiYeuCauApi from '../../api/gui-yeu-cau-api';
import { User, Lock, Mail, Phone, LogOut, Camera, Shield, CheckCircle2 } from 'lucide-react';

export default function ThongTinCaNhan() {
  const [user, setUser] = useState({ ho_ten: '', so_dien_thoai: '', email: '', vai_tro: '' });
  const [activeTab, setActiveTab] = useState('profile');
  const [passwordData, setPasswordData] = useState({ mat_khau_cu: '', mat_khau_moi: '' });

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('nguoi_dung')) || {
      ho_ten: 'Phan Văn Đồng',
      so_dien_thoai: '0903333333',
      email: 'phanvandong@gmail.com',
      vai_tro: 'khach_hang'
    };
    setUser(localUser);
  }, []);

  const handleDangXuat = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nguoi_dung');
    window.location.href = '/dang-nhap';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      
      {/* Header Profile */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
        <div className="w-24 h-24 rounded-full bg-emerald-500 text-slate-950 font-black text-3xl flex items-center justify-center border-4 border-white/20 shadow-2xl shrink-0">
          {user.ho_ten ? user.ho_ten.charAt(0) : 'U'}
        </div>

        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-black">{user.ho_ten}</h1>
            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 rounded-md text-[10px] font-bold uppercase">
              {user.vai_tro}
            </span>
          </div>
          <p className="text-xs text-slate-300 flex items-center justify-center sm:justify-start gap-1">
            <Phone size={13} /> {user.so_dien_thoai}
          </p>
          <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1">
            <Mail size={13} /> {user.email || 'Chưa cập nhật email'}
          </p>
        </div>
      </div>

      {/* Main Form Body */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-4 font-bold text-xs uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'profile' ? 'border-emerald-600 text-emerald-600 bg-white' : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            <User size={16} /> Thông Tin Tài Khoản
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`px-6 py-4 font-bold text-xs uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'password' ? 'border-emerald-600 text-emerald-600 bg-white' : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            <Lock size={16} /> Bảo Mật & Mật Khẩu
          </button>
        </div>

        <div className="p-8">
          {activeTab === 'profile' ? (
            <form className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Họ và Tên</label>
                <input
                  type="text"
                  value={user.ho_ten}
                  onChange={(e) => setUser({ ...user, ho_ten: e.target.value })}
                  className="w-full border border-slate-200 bg-slate-50 p-3 rounded-2xl text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Số Điện Thoại (Cố Định)</label>
                <input
                  type="text"
                  disabled
                  value={user.so_dien_thoai}
                  className="w-full border border-slate-200 bg-slate-100 p-3 rounded-2xl text-sm font-semibold text-slate-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Email Liên Hệ</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full border border-slate-200 bg-slate-50 p-3 rounded-2xl text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleDangXuat}
                  className="text-red-500 font-bold text-xs hover:underline flex items-center gap-1"
                >
                  <LogOut size={16} /> Đăng Xuất Tài Khoản
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md text-xs transition-all"
                >
                  Lưu Thay Đổi
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Mật Khẩu Hiện Tại</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-slate-200 bg-slate-50 p-3 rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Mật Khẩu Mới</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-slate-200 bg-slate-50 p-3 rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md text-xs transition-all"
              >
                Cập Nhật Mật Khẩu
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
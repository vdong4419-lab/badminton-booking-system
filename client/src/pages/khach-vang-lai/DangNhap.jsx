import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Lock, Phone } from 'lucide-react';

// DANH SÁCH TÀI KHOẢN MẪU TẠM THỜI
const TAI_KHOAN_MAU = [
  {
    so_dien_thoai: '0901111111',
    mat_khau: '123456',
    nguoi_dung: { id: 1, ho_ten: 'Nguyễn Văn Admin', vai_tro: 'admin' }
  },
  {
    so_dien_thoai: '0902222222',
    mat_khau: '123456',
    nguoi_dung: { id: 2, ho_ten: 'Trần Thị Lễ Tân', vai_tro: 'le_tan' }
  },
  {
    so_dien_thoai: '0903333333',
    mat_khau: '123456',
    nguoi_dung: { id: 3, ho_ten: 'Phan Văn Đồng', vai_tro: 'khach_hang' }
  }
];

export default function DangNhap() {
  const [formData, setFormData] = useState({ so_dien_thoai: '', mat_khau: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleDangNhap = (e) => {
    e.preventDefault();
    setError('');

    // Tìm kiếm trong danh sách tài khoản mẫu
    const userFound = TAI_KHOAN_MAU.find(
      (u) => u.so_dien_thoai === formData.so_dien_thoai && u.mat_khau === formData.mat_khau
    );

    if (userFound) {
      // Giả lập lưu Token và Thông tin người dùng vào LocalStorage
      localStorage.setItem('token', 'mock_token_123456');
      localStorage.setItem('nguoi_dung', JSON.stringify(userFound.nguoi_dung));

      alert(`Đăng nhập thành công với quyền: ${userFound.nguoi_dung.vai_tro.toUpperCase()}`);

      // Điều hướng theo quyền
      const role = userFound.nguoi_dung.vai_tro;
      if (role === 'admin') navigate('/admin/thong-ke');
      else if (role === 'le_tan') navigate('/le-tan/xac-nhan');
      else navigate('/dat-san');

      window.location.reload(); // Reload để Sidebar cập nhật lại menu
    } else {
      setError('Số điện thoại hoặc mật khẩu không chính xác!');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mt-8">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2">
          <LogIn size={24} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Đăng Nhập Hệ Thống</h2>
        <p className="text-sm text-slate-500">Nhập tài khoản mẫu để dùng thử</p>
      </div>

      {error && <div className="p-3 mb-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">{error}</div>}

      <form onSubmit={handleDangNhap} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Số Điện Thoại</label>
          <div className="relative">
            <Phone className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
            <input
              type="tel"
              required
              value={formData.so_dien_thoai}
              className="w-full border pl-10 pr-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="0901111111 (Admin) / 0903333333 (Khách)"
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
              value={formData.mat_khau}
              className="w-full border pl-10 pr-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="123456"
              onChange={(e) => setFormData({ ...formData, mat_khau: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-emerald-600/20"
        >
          Đăng Nhập Ngay
        </button>
      </form>

      {/* Gợi ý nhanh tài khoản test */}
      <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
        <p className="font-bold text-slate-700 mb-1">Tài khoản thử nghiệm nhanh (Mật khẩu: 123456):</p>
        <p>• Admin: <code className="bg-slate-200 px-1 py-0.5 rounded text-emerald-700 font-bold">0901111111</code></p>
        <p>• Lễ tân: <code className="bg-slate-200 px-1 py-0.5 rounded text-emerald-700 font-bold">0902222222</code></p>
        <p>• Khách hàng: <code className="bg-slate-200 px-1 py-0.5 rounded text-emerald-700 font-bold">0903333333</code></p>
      </div>
    </div>
  );
}
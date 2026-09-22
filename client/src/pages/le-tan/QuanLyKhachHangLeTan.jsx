import React, { useState } from 'react';
import { Users, Search, Phone, Mail, FileText, AlertCircle } from 'lucide-react';

export default function QuanLyKhachHangLeTan() {
  const [tuKhoa, setTuKhoa] = useState('');
  const [danhSachKhach, setDanhSachKhach] = useState([
    { id: 1, ho_ten: 'Phan Văn Đồng', so_dien_thoai: '0903333333', email: 'phanvandong@gmail.com', trang_thai: 'hoat_dong' },
    { id: 2, ho_ten: 'Lê Văn C', so_dien_thoai: '0908888888', email: 'levanc@gmail.com', trang_thai: 'hoat_dong' },
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Users className="text-emerald-600" /> UC15: Tra Cứu & Hỗ Trợ Khách Hàng
          </h1>
          <p className="text-xs text-slate-500 mt-1">Tra cứu nhanh hồ sơ khách hàng để hỗ trợ xử lý đổi/hủy/sự cố đặt sân</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Nhập tên hoặc SĐT khách..."
            value={tuKhoa}
            onChange={(e) => setTuKhoa(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-slate-400 uppercase font-bold border-b border-slate-100">
            <tr>
              <th className="p-3">Họ và Tên</th>
              <th className="p-3">Số Điện Thoại</th>
              <th className="p-3">Email Liên Hệ</th>
              <th className="p-3">Trạng Thái</th>
              <th className="p-3 text-right">Hỗ Trợ Lễ Tân</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold">
            {danhSachKhach.map((kh) => (
              <tr key={kh.id} className="hover:bg-slate-50/80 transition-all">
                <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center">
                    {kh.ho_ten.charAt(0)}
                  </div>
                  {kh.ho_ten}
                </td>
                <td className="p-3 font-bold text-slate-700">{kh.so_dien_thoai}</td>
                <td className="p-3">{kh.email}</td>
                <td className="p-3">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold">Hoạt động</span>
                </td>
                <td className="p-3 text-right">
                  <button className="bg-slate-900 text-white hover:bg-emerald-600 px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all">
                    Xem Lịch Sử Đặt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
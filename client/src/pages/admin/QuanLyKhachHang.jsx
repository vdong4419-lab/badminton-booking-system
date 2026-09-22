import React, { useState } from 'react';
import { Users, Search, Phone, Mail, Award, Lock, ShieldCheck } from 'lucide-react';

export default function QuanLyKhachHang() {
  const [danhSachKhach, setDanhSachKhach] = useState([
    { id: 1, hoTen: 'Phan Văn Đồng', sdt: '0903333333', email: 'phanvandong@gmail.com', tongDon: 12, chiTieu: '2.400.000đ', ngayDangKy: '10/01/2026' },
    { id: 2, hoTen: 'Lê Văn C', sdt: '0908888888', email: 'levanc@gmail.com', tongDon: 5, chiTieu: '850.000đ', ngayDangKy: '15/05/2026' },
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Quản Lý Khách Hàng</h1>
          <p className="text-xs text-slate-500 mt-1">Danh sách tài khoản thành viên và tổng quan chi tiêu đặt sân</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc SĐT..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-slate-400 uppercase font-bold border-b border-slate-100">
            <tr>
              <th className="p-3">Khách Hàng</th>
              <th className="p-3">Số Điện Thoại</th>
              <th className="p-3">Email</th>
              <th className="p-3">Tổng Đơn Đặt</th>
              <th className="p-3">Tổng Chi Tiêu</th>
              <th className="p-3 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold">
            {danhSachKhach.map((kh) => (
              <tr key={kh.id} className="hover:bg-slate-50/80 transition-all">
                <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center">
                    {kh.hoTen.charAt(0)}
                  </div>
                  <div>
                    <p>{kh.hoTen}</p>
                    <span className="text-[10px] text-slate-400 font-normal">Đăng ký: {kh.ngayDangKy}</span>
                  </div>
                </td>
                <td className="p-3 font-bold text-slate-700">{kh.sdt}</td>
                <td className="p-3">{kh.email}</td>
                <td className="p-3"><span className="bg-slate-100 px-2.5 py-1 rounded-lg text-slate-800 font-bold">{kh.tongDon} đơn</span></td>
                <td className="p-3 text-emerald-600 font-extrabold">{kh.chiTieu}</td>
                <td className="p-3 text-right">
                  <button className="text-red-500 font-bold hover:underline">Khóa TK</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
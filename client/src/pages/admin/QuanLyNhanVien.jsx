import React, { useState } from 'react';
import { Users, Plus, Shield, Phone, Mail, UserCheck, KeyRound } from 'lucide-react';

export default function QuanLyNhanVien() {
  const [danhSachNhanVien, setDanhSachNhanVien] = useState([
    { id: 1, hoTen: 'Trần Thị Lễ Tân', sdt: '0902222222', email: 'letan@gmail.com', caLam: 'Ca Sáng (05:00 - 13:00)', vaiTro: 'le_tan' },
    { id: 2, hoTen: 'Nguyễn Văn B', sdt: '0904444444', email: 'nhanvien2@gmail.com', caLam: 'Ca Tối (13:00 - 22:00)', vaiTro: 'le_tan' },
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Quản Lý Nhân Viên Lễ Tân</h1>
          <p className="text-xs text-slate-500 mt-1">Danh sách nhân viên có quyền truy cập chức năng check-in vận hành sân</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-md">
          <Plus size={16} /> Thêm Nhân Viên
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-slate-400 uppercase font-bold border-b border-slate-100">
            <tr>
              <th className="p-3">Họ và Tên</th>
              <th className="p-3">Số Điện Thoại</th>
              <th className="p-3">Email</th>
              <th className="p-3">Ca Làm Việc</th>
              <th className="p-3 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold">
            {danhSachNhanVien.map((nv) => (
              <tr key={nv.id} className="hover:bg-slate-50/80 transition-all">
                <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                    {nv.hoTen.charAt(0)}
                  </div>
                  {nv.hoTen}
                </td>
                <td className="p-3">{nv.sdt}</td>
                <td className="p-3">{nv.email}</td>
                <td className="p-3"><span className="bg-slate-100 px-2.5 py-1 rounded-lg text-slate-600 font-bold">{nv.caLam}</span></td>
                <td className="p-3 text-right space-x-2">
                  <button className="text-emerald-600 font-bold hover:underline">Sửa ca</button>
                  <button className="text-red-500 font-bold hover:underline">Khóa tài khoản</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
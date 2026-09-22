import React, { useState } from 'react';
import { DollarSign, Clock, Plus, Edit2, Save, Sparkles, CalendarDays } from 'lucide-react';

export default function QuanLyGiaSan() {
  const [bangGia, setBangGia] = useState([
    { id: 1, loaiKhungGio: 'Khung Giờ Sáng (Off-Peak)', tuGio: '05:00', denGio: '16:00', giaSanThuong: 70000, giaSanVip: 90000, apDungCuoiTuan: false },
    { id: 2, loaiKhungGio: 'Khung Giờ Tối (Peak Hours)', tuGio: '16:00', denGio: '23:00', giaSanThuong: 100000, giaSanVip: 120000, apDungCuoiTuan: true },
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Quản Lý Giá Sân</h1>
          <p className="text-xs text-slate-500 mt-1">Cấu hình bảng giá theo khung giờ sáng/tối và ngày lễ/cuối tuần</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-md">
          <Plus size={16} /> Thêm Khung Giá Mới
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-slate-400 uppercase font-bold border-b border-slate-100">
            <tr>
              <th className="p-3">Tên Khung Giờ</th>
              <th className="p-3">Khung Thời Gian</th>
              <th className="p-3">Giá Sân Tiêu Chuẩn</th>
              <th className="p-3">Giá Sân VIP</th>
              <th className="p-3">Phụ Thu Cuối Tuần</th>
              <th className="p-3 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold">
            {bangGia.map((g) => (
              <tr key={g.id} className="hover:bg-slate-50/80 transition-all">
                <td className="p-3 font-bold text-slate-900">{g.loaiKhungGio}</td>
                <td className="p-3">
                  <span className="bg-slate-100 px-2.5 py-1 rounded-lg font-bold text-slate-700 flex items-center gap-1 w-fit">
                    <Clock size={13} className="text-emerald-600" /> {g.tuGio} - {g.denGio}
                  </span>
                </td>
                <td className="p-3 text-slate-800 font-bold">{g.giaSanThuong.toLocaleString()}đ / h</td>
                <td className="p-3 text-emerald-600 font-extrabold">{g.giaSanVip.toLocaleString()}đ / h</td>
                <td className="p-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${g.apDungCuoiTuan ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                    {g.apDungCuoiTuan ? '+20.000đ (Thứ 7, CN)' : 'Không phụ thu'}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button className="text-emerald-600 font-bold hover:underline flex items-center gap-1 ml-auto">
                    <Edit2 size={14} /> Chỉnh sửa
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
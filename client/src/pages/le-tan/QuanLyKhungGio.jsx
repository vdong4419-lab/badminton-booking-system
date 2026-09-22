import React, { useState, useEffect } from 'react';
import { Clock, Plus, Tag, DollarSign } from 'lucide-react';
import guiYeuCauApi from '../../api/gui-yeu-cau-api';

export default function QuanLyKhungGio() {
  const [danhSachKhungGio, setDanhSachKhungGio] = useState([
    { id: 1, loai_san: 'Trong nhà', khung_gio: '05:00 - 16:00', gia_tien: 80000 },
    { id: 2, loai_san: 'Trong nhà', khung_gio: '16:00 - 22:00', gia_tien: 100000 },
    { id: 3, loai_san: 'VIP', khung_gio: '05:00 - 22:00', gia_tien: 120000 },
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Clock className="text-emerald-600" /> UC14: Quản Lý Khung Giờ Đặt Sân
          </h1>
          <p className="text-xs text-slate-500 mt-1">Cấu hình các slot thời gian cho phép khách đặt và tra cứu tại quầy</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-slate-400 uppercase font-bold border-b border-slate-100">
            <tr>
              <th className="p-3">Loại Sân</th>
              <th className="p-3">Khung Thời Gian (Slot)</th>
              <th className="p-3">Đơn Giá Áp Dụng</th>
              <th className="p-3 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold">
            {danhSachKhungGio.map((kg) => (
              <tr key={kg.id} className="hover:bg-slate-50/80 transition-all">
                <td className="p-3 font-bold text-slate-900">{kg.loai_san}</td>
                <td className="p-3">
                  <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-xl font-bold border border-emerald-200 flex items-center gap-1 w-fit">
                    <Clock size={13} /> {kg.khung_gio}
                  </span>
                </td>
                <td className="p-3 font-black text-emerald-600">{Number(kg.gia_tien).toLocaleString()}đ / giờ</td>
                <td className="p-3 text-right">
                  <button className="text-emerald-600 hover:underline font-bold">Chỉnh sửa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
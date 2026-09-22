import React, { useState } from 'react';
import { Tag, Plus, Calendar, Copy, Trash2, CheckCircle2 } from 'lucide-react';

export default function QuanLyKhuyenMai() {
  const [danhSachVoucher, setDanhSachVoucher] = useState([
    { id: 1, maCode: 'GIOVANG20', giamGia: '20%', moTa: 'Giảm 20% cho khung giờ sáng', hanDung: '2026-10-30', trangThai: 'dang_ap_dung' },
    { id: 2, maCode: 'DATLICH3H', giamGia: 'Tặng Nước', moTa: 'Tặng 1 phần nước khi đặt trên 3 tiếng', hanDung: '2026-11-15', trangThai: 'dang_ap_dung' },
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Quản Lý Mã Khuyến Mãi</h1>
          <p className="text-xs text-slate-500 mt-1">Tạo và kích hoạt mã Voucher giảm giá áp dụng cho khách hàng</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-md">
          <Plus size={16} /> Tạo Voucher Mới
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {danhSachVoucher.map((v) => (
          <div key={v.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-emerald-600 text-white font-black text-xs rounded-xl tracking-wider">
                  {v.maCode}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Giảm {v.giamGia}
                </span>
              </div>
              <h3 className="font-bold text-slate-800 text-sm pt-1">{v.moTa}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar size={13} /> Hạn dùng đến: {v.hanDung}
              </p>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 size={14} /> Đang hoạt động
              </span>
              <button className="text-red-500 hover:text-red-700 font-bold text-xs flex items-center gap-1">
                <Trash2 size={14} /> Tắt Mã
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
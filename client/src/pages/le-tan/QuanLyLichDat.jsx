import React, { useState } from 'react';
import { Calendar, Search, CheckCircle2, XCircle, Clock, RefreshCw, Filter } from 'lucide-react';

export default function QuanLyLichDat() {
  const [ngayLoc, setNgayLoc] = useState(new Date().toISOString().split('T')[0]);
  const [trangThaiLoc, setTrangThaiLoc] = useState('all');

  // Dữ liệu mẫu đơn đặt sân
  const [danhSachDon, setDanhSachDon] = useState([
    {
      id: 1,
      maDon: 'SCL-88291',
      khachHang: 'Phan Văn Đồng',
      soDienThoai: '0903333333',
      tenSan: 'Sân 1 (Thảm Yonex)',
      ngayDat: '2026-09-22',
      gioBatDau: '17:00',
      gioKetThuc: '19:00',
      tongTien: 180000,
      tienCoc: 90000,
      trangThai: 'yeu_cau_huy',
      lyDoHuy: 'Bận việc đột xuất'
    },
    {
      id: 2,
      maDon: 'SCL-77123',
      khachHang: 'Lê Văn C',
      soDienThoai: '0908888888',
      tenSan: 'Sân 2 (Thảm Victor)',
      ngayDat: '2026-09-22',
      gioBatDau: '19:00',
      gioKetThuc: '20:00',
      tongTien: 80000,
      tienCoc: 40000,
      trangThai: 'da_dat_coc',
      lyDoHuy: ''
    }
  ]);

  const handleDuyetHuy = (id) => {
    if (window.confirm('Xác nhận đồng ý yêu cầu hủy đơn này?')) {
      setDanhSachDon(danhSachDon.map(don => don.id === id ? { ...don, trangThai: 'da_huy' } : don));
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Calendar className="text-emerald-600" /> Quản Lý Lịch Đặt Sân
          </h1>
          <p className="text-xs text-slate-500 mt-1">Theo dõi phiếu đặt sân và xử lý yêu cầu đổi/hủy lịch của khách</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <input 
            type="date" 
            value={ngayLoc} 
            onChange={(e) => setNgayLoc(e.target.value)} 
            className="border border-slate-200 bg-slate-50 px-3 py-2 rounded-xl text-xs font-bold outline-none"
          />
          <select 
            value={trangThaiLoc} 
            onChange={(e) => setTrangThaiLoc(e.target.value)}
            className="border border-slate-200 bg-slate-50 px-3 py-2 rounded-xl text-xs font-bold outline-none"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="da_dat_coc">Đã đặt cọc</option>
            <option value="yeu_cau_huy">Yêu cầu hủy</option>
            <option value="yeu_cau_doi">Yêu cầu đổi</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-slate-400 uppercase font-bold border-b border-slate-100">
            <tr>
              <th className="p-3">Mã Đơn</th>
              <th className="p-3">Khách Hàng</th>
              <th className="p-3">Sân Đặt</th>
              <th className="p-3">Giờ Đặt</th>
              <th className="p-3">Tổng / Cọc</th>
              <th className="p-3">Trạng Thái</th>
              <th className="p-3 text-right">Thao Tác Lễ Tân</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold">
            {danhSachDon.map((don) => (
              <tr key={don.id} className="hover:bg-slate-50/80 transition-all">
                <td className="p-3 font-black text-slate-900">{don.maDon}</td>
                <td className="p-3">
                  <p className="font-bold text-slate-800">{don.khachHang}</p>
                  <p className="text-[10px] text-slate-400">{don.soDienThoai}</p>
                </td>
                <td className="p-3 font-bold text-slate-700">{don.tenSan}</td>
                <td className="p-3">{don.gioBatDau} - {don.gioKetThuc}</td>
                <td className="p-3">
                  <p className="text-emerald-600 font-bold">{don.tongTien.toLocaleString()}đ</p>
                  <p className="text-[10px] text-slate-400">Cọc: {don.tienCoc.toLocaleString()}đ</p>
                </td>
                <td className="p-3">
                  {don.trangThai === 'yeu_cau_huy' && (
                    <span className="px-2.5 py-1 bg-red-100 text-red-600 rounded-full text-[10px] font-bold">Yêu cầu hủy</span>
                  )}
                  {don.trangThai === 'da_dat_coc' && (
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold">Đã đặt cọc</span>
                  )}
                  {don.trangThai === 'da_huy' && (
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-400 rounded-full text-[10px] font-bold">Đã hủy</span>
                  )}
                </td>
                <td className="p-3 text-right">
                  {don.trangThai === 'yeu_cau_huy' && (
                    <button 
                      onClick={() => handleDuyetHuy(don.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1.5 rounded-xl text-[11px]"
                    >
                      Duyệt Hủy Đơn
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
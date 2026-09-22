import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Search, CheckCircle2, XCircle, Clock, Filter, ArrowRight } from 'lucide-react';

export default function TraCuuLich() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [ngayChon, setNgayChon] = useState(new Date().toISOString().split('T')[0]);
  const [loaiSan, setLoaiSan] = useState('all');

  // Dữ liệu ma trận lịch trống mẫu
  const danhSachSanLich = [
    {
      id: 1,
      tenSan: 'Sân 01 - Yonex VIP (Khu A)',
      khungGio: [
        { gio: '05:00 - 07:00', trangThai: 'trong', gia: '80.000đ' },
        { gio: '07:00 - 09:00', trangThai: 'da_dat', gia: '90.000đ' },
        { gio: '17:00 - 19:00', trangThai: 'trong', gia: '120.000đ' },
        { gio: '19:00 - 21:00', trangThai: 'da_dat', gia: '120.000đ' },
      ]
    },
    {
      id: 2,
      tenSan: 'Sân 02 - Victor Standard (Khu A)',
      khungGio: [
        { gio: '05:00 - 07:00', trangThai: 'trong', gia: '70.000đ' },
        { gio: '07:00 - 09:00', trangThai: 'trong', gia: '80.000đ' },
        { gio: '17:00 - 19:00', trangThai: 'da_dat', gia: '100.000đ' },
        { gio: '19:00 - 21:00', trangThai: 'trong', gia: '100.000đ' },
      ]
    }
  ];

  const handleChonDat = () => {
    if (!token) {
      alert('Vui lòng đăng nhập để thực hiện đặt sân!');
      navigate('/dang-nhap');
    } else {
      navigate('/dat-san');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900 text-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Calendar className="text-emerald-400" /> Tra Cứu Lịch Trống Theo Ngay
          </h1>
          <p className="text-xs text-slate-300 mt-1">Kiểm tra thời gian thực các khung giờ còn trống để chủ động đặt lịch</p>
        </div>
        
        {/* Bộ lọc ngày & loại sân */}
        <div className="flex flex-wrap gap-3 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-white text-slate-800 px-3 py-1.5 rounded-xl text-sm font-semibold">
            <Calendar size={16} className="text-emerald-600" />
            <input type="date" value={ngayChon} onChange={(e) => setNgayChon(e.target.value)} className="outline-none bg-transparent" />
          </div>
          <select value={loaiSan} onChange={(e) => setLoaiSan(e.target.value)} className="bg-slate-800 text-white px-3 py-1.5 rounded-xl text-sm font-semibold outline-none">
            <option value="all">Tất Cả Loại Sân</option>
            <option value="vip">Sân Thảm VIP</option>
            <option value="std">Sân Tiêu Chuẩn</option>
          </select>
        </div>
      </div>

      {/* Chú thích trạng thái */}
      <div className="flex gap-6 justify-end text-xs font-bold px-2">
        <span className="flex items-center gap-1.5 text-emerald-600"><span className="w-3 h-3 bg-emerald-500 rounded-full"></span> Còn Trống</span>
        <span className="flex items-center gap-1.5 text-slate-400"><span className="w-3 h-3 bg-slate-300 rounded-full"></span> Đã Đặt / Khóa</span>
      </div>

      {/* Danh sách Lịch Trống */}
      <div className="space-y-4">
        {danhSachSanLich.map((san) => (
          <div key={san.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> {san.tenSan}
              </h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Đang mở cửa</span>
            </div>

            {/* Grid các Khung Giờ */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {san.khungGio.map((slot, idx) => (
                <div 
                  key={idx}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    slot.trangThai === 'trong' 
                      ? 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100 hover:border-emerald-400 cursor-pointer' 
                      : 'border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed'
                  }`}
                  onClick={() => slot.trangThai === 'trong' && handleChonDat()}
                >
                  <div className="flex items-center justify-center gap-1 text-xs font-bold text-slate-700">
                    <Clock size={14} className={slot.trangThai === 'trong' ? 'text-emerald-600' : 'text-slate-400'} />
                    {slot.gio}
                  </div>
                  <div className="text-xs font-extrabold text-emerald-700 mt-1">{slot.gia}</div>
                  <span className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    slot.trangThai === 'trong' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {slot.trangThai === 'trong' ? 'Đặt Ngay' : 'Đã Đặt'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
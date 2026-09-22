import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Search, ShieldCheck } from 'lucide-react';

export default function TrangChu() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 text-center py-10">
      <h1 className="text-4xl font-extrabold text-emerald-700">
        Hệ Thống Đặt Sân Cầu Lông Trực Tuyến
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Đặt sân nhanh chóng, tra cứu lịch trống theo thời gian thực và thanh toán đặt cọc dễ dàng.
      </p>

      <div className="flex justify-center gap-4">
        <Link to="/dat-san" className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700">
          <Calendar className="w-5 h-5" /> Đặt Sân Ngay
        </Link>
        <Link to="/tra-cuu" className="border border-emerald-600 text-emerald-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-50">
          <Search className="w-5 h-5" /> Tra Cứu Lịch Trống
        </Link>
      </div>
    </div>
  );
}
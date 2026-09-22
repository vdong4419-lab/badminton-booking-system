import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Tag, CheckCircle2, XCircle, AlertCircle, ChevronRight, FileText } from 'lucide-react';

export default function LichSuDatSan() {
  // Dữ liệu đơn đặt lịch mẫu
  const danhSachLichSu = [
    {
      id: 'SCL-88291',
      ngayDat: '2026-09-22',
      gioDat: '17:00 - 19:00 (2 Tiếng)',
      tenSan: 'Sân 01 - Thảm Yonex VIP',
      tongTien: 240000,
      trangThai: 'da_xac_nhan', // da_xac_nhan, cho_checkin, da_huy
      ngayTao: '21/09/2026 14:30'
    },
    {
      id: 'SCL-77123',
      ngayDat: '2026-09-18',
      gioDat: '19:00 - 20:00 (1 Tiếng)',
      tenSan: 'Sân 02 - Thảm Victor Standard',
      tongTien: 100000,
      trangThai: 'cho_checkin',
      ngayTao: '17/09/2026 09:15'
    },
    {
      id: 'SCL-66012',
      ngayDat: '2026-09-10',
      gioDat: '06:00 - 08:00 (2 Tiếng)',
      tenSan: 'Sân 03 - Thảm Lining',
      tongTien: 160000,
      trangThai: 'da_huy',
      ngayTao: '09/09/2026 20:00'
    }
  ];

  const renderBadgeTrangThai = (trangThai) => {
    switch (trangThai) {
      case 'da_xac_nhan':
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle2 size={13} /> Hoàn Thành</span>;
      case 'cho_checkin':
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold flex items-center gap-1"><Clock size={13} /> Chờ Check-in</span>;
      case 'da_huy':
        return <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold flex items-center gap-1"><XCircle size={13} /> Đã Hủy</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <FileText className="text-emerald-600" /> Lịch Sử Đặt Sân Của Bạn
          </h1>
          <p className="text-xs text-slate-500 mt-1">Quản lý và xem lại tất cả các đơn đặt sân cầu lông đã thực hiện</p>
        </div>
        <span className="text-xs font-bold bg-slate-100 px-3 py-1.5 rounded-xl border">
          Tổng đơn: {danhSachLichSu.length}
        </span>
      </div>

      {/* Danh sách thẻ lịch sử */}
      <div className="space-y-4">
        {danhSachLichSu.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
            
            {/* Header Thẻ */}
            <div className="flex flex-wrap justify-between items-center gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-sm">{item.id}</span>
                <span className="text-[11px] text-slate-400">| Ngày tạo: {item.ngayTao}</span>
              </div>
              {renderBadgeTrangThai(item.trangThai)}
            </div>

            {/* Chi tiết thông tin */}
            <div className="grid sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 font-bold block uppercase text-[10px]">Tên Sân</span>
                <p className="font-bold text-slate-800 text-sm">{item.tenSan}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-bold block uppercase text-[10px]">Ngày & Khung Giờ</span>
                <p className="font-bold text-slate-800 flex items-center gap-1">
                  <Calendar size={13} className="text-emerald-600" /> {item.ngayDat}
                </p>
                <p className="font-semibold text-slate-600 flex items-center gap-1">
                  <Clock size={13} className="text-emerald-600" /> {item.gioDat}
                </p>
              </div>

              <div className="space-y-1 sm:text-right">
                <span className="text-slate-400 font-bold block uppercase text-[10px]">Tổng Tiền Thanh Toán</span>
                <p className="font-black text-emerald-600 text-base">{item.tongTien.toLocaleString()}đ</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
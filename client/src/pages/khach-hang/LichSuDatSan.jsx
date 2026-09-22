import React, { useEffect, useState } from 'react';
import { Calendar, Clock, FileText, CheckCircle2, XCircle, AlertCircle, Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LichSuDatSan() {
  const [danhSachLichSu, setDanhSachLichSu] = useState([]);
  const navigate = useNavigate();

  // Load danh sách đơn đặt sân từ localStorage
  useEffect(() => {
    const dataLocal = JSON.parse(localStorage.getItem('danh_sach_don_dat')) || [
      // Đơn hàng mẫu ban đầu nếu chưa có đơn mới
      {
        id: 'SCL-88291',
        ngayDat: '2026-09-22',
        gioDat: '17:00 - 19:00',
        tenSan: 'Sân 01 - Thảm Yonex VIP',
        tongTien: 240000,
        trangThai: 'da_xac_nhan',
        ngayTao: '21/09/2026 14:30'
      },
      {
        id: 'SCL-77123',
        ngayDat: '2026-09-25',
        gioDat: '19:00 - 20:00',
        tenSan: 'Sân 02 - Thảm Victor Standard',
        tongTien: 120000,
        trangThai: 'cho_checkin',
        ngayTao: '22/09/2026 09:15'
      }
    ];
    setDanhSachLichSu(dataLocal);
  }, []);

  // Hàm xử lý hủy đơn đặt sân
  const handleHuyDon = (idDon) => {
    if (window.confirm(`Bạn có chắc chắn muốn hủy đơn đặt sân ${idDon} không?`)) {
      const danhSachCapNhat = danhSachLichSu.map(item => {
        if (item.id === idDon) {
          return { ...item, trangThai: 'da_huy' };
        }
        return item;
      });
      
      setDanhSachLichSu(danhSachCapNhat);
      localStorage.setItem('danh_sach_don_dat', JSON.stringify(danhSachCapNhat));
      alert('Đã hủy đơn đặt sân thành công!');
    }
  };

  // Badge hiển thị trạng thái bằng màu sắc
  const renderBadgeTrangThai = (trangThai) => {
    switch (trangThai) {
      case 'da_xac_nhan':
        return (
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold flex items-center gap-1 border border-emerald-200">
            <CheckCircle2 size={13} /> Hoàn Thành
          </span>
        );
      case 'cho_checkin':
        return (
          <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold flex items-center gap-1 border border-amber-200">
            <Clock size={13} /> Chờ Check-in
          </span>
        );
      case 'da_huy':
        return (
          <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold flex items-center gap-1 border border-red-200">
            <XCircle size={13} /> Đã Hủy
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      
      {/* Header Trang */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <FileText className="text-emerald-600" /> Lịch Sử Đặt Sân Của Bạn
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Quản lý và tra cứu trạng thái tất cả phiếu đặt sân cầu lông
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/dat-san')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-2xl transition-all shadow-md shadow-emerald-600/20"
          >
            + Đặt Sân Mới
          </button>
          <span className="text-xs font-bold bg-slate-100 px-3 py-2 rounded-2xl border text-slate-600">
            Tổng: {danhSachLichSu.length} đơn
          </span>
        </div>
      </div>

      {/* Danh Sách Thẻ Lịch Sử */}
      <div className="space-y-4">
        {danhSachLichSu.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
            <AlertCircle size={40} className="text-slate-300 mx-auto" />
            <p className="text-slate-500 font-bold text-sm">Bạn chưa có đơn đặt sân nào!</p>
            <button 
              onClick={() => navigate('/dat-san')}
              className="text-xs text-emerald-600 font-bold hover:underline inline-block"
            >
              Bấm vào đây để tiến hành đặt sân ngay
            </button>
          </div>
        ) : (
          danhSachLichSu.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 space-y-4"
            >
              {/* Header Thẻ Đơn Hàng */}
              <div className="flex flex-wrap justify-between items-center gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-900 text-sm">{item.id}</span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    • Ngày tạo: {item.ngayTao}
                  </span>
                </div>
                {renderBadgeTrangThai(item.trangThai)}
              </div>

              {/* Chi Tiết Nội Dung */}
              <div className="grid sm:grid-cols-3 gap-4 text-xs">
                {/* Tên Sân */}
                <div className="space-y-1">
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">
                    Sân Đặt
                  </span>
                  <p className="font-bold text-slate-800 text-sm">
                    {item.tenSan}
                  </p>
                </div>

                {/* Ngày & Khung Giờ */}
                <div className="space-y-1">
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">
                    Thời Gian Sử Dụng
                  </span>
                  <p className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Calendar size={13} className="text-emerald-600" /> {item.ngayDat}
                  </p>
                  <p className="font-semibold text-slate-600 flex items-center gap-1.5">
                    <Clock size={13} className="text-emerald-600" /> {item.gioDat}
                  </p>
                </div>

                {/* Tổng Tiền & Nút Thao Tác */}
                <div className="space-y-2 sm:text-right flex flex-col sm:items-end justify-between">
                  <div>
                    <span className="text-slate-400 font-bold block uppercase text-[10px]">
                      Tổng Thanh Toán
                    </span>
                    <p className="font-black text-emerald-600 text-base">
                      {Number(item.tongTien).toLocaleString()}đ
                    </p>
                  </div>

                  {/* Nút Hủy Đơn nếu đơn ở trạng thái Chờ Check-in */}
                  {item.trangThai === 'cho_checkin' && (
                    <button
                      onClick={() => handleHuyDon(item.id)}
                      className="text-red-500 hover:text-red-700 font-bold text-[11px] flex items-center gap-1 hover:underline"
                    >
                      <Trash2 size={13} /> Hủy Lịch Đặt
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
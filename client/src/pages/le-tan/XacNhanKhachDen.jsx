import React, { useState } from 'react';
import { UserCheck, Search, CheckCircle2, DollarSign, Clock } from 'lucide-react';

export default function XacNhanKhachDen() {
  const [tuKhoa, setTuKhoa] = useState('');
  const [donTimThay, setDonTimThay] = useState(null);

  const handleTimKiem = (e) => {
    e.preventDefault();
    if (!tuKhoa) return;

    // Giả lập tìm kiếm đơn đặt
    setDonTimThay({
      id: 1,
      maDon: 'SCL-77123',
      khachHang: 'Lê Văn C',
      soDienThoai: '0908888888',
      tenSan: 'Sân 2 (Thảm Victor)',
      ngayDat: '2026-09-22',
      gioDat: '19:00 - 20:00',
      tongTien: 80000,
      tienCoc: 40000,
      conLai: 40000,
      trangThai: 'da_dat_coc'
    });
  };

  const handleCheckIn = () => {
    if (window.confirm(`Xác nhận check-in và thu ${donTimThay.conLai.toLocaleString()}đ tiền còn lại?`)) {
      setDonTimThay({ ...donTimThay, trangThai: 'dang_su_dung' });
      alert('Check-in thành công! Khách có thể nhận sân.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center space-y-2">
        <h1 className="text-2xl font-black text-slate-800 flex items-center justify-center gap-2">
          <UserCheck className="text-emerald-600" /> Xác Nhận Khách Đến & Check-in
        </h1>
        <p className="text-xs text-slate-500">Tra cứu nhanh phiếu đặt sân bằng Số Điện Thoại hoặc Mã Đơn Hàng</p>
      </div>

      {/* Thanh Tìm Kiếm */}
      <form onSubmit={handleTimKiem} className="flex gap-2">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Nhập SĐT hoặc Mã đơn (VD: SCL-77123)..."
            value={tuKhoa}
            onChange={(e) => setTuKhoa(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-slate-200 bg-white rounded-2xl text-xs font-semibold outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>
        <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-2xl transition-all shadow-md">
          Tra Cứu
        </button>
      </form>

      {/* Kết Quả Tra Cứu */}
      {donTimThay && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Mã phiếu đặt</span>
              <h3 className="font-black text-slate-900 text-lg">{donTimThay.maDon}</h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              donTimThay.trangThai === 'dang_su_dung' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {donTimThay.trangThai === 'dang_su_dung' ? 'Đang sử dụng' : 'Chờ Check-in'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-bold block">Khách Hàng:</span>
              <p className="font-bold text-slate-800 text-sm">{donTimThay.khachHang}</p>
              <p className="text-slate-500">{donTimThay.soDienThoai}</p>
            </div>
            <div>
              <span className="text-slate-400 font-bold block">Thông Tin Sân:</span>
              <p className="font-bold text-slate-800 text-sm">{donTimThay.tenSan}</p>
              <p className="text-emerald-600 font-semibold">{donTimThay.gioDat}</p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Tổng tiền đơn:</span>
              <span className="font-bold">{donTimThay.tongTien.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Đã đặt cọc:</span>
              <span className="font-bold text-emerald-600">-{donTimThay.tienCoc.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-200">
              <span>Cần thu còn lại tại quầy:</span>
              <span className="text-red-500">{donTimThay.conLai.toLocaleString()}đ</span>
            </div>
          </div>

          {donTimThay.trangThai !== 'dang_su_dung' && (
            <button
              onClick={handleCheckIn}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-600/20 text-xs transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={16} /> Xác Nhận Khách Nhận Sân & Thu Tiền
            </button>
          )}
        </div>
      )}
    </div>
  );
}
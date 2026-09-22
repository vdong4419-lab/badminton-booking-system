import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, Shield, Tag, CreditCard, ChevronRight, AlertCircle, Info } from 'lucide-react';
import guiYeuCauApi from '../../api/gui-yeu-cau-api';

export default function DatLichSan() {
  const [ngayDat, setNgayDat] = useState(new Date().toISOString().split('T')[0]);
  const [sanChon, setSanChon] = useState('1'); // ID sân
  const [gioDaChon, setGioDaChon] = useState([]); // mảng khung giờ đã chọn
  const [maGiamGia, setMaGiamGia] = useState('');
  const [daApDungVoucher, setDaApDungVoucher] = useState(false);

  // Khung giờ mẫu
  const danhSachKhungGio = [
    { gio: '05:00 - 06:00', gia: 80000, trangThai: 'trong' },
    { gio: '06:00 - 07:00', gia: 80000, trangThai: 'trong' },
    { gio: '07:00 - 08:00', gia: 80000, trangThai: 'da_dat' },
    { gio: '17:00 - 18:00', gia: 120000, trangThai: 'trong' },
    { gio: '18:00 - 19:00', gia: 120000, trangThai: 'da_dat' },
    { gio: '19:00 - 20:00', gia: 120000, trangThai: 'trong' },
    { gio: '20:00 - 21:00', gia: 100000, trangThai: 'trong' },
  ];

  const toggleChonGio = (gioObj) => {
    if (gioObj.trangThai === 'da_dat') return;
    if (gioDaChon.some(g => g.gio === gioObj.gio)) {
      setGioDaChon(gioDaChon.filter(g => g.gio !== gioObj.gio));
    } else {
      setGioDaChon([...gioDaChon, gioObj]);
    }
  };

  const tongTienGốc = gioDaChon.reduce((sum, item) => sum + item.gia, 0);
  const giamGia = daApDungVoucher ? tongTienGốc * 0.2 : 0;
  const tongThanhToan = tongTienGốc - giamGia;

  const handleApDungVoucher = () => {
    if (maGiamGia.toUpperCase() === 'GIOVANG20') {
      setDaApDungVoucher(true);
      alert('Đã áp dụng mã giảm 20%!');
    } else {
      alert('Mã giảm giá không hợp lệ!');
    }
  };

  const handleXacNhanDat = () => {
    if (gioDaChon.length === 0) {
      alert('Vui lòng chọn ít nhất 1 khung giờ!');
      return;
    }
    alert(`Đặt sân thành công! Tổng tiền: ${tongThanhToan.toLocaleString()}đ`);
  };

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 pb-10">
      
      {/* CỘT BÊN TRÁI: CHỌN SÂN & KHUNG GIỜ (2 CỘT) */}
      <div className="lg:col-span-2 space-y-6">
        {/* Header & Thanh chọn ngày/sân */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h1 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
            <Calendar className="text-emerald-600" /> Chọn Lịch & Khung Giờ Đặt Sân
          </h1>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Ngày Đặt Sân</label>
              <input 
                type="date" 
                value={ngayDat}
                onChange={(e) => setNgayDat(e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 p-3 rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Chọn Sân Cầu Lông</label>
              <select 
                value={sanChon}
                onChange={(e) => setSanChon(e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 p-3 rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="1">Sân 01 - Thảm Yonex VIP (Khu A)</option>
                <option value="2">Sân 02 - Thảm Victor Standard (Khu A)</option>
                <option value="3">Sân 03 - Thảm Lining (Khu B)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bảng chọn ô thời gian (Slots Grid) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-800 text-sm">Danh Sách Khung Giờ Ngày {ngayDat}</h3>
            <div className="flex gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-slate-100 border rounded-md"></span> Trống</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-emerald-600 rounded-md"></span> Đã chọn</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-slate-300 rounded-md"></span> Đã đặt</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {danhSachKhungGio.map((slot, idx) => {
              const isChon = gioDaChon.some(g => g.gio === slot.gio);
              const isDaDat = slot.trangThai === 'da_dat';

              return (
                <button
                  key={idx}
                  disabled={isDaDat}
                  onClick={() => toggleChonGio(slot)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                    isDaDat 
                      ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60' 
                      : isChon
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-600'
                        : 'bg-slate-50 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold flex items-center gap-1">
                      <Clock size={13} /> {slot.gio}
                    </span>
                    {isChon && <CheckCircle2 size={16} className="text-white" />}
                  </div>
                  <span className={`text-xs font-bold mt-2 ${isChon ? 'text-emerald-100' : 'text-emerald-600'}`}>
                    {slot.gia.toLocaleString()}đ
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CỘT BÊN PHẢI: TỔNG QUAN HÓA ĐƠN & THANH TOÁN (1 CỘT) */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-6 sticky top-6">
          <h2 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <CreditCard className="text-emerald-600" /> Thông Tin Đơn Đặt
          </h2>

          {/* Chi tiết slot đã chọn */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Khung giờ đã chọn ({gioDaChon.length}):</span>
            {gioDaChon.length === 0 ? (
              <p className="text-xs text-slate-400 bg-slate-50 p-3 rounded-xl border border-dashed text-center">Chưa chọn khung giờ nào</p>
            ) : (
              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {gioDaChon.map((g, i) => (
                  <div key={i} className="flex justify-between items-center bg-emerald-50 p-2.5 rounded-xl text-xs font-semibold text-emerald-800">
                    <span>{g.gio}</span>
                    <span>{g.gia.toLocaleString()}đ</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Nhập mã giảm giá */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-400 uppercase">Mã Khuyến Mãi</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="VD: GIOVANG20" 
                value={maGiamGia}
                onChange={(e) => setMaGiamGia(e.target.value)}
                className="flex-1 border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button 
                onClick={handleApDungVoucher}
                className="bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-emerald-600 transition-all"
              >
                Áp Dụng
              </button>
            </div>
          </div>

          {/* Chi tiết tính tiền */}
          <div className="space-y-2 pt-4 border-t border-slate-100 text-sm">
            <div className="flex justify-between text-slate-500 text-xs">
              <span>Tạm tính:</span>
              <span className="font-semibold">{tongTienGốc.toLocaleString()}đ</span>
            </div>
            {daApDungVoucher && (
              <div className="flex justify-between text-emerald-600 text-xs font-bold">
                <span>Giảm giá (20%):</span>
                <span>-{giamGia.toLocaleString()}đ</span>
              </div>
            )}
            <div className="flex justify-between text-slate-900 font-extrabold text-base pt-2 border-t border-slate-100">
              <span>Tổng thanh toán:</span>
              <span className="text-emerald-600">{tongThanhToan.toLocaleString()}đ</span>
            </div>
          </div>

          <button 
            onClick={handleXacNhanDat}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-sm"
          >
            Xác Nhận Đặt Sân <ChevronRight size={18} />
          </button>
        </div>
      </div>

    </div>
  );
}
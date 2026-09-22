import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Clock, Star, MapPin, ChevronRight, Zap, Award, Coffee, ShieldCheck } from 'lucide-react';

export default function TrangChu() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Danh sách danh mục sân mẫu có hình ảnh đẹp
  const danhSachSan = [
    {
      id: 1,
      ten: 'Sân Cầu Lông Yonex - Sân 01 (Thảm VIP)',
      gia: '90.000đ - 120.000đ/h',
      danhGia: 4.9,
      viTri: 'Khu A - Tầng 1',
      hinhAnh: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80',
      badge: 'Sân VIP'
    },
    {
      id: 2,
      ten: 'Sân Cầu Lông Victor - Sân 02 (Thảm Tiêu Chuẩn)',
      gia: '80.000đ - 100.000đ/h',
      danhGia: 4.8,
      viTri: 'Khu A - Tầng 1',
      hinhAnh: 'https://images.unsplash.com/photo-1521537634581-0dced2efa2a3?auto=format&fit=crop&w=600&q=80',
      badge: 'Hot'
    },
    {
      id: 3,
      ten: 'Sân Cầu Lông Lining - Sân 03 (Đèn LED Chống Chói)',
      gia: '85.000đ - 110.000đ/h',
      danhGia: 4.7,
      viTri: 'Khu B - Tầng 2',
      hinhAnh: 'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?auto=format&fit=crop&w=600&q=80',
      badge: 'Ưu đãi'
    },
    {
      id: 4,
      ten: 'Sân Cầu Lông Đôi Thi Đấu - Sân 04',
      gia: '100.000đ - 130.000đ/h',
      danhGia: 5.0,
      viTri: 'Khu VIP Center',
      hinhAnh: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=600&q=80',
      badge: 'Chuẩn BWF'
    }
  ];

  const handleChonDatSan = () => {
    if (!token) {
      alert('Vui lòng đăng nhập tài khoản để tiến hành đặt sân!');
      navigate('/dang-nhap');
    } else {
      navigate('/dat-san');
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      
      {/* 1. HERO BANNER SLIDER */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-800 via-teal-700 to-slate-900 text-white p-8 md:p-12 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="px-3 py-1 bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 rounded-full text-xs font-bold uppercase tracking-wider">
            ⚡ Đặt sân cực nhanh - Giữ chỗ tức thì
          </span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">
            Hệ Thống Sân Cầu Lông Hiện Đại Hàng Đầu
          </h1>
          <p className="text-slate-300 text-sm md:text-base">
            Thảm thảm tiêu chuẩn BWF chống trượt, hệ thống đèn LED chống chói mắt, phục vụ nước uống & dụng cụ thi đấu đầy đủ.
          </p>
          <div className="pt-2 flex gap-3">
            <button 
              onClick={handleChonDatSan}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-2xl shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2 text-sm"
            >
              Đặt Sân Ngay <ChevronRight size={18} />
            </button>
            <button 
              onClick={() => navigate('/bang-gia')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-2xl border border-white/20 backdrop-blur-md transition-all text-sm"
            >
              Xem Bảng Giá
            </button>
          </div>
        </div>
      </div>

      {/* 2. THANH TÌM KIẾM NHANH */}
      <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 grid md:grid-cols-4 gap-4 items-center">
        <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
          <Calendar className="text-emerald-600 shrink-0" size={20} />
          <div className="w-full">
            <label className="block text-[10px] font-bold text-slate-400 uppercase">Ngày Đặt</label>
            <input type="date" className="bg-transparent text-sm font-semibold text-slate-700 outline-none w-full" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
          <Clock className="text-emerald-600 shrink-0" size={20} />
          <div className="w-full">
            <label className="block text-[10px] font-bold text-slate-400 uppercase">Khung Giờ</label>
            <select className="bg-transparent text-sm font-semibold text-slate-700 outline-none w-full">
              <option>17:00 - 18:00</option>
              <option>18:00 - 19:00</option>
              <option>19:00 - 20:00</option>
              <option>20:00 - 21:00</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
          <MapPin className="text-emerald-600 shrink-0" size={20} />
          <div className="w-full">
            <label className="block text-[10px] font-bold text-slate-400 uppercase">Loại Sân</label>
            <select className="bg-transparent text-sm font-semibold text-slate-700 outline-none w-full">
              <option>Tất cả các sân</option>
              <option>Sân Thảm Yonex VIP</option>
              <option>Sân Thảm Tiêu Chuẩn</option>
            </select>
          </div>
        </div>

        <button 
          onClick={() => navigate('/tra-cuu')}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-full min-h-[48px] rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
        >
          <Search size={18} /> Tra Cứu Lịch
        </button>
      </div>

      {/* 3. ĐIỂM NỔI BẬT */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Zap, title: "Đặt Lịch Tốc Độ", desc: "Giữ chỗ chỉ trong 30 giây" },
          { icon: ShieldCheck, title: "Thảm BWF Chuẩn", desc: "Độ bám tốt, êm chân" },
          { icon: Coffee, title: "Dịch Vụ Đầy Đủ", desc: "Nước uống, cho thuê vợt" },
          { icon: Award, title: "Giải Đấu Thường Xuyên", desc: "Giao lưu kết nối đam mê" },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
              <item.icon size={22} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 4. DANH SÁCH SÂN GRID CARD (Like ALOBO Booking) */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Danh Sách Sân Cầu Lông</h3>
            <p className="text-xs text-slate-500">Lựa chọn sân phù hợp với nhu cầu tập luyện của bạn</p>
          </div>
          <button onClick={() => navigate('/tra-cuu')} className="text-sm font-bold text-emerald-600 hover:underline flex items-center gap-1">
            Xem tất cả <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {danhSachSan.map((san) => (
            <div key={san.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
              {/* Image Container */}
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={san.hinhAnh} 
                  alt={san.ten} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow">
                  {san.badge}
                </span>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-yellow-400 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                  <Star size={12} fill="currentColor" /> {san.danhGia}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mb-1">
                    <MapPin size={12} /> {san.viTri}
                  </span>
                  <h4 className="font-bold text-slate-800 text-sm line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {san.ten}
                  </h4>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Giá thuê từ</span>
                    <span className="text-sm font-extrabold text-emerald-600">{san.gia}</span>
                  </div>
                  <button 
                    onClick={handleChonDatSan}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs shadow transition-all"
                  >
                    ĐẶT SÂN
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
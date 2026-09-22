import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Sun, Moon, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function BangGia() {
  const navigate = useNavigate();

  const bangGiaCT = [
    {
      loai: 'Khung Giờ Sáng (Sáng - Chiều)',
      gio: '05:00 - 16:00',
      bieuTuong: Sun,
      mauSac: 'from-amber-500 to-orange-500',
      giaThuong: '70.000đ / giờ',
      giaVip: '90.000đ / giờ',
      uuDai: 'Phù hợp tập thể lực, học sinh - sinh viên'
    },
    {
      loai: 'Khung Giờ Vàng (Tối Peak Hours)',
      gio: '16:00 - 23:00',
      bieuTuong: Moon,
      mauSac: 'from-emerald-600 to-teal-800',
      giaThuong: '100.000đ / giờ',
      giaVip: '120.000đ / giờ',
      uuDai: 'Bật full hệ thống đèn LED chống chói chuẩn BWF',
      hot: true
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase">Bảng giá niêm yết</span>
        <h1 className="text-3xl font-black text-slate-800">Giá Thuê Sân Cầu Lông</h1>
        <p className="text-sm text-slate-500">Bảng giá minh bạch, không phụ phí ẩn, đã bao gồm hệ thống chiếu sáng & thảm thi đấu chuẩn.</p>
      </div>

      {/* Grid Thẻ Giá */}
      <div className="grid md:grid-cols-2 gap-6">
        {bangGiaCT.map((item, idx) => {
          const Icon = item.bieuTuong;
          return (
            <div key={idx} className={`relative bg-white rounded-3xl border ${item.hot ? 'border-emerald-500 shadow-xl' : 'border-slate-200 shadow-sm'} overflow-hidden flex flex-col justify-between`}>
              {item.hot && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold uppercase px-4 py-1 rounded-bl-xl shadow">
                  🔥 Giờ Cao Điểm
                </div>
              )}
              
              <div className="p-6 space-y-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${item.mauSac} text-white flex items-center justify-center shadow-md`}>
                  <Icon size={24} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800">{item.loai}</h3>
                  <p className="text-xs text-slate-400 font-semibold mt-1">Khung giờ: {item.gio}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 font-medium">Sân Thảm Tiêu Chuẩn:</span>
                    <span className="text-base font-extrabold text-slate-900">{item.giaThuong}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 font-medium">Sân Thảm Yonex VIP:</span>
                    <span className="text-base font-extrabold text-emerald-600">{item.giaVip}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-500 shrink-0" />
                  <span>{item.uuDai}</span>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <button 
                  onClick={() => navigate('/tra-cuu')}
                  className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                >
                  Kiểm Tra Lịch Trống <ArrowRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
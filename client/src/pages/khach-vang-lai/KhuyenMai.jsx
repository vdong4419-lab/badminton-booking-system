import React, { useState } from 'react';
import { Tag, Gift, Copy, Check, Calendar, ArrowRight } from 'lucide-react';

export default function KhuyenMai() {
  const [copiedCode, setCopiedCode] = useState('');

  const dsKhuyenMai = [
    {
      id: 1,
      maCode: 'GIOVANG20',
      tieuDe: 'Giảm 20% Cho Khung Giờ Sáng',
      moTa: 'Áp dụng cho tất cả các đơn đặt sân trong khung giờ từ 05:00 đến 10:00 sáng từ Thứ 2 đến Thứ 6.',
      hanDung: '30/10/2026',
      mau: 'from-emerald-500 to-teal-700'
    },
    {
      id: 2,
      maCode: 'DATLICH3H',
      tieuDe: 'Đặt 3 Tiếng - Tặng 1 Nước Yến/Pocari',
      moTa: 'Đặt sân liên tục từ 3 giờ trở lên nhận ngay voucher 1 phần nước tự chọn tại quầy lễ tân.',
      hanDung: '15/11/2026',
      mau: 'from-amber-500 to-orange-600'
    }
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      <div className="bg-gradient-to-r from-red-500 via-rose-600 to-amber-500 text-white p-8 rounded-3xl shadow-xl flex items-center justify-between">
        <div className="space-y-2 max-w-xl">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase">Săn Voucher Ưu Đãi</span>
          <h1 className="text-3xl font-black">Khuyến Mãi Hot Hàng Tháng</h1>
          <p className="text-xs text-white/80">Nhập mã giảm giá khi thanh toán hoặc đặt lịch trực tuyến để nhận ưu đãi đặc biệt.</p>
        </div>
        <Gift size={80} className="text-white/20 hidden md:block" />
      </div>

      {/* Danh sách Voucher Card */}
      <div className="grid md:grid-cols-2 gap-6">
        {dsKhuyenMai.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
            <div className="p-6 space-y-3">
              <div className="flex justify-between items-start">
                <span className={`px-3 py-1 rounded-lg text-white font-black text-xs bg-gradient-to-r ${item.mau}`}>
                  {item.maCode}
                </span>
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                  <Calendar size={12} /> Hạn dùng: {item.hanDung}
                </span>
              </div>
              
              <h3 className="font-bold text-slate-800 text-base">{item.tieuDe}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.moTa}</p>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Mã ưu đãi: <code className="font-bold text-emerald-600 text-sm bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{item.maCode}</code>
              </div>
              <button 
                onClick={() => handleCopy(item.maCode)}
                className="bg-slate-900 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5"
              >
                {copiedCode === item.maCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copiedCode === item.maCode ? 'Đã Chép Mã' : 'Sao Chép'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
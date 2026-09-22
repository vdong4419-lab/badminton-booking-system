import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ThanhToanCoc() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const donDat = location.state?.donDatInfo || null;
  const [phuongThuc, setPhuongThuc] = useState('momo');
  const [dangXuLy, setDangXuLy] = useState(false);

  useEffect(() => {
    if (!donDat) {
      navigate('/lich-su-dat'); // Nếu không có dữ liệu đơn, đẩy về lịch sử
    }
  }, [donDat, navigate]);

  const tienCoc = donDat ? donDat.tongTien * 0.3 : 0; // Tính cọc 30%

  const xuLyThanhToan = () => {
    setDangXuLy(true);
    
    // Giả lập thời gian thanh toán 1.5 giây
    setTimeout(() => {
      alert(`Đã thanh toán cọc thành công qua ${phuongThuc === 'momo' ? 'Ví MoMo' : 'VNPAY'}!`);
      navigate('/lich-su-dat');
    }, 1500);
  };

  if (!donDat) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <CreditCard className="text-emerald-600" /> Thanh Toán Tiền Cọc (30%)
        </h1>
        <p className="text-xs text-slate-500 mt-1">Hoàn tất thanh toán để giữ chỗ lịch đặt sân của bạn.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Thông tin đơn hàng */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase border-b border-slate-100 pb-2">Chi Tiết Đơn Hàng</h2>
          <div className="space-y-3 text-sm font-semibold text-slate-700">
            <p className="flex justify-between">Mã đơn: <span className="text-emerald-600 font-black">{donDat.id}</span></p>
            <p className="flex justify-between">Sân: <span>{donDat.tenSan}</span></p>
            <p className="flex justify-between">Ngày: <span>{donDat.ngayDat}</span></p>
            <p className="flex justify-between">Giờ: <span>{donDat.gioDat}</span></p>
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <p className="flex justify-between text-slate-500">Tổng tiền sân: <span>{donDat.tongTien.toLocaleString()}đ</span></p>
              <p className="flex justify-between text-lg text-slate-900 font-black">
                Cọc cần thanh toán: <span className="text-emerald-600">{tienCoc.toLocaleString()}đ</span>
              </p>
            </div>
          </div>
        </div>

        {/* Cổng thanh toán */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-sm font-bold text-slate-400 uppercase border-b border-slate-100 pb-2 flex items-center gap-2">
            <ShieldCheck size={16} /> Chọn Phương Thức
          </h2>
          
          <div className="space-y-3">
            <label className={`block border-2 p-4 rounded-2xl cursor-pointer transition-all ${phuongThuc === 'momo' ? 'border-pink-500 bg-pink-50' : 'border-slate-100 hover:border-pink-200'}`}>
              <input type="radio" name="pt" value="momo" className="hidden" checked={phuongThuc === 'momo'} onChange={() => setPhuongThuc('momo')} />
              <div className="flex items-center justify-between">
                <span className="font-bold text-pink-600 text-sm">Thanh toán qua Ví MoMo</span>
                {phuongThuc === 'momo' && <CheckCircle2 className="text-pink-600" size={18} />}
              </div>
            </label>

            <label className={`block border-2 p-4 rounded-2xl cursor-pointer transition-all ${phuongThuc === 'vnpay' ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:border-blue-200'}`}>
              <input type="radio" name="pt" value="vnpay" className="hidden" checked={phuongThuc === 'vnpay'} onChange={() => setPhuongThuc('vnpay')} />
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-600 text-sm">Thanh toán qua VNPAY</span>
                {phuongThuc === 'vnpay' && <CheckCircle2 className="text-blue-600" size={18} />}
              </div>
            </label>
          </div>

          <button 
            onClick={xuLyThanhToan}
            disabled={dangXuLy}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl shadow-lg transition-all text-sm disabled:opacity-50"
          >
            {dangXuLy ? 'Đang xử lý giao dịch...' : `Thanh Toán ${tienCoc.toLocaleString()}đ`}
          </button>
        </div>
      </div>
    </div>
  );
}
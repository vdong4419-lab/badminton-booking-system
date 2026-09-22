import React, { useState, useEffect } from 'react';
import guiYeuCauApi from '../../api/gui-yeu-cau-api';
import { Star, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function DanhGiaSan() {
  const [danhSachSan, setDanhSachSan] = useState([]);
  const [sanChon, setSanChon] = useState('');
  const [soSao, setSoSao] = useState(5);
  const [noiDung, setNoiDung] = useState('');
  const [thongBao, setThongBao] = useState({ type: '', text: '' });

  // Gọi API lấy danh sách sân từ backend (khach-hang.js)
  useEffect(() => {
    guiYeuCauApi.get('/khach-hang/danh-sach-san')
      .then((res) => {
        setDanhSachSan(res.data);
      })
      .catch((err) => console.log('Lỗi lấy danh sách sân:', err));
  }, []);

  const xuLyGuiDanhGia = async (e) => {
    e.preventDefault();
    if (!sanChon) {
      setThongBao({ type: 'error', text: 'Vui lòng chọn sân bạn muốn đánh giá!' });
      return;
    }

    try {
      // Gọi API gửi đánh giá theo cấu trúc trong khach-hang.js
      await guiYeuCauApi.post('/khach-hang/danh-gia-san', {
        san_id: sanChon,
        so_sao: soSao,
        noi_dung: noiDung
      });
      setThongBao({ type: 'success', text: 'Cảm ơn bạn đã gửi đánh giá!' });
      setNoiDung('');
      setSoSao(5);
    } catch (err) {
      setThongBao({ type: 'error', text: 'Có lỗi xảy ra, vui lòng thử lại sau.' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Star className="text-yellow-500 fill-yellow-500" /> Đánh Giá Trải Nghiệm
          </h1>
          <p className="text-xs text-slate-500 mt-1">Giúp chúng tôi nâng cao chất lượng phục vụ</p>
        </div>
      </div>

      {thongBao.text && (
        <div className={`p-4 rounded-2xl flex items-center gap-2 text-sm font-bold ${thongBao.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
          <CheckCircle2 size={18} /> {thongBao.text}
        </div>
      )}

      <form onSubmit={xuLyGuiDanhGia} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">1. Chọn Sân Đã Trải Nghiệm</label>
          <select 
            value={sanChon}
            onChange={(e) => setSanChon(e.target.value)}
            className="w-full border border-slate-200 bg-slate-50 p-3.5 rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">-- Nhấn để chọn sân --</option>
            {danhSachSan.map(san => (
              <option key={san.id} value={san.id}>{san.ten_san} ({san.loai_san})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">2. Mức Độ Hài Lòng</label>
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setSoSao(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star size={36} className={`${soSao >= star ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 fill-slate-200'}`} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-1.5">
            <MessageSquare size={14} /> 3. Chia Sẻ Cảm Nhận
          </label>
          <textarea
            rows="4"
            value={noiDung}
            onChange={(e) => setNoiDung(e.target.value)}
            placeholder="Ánh sáng, mặt thảm, thái độ nhân viên..."
            className="w-full border border-slate-200 bg-slate-50 p-4 rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
          ></textarea>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-2xl shadow-md transition-all flex items-center gap-2 text-sm">
            <Send size={16} /> Gửi Đánh Giá
          </button>
        </div>
      </form>
    </div>
  );
}
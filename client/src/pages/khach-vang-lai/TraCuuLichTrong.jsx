import React, { useState } from 'react';
import guiYeuCauApi from '../../api/gui-yeu-cau-api';
import { Search, Calendar } from 'lucide-react';

export default function TraCuuLichTrong() {
  const [ngay, setNgay] = useState(new Date().toISOString().split('T')[0]);
  const [lich, setLich] = useState([]);

  const traCuu = () => {
    guiYeuCauApi.get(`/khach-hang/tra-cuu-lich-trong?san_id=1&ngay=${ngay}`)
      .then((res) => setLich(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2 text-emerald-700">
        <Search className="w-7 h-7" /> Tra Cứu Khung Giờ Đã Đặt
      </h1>

      <div className="flex gap-3 bg-white p-4 rounded-xl border shadow-sm">
        <input 
          type="date" 
          value={ngay} 
          onChange={(e) => setNgay(e.target.value)} 
          className="border p-2.5 rounded-lg flex-1"
        />
        <button onClick={traCuu} className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-bold">
          Tra Cứu
        </button>
      </div>

      <div className="bg-white p-5 rounded-xl border space-y-2">
        <h2 className="font-semibold text-gray-700">Khung giờ đã được chọn trong ngày:</h2>
        {lich.length > 0 ? (
          lich.map((item, idx) => (
            <div key={idx} className="p-3 bg-red-50 text-red-700 rounded-lg font-medium border border-red-200">
              Đã đăt: {item.gio_bat_dau} - {item.gio_ket_thuc}
            </div>
          ))
        ) : (
          <p className="text-emerald-600 font-medium">Tất cả khung giờ còn trống!</p>
        )}
      </div>
    </div>
  );
}
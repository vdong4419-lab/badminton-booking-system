import React, { useState, useEffect } from 'react';
import guiYeuCauApi from '../../api/gui-yeu-cau-api';
import { Tag, Plus } from 'lucide-react';

export default function QuanLyKhuyenMai() {
  const [danhSachKM, setDanhSachKM] = useState([]);
  const [maGiamGia, setMaGiamGia] = useState('');
  const [phanTramGiam, setPhanTramGiam] = useState(10);

  useEffect(() => {
    guiYeuCauApi.get('/khach-hang/bang-gia-va-khuyen-mai').then((res) => setDanhSachKM(res.data.khuyenMai));
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
        <Tag className="w-7 h-7 text-emerald-600" /> Quản Lý Khuyến Mãi & Voucher
      </h1>

      <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {danhSachKM.map((km) => (
            <div key={km.id} className="border border-dashed border-emerald-400 bg-emerald-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-extrabold text-emerald-800 text-lg">{km.ma_giam_gia}</p>
                <p className="text-sm text-emerald-600">Giảm: {km.phan_tram_giam}%</p>
              </div>
              <span className="bg-emerald-600 text-white text-xs px-2.5 py-1 rounded-lg font-bold">HOẠT ĐỘNG</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
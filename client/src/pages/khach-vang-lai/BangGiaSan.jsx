import React, { useState, useEffect } from 'react';
import guiYeuCauApi from '../../api/gui-yeu-cau-api';
import { DollarSign, Clock } from 'lucide-react';

export default function BangGiaSan() {
  const [bangGia, setBangGia] = useState([]);

  useEffect(() => {
    guiYeuCauApi.get('/khach-hang/bang-gia-va-khuyen-mai')
      .then((res) => setBangGia(res.data.bangGia || []))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2 text-emerald-700">
        <DollarSign className="w-7 h-7" /> Bảng Giá Sân Cầu Lông
      </h1>

      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-emerald-50 text-emerald-800">
              <th className="p-3">Loại Sân</th>
              <th className="p-3">Khung Giờ</th>
              <th className="p-3">Giá Tiền / Giờ</th>
            </tr>
          </thead>
          <tbody>
            {bangGia.length > 0 ? (
              bangGia.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-semibold">{item.loai_san || 'Trong nhà'}</td>
                  <td className="p-3 flex items-center gap-1 text-gray-600">
                    <Clock className="w-4 h-4 text-emerald-600" /> {item.khung_gio || 'Cả ngày'}
                  </td>
                  <td className="p-3 font-bold text-emerald-600">
                    {Number(item.gia_tien || 80000).toLocaleString()} đ
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">Chưa có dữ liệu bảng giá. Giá mặc định: 80.000đ/giờ.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
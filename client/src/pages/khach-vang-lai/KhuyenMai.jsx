import React from 'react';
import { Tag, Gift, Percent } from 'lucide-react';

export default function Promotions() {
  const promos = [
    { code: 'CHAOXUAN', discount: '20%', desc: 'Giảm 20% cho lượt đặt sân đầu tiên' },
    { code: 'GIOSHANG', discount: '15%', desc: 'Giảm 15% khung giờ vàng (12:00 - 16:00)' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <Gift className="w-7 h-7 text-emerald-600" /> Mã Ưu Đãi & Khuyến Mãi
      </h1>
      <div className="grid md:grid-cols-2 gap-4">
        {promos.map((p) => (
          <div key={p.code} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
            <div className="bg-emerald-100 text-emerald-700 p-3 rounded-xl font-bold text-lg flex items-center gap-1">
              <Percent className="w-5 h-5" /> {p.discount}
            </div>
            <div>
              <p className="font-bold text-gray-800">Mã: <span className="text-emerald-600">{p.code}</span></p>
              <p className="text-sm text-gray-600 mt-1">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

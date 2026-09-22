import React, { useState } from 'react';
import { Activity, ShieldCheck, Wrench, Power } from 'lucide-react';

export default function QuanLyTrangThaiSan() {
  const [danhSachSan, setDanhSachSan] = useState([
    { id: 1, tenSan: 'Sân 1 (Thảm Yonex)', loaiSan: 'Trong nhà', giaTheoGio: 90000, trangThai: 'hoat_dong' },
    { id: 2, tenSan: 'Sân 2 (Thảm Victor)', loaiSan: 'Trong nhà', giaTheoGio: 80000, trangThai: 'hoat_dong' },
    { id: 3, tenSan: 'Sân VIP 1', loaiSan: 'VIP', giaTheoGio: 120000, trangThai: 'bao_tri' },
  ]);

  const toggleTrangThai = (id) => {
    setDanhSachSan(danhSachSan.map(san => {
      if (san.id === id) {
        const trangThaiMoi = san.trangThai === 'hoat_dong' ? 'bao_tri' : 'hoat_dong';
        return { ...san, trangThai: trangThaiMoi };
      }
      return san;
    }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <Activity className="text-emerald-600" /> Quản Lý Trạng Thái Sân
        </h1>
        <p className="text-xs text-slate-500 mt-1">Cập nhật nhanh tình trạng vận hành thực tế tại quầy lễ tân</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {danhSachSan.map((san) => (
          <div key={san.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{san.loaiSan}</span>
                <h3 className="font-bold text-slate-800 text-base">{san.tenSan}</h3>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${san.trangThai === 'hoat_dong' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {san.trangThai === 'hoat_dong' ? 'Đang mở' : 'Bảo trì'}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl text-xs font-bold text-slate-600 flex justify-between">
              <span>Đơn giá niêm yết:</span>
              <span className="text-emerald-600">{san.giaTheoGio.toLocaleString()}đ / h</span>
            </div>

            <button
              onClick={() => toggleTrangThai(san.id)}
              className={`w-full py-2.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                san.trangThai === 'hoat_dong'
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <Power size={14} />
              {san.trangThai === 'hoat_dong' ? 'Chuyển Sang Bảo Trì' : 'Mở Lại Hoạt Động'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
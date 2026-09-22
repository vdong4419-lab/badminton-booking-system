import React, { useState } from 'react';
import { Settings, Plus, Edit2, Trash2, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function QuanLySan() {
  const [danhSachSan, setDanhSachSan] = useState([
    { id: 1, tenSan: 'Sân 01 - Thảm Yonex VIP', loaiSan: 'VIP', khuVuc: 'Khu A - Tầng 1', giaTheoGio: 120000, trangThai: 'hoat_dong' },
    { id: 2, tenSan: 'Sân 02 - Thảm Victor Standard', loaiSan: 'Tiêu chuẩn', khuVuc: 'Khu A - Tầng 1', giaTheoGio: 100000, trangThai: 'hoat_dong' },
    { id: 3, tenSan: 'Sân 03 - Thảm Lining', loaiSan: 'Tiêu chuẩn', khuVuc: 'Khu B - Tầng 2', giaTheoGio: 100000, trangThai: 'bao_tri' },
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Quản Lý Sân Cầu Lông</h1>
          <p className="text-xs text-slate-500 mt-1">Danh sách sân, thông tin thảm thi đấu và cấu hình hoạt động</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-md">
          <Plus size={16} /> Thêm Sân Mới
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {danhSachSan.map((san) => (
          <div key={san.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{san.khuVuc}</span>
                <h3 className="font-bold text-slate-800 text-base">{san.tenSan}</h3>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${san.trangThai === 'hoat_dong' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {san.trangThai === 'hoat_dong' ? 'Sẵn sàng' : 'Bảo trì'}
              </span>
            </div>

            <div className="space-y-1 bg-slate-50 p-3 rounded-2xl text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Loại sân:</span>
                <span className="font-bold text-slate-700">{san.loaiSan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Giá cơ bản:</span>
                <span className="font-bold text-emerald-600">{san.giaTheoGio.toLocaleString()}đ/h</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-all">
                <Edit2 size={16} />
              </button>
              <button className="p-2 hover:bg-red-50 rounded-xl text-red-500 transition-all">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
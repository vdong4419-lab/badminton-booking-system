import React, { useState, useEffect } from 'react';
import guiYeuCauApi from '../../api/gui-yeu-cau-api';
import { Plus, Edit, Trash2, LayoutGrid } from 'lucide-react';

export default function QuanLySan() {
  const [danhSachSan, setDanhSachSan] = useState([]);
  const [tenSan, setTenSan] = useState('');
  const [loaiSan, setLoaiSan] = useState('Trong nhà');
  const [giaTheoGio, setGiaTheoGio] = useState(80000);

  const taiDanhSachSan = async () => {
    const res = await guiYeuCauApi.get('/khach-hang/danh-sach-san');
    setDanhSachSan(res.data);
  };

  useEffect(() => {
    taiDanhSachSan();
  }, []);

  const xuLyThemSan = async (e) => {
    e.preventDefault();
    try {
      await guiYeuCauApi.post('/admin/them-san', {
        ten_san: tenSan,
        loai_san: loaiSan,
        gia_theo_gio: giaTheoGio
      });
      alert('Thêm sân thành công!');
      setTenSan('');
      taiDanhSachSan();
    } catch (err) {
      alert('Lỗi thêm sân!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
        <LayoutGrid className="w-7 h-7 text-emerald-600" /> Quản Lý Danh Sách Sân
      </h1>

      {/* Form Thêm Sân */}
      <form onSubmit={xuLyThemSan} className="bg-white p-5 rounded-2xl border shadow-sm flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">Tên sân</label>
          <input
            type="text"
            placeholder="Ví dụ: Sân số 1"
            value={tenSan}
            onChange={(e) => setTenSan(e.target.value)}
            required
            className="w-full border p-2.5 rounded-xl"
          />
        </div>
        <div className="w-48">
          <label className="block text-sm font-semibold mb-1">Loại sân</label>
          <select value={loaiSan} onChange={(e) => setLoaiSan(e.target.value)} className="w-full border p-2.5 rounded-xl">
            <option value="Trong nhà">Trong nhà</option>
            <option value="Ngoài trời">Ngoài trời</option>
            <option value="VIP">Sân VIP</option>
          </select>
        </div>
        <div className="w-48">
          <label className="block text-sm font-semibold mb-1">Giá/Giờ (đ)</label>
          <input
            type="number"
            value={giaTheoGio}
            onChange={(e) => setGiaTheoGio(e.target.value)}
            className="w-full border p-2.5 rounded-xl"
          />
        </div>
        <button type="submit" className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-1 hover:bg-emerald-700">
          <Plus className="w-5 h-5" /> Thêm Sân
        </button>
      </form>

      {/* Bảng Danh Sách Sân */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b text-gray-700">
            <tr>
              <th className="p-4">Mã Sân</th>
              <th className="p-4">Tên Sân</th>
              <th className="p-4">Loại Sân</th>
              <th className="p-4">Giá/Giờ</th>
              <th className="p-4">Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {danhSachSan.map((san) => (
              <tr key={san.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold">#{san.id}</td>
                <td className="p-4 font-semibold">{san.ten_san}</td>
                <td className="p-4">{san.loai_san}</td>
                <td className="p-4 font-bold text-emerald-600">{Number(san.gia_theo_gio || 80000).toLocaleString()} đ</td>
                <td className="p-4">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
                    {san.trang_thai}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import guiYeuCauApi from '../../api/gui-yeu-cau-api';
import { History, Calendar, Clock, DollarSign, AlertCircle } from 'lucide-react';

export default function LichSuDatSan() {
  const [danhSachLichSu, setDanhSachLichSu] = useState([]);

  useEffect(() => {
    guiYeuCauApi.get('/khach-hang/lich-su-dat-san')
      .then((res) => setDanhSachLichSu(res.data || []))
      .catch((err) => console.log(err));
  }, []);

  const xuLyHuyDon = async (id) => {
    const lyDo = prompt('Nhập lý do hủy đơn:');
    if (!lyDo) return;

    try {
      await guiYeuCauApi.post('/khach-hang/yeu-cau-huy-don', { don_dat_id: id, ly_do_huy: lyDo });
      alert('Đã gửi yêu cầu hủy đơn!');
      window.location.reload();
    } catch (err) {
      alert('Lỗi hủy đơn!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <History className="text-emerald-600" /> Lịch Sử Đặt Sân
        </h1>
        <p className="text-sm text-slate-500">Quản lý và theo dõi trạng thái các đơn đặt sân của bạn.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold border-b">
              <th className="p-4">Mã Đơn</th>
              <th className="p-4">Sân</th>
              <th className="p-4">Ngày Đặt</th>
              <th className="p-4">Khung Giờ</th>
              <th className="p-4">Tổng Tiền</th>
              <th className="p-4">Trạng Thái</th>
              <th className="p-4 text-center">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {danhSachLichSu.length > 0 ? (
              danhSachLichSu.map((don) => (
                <tr key={don.id} className="hover:bg-slate-50/80 transition-all">
                  <td className="p-4 font-bold text-slate-700">#{don.id}</td>
                  <td className="p-4 font-medium">{don.ten_san || 'Sân số 1'}</td>
                  <td className="p-4 text-slate-600">{don.ngay_dat}</td>
                  <td className="p-4 text-slate-600">{don.gio_bat_dau} - {don.gio_ket_thuc}</td>
                  <td className="p-4 font-extrabold text-emerald-600">{Number(don.tong_tien).toLocaleString()} đ</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full">
                      {don.trang_thai}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {don.trang_thai === 'da_dat_coc' && (
                      <button
                        onClick={() => xuLyHuyDon(don.id)}
                        className="text-xs text-red-600 hover:text-red-800 font-bold border border-red-200 px-3 py-1 rounded-lg hover:bg-red-50"
                      >
                        Hủy Đơn
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-6 text-center text-slate-400">Bạn chưa có đơn đặt sân nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
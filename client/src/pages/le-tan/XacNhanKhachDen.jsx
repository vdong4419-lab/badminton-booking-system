import React, { useState } from 'react';
import guiYeuCauApi from '../../api/gui-yeu-cau-api';
import { UserCheck, Search, CheckCircle } from 'lucide-react';

export default function XacNhanKhachDen() {
  const [maDon, setMaDon] = useState('');
  const [thongTinDon, setThongTinDon] = useState(null);
  const [thongBao, setThongBao] = useState('');

  const timKiemDon = async () => {
    try {
      const res = await guiYeuCauApi.get(`/le-tan/danh-sach-lich-dat`);
      const donFound = res.data.find((d) => d.id === parseInt(maDon));
      if (donFound) {
        setThongTinDon(donFound);
        setThongBao('');
      } else {
        setThongTinDon(null);
        setThongBao('Không tìm thấy mã đơn đặt sân!');
      }
    } catch (err) {
      setThongBao('Lỗi tìm kiếm đơn!');
    }
  };

  const xuLyCheckIn = async () => {
    try {
      const res = await guiYeuCauApi.post('/le-tan/xac-nhan-khach-den', { don_id: thongTinDon.id });
      alert(res.data.message);
      setThongTinDon(null);
      setMaDon('');
    } catch (err) {
      alert('Lỗi xác nhận check-in!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2 text-emerald-700">
        <UserCheck className="w-7 h-7" /> Lễ Tân - Xác Nhận Khách Đến Sân
      </h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nhập Mã Đơn Đặt (Ví dụ: 101)"
          value={maDon}
          onChange={(e) => setMaDon(e.target.value)}
          className="flex-1 border p-3 rounded-xl focus:outline-emerald-600"
        />
        <button
          onClick={timKiemDon}
          className="bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-1 hover:bg-emerald-700"
        >
          <Search className="w-5 h-5" /> Tra Cứu
        </button>
      </div>

      {thongBao && <p className="text-red-500 font-medium">{thongBao}</p>}

      {thongTinDon && (
        <div className="border border-emerald-200 bg-emerald-50 p-5 rounded-xl space-y-3">
          <p className="font-bold text-lg text-emerald-900">Mã đơn: #{thongTinDon.id}</p>
          <p><strong>Khách hàng:</strong> {thongTinDon.ho_ten} ({thongTinDon.so_dien_thoai})</p>
          <p><strong>Sân:</strong> {thongTinDon.ten_san}</p>
          <p><strong>Khung giờ:</strong> {thongTinDon.gio_bat_dau} - {thongTinDon.gio_ket_thuc} ({thongTinDon.ngay_dat})</p>
          <p><strong>Trạng thái:</strong> <span className="uppercase font-semibold text-emerald-700">{thongTinDon.trang_thai}</span></p>

          <button
            onClick={xuLyCheckIn}
            className="w-full mt-3 bg-emerald-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700"
          >
            <CheckCircle className="w-5 h-5" /> Xác Nhận Check-In Sử Dụng Sân
          </button>
        </div>
      )}
    </div>
  );
}
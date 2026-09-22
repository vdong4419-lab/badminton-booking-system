import React, { useState, useEffect } from 'react';
import guiYeuCauApi from '../../api/gui-yeu-cau-api';
import { Calendar, Clock, CreditCard, ShieldCheck } from 'lucide-react';

const KHUNG_GIO = ['05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

export default function DatLichSan() {
  const [danhSachSan, setDanhSachSan] = useState([]);
  const [sanChon, setSanChon] = useState(null);
  const [ngayDat, setNgayDat] = useState(new Date().toISOString().split('T')[0]);
  const [gioDaDat, setGioDaDat] = useState([]);
  const [khungGioChon, setKhungGioChon] = useState([]);
  const [phuongThucTT, setPhuongThucTT] = useState('momo');
  const [thongBao, setThongBao] = useState('');

  useEffect(() => {
    guiYeuCauApi.get('/khach-hang/danh-sach-san').then((res) => {
      setDanhSachSan(res.data);
      if (res.data.length > 0) setSanChon(res.data[0]);
    });
  }, []);

  useEffect(() => {
    if (sanChon && ngayDat) {
      guiYeuCauApi.get(`/khach-hang/tra-cuu-lich-trong?san_id=${sanChon.id}&ngay=${ngayDat}`)
        .then((res) => setGioDaDat(res.data));
      setKhungGioChon([]);
    }
  }, [sanChon, ngayDat]);

  const chonKhungGio = (gio) => {
    if (khungGioChon.includes(gio)) {
      setKhungGioChon(khungGioChon.filter((g) => g !== gio));
    } else {
      setKhungGioChon([...khungGioChon, gio].sort());
    }
  };

  const tongTien = khungGioChon.length * (sanChon?.gia_theo_gio || 80000);
  const tienCoc = tongTien * 0.3; // Đặt cọc 30%

  const xuLyDatSan = async () => {
    if (khungGioChon.length === 0) return alert('Vui lòng chọn khung giờ!');
    
    const gioBatDau = khungGioChon[0];
    const gioCuoi = parseInt(khungGioChon[khungGioChon.length - 1].split(':')[0]);
    const gioKetThuc = `${(gioCuoi + 1).toString().padStart(2, '0')}:00`;

    try {
      const res = await guiYeuCauApi.post('/khach-hang/tao-don-dat-san', {
        san_id: sanChon.id,
        ngay_dat: ngayDat,
        gio_bat_dau: gioBatDau,
        gio_ket_thuc: gioKetThuc,
        tong_tien: tongTien,
        tien_coc: tienCoc,
        phuong_thuc_tt: phuongThucTT
      });
      setThongBao(res.data.message);
    } catch (err) {
      setThongBao(err.response?.data?.message || 'Lỗi đặt sân');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Calendar className="text-emerald-600" /> Đặt Lịch Sân Cầu Lông
      </h1>

      {thongBao && <div className="p-4 bg-emerald-100 text-emerald-800 rounded-xl font-medium">{thongBao}</div>}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Chọn Ngày & Sân */}
        <div className="space-y-4 bg-white p-5 rounded-2xl shadow-sm border">
          <div>
            <label className="font-semibold block mb-2">1. Chọn Ngày Đặt</label>
            <input 
              type="date" 
              value={ngayDat} 
              onChange={(e) => setNgayDat(e.target.value)} 
              className="w-full border p-2.5 rounded-xl" 
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">2. Chọn Sân</label>
            <div className="space-y-2">
              {danhSachSan.map((san) => (
                <button
                  key={san.id}
                  onClick={() => setSanChon(san)}
                  className={`w-full p-3 rounded-xl border text-left flex justify-between ${
                    sanChon?.id === san.id ? 'border-emerald-600 bg-emerald-50 text-emerald-700 font-bold' : ''
                  }`}
                >
                  <span>{san.ten_san}</span>
                  <span>{Number(san.gia_theo_gio || 80000).toLocaleString()}đ/h</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Khung Giờ & Thanh Toán Cọc */}
        <div className="md:col-span-2 bg-white p-5 rounded-2xl shadow-sm border space-y-6">
          <div>
            <label className="font-semibold block mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" /> 3. Chọn Khung Giờ Trống
            </label>
            <div className="grid grid-cols-4 gap-2">
              {KHUNG_GIO.map((gio) => {
                const daDat = gioDaDat.some((g) => gio >= g.gio_bat_dau.substring(0, 5) && gio < g.gio_ket_thuc.substring(0, 5));
                const dangChon = khungGioChon.includes(gio);
                return (
                  <button
                    key={gio}
                    disabled={daDat}
                    onClick={() => chonKhungGio(gio)}
                    className={`py-2.5 rounded-xl font-semibold border ${
                      daDat ? 'bg-gray-100 text-gray-400 line-through' : dangChon ? 'bg-emerald-600 text-white' : 'hover:border-emerald-500'
                    }`}
                  >
                    {gio}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chọn Phương Thức Cọc */}
          <div className="pt-4 border-t space-y-3">
            <label className="font-semibold block flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-600" /> 4. Phương Thức Thanh Toán Cọc (30%)
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 border p-3 rounded-xl cursor-pointer">
                <input type="radio" name="tt" value="momo" checked={phuongThucTT === 'momo'} onChange={() => setPhuongThucTT('momo')} />Ví MoMo
              </label>
              <label className="flex items-center gap-2 border p-3 rounded-xl cursor-pointer">
                <input type="radio" name="tt" value="vnpay" checked={phuongThucTT === 'vnpay'} onChange={() => setPhuongThucTT('vnpay')} />VNPAY
              </label>
            </div>
          </div>

          {/* Chi Tiết Tiền & Nút Xác Nhận */}
          <div className="pt-4 border-t flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Tổng tiền: <span className="font-bold text-gray-800">{tongTien.toLocaleString()} đ</span></p>
              <p className="text-xl font-extrabold text-emerald-600">
                Tiền cọc cần trả: {tienCoc.toLocaleString()} đ
              </p>
            </div>
            <button
              onClick={xuLyDatSan}
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700"
            >
              Thanh Toán Cọc & Đặt Sân
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
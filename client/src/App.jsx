import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import GiaoDienKhung from './components/GiaoDienKhung';

// Chỉ giữ lại các trang ĐÃ CÓ CODE
import TrangChu from './pages/khach-vang-lai/TrangChu';
import TraCuuLichTrong from './pages/khach-vang-lai/TraCuuLichTrong';
import BangGiaSan from './pages/khach-vang-lai/BangGiaSan';
import DatLichSan from './pages/khach-hang/DatLichSan';
import XacNhanKhachDen from './pages/le-tan/XacNhanKhachDen';
import ThongKeBaoCao from './pages/admin/ThongKeBaoCao';
import QuanLySan from './pages/admin/QuanLySan';

/* Tạm thời comment các trang chưa viết code để tránh sập Vite:
import KhuyenMai from './pages/khach-vang-lai/KhuyenMai';
import DangKyTaikhoan from './pages/khach-vang-lai/DangKyTaikhoan';
import LichSuDatSan from './pages/khach-hang/LichSuDatSan';
import ThanhToanCoc from './pages/khach-hang/ThanhToanCoc';
import ThongTinCaNhan from './pages/khach-hang/ThongTinCaNhan';
import DanhGiaSan from './pages/khach-hang/DanhGiaSan';
import QuanLyTrangThaiSan from './pages/le-tan/QuanLyTrangThaiSan';
import QuanLyGiaSan from './pages/admin/QuanLyGiaSan';
import QuanLyKhuyenMai from './pages/admin/QuanLyKhuyenMai';
import QuanLyNhanVien from './pages/admin/QuanLyNhanVien';
import QuanLyKhachHang from './pages/admin/QuanLyKhachHang';
*/

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GiaoDienKhung />}>
          <Route index element={<TrangChu />} />
          <Route path="tra-cuu" element={<TraCuuLichTrong />} />
          <Route path="bang-gia" element={<BangGiaSan />} />
          <Route path="dat-san" element={<DatLichSan />} />
          <Route path="le-tan/xac-nhan" element={<XacNhanKhachDen />} />
          <Route path="admin/thong-ke" element={<ThongKeBaoCao />} />
          <Route path="admin/quan-ly-san" element={<QuanLySan />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
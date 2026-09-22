import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import GiaoDienKhung from './components/GiaoDienKhung';
import BaoVeRoute from './components/BaoVeRoute';

// Trang công khai / vãng lai
import TrangChu from './pages/khach-vang-lai/TrangChu';
import TraCuuLichTrong from './pages/khach-vang-lai/TraCuuLichTrong';
import BangGiaSan from './pages/khach-vang-lai/BangGiaSan';
import KhuyenMai from './pages/khach-vang-lai/KhuyenMai';
import DangKyTaikhoan from './pages/khach-vang-lai/DangKyTaikhoan';

// Trang đăng nhập (tạo thêm hoặc dùng modal)
import DangNhap from './pages/khach-vang-lai/DangNhap'; 

// Trang Khách Hàng
import DatLichSan from './pages/khach-hang/DatLichSan';
import LichSuDatSan from './pages/khach-hang/LichSuDatSan';
import ThongTinCaNhan from './pages/khach-hang/ThongTinCaNhan';

// Trang Lễ Tân
import XacNhanKhachDen from './pages/le-tan/XacNhanKhachDen';

// Trang Admin
import ThongKeBaoCao from './pages/admin/ThongKeBaoCao';
import QuanLySan from './pages/admin/QuanLySan';
import QuanLyNhanVien from './pages/admin/QuanLyNhanVien';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GiaoDienKhung />}>
          
          {/* 1. KHU VỰC CÔNG KHAI (Ai cũng xem được) */}
          <Route index element={<TrangChu />} />
          <Route path="tra-cuu" element={<TraCuuLichTrong />} />
          <Route path="bang-gia" element={<BangGiaSan />} />
          <Route path="khuyen-mai" element={<KhuyenMai />} />
          <Route path="dang-ky" element={<DangKyTaikhoan />} />
          <Route path="dang-nhap" element={<DangNhap />} />

          {/* 2. CHỨC NĂNG DÀNH CHO KHÁCH HÀNG (Cần đăng nhập) */}
          <Route element={<BaoVeRoute vaiTroPhep={['khach_hang', 'le_tan', 'admin']} />}>
            <Route path="dat-san" element={<DatLichSan />} />
            <Route path="lich-su-dat" element={<LichSuDatSan />} />
            <Route path="thong-tin-ca-nhan" element={<ThongTinCaNhan />} />
          </Route>

          {/* 3. CHỨC NĂNG DÀNH CHO LỄ TÂN & ADMIN */}
          <Route element={<BaoVeRoute vaiTroPhep={['le_tan', 'admin']} />}>
            <Route path="le-tan/xac-nhan" element={<XacNhanKhachDen />} />
          </Route>

          {/* 4. CHỨC NĂNG CHỈ DÀNH CHO ADMIN (Role 1) */}
          <Route element={<BaoVeRoute vaiTroPhep={['admin']} />}>
            <Route path="admin/thong-ke" element={<ThongKeBaoCao />} />
            <Route path="admin/quan-ly-san" element={<QuanLySan />} />
            <Route path="admin/quan-ly-nhan-vien" element={<QuanLyNhanVien />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
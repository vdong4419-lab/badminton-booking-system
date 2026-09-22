import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function BaoVeRoute({ vaiTroPhep }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('nguoi_dung') || '{}');

  // 1. Chưa đăng nhập -> Chuyển về trang Đăng Nhập
  if (!token || !user.vai_tro) {
    return <Navigate to="/dang-nhap" replace />;
  }

  // 2. Đã đăng nhập nhưng không đủ quyền -> Chuyển về Trang Chủ
  if (vaiTroPhep && !vaiTroPhep.includes(user.vai_tro)) {
    alert('Bạn không có quyền truy cập vào chức năng này!');
    return <Navigate to="/" replace />;
  }

  // 3. Đúng quyền -> Cho phép truy cập
  return <Outlet />;
}
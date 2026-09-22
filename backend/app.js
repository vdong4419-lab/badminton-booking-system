const express = require('express');
const app = express();

const xacThucDangNhap = require('./middleware/xac-thuc-dang-nhap');
const phanQuyen = require('./middleware/phan-quyen');

// Import các routes
const khachVangLaiRoute = require('./routes/khach-vang-lai');
const khachHangRoute = require('./routes/khach-hang');
const leTanRoute = require('./routes/le-tan');
const quanTriAdminRoute = require('./routes/quan-tri-admin');

app.use(express.json());

// 1. Khách vãng lai: KHÔNG CẦN ĐĂNG NHẬP (Xem lịch trống, bảng giá, đăng nhập, đăng ký)
app.use('/api/khach-vang-lai', khachVangLaiRoute);

// 2. Khách hàng: CẦN ĐĂNG NHẬP + Đúng quyền 'khach_hang' (hoặc le_tan, admin)
app.use('/api/khach-hang', xacThucDangNhap, phanQuyen(['khach_hang', 'le_tan', 'admin']), khachHangRoute);

// 3. Lễ tân: CẦN ĐĂNG NHẬP + Đúng quyền 'le_tan' hoặc 'admin'
app.use('/api/le-tan', xacThucDangNhap, phanQuyen(['le_tan', 'admin']), leTanRoute);

// 4. Admin: CẦN ĐĂNG NHẬP + CHỈ QUYỀN 'admin'
app.use('/api/admin', xacThucDangNhap, phanQuyen(['admin']), quanTriAdminRoute);

module.exports = app;
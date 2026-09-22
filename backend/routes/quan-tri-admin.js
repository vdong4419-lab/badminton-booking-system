const express = require('express');
const router = express.Router();
const db = require('../config/ket-noi-csdl');
const xacThucToken = require('../middleware/xac-thuc-dang-nhap');
const phanQuyen = require('../middleware/phan-quyen');

router.use(xacThucToken, phanQuyen(['admin']));

// UC17: Quản lý nhân viên (Lấy danh sách & Tạo mới)
router.get('/danh-sach-nhan-vien', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, ho_ten, email, so_dien_thoai, trang_thai FROM nguoi_dung WHERE vai_tro = 'le_tan'");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lấy danh sách nhân viên' });
  }
});

// UC21: Quản lý bảng giá sân
router.post('/cap-nhat-bang-gia', async (req, res) => {
  const { loai_san, khung_gio, gia_tien } = req.body;
  try {
    await db.query(
      `INSERT INTO bang_gia_san (loai_san, khung_gio, gia_tien) 
       VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE gia_tien = VALUES(gia_tien)`,
      [loai_san, khung_gio, gia_tien]
    );
    res.json({ message: 'Cập nhật bảng giá thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi cập nhật giá' });
  }
});

// UC25: Báo cáo Thống kê Doanh thu & Lượt đặt
router.get('/thong-ke-doanh-thu', async (req, res) => {
  try {
    const [doanhThu] = await db.query(`
      SELECT 
        DATE_FORMAT(ngay_dat, '%Y-%m') AS thang, 
        SUM(tong_tien) AS tong_doanh_thu,
        COUNT(id) AS tong_don_dat
      FROM don_dat_san 
      WHERE trang_thai IN ('da_dat_coc', 'da_thanh_toan', 'hoan_thanh')
      GROUP BY thang ORDER BY thang DESC
    `);
    res.json(doanhThu);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lấy báo cáo thống kê' });
  }
});

module.exports = router;
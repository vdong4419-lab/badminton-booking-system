const express = require('express');
const router = express.Router();
const db = require('../config/ket-noi-csdl');
const xacThucToken = require('../middleware/xac-thuc-dang-nhap');
const phanQuyen = require('../middleware/phan-quyen');

// Áp dụng Middleware xác thực & phân quyền Lễ tân
router.use(xacThucToken, phanQuyen(['le_tan', 'admin']));

// UC12: Quản lý danh sách lịch đặt sân & Duyệt/Hủy
router.get('/danh-sach-lich-dat', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT d.*, s.ten_san, u.ho_ten, u.so_dien_thoai 
      FROM don_dat_san d
      JOIN san s ON d.san_id = s.id
      JOIN nguoi_dung u ON d.nguoi_dung_id = u.id
      ORDER BY d.ngay_dat DESC, d.gio_bat_dau ASC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi tải danh sách lịch đặt' });
  }
});

// UC12: Xử lý duyệt hoặc từ chối lịch đặt
router.put('/cap-nhat-trang-thai-don/:id', async (req, res) => {
  const { trang_thai } = req.body; // 'da_xac_nhan', 'da_huy'
  try {
    await db.query('UPDATE don_dat_san SET trang_thai = ? WHERE id = ?', [trang_thai, req.params.id]);
    res.json({ message: 'Cập nhật trạng thái đơn thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi cập nhật trạng thái đơn' });
  }
});

// UC16: Xác nhận khách đến sân (Check-in)
router.post('/xac-nhan-khach-den', async (req, res) => {
  const { don_id } = req.body;
  try {
    await db.query("UPDATE don_dat_san SET trang_thai = 'dang_su_dung' WHERE id = ?", [don_id]);
    res.json({ message: 'Khách đã check-in thành công! Bắt đầu tính giờ sử dụng.' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi xác nhận khách đến' });
  }
});

// UC13 & UC14: Cập nhật trạng thái khóa/mở sân & khung giờ
router.put('/doi-trang-thai-san/:id', async (req, res) => {
  const { trang_thai } = req.body; // 'hoat_dong', 'bao_tri'
  try {
    await db.query('UPDATE san SET trang_thai = ? WHERE id = ?', [trang_thai, req.params.id]);
    res.json({ message: 'Đã thay đổi trạng thái sân!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi cập nhật trạng thái sân' });
  }
});

module.exports = router;
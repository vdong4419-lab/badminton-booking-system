const express = require('express');
const router = express.Router();
const db = require('../config/ket-noi-csdl');
const xacThucToken = require('../middleware/xac-thuc-dang-nhap');

// UC12: Quản lý lịch đặt sân (Xem danh sách & Tiếp nhận/Duyệt/Từ chối)
router.get('/danh-sach-don', xacThucToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT d.*, s.ten_san, n.ho_ten, n.so_dien_thoai 
       FROM don_dat_san d
       JOIN san s ON d.san_id = s.id
       JOIN nguoi_dung n ON d.nguoi_dung_id = n.id
       ORDER BY d.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lấy danh sách lịch đặt', error: err.message });
  }
});

router.put('/cap-nhat-trang-thai-don/:id', xacThucToken, async (req, res) => {
  const { trang_thai, ly_do_huy } = req.body; // trang_thai: 'hoan_thanh', 'da_huy', 'yeu_cau_doi', v.v.
  try {
    await db.query(
      'UPDATE don_dat_san SET trang_thai = ?, ly_do_huy = ? WHERE id = ?',
      [trang_thai, ly_do_huy || null, req.params.id]
    );
    res.json({ message: 'Cập nhật trạng thái đơn đặt sân thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi cập nhật đơn đặt sân', error: err.message });
  }
});

// UC13: Quản lý sân (Cập nhật trạng thái sân: hoat_dong / bao_tri)
router.put('/cap-nhat-san/:id', xacThucToken, async (req, res) => {
  const { trang_thai } = req.body;
  try {
    await db.query('UPDATE san SET trang_thai = ? WHERE id = ?', [trang_thai, req.params.id]);
    res.json({ message: 'Cập nhật trạng thái sân thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi cập nhật sân', error: err.message });
  }
});

// UC14: Quản lý khung giờ đặt sân (Xem/Thêm/Cập nhật khung giờ trong bang_gia_san)
router.get('/danh-sach-khung-gio', xacThucToken, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM bang_gia_san');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lấy danh sách khung giờ', error: err.message });
  }
});

// UC15: Quản lý khách hàng (Tra cứu thông tin khách hàng & lịch sử)
router.get('/tra-cuu-khach-hang', xacThucToken, async (req, res) => {
  const { tim_kiem } = req.query; // Tên hoặc SĐT
  try {
    const [rows] = await db.query(
      `SELECT id, ho_ten, email, so_dien_thoai, trang_thai, created_at 
       FROM nguoi_dung 
       WHERE vai_tro = 'khach_hang' AND (ho_ten LIKE ? OR so_dien_thoai LIKE ?)`,
      [`%${tim_kiem || ''}%`, `%${tim_kiem || ''}%`]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi tra cứu khách hàng', error: err.message });
  }
});

// UC16: Xác nhận khách đến nhận sân (Check-in)
router.post('/xac-nhan-checkin/:id', xacThucToken, async (req, res) => {
  try {
    await db.query(
      `UPDATE don_dat_san SET trang_thai = 'dang_su_dung' WHERE id = ?`,
      [req.params.id]
    );
    res.json({ message: 'Xác nhận khách nhận sân thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi xác nhận check-in', error: err.message });
  }
});

module.exports = router;
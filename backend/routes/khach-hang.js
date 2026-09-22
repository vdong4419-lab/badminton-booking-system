const express = require('express');
const router = express.Router();
const db = require('../config/ket-noi-csdl');
const xacThucToken = require('../middleware/xac-thuc-dang-nhap');

// UC01: Xem danh sách & Tìm kiếm / Lọc sân
router.get('/danh-sach-san', async (req, res) => {
  const { loai_san, tim_kiem } = req.query;
  let sql = 'SELECT * FROM san WHERE trang_thai = "hoat_dong"';
  const params = [];

  if (loai_san) {
    sql += ' AND loai_san = ?';
    params.push(loai_san);
  }
  if (tim_kiem) {
    sql += ' AND ten_san LIKE ?';
    params.push(`%${tim_kiem}%`);
  }

  try {
    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lấy danh sách sân', error: err.message });
  }
});

// UC02: Tra cứu lịch sân trống theo ngày
router.get('/tra-cuu-lich-trong', async (req, res) => {
  const { san_id, ngay } = req.query;
  if (!san_id || !ngay) {
    return res.status(400).json({ message: 'Thừa/thiếu tham số san_id hoặc ngay' });
  }

  try {
    const [rows] = await db.query(
      `SELECT gio_bat_dau, gio_ket_thuc FROM don_dat_san 
       WHERE san_id = ? AND ngay_dat = ? AND trang_thai != "da_huy"`,
      [san_id, ngay]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi tra cứu lịch sân' });
  }
});

// UC03 & UC04: Bang giá & Danh sách khuyến mãi
router.get('/bang-gia-va-khuyen-mai', async (req, res) => {
  try {
    const [bangGia] = await db.query('SELECT * FROM bang_gia_san');
    const [khuyenMai] = await db.query('SELECT * FROM khuyen_mai WHERE trang_thai = "kich_hoat"');
    res.json({ bangGia, khuyenMai });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lấy thông tin giá & ưu đãi' });
  }
});

// UC07 & UC08: Đặt lịch sân & Thanh toán cọc
router.post('/tao-don-dat-san', xacThucToken, async (req, res) => {
  const { san_id, ngay_dat, gio_bat_dau, gio_ket_thuc, tong_tien, tien_coc, phuong_thuc_tt, ma_khuyen_mai } = req.body;
  const nguoi_dung_id = req.user.id;

  try {
    // Kiểm tra trùng lịch
    const [trungLich] = await db.query(
      `SELECT id FROM don_dat_san 
       WHERE san_id = ? AND ngay_dat = ? AND trang_thai != 'da_huy'
       AND ((gio_bat_dau < ? AND gio_ket_thuc > ?))`,
      [san_id, ngay_dat, gio_ket_thuc, gio_bat_dau]
    );

    if (trungLich.length > 0) {
      return res.status(400).json({ message: 'Khung giờ này đã có người đặt!' });
    }

    // Tạo đơn mới với trạng thái cọc
    const [result] = await db.query(
      `INSERT INTO don_dat_san 
       (nguoi_dung_id, san_id, ngay_dat, gio_bat_dau, gio_ket_thuc, tong_tien, tien_coc, phuong_thuc_tt, ma_khuyen_mai, trang_thai) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'da_dat_coc')`,
      [nguoi_dung_id, san_id, ngay_dat, gio_bat_dau, gio_ket_thuc, tong_tien, tien_coc, phuong_thuc_tt, ma_khuyen_mai || null]
    );

    res.status(201).json({
      message: 'Đặt sân và thanh toán cọc thành công!',
      don_hang_id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi đặt sân', error: err.message });
  }
});

// UC09: Tra cứu danh sách đơn đặt của cá nhân
router.get('/danh-sach-don-dat', xacThucToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT d.*, s.ten_san FROM don_dat_san d 
       JOIN san s ON d.san_id = s.id 
       WHERE d.nguoi_dung_id = ? 
       ORDER BY d.created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lấy lịch sử đơn đặt' });
  }
});

// UC10: Yêu cầu Hủy hoặc Đổi lịch
router.put('/yeu-cau-doi-huy-lich/:id', xacThucToken, async (req, res) => {
  const { loai_yeu_cau, ngay_moi, gio_bat_dau_moi, gio_ket_thuc_moi, ly_do } = req.body;
  const don_id = req.params.id;

  try {
    if (loai_yeu_cau === 'huy') {
      await db.query(
        `UPDATE don_dat_san SET trang_thai = 'yeu_cau_huy', ly_do_huy = ? WHERE id = ? AND nguoi_dung_id = ?`,
        [ly_do, don_id, req.user.id]
      );
      return res.json({ message: 'Đã gửi yêu cầu hủy lịch sân thành công!' });
    }

    if (loai_yeu_cau === 'doi') {
      await db.query(
        `UPDATE don_dat_san SET trang_thai = 'yeu_cau_doi', ngay_dat = ?, gio_bat_dau = ?, gio_ket_thuc = ? WHERE id = ? AND nguoi_dung_id = ?`,
        [ngay_moi, gio_bat_dau_moi, gio_ket_thuc_moi, don_id, req.user.id]
      );
      return res.json({ message: 'Đã gửi yêu cầu đổi lịch sân thành công!' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Lỗi gửi yêu cầu đổi/hủy lịch' });
  }
});

// UC11: Viết đánh giá sân
router.post('/danh-gia-san', xacThucToken, async (req, res) => {
  const { san_id, so_sao, noi_dung } = req.body;
  try {
    await db.query(
      `INSERT INTO danh_gia_san (nguoi_dung_id, san_id, so_sao, noi_dung) VALUES (?, ?, ?, ?)`,
      [req.user.id, san_id, so_sao, noi_dung]
    );
    res.status(201).json({ message: 'Gửi đánh giá thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi gửi đánh giá' });
  }
});

module.exports = router;
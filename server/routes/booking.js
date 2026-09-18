const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

// 1. API Lấy danh sách sân kèm trạng thái/loại sân
router.get('/courts', async (req, res) => {
  try {
    const [courts] = await db.query('SELECT * FROM courts WHERE status = "active"');
    res.json(courts);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ khi lấy danh sách sân', error: error.message });
  }
});

// 2. API Kiểm tra khung giờ đã được đặt trong ngày của một sân
router.get('/availability', async (req, res) => {
  const { court_id, date } = req.query;

  if (!court_id || !date) {
    return res.status(400).json({ message: 'Vui lòng cung cấp court_id và date (YYYY-MM-DD)' });
  }

  try {
    // Lấy danh sách các slot đã được đặt (trừ những đơn đã hủy)
    const [bookedSlots] = await db.query(
      `SELECT start_time, end_time FROM bookings 
       WHERE court_id = ? AND booking_date = ? AND status != 'cancelled'`,
      [court_id, date]
    );

    res.json(bookedSlots);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi kiểm tra lịch sân', error: error.message });
  }
});

// 3. API Tạo đơn đặt sân mới
router.post('/create', authMiddleware, async (req, res) => {
  const { court_id, booking_date, start_time, end_time, total_price, promo_code } = req.body;
  const user_id = req.user.id;

  if (!court_id || !booking_date || !start_time || !end_time || !total_price) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin đặt sân' });
  }

  try {
    // Kiểm tra trùng lịch đặt
    const [existing] = await db.query(
      `SELECT id FROM bookings 
       WHERE court_id = ? AND booking_date = ? AND status != 'cancelled'
       AND ((start_time < ? AND end_time > ?))`,
      [court_id, booking_date, end_time, start_time]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Khung giờ này vừa có người đặt. Vui lòng chọn khung giờ khác!' });
    }

    // Thêm đơn đặt sân vào CSDL
    const [result] = await db.query(
      `INSERT INTO bookings (user_id, court_id, booking_date, start_time, end_time, total_price, promo_code, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [user_id, court_id, booking_date, start_time, end_time, total_price, promo_code || null]
    );

    res.status(201).json({
      message: 'Đặt sân thành công!',
      booking_id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xử lý đặt sân', error: error.message });
  }
});

module.exports = router;
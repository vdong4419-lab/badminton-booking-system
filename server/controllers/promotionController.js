const db = require('../config/db');

// Lấy danh sách khuyến mãi đang áp dụng (PB04)
exports.getActivePromotions = async (req, res) => {
  try {
    const [promotions] = await db.execute(
      `SELECT id, code, title, discount_percent, max_discount_amount, min_order_amount, start_date, end_date 
       FROM promotions 
       WHERE status = TRUE AND NOW() BETWEEN start_date AND end_date`
    );

    res.json(promotions);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};
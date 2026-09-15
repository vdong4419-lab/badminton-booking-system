const db = require('../config/db');
const bcrypt = require('bcryptjs');

// 1. Lấy thông tin cá nhân
exports.getProfile = async (req, res) => {
  try {
    const [users] = await db.execute(
      'SELECT id, full_name, phone, email, avatar, status FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'Người dùng không tồn tại!' });
    }

    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// 2. Cập nhật thông tin cá nhân (Họ tên, Email, Avatar)
exports.updateProfile = async (req, res) => {
  const { full_name, email, avatar } = req.body;

  try {
    await db.execute(
      'UPDATE users SET full_name = ?, email = ?, avatar = ? WHERE id = ?',
      [full_name, email, avatar || null, req.user.id]
    );

    res.json({ message: 'Cập nhật thông tin cá nhân thành công!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// 3. Đổi mật khẩu
exports.changePassword = async (req, res) => {
  const { old_password, new_password } = req.body;

  try {
    // Lấy mật khẩu hiện tại trong DB
    const [users] = await db.execute('SELECT password FROM users WHERE id = ?', [req.user.id]);
    const user = users[0];

    // Kiểm tra mật khẩu cũ
    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu hiện tại không chính xác!' });
    }

    // Mã hóa mật khẩu mới & lưu
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(new_password, salt);

    await db.execute('UPDATE users SET password = ? WHERE id = ?', [newHashedPassword, req.user.id]);

    res.json({ message: 'Đổi mật khẩu thành công!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};
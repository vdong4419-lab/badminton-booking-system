const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Đăng ký tài khoản (PB05)
exports.register = async (req, res) => {
  const { full_name, phone, email, password } = req.body;

  try {
    // 1. Kiểm tra SĐT hoặc Email đã tồn tại chưa
    const [existingUser] = await db.execute(
      'SELECT * FROM users WHERE phone = ? OR email = ?',
      [phone, email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Số điện thoại hoặc Email đã được đăng ký!' });
    }

    // 2. Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Thêm tài khoản mới vào CSDL (role_id = 3 là Khách hàng)
    await db.execute(
      'INSERT INTO users (role_id, full_name, phone, email, password) VALUES (?, ?, ?, ?, ?)',
      [3, full_name, phone, email, hashedPassword]
    );

    res.status(201).json({ message: 'Đăng ký tài khoản thành công!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  const { phone, password } = req.body;

  try {
    // 1. Tìm người dùng theo số điện thoại
    const [users] = await db.execute('SELECT * FROM users WHERE phone = ?', [phone]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Số điện thoại hoặc mật khẩu không chính xác!' });
    }

    const user = users[0];

    // 2. Đối soát mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Số điện thoại hoặc mật khẩu không chính xác!' });
    }

    // 3. Tạo Token JWT
    const token = jwt.sign(
      { id: user.id, role_id: user.role_id, full_name: user.full_name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Đăng nhập thành công!',
      token,
      user: { id: user.id, full_name: user.full_name, phone: user.phone, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};
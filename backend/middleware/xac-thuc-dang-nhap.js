const jwt = require('jsonwebtoken');

module.exports = function xacThucDangNhap(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Lấy Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Vui lòng đăng nhập để thực hiện thao tác này!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'BiMatBaoMat123');
    req.user = decoded; // Chứa { id, ho_ten, vai_tro }
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Phên đăng nhập hết hạn hoặc không hợp lệ!' });
  }
};
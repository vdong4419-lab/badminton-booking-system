module.exports = function phanQuyen(danhSachVaiTro = []) {
  return (req, res, next) => {
    if (!req.user || !req.user.vai_tro) {
      return res.status(401).json({ message: 'Chưa xác thực thông tin người dùng!' });
    }

    // Nếu vai trò của user không nằm trong danh sách cho phép
    if (!danhSachVaiTro.includes(req.user.vai_tro)) {
      return res.status(403).json({ message: 'Bạn không có quyền truy cập vào chức năng này!' });
    }

    next();
  };
};
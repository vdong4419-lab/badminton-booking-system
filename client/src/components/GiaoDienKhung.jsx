import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Calendar, History, UserCheck, 
  Users, Settings, LogOut, Shield, Menu, X, Tag, DollarSign, User, Activity, UserCog, Home, Search
} from 'lucide-react';

export default function GiaoDienKhung() {
  const [openSidebar, setOpenSidebar] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('nguoi_dung')) || null;
  const currentRole = user?.vai_tro || 'khach_vang_lai'; // Mặc định là khách vãng lai nếu chưa đăng nhập

  const handleDangXuat = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nguoi_dung');
    navigate('/dang-nhap');
  };

  // MẢNG MENU DÀNH CHO TỪNG ĐỐI TƯỢNG TÁCH BIỆT
  const danhSachMenu = [
    // --- KHÁCH VẮNG LAI (Chưa đăng nhập) ---
    { label: 'Trang Chủ', icon: Home, path: '/', vaiTro: ['khach_vang_lai'] },
    { label: 'Tra Cứu Lịch Trống', icon: Search, path: '/tra-cuu', vaiTro: ['khach_vang_lai'] },
    { label: 'Bảng Giá Sân', icon: DollarSign, path: '/bang-gia', vaiTro: ['khach_vang_lai'] },
    { label: 'Tin Khuyến Mãi', icon: Tag, path: '/khuyen-mai', vaiTro: ['khach_vang_lai'] },

    // --- KHÁCH HÀNG (Đã đăng nhập) ---
    { label: 'Trang Chủ', icon: Home, path: '/', vaiTro: [ 'khach_hang'] },
    { label: 'Đặt Sân Cầu Lông', icon: Calendar, path: '/dat-san', vaiTro: ['khach_hang'] },
    { label: 'Lịch Sử Đặt Sân', icon: History, path: '/lich-su-dat', vaiTro: ['khach_hang'] },
    { label: 'Thông Tin Cá Nhân', icon: User, path: '/thong-tin-ca-nhan', vaiTro: ['khach_hang'] },
    
    // --- LỄ TÂN (Nhiệm vụ vận hành) ---
    { label: 'Xác Nhận Khách Đến', icon: UserCheck, path: '/le-tan/xac-nhan', vaiTro: ['le_tan'] },
    { label: 'Trạng Thái Sân', icon: Activity, path: '/le-tan/trang-thai-san', vaiTro: ['le_tan'] },
    
    // --- ADMIN (Chỉ tập trung quản lý) ---
    { label: 'Thống Kê Doanh Thu', icon: LayoutDashboard, path: '/admin/thong-ke', vaiTro: ['admin'] },
    { label: 'Quản Lý Sân', icon: Settings, path: '/admin/quan-ly-san', vaiTro: ['admin'] },
    { label: 'Quản Lý Giá Sân', icon: DollarSign, path: '/admin/quan-ly-gia', vaiTro: ['admin'] },
    { label: 'Quản Lý Khuyến Mãi', icon: Tag, path: '/admin/quan-ly-khuyen-mai', vaiTro: ['admin'] },
    { label: 'Quản Lý Nhân Viên', icon: Users, path: '/admin/quan-ly-nhan-vien', vaiTro: ['admin'] },
    { label: 'Quản Lý Khách Hàng', icon: UserCog, path: '/admin/quan-ly-khach-hang', vaiTro: ['admin'] },
  ];

  // Lọc đúng danh sách menu dựa theo vai trò hiện tại
  const menuPhuHop = danhSachMenu.filter(m => m.vaiTro.includes(currentRole));

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      {/* Sidebar luôn xuất hiện linh hoạt */}
      <aside className={`${openSidebar ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 flex flex-col shadow-xl z-20`}>
        <div className="p-4 flex items-center justify-between border-b border-slate-800">
          {openSidebar ? (
            <div className="flex items-center gap-2 font-bold text-lg text-emerald-400">
              <Shield className="w-6 h-6" /> SÂN CẦU LÔNG
            </div>
          ) : (
            <Shield className="w-6 h-6 text-emerald-400 mx-auto" />
          )}
          <button onClick={() => setOpenSidebar(!openSidebar)} className="text-slate-400 hover:text-white">
            {openSidebar ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Khối hiển thị thông tin User nếu đã đăng nhập */}
        {user && (
          <div className="p-4 border-b border-slate-800 bg-slate-800/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-extrabold text-slate-900 shrink-0">
              {user.ho_ten ? user.ho_ten.charAt(0) : 'U'}
            </div>
            {openSidebar && (
              <div className="overflow-hidden">
                <p className="font-semibold text-sm truncate">{user.ho_ten || 'Người dùng'}</p>
                <span className="inline-block px-2 py-0.5 text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-400 rounded-md">
                  {user.vai_tro}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Danh sách các Menu mục */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {menuPhuHop.map((menu, idx) => {
            const Icon = menu.icon;
            const isKichHoat = location.pathname === menu.path;
            return (
              <Link
                key={idx}
                to={menu.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                  isKichHoat 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {openSidebar && <span className="text-sm">{menu.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Nút Đăng xuất (Chỉ hiện khi đã đăng nhập) */}
        {token && (
          <div className="p-3 border-t border-slate-800">
            <button
              onClick={handleDangXuat}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium text-sm"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              {openSidebar && <span>Đăng Xuất</span>}
            </button>
          </div>
        )}
      </aside>

      {/* Nội dung bên phải */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">
            Hệ Thống Đặt Sân Cầu Lông
          </h2>

          <div className="flex items-center gap-3">
            {!token ? (
              <>
                <Link to="/dang-nhap" className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-600">
                  Đăng Nhập
                </Link>
                <Link to="/dang-ky" className="px-4 py-2 text-sm font-semibold bg-emerald-600 text-white rounded-xl shadow-md hover:bg-emerald-700 transition-all">
                  Đăng Ký
                </Link>
              </>
            ) : (
              <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-200">
                Đã Đăng Nhập
              </span>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
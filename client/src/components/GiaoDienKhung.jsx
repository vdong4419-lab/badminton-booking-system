import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Calendar, History, UserCheck, 
  Users, Settings, LogOut, Shield, Menu, X 
} from 'lucide-react';

export default function GiaoDienKhung() {
  const [openSidebar, setOpenSidebar] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Giả định thông tin user lưu trong localStorage (hoặc Context/Redux)
  const user = JSON.parse(localStorage.getItem('nguoi_dung')) || {
    ho_ten: 'Nguyễn Văn A',
    vai_tro: 'admin' // Các giá trị: 'khach_hang', 'le_tan', 'admin'
  };

  const handleDangXuat = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nguoi_dung');
    navigate('/dang-nhap');
  };

  // Danh sách Menu phân quyền
  const danhSachMenu = [
    // --- Khách Hàng ---
    { label: 'Đặt Sân Cầu Lông', icon: Calendar, path: '/dat-san', vaiTro: ['khach_hang', 'le_tan', 'admin'] },
    { label: 'Lịch Sử Đặt Sân', icon: History, path: '/lich-su-dat', vaiTro: ['khach_hang'] },
    
    // --- Lễ Tân ---
    { label: 'Xác Nhận Khách Đến', icon: UserCheck, path: '/le-tan/xac-nhan', vaiTro: ['le_tan', 'admin'] },
    
    // --- Admin Dashboard ---
    { label: 'Thống Kê Doanh Thu', icon: LayoutDashboard, path: '/admin/thong-ke', vaiTro: ['admin'] },
    { label: 'Quản Lý Sân', icon: Settings, path: '/admin/quan-ly-san', vaiTro: ['admin'] },
    { label: 'Quản Lý Nhân Viên', icon: Users, path: '/admin/quan-ly-nhan-vien', vaiTro: ['admin'] },
  ];

  const menuPhuHop = danhSachMenu.filter(m => m.vaiTro.includes(user.vai_tro));

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      {/* SIDEBAR NAVIGATION */}
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

        {/* THÔNG TIN USER TÓM TẮT */}
        <div className="p-4 border-b border-slate-800 bg-slate-800/50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-extrabold text-slate-900 shrink-0">
            {user.ho_ten.charAt(0)}
          </div>
          {openSidebar && (
            <div className="overflow-hidden">
              <p className="font-semibold text-sm truncate">{user.ho_ten}</p>
              <span className="inline-block px-2 py-0.5 text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-400 rounded-md">
                {user.vai_tro}
              </span>
            </div>
          )}
        </div>

        {/* MENU DANH MỤC */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {menuPhuHop.map((menu, idx) => {
            const Icon = menu.icon;
            const isKichHoat = location.pathname === menu.path;
            return (
              <Link
                key={idx}
                to={menu.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all ${
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

        {/* ĐĂNG XUẤT */}
        <div className="p-3 border-t border-slate-800">
          <button
            onClick={handleDangXuat}
            className="w-full flex items-center gap-3 px-3 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium text-sm"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {openSidebar && <span>Đăng Xuất</span>}
          </button>
        </div>
      </aside>

      {/* VÙNG NỘI DUNG CHÍNH (MAIN CONTENT AREA) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* HEADER TỔNG */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">
            Hệ Thống Quản Lý Sân Cầu Lông
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full border">
              Phiên bản 2.0 Pro
            </span>
          </div>
        </header>

        {/* CHỨA ROUTE CON */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
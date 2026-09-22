import React from 'react';
import { DollarSign, Calendar, TrendingUp, Users, ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';

export default function ThongKeBaoCao() {
  const kpiData = [
    { label: 'Tổng Doanh Thu Tháng', value: '45.200.000đ', change: '+12.5%', isUp: true, icon: DollarSign, color: 'bg-emerald-500' },
    { label: 'Tổng Lượt Đặt Sân', value: '382 Lượt', change: '+8.2%', isUp: true, icon: Calendar, color: 'bg-blue-500' },
    { label: 'Tỉ Lệ Lấp Đầy', value: '78.5%', change: '-2.1%', isUp: false, icon: TrendingUp, color: 'bg-amber-500' },
    { label: 'Khách Hàng Mới', value: '64 Người', change: '+18.4%', isUp: true, icon: Users, color: 'bg-purple-500' },
  ];

  const giaoDichGanDay = [
    { id: 'HD-9921', khachHang: 'Phan Văn Đồng', san: 'Sân 01 - Yonex VIP', ngay: '22/09/2026', tongTien: '240.000đ', trangThai: 'Thành công' },
    { id: 'HD-9920', khachHang: 'Nguyễn Văn A', san: 'Sân 02 - Victor Standard', ngay: '22/09/2026', tongTien: '120.000đ', trangThai: 'Thành công' },
    { id: 'HD-9919', khachHang: 'Trần Thị B', san: 'Sân 03 - Lining', ngay: '21/09/2026', tongTien: '160.000đ', trangThai: 'Đã hủy' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Thống Kê & Báo Cáo Doanh Thu</h1>
          <p className="text-xs text-slate-500 mt-1">Tổng quan tình hình kinh doanh hệ thống sân cầu lông</p>
        </div>
        <input type="month" defaultValue="2026-09" className="border border-slate-200 bg-white px-4 py-2 rounded-xl text-xs font-bold text-slate-700 outline-none shadow-sm" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <div className={`p-3 rounded-2xl text-white ${kpi.color}`}>
                  <Icon size={20} />
                </div>
                <span className={`text-xs font-extrabold flex items-center px-2 py-0.5 rounded-full ${kpi.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                  {kpi.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {kpi.change}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">{kpi.label}</span>
                <p className="text-xl font-black text-slate-900 mt-0.5">{kpi.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bảng giao dịch gần đây */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-800 text-base">Giao Dịch Đặt Sân Mới Nhất</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 uppercase font-bold border-b border-slate-100">
              <tr>
                <th className="p-3">Mã Hóa Đơn</th>
                <th className="p-3">Khách Hàng</th>
                <th className="p-3">Sân Đặt</th>
                <th className="p-3">Ngày Đặt</th>
                <th className="p-3">Tổng Tiền</th>
                <th className="p-3">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {giaoDichGanDay.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-all">
                  <td className="p-3 font-bold text-slate-900">{row.id}</td>
                  <td className="p-3">{row.khachHang}</td>
                  <td className="p-3">{row.san}</td>
                  <td className="p-3">{row.ngay}</td>
                  <td className="p-3 text-emerald-600 font-extrabold">{row.tongTien}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${row.trangThai === 'Thành công' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                      {row.trangThai}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
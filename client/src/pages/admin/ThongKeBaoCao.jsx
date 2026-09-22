import React, { useState, useEffect } from 'react';
import guiYeuCauApi from '../../api/gui-yeu-cau-api';
import { DollarSign, Calendar, TrendingUp, Users, ArrowUpRight } from 'lucide-react';

export default function ThongKeBaoCao() {
  const [dataThongKe, setDataThongKe] = useState([]);

  useEffect(() => {
    guiYeuCauApi.get('/admin/thong-ke-doanh-thu')
      .then((res) => setDataThongKe(res.data))
      .catch((err) => console.log(err));
  }, []);

  const tongDoanhThu = dataThongKe.reduce((acc, curr) => acc + Number(curr.tong_doanh_thu || 0), 0);
  const tongLuotDat = dataThongKe.reduce((acc, curr) => acc + Number(curr.tong_don_dat || 0), 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Báo Cáo</h1>
        <p className="text-sm text-slate-500">Tổng quan tình hình kinh doanh và hiệu suất đặt sân.</p>
      </div>

      {/* THẺ KPI CHỈ SỐ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng Doanh Thu</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{tongDoanhThu.toLocaleString()} đ</h3>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-0.5 mt-2">
              <ArrowUpRight size={14} /> +12.5% so với tháng trước
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <DollarSign size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng Lượt Đặt Sân</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{tongLuotDat} Đơn</h3>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-0.5 mt-2">
              <ArrowUpRight size={14} /> Tỷ lệ lấp đầy 85%
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Calendar size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tỷ Lệ Tăng Trưởng</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">+18.2%</h3>
            <span className="text-xs text-slate-400 mt-2 block">Dựa trên 3 tháng gần nhất</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>

      {/* BẢNG THỐNG KÊ CHI TIẾT */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Chi Tiết Doanh Thu Theo Tháng</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                <th className="p-4">Thời Gian</th>
                <th className="p-4">Tổng Lượt Đặt</th>
                <th className="p-4">Doanh Thu</th>
                <th className="p-4">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {dataThongKe.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-all">
                  <td className="p-4 font-bold text-slate-700">{row.thang}</td>
                  <td className="p-4 text-slate-600">{row.tong_don_dat} đơn</td>
                  <td className="p-4 font-extrabold text-emerald-600">
                    {Number(row.tong_doanh_thu || 0).toLocaleString()} đ
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-lg">
                      Hoàn Thành Báo Cáo
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
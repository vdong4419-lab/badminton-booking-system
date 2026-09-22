import React, { useState, useEffect } from 'react';
import guiYeuCauApi from '../../api/gui-yeu-cau-api';
import { Users, UserPlus, Lock } from 'lucide-react';

export default function QuanLyNhanVien() {
  const [danhSach, setDanhSach] = useState([]);

  useEffect(() => {
    guiYeuCauApi.get('/admin/danh-sach-nhan-vien')
      .then((res) => setDanhSach(res.data || []))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="text-emerald-600" /> Quản Lý Nhân Viên & Lễ Tân
          </h1>
          <p className="text-sm text-slate-500">Danh sách tài khoản nhân viên vận hành hệ thống.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold border-b">
              <th className="p-4">ID</th>
              <th className="p-4">Họ và Tên</th>
              <th className="p-4">Email</th>
              <th className="p-4">Chức Vụ</th>
              <th className="p-4">Trạng Thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {danhSach.map((nv) => (
              <tr key={nv.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold">#{nv.id}</td>
                <td className="p-4 font-semibold text-slate-800">{nv.ho_ten}</td>
                <td className="p-4 text-slate-600">{nv.email}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 text-xs font-bold bg-blue-100 text-blue-800 rounded-md uppercase">
                    {nv.vai_tro}
                  </span>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full">
                    {nv.trang_thai}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import { Calendar, Mail, Phone, Shield, Trash2 } from "lucide-react";
import React, { useState } from "react";

const ManagerList = () => {
  const [managers, setManagers] = useState([
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet.yilmaz@ogrenci360.com",
      phone: "+90 532 123 45 67",
      role: "Sistem Yöneticisi",
      department: "Bilgi İşlem",
      joinDate: "2023-01-15",
      status: "Aktif",
    },
    {
      id: 2,
      name: "Fatma Özkan",
      email: "fatma.ozkan@ogrenci360.com",
      phone: "+90 535 987 65 43",
      role: "Öğrenci İşleri Müdürü",
      department: "Öğrenci İşleri",
      joinDate: "2022-09-10",
      status: "Aktif",
    },
    {
      id: 3,
      name: "Mehmet Kaya",
      email: "mehmet.kaya@ogrenci360.com",
      phone: "+90 533 456 78 90",
      role: "Akademik Koordinatör",
      department: "Akademik İşler",
      joinDate: "2023-03-20",
      status: "Aktif",
    },
    {
      id: 4,
      name: "Mehmet Kaya",
      email: "mehmet.kaya@ogrenci360.com",
      phone: "+90 533 456 78 90",
      role: "Akademik Koordinatör",
      department: "Akademik İşler",
      joinDate: "2023-03-20",
      status: "Aktif",
    },
    {
      id: 5,
      name: "Mehmet Kaya",
      email: "mehmet.kaya@ogrenci360.com",
      phone: "+90 533 456 78 90",
      role: "Akademik Koordinatör",
      department: "Akademik İşler",
      joinDate: "2023-03-20",
      status: "Aktif",
    },
  ]);
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-slate-300">
                Yönetici
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-slate-300">
                İletişim
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-slate-300">
                Rol & Departman
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-slate-300">
                Katılım Tarihi
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-slate-300">
                Durum
              </th>
              <th className="text-right py-4 px-6 text-sm font-medium text-slate-300">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {managers.map((manager) => (
              <tr
                key={manager.id}
                className="hover:bg-slate-700/30 transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {manager.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        {manager.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Mail className="w-4 h-4" />
                      {manager.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Phone className="w-4 h-4" />
                      {manager.phone}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="font-medium text-white">{manager.role}</div>
                    <div className="text-sm text-slate-400">
                      {manager.department}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Calendar className="w-4 h-4" />
                    {new Date(manager.joinDate).toLocaleDateString("tr-TR")}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      manager.status === "Aktif"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {manager.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {managers.length === 0 && (
        <div className="text-center py-12">
          <Shield className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-300 mb-2">
            Yönetici bulunamadı
          </h3>
          <p className="text-slate-500">
            Arama kriterlerinize uygun yönetici bulunmuyor.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManagerList;

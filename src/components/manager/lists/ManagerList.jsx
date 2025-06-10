import { Calendar, Mail, Phone, Shield, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersByRoleThunk } from "../../../features/manager/managerThunk";

const ManagerList = ({ search }) => {
  const managers = useSelector((state) => state.managerState.managerList);
  const dispatch = useDispatch();

  useEffect(() => {
    const takeManagers = async () => {
      try {
        dispatch(fetchUsersByRoleThunk("manager")).unwrap();
      } catch (err) {
        console.err("MANAGERLIST | Yöneticileri çekerken sorun ", err);
      }
    };

    if (managers.length === 0) {
      takeManagers();
    }
  }, [managers, dispatch]);

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
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {managers
              .filter((staff) =>
                staff.fullName.toLowerCase().includes(search.toLowerCase())
              )
              .map((manager) => (
                <tr
                  key={manager.id}
                  className="hover:bg-slate-700/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold uppercase">
                        {manager.fullName[0]}
                        {manager.fullName.split(" ")[1][0]}
                      </div>
                      <div>
                        <div className="font-medium text-white capitalize">
                          {manager.fullName}
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
                      <div className="font-medium text-white">
                        {manager.position === "principal" && "Müdür"}
                        {manager.position === "assistant principal" &&
                          "Müdür Yardımcısı"}
                        {manager.position === "counselor" && "Rehber Öğretmen"}
                        {manager.position === "officer" && "Arşiv Sorumlusu"}
                        {manager.position === "IT" && "Bilgi İşlem Yönteticisi"}
                      </div>
                      <div className=" text-sm text-slate-400">yönetici</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Calendar className="w-4 h-4" />
                      {new Date(manager.createdAt).toLocaleDateString("tr-TR")}
                    </div>
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

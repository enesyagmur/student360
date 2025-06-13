import { Calendar, Mail, Phone, Shield, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersByRoleThunk } from "../../../features/manager/managerThunk";

const ManagerList = ({ search }) => {
  const managers = useSelector(
    (state) => state.managerState.managerList?.users || []
  );
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const takeManagers = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) {
          console.log("Kullanıcı bilgisi bulunamadı");
          return;
        }

        const user = JSON.parse(userData);
        if (!user.id || !user.token) {
          console.log("Kullanıcı ID veya token bulunamadı");
          return;
        }

        await dispatch(
          fetchUsersByRoleThunk({
            role: "manager",
            currentUserId: user.id,
          })
        );
      } catch (err) {
        console.error("MANAGERLIST | Yöneticileri çekerken sorun ", err);
      }
    };

    takeManagers();
  }, [dispatch]);

  const filteredManagers = managers.filter((manager) => {
    if (!search.trim()) return true;

    if (!manager?.fullName) return false;

    return manager.fullName.toLowerCase().includes(search.toLowerCase().trim());
  });

  return (
    <div className="w-full h-[430px] bg-bg-tertiary  rounded-xl  overflow-x-auto  overflow-y-auto ">
      <div className="">
        <table className="w-full ">
          <thead className="bg-bg-quaternary">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                Yönetici
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                İletişim
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                Rol & Departman
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                Katılım Tarihi
              </th>
              {user?.position === "principal" && (
                <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                  Çıkar
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y ">
            {filteredManagers.map((manager) => (
              <tr
                key={manager.id}
                className="text-text-secondary bg-bg-secondary"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold uppercase">
                      {manager.fullName[0]}
                      {manager.fullName.split(" ")[1]?.[0] || ""}
                    </div>
                    <div>
                      <div className="hidden md:flex font-medium text-text-primary  capitalize">
                        {manager.fullName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm ">
                      <Mail className="w-4 h-4" />
                      {manager.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm ">
                      <Phone className="w-4 h-4" />
                      {manager.phone}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="font-medium text-text-primary ">
                      {manager.position === "principal" && "Müdür"}
                      {manager.position === "assistant principal" &&
                        "Müdür Yardımcısı"}
                      {manager.position === "counselor" && "Rehber Öğretmen"}
                      {manager.position === "officer" && "Arşiv Sorumlusu"}
                      {manager.position === "IT" && "Bilgi İşlem Yönteticisi"}
                    </div>
                    <div className=" text-sm ">yönetici</div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-sm ">
                    <Calendar className="w-4 h-4" />
                    {new Date(manager.createdAt).toLocaleDateString("tr-TR")}
                  </div>
                </td>
                {user?.position === "principal" && (
                  <td className="py-4 px-6 flex items-center justify-start">
                    <div className="flex items-center justify-center ">
                      <button className="p-2  hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(!filteredManagers || filteredManagers.length === 0) && (
        <div className="text-center py-12">
          <Shield className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            Yönetici bulunamadı
          </h3>
          <p className="text-text-secondary">
            Arama kriterlerinize uygun yönetici bulunmuyor.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManagerList;

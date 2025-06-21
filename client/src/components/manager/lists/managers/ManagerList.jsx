import { Calendar, Mail, Phone, Shield, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteManagerThunk,
  fetchManagersThunk,
} from "../../../../features/manager/managerThunk";
import Button from "../../../ui/button";
import ConfirmModal from "../../../ui/confirmModal";
import Loading from "../../../ui/loading";
import SomeThingWrong from "../../../ui/someThingWrong";
import NoData from "../../../ui/noData";

const ManagerList = ({ search, user }) => {
  const managerState = useSelector((state) => state.managerState) || {};
  const { managerList = [], loading = false, error = null } = managerState;
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    answer: false,
    selectedItemId: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const takeManagers = async () => {
      try {
        if (!user?.id) return;
        await dispatch(fetchManagersThunk(user.id)).unwrap();
      } catch (err) {
        console.error("MANAGERLIST | Yöneticileri çekerken sorun ", err);
      }
    };

    if (user?.id && managerList.length === 0) {
      takeManagers();
    }
  }, [dispatch, user]);

  const filteredManagers = Array.isArray(managerList)
    ? managerList.filter((manager) => {
        if (!search.trim()) return true;
        if (!manager?.fullName) return false;
        return manager.fullName
          .toLowerCase()
          .includes(search.toLowerCase().trim());
      })
    : [];

  useEffect(() => {
    const handleDelete = async (managerId) => {
      try {
        await dispatch(deleteManagerThunk(managerId)).unwrap();
      } catch (err) {
        console.error(
          "Yönetici silinemedi:",
          err.message || "Beklenmeyen bir hata oluştu"
        );
        // Burada bir hata mesajı gösterebilirsiniz
      }
    };

    if (confirmModal.answer === true && confirmModal.selectedItemId !== "") {
      handleDelete(confirmModal.selectedItemId);
      setConfirmModal((prev) => ({
        ...prev,
        selectedItemId: "",
        answer: false,
      }));
    }
  }, [confirmModal, dispatch]);

  // Loading durumu
  if (loading) {
    return <Loading />;
  }

  // Error durumu
  if (error) {
    return <SomeThingWrong err={error} />;
  }

  if (filteredManagers.length === 0 && !loading && !error) {
    return <NoData />;
  }

  return (
    <div className="w-full h-[500px] bg-bg-tertiary  rounded-xl  overflow-x-auto  overflow-y-auto ">
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
                  İşlem
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
                      {manager.fullName ? (
                        <>
                          {manager.fullName[0]}
                          {manager.fullName.split(" ")[1]?.[0] || ""}
                        </>
                      ) : (
                        "?"
                      )}
                    </div>
                    <div>
                      <div className="hidden md:flex font-medium text-text-primary capitalize">
                        {manager.fullName || "İsimsiz Yönetici"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4" />
                      {manager.email || "E-posta yok"}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4" />
                      {manager.phone || "Telefon yok"}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="font-medium text-text-primary">
                      {manager.position === "principal" && "Müdür"}
                      {manager.position === "assistant principal" &&
                        "Müdür Yardımcısı"}
                      {manager.position === "counselor" && "Rehber Öğretmen"}
                      {manager.position === "officer" && "Arşiv Sorumlusu"}
                      {manager.position === "IT" && "Bilgi İşlem Yöntemicisi"}
                      {!manager.position && "Pozisyon belirtilmemiş"}
                    </div>
                    <div className="text-sm">yönetici</div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    {manager.createdAt
                      ? new Date(manager.createdAt).toLocaleDateString("tr-TR")
                      : "Tarih belirtilmemiş"}
                  </div>
                </td>
                {user?.position === "principal" && (
                  <td className="py-4 px-6 flex items-center justify-start">
                    <div className="flex items-center justify-center ">
                      <Button
                        onClick={() => {
                          setConfirmModal((prev) => ({
                            ...prev,
                            open: true,
                            teacherId: manager.id,
                          }));
                        }}
                        type={"danger"}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        type={"danger"}
        message={"Silmek istediğinize emin misiniz?"}
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
      />
    </div>
  );
};

export default ManagerList;

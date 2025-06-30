import { Calendar, Mail, Phone, Trash2 } from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
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

const ManagerList = React.memo(({ search, user }) => {
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

  const filteredManagers = useMemo(() => {
    if (search) {
      return managerList.filter((manager) => {
        if (!search.trim()) return true;
        if (!manager?.fullName) return false;
        return manager.fullName
          .toLowerCase()
          .includes(search.toLowerCase().trim());
      });
    }

    return managerList;
  }, [managerList, search]);

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
    <div className="w-full h-[440px] md:h-[460px] lg:h-[500px] bg-bg-tertiary rounded-xl overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto overflow-y-auto max-h-[500px]">
        <table className="w-full">
          <thead className="bg-bg-quaternary sticky top-0 z-10">
            <tr>
              <th className="text-left py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium text-text-primary">
                Yönetici
              </th>
              <th className="text-left py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium text-text-primary">
                İletişim
              </th>
              <th className="text-left py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium text-text-primary">
                Rol & Departman
              </th>
              <th className="text-left py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium text-text-primary">
                Katılım Tarihi
              </th>
              {user?.position === "principal" && (
                <th className="text-left py-3 lg:py-4 px-4 lg:px-6 text-xs lg:text-sm font-medium text-text-primary">
                  İşlem
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-quaternary">
            {filteredManagers.map((manager) => (
              <tr
                key={manager.id}
                className="text-text-secondary bg-bg-secondary hover:bg-bg-primary transition-colors"
              >
                <td className="py-3 lg:py-4 px-4 lg:px-6">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold uppercase text-xs lg:text-sm">
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
                      <div className="font-medium text-text-primary capitalize text-sm lg:text-base">
                        {manager.fullName || "İsimsiz Yönetici"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3 lg:py-4 px-4 lg:px-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs lg:text-sm">
                      <Mail className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                      <span className="truncate max-w-[150px] xl:max-w-none">
                        {manager.email || "E-posta yok"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs lg:text-sm">
                      <Phone className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                      {manager.phone || "Telefon yok"}
                    </div>
                  </div>
                </td>
                <td className="py-3 lg:py-4 px-4 lg:px-6">
                  <div className="space-y-1">
                    <div className="font-medium text-text-primary text-xs lg:text-sm">
                      {manager.position === "principal" && "Müdür"}
                      {manager.position === "assistant principal" &&
                        "Müdür Yardımcısı"}
                      {manager.position === "counselor" && "Rehber Öğretmen"}
                      {manager.position === "officer" && "Arşiv Sorumlusu"}
                      {manager.position === "IT" && "Bilgi İşlem Yöntemicisi"}
                      {!manager.position && "Pozisyon belirtilmemiş"}
                    </div>
                    <div className="text-xs lg:text-sm">yönetici</div>
                  </div>
                </td>
                <td className="py-3 lg:py-4 px-4 lg:px-6">
                  <div className="flex items-center gap-2 text-xs lg:text-sm">
                    <Calendar className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                    {manager.createdAt
                      ? new Date(manager.createdAt).toLocaleDateString("tr-TR")
                      : "Tarih belirtilmemiş"}
                  </div>
                </td>
                {user?.position === "principal" && (
                  <td className="py-3 lg:py-4 px-4 lg:px-6">
                    <div className="flex items-center justify-start">
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
                        <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden overflow-y-auto max-h-[500px] p-4 space-y-4">
        {filteredManagers.map((manager) => (
          <div
            key={manager.id}
            className="bg-bg-secondary rounded-lg p-4 shadow-sm border border-bg-quaternary"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold uppercase text-sm">
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
                  <div className="font-medium text-text-primary capitalize text-base">
                    {manager.fullName || "İsimsiz Yönetici"}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {manager.position === "principal" && "Müdür"}
                    {manager.position === "assistant principal" &&
                      "Müdür Yardımcısı"}
                    {manager.position === "counselor" && "Rehber Öğretmen"}
                    {manager.position === "officer" && "Arşiv Sorumlusu"}
                    {manager.position === "IT" && "Bilgi İşlem Yöntemicisi"}
                    {!manager.position && "Pozisyon belirtilmemiş"}
                  </div>
                </div>
              </div>
              {user?.position === "principal" && (
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
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">
                  {manager.email || "E-posta yok"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Phone className="w-4 h-4 flex-shrink-0" />
                {manager.phone || "Telefon yok"}
              </div>
            </div>

            {/* Join Date */}
            <div className="flex items-center gap-2 text-sm text-text-tertiary border-t border-bg-quaternary pt-3">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>
                Katılım:{" "}
                {manager.createdAt
                  ? new Date(manager.createdAt).toLocaleDateString("tr-TR")
                  : "Tarih belirtilmemiş"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        type={"danger"}
        message={"Silmek istediğinize emin misiniz?"}
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
      />
    </div>
  );
});

export default ManagerList;

import { Calendar, Mail, Phone, BookOpen, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeachersThunk,
  deleteTeacherThunk,
} from "../../../../features/teacher/teacherThunk";
import Button from "../../../ui/button";
import ConfirmModal from "../../../ui/confirmModal";
import Loading from "../../../ui/loading";
import SomeThingWrong from "../../../ui/someThingWrong";
import NoData from "../../../ui/noData";

const TeacherList = ({ search, user }) => {
  const dispatch = useDispatch();
  const teacherState = useSelector((state) => state.teacherState) || {};
  const { teacherList = [], loading = false, error = null } = teacherState;
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    answer: false,
    selectedItemId: "",
  });

  useEffect(() => {
    const takeTeachers = async () => {
      try {
        if (!user?.id) return;
        await dispatch(fetchTeachersThunk(user.id)).unwrap();
      } catch (err) {
        console.error("TEACHERLIST | Öğretmenleri çekerken sorun ", err);
      }
    };

    if (user?.id && teacherList.length === 0) {
      takeTeachers();
    }
  }, [dispatch, user]);

  // yardımcı fonksiyon
  const getPositionName = (position) => {
    const positionNames = {
      matematik: "Matematik",
      fizik: "Fizik",
      kimya: "Kimya",
      biyoloji: "Biyoloji",
      turkce: "Türkçe",
      ingilizce: "İngilizce",
      tarih: "Tarih",
      cografya: "Coğrafya",
      beden: "Beden Eğitimi",
      muzik: "Müzik",
      resim: "Resim",
      din: "Din Kültürü",
      felsefe: "Felsefe",
      bilgisayar: "Bilgisayar",
    };
    return positionNames[position] || "Branş belirtilmemiş";
  };

  useEffect(() => {
    const handleDelete = async (teacherId) => {
      try {
        if (!teacherId) {
          console.error("Öğretmen ID bulunamadı");
          return;
        }

        await dispatch(deleteTeacherThunk(teacherId)).unwrap();
      } catch (err) {
        console.error("Öğretmen silinirken hata oluştu:", err);
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

  // arama fonksiyonu
  const filteredTeachers = Array.isArray(teacherList)
    ? teacherList.filter((teacher) => {
        if (!search.trim()) return true;
        if (!teacher?.fullName) return false;
        return teacher.fullName
          .toLowerCase()
          .includes(search.toLowerCase().trim());
      })
    : [];

  // Loading durumu
  if (loading) {
    return <Loading />;
  }

  // Error durumu
  if (error) {
    return <SomeThingWrong err={error} />;
  }

  if (filteredTeachers.length === 0 && !loading && !error) {
    return <NoData />;
  }

  return (
    <div className="w-full h-[500px] bg-bg-tertiary rounded-xl overflow-x-auto overflow-y-auto">
      <div className="">
        <table className="w-full">
          <thead className="bg-bg-quaternary">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                Öğretmen
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                İletişim
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                Branş
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
          <tbody className="divide-y">
            {filteredTeachers.map((teacher) => (
              <tr
                key={teacher.id}
                className="text-text-secondary bg-bg-secondary"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold uppercase">
                      {teacher.fullName ? (
                        <>
                          {teacher.fullName[0]}
                          {teacher.fullName.split(" ")[1]?.[0] || ""}
                        </>
                      ) : (
                        "?"
                      )}
                    </div>
                    <div>
                      <div className="hidden md:flex font-medium text-text-primary capitalize">
                        {teacher.fullName || "İsimsiz Öğretmen"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4" />
                      {teacher.email || "E-posta yok"}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4" />
                      {teacher.phone || "Telefon yok"}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="font-medium text-text-primary">
                      {getPositionName(teacher.position)}
                    </div>
                    <div className="text-sm">öğretmen</div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    {teacher.createdAt
                      ? new Date(teacher.createdAt).toLocaleDateString("tr-TR")
                      : "Tarih belirtilmemiş"}
                  </div>
                </td>
                <td className="py-4 px-6 flex items-center justify-start">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      onClick={() => {
                        setConfirmModal((prev) => ({
                          ...prev,
                          open: true,
                          teacherId: teacher.id,
                        }));
                      }}
                      type={"danger"}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
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

export default TeacherList;

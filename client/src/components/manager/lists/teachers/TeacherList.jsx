import { Calendar, Mail, Phone, BookOpen, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../ui/button";

import {
  fetchTeachersThunk,
  deleteTeacherThunk,
} from "../../../../features/teacher/teacherThunk";
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
  }, [dispatch, user, teacherList]);

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
        <table className="w-full min-w-[600px]">
          {/* Modern Table Header */}
          <thead className="bg-bg-tertiary">
            <tr className="border-b border-bg-quaternary">
              <th className="text-left py-5 px-6 text-text-secondary font-semibold text-sm tracking-wide uppercase">
                Öğretmen
              </th>
              <th className="text-left py-5 px-6 text-text-secondary font-semibold text-sm tracking-wide uppercase">
                İletişim
              </th>
              <th className="text-left py-5 px-6 text-text-secondary font-semibold text-sm tracking-wide uppercase">
                Branş
              </th>
              <th className="text-left py-5 px-6 text-text-secondary font-semibold text-sm tracking-wide uppercase">
                Katılım Tarihi
              </th>
              {user?.position === "principal" && (
                <th className="text-center py-5 px-6 text-text-secondary font-semibold text-sm tracking-wide uppercase">
                  İşlem
                </th>
              )}
            </tr>
          </thead>

          {/* Modern Table Body */}
          <tbody className="bg-bg-secondary divide-y divide-bg-quaternary">
            {filteredTeachers.map((teacher) => (
              <tr
                key={teacher.id}
                className={`group transition-all duration-200 ease-out hover:bg-bg-tertiary hover:shadow-sm  `}
              >
                {/* Teacher Name Column */}
                <td className="py-5 px-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-color-accent to-color-accent-light rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                        {teacher.fullName ? (
                          <>
                            {teacher.fullName[0]}
                            {teacher.fullName.split(" ")[1]?.[0] || ""}
                          </>
                        ) : (
                          "?"
                        )}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-lg text-text-primary capitalize">
                        {teacher.fullName || "İsimsiz Öğretmen"}
                      </p>
                      <p className="text-sm text-text-tertiary">
                        {getPositionName(teacher.position)} Öğretmeni
                      </p>
                    </div>
                  </div>
                </td>

                {/* Contact Column */}
                <td className="py-5 px-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-color-accent/10 rounded-lg flex items-center justify-center">
                        <Mail className="w-4 h-4 text-color-accent" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-text-primary font-medium truncate">
                          {teacher.email || "E-posta yok"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-color-success/10 rounded-lg flex items-center justify-center">
                        <Phone className="w-4 h-4 text-color-success" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-text-primary font-medium">
                          {teacher.phone || "Telefon yok"}
                        </p>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Subject Column */}
                <td className="py-5 px-6">
                  <div className="inline-flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-color-accent-light"></div>
                    <span className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-medium bg-color-accent/10 text-text-secondary border border-color-accent/20">
                      {getPositionName(teacher.position)}
                    </span>
                  </div>
                </td>

                {/* Join Date Column */}
                <td className="py-5 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-color-warning/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-color-warning" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-text-primary font-medium text-sm">
                        {teacher.createdAt
                          ? new Date(teacher.createdAt).toLocaleDateString(
                              "tr-TR"
                            )
                          : "Tarih belirtilmemiş"}
                      </p>
                      <p className="text-xs text-text-tertiary">
                        {teacher.createdAt
                          ? new Date(teacher.createdAt).toLocaleDateString(
                              "tr-TR",
                              {
                                weekday: "short",
                              }
                            )
                          : ""}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Actions Column */}
                {user?.position === "principal" && (
                  <td className="py-5 px-6">
                    <div className="flex items-center justify-center">
                      <Button
                        onClick={() => {
                          setConfirmModal((prev) => ({
                            ...prev,
                            open: true,
                            teacherId: teacher.id,
                          }));
                        }}
                        type="danger"
                        size="sm"
                      >
                        <X className="w-4 h-4" />
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
        setConfirmModal={setConfirmModal}
        confirmModal={confirmModal}
      />
    </div>
  );
};

export default TeacherList;

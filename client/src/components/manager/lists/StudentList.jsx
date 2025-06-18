import { Calendar, Mail, Phone, GraduationCap, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStudentThunk,
  fetchStudentsThunk,
} from "../../../features/student/studentThunk";
import Button from "../../ui/button";
import ConfirmModal from "../../ui/confirmModal";

const StudentList = ({ search, user }) => {
  const studentState = useSelector((state) => state.studentState) || {};
  const { studentList = [], loading = false, error = null } = studentState;
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    answer: false,
    selectedItemId: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const takeStudents = async () => {
      try {
        if (!user) {
          console.error("Kullanıcı bilgisi bulunamadı");
          return;
        }

        if (!user.id || !user.token) {
          console.error("Kullanıcı ID veya token bulunamadı");
          return;
        }

        await dispatch(fetchStudentsThunk(user.id)).unwrap();
      } catch (err) {
        console.error("STUDENTLIST | Öğrencileri çekerken sorun ", err);
      }
    };

    if (studentList.length === 0) {
      takeStudents();
    }
  }, [dispatch, user, studentList]);

  const filteredStudents = Array.isArray(studentList)
    ? studentList.filter((student) => {
        if (!search.trim()) return true;
        if (!student?.fullName) return false;
        return student.fullName
          .toLowerCase()
          .includes(search.toLowerCase().trim());
      })
    : [];

  useEffect(() => {
    const handleDelete = async (studentId) => {
      try {
        await dispatch(
          deleteStudentThunk({
            studentId,
            currentUserId: user.id,
          })
        ).unwrap();
      } catch (err) {
        console.error(
          "Öğrenci silinemedi:",
          err.message || "Beklenmeyen bir hata oluştu"
        );
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
  }, [confirmModal, dispatch, user]);

  // Yükleme durumu
  if (loading) {
    return (
      <div className="w-full h-[500px] bg-bg-tertiary rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-text-secondary">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <div className="w-full h-[500px] bg-bg-tertiary rounded-xl flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-lg font-medium mb-2">Hata oluştu</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] bg-bg-tertiary rounded-xl overflow-x-auto overflow-y-auto">
      <div className="">
        <table className="w-full">
          <thead className="bg-bg-quaternary">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                Öğrenci
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                İletişim
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                Sınıf
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                Kayıt Tarihi
              </th>
              {user?.position.includes("principal") && (
                <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                  İşlem
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredStudents.map((student) => (
              <tr
                key={student.id}
                className="text-text-secondary bg-bg-secondary"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold uppercase">
                      {student.fullName ? (
                        <>
                          {student.fullName[0]}
                          {student.fullName.split(" ")[1]?.[0] || ""}
                        </>
                      ) : (
                        "?"
                      )}
                    </div>
                    <div>
                      <div className="hidden md:flex font-medium text-text-primary capitalize">
                        {student.fullName || "İsimsiz Öğrenci"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4" />
                      {student.email || "E-posta yok"}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4" />
                      {student.phone || "Telefon yok"}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="font-medium text-text-primary">
                      {student.grade !== "" && student.branch !== ""
                        ? student.grade + "-" + student.branch
                        : "Sınıf atanmamış"}
                    </div>
                    <div className="text-sm">Öğrenci</div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    {student.createdAt
                      ? new Date(student.createdAt).toLocaleDateString("tr-TR")
                      : "Tarih belirtilmemiş"}
                  </div>
                </td>
                {user?.position.includes("principal") && (
                  <td className="py-4 px-6">
                    <Button
                      onClick={() =>
                        setConfirmModal({
                          open: true,
                          selectedItemId: student.id,
                        })
                      }
                      type="danger"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(!filteredStudents || filteredStudents.length === 0) && (
        <div className="text-center py-12">
          <GraduationCap className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            Öğrenci bulunamadı
          </h3>
          <p className="text-text-secondary">
            Arama kriterlerinize uygun öğrenci bulunmuyor.
          </p>
        </div>
      )}

      <ConfirmModal
        type={"danger"}
        message={"Silmek istediğinize emin misiniz?"}
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
      />
    </div>
  );
};

export default StudentList;

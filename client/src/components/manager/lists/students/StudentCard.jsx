import React from "react";
import { Mail, Phone, Calendar, Trash2, User, Edit } from "lucide-react";
import Button from "../../../ui/button";

const StudentCard = ({
  student,
  user,
  setConfirmModal = () => {},
  setEditModal = () => {},
}) => {
  const getInitials = (fullName) => {
    if (!fullName) return "?";
    const nameParts = fullName.split(" ");
    return nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`
      : nameParts[0][0];
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Tarih belirtilmemiş";
    return new Date(dateString).toLocaleDateString("tr-TR");
  };

  return (
    <div
      className="w-[380px] h-72 rounded-xl m-2 border hover:shadow-lg transition-all duration-300 group flex flex-col"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        borderColor: "var(--color-bg-quaternary)",
      }}
    >
      {/* Header - Avatar ve İsim */}
      <div className="p-4 flex items-start justify-evenly">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className="w-12 h-12  rounded-full flex items-center justify-center text-white font-semibold uppercase shadow-lg group-hover:scale-105 transition-transform duration-200"
            style={{
              background:
                "linear-gradient(135deg, var(--color-accent), var(--color-accent-light))",
            }}
          >
            {getInitials(student.fullName)}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="font-semibold text-lg capitalize truncate"
              style={{ color: "var(--color-text-primary)" }}
            >
              {student.fullName || "İsimsiz Öğrenci"}
            </h3>
            <div
              className="text-sm flex items-center gap-1 mt-1"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <User className="w-3 h-3" />
              Öğrenci
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-11/12 mx-auto h-32  flex flex-col justify-between">
        {/* İletişim Bilgileri */}
        <div className="w-full h-16 flex flex-col justify-evenly">
          <div className="flex items-center gap-2 text-sm">
            <Mail
              className="w-4 h-4 flex-shrink-0"
              style={{ color: "var(--color-text-tertiary)" }}
            />
            <span
              className="truncate"
              style={{ color: "var(--color-text-secondary)" }}
              title={student.email || "E-posta yok"}
            >
              {student.email || "E-posta yok"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone
              className="w-4 h-4 flex-shrink-0"
              style={{ color: "var(--color-text-tertiary)" }}
            />
            <span style={{ color: "var(--color-text-secondary)" }}>
              {student.phone || "Telefon yok"}
            </span>
          </div>
        </div>

        {/* Alt Bilgiler */}
        <div className="w-full  h-16 flex items-center justify-between">
          <span
            className="w-10 h-8 flex item-center justify-center pt-1 text-sm font-semibold rounded-md"
            style={{
              color: "var(--color-text-primary)",
              backgroundColor: "var(--color-bg-quaternary)",
            }}
          >
            {student.grade !== "" ? student.className : "Atanmamış"}
          </span>
          <div className="h-full flex items-center text-sm">
            <Calendar
              className="w-4 h-4"
              style={{ color: "var(--color-text-tertiary)" }}
            />
            <span style={{ color: "var(--color-text-secondary)" }}>
              {formatDate(student.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {user?.position.includes("principal") && (
        <div
          className="h-16 p-4 border-t "
          style={{ borderColor: "var(--color-bg-quaternary)" }}
        >
          <div className="flex gap-2">
            <Button
              onClick={() =>
                setEditModal({
                  open: true,
                  selectedStudent: student,
                })
              }
              type={"success"}
              size={"sm"}
              className="flex-1"
            >
              <Edit className="w-4 h-4 mr-2" />
              Düzenle
            </Button>
            <Button
              onClick={() =>
                setConfirmModal({
                  open: true,
                  selectedItemId: student.id,
                })
              }
              type={"danger"}
              size={"sm"}
              className="flex-1"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Sil
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCard;

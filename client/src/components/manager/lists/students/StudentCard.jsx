import React from "react";
import { Mail, Phone, Calendar, Trash2 } from "lucide-react";
import Button from "../../../ui/button";

const StudentCard = ({ student, user, setConfirmModal = () => {} }) => {
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
    <tr
      className="py-4 px-6"
      style={{
        color: "var(--color-text-secondary)",
        backgroundColor: "var(--color-bg-secondary)",
      }}
    >
      {/* Öğrenci */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold uppercase"
            style={{
              background:
                "linear-gradient(135deg, var(--color-accent), var(--color-accent-light))",
            }}
          >
            {getInitials(student.fullName)}
          </div>
          <div>
            <div
              className="hidden md:flex font-medium capitalize"
              style={{ color: "var(--color-text-primary)" }}
            >
              {student.fullName || "İsimsiz Öğrenci"}
            </div>
          </div>
        </div>
      </td>

      {/* İletişim */}
      <td className="py-4 px-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Mail
              className="w-4 h-4"
              style={{ color: "var(--color-text-tertiary)" }}
            />
            <span style={{ color: "var(--color-text-secondary)" }}>
              {student.email || "E-posta yok"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone
              className="w-4 h-4"
              style={{ color: "var(--color-text-tertiary)" }}
            />
            <span style={{ color: "var(--color-text-secondary)" }}>
              {student.phone || "Telefon yok"}
            </span>
          </div>
        </div>
      </td>

      {/* Sınıf */}
      <td className="py-4 px-6">
        <div className="space-y-1">
          <div
            className="font-medium"
            style={{ color: "var(--color-text-primary)" }}
          >
            {student.grade !== "" ? student.className : "Sınıf atanmamış"}
          </div>
          <div
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Öğrenci
          </div>
        </div>
      </td>

      {/* Kayıt Tarihi */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-2 text-sm">
          <Calendar
            className="w-4 h-4"
            style={{ color: "var(--color-text-tertiary)" }}
          />
          <span style={{ color: "var(--color-text-secondary)" }}>
            {formatDate(student.createdAt)}
          </span>
        </div>
      </td>

      {/* İşlem */}
      {user?.position.includes("principal") && (
        <td className="py-4 px-6">
          <Button
            onClick={() =>
              setConfirmModal({
                open: true,
                selectedItemId: student.id,
              })
            }
            type={"danger"}
            size={"sm"}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </td>
      )}
    </tr>
  );
};

export default StudentCard;

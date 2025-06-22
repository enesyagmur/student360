import { Calendar, Mail, Phone, X } from "lucide-react";
import Button from "../../../ui/button";

const TeacherCard = ({ teacher, setConfirmModal, user }) => {
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

  return (
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
                ? new Date(teacher.createdAt).toLocaleDateString("tr-TR")
                : "Tarih belirtilmemiş"}
            </p>
            <p className="text-xs text-text-tertiary">
              {teacher.createdAt
                ? new Date(teacher.createdAt).toLocaleDateString("tr-TR", {
                    weekday: "short",
                  })
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
  );
};

export default TeacherCard;

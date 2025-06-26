import { Calendar, Edit, Mail, Phone, X } from "lucide-react";
import Button from "../../../ui/button";

// Artık silme ve modal yönetimi yukarıdan props ile gelecek
const TeacherCard = ({
  teacher,
  user,
  onDeleteClick, // yeni prop
}) => {
  const getPositionName = (position) => {
    const positionNames = {
      mathematics: "Matematik",
      physics: "Fizik",
      chemistry: "Kimya",
      biology: "Biyoloji",
      turkish: "Türkçe",
      english: "İngilizce",
      history: "Tarih",
      geography: "Coğrafya",
      physical_education: "Beden Eğitimi",
      music: "Müzik",
      art: "Resim",
      religion: "Din Kültürü",
      philosophy: "Felsefe",
      computer: "Bilgisayar",
    };
    return positionNames[position] || "Branş belirtilmemiş";
  };

  const getLevel = (level) => {
    const levels = {
      middle_school: "Ortaokul",
      high_school: "Lise",
    };
    return levels[level];
  };

  return (
    <div
      key={teacher.id}
      className="w-full max-w-sm bg-bg-primary rounded-lg border border-bg-tertiary m-2 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Card Header */}
      <div className="p-3 bg-bg-secondary border-b border-bg-tertiary flex flex-col">
        <div className="flex items-center justify-between mb-2">
          {/* Teacher Profile */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 uppercase bg-color-accent rounded-md flex items-center justify-center text-white font-semibold text-xs">
                {teacher.fullName ? (
                  <>
                    {teacher.fullName[0]}
                    {teacher.fullName.split(" ")[1]?.[0] || ""}
                  </>
                ) : (
                  "?"
                )}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-color-success rounded-full border border-bg-primary"></div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-sm text-text-primary capitalize truncate">
                {teacher.fullName || "İsimsiz Öğretmen"}
              </h3>
              <span className="text-xs text-text-secondary">
                {getPositionName(teacher.position)}
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <span
            className={`px-1.5 py-0.5 rounded text-xs font-medium ${
              teacher.active
                ? "bg-color-success/10 text-color-success"
                : "bg-color-danger/10 text-color-danger"
            }`}
          >
            {teacher.active ? "Aktif" : "Pasif"}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3 flex-1 flex flex-col space-y-2">
        {/* Contact Information */}
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center gap-2 p-1.5 rounded bg-bg-secondary">
            <div className="w-5 h-5  rounded flex items-center justify-center flex-shrink-0">
              <Mail className="w-3 h-3 text-color-accent" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-text-primary truncate">
                {teacher.email || "E-posta yok"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded bg-bg-secondary">
            <div className="w-5 h-5  rounded flex items-center justify-center flex-shrink-0">
              <Phone className="w-3 h-3 text-color-success" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-text-primary">
                {teacher.phone || "Telefon yok"}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-1.5">
          <div className="p-1.5 rounded bg-bg-secondary border border-bg-tertiary">
            <div className="flex items-center gap-1 mb-0.5">
              <Calendar className="w-3 h-3 text-color-warning" />
              <p className="text-xs text-text-secondary font-medium">
                Haftalık
              </p>
            </div>
            <p className="text-xs font-semibold text-text-primary">
              {teacher.weeklyLessonHours ?? "-"}
              <span className="text-xs font-normal text-text-tertiary ml-1">
                saat
              </span>
            </p>
          </div>

          <div className="p-1.5 rounded bg-bg-secondary border border-bg-tertiary">
            <div className="flex items-center gap-1 mb-0.5">
              <div className="w-2.5 h-2.5 bg-color-accent rounded-full"></div>
              <p className="text-xs text-text-secondary font-medium">Düzey</p>
            </div>
            <p className="text-xs font-semibold text-text-primary">
              {getLevel(teacher.level) || "-"}
            </p>
          </div>
        </div>

        {/* Join Date */}
        <div className="p-1.5 rounded bg-bg-secondary border border-bg-tertiary">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-bg-tertiary rounded flex items-center justify-center">
              <Calendar className="w-3 h-3 text-text-secondary" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-text-primary">
                {teacher.createdAt
                  ? new Date(teacher.createdAt).toLocaleDateString("tr-TR")
                  : "Tarih belirtilmemiş"}
              </p>
              <p className="text-xs text-text-tertiary">Katılım</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {user?.position === "principal" && (
        <div className="p-3 pt-0">
          <div className="flex gap-1.5">
            <Button
              onClick={() => {
                // Update teacher function
                console.log("Update teacher:", teacher.id);
              }}
              className="flex-1 flex items-center justify-center gap-1 bg-color-accent hover:bg-color-accent/90 text-text-primary  font-medium text-xs py-1.5 px-2 rounded transition-colors duration-200"
              size="sm"
              type={"success"}
            >
              <Edit className="w-3 h-3 mr-1" />
              Düzenle
            </Button>
            <Button
              onClick={() => onDeleteClick(teacher.id)}
              className="flex-1 flex items-center justify-center gap-1 bg-color-danger hover:bg-color-danger/90 text-text-primary font-medium text-xs py-1.5 px-2 rounded transition-colors duration-200"
              size="sm"
              type={"danger"}
            >
              <X className="w-3 h-3 mr-1" />
              Kaldır
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherCard;

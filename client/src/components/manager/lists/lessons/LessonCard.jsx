import { Book, CreditCard, Edit, Timer, X } from "lucide-react";
import Button from "../../../ui/button"; // Button component'inizi import edin

const LessonCard = ({ lesson, user, setConfirmModal }) => {
  const getLevels = (level) => {
    const levels = {
      middle_school: "Ortaokul",
      high_school: "Lise",
    };
    return levels[level];
  };

  const lessonConvertToTurkish = (lesson) => {
    const lessons = {
      art: "Görsel Sanatlar",
      biology: "Biyoloji",
      chemistry: "Kimya",
      computer_science: "Bilgisayar Bilimleri",
      english: "İngilizce",
      geography: "Coğrafya",
      german: "Almanca",
      health_information_and_first_aid: "Sağlık Bilgisi ve İlk Yardım",
      history: "Tarih",
      mathematics: "Matematik",
      music: "Müzik",
      philosophy: "Felsefe",
      physical_education: "Beden Eğitimi",
      physics: "Fizik",
      religion: "Din Kültürü",
      science: "Fen Bilimleri",
      social_sciences: "Sosyal Bilgiler",
      technology_design: "Teknoloji ve Tasarım",
      turkish: "Türkçe",
    };
    return lessons[lesson] || lesson;
  };

  return (
    lesson && (
      <div className="group relative bg-bg-secondary border border-bg-tertiary rounded-xl p-4 hover:bg-bg-tertiary hover:border-bg-quaternary transition-all duration-300 hover:shadow-lg">
        {/* Main Content - Title & Credit Prominent */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-xl font-bold text-text-primary mb-2 leading-tight">
                {lessonConvertToTurkish(lesson.name)}
              </h3>
              <div className="flex items-center gap-2 text-base text-text-secondary font-medium">
                <Timer className="w-5 h-5" />
                <span>{lesson.oneWeekLessonHours || "0"} Saat / Hafta</span>
              </div>
            </div>

            {/* Action Buttons - Only for principals */}
            {user?.position.includes("principal") && (
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button type="success" size="sm" className="p-2">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() =>
                    setConfirmModal({
                      open: true,
                      selectedItemId: lesson.lessonId,
                    })
                  }
                  type="danger"
                  size="md"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
                lesson.active
                  ? "bg-color-success/20 text-color-success border border-color-success/30"
                  : "bg-color-danger/20 text-color-danger border border-color-danger/30"
              }`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full mr-2 ${
                  lesson.active ? "bg-color-success" : "bg-color-danger"
                }`}
              ></div>
              {lesson.active ? "Aktif" : "Pasif"}
            </span>

            <div className="h-12 w-32 flex item-center">
              <div className="w-20 h-12 flex justify-center item-center">
                <p className="font-semibold mt-3">{getLevels(lesson.level)}</p>
              </div>

              {/* Small Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-color-accent to-color-accent-light rounded-lg flex items-center justify-center text-white">
                <Book className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default LessonCard;

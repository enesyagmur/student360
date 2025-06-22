import {
  BookOpen,
  Users,
  Calendar,
  Clock,
  User,
  Trash2,
  X,
} from "lucide-react";
import Button from "../../../ui/button";

const ExamCard = ({ exam, user }) => {
  const handleDeleteExam = (examId) => {
    // Burada silme işlemini başlatabilirsiniz
    console.log("Silinecek sınav ID:", examId);
  };
  return (
    <div
      key={exam.id}
      className="group relative bg-bg-secondary rounded-xl shadow-sm hover:shadow-xl border border-bg-quaternary transition-all duration-200  overflow-hidden w-full md:w-[calc(50%-12px)]"
    >
      {/* Üst gradient çizgi */}
      <div
        className={`h-1 w-full ${
          exam.active
            ? "bg-gradient-to-r from-green-400 to-emerald-500"
            : "bg-gradient-to-r from-red-400 to-rose-500"
        }`}
      />

      <div className="p-6 space-y-4">
        {/* Başlık ve durum */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl md:text-2xl capitalize font-bold text-text-primary leading-tight flex-1 min-w-0">
            {exam.title}
          </h2>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm transition-all ${
                exam.active
                  ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                  : "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
              }`}
            >
              {exam.active ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Yayında
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  Gizli
                </>
              )}
            </span>
          </div>
        </div>

        {/* Ana bilgiler flex wrap */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm min-w-0 flex-1 sm:flex-none">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0">
              <span className="font-medium text-text-primary block">Ders</span>
              <span className="text-text-secondary text-xs truncate">
                {exam.lessonName || (exam.lesson && exam.lesson.name) || "Yok"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm min-w-0 flex-1 sm:flex-none">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="min-w-0">
              <span className="font-medium text-text-primary block">Sınıf</span>
              <span className="text-text-secondary text-xs">{exam.grade}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm min-w-0 flex-1 sm:flex-none">
            <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="min-w-0">
              <span className="font-medium text-text-primary block">Dönem</span>
              <span className="text-text-secondary text-xs">{exam.term}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm min-w-0 flex-1 sm:flex-none">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="min-w-0">
              <span className="font-medium text-text-primary block">Tarih</span>
              <span className="text-text-secondary text-xs">
                {exam.examDate}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm min-w-0 flex-1 sm:flex-none">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="min-w-0">
              <span className="font-medium text-text-primary block">Saat</span>
              <span className="text-text-secondary text-xs">
                {exam.examTime || "-"}
              </span>
            </div>
          </div>
        </div>

        {/* Açıklama */}
        {exam.description && (
          <div className="mt-4">
            <div className="bg-bg-tertiary/50 rounded-lg p-4 border border-bg-quaternary/50">
              <h4 className="text-sm font-medium text-text-primary mb-2">
                Açıklama
              </h4>
              <p className="text-text-secondary text-sm leading-relaxed h-40 overflow-y-auto">
                {exam.description}
              </p>
            </div>
          </div>
        )}

        {/* Oluşturan ve tarih */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-4 ">
          <div className="flex items-center gap-2 text-sm text-text-tertiary">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
              <User className="w-3 h-3 text-white" />
            </div>
            <span>
              <span className="font-medium">Oluşturan:</span>
              {exam.creatorName}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-tertiary">
            <Clock className="w-4 h-4" />
            <span>
              <span className="font-medium">Oluşturulma:</span>{" "}
              {exam.createdAt ? exam.createdAt.slice(0, 10) : "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Silme butonu - Hover'da görünür */}
      {user?.role === "manager" && (
        <Button
          onClick={() => handleDeleteExam(exam.id)}
          type={"danger"}
          size={"sm"}
          className="absolute bottom-2 left-[90%] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default ExamCard;

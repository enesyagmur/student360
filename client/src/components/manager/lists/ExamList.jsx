import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExamsThunk } from "../../../features/exam/examThunk";

const ExamList = ({ search, user }) => {
  const dispatch = useDispatch();
  const examState = useSelector((state) => state.examState);
  const { examList = [], loading = false, error = null } = examState;

  useEffect(() => {
    const fetchExams = async () => {
      try {
        dispatch(getExamsThunk({ userId: user.id, userRole: user.role }));
      } catch (err) {
        throw new Error(err);
      }
    };
    if (user?.id && user?.role && examList.length === 0) {
      fetchExams();
    }
  }, [dispatch, user, examList]);

  // Arama filtresi (büyük/küçük harf duyarsız)
  const filteredExams = examList.filter((exam) =>
    exam.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="w-full mt-6">
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <span className="text-text-secondary text-base animate-pulse">
            Yükleniyor...
          </span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center py-12">
          <span className="text-red-600 dark:text-red-400 text-base font-semibold">
            Bir hata oluştu: {error}
          </span>
        </div>
      ) : filteredExams.length === 0 ? (
        <div className="text-center text-text-tertiary py-8">
          Sonuç bulunamadı.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="bg-bg-secondary rounded-lg shadow-md p-6 flex flex-col gap-4 transition hover:shadow-lg border border-bg-quaternary"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-text-primary">
                  {exam.title}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm transition ${
                    exam.active
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {exam.active ? "Yayında" : "Gizli"}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-secondary">
                <div>
                  <span className="font-medium text-text-primary">Ders:</span>
                  {exam.lessonName
                    ? exam.lessonName
                    : exam.lesson && exam.lesson.name
                    ? exam.lesson.name
                    : "Ders adı yok"}
                </div>
                <div>
                  <span className="font-medium text-text-primary">Sınıf:</span>{" "}
                  {exam.grade}
                </div>
                <div>
                  <span className="font-medium text-text-primary">Dönem:</span>{" "}
                  {exam.term}. Dönem
                </div>
                <div>
                  <span className="font-medium text-text-primary">Tarih:</span>{" "}
                  {exam.examDate}
                </div>
                <div>
                  <span className="font-medium text-text-primary">Saat:</span>{" "}
                  {exam.examTime || "-"}
                </div>
              </div>
              {exam.description && (
                <div className="text-text-tertiary text-sm mt-2 italic">
                  {exam.description}
                </div>
              )}
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-bg-quaternary text-xs text-text-tertiary">
                <span>
                  <span className="font-medium">Oluşturan:</span>{" "}
                  {exam.creatorName}
                </span>
                <span>
                  <span className="font-medium">Oluşturulma:</span>{" "}
                  {exam.createdAt ? exam.createdAt.slice(0, 10) : "-"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamList;

import React from "react";

// examSchema'ya uygun örnek sınav verileri
const mockExams = [
  {
    id: "1",
    title: "Matematik 1. Dönem Sınavı",
    term: 1,
    lesson: { id: "math-01", name: "Matematik" },
    grade: 5,
    examDate: "2024-05-20",
    active: true,
    creatorName: "Ahmet Yılmaz",
    creatorId: "mgr-01",
    description: "5. sınıf matematik 1. dönem sınavı",
  },
  {
    id: "2",
    title: "Türkçe 2. Dönem Sınavı",
    term: 2,
    lesson: { id: "turkish-01", name: "Türkçe" },
    grade: 6,
    examDate: "2024-06-10",
    active: false,
    creatorName: "Ayşe Demir",
    creatorId: "mgr-02",
    description: "6. sınıf türkçe 2. dönem sınavı",
  },
  {
    id: "3",
    title: "Fen Bilimleri 1. Dönem Sınavı",
    term: 1,
    lesson: { id: "science-01", name: "Fen Bilimleri" },
    grade: 7,
    examDate: "2024-05-25",
    active: true,
    creatorName: "Mehmet Kaya",
    creatorId: "mgr-03",
    description: "",
  },
  // ... daha fazla örnek eklenebilir ...
];

const ExamList = ({ search = "" }) => {
  // Arama filtresi (büyük/küçük harf duyarsız)
  const filteredExams = mockExams.filter((exam) =>
    exam.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="w-full mt-6">
      {filteredExams.length === 0 ? (
        <div className="text-center text-text-tertiary py-8">
          Sonuç bulunamadı.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="bg-bg-secondary rounded-lg shadow-md p-4 flex flex-col gap-2 transition hover:shadow-lg"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-text-primary">
                  {exam.title}
                </h2>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    exam.active
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {exam.active ? "Aktif" : "Pasif"}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-text-secondary">
                <span>
                  <b>Ders:</b> {exam.lesson.name}
                </span>
                <span>
                  <b>Sınıf:</b> {exam.grade}
                </span>
                <span>
                  <b>Dönem:</b> {exam.term}. Dönem
                </span>
                <span>
                  <b>Tarih:</b> {exam.examDate}
                </span>
              </div>
              {exam.description && (
                <div className="text-text-tertiary text-sm mt-1">
                  {exam.description}
                </div>
              )}
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-text-tertiary">
                  Oluşturan: {exam.creatorName}
                </span>
                <span className="text-xs text-text-tertiary">
                  ID: {exam.creatorId}
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

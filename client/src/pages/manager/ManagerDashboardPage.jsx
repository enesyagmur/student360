//// filepath: client/src/pages/manager/ManagerDashboardPage.jsx
import { useState } from "react";
import { useSelector } from "react-redux";

const students = [
  {
    id: "1",
    name: "Ali Yılmaz",
    class: "9-A",
    grades: { matematik: 85, fizik: 78, turkce: 92 },
  },
  {
    id: "2",
    name: "Ayşe Demir",
    class: "9-A",
    grades: { matematik: 90, fizik: 82, turkce: 88 },
  },
  {
    id: "3",
    name: "Mehmet Kaya",
    class: "10-B",
    grades: { matematik: 70, fizik: 65, turkce: 80 },
  },
  {
    id: "4",
    name: "Zeynep Şahin",
    class: "10-B",
    grades: { matematik: 75, fizik: 72, turkce: 85 },
  },
  {
    id: "5",
    name: "Elif Çelik",
    class: "11-C",
    grades: { matematik: 95, fizik: 90, turkce: 93 },
  },
];

const classes = [
  { id: "9-A", name: "9-A" },
  { id: "10-B", name: "10-B" },
  { id: "11-C", name: "11-C" },
];

const lessons = ["matematik", "fizik", "turkce"];

const ManagerDashboardPage = () => {
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedLesson, setSelectedLesson] = useState("all");
  const user = useSelector((state) => state.authState.user);

  // Filtrelenmiş öğrenciler
  const filteredStudents =
    selectedClass === "all"
      ? students
      : students.filter((s) => s.class === selectedClass);

  // Ortalama hesaplama
  const getAverage = (lesson) => {
    const relevant = filteredStudents.filter((s) =>
      lesson === "all" ? true : s.grades[lesson] !== undefined
    );
    if (relevant.length === 0) return "-";
    const sum = relevant.reduce(
      (acc, s) =>
        acc +
        (lesson === "all"
          ? Object.values(s.grades).reduce((a, b) => a + b, 0) /
            Object.values(s.grades).length
          : s.grades[lesson]),
      0
    );
    return (sum / relevant.length).toFixed(1);
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-4">
      <h1 className="text-2xl font-bold text-text-primary mb-6">
        Performans Dashboard
      </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Sınıf Seç
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full bg-bg-secondary border border-bg-quaternary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-color-accent"
          >
            <option value="all">Tüm Sınıflar</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Ders Seç
          </label>
          <select
            value={selectedLesson}
            onChange={(e) => setSelectedLesson(e.target.value)}
            className="w-full bg-bg-secondary border border-bg-quaternary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-color-accent"
          >
            <option value="all">Tüm Dersler</option>
            {lessons.map((lesson) => (
              <option key={lesson} value={lesson}>
                {lesson.charAt(0).toUpperCase() + lesson.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ortalama Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {(selectedLesson === "all" ? lessons : [selectedLesson]).map(
          (lesson) => (
            <div
              key={lesson}
              className="bg-bg-secondary rounded-lg shadow p-6 flex flex-col items-center"
            >
              <span className="text-text-secondary text-sm mb-2">
                {lesson === "all"
                  ? "Genel Ortalama"
                  : lesson.charAt(0).toUpperCase() + lesson.slice(1)}
              </span>
              <span className="text-3xl font-bold text-color-accent">
                {getAverage(lesson)}
              </span>
              <span className="text-text-tertiary text-xs mt-2">
                {selectedClass === "all"
                  ? "Tüm Sınıflar"
                  : classes.find((c) => c.id === selectedClass)?.name}
              </span>
            </div>
          )
        )}
      </div>

      {/* Öğrenci Listesi */}
      <div className="bg-bg-tertiary rounded-lg shadow p-4 overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-text-secondary">
                Ad Soyad
              </th>
              <th className="py-2 px-4 text-left text-text-secondary">Sınıf</th>
              {(selectedLesson === "all" ? lessons : [selectedLesson]).map(
                (lesson) => (
                  <th
                    key={lesson}
                    className="py-2 px-4 text-left text-text-secondary"
                  >
                    {lesson.charAt(0).toUpperCase() + lesson.slice(1)}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr
                key={student.id}
                className="border-b border-bg-quaternary hover:bg-bg-secondary/50"
              >
                <td className="py-2 px-4 text-text-primary">{student.name}</td>
                <td className="py-2 px-4 text-text-primary">{student.class}</td>
                {(selectedLesson === "all" ? lessons : [selectedLesson]).map(
                  (lesson) => (
                    <td key={lesson} className="py-2 px-4 text-text-primary">
                      {student.grades[lesson] !== undefined
                        ? student.grades[lesson]
                        : "-"}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStudents.length === 0 && (
          <div className="text-center text-text-tertiary py-8">
            Kayıt bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboardPage;

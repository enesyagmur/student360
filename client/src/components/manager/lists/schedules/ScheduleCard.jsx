import React, { useState } from "react";

// Yardımcı: Tarihi okunabilir formata çevir
const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString("tr-TR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
const dayLabels = {
  monday: "Pazartesi",
  tuesday: "Salı",
  wednesday: "Çarşamba",
  thursday: "Perşembe",
  friday: "Cuma",
};

const lessonLabels = {
  turkish: "Türkçe",
  mathematics: "Matematik",
  science: "Fen Bilimleri",
  social_sciences: "Sosyal Bilgiler",
  english: "İngilizce",
  religion: "Din Kültürü",
  art: "Görsel Sanatlar",
  music: "Müzik",
  technology_design: "Teknoloji Tasarım",
  computer_science: "Bilişim",
  physical_education: "Beden Eğitimi",
};

const ScheduleCard = ({ schedule }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-bg-secondary border-b border-text-secondary">
      {/* Accordion Başlık */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-bg-tertiary transition"
        onClick={() => setOpen((v) => !v)}
      >
        <div>
          <div className="font-semibold text-lg">{schedule.className}</div>
          <div className="text-xs text-gray-500">
            Son güncelleme: {formatDate(schedule.updatedAt)}
          </div>
        </div>
        <div>
          <span className="text-sm text-gray-400">{open ? "▲" : "▼"}</span>
        </div>
      </div>

      {/* Accordion İçerik */}
      {open && (
        <div className="bg-bg-tertiary px-4 py-3">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr>
                  <th className="text-left p-1">Gün</th>
                  {[...Array(6)].map((_, i) => (
                    <th key={i} className="text-center p-1">
                      {i + 1}. Ders
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day}>
                    <td className="font-semibold p-1">{dayLabels[day]}</td>
                    {Array.isArray(schedule.schedule?.[day])
                      ? schedule.schedule[day].map((lessonObj, i) => (
                          <td key={i} className="text-center p-1">
                            {lessonLabels[lessonObj.lesson] || lessonObj.lesson}
                          </td>
                        ))
                      : [...Array(6)].map((_, i) => (
                          <td key={i} className="text-center p-1 text-gray-300">
                            -
                          </td>
                        ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleCard;

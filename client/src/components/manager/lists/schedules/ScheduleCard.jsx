import React, { useState } from "react";
import Button from "../../../ui/button";
import { CircleChevronDown, DropletIcon, DropletOff } from "lucide-react";

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
    <div className="bg-bg-secondary rounded-lg shadow-sm border border-bg-tertiary overflow-hidden transition-all duration-200 hover:shadow-md">
      {/* Accordion Başlık */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer hover:bg-bg-tertiary/50 transition-colors duration-150"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex-1 mb-3 sm:mb-0">
          <div className="font-semibold text-lg text-text-primary mb-1">
            {schedule.className}
          </div>
          <div className="text-sm text-text-tertiary">
            Son güncelleme: {formatDate(schedule.updatedAt)}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Güncelleme Butonu */}
          <Button type={"success"} size={"md"} onClick={() => {}}>
            Güncelle
          </Button>
          {/* Silme Butonu */}
          <Button type={"danger"} size={"md"} onClick={() => {}}>
            Sil
          </Button>
          <div
            className="ml-2 text-text-secondary transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <CircleChevronDown />
          </div>
        </div>
      </div>

      {/* Accordion İçerik */}
      {open && (
        <div className="bg-bg-tertiary border-t border-bg-quaternary">
          <div className="p-4">
            {/* Mobile görünüm */}
            <div className="block lg:hidden space-y-4">
              {days.map((day) => (
                <div key={day} className="bg-bg-secondary rounded-lg p-3">
                  <h3 className="font-semibold text-text-primary mb-3 text-center border-b border-bg-tertiary pb-2">
                    {dayLabels[day]}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Array.isArray(schedule.schedule?.[day])
                      ? schedule.schedule[day].map((lessonObj, i) => (
                          <div
                            key={i}
                            className="bg-bg-primary rounded p-2 text-center"
                          >
                            <div className="text-xs text-text-tertiary mb-1">
                              {i + 1}. Ders
                            </div>
                            <div className="font-medium text-text-primary text-sm">
                              {lessonLabels[lessonObj.lesson] ||
                                lessonObj.lesson}
                            </div>
                            {lessonObj.teacherName && (
                              <div className="text-xs text-text-secondary mt-1">
                                {lessonObj.teacherName}
                              </div>
                            )}
                          </div>
                        ))
                      : [...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="bg-bg-primary rounded p-2 text-center"
                          >
                            <div className="text-xs text-text-tertiary mb-1">
                              {i + 1}. Ders
                            </div>
                            <div className="text-text-secondary">-</div>
                          </div>
                        ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop tablo görünümü */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full text-sm bg-bg-primary rounded-lg overflow-hidden">
                <thead className="bg-bg-quaternary">
                  <tr>
                    <th className="text-left p-3 font-semibold text-text-primary sticky left-0 bg-bg-quaternary z-10">
                      Gün
                    </th>
                    {[...Array(6)].map((_, i) => (
                      <th
                        key={i}
                        className="text-center p-3 font-semibold text-text-primary"
                      >
                        {i + 1}. Ders
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {days.map((day, dayIndex) => (
                    <tr
                      key={day}
                      className={dayIndex % 2 === 0 ? "bg-bg-secondary/30" : ""}
                    >
                      <td className="font-semibold p-3 text-text-primary sticky left-0 bg-inherit z-10">
                        {dayLabels[day]}
                      </td>
                      {Array.isArray(schedule.schedule?.[day])
                        ? schedule.schedule[day].map((lessonObj, i) => (
                            <td
                              key={i}
                              className="text-center p-3 border-l border-bg-tertiary"
                            >
                              <div className="min-h-[60px] flex flex-col justify-center">
                                <div className="font-medium text-text-primary mb-1">
                                  {lessonLabels[lessonObj.lesson] ||
                                    lessonObj.lesson}
                                </div>
                                {lessonObj.teacherName && (
                                  <div className="text-xs text-text-secondary capitalize">
                                    {lessonObj.teacherName}
                                  </div>
                                )}
                              </div>
                            </td>
                          ))
                        : [...Array(6)].map((_, i) => (
                            <td
                              key={i}
                              className="text-center p-3 border-l border-bg-tertiary"
                            >
                              <div className="min-h-[60px] flex items-center justify-center text-text-tertiary">
                                -
                              </div>
                            </td>
                          ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleCard;

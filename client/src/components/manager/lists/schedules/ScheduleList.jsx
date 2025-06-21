import React, { useEffect, useState } from "react";
import ConfirmModal from "../../../ui/confirmModal";
import Loading from "../../../ui/loading";
import SomeThingWrong from "../../../ui/someThingWrong";
import NoData from "../../../ui/noData";
import Button from "../../../ui/button";
import { Trash2 } from "lucide-react";

// Her günün ders sıralaması farklı ve en az 5 sınıf olacak şekilde mock veri
const mockSchedules = [
  {
    id: "1",
    grade: "5",
    branch: "A",
    schedule: {
      monday: [
        "Matematik",
        "Fen Bilimleri",
        "Türkçe",
        "Sosyal Bilgiler",
        "İngilizce",
      ],
      tuesday: ["Türkçe", "Matematik", "İngilizce", "Fen Bilimleri", "Müzik"],
      wednesday: [
        "Sosyal Bilgiler",
        "Matematik",
        "Beden Eğitimi",
        "Türkçe",
        "Fen Bilimleri",
      ],
      thursday: ["İngilizce", "Matematik", "Fen Bilimleri", "Resim", "Türkçe"],
      friday: [
        "Matematik",
        "Sosyal Bilgiler",
        "Türkçe",
        "Fen Bilimleri",
        "Din Kültürü",
      ],
    },
  },
  {
    id: "2",
    grade: "6",
    branch: "B",
    schedule: {
      monday: ["Fen Bilimleri", "Matematik", "Türkçe", "İngilizce", "Müzik"],
      tuesday: [
        "Matematik",
        "Sosyal Bilgiler",
        "Fen Bilimleri",
        "Türkçe",
        "Beden Eğitimi",
      ],
      wednesday: ["İngilizce", "Matematik", "Türkçe", "Fen Bilimleri", "Resim"],
      thursday: [
        "Türkçe",
        "Fen Bilimleri",
        "Matematik",
        "Sosyal Bilgiler",
        "Din Kültürü",
      ],
      friday: ["Matematik", "Fen Bilimleri", "İngilizce", "Türkçe", "Müzik"],
    },
  },
  {
    id: "3",
    grade: "7",
    branch: "C",
    schedule: {
      monday: [
        "Türkçe",
        "Matematik",
        "Fen Bilimleri",
        "Sosyal Bilgiler",
        "İngilizce",
      ],
      tuesday: [
        "Fen Bilimleri",
        "Matematik",
        "İngilizce",
        "Türkçe",
        "Beden Eğitimi",
      ],
      wednesday: [
        "Matematik",
        "Sosyal Bilgiler",
        "Fen Bilimleri",
        "Resim",
        "Türkçe",
      ],
      thursday: [
        "İngilizce",
        "Fen Bilimleri",
        "Matematik",
        "Türkçe",
        "Din Kültürü",
      ],
      friday: [
        "Matematik",
        "Fen Bilimleri",
        "Türkçe",
        "Sosyal Bilgiler",
        "Müzik",
      ],
    },
  },
  {
    id: "4",
    grade: "8",
    branch: "D",
    schedule: {
      monday: ["Matematik", "Türkçe", "Fen Bilimleri", "İngilizce", "Müzik"],
      tuesday: [
        "Sosyal Bilgiler",
        "Matematik",
        "Fen Bilimleri",
        "Türkçe",
        "Beden Eğitimi",
      ],
      wednesday: ["İngilizce", "Matematik", "Türkçe", "Fen Bilimleri", "Resim"],
      thursday: [
        "Fen Bilimleri",
        "Türkçe",
        "Matematik",
        "Sosyal Bilgiler",
        "Din Kültürü",
      ],
      friday: ["Matematik", "Fen Bilimleri", "İngilizce", "Türkçe", "Müzik"],
    },
  },
  {
    id: "5",
    grade: "9",
    branch: "E",
    schedule: {
      monday: [
        "Matematik",
        "Fen Bilimleri",
        "Türkçe",
        "Sosyal Bilgiler",
        "İngilizce",
      ],
      tuesday: ["Türkçe", "Matematik", "İngilizce", "Fen Bilimleri", "Müzik"],
      wednesday: [
        "Sosyal Bilgiler",
        "Matematik",
        "Beden Eğitimi",
        "Türkçe",
        "Fen Bilimleri",
      ],
      thursday: ["İngilizce", "Matematik", "Fen Bilimleri", "Resim", "Türkçe"],
      friday: [
        "Matematik",
        "Sosyal Bilgiler",
        "Türkçe",
        "Fen Bilimleri",
        "Din Kültürü",
      ],
    },
  },
];

const ScheduleList = ({ search, user }) => {
  const [loading] = useState(false);
  const [error] = useState(null);

  const [scheduleList, _setScheduleList] = useState(mockSchedules);

  const [confirmModal, setConfirmModal] = useState({
    open: false,
    answer: false,
    selectedItemId: "",
  });

  useEffect(() => {
    // Burada veri çekme fonksiyonu olacak
    // Şimdilik boş
  }, []);

  useEffect(() => {
    // Burada silme fonksiyonu olacak
    // Şimdilik boş
  }, [confirmModal]);

  const filteredSchedules = Array.isArray(scheduleList)
    ? scheduleList.filter((item) => {
        if (!search?.trim()) return true;
        const grade = item.grade || "";
        const branch = item.branch || "";
        return (
          grade.toLowerCase().includes(search.toLowerCase().trim()) ||
          branch.toLowerCase().includes(search.toLowerCase().trim())
        );
      })
    : [];

  if (loading) return <Loading />;
  if (error) return <SomeThingWrong err={error} />;
  if (filteredSchedules.length === 0 && !loading && !error) return <NoData />;

  return (
    <div className="w-full h-[500px] bg-bg-tertiary rounded-xl overflow-x-auto overflow-y-auto">
      <div>
        <table className="w-full">
          <thead className="bg-bg-quaternary">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                Sınıf
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                Şube
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                Pazartesi
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                Salı
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                Çarşamba
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                Perşembe
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                Cuma
              </th>
              {user?.position === "principal" && (
                <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                  İşlem
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredSchedules.map((item) => (
              <tr key={item.id} className="text-text-secondary bg-bg-secondary">
                <td className="py-4 px-6">{item.grade || "Sınıf"}</td>
                <td className="py-4 px-6">{item.branch || "Şube"}</td>
                <td className="py-4 px-6">
                  {item.schedule.monday.map((lesson, index) => (
                    <li key={lesson + index}> {lesson}</li>
                  ))}
                </td>
                <td className="py-4 px-6">
                  {item.schedule.tuesday.map((lesson, index) => (
                    <li key={lesson + index}>{lesson}</li>
                  ))}
                </td>
                <td className="py-4 px-6">
                  {item.schedule.wednesday.map((lesson, index) => (
                    <li key={lesson + index}>{lesson}</li>
                  ))}
                </td>
                <td className="py-4 px-6">
                  {item.schedule.thursday.map((lesson, index) => (
                    <li key={lesson + index}>{lesson}</li>
                  ))}
                </td>
                <td className="py-4 px-6">
                  {item.schedule.friday.map((lesson, index) => (
                    <li key={lesson + index}>{lesson}</li>
                  ))}
                </td>
                {user?.position === "principal" && (
                  <td className="py-4 px-6 flex items-center justify-center">
                    <Button
                      onClick={() =>
                        setConfirmModal((prev) => ({
                          ...prev,
                          open: true,
                          selectedItemId: item.id,
                        }))
                      }
                      type={"danger"}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        type={"danger"}
        message={"Silmek istediğinize emin misiniz?"}
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
      />
    </div>
  );
};

export default ScheduleList;

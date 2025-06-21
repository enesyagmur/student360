import React from "react";

const dayMap = {
  monday: "Pazartesi",
  tuesday: "Salı",
  wednesday: "Çarşamba",
  thursday: "Perşembe",
  friday: "Cuma",
  saturday: "Cumartesi",
  sunday: "Pazar",
};

const ScheduleList = ({ schedules, classes }) => {
  return (
    <div className="mt-6">
      {schedules.length === 0 ? (
        <div className="text-center text-slate-400">
          Henüz program eklenmedi.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schedules.map((item) => {
            const className =
              classes.find((c) => c.id === item.classId)?.name || "Sınıf";
            return (
              <div
                key={item.id}
                className="bg-bg-secondary rounded-lg shadow-md p-4 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">{className}</span>
                  <span className="text-sm text-slate-400">
                    {dayMap[item.day]}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-primary">{item.lesson}</span>
                  <span className="text-text-secondary">
                    {item.startTime} - {item.endTime}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ScheduleList;

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeachersThunk } from "../../../../features/teacher/teacherThunk";
import { fetchLessonsThunk } from "../../../../features/lesson/lessonThunk";
import useScheduleFormReducer from "../../../../hooks/useScheduleFormReducer";
import { getClassesThunk } from "../../../../features/class/classThunk";
import { createScheduleThunk } from "../../../../features/schedule/scheduleThunk";

const lessonTimes = [
  "09:00 - 09:50",
  "10:00 - 10:50",
  "11:00 - 11:50",
  "12:00 - 12:50",
  "13:00 - 13:50",
  "14:00 - 14:50",
];

const days = [
  { key: "monday", label: "Pazartesi" },
  { key: "tuesday", label: "Salı" },
  { key: "wednesday", label: "Çarşamba" },
  { key: "thursday", label: "Perşembe" },
  { key: "friday", label: "Cuma" },
];

const NewSchedule = ({ user, setShowAddModal }) => {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classState.classList);
  const teachers = useSelector((state) => state.teacherState.teacherList);
  const lessons = useSelector((state) => state.lessonState.lessonList);

  const [state, dispatchRedux] = useScheduleFormReducer();
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);

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

  useEffect(() => {
    if (user?.id) {
      if (!teachers || teachers.length === 0) {
        dispatch(fetchTeachersThunk(user.id));
      }
      if (!lessons || lessons.length === 0) {
        dispatch(fetchLessonsThunk(user.id));
      }
    }
  }, [dispatchRedux, user?.id, teachers, lessons]);

  const studentClass = state.class;

  //Öğretmen için
  useEffect(() => {
    const filterTeachers = (teachers, studentClass) => {
      if (!studentClass) return [];
      const isMiddle = [5, 6, 7, 8].includes(studentClass.classNumber);
      return teachers.filter(
        (teacher) =>
          teacher.active === true &&
          teacher.weeklyLessonHours < 30 &&
          30 - teacher.weeklyLessonHours >= teacher.minTeacherLessonHour &&
          teacher.level === (isMiddle ? "middle_school" : "high_school")
      );
    };

    const fetchFilteredTeachers = async () => {
      if (!studentClass) {
        setFilteredTeachers([]);
        return;
      }

      // Redux'tan gelen öğretmenler varsa filtrele
      if (teachers && teachers.length > 0) {
        setFilteredTeachers(filterTeachers(teachers, studentClass));
      } else if (user?.id) {
        // Redux'ta yoksa asenkron çek
        const result = await dispatch(fetchTeachersThunk(user.id)).unwrap();
        setFilteredTeachers(filterTeachers(result, studentClass));
      } else {
        setFilteredTeachers([]);
      }
    };

    fetchFilteredTeachers();
  }, [studentClass, teachers, user?.id]);

  // Sınıflar için
  useEffect(() => {
    const fetchFilteredClasses = async () => {
      if (classes && classes.length > 0) {
        setFilteredClasses(classes.filter((cls) => cls.state === true));
      } else if (user?.id) {
        // Redux'ta yoksa asenkron çek
        const result = await dispatch(getClassesThunk(user.id)).unwrap();
        setFilteredClasses(result.filter((cls) => cls.state === true));
      } else {
        setFilteredClasses([]);
      }
    };
    fetchFilteredClasses();
  }, [classes, user?.id]);

  // Dersler için
  useEffect(() => {
    const fetchFilteredLessons = async () => {
      if (studentClass && lessons && lessons.length > 0) {
        if (studentClass.classNumber < 9) {
          setFilteredLessons(
            lessons.filter(
              (lesson) =>
                lesson.active === true && lesson.level === "middle_school"
            )
          );
        } else {
          setFilteredLessons(
            lessons.filter(
              (lesson) =>
                lesson.active === true && lesson.level === "high_school"
            )
          );
        }
      } else if (studentClass && user?.id) {
        // Redux'ta yoksa asenkron çek
        let result = [];
        if (studentClass.classNumber < 9) {
          const lessonList = await dispatch(
            fetchLessonsThunk(user.id)
          ).unwrap();
          result = lessonList.filter(
            (lesson) => lesson.level === "middle_school"
          );
        } else {
          const lessonList = await dispatch(
            fetchLessonsThunk(user.id)
          ).unwrap();
          result = lessonList.filter(
            (lesson) => lesson.level === "high_school"
          );
        }
        setFilteredLessons(result.filter((lesson) => lesson.active === true));
      } else {
        setFilteredLessons([]);
      }
    };
    fetchFilteredLessons();
  }, [studentClass, lessons, user?.id]);

  const handleClassChange = (e) => {
    const selected = filteredClasses.find((cls) => cls.id === e.target.value);
    dispatchRedux({ type: "SET_CLASS", value: selected || {} });
  };

  const handleLessonChange = (day, hourId, value) => {
    dispatchRedux({ type: "SET_LESSON", day, hourId, lesson: value });
  };

  const handleTeacherChange = (day, hourId, value) => {
    dispatchRedux({ type: "SET_TEACHER", day, hourId, teacherId: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user?.id) {
        throw new Error(
          "SCHEDULE FORM | Schedule oluştururken sorun: userId eksik"
        );
      }
      const data = {
        classId: state.class.id,
        className: state.class.className,
        schedule: state.schedule,
        currentUserId: user.id,
      };
      await dispatch(createScheduleThunk(data)).unwrap();
      dispatchRedux({ type: "RESET_STATE" });
      setShowAddModal(false);
    } catch (err) {
      throw new Error(err);
    }
  };

  // console.log(state);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 overflow-y">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl bg-bg-primary rounded-xl shadow-xl flex flex-col"
        style={{ maxHeight: "90vh" }}
      >
        {/* Başlık */}
        <div className="bg-color-accent px-6 py-4 rounded-t-xl border-b border-bg-quaternary">
          <h3 className="text-xl font-semibold text-white">
            Haftalık Ders Programı Oluştur
          </h3>
        </div>

        {/* İçerik */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Sınıf Seçimi */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Sınıf
            </label>
            <select
              value={state.class?.id || ""}
              onChange={handleClassChange}
              className="w-full bg-bg-secondary uppercase border border-bg-quaternary rounded-lg px-4 py-2 text-text-primary focus:ring-2 focus:ring-color-accent focus:border-color-accent"
            >
              <option value="">Sınıf seçin</option>
              {filteredClasses?.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {`${cls.classNumber} - ${cls.classChar}`}
                </option>
              ))}
            </select>
            {state.errors.class && (
              <p className="mt-1 text-sm text-color-danger">
                {state.errors.class}
              </p>
            )}
          </div>

          {/* Ders Programı Tablosu */}
          {state.class?.id && (
            <div className="mb-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-bg-quaternary">
                <thead className="bg-bg-tertiary sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Ders Saati
                    </th>
                    {days.map((day) => (
                      <th
                        key={day.key}
                        className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider"
                      >
                        {day.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-bg-primary divide-y divide-bg-quaternary">
                  {lessonTimes.map((time, hourIdx) => (
                    <tr key={hourIdx}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-text-primary">
                        {time}
                      </td>
                      {days.map((day) => (
                        <td key={day.key} className="px-4 py-3">
                          <div className="space-y-2">
                            <select
                              value={
                                state.schedule[day.key][hourIdx]?.lesson || ""
                              }
                              onChange={(e) =>
                                handleLessonChange(
                                  day.key,
                                  hourIdx,
                                  e.target.value
                                )
                              }
                              className="block w-full bg-bg-secondary border border-bg-quaternary rounded-md px-3 py-1 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-color-accent"
                            >
                              <option value="">Ders seç</option>
                              {filteredLessons.map((l) => (
                                <option key={l.id} value={l.name}>
                                  {lessonConvertToTurkish(l.name)}
                                </option>
                              ))}
                            </select>
                            {state.schedule[day.key][hourIdx]?.lesson !==
                              "" && (
                              <select
                                value={
                                  state.schedule[day.key][hourIdx]?.teacherId ||
                                  ""
                                }
                                onChange={(e) =>
                                  handleTeacherChange(
                                    day.key,
                                    hourIdx,
                                    e.target.value
                                  )
                                }
                                className="block w-full capitalize bg-bg-secondary border border-bg-quaternary rounded-md px-3 py-1 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-color-accent"
                              >
                                <option value="">Öğretmen seç</option>
                                {filteredTeachers
                                  .filter(
                                    (t) =>
                                      t.position ===
                                        (state.schedule[day.key][hourIdx]
                                          ?.lesson || "") &&
                                      (t.schedule?.[day.key]?.[hourIdx] ??
                                        "") === ""
                                  )
                                  .map((t) => (
                                    <option key={t.id} value={t.id}>
                                      {t.fullName}
                                    </option>
                                  ))}
                              </select>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {state.errors.schedule && (
                <p className="mt-2 text-sm text-color-danger">
                  {state.errors.schedule}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Butonlar */}
        <div className="bg-bg-tertiary px-6  py-2 border-t border-bg-quaternary rounded-b-xl flex item-center justify-end space-x-3">
          {state.class?.id && (
            <div className="md:w-8/12 mr-auto  flex flex-col justify-center">
              <h2 className="text-base font-semibold text-text-primary mb-1">
                Derslerin Haftalık Saat Dağılımları
              </h2>
              <div className="w-full text-sm text-text-secondary bg-bg-secondary rounded p-3 shadow-sm mb-2">
                {state?.class.classNumber < 9 ? (
                  <>
                    <span className=" mb-1">
                      <b>Türkçe:</b> 4, <b>Matematik:</b> 5,{" "}
                      <b>Fen Bilimleri:</b> 4, <b>Sosyal Bilgiler:</b> 4,
                    </span>
                    <span className=" mb-1">
                      <b>İngilizce:</b> 4, <b>Din Kültürü:</b> 1,{" "}
                      <b>Beden Eğitimi:</b> 2, <b>Bilgisayar Bilimleri:</b> 2,
                    </span>
                    <span className=" mb-1">
                      <b>Teknoloji ve Tasarım:</b> 2, <b>Görsel Sanatlar:</b> 1,{" "}
                      <b>Müzik:</b> 1
                    </span>
                  </>
                ) : (
                  <>
                    <span className=" mb-1">
                      <b>Türkçe:</b> 4, <b>Matematik:</b> 4, <b>Fizik:</b> 4,{" "}
                      <b>Kimya:</b> 2, <b>Biyoloji:</b> 2,
                    </span>
                    <span className="mb-1">
                      <b>Tarih:</b> 2, <b>Coğrafya:</b> 2, <b>İngilizce:</b> 4,{" "}
                      <b>Almanca:</b> 2,
                    </span>
                    <span className=" mb-1">
                      <b>Felsefe:</b> 2, <b>Din Kültürü:</b> 2
                    </span>
                  </>
                )}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowAddModal(false)}
            className="px-6 h-12 my-auto border border-bg-quaternary rounded-md shadow-sm text-sm font-medium text-text-secondary bg-bg-primary hover:bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-color-accent"
          >
            Vazgeç
          </button>
          <button
            type="submit"
            className="px-6 h-12 my-auto border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-color-accent hover:bg-color-accent-light focus:outline-none focus:ring-2 focus:ring-color-accent"
            disabled={state.isSubmitting}
          >
            {state.isSubmitting ? (
              <span className="flex items-center justify-center">
                Kaydediliyor...
              </span>
            ) : (
              "Kaydet"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewSchedule;

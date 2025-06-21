import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import scheduleSchema from "../../../../lib/validation/scheduleSchema";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeachersThunk } from "../../../../features/teacher/teacherThunk";
import { fetchLessonsThunk } from "../../../../features/lesson/lessonThunk";

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

const defaultTable = days.reduce((acc, day) => {
  acc[day.key] = Array(lessonTimes.length)
    .fill(0)
    .map(() => ({ lessonId: "", teacherId: "" }));
  return acc;
}, {});

const NewSchedule = ({ user, setShowAddModal }) => {
  const dispatch = useDispatch();

  const classes = useSelector((state) => state.classState.classList);
  const teachers = useSelector((state) => state.teacherState.teacherList);
  const lessons = useSelector((state) => state.lessonState.lessonList);

  const defaultValues = {
    classId: "",
    table: defaultTable,
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(scheduleSchema),
    defaultValues,
  });

  const table = watch("table");

  useEffect(() => {
    if (user?.id) {
      if (!teachers || teachers.length === 0) {
        dispatch(fetchTeachersThunk(user.id));
      }
      if (!lessons || lessons.length === 0) {
        dispatch(fetchLessonsThunk(user.id));
      }
    }
  }, [dispatch, user?.id, teachers, lessons]);

  const handleSelectChange = (day, idx, field, value) => {
    const updated = [...table[day]];
    updated[idx] = { ...updated[idx], [field]: value };
    setValue(`table.${day}`, updated, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
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
              {...register("classId")}
              className="w-full bg-bg-secondary border border-bg-quaternary rounded-lg px-4 py-2 text-text-primary focus:ring-2 focus:ring-color-accent focus:border-color-accent"
            >
              <option value="">Sınıf seçin</option>
              {classes?.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name || `${cls.classNumber} - ${cls.classChar}`}
                </option>
              ))}
            </select>
            {errors.classId && (
              <p className="mt-1 text-sm text-color-danger">
                {errors.classId.message}
              </p>
            )}
          </div>

          {/* Ders Programı Tablosu */}
          <div className="mb-6">
            <div className="border border-bg-quaternary rounded-lg overflow-hidden">
              <div className="overflow-auto" style={{ maxHeight: "50vh" }}>
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
                    {lessonTimes.map((time, idx) => (
                      <tr key={idx} className="">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-text-primary">
                          {time}
                        </td>
                        {days.map((day) => (
                          <td
                            key={day.key}
                            className="px-4 py-3 cursor-pointer rounded-lg hover:bg-text-tertiary transition"
                          >
                            <div className="space-y-2">
                              <select
                                value={table?.[day.key]?.[idx]?.lessonId || ""}
                                onChange={(e) =>
                                  handleSelectChange(
                                    day.key,
                                    idx,
                                    "lessonId",
                                    e.target.value
                                  )
                                }
                                className="block w-full bg-bg-secondary border border-bg-quaternary rounded-md px-3 py-1 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-color-accent"
                              >
                                <option value="">Ders seç</option>
                                {lessons?.map((l) => (
                                  <option key={l.id} value={l.id}>
                                    {l.name}
                                  </option>
                                ))}
                              </select>
                              <select
                                value={table?.[day.key]?.[idx]?.teacherId || ""}
                                onChange={(e) =>
                                  handleSelectChange(
                                    day.key,
                                    idx,
                                    "teacherId",
                                    e.target.value
                                  )
                                }
                                className="block w-full bg-bg-secondary border border-bg-quaternary rounded-md px-3 py-1 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-color-accent"
                              >
                                <option value="">Öğretmen seç</option>
                                {teachers?.map((t) => (
                                  <option key={t.id} value={t.id}>
                                    {t.fullName || t.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {errors.table && (
              <p className="mt-2 text-sm text-color-danger">
                {errors.table.message}
              </p>
            )}
          </div>
        </div>

        {/* Butonlar */}
        <div className="bg-bg-tertiary px-6 py-4 border-t border-bg-quaternary rounded-b-xl flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setShowAddModal(false)}
            className="px-4 py-2 border border-bg-quaternary rounded-md shadow-sm text-sm font-medium text-text-secondary bg-bg-primary hover:bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-color-accent"
          >
            Vazgeç
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-color-accent hover:bg-color-accent-light focus:outline-none focus:ring-2 focus:ring-color-accent"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
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

import React, { useEffect, useState } from "react";
import { Search, Plus, X } from "lucide-react";
import ExamList from "../../components/manager/lists/exams/ExamList";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import examSchema from "../../lib/validation/examSchema";
import { getCurrentUser } from "../../features/auth/authService";
import { useSelector, useDispatch } from "react-redux";
import { fetchLessonsThunk } from "../../features/lesson/lessonThunk";
import { createExamThunk } from "../../features/exam/examThunk";

const ExamManagementPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  const { lessonList = [], loading } = useSelector(
    (state) => state.lessonState
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(examSchema),
  });

  const selectedLessonId = watch("lessonId");

  useEffect(() => {
    const userData = getCurrentUser();
    if (userData) {
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    const takeLessons = async () => {
      try {
        if (!user?.id) return;
        await dispatch(fetchLessonsThunk(user.id)).unwrap();
      } catch (err) {
        console.error("LESSONLIST | Dersleri çekerken sorun: ", err);
      }
    };

    if (user?.id && Array.isArray(lessonList) && lessonList.length === 0) {
      takeLessons();
    }
  }, [dispatch, user, lessonList]);

  const onSubmit = (data) => {
    try {
      if (!user?.id) {
        throw new Error(
          "PAGE | Sınav oluşturma işleminde sorun: ManagerId eksik"
        );
      }

      const selectedLesson = lessonList.find(
        (lesson) => String(lesson.lessonId) === String(selectedLessonId)
      );

      const newExam = {
        ...data,
        lessonName: selectedLesson ? selectedLesson.name : "",
        creatorName: user.fullName,
        examDate: data.examDate,
        examTime: data.examTime,
      };

      const newdata = {
        examData: newExam,
        managerId: user.id,
      };

      dispatch(createExamThunk(newdata)).unwrap();

      reset();
      setShowAddModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto h-full bg-bg-primary text-text-primary px-2 sm:px-4 md:px-8 py-4">
      {/* Header */}
      <div className="bg-bg-tertiary border-b border-bg-quaternary p-4 sm:p-6 my-4 rounded-lg shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold mb-2 text-text-primary">
              Sınavlar
            </h1>
            <p className="text-text-tertiary">
              Sınavları oluşturun, arayın ve yönetin
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full lg:w-auto">
            {/* Arama Kutusu */}
            <div className="relative flex-1 lg:flex-none lg:w-80 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-5 h-5" />
              <input
                type="text"
                placeholder="Sınav ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-bg-secondary border border-bg-tertiary rounded-lg pl-10 pr-4 py-3 text-text-secondary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-color-accent focus:border-transparent transition"
              />
              <X
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-5 h-5 cursor-pointer ${
                  search !== "" ? "flex" : "hidden"
                }`}
                onClick={() => setSearch("")}
              />
            </div>
            {/* Yeni Sınav Ekle Butonu */}
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-color-accent text-white rounded-lg shadow-md px-4 py-2 transition hover:bg-color-accent-light"
            >
              <Plus className="w-5 h-5" />
              Yeni Sınav Ekle
            </button>
          </div>
        </div>
      </div>

      {/* Sınav Listesi */}
      <ExamList search={search} user={user} />

      {/* Yeni Sınav Ekleme Modalı */}
      {showAddModal && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="fixed inset-0 bg-bg-primary/70 dark:bg-bg-primary/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50"
        >
          <div className="bg-bg-primary rounded-lg shadow-md p-4 sm:p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-text-primary">
                Yeni Sınav Ekle
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  reset();
                }}
                className="text-text-tertiary hover:text-text-primary transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* YATAY BÖLÜNMÜŞ FORM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sol Bölüm */}
              <div className="space-y-4">
                {/* Başlık */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Başlık
                  </label>
                  <input
                    {...register("title")}
                    type="text"
                    className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-color-accent"
                    placeholder="Sınav başlığı"
                  />
                  {errors.title && (
                    <p className="text-color-danger text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                {/* Dönem */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Dönem
                  </label>
                  <select
                    {...register("term")}
                    className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-color-accent"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Seçiniz
                    </option>
                    <option value={1}>1. Dönem</option>
                    <option value={2}>2. Dönem</option>
                  </select>
                  {errors.term && (
                    <p className="text-color-danger text-sm mt-1">
                      {errors.term.message}
                    </p>
                  )}
                </div>
                {/* Ders */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Ders
                  </label>
                  <select
                    {...register("lessonId")}
                    className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-color-accent"
                  >
                    <option value="" disabled>
                      Seçiniz
                    </option>
                    {lessonList &&
                      lessonList.map((lesson) => (
                        <option key={lesson.lessonId} value={lesson.lessonId}>
                          {lesson.name}
                        </option>
                      ))}
                  </select>
                  <input type="hidden" {...register("lessonName")} />
                  {loading && <p>Dersler yükleniyor...</p>}
                  {errors.lessonId && (
                    <p className="text-color-danger text-sm mt-1">
                      {errors.lessonId.message}
                    </p>
                  )}
                </div>
                {/* Sınıf */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Sınıf
                  </label>
                  <input
                    {...register("grade")}
                    type="number"
                    className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-color-accent"
                    placeholder="Sınıf (örn: 5)"
                  />
                  {errors.grade && (
                    <p className="text-color-danger text-sm mt-1">
                      {errors.grade.message}
                    </p>
                  )}
                </div>
                {/* Aktiflik */}
                <div className="flex items-center gap-2 mt-4">
                  <input
                    {...register("active")}
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-color-accent rounded"
                    defaultChecked
                  />
                  <span className="text-text-secondary">Yayınla</span>
                  {errors.active && (
                    <p className="text-color-danger text-sm mt-1">
                      {errors.active.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Sağ Bölüm */}
              <div className="space-y-4">
                {/* Sınav Tarihi */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Sınav Tarihi
                  </label>
                  <input
                    {...register("examDate")}
                    type="date"
                    className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-color-accent"
                  />
                  {errors.examDate && (
                    <p className="text-color-danger text-sm mt-1">
                      {errors.examDate.message}
                    </p>
                  )}
                </div>
                {/* Sınav Saati */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Sınav Saati
                  </label>
                  <input
                    {...register("examTime")}
                    type="time"
                    className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-color-accent"
                  />
                  {errors.examTime && (
                    <p className="text-color-danger text-sm mt-1">
                      {errors.examTime.message}
                    </p>
                  )}
                </div>
                {/* Açıklama */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Açıklama
                  </label>
                  <textarea
                    {...register("description")}
                    rows={6}
                    className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-color-accent"
                    placeholder="Açıklama (isteğe bağlı)"
                  />
                  {errors.description && (
                    <p className="text-color-danger text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  reset();
                }}
                className="flex-1 bg-text-secondary hover:bg-text-primary text-bg-primary py-2 px-4 rounded-lg transition"
              >
                İptal
              </button>
              <button
                type="submit"
                className="flex-1 bg-color-accent hover:bg-color-accent-light text-white py-2 px-4 rounded-lg transition"
              >
                Oluştur
              </button>
            </div>
            {Object.keys(errors).length > 0 && (
              <div className="text-red-500 mt-2">
                Lütfen tüm zorunlu alanları doldurun.
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default ExamManagementPage;

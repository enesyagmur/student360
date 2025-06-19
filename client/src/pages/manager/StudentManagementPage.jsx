import React, { useState, useEffect } from "react";
import { Search, X, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../../components/ui/button";
import { getCurrentUser } from "../../features/auth/authService";
import {
  addNewStudentThunk,
  fetchStudentsThunk,
} from "../../features/student/studentThunk";
import StudentList from "../../components/manager/lists/StudentList";
import { studentSchema } from "../../lib/validation/studentFormSchema";
import { getClassesThunk } from "../../features/class/classThunk";

const StudentManagementPage = () => {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const [classes, setClasses] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(studentSchema),
  });
  const grade = watch("grade");

  // LocalStorage'dan kullanıcı bilgisini al
  useEffect(() => {
    const userData = getCurrentUser();
    if (userData) {
      setUser(userData);

      dispatch(fetchStudentsThunk(userData.id));
    }
  }, [dispatch]);

  //sınıf seçimine göre uygun olan şubeleri alma
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const result = await dispatch(getClassesThunk(user.id)).unwrap();

        if (result) {
          const filteredClasses = result
            .filter((item) => item.classNumber === Number(grade))
            .filter((element) => element.currentStudentNumber < 25)
            .sort((a, b) => a.classChar.localeCompare(b.classChar));
          setClasses(filteredClasses);
        }
      } catch (err) {
        throw new Error(`Sınıfları çekerken sorun: ${err}`);
      }
    };

    if (grade !== 0 && user && user.id) {
      fetchClasses();
    }
  }, [dispatch, user, grade]);

  const onSubmit = async (data) => {
    try {
      if (!user?.id) {
        console.error("Kullanıcı ID'si bulunamadı");
        return;
      }

      const newData = {
        ...data,
        role: "student",
      };

      await dispatch(
        addNewStudentThunk({ studentData: newData, currentUserId: user.id })
      ).unwrap();
      reset();
      setShowAddModal(false);
    } catch (err) {
      console.error("Öğrenci oluşturulurken bir hata oluştu:", err);
    }
  };

  return (
    <div className="flex-1 w-11/12 h-full bg-bg-primary text-text-primary">
      {/* Üst Başlık Bölümü */}
      <div className="bg-bg-tertiary border-b border-bg-quaternary p-6 my-4 rounded-lg">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Sol Taraf - Başlık ve Açıklama */}
          <div>
            <h1 className="text-2xl font-semibold mb-2">Öğrenciler</h1>
            <p className="text-slate-400">
              Öğrencileri görüntüleyin ve yönetin
            </p>
          </div>

          {/* Sağ Taraf - Arama ve Ekleme Butonu */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full lg:w-auto">
            {/* Arama Kutusu */}
            <div className="relative flex-1 lg:flex-none lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-5 h-5" />
              <input
                type="text"
                placeholder="Öğrenci ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-bg-secondary border border-bg-tertiary rounded-lg pl-10 pr-4 py-3 text-text-secondary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <X
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-5 h-5 cursor-pointer ${
                  search !== "" ? "flex" : "hidden"
                }`}
                onClick={() => setSearch("")}
              />
            </div>

            {/* Yeni Öğrenci Ekleme Butonu */}
            <Button
              onClick={() => setShowAddModal(true)}
              type={"primary"}
              size={"lg"}
            >
              <Plus className="w-5 h-5 mr-2" />
              Yeni Öğrenci Ekle
            </Button>
          </div>
        </div>
      </div>

      {/* Öğrenci Listesi */}
      <StudentList search={search} user={user} />

      {/* Yeni Öğrenci Ekleme Modalı */}
      {showAddModal && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <div className="bg-bg-primary rounded-xl p-6 w-full max-w-2xl shadow-xl">
            {/* Modal Başlık ve Kapatma Butonu */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-text-primary">
                Yeni Öğrenci Ekle
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-text-tertiary hover:text-text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sol Kolon */}
              <div className="space-y-4">
                {/* Ad Soyad */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    className="w-full bg-bg-secondary rounded-lg px-4 py-2.5 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-bg-tertiary"
                    placeholder="Öğrenci adı ve soyadı"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* TC Kimlik No */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    TC Kimlik No
                  </label>
                  <input
                    type="text"
                    {...register("tc")}
                    maxLength={11}
                    className="w-full bg-bg-secondary rounded-lg px-4 py-2.5 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-bg-tertiary"
                    placeholder="11 haneli TC kimlik numarası"
                  />
                  {errors.tc && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.tc.message}
                    </p>
                  )}
                </div>

                {/* Doğum Tarihi */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Doğum Tarihi
                  </label>
                  <input
                    type="text"
                    {...register("birthDate")}
                    className="w-full bg-bg-secondary rounded-lg px-4 py-2.5 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-bg-tertiary"
                    placeholder="GG/AA/YYYY"
                    maxLength={10}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      if (value.length > 0) {
                        if (value.length > 2) {
                          value = value.slice(0, 2) + "/" + value.slice(2);
                        }
                        if (value.length > 5) {
                          value = value.slice(0, 5) + "/" + value.slice(5);
                        }
                      }
                      e.target.value = value;
                    }}
                  />
                  {errors.birthDate && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.birthDate.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full bg-bg-secondary rounded-lg px-4 py-2.5 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-bg-tertiary"
                    placeholder="Öğrenci email adresi"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Sağ Kolon */}
              <div className="space-y-4">
                {/* Telefon */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Telefon
                  </label>
                  <input
                    type="text"
                    {...register("phone")}
                    maxLength={10}
                    className="w-full bg-bg-secondary rounded-lg px-4 py-2.5 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-bg-tertiary"
                    placeholder="10 haneli telefon numarası"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Durum */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Durum
                  </label>
                  <select
                    {...register("active")}
                    className="w-full bg-bg-secondary rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 border border-bg-tertiary"
                  >
                    <option value="true">Aktif</option>
                    <option value="false">Pasif</option>
                  </select>
                  {errors.active && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.active.message}
                    </p>
                  )}
                </div>

                {/* Sınıf Seçimi */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Sınıf
                  </label>
                  <select
                    {...register("grade")}
                    className="w-full bg-bg-secondary rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 border border-bg-tertiary"
                  >
                    <option value="">Sınıf Seçiniz</option>
                    {[5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}. Sınıf
                      </option>
                    ))}
                  </select>
                  {errors.grade && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.grade.message}
                    </p>
                  )}
                </div>

                {/* Şube Seçimi */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Şube
                  </label>
                  <select
                    {...register("branch")}
                    className="w-full bg-bg-secondary capitalize rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 border border-bg-tertiary"
                  >
                    <option value="">Şube Seçiniz</option>
                    {classes.map((item) => (
                      <option
                        className="capitalize"
                        key={item.id}
                        value={item.classChar}
                      >
                        {item.classChar} Şubesi
                      </option>
                    ))}
                  </select>
                  {errors.branch && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.branch.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Alt Butonları */}
            <div className="flex gap-3 mt-8">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-bg-secondary hover:bg-bg-tertiary text-text-primary py-3 px-4 rounded-lg transition-colors border border-bg-tertiary"
              >
                İptal
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg transition-colors"
              >
                Öğrenci Ekle
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default StudentManagementPage;

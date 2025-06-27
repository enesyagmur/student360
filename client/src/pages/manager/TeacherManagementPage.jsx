import { useState, useEffect } from "react";
import TeacherList from "../../components/manager/lists/teachers/TeacherList";
import { yupResolver } from "@hookform/resolvers/yup";
import { teacherSchema } from "../../lib/validation/teacherFormSchema";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addNewTeacherThunk } from "../../features/teacher/teacherThunk";
import { getCurrentUser } from "../../features/auth/authService";
import PageHeader from "../../components/ui/pageHeader";

const TeacherManagementPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  // LocalStorage'dan kullanıcı bilgisini al
  useEffect(() => {
    const userData = getCurrentUser();
    if (userData) {
      setUser(userData);
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(teacherSchema),
  });

  const level = watch("level");

  const onSubmit = async (data) => {
    try {
      if (!user?.id) {
        console.error("Kullanıcı ID'si bulunamadı");
        return;
      }

      const newTeacherData = {
        ...data,
        role: "teacher",
      };

      const fullData = {
        newTeacherData,
        currentUserId: user.id,
      };
      const teacher = await dispatch(addNewTeacherThunk(fullData)).unwrap();

      if (teacher) {
        reset();
        setShowAddModal(false);
      }
    } catch (err) {
      console.error(
        "Teacher Management Page | Öğretmen oluşturulurken sorun ",
        err
      );
    }
  };

  return (
    <div className="flex-1 w-11/12 h-full bg-bg-primary text-text-primary">
      {/* Header */}
      <PageHeader
        title={"Öğretmen Yönetimi"}
        search={search}
        setSearch={setSearch}
        setShowAddModal={setShowAddModal}
      />

      {/* Teacher List */}
      <TeacherList search={search} user={user} />

      {/* Add Teacher Modal */}
      {showAddModal && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="fixed inset-0 bg-bg-primary/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <div className="bg-bg-primary rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              Yeni Öğretmen Ekle
            </h3>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Sol Bölüm */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm  font-medium text-text-secondary mb-1">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    className="w-full bg-bg-secondary capitalize rounded-lg px-3 py-2 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Öğretmen adı ve soyadı"
                  />
                  {errors.fullName && (
                    <p className="text-color-danger">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm  font-medium text-text-secondary mb-1">
                    Kimlik Numarası
                  </label>
                  <input
                    type="number"
                    {...register("tc")}
                    className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="TC numarası"
                  />
                  {errors.tc && (
                    <p className="text-color-danger">{errors.tc.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    E-posta
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ornek@ogrenci360.com"
                  />
                  {errors.email && (
                    <p className="text-color-danger">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    {...register("phone")}
                    className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+90 5XX XXX XX XX"
                  />
                  {errors.phone && (
                    <p className="text-color-danger">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Sağ Bölüm */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Düzey
                  </label>
                  <select
                    {...register("level")}
                    className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Düzey seçin</option>
                    <option value="middle_school">Ortaokul</option>
                    <option value="high_school">Lise</option>
                  </select>
                  {errors.level && (
                    <p className="text-color-danger">{errors.level.message}</p>
                  )}
                </div>

                {level === "middle_school" ? (
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Branş
                    </label>
                    <select
                      {...register("position")}
                      className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Branş seçin</option>
                      <option value="mathematics">Matematik</option>
                      <option value="science">Fen Bilimleri</option>
                      <option value="technology_design">
                        Teknoloji Tasarım
                      </option>
                      <option value="turkish">Türkçe</option>
                      <option value="english">İngilizce</option>
                      <option value="social_sciences">Sosyal Bilgiler</option>
                      <option value="physical_education">Beden Eğitimi</option>
                      <option value="music">Müzik</option>
                      <option value="art">Resim</option>
                      <option value="religion">Din Kültürü</option>
                      <option value="computer_science">
                        Bilgisayar Teknolojileri
                      </option>
                    </select>
                    {errors.position && (
                      <p className="text-color-danger">
                        {errors.position.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Branş
                    </label>
                    <select
                      {...register("position")}
                      className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Branş seçin</option>
                      <option value="mathematics">Matematik</option>
                      <option value="physics">Fizik</option>
                      <option value="chemistry">Kimya</option>
                      <option value="biology">Biyoloji</option>
                      <option value="turkish">Türk Dili ve Edebiyatı</option>
                      <option value="english">İngilizce</option>
                      <option value="german">Almanca</option>

                      <option value="history">Tarih</option>
                      <option value="geography">Coğrafya</option>
                      <option value="religion">
                        Din Kültürü ve Ahlak Bilgisi
                      </option>
                      <option value="philosophy">Felsefe</option>
                    </select>
                    {errors.position && (
                      <p className="text-color-danger">
                        {errors.position.message}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Durum
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        value="true"
                        defaultChecked
                        {...register("active")}
                        className="accent-blue-600"
                      />
                      <span>Aktif</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        value="false"
                        {...register("active")}
                        className="accent-blue-600"
                      />
                      <span>Pasif</span>
                    </label>
                  </div>
                  {errors.active && (
                    <p className="text-color-danger">{errors.active.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                type="button"
                className="flex-1 bg-text-secondary hover:bg-text-primary text-bg-primary py-2 px-4 rounded-lg transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Ekle
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default TeacherManagementPage;

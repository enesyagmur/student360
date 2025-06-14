import React, { useState, useEffect } from "react";
import { Search, Plus, X } from "lucide-react";
import TeacherList from "../../components/manager/lists/TeacherList";
import { yupResolver } from "@hookform/resolvers/yup";
import { teacherSchema } from "../../lib/validation/teacherFormSchema";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addNewTeacherThunk } from "../../features/teacher/teacherThunk";
import Button from "../../components/ui/button";
import { getCurrentUser } from "../../features/auth/authService";

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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(teacherSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (!user?.id) {
        console.error("Kullanıcı ID'si bulunamadı");
        return;
      }

      const newData = {
        ...data,
        role: "teacher",
      };
      const teacher = await dispatch(addNewTeacherThunk(newData)).unwrap();

      if (teacher) {
        reset();
        setShowAddModal(false);
        // Yeni öğretmen eklendikten sonra listeyi güncelle
        dispatch(
          fetchTeachersByRoleThunk({
            role: "teacher",
            currentUserId: user.id,
          })
        );
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
      <div className="bg-bg-tertiary border-b border-bg-quaternary p-6 my-4 rounded-lg">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Left side - Title and description */}
          <div>
            <h1 className="text-2xl font-semibold mb-2">Öğretmenler</h1>
            <p className="text-slate-400">
              Öğretmenleri görüntüleyin ve yönetin
            </p>
          </div>

          {/* Right side - Search and Add Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full lg:w-auto">
            {/* Search */}
            <div className="relative flex-1 lg:flex-none lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-5 h-5" />
              <input
                type="text"
                placeholder="Öğretmen ara..."
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

            {/* Add Button */}
            <Button
              onClick={() => setShowAddModal(true)}
              type={"primary"}
              size={"lg"}
            >
              <Plus className="w-5 h-5 mr-2" />
              Yeni Öğretmen Ekle
            </Button>
          </div>
        </div>
      </div>

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

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  {...register("fullName")}
                  className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Öğretmen adı ve soyadı"
                />
                {errors.fullName && (
                  <p className="text-color-danger">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
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

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Branş
                </label>
                <select
                  {...register("position")}
                  className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Branş seçin</option>
                  <option value="matematik">Matematik</option>
                  <option value="fizik">Fizik</option>
                  <option value="kimya">Kimya</option>
                  <option value="biyoloji">Biyoloji</option>
                  <option value="turkce">Türkçe</option>
                  <option value="ingilizce">İngilizce</option>
                  <option value="tarih">Tarih</option>
                  <option value="cografya">Coğrafya</option>
                  <option value="beden">Beden Eğitimi</option>
                  <option value="muzik">Müzik</option>
                  <option value="resim">Resim</option>
                  <option value="din">Din Kültürü</option>
                  <option value="felsefe">Felsefe</option>
                  <option value="bilgisayar">Bilgisayar</option>
                </select>
                {errors.position && (
                  <p className="text-color-danger">{errors.position.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
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

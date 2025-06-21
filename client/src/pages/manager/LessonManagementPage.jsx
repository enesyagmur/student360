import React, { useState, useEffect } from "react";
import { Search, Plus, X } from "lucide-react";
import LessonList from "../../components/manager/lists/LessonList";
import { yupResolver } from "@hookform/resolvers/yup";
import { lessonSchema } from "../../lib/validation/lessonSchema";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createLessonThunk } from "../../features/lesson/lessonThunk";
import Button from "../../components/ui/button";
import { getCurrentUser } from "../../features/auth/authService";
import PageHeader from "../../components/ui/pageHeader";

const LessonManagementPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

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
    resolver: yupResolver(lessonSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (!user?.id) {
        console.error("Kullanıcı ID'si bulunamadı");
        return;
      }

      const newData = {
        lessonData: data,
        currentUserId: user.id,
      };

      await dispatch(createLessonThunk(newData)).unwrap();

      reset();
      setShowAddModal(false);
    } catch (err) {
      console.error("PAGE | Ders oluşturulurken bir hata oluştu ", err);
    }
  };

  return (
    <div className="flex-1 w-11/12 h-full bg-bg-primary text-text-primary">
      {/* Header */}
      <PageHeader
        title={"Ders Yönetimi"}
        search={search}
        setSearch={setSearch}
        setShowAddModal={setShowAddModal}
      />

      {/* Ders Listesi Bileşeni */}
      <LessonList search={search} user={user} />

      {/* Yeni Ders Ekleme Modalı */}
      {showAddModal && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="fixed inset-0 bg-bg-primary/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <div className="bg-bg-primary rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              Yeni Ders Ekle
            </h3>

            <div className="space-y-4">
              {/* Ders Adı Alanı */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Ders Adı
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ders adı"
                />
                {errors.name && (
                  <p className="text-color-danger">{errors.name.message}</p>
                )}
              </div>

              {/* Kredi Alanı */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Kredi
                </label>
                <input
                  type="number"
                  {...register("credit")}
                  className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ders kredisi"
                />
                {errors.credit && (
                  <p className="text-color-danger">{errors.credit.message}</p>
                )}
              </div>

              {/* Aktiflik Durumu */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Durum
                </label>
                <select
                  {...register("isActive")}
                  className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="true">Aktif</option>
                  <option value="false">Pasif</option>
                </select>
                {errors.isActive && (
                  <p className="text-color-danger">{errors.isActive.message}</p>
                )}
              </div>
            </div>

            {/* Modal Alt Butonları */}
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

export default LessonManagementPage;

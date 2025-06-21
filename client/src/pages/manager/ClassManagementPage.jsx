import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { classSchema } from "../../lib/validation/classSchema";
import { createClassThunk } from "../../features/class/classThunk";
import ClassList from "../../components/manager/lists/ClassList";
import PageHeader from "../../components/ui/pageHeader";
import { getCurrentUser } from "../../features/auth/authService";

const ClassManagementPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      console.error("Kullanıcı bilgisi bulunamadı");
      return;
    }
    setUser(currentUser);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(classSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (!user?.uid) {
        console.error("Kullanıcı ID'si bulunamadı");
        return;
      }

      const newData = {
        ...data,
        className: `${data.classNumber}-${data.classChar.toUpperCase()}`,
      };

      const classData = await dispatch(
        createClassThunk({ currentUserId: user.uid, classData: newData })
      ).unwrap();

      if (classData) {
        reset();
        setShowAddModal(false);
      }
    } catch (err) {
      console.error("Sınıf oluşturulurken bir hata oluştu: ", err);
    }
  };

  return (
    <div className="flex-1 w-11/12 h-full bg-bg-primary text-text-primary">
      {/* Header */}
      <PageHeader
        title={"Sınıf Yönetimi"}
        search={search}
        setSearch={setSearch}
        setShowAddModal={setShowAddModal}
      />

      <ClassList search={search} user={user} />

      {/* Sınıf Ekleme Modalı */}
      {showAddModal && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="fixed inset-0 bg-bg-primary/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <div className="bg-bg-primary rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-text-primary">
                Yeni Sınıf Ekle
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-text-tertiary hover:text-text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Sınıf Numarası
                </label>
                <input
                  type="number"
                  {...register("classNumber")}
                  className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Örn: 9"
                />
                {errors.classNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.classNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Şube
                </label>
                <input
                  type="text"
                  {...register("classChar")}
                  className="w-full bg-bg-secondary capitalize rounded-lg px-3 py-2 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Örn: A"
                />
                {errors.classChar && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.classChar.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Kapasite
                </label>
                <input
                  type="number"
                  {...register("capacity")}
                  className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Maksimum öğrenci kapasitesi"
                />
                {errors.capacity && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.capacity.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Aktiflik Durumu
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      {...register("state")}
                      value={true}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-text-primary">Aktif</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      {...register("state")}
                      value={false}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-text-primary">Pasif</span>
                  </label>
                </div>
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
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

export default ClassManagementPage;

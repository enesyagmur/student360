import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { managerSchema } from "../../lib/validation/managerSchema";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addNewManagerThunk } from "../../features/manager/managerThunk";
import ManagerList from "../../components/manager/lists/managers/ManagerList";
import PageHeader from "../../components/ui/pageHeader";

const ManagerManagementPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const user = useSelector((state) => state.authState.user);

  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(managerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const newData = {
        ...data,
        role: "manager",
      };
      const user = await dispatch(addNewManagerThunk(newData)).unwrap();

      if (user) {
        reset();
      }
    } catch (err) {
      console.error(
        "Manager Management Page | Yönetici oluşturulurken sorun ",
        err
      );
    }
  };

  return (
    <div className="flex-1 w-11/12 h-full bg-bg-primary text-text-primary">
      {/* Header */}
      <PageHeader
        title={"Yöneticiler"}
        search={search}
        setSearch={setSearch}
        setShowAddModal={setShowAddModal}
      />

      <ManagerList search={search} user={user} />

      {/* Add Manager Modal */}
      {showAddModal && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="fixed inset-0 bg-bg-primary/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <div className="bg-bg-primary  rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              Yeni Yönetici Ekle
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
                  placeholder="Yönetici adı ve soyadı"
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
                  className="w-full bg-bg-secondary  rounded-lg px-3 py-2 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full bg-bg-secondary  rounded-lg px-3 py-2 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full bg-bg-secondary  rounded-lg px-3 py-2 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+90 5XX XXX XX XX"
                />
                {errors.phone && (
                  <p className="text-color-danger">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Pozisyon
                </label>
                <select
                  {...register("position")}
                  className="w-full bg-bg-secondary  rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pozisyon seçin</option>
                  <option value="principal">Müdür</option>
                  <option value="assistant principal">Müdür Yardımcısı</option>
                  <option value="IT">Bilgi İşlem Yöneticisi</option>
                  <option value="officer">Arşiv Sorumlusu</option>
                  <option value="counselor">Rehber Öğretmen</option>
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

export default ManagerManagementPage;

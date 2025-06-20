import React, { useEffect, useState } from "react";
import { Search, Plus, X } from "lucide-react";
import AnnouncementList from "../../components/manager/lists/AnnouncementList";
import { getCurrentUser } from "../../features/auth/authService";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { announcementSchema } from "../../lib/validation/announcementSchema";
import { useDispatch } from "react-redux";
import { createAnnouncementThunk } from "../../features/announcement/announcementThunk";

const AnnouncementManagementPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(announcementSchema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) setUser(currentUser);
    };
    fetchUser();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (!user?.id) {
        throw new Error("PAGE | Kullanıcı id bulunmuyor");
      }

      const title = data.title;
      const content = data.content;
      const target = data.target;

      await dispatch(
        createAnnouncementThunk({
          title,
          content,
          target,
          creatorName: user.fullName,
          currentUserId: user.id,
        })
      ).unwrap();

      reset();
      setShowAddModal(false);
    } catch (err) {
      throw new Error(`PAGE | duyuru eklerken sorun: ${err}`);
    }
  };

  return (
    <div className="flex-1 w-11/12 h-full bg-bg-primary text-text-primary">
      {/* Header */}
      <div className="bg-bg-tertiary border-b border-bg-quaternary p-6 my-4 rounded-lg">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Duyurular</h1>
            <p className="text-text-tertiary">
              Duyuruları oluşturun, arayın ve yönetin
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full lg:w-auto">
            {/* Arama Kutusu */}
            <div className="relative flex-1 lg:flex-none lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-5 h-5" />
              <input
                type="text"
                placeholder="Duyuru ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-bg-secondary border border-bg-tertiary rounded-lg pl-10 pr-4 py-3 text-text-secondary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-color-accent focus:border-transparent"
              />
              <X
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-5 h-5 cursor-pointer ${
                  search !== "" ? "flex" : "hidden"
                }`}
                onClick={() => setSearch("")}
              />
            </div>
            {/* Yeni Duyuru Ekle Butonu */}
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-purple-500 text-white rounded-lg shadow-md px-4 py-2 transition hover:bg-color-accent-light"
            >
              <Plus className="w-5 h-5" />
              Yeni Duyuru Ekle
            </button>
          </div>
        </div>
      </div>

      {/* Duyuru Listesi */}
      <AnnouncementList user={user} search={search} />

      {/* Yeni Duyuru Ekleme Modalı */}
      {showAddModal && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="fixed inset-0 bg-bg-primary/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <div className="bg-bg-primary rounded-lg shadow-md p-6 w-full md:w-8/12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-text-primary">
                Yeni Duyuru Ekle
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
                  placeholder="Duyuru başlığı"
                />
                {errors.title && (
                  <p className="text-color-danger text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>
              {/* İçerik */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  İçerik
                </label>
                <textarea
                  {...register("content")}
                  rows={8}
                  className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-color-accent"
                  placeholder="Duyuru içeriği"
                />
                {errors.content && (
                  <p className="text-color-danger text-sm mt-1">
                    {errors.content.message}
                  </p>
                )}
              </div>
              {/* Kimlere Gösterilsin */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Kimlere Gösterilsin
                </label>
                <select
                  {...register("target")}
                  className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-color-accent"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Seçiniz
                  </option>
                  <option value="everyone">Herkes</option>
                  <option value="teachers">Öğretmenler</option>
                  <option value="students">Öğrenciler</option>
                </select>
                {errors.target && (
                  <p className="text-color-danger text-sm mt-1">
                    {errors.target.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-3 mt-6">
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
                Ekle
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AnnouncementManagementPage;

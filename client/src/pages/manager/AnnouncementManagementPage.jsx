import { useState } from "react";
import { X } from "lucide-react";
import AnnouncementList from "../../components/manager/lists/announcements/AnnouncementList";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { announcementSchema } from "../../lib/validation/announcementSchema";
import { useDispatch, useSelector } from "react-redux";
import { createAnnouncementThunk } from "../../features/announcement/announcementThunk";
import PageHeader from "../../components/ui/pageHeader";

const AnnouncementManagementPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authState.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(announcementSchema),
  });

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
      <PageHeader
        title={"Duyuru Yönetimi"}
        search={search}
        setSearch={setSearch}
        setShowAddModal={setShowAddModal}
      />

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

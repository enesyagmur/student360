import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loader2, AlertCircle, Megaphone, Trash2 } from "lucide-react";

const AnnouncementList = ({ search, user }) => {
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const announcementState = useSelector((state) => state.announcementState);
  const {
    announcementList: announcements = [],
    loading = false,
    error = null,
  } = announcementState;

  useEffect(() => {
    if (search) {
      const filtered = announcements.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredAnnouncements(filtered);
    } else {
      setFilteredAnnouncements(announcements);
    }
  }, [search, announcements]);

  const handleDelete = (announcementId) => {
    // Silme işlemi için fonksiyon
    console.log("Sil:", announcementId);
  };

  if (loading) {
    return (
      <div className="bg-bg-tertiary rounded-lg p-6 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
        <p className="text-text-secondary">Duyurular yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-bg-tertiary rounded-lg p-6 flex flex-col items-center justify-center min-h-[400px]">
        <AlertCircle className="text-red-500 mb-4" />
        <p className="text-text-secondary mb-2">Bir hata oluştu</p>
        <p className="text-text-tertiary text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-bg-tertiary h-[500px] rounded-lg p-6 overflow-y-auto">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-bg-quaternary">
              <th className="text-left py-4 px-4 text-text-secondary font-medium">
                Başlık
              </th>
              <th className="text-left py-4 px-4 text-text-secondary font-medium">
                Açıklama
              </th>
              <th className="text-left py-4 px-4 text-text-secondary font-medium">
                Oluşturan
              </th>
              <th className="text-left py-4 px-4 text-text-secondary font-medium">
                Tarih
              </th>
              {user?.position === "principal" && (
                <th className="text-right py-4 px-4 text-text-secondary font-medium">
                  İşlemler
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredAnnouncements.map((item) => (
              <tr
                key={item.id}
                className="border-b border-bg-quaternary hover:bg-bg-secondary/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                      <Megaphone className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <p className="text-text-tertiary line-clamp-2">
                    {item.description}
                  </p>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {item.createdBy}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <p className="text-text-primary">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString("tr-TR")
                      : "Tarih Yok"}
                  </p>
                </td>
                {user?.position === "principal" && (
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredAnnouncements.length === 0 && !loading && !error && (
        <div className="text-center py-8">
          <p className="text-text-tertiary">Henüz duyuru bulunmamaktadır.</p>
        </div>
      )}
    </div>
  );
};

export default AnnouncementList;

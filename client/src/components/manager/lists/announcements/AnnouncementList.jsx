import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Megaphone, X } from "lucide-react";
import {
  deleteAnnouncementThunk,
  getAnnouncementsThunk,
} from "../../../../features/announcement/announcementThunk";
import Loading from "../../../ui/loading";
import SomeThingWrong from "../../../ui/someThingWrong";
import NoData from "../../../ui/noData";
import Button from "../../../ui/button";

//parent render olsa bile ilgili proplar değişmediği sürece list render olmayacak
const AnnouncementList = React.memo(({ search, user }) => {
  const announcementState = useSelector((state) => state.announcementState);
  const {
    announcementList: announcements = [],
    loading = false,
    error = null,
  } = announcementState;
  const dispatch = useDispatch();

  useEffect(() => {
    const takeAnnouncements = async () => {
      try {
        const data = { userRole: user.role, userId: user.id };
        await dispatch(getAnnouncementsThunk(data)).unwrap();
      } catch (err) {
        throw new Error(err);
      }
    };
    if (user?.id && user?.role) {
      takeAnnouncements();
    }
  }, [dispatch, user?.id, user?.role]);

  //search ve duyurular listesi değişmediği sürece tekrar filtreleme yapmayacak
  const filteredAnnouncements = useMemo(() => {
    if (search) {
      return announcements.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    return announcements;
  }, [search, announcements]);

  const handleDelete = async (announcementId) => {
    try {
      if (!announcementId || !user?.id) {
        throw new Error("LIST | Silme işlemi için gerekli bilgiler eksik");
      }
      const data = { announcementId: announcementId, managerId: user.id };
      await dispatch(deleteAnnouncementThunk(data)).unwrap();
    } catch (err) {
      throw new Error(err);
    }
  };

  // Loading durumu
  if (loading) {
    return <Loading />;
  }

  // Error durumu
  if (error) {
    return <SomeThingWrong err={error} />;
  }

  if (filteredAnnouncements.length === 0 && !loading && !error) {
    return <NoData />;
  }

  return (
    <div className="bg-bg-tertiary h-[440px] md:h-[460px] lg:h-[500px] rounded-lg p-2  overflow-y-auto">
      <div className="flex flex-col overflow-y-auto  mt-2 sm:mt-0">
        {filteredAnnouncements.map((item) => (
          <div
            key={item.id}
            className="w-full rounded-lg shadow-md mt-2 bg-bg-secondary p-4 flex flex-col justify-between transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Megaphone className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-text-primary text-lg">
                  {item.title}
                </p>
                <span className="inline-flex capitalize items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                  {item.creatorName}
                </span>
              </div>
            </div>
            <p className="text-text-tertiary mb-4">{item.content}</p>
            <div className="flex justify-between items-center mt-auto">
              <p className="text-text-primary text-xs">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString("tr-TR")
                  : "Tarih Yok"}
              </p>
              {user?.position === "principal" && (
                <Button
                  onClick={() => handleDelete(item.id)}
                  type={"danger"}
                  size={"sm"}
                >
                  <X className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default AnnouncementList;

import { Book, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../ui/button";
import ConfirmModal from "../../../ui/confirmModal";
import {
  deleteLessonThunk,
  fetchLessonsThunk,
} from "../../../../features/lesson/lessonThunk";
import Loading from "../../../ui/loading";
import SomeThingWrong from "../../../ui/someThingWrong";
import NoData from "../../../ui/noData";

const LessonList = ({ search, user }) => {
  const lessonState = useSelector((state) => state.lessonState) || {};
  const { lessonList = [], loading = false, error = null } = lessonState;
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    answer: false,
    selectedItemId: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const takeLessons = async () => {
      try {
        if (!user?.id) return;
        await dispatch(fetchLessonsThunk(user.id)).unwrap();
      } catch (err) {
        console.error("LESSONLIST | Dersleri çekerken sorun: ", err);
      }
    };

    if (user?.id && lessonList.length === 0) {
      takeLessons();
    }
  }, [dispatch, user, lessonList]);

  const filteredLessons = Array.isArray(lessonList)
    ? lessonList.filter((lesson) => {
        if (!search.trim()) return true;
        if (!lesson?.name) return false;
        return lesson.name.toLowerCase().includes(search.toLowerCase().trim());
      })
    : [];

  useEffect(() => {
    const handleDelete = async (lessonId) => {
      try {
        await dispatch(
          deleteLessonThunk({
            lessonId,
            currentUserId: user.id,
          })
        ).unwrap();
      } catch (err) {
        console.error(
          "Ders silinemedi:",
          err.message || "Beklenmeyen bir hata oluştu"
        );
      }
    };

    if (confirmModal.answer === true && confirmModal.selectedItemId !== "") {
      handleDelete(confirmModal.selectedItemId);
      setConfirmModal((prev) => ({
        ...prev,
        selectedItemId: "",
        answer: false,
      }));
    }
  }, [confirmModal, dispatch, user]);

  // Loading durumu
  if (loading) {
    return <Loading />;
  }

  // Error durumu
  if (error) {
    return <SomeThingWrong err={error} />;
  }

  if (filteredLessons.length === 0 && !loading && !error) {
    return <NoData />;
  }

  return (
    <div className="w-full h-[500px] bg-bg-tertiary rounded-xl overflow-x-auto overflow-y-auto">
      <div className="">
        <table className="w-full">
          <thead className="bg-bg-quaternary">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                Ders
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                Kredi
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                Durum
              </th>
              {user?.position.includes("principal") && (
                <th className="text-left py-4 px-6 text-sm font-medium text-text-primary">
                  İşlem
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredLessons.map((lesson) => (
              <tr
                key={lesson.lessonId}
                className="text-text-secondary bg-bg-secondary"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                      <Book className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">
                        {lesson.name || "İsimsiz Ders"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm">{lesson.credit || "0"} Kredi</div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        lesson.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {lesson.isActive ? "Aktif" : "Pasif"}
                    </span>
                  </div>
                </td>
                {user?.position.includes("principal") && (
                  <td className="py-4 px-6">
                    <Button
                      onClick={() =>
                        setConfirmModal({
                          open: true,
                          selectedItemId: lesson.lessonId,
                        })
                      }
                      type="danger"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        type={"danger"}
        message={"Silmek istediğinize emin misiniz?"}
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
      />
    </div>
  );
};

export default LessonList;

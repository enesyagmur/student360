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
import LessonCard from "./LessonCard";

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
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {lessonList.map((lesson) => (
          <div
            key={lesson.lessonId}
            className="flex-1 min-w-[320px] max-w-[400px]"
          >
            <LessonCard
              lesson={lesson}
              user={user}
              setConfirmModal={setConfirmModal}
            />
          </div>
        ))}
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

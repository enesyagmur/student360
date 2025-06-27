import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, Mail, Phone, BookOpen, Trash2, X, Edit } from "lucide-react";

import {
  deleteTeacherThunk,
  fetchTeachersThunk,
} from "../../../../features/teacher/teacherThunk";
import ConfirmModal from "../../../ui/confirmModal";
import Loading from "../../../ui/loading";
import SomeThingWrong from "../../../ui/someThingWrong";
import NoData from "../../../ui/noData";
import TeacherCard from "./TeacherCard";

const TeacherList = React.memo(({ search, user }) => {
  const dispatch = useDispatch();
  const teacherState = useSelector((state) => state.teacherState) || {};
  const { teacherList = [], loading = false, error = null } = teacherState;

  // Silme ve modal state'i buraya taşındı
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    answer: false,
    selectedItemId: "",
  });

  useEffect(() => {
    const takeTeachers = async () => {
      try {
        if (!user?.id) return;
        await dispatch(fetchTeachersThunk(user.id)).unwrap();
      } catch (err) {
        console.error("TEACHERLIST | Öğretmenleri çekerken sorun ", err);
      }
    };

    if (user?.id && teacherList.length === 0) {
      takeTeachers();
    }
  }, [dispatch, user, teacherList]);

  // Silme işlemi
  const handleDeleteTeacher = async (teacherId) => {
    try {
      if (!teacherId) {
        console.error("Öğretmen ID bulunamadı");
        return;
      }
      await dispatch(deleteTeacherThunk(teacherId)).unwrap();
    } catch (err) {
      console.error("Öğretmen silinirken hata oluştu:", err);
    }
  };

  // Modal cevabını dinle
  useEffect(() => {
    if (confirmModal.answer === true && confirmModal.selectedItemId !== "") {
      handleDeleteTeacher(confirmModal.selectedItemId);
      setConfirmModal((prev) => ({
        ...prev,
        selectedItemId: "",
        answer: false,
        open: false,
      }));
    }
    // eslint-disable-next-line
  }, [confirmModal.answer, confirmModal.selectedItemId]);

  const filteredTeachers = useMemo(() => {
    if (search) {
      return teacherList.filter((teacher) => {
        if (!search.trim()) return true;
        if (!teacher?.fullName) return false;
        return teacher.fullName
          .toLowerCase()
          .includes(search.toLowerCase().trim());
      });
    }
    return teacherList;
  }, [search, teacherList]);

  // Loading durumu
  if (loading) {
    return <Loading />;
  }

  // Error durumu
  if (error) {
    return <SomeThingWrong err={error} />;
  }

  if (filteredTeachers.length === 0 && !loading && !error) {
    return <NoData />;
  }

  return (
    <div className="w-full h-[500px] bg-bg-tertiary rounded-xl overflow-x-auto overflow-y-auto">
      {/* Modern Teacher Cards Flex Layout */}
      <div className="flex flex-wrap justify-center gap-6 pt-2">
        {filteredTeachers.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
            user={user}
            onDeleteClick={(id) =>
              setConfirmModal((prev) => ({
                ...prev,
                open: true,
                selectedItemId: id,
              }))
            }
          />
        ))}
      </div>
      <ConfirmModal
        type={"danger"}
        message={"Silmek istediğinize emin misiniz?"}
        setConfirmModal={setConfirmModal}
        confirmModal={confirmModal}
      />
    </div>
  );
});

export default TeacherList;

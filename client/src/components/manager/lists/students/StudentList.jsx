import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStudentThunk,
  fetchStudentsThunk,
} from "../../../../features/student/studentThunk";
import ConfirmModal from "../../../ui/confirmModal";
import Loading from "../../../ui/loading";
import SomeThingWrong from "../../../ui/someThingWrong";
import NoData from "../../../ui/noData";
import StudentCard from "./StudentCard";

const StudentList = React.memo(({ search, user }) => {
  const studentState = useSelector((state) => state.studentState) || {};
  const { studentList = [], loading = false, error = null } = studentState;
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    answer: false,
    selectedItemId: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const takeStudents = async () => {
      try {
        if (!user?.id) return;
        await dispatch(fetchStudentsThunk(user.id)).unwrap();
      } catch (err) {
        console.error("STUDENTLIST | Öğrencileri çekerken sorun ", err);
      }
    };

    if (user?.id && studentList.length === 0) {
      takeStudents();
    }
  }, [dispatch, user, studentList.length]);

  const filteredStudents = useMemo(() => {
    if (search) {
      return studentList.filter((student) => {
        if (!search.trim()) return true;
        if (!student?.fullName) return false;
        return student.fullName
          .toLowerCase()
          .includes(search.toLowerCase().trim());
      });
    }
    return studentList;
  }, [studentList, search]);

  useEffect(() => {
    const handleDelete = async (studentId) => {
      try {
        await dispatch(
          deleteStudentThunk({
            studentId,
            currentUserId: user.id,
          })
        ).unwrap();
      } catch (err) {
        console.error(
          "Öğrenci silinemedi:",
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <SomeThingWrong err={error} />;
  }

  if (filteredStudents.length === 0 && !loading && !error) {
    return <NoData />;
  }

  return (
    <div className="w-full h-[440px] md:h-[460px] lg:h-[500px] bg-bg-tertiary rounded-xl overflow-hidden shadow-lg border border-bg-quaternary">
      <div className="h-full w-full flex flex-wrap justify-center overflow-x-hidden overflow-y-auto">
        {filteredStudents.map((student) => (
          <StudentCard
            student={student}
            setConfirmModal={setConfirmModal}
            user={user}
            key={student.id}
          />
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
});

export default StudentList;

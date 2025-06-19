import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ScheduleList from "../../components/manager/lists/ScheduleList";
import Button from "../../components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { getClassesThunk } from "../../features/class/classThunk";

import Loading from "../../components/ui/loading";
import { getCurrentUser } from "../../features/auth/authService";
import NewSchedule from "../../components/manager/schedule/newSchedule";

const ScheduleManagementPage = () => {
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const [schedules, setSchedules] = useState([]);
  const [onAddSchedule, setOnAddSchedule] = useState(false);

  const classes = useSelector((state) => state.classState.classList);
  const classLoading = useSelector((state) => state.classState.loading);
  const teacherLoading = useSelector((state) => state.teacherState.loading);
  const lessonLoading = useSelector((state) => state.lessonState.loading);

  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, []);

  useEffect(() => {
    if (!classes || classes.length === 0) {
      dispatch(getClassesThunk(user?.id));
    }
  }, [dispatch, classes, user?.id]);

  if (classLoading || teacherLoading || lessonLoading) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Loading />
      </div>
    );
  }

  const handleAddSchedule = (newSchedule) => {
    setSchedules((prev) => [...prev, newSchedule]);
    setOnAddSchedule(false);
  };

  return (
    <div className="flex-1 w-11/12 h-full bg-bg-primary text-text-primary">
      {/* Header */}
      <div className="bg-bg-tertiary border-b border-bg-quaternary p-6 my-4 rounded-lg">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Ders Programları</h1>
            <p className="text-text-tertiary">
              Sınıflar için haftalık ders programlarını oluşturun ve yönetin
            </p>
          </div>
          {!onAddSchedule && (
            <button
              className="flex items-center gap-2 bg-primary text-text-primary ounded-lg shadow-md px-4 py-2 transition hover:bg-primary/80 bg-primary-dark hover:bg-primary"
              onClick={() => setOnAddSchedule(true)}
            >
              <Plus size={18} /> Yeni Program Ekle
            </button>
          )}
        </div>
      </div>

      {onAddSchedule ? (
        <NewSchedule
          onCancel={() => setOnAddSchedule(false)}
          onSave={handleAddSchedule}
        />
      ) : (
        <ScheduleList
          schedules={schedules}
          classes={classes}
          onAddSchedule={() => setOnAddSchedule(true)}
        />
      )}
    </div>
  );
};

export default ScheduleManagementPage;

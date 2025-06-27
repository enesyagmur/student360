import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchScheduleThunk } from "../../../../features/schedule/scheduleThunk";
import ConfirmModal from "../../../ui/confirmModal";
import Loading from "../../../ui/loading";
import SomeThingWrong from "../../../ui/someThingWrong";
import NoData from "../../../ui/noData";
import Button from "../../../ui/button";
import { Trash2 } from "lucide-react";
import ScheduleCard from "./ScheduleCard";

const ScheduleList = ({ search, user }) => {
  const dispatch = useDispatch();
  const { scheduleList, loading, errors } = useSelector(
    (state) => state.scheduleState
  );
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    answer: false,
    selectedItemId: "",
  });

  useEffect(() => {
    if (Array.isArray(scheduleList) && scheduleList.length === 0 && user?.id) {
      dispatch(fetchScheduleThunk(user.id)).unwrap();
    }
  }, [scheduleList, user, dispatch]);

  const filteredSchedules = Array.isArray(scheduleList)
    ? scheduleList.filter((item) => {
        if (!search?.trim()) return true;
        const grade = item.grade || "";
        const branch = item.branch || "";
        return (
          grade.toLowerCase().includes(search.toLowerCase().trim()) ||
          branch.toLowerCase().includes(search.toLowerCase().trim())
        );
      })
    : [];

  if (loading) return <Loading />;
  if (errors) return <SomeThingWrong err={errors} />;
  if (filteredSchedules.length === 0 && !loading && !errors) return <NoData />;

  return (
    <div className="w-full h-[500px] bg-bg-tertiary rounded-xl overflow-x-auto overflow-y-auto">
      <div className="w-full flex flex-col overflow-y-outo p-4">
        {filteredSchedules.map((schedule) => (
          <ScheduleCard key={schedule.id} schedule={schedule} />
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

export default ScheduleList;

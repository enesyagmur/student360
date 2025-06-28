import { useState } from "react";
import PageHeader from "../../components/ui/pageHeader";
import ScheduleList from "../../components/manager/lists/schedules/ScheduleList";
import NewSchedule from "../../components/manager/lists/schedules/newSchedule";
import { useSelector } from "react-redux";

const ScheduleManagementPage = () => {
  const user = useSelector((state) => state.authState.user);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="flex-1 w-11/12 h-full bg-bg-primary text-text-primary">
      {/* Header */}
      <PageHeader
        title={"Haftalık Program Yönetimi"}
        search={search}
        setSearch={setSearch}
        setShowAddModal={setShowAddModal}
      />

      <ScheduleList search={search} user={user} />

      {showAddModal && (
        <NewSchedule user={user} setShowAddModal={setShowAddModal} />
      )}
    </div>
  );
};

export default ScheduleManagementPage;

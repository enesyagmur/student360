import React from "react";

import { Outlet } from "react-router-dom";
import ManagerSidebar from "./ManagerSidebar";

const ManagerLayout = () => {
  return (
    <main className="w-11/12 h-5/6 flex">
      <ManagerSidebar /> <Outlet />
    </main>
  );
};

export default ManagerLayout;

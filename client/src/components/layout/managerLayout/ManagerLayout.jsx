import React from "react";

import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {
  BarChart3,
  DoorClosed,
  GraduationCap,
  UserCheck,
  BriefcaseBusiness,
  BookOpen,
  Calendar,
  FileText,
  Bell,
  Settings,
} from "lucide-react";

const ManagerLayout = () => {
  const menuItems = [
    {
      label: "Performans",
      icon: BarChart3,
      url: "/manager/managerdashboard",
    },
    {
      label: "Öğrenciler",
      icon: GraduationCap,
      url: "/manager/studentManagement",
    },
    {
      label: "Öğretmenler",
      icon: UserCheck,
      url: "/manager/teacherManagement",
    },
    {
      label: "Yöneticiler",
      icon: BriefcaseBusiness,
      url: "/manager/managerManagement",
    },
    {
      label: "Sınıflar",
      icon: DoorClosed,
      url: "/manager/classManagement",
    },
    {
      label: "Dersler",
      icon: BookOpen,
      url: "/manager/lessonManagement",
    },
    {
      label: "Programlar",
      icon: Calendar,
      url: "/manager/scheduleManagement",
    },
    {
      label: "Sınavlar",
      icon: FileText,
      url: "/manager/examManagement",
    },
    {
      label: "Duyurular",
      icon: Bell,
      url: "/manager/announcementManagement",
    },
    {
      label: "Ayarlar",
      icon: Settings,
      url: "/manager/settings",
    },
  ];
  return (
    <main className="w-full h-screen flex">
      <Sidebar role={"manager"} menuItems={menuItems} />
      <main className="h-screen flex-1 flex flex-col items-center justify-center bg-bg-primary">
        <Header />
        <Outlet />
      </main>
    </main>
  );
};

export default ManagerLayout;

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
  LogOut,
} from "lucide-react";

const ManagerLayout = () => {
  const menuItems = [
    {
      label: "Performans",
      icon: BarChart3,
      url: "/manager/dashboard",
    },
    {
      label: "Öğrenciler",
      icon: GraduationCap,
      url: "/manager/students",
    },
    {
      label: "Öğretmenler",
      icon: UserCheck,
      url: "/manager/teachers",
    },
    {
      label: "Yöneticiler",
      icon: BriefcaseBusiness,
      url: "/manager/managers",
    },
    {
      label: "Sınıflar",
      icon: DoorClosed,
      url: "/manager/classes",
    },
    {
      label: "Dersler",
      icon: BookOpen,
      url: "/manager/lessons",
    },

    {
      label: "Program",
      icon: Calendar,
      url: "/manager/schedule",
    },
    {
      label: "Sınavlar",
      icon: FileText,
      url: "/manager/exams",
    },
    {
      label: "Duyurular",
      icon: Bell,
      url: "/manager/announcements",
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

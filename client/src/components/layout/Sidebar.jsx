import React, { useState } from "react";
import { Building2, ChevronLeft, ChevronRight } from "lucide-react";
import SidebarButton from "../ui/sidebarButton";
import { NavLink } from "react-router-dom";

const Sidebar = ({ role, menuItems }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className={`h-screen ${
        visible === true ? "w-12 sm:w-20" : "w-20 sm:w-24 md:w-2/12"
      } flex flex-col bg-color-accent text-white transition-all duration-200`}
    >
      {/* Logo Section */}
      <div className="p-2 sm:p-4 shadow-md h-[60px] sm:h-[70px]">
        <div className="flex items-center justify-between space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-bg-secondary">
            <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-text-secondary" />
          </div>
          <div
            className={`${
              visible === true ? "hidden" : "hidden sm:flex"
            } flex-col`}
          >
            <h1 className="text-base sm:text-lg font-bold">ÖĞRENCİ360</h1>
            <p className="text-[10px] sm:text-xs text-text-secondary">
              Okul Yönetimi
            </p>
          </div>
          <button onClick={() => setVisible(!visible)} className="p-1">
            {visible === false ? (
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4 sm:py-6">
        <ul className="space-y-1 sm:space-y-2 px-2 sm:px-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink key={index} to={item.url}>
                {({ isActive }) => (
                  <SidebarButton
                    title={item.label}
                    Icon={Icon}
                    isActive={isActive}
                    visible={visible}
                  />
                )}
              </NavLink>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-1 sm:p-2 border-t border-x-bg-quaternary">
        <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-bg-secondary">
            {role === "manager" && (
              <span className="text-xs sm:text-sm font-semibold">M</span>
            )}
            {role === "teacher" && (
              <span className="text-xs sm:text-sm font-semibold">T</span>
            )}
            {role === "student" && (
              <span className="text-xs sm:text-sm font-semibold">S</span>
            )}
          </div>
          <div className="flex-1 min-w-0 hidden md:flex">
            {role === "manager" && (
              <p className="text-[10px] sm:text-xs truncate">Yönetici</p>
            )}
            {role === "teacher" && (
              <p className="text-[10px] sm:text-xs truncate">Öğretmen</p>
            )}
            {role === "student" && (
              <p className="text-[10px] sm:text-xs truncate">Öğrenci</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

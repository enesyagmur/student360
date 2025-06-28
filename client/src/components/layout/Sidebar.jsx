import React, { useState } from "react";
import { Building2, PanelLeftClose, PanelRightClose } from "lucide-react";
import SidebarButton from "../ui/sidebarButton";
import { NavLink } from "react-router-dom";
import LogOutButton from "./LogOutButton";

const Sidebar = ({ role, menuItems }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className={`h-screen ${
        visible === true ? "w-12 sm:w-20" : "w-20 sm:w-24 md:w-2/12"
      } flex flex-col bg-color-accent text-white`}
    >
      {/* Logo Section */}
      <div className="p-2 sm:p-4 shadow-md h-[60px] sm:h-[70px]">
        <div className="flex items-center justify-start space-x-2 sm:space-x-3 pl-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-bg-secondary">
            <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-text-secondary" />
          </div>
          <div
            className={`${
              visible === true ? "hidden" : "hidden md:flex"
            } flex-col`}
          >
            <h1 className="text-base sm:text-lg font-bold">ÖĞRENCİ360</h1>
            <p className="text-[10px] sm:text-xs text-text-secondary">
              Okul Yönetimi
            </p>
          </div>
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
          <LogOutButton visible={visible} />
        </ul>
      </nav>
      <button
        onClick={() => setVisible(!visible)}
        className="w-full h-18 flex item-center justify-center"
      >
        <div
          className={`hidden ${
            visible === false && "md:flex"
          } w-full p-4 h-full pl-8  justify-start item-center  font-semibold hover:bg-color-accent-light`}
        >
          <PanelLeftClose className=" sm:w-5 sm:h-5 mt-1" />
          <p className="ml-3 ">Daralt</p>
        </div>

        <div
          className={`hidden ${
            visible === true && "md:flex"
          } w-full p-4 h-full pl-7 justify-start item-center  font-semibold hover:bg-color-accent-light`}
        >
          <PanelRightClose className=" sm:w-5 sm:h-5 " />
        </div>
      </button>
      {/* Bottom Section */}
      <div className="p-1 sm:p-2 border-t border-x-bg-bg-quaternary">
        <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-bg-secondary ml-1">
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

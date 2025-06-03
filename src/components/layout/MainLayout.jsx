import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-between p-4 bg-bg-primary ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;

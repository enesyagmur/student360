import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-between">
      <Header />
      <main className="w-11/12 h-5/6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

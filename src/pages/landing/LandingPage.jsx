import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/button";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-bg-primary   flex flex-col justify-center items-center px-6">
      <h1 className="text-5xl font-bold mb-4 text-text-primary">
        Welcome to Our Project
      </h1>
      <p className="max-w-xl text-center text-gray-400 mb-8 text-text-secondary">
        Discover amazing features and join us today! This is a clean, modern
        landing page with dark theme.
      </p>
      <Button
        type="primary"
        children={"Başla"}
        size="lg"
        onClick={() => navigate("/login")}
      />
    </div>
  );
};

export default LandingPage;

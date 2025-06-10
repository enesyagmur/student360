import React, { useState } from "react";
import { Building } from "lucide-react";
import LoginForm from "../../components/auth/LoginForm";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import Info from "../../components/auth/Info";

const LoginPage = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  return (
    <div className="min-h-screen bg-bg-primary flex  items-center justify-center p-4">
      <main className="w-full flex items-center justify-center h-[520px] ">
        {showForgotPassword ? (
          <ForgotPasswordForm setShowForgotPassword={setShowForgotPassword} />
        ) : (
          <LoginForm setShowForgotPassword={setShowForgotPassword} />
        )}
        <Info />
      </main>
    </div>
  );
};

export default LoginPage;

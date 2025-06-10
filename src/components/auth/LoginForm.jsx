import { GraduationCap, Lock, Mail, UserCheck, Users } from "lucide-react";
import React, { useState } from "react";

const LoginForm = ({ setShowForgotPassword }) => {
  const [role, setRole] = useState("manager");

  return (
    <form className="w-[400px] bg-bg-secondary border border-bg-tertiary rounded-xl p-8 shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-text-primary mb-2">
          Giriş Yap
        </h2>
        <p className="text-text-tertiary">Hesabınıza erişim sağlayın</p>
      </div>

      {/* Rol Seçimi */}
      <div className="flex justify-center mb-6 bg-bg-tertiary rounded-lg p-1 border border-bg-quaternary">
        {/* Yönetici Rolü Butonu */}
        <button
          type="button"
          onClick={() => setRole("manager")}
          className={`flex-1 py-2 px-4 text-sm text-text-secondary rounded-md transition-all duration-200 shadow-md ${
            role === "manager" && "bg-color-accent text-white"
          }`}
        >
          <UserCheck className="inline-block w-4 h-4 mr-2" /> Yönetici
        </button>
        {/* Öğretmen Rolü Butonu */}
        <button
          type="button"
          onClick={() => setRole("teacher")}
          className={`flex-1 py-2 px-4 text-sm text-text-secondary rounded-md transition-all duration-200 shadow-md ${
            role === "teacher" && "bg-color-accent text-white "
          }`}
        >
          <Users className="inline-block w-4 h-4 mr-2" /> Öğretmen
        </button>
        {/* Öğrenci Rolü Butonu */}
        <button
          type="button"
          onClick={() => setRole("student")}
          className={`flex-1 py-2 px-4 text-sm text-text-secondary rounded-md transition-all duration-200 shadow-md ${
            role === "student" && "bg-color-accent text-white "
          }`}
        >
          <GraduationCap className="inline-block w-4 h-4 mr-2" /> Öğrenci
        </button>
      </div>
      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          E-posta Adresi
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-5 h-5" />
          <input
            type="email"
            className="w-full bg-bg-tertiary border border-bg-quaternary rounded-lg pl-10 pr-4 py-3 text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-color-accent focus:border-transparent transition-all duration-200"
            placeholder="ornek@yonetici360.com"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="mt-2">
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Şifre
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-5 h-5" />
          <input
            type="password"
            className="w-full bg-bg-tertiary border border-bg-quaternary rounded-lg pl-10 pr-4 py-3 text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-color-accent focus:border-transparent transition-all duration-200"
            placeholder="••••••••"
          />
        </div>
      </div>

      {/* Login Button */}
      <button
        type="button"
        className="w-full mt-6 bg-gradient-to-r from-color-accent to-color-accent-light  text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Giriş Yap
      </button>

      {/* Forgot Password */}
      <div className="flex items-center justify-center h-10 ">
        <button
          type="button"
          className="text-sm text-text-secondary hover:text-white transition-colors"
          onClick={() => setShowForgotPassword(true)}
        >
          Şifremi unuttum
        </button>
      </div>
    </form>
  );
};

export default LoginForm;

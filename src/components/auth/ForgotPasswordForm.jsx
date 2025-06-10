import React from "react";
import { Mail, ArrowLeft } from "lucide-react";

const ForgotPasswordForm = ({ setShowForgotPassword }) => {
  // Tüm işlevsel kodlar (state, olay işleyicileri) tasarım odaklı olmak için kaldırılmıştır.

  return (
    <div className="w-[400px] h-full bg-bg-secondary rounded-xl p-8 shadow-lg">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-text-primary mb-2">
          Şifrenizi Mi Unuttunuz?
        </h2>
        <p className="text-text-secondary text-sm text-center">
          E-posta adresinizi giriniz.
        </p>
      </div>

      <form className="space-y-6 mt-12">
        {/* E-posta Alanı */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text-tertiary mb-2"
          >
            E-posta Adresi
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-5 h-5" />
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-bg-tertiary border border-bg-tertiary rounded-lg pl-10 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="ornek@ogrenci360.com"
            />
          </div>
        </div>

        {/* Sıfırlama Butonu */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-color-accent to-color-accent-light text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Şifreyi Sıfırla
        </button>
      </form>

      {/* Giriş Sayfasına Geri Dön */}
      <div className="mt-6 text-center">
        <button
          type="button"
          className="text-sm text-text-secondary hover:text-white transition-colors inline-flex items-center"
          onClick={() => setShowForgotPassword(false)}
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Giriş sayfasına geri dön
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;

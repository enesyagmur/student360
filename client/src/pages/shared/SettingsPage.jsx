import { User, Mail, Lock, Camera, Save, Edit } from "lucide-react";
import Button from "../../components/ui/button";

const SettingsPage = () => {
  return (
    <div className="w-full h-full bg-bg-primary text-text-primary overflow-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-2 py-2">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sol: Profil Fotoğrafı */}
          <div className="w-full lg:w-1/3 flex justify-center item-center">
            <div className="bg-bg-secondary rounded-xl shadow-lg p-6 w-full ">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-lg sm:text-xl font-semibold text-text-primary mb-4">
                  Profil Fotoğrafı
                </h2>

                <div className="relative mb-4">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-bg-quaternary flex items-center justify-center text-3xl sm:text-4xl font-bold text-color-accent border-4 border-bg-primary shadow-lg">
                    <User
                      size={40}
                      className="sm:w-12 sm:h-12 text-text-primary"
                    />
                  </div>
                  <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-8 h-8 sm:w-10 sm:h-10 bg-color-accent rounded-full flex items-center justify-center cursor-pointer hover:bg-color-accent-light transition-all duration-200 shadow-md">
                    <Camera size={16} className="sm:w-5 sm:h-5 text-gray-300" />
                  </div>
                </div>

                <Button
                  type="success"
                  size={"md"}
                  className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-color-accent text-bg-primary font-medium hover:bg-color-accent-light transition-all duration-200 shadow-md text-sm sm:text-base"
                >
                  <Edit size={14} className="sm:w-4 sm:h-4 mr-1" />
                  Fotoğrafı Güncelle
                </Button>
              </div>
            </div>
          </div>

          {/* Sağ: Form Alanları */}
          <div className="lg:w-2/3">
            <div className="space-y-4 sm:space-y-6">
              {/* İsim Formu */}
              <div className="bg-bg-secondary rounded-xl p-4 sm:p-6 border border-bg-quaternary shadow-lg">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-color-accent rounded-lg flex items-center justify-center">
                    <User size={16} className="sm:w-5 sm:h-5 text-gray-300" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary">
                    Kişisel Bilgiler
                  </h3>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-bg-tertiary text-text-primary border border-bg-quaternary focus:outline-none focus:ring-2 focus:ring-color-accent focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    placeholder="Ad Soyad"
                  />
                  <Button type="success" size={"md"}>
                    <Save size={14} className="sm:w-4 sm:h-4 mr-1" />
                    Güncelle
                  </Button>
                </div>
              </div>

              {/* E-posta Formu */}
              <div className="bg-bg-secondary rounded-xl p-4 sm:p-6 border border-bg-quaternary shadow-lg">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-color-accent rounded-lg flex items-center justify-center">
                    <Mail size={16} className="sm:w-5 sm:h-5 text-gray-300" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary">
                    E-posta Adresi
                  </h3>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-bg-tertiary text-text-primary border border-bg-quaternary focus:outline-none focus:ring-2 focus:ring-color-accent focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    placeholder="ornek@email.com"
                  />
                  <Button type="success" size={"md"}>
                    <Save size={14} className="sm:w-4 sm:h-4 mr-1" />
                    Güncelle
                  </Button>
                </div>
              </div>

              {/* Şifre Formu */}
              <div className="bg-bg-secondary rounded-xl p-4 sm:p-6 border border-bg-quaternary shadow-lg">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-color-warning rounded-lg flex items-center justify-center">
                    <Lock size={16} className="sm:w-5 sm:h-5 text-gray-100" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary">
                    Şifre Değiştir
                  </h3>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <input
                    type="password"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-bg-tertiary text-text-primary border border-bg-quaternary focus:outline-none focus:ring-2 focus:ring-color-accent focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    placeholder="Mevcut şifre"
                  />

                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="password"
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-bg-tertiary text-text-primary border border-bg-quaternary focus:outline-none focus:ring-2 focus:ring-color-accent focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                      placeholder="Yeni şifre"
                    />
                    <input
                      type="password"
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-bg-tertiary text-text-primary border border-bg-quaternary focus:outline-none focus:ring-2 focus:ring-color-accent focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                      placeholder="Şifre tekrarı"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-color-warning text-gray-100 font-medium hover:bg-color-accent-light transition-all duration-200 shadow-md text-sm sm:text-base"
                    >
                      <Lock size={14} className="sm:w-4 sm:h-4 mr-1" />
                      Şifreyi Güncelle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

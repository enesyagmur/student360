import { User, Mail, Lock, Camera, Save, Edit, Sun } from "lucide-react";
import Button from "../../components/ui/button";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  updatePhotoService,
  updateFullName,
  updateEmailService,
  updatePasswordService, // ekle
} from "../../features/shared/settings/settingsService";
import toggleTheme from "../../utils/theme";

const SettingsPage = () => {
  const user = useSelector((state) => state.authState.user);
  const [photo, setPhoto] = useState();
  const [fullName, setFullName] = useState(user.fullName || "");
  const [email, setEmail] = useState(user.email || "");
  const [loading, setLoading] = useState(false);

  // Şifre için state'ler
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleUpdatePhoto = async () => {
    try {
      if (!user || !photo) {
        throw new Error("Bilgiler Eksik");
      }
      await updatePhotoService(photo, user.id, user.role);
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleUpdateFullName = async () => {
    try {
      setLoading(true);
      if (!user || !fullName) {
        throw new Error("Bilgiler Eksik");
      }
      await updateFullName(fullName, user.id, user.role);
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleUpdateEmail = async () => {
    try {
      setLoading(true);
      if (!user || !email) {
        throw new Error("Bilgiler Eksik");
      }
      await updateEmailService(email, user.id, user.role);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || !repeatPassword) {
      alert("Lütfen tüm şifre alanlarını doldurun.");
      return;
    }
    if (newPassword !== repeatPassword) {
      alert("Şifreler aynı değil!");
      return;
    }
    try {
      setLoading(true);
      await updatePasswordService(newPassword, user.id);
      alert("Şifre başarıyla güncellendi.");
      setNewPassword("");
      setRepeatPassword("");
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-bg-primary text-text-primary overflow-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-2 py-6">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sol: Profil Fotoğrafı */}
          <div className="w-full lg:w-1/3 bg-bg-secondary  flex flex-col justify-evenly item-center">
            <div className="rounded-xl shadow-lg p-6 w-full ">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-lg sm:text-xl font-semibold text-text-primary mb-4">
                  Profil Fotoğrafı
                </h2>

                <div className="relative mb-4 flex flex-col items-center">
                  {/* Profil Fotoğrafı veya Placeholder */}
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-bg-quaternary flex items-center justify-center border-4 border-bg-primary shadow-lg overflow-hidden">
                    {user.photoUrl ? (
                      <img
                        src={user.photoUrl}
                        alt="Profil Fotoğrafı"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <User size={56} className="text-text-primary" />
                    )}
                  </div>

                  {/* Kamera Butonu */}
                  <label
                    htmlFor="profile-photo-upload"
                    className="absolute bottom-2 right-2 w-10 h-10 bg-color-accent rounded-full flex items-center justify-center cursor-pointer hover:bg-color-accent-light transition-all duration-200 shadow-md border-2 border-bg-primary"
                    style={{ zIndex: 10 }}
                    title="Profil fotoğrafı değiştir"
                  >
                    <Camera size={20} className="text-gray-100" />
                    <input
                      type="file"
                      id="profile-photo-upload"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </label>
                </div>

                <Button
                  type="success"
                  onClick={handleUpdatePhoto}
                  size={"md"}
                  className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-color-accent text-bg-primary font-medium hover:bg-color-accent-light transition-all duration-200 shadow-md text-sm sm:text-base"
                >
                  <Edit size={14} className="sm:w-4 sm:h-4 mr-1" />
                  Fotoğrafı Güncelle
                </Button>
              </div>
            </div>

            <div className="w-full p-8 lg:p-0 mt-4 flex justify-center">
              <button
                className="px-4 py-4 rounded-md text-sm font-medium text-text-secondary bg-bg-primary hover:bg-bg-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out flex items-center space-x-2"
                onClick={toggleTheme}
              >
                <Sun className="h-4 w-4 mr-2" />
                Temayı Değiştir
              </button>
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
                    className="flex-1 px-3 py-2 capitalize sm:px-4 sm:py-3 rounded-lg bg-bg-tertiary text-text-primary border border-bg-quaternary focus:outline-none focus:ring-2 focus:ring-color-accent focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    placeholder="Ad Soyad"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <Button
                    type="success"
                    size={"md"}
                    onClick={handleUpdateFullName}
                    disabled={loading}
                  >
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

                <form
                  className="flex flex-col sm:flex-row gap-3"
                  onSubmit={handleUpdateEmail}
                >
                  <input
                    type="email"
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-bg-tertiary text-text-primary border border-bg-quaternary focus:outline-none focus:ring-2 focus:ring-color-accent focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    placeholder="ornek@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button type="success" size={"md"} disabled={loading}>
                    <Save size={14} className="sm:w-4 sm:h-4 mr-1" />
                    Güncelle
                  </Button>
                </form>
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

                <form
                  className="space-y-3 sm:space-y-4"
                  onSubmit={handleUpdatePassword}
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="password"
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-bg-tertiary text-text-primary border border-bg-quaternary focus:outline-none focus:ring-2 focus:ring-color-accent focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                      placeholder="Yeni şifre"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                      type="password"
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-bg-tertiary text-text-primary border border-bg-quaternary focus:outline-none focus:ring-2 focus:ring-color-accent focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                      placeholder="Şifre tekrarı"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-color-warning text-gray-100 font-medium hover:bg-color-accent-light transition-all duration-200 shadow-md text-sm sm:text-base"
                      disabled={loading}
                    >
                      <Lock size={14} className="sm:w-4 sm:h-4 mr-1" />
                      Şifreyi Güncelle
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

import { Sun, LogOut, BellRing } from "lucide-react";
import toggleTheme from "../../utils/theme";
import { useEffect, useState } from "react";
import { logoutService } from "../../features/auth/authService";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // LocalStorage'dan kullanıcı bilgilerini al
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logoutService();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Çıkış yapılırken hata oluştu:", error);
    }
  };

  if (!user) return null;

  return (
    <header className="w-full h-[70px] flex items-center justify-end sticky top-0 z-50 backdrop-blur-md bg-bg-secondary transition-all duration-200 px-4 shadow-md">
      <div className="h-full flex items-center justify-end space-x-4">
        <button
          className="px-4 py-2 rounded-md text-sm font-medium text-text-secondary bg-bg-primary hover:bg-bg-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out flex items-center space-x-2"
          onClick={toggleTheme}
        >
          <Sun className="h-4 w-4" />
        </button>

        <div className="flex items-center justify-evenly space-x-2 text-text-secondary">
          <p className="text-sm font-medium capitalize">{user.fullName}</p>
          <button
            onClick={handleLogout}
            className="text-text-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full p-1"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { LogOut } from "lucide-react";
import { logoutService } from "../../features/auth/authService";
import { useNavigate } from "react-router-dom";

const LogOutButton = ({ visible }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutService();
    navigate("/");
  };

  return (
    <div
      onClick={handleLogout}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:bg-color-accent-light text-gray-100`}
    >
      <LogOut className="w-5 h-5" />
      <span
        className={`font-medium text-sm ${
          visible ? "hidden" : "hidden md:flex"
        }`}
      >
        Çıkış Yap
      </span>
    </div>
  );
};

export default LogOutButton;

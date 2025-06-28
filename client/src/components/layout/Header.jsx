import { useSelector } from "react-redux";
import { User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom"; // eklendi

const Header = () => {
  const user = useSelector((state) => state.authState?.user);
  const navigate = useNavigate(); // eklendi

  if (!user) return null;

  const handleProfileClick = () => {
    navigate(`/${user.role}/settings`);
  };

  return (
    <header className="w-full h-[70px] flex items-center justify-end sticky top-0 z-50 backdrop-blur-md bg-bg-secondary transition-all duration-200 px-4 shadow-md">
      <div className="flex items-center justify-evenly space-x-2 text-text-secondary">
        <button
          onClick={handleProfileClick}
          className="focus:outline-none flex items-center space-x-2 bg-transparent border-0 p-0"
          type="button"
        >
          {user.photoUrl ? (
            <img
              src={user.photoUrl}
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <UserIcon className="w-8 h-8 text-gray-400" />
          )}
          <p className="text-sm font-medium capitalize">{user.fullName}</p>
        </button>
      </div>
    </header>
  );
};

export default Header;

import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.authState?.user);

  if (!user) return null;

  return (
    <header className="w-full h-[70px] flex items-center justify-end sticky top-0 z-50 backdrop-blur-md bg-bg-secondary transition-all duration-200 px-4 shadow-md">
      <div className="h-full flex items-center justify-end space-x-4">
        <div className="flex items-center justify-evenly space-x-2 text-text-secondary">
          <p className="text-sm font-medium capitalize">{user.fullName}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;

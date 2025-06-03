import { Moon, Sun, User, ChevronDown } from "lucide-react";
import toggleTheme from "../../utils/theme";
import { useState } from "react";

const Header = () => {
  const [theme, setTheme] = useState("");

  const handleThemeChange = () => {
    const resultMode = toggleTheme();
    setTheme(resultMode);
  };

  return (
    <header className="w-11/12 h-16 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md bg-opacity-90 bg-gray-800 transition-all duration-300 px-4 rounded-b-lg shadow-md">
      <div className="h-full flex items-center justify-center text-white text-lg font-semibold">
        <p>YourAppLogo</p>
      </div>

      <div className="h-full flex items-center justify-end space-x-4">
        <button
          className="px-4 py-2 rounded-md text-sm font-medium text-gray-200 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out flex items-center space-x-2"
          onClick={handleThemeChange}
        >
          <Sun className="h-4 w-4" />
        </button>

        <div className="flex items-center justify-evenly space-x-2 text-gray-200">
          <p className="text-sm font-medium">Enes Yağmur</p>
          <button className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full p-1">
            <ChevronDown className="h-4 w-4" /> {/* Lucide ChevronDown icon */}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

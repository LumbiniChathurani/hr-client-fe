import { useTheme } from "../context/ThemeProvider";
import { Sun, Moon, Search } from "lucide-react";
import { MdNotificationsActive } from "react-icons/md";

// ✅ Define the shape of user prop
interface User {
  profile_image: string;
}

const Topbar = ({ user }: { user: User }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-light-purple dark:bg-dark-purple-muted shadow flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search anything..."
            className="pl-10 pr-3 py-1.5 rounded-md text-sm bg-white dark:bg-[#2D273B] text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400 w-80"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded hover:bg-lilac-purple dark:hover:bg-hover-purple">
          <MdNotificationsActive size={20} />
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-lilac-purple dark:hover:bg-hover-purple"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <img
          src={`http://localhost:3000${user.profile_image}`}
          alt="User Avatar"
          className="w-8 h-8 rounded-full object-cover border-2 border-purple-400"
        />
      </div>
    </header>
  );
};

export default Topbar;

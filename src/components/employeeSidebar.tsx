import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { RxDashboard } from "react-icons/rx";
import { RiFileUserLine } from "react-icons/ri";
import { LiaMoneyCheckSolid } from "react-icons/lia";
import { MdOutlineHolidayVillage } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import { BsCommand } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import Swal from "sweetalert2";
import HelpModal from "../pages/HelpModal";
import SettingsModal from "../pages/SettingsModal";

const handleLogout = () => {
  Swal.fire({
    title: "Are you sure you want to logout?",
    text: "Logout as lumbini@gmail.com",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, logout!",
    customClass: {
      popup:
        "rounded-xl dark:bg-dark-purple bg-light-purple dark:text-white text-black shadow-lg",
      title: "text-purple-400 text-xl font-semibold",
      htmlContainer: "text-black dark:text-gray-300",
      confirmButton:
        "bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg focus:outline-none",
      cancelButton:
        "bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg ml-2 focus:outline-none",
    },
    buttonsStyling: false, // Important when using Tailwind classes
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Logged out!",
        text: "You logged out from this website!",
        icon: "success",
        customClass: {
          popup:
            "rounded-xl dark:bg-dark-purple bg-light-purple dark:text-white text-black shadow-lg",
          title: "text-purple-400 text-xl font-semibold",
          confirmButton:
            "bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg focus:outline-none",
        },
        buttonsStyling: false,
      });
    }
  });
};

const EmployeeSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white bg-fuchsia-800 p-2 rounded"
          aria-label="Toggle Sidebar"
        >
          <Menu />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 overflow-y-auto scrollbar-hide bg-light-purple dark:bg-dark-purple-muted dark:text-purple-50 text-black z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        <div className="p-4 text-xl font-bold flex">
          <BsCommand className="mt-1.5 text-purple-800 dark:text-purple-400" />
          <h1 className="ml-3">
            <span className="text-purple-800 dark:text-purple-400">HR</span>
            -System
          </h1>
        </div>

        <nav className="flex flex-col gap-2 p-4">
          <Link
            to="/employee"
            onClick={() => setIsOpen(false)}
            className="hover:bg-lilac-purple dark:hover:bg-hover-purple p-2 rounded"
          >
            <div className="flex items-center">
              <RxDashboard className="mt-1 mr-1.5" />
              Dashboard
            </div>
          </Link>

          <Link
            to="/employee/profile"
            onClick={() => setIsOpen(false)}
            className="hover:bg-lilac-purple dark:hover:bg-hover-purple p-2 rounded"
          >
            <div className="flex items-center">
              <RiFileUserLine className="mt-1 mr-1.5" />
              My Profile
            </div>
          </Link>
          <Link
            to="/employee/attendance"
            onClick={() => setIsOpen(false)}
            className="hover:bg-lilac-purple dark:hover:bg-hover-purple p-2 rounded"
          >
            <div className="flex items-center">
              <FaRegCheckCircle className="mt-1 mr-1.5" />
              Attendance
            </div>
          </Link>

          <Link
            to="/employee/payroll"
            onClick={() => setIsOpen(false)}
            className="hover:bg-lilac-purple dark:hover:bg-hover-purple p-2 rounded"
          >
            <div className="flex items-center">
              <LiaMoneyCheckSolid className="mt-1 mr-1.5" />
              Payroll
            </div>
          </Link>

          <Link
            to="/employee/leave"
            onClick={() => setIsOpen(false)}
            className="hover:bg-lilac-purple dark:hover:bg-hover-purple p-2 rounded"
          >
            <div className="flex items-center">
              <MdOutlineHolidayVillage className="mt-1 mr-1.5" />
              Leave
            </div>
          </Link>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center hover:bg-lilac-purple dark:hover:bg-hover-purple p-2 rounded w-full text-black dark:text-purple-50"
          >
            <IoSettingsOutline className="mt-1 mr-1.5" />
            Settings
          </button>

          {/* Render SettingsModal */}
          <SettingsModal
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
          />

          <button
            onClick={() => setShowHelp(true)}
            className="flex items-center hover:bg-lilac-purple dark:hover:bg-hover-purple p-2 rounded w-full text-black dark:text-purple-50"
          >
            <BsQuestionCircle className="mt-1 mr-1.5" />
            Help Center
          </button>
          <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
          <button
            onClick={handleLogout}
            className="flex items-center hover:bg-lilac-purple dark:hover:bg-hover-purple p-2 rounded w-full text-black dark:text-purple-50"
          >
            <LuLogOut className="mt-1 mr-1.5" />
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
};

export default EmployeeSidebar;

import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import { BsCommand } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineUsers } from "react-icons/hi2";
import { LiaMoneyCheckSolid } from "react-icons/lia";
import { MdOutlineHolidayVillage } from "react-icons/md";
import { BsPersonVcard } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";
import { RiFileUserLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import SettingsModal from "../pages/SettingsModal";
import HelpModal from "../pages/HelpModal";
import Swal from "sweetalert2";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
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

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white dark:text-white bg-fuchsia-800 dark:bg-fuchsia-800 p-2 rounded"
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
        <div className="p-4 text-xl font-bold flex  ">
          <BsCommand className="mt-1.5 text-purple-800 dark:text-purple-400" />
          <h1 className="ml-3">
            <span className="text-purple-800 dark:text-purple-400">HR</span>
            -System
          </h1>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          <Link
            to="/dashboard"
            className="hover:bg-lilac-purple dark:hover:bg-hover-purple p-2 rounded"
          >
            <div className="flex">
              <RxDashboard className="mt-1 mr-1.5" />
              Dashboard
            </div>
          </Link>
          <Link
            to="/employees"
            className="hover:bg-lilac-purple dark:hover:bg-hover-purple p-2 rounded"
          >
            <div className="flex">
              <HiOutlineUsers className="mt-1 mr-1.5" />
              Employees
            </div>
          </Link>
          <Link
            to="/payroll"
            className="hover:bg-lilac-purple dark:hover:bg-hover-purple p-2 rounded"
          >
            <div className="flex">
              {" "}
              <LiaMoneyCheckSolid className="mt-1 mr-1.5" />
              Payroll
            </div>
          </Link>
          <Link
            to="/leave"
            className="hover:bg-lilac-purple dark:hover:bg-hover-purple p-2 rounded"
          >
            <div className="flex">
              <MdOutlineHolidayVillage className="mt-1 mr-1.5" />
              Leave
            </div>
          </Link>
          <Link
            to="/recruitment"
            className="hover:bg-lilac-purple dark:hover:bg-hover-purple p-2 rounded"
          >
            <div className="flex">
              <BsPersonVcard className="mt-1 mr-1.5" />
              Recruitment
            </div>
          </Link>
          <Link
            to="/reports"
            className="hover:bg-lilac-purple dark:hover:bg-hover-purple p-2 rounded"
          >
            <div className="flex">
              {" "}
              <TbReportSearch className="mt-1 mr-1.5" />
              Reports & Analytics
            </div>
          </Link>
          <Link
            to="/user_management"
            className="hover:bg-lilac-purple dark:hover:bg-hover-purple p-2 rounded "
          >
            <div className="flex">
              <RiFileUserLine className="mt-1 mr-1.5" />
              User & Role Management
            </div>
          </Link>
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

          {/*<Link
            to="/help_center"
            className="hover:bg-lilac-purple dark:hover:bg-hover-purple p-2 rounded"
          >
            <div className="flex">
              <BsQuestionCircle className="mt-1 mr-1.5" />
              Help Center
            </div>
          </Link>*/}

          <button
            onClick={() => setShowHelp(true)}
            className="flex items-center hover:bg-lilac-purple dark:hover:bg-hover-purple p-2 rounded w-full text-black dark:text-purple-50"
          >
            <BsQuestionCircle className="mt-1 mr-1.5" />
            Help Center
          </button>
          <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
          {/* <Link
            to="/logout"
            className="hover:bg-lilac-purple dark:hover:bg-hover-purple p-2 rounded"
          >
            <div className="flex">
              <LuLogOut className="mt-1 mr-1.5" />
              Logout
            </div>
          </Link>*/}
          <button
            onClick={handleLogout}
            className="flex items-center hover:bg-lilac-purple dark:hover:bg-hover-purple p-2 rounded w-full text-black dark:text-purple-50"
          >
            <LuLogOut className="mt-1 mr-1.5" />
            Logout
          </button>

          <br />
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

import EmployeeSidebar from "../components/employeeSidebar";
import Topbar from "../components/topbar"; // or EmployeeTopbar if separate
import { Outlet } from "react-router-dom";

interface User {
  profile_image: string;
  // add other user fields if needed
}

const EmployeeLayout = ({ user }: { user: User }) => {
  return (
    <div className="flex bg-gray-100 dark:bg-dark-purple text-black dark:text-white min-h-screen">
      <EmployeeSidebar />
      <div className="flex flex-col flex-1">
        <Topbar user={user} />
        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;

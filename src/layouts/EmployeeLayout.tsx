import React from "react";
import EmployeeSidebar from "../components/employeeSidebar";
import Topbar from "../components/topbar"; // or EmployeeTopbar if separate
import { Outlet } from "react-router-dom";

export type UserContextType = {
  id: number;
  email: string;
  profile_image: string;
};

export const UserContext = React.createContext<Partial<UserContextType>>({});

const EmployeeLayout = ({ user }: { user: UserContextType }) => {
  return (
    <div className="flex bg-gray-100 dark:bg-dark-purple text-black dark:text-white min-h-screen">
      <EmployeeSidebar />
      <div className="flex flex-col flex-1">
        <Topbar user={{ profile_image: user.profile_image }} />
        <main className="p-6 flex-1">
          <UserContext.Provider value={user}>
            <Outlet />
          </UserContext.Provider>
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;

{
  /*import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-gray-100 dark:bg-dark-purple text-black dark:text-white min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;*/
}
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex bg-gray-100 dark:bg-dark-purple text-black dark:text-white min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

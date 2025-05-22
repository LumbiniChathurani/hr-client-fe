import { Link } from "react-router-dom";

const EmployeeSidebar = () => {
  return (
    <div className="w-64 bg-purple-900 text-white min-h-screen p-4">
      <h1 className="text-xl font-bold mb-6">HR-System</h1>
      <nav className="flex flex-col space-y-4">
        <Link to="/employee">Dashboard</Link>
        <Link to="/employee/profile">My Profile</Link>
        <Link to="/employee/payroll">Payroll</Link>
        <Link to="/employee/leave">Leave</Link>
        <Link to="/employee/help">Help Center</Link>
      </nav>
    </div>
  );
};

export default EmployeeSidebar;

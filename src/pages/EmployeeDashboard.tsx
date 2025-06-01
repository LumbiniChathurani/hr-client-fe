import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProperImageUrl } from "../util/ImageUtil";
import { UserContext } from "../layouts/EmployeeLayout";

const EmployeeDashboard = () => {
  const user = useContext(UserContext);
  const [employee, setEmployee] = useState<Partial<EmployeeDetailsType>>({});
  //load emplyee details when component is rendered
  useEffect(() => {
    loadUserDetails(user.id ?? 0)
      .then((data) => setEmployee(data))
      .catch((e) => {
        //if error show toast message
        toast.error(e);
      });
  }, [user?.id]);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-dark-purple text-black dark:text-purple-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold">
          Welcome to Your Dashboard {employee.userName ?? ""}
        </h1>
      </div>

      <p className="text-gray-600 dark:text-slate-300 mb-6">
        Here's your personalized HR dashboard overview.
      </p>

      {/* Profile Section */}
      <div className="bg-white dark:bg-dark-purple-muted p-5 rounded-xl shadow mb-6">
        <div className="flex items-center gap-4">
          <img
            src={getProperImageUrl(employee.profile_image)}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {employee.userName ?? "User Name N/A"}
            </h2>
            <h2 className="text-sm text-gray-300">
              {employee.email ?? "User Email N/A"}
            </h2>
            <p className="text-gray-500 dark:text-slate-300">
              {employee.userRole ?? "User Role N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-black dark:text-purple-50">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Leaves Remaining</h2>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Next Salary Date</h2>
          <p className="text-3xl font-bold mt-2">{getNextSalaryDate()}</p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-wrap">Last Login</h2>
          <p className="text-3xl font-bold mt-2">{getLastLoginDateTime()}</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white dark:bg-dark-purple-muted p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Workload Trends</h2>
        <div className="h-48 flex items-center justify-center text-gray-400 dark:text-slate-400">
          Chart Placeholder
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-dark-purple-muted p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-3 text-sm text-gray-700 dark:text-slate-300">
          <li className="flex justify-between">
            <span>✔️ Submitted timesheet</span>
            <span className="text-sm text-gray-400">Today</span>
          </li>
          <li className="flex justify-between">
            <span>📅 Leave request submitted</span>
            <span className="text-sm text-gray-400">2 days ago</span>
          </li>
          <li className="flex justify-between">
            <span>💼 Updated profile details</span>
            <span className="text-sm text-gray-400">Last week</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

//emplyee details type
interface EmployeeDetailsType {
  id: number;
  userName: string;
  email: string;
  userRole: string;
  department: string;
  profile_image: string;
}

//fetch employee details
async function loadUserDetails(
  employeeId: number
): Promise<Partial<EmployeeDetailsType>> {
  const response = await fetch(
    `http://localhost:3000/api/employees/${employeeId}`
  );
  if (!response.ok) throw new Error("Failed to load user details");
  const data = await response.json();

  return data ?? {};
}

function getNextSalaryDate(): string {
  const date = new Date();
  date.setDate(25);
  return date.toLocaleDateString();
}

function getLastLoginDateTime(): string {
  try {
    const itemStr = localStorage.getItem("user");
    if (!itemStr) return "N/A";

    const login = JSON.parse(itemStr).lastLogin;
    return login;
  } catch (error) {
    return "N/A";
  }
}

export default EmployeeDashboard;

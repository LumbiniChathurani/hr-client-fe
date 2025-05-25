import React from "react";

const EmployeeDashboard = () => {
  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-dark-purple text-black dark:text-purple-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold">Welcome to Your Dashboard</h1>
      </div>

      <p className="text-gray-600 dark:text-slate-300 mb-6">
        Here's your personalized HR dashboard overview.
      </p>

      {/* Profile Section */}
      <div className="bg-white dark:bg-dark-purple-muted p-5 rounded-xl shadow mb-6">
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
          />
          <div>
            <h2 className="text-xl font-semibold">Jane Doe</h2>
            <p className="text-gray-500 dark:text-slate-300">
              Software Engineer
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
          <p className="text-3xl font-bold mt-2">28 May 2025</p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Last Login</h2>
          <p className="text-3xl font-bold mt-2">Today at 9:00 AM</p>
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

export default EmployeeDashboard;

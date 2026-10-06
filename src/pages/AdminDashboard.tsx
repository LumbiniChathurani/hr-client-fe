{
  /*import AdminLayout from "../layouts/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-purple-50">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 dark:text-purple-50">
        <div className="bg-light-purple dark:bg-dark-purple-muted p-6 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Total Employees</h2>
          <p className="text-2xl font-bold mt-2">42</p>
        </div>
        <div className="bg-light-purple dark:bg-dark-purple-muted p-6 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Departments</h2>
          <p className="text-2xl font-bold mt-2">5</p>
        </div>
        <div className="bg-light-purple dark:bg-dark-purple-muted p-6 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">On Leave</h2>
          <p className="text-2xl font-bold mt-2">3</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;*/
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Stats {
  totalEmployees: number;
  departments: number;
  onLeave: number;
  pendingRequests: number;
}

interface GrowthDataItem {
  month: string;
  employees: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalEmployees: 0,
    departments: 0,
    onLeave: 0,
    pendingRequests: 0,
  });

  const [notifications, setNotifications] = useState<string[]>([]);
  const [growthData, setGrowthData] = useState<GrowthDataItem[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch summary data
        const summaryRes = await fetch(
          "http://localhost:3000/api/dashboard/summary"
        );
        const summaryData: Stats = await summaryRes.json();

        // Fetch notifications (assuming this endpoint returns string array)
        const notificationsRes = await fetch(
          "http://localhost:3000/api/notifications/recent"
        );
        const notificationsData: string[] = await notificationsRes.json();

        // Fetch employee growth data
        const growthRes = await fetch(
          "http://localhost:3000/api/dashboard/employee-growth"
        );
        const growthJson: GrowthDataItem[] = await growthRes.json();

        setStats(summaryData);
        setNotifications(notificationsData);
        setGrowthData(growthJson);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      {/* Header */}
      <h1 className="text-3xl font-extrabold mb-2 text-black dark:text-purple-50">
        Welcome back, Admin!
      </h1>
      <p className="text-gray-600 dark:text-slate-300 mb-6">
        Here's an overview of your HR system today.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 dark:text-purple-50">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Total Employees</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalEmployees}</p>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Departments</h2>
          <p className="text-3xl font-bold mt-2">{stats.departments}</p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">On Leave</h2>
          <p className="text-3xl font-bold mt-2">{stats.onLeave}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Pending Requests</h2>
          <p className="text-3xl font-bold mt-2">{stats.pendingRequests}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <button
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          onClick={() => navigate("/employees")}
        >
          Add New Employee
        </button>
        <button
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          onClick={() => navigate("/reports")}
        >
          Generate Report
        </button>
        <button
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          onClick={() => navigate("/leave")}
        >
          View Leave Requests
        </button>
      </div>

      {/* Employee Growth Chart */}
      <div className="bg-white dark:bg-dark-purple-muted p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Employee Growth
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="employees"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-dark-purple-muted p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Recent Notifications
        </h2>
        <ul className="space-y-3 text-sm text-gray-700 dark:text-slate-300">
          {notifications.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AdminDashboard;

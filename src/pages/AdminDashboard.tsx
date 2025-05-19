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

const AdminDashboard = () => {
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
          <p className="text-3xl font-bold mt-2">42</p>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Departments</h2>
          <p className="text-3xl font-bold mt-2">5</p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">On Leave</h2>
          <p className="text-3xl font-bold mt-2">3</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Pending Requests</h2>
          <p className="text-3xl font-bold mt-2">7</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
          Add New Employee
        </button>
        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
          Generate Report
        </button>
        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
          View Leave Requests
        </button>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white dark:bg-dark-purple-muted p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Employee Growth
        </h2>
        <div className="h-48 flex items-center justify-center text-gray-400 dark:text-slate-400">
          {/* You can integrate a chart here (Recharts, Chart.js, etc.) */}
          Chart Placeholder
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-dark-purple-muted p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Recent Notifications
        </h2>
        <ul className="space-y-3 text-sm text-gray-700 dark:text-slate-300">
          <li>✅ Payroll has been processed for April.</li>
          <li>📝 2 new leave requests pending approval.</li>
          <li>📢 Company-wide meeting scheduled for May 3rd.</li>
        </ul>
      </div>
    </>
  );
};

export default AdminDashboard;

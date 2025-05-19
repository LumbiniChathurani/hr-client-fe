import { useState } from "react";

const ReportsPage = () => {
  const [reportStats] = useState({
    totalEmployees: 42,
    leavesTaken: 18,
    payrollProcessed: 35,
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-purple-50">
        📊 Reports & Analytics
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-white">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Total Employees</h2>
          <p className="text-3xl font-bold mt-2">
            {reportStats.totalEmployees}
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Leaves Taken</h2>
          <p className="text-3xl font-bold mt-2">{reportStats.leavesTaken}</p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Payroll Processed</h2>
          <p className="text-3xl font-bold mt-2">
            {reportStats.payrollProcessed}
          </p>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white dark:bg-dark-purple-muted p-6 rounded-xl shadow h-64 flex items-center justify-center text-gray-400 dark:text-slate-400">
          📈 Monthly Attendance Chart (Coming Soon)
        </div>
        <div className="bg-white dark:bg-dark-purple-muted p-6 rounded-xl shadow h-64 flex items-center justify-center text-gray-400 dark:text-slate-400">
          📊 Department-wise Salary Chart (Coming Soon)
        </div>
      </div>

      {/* Download Reports */}
      <div className="flex gap-4">
        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
          Download PDF
        </button>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          Export Excel
        </button>
      </div>
    </div>
  );
};

export default ReportsPage;

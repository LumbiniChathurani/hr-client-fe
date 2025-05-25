import React from "react";

const MyLeavePage = () => {
  const leaveRecords = [
    {
      date: "2025-05-01 to 2025-05-03",
      type: "Annual Leave",
      status: "Approved",
    },
    {
      date: "2025-04-15",
      type: "Sick Leave",
      status: "Rejected",
    },
    {
      date: "2025-03-22 to 2025-03-24",
      type: "Annual Leave",
      status: "Approved",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500";
      case "Rejected":
        return "bg-red-500";
      case "Pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-dark-purple text-black dark:text-purple-50">
      <h1 className="text-3xl font-extrabold mb-4">My Leave</h1>
      <p className="text-gray-600 dark:text-slate-300 mb-6">
        Review your leave history and request new time off.
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-4 rounded-xl shadow">
          <p className="text-sm">Total Leaves This Year</p>
          <h2 className="text-2xl font-bold">12</h2>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-emerald-600 text-white p-4 rounded-xl shadow">
          <p className="text-sm">Approved Leaves</p>
          <h2 className="text-2xl font-bold">10</h2>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white p-4 rounded-xl shadow">
          <p className="text-sm">Pending Requests</p>
          <h2 className="text-2xl font-bold">1</h2>
        </div>
      </div>

      {/* Leave Records Table */}
      <div className="bg-white dark:bg-dark-purple-muted p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Leave History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300 dark:border-slate-600 text-left ">
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRecords.map((record, idx) => (
                <tr
                  key={idx}
                  className={`${
                    idx % 2 === 0 ? "bg-gray-50 dark:bg-[#2D273B]" : ""
                  }`}
                >
                  <td className="py-2 px-4">{record.date}</td>
                  <td className="py-2 px-4">{record.type}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`text-white text-xs px-3 py-1 rounded-full ${getStatusColor(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Request Form */}
      <div className="bg-white dark:bg-dark-purple-muted p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Request Leave</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Leave Type</label>
            <select className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-[#2D273B] bg-gray-50 dark:text-white">
              <option>Annual Leave</option>
              <option>Sick Leave</option>
              <option>Emergency Leave</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Start Date</label>
            <input
              type="date"
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-[#2D273B] bg-gray-50 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">End Date</label>
            <input
              type="date"
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-[#2D273B] bg-gray-50 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Reason</label>
            <textarea
              rows={3}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-[#2D273B] bg-gray-50 dark:text-white"
              placeholder="Brief reason for leave..."
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyLeavePage;

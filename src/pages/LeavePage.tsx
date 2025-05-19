const LeavePage = () => {
  const filteredLeaves = [
    {
      id: 1,
      employee: "Alice",
      date: "2025-05-01",
      reason: "Sick Leave",
      status: "Pending",
    },
    {
      id: 2,
      employee: "Bob",
      date: "2025-04-28",
      reason: "Vacation",
      status: "Approved",
    },
    {
      id: 3,
      employee: "Charlie",
      date: "2025-04-27",
      reason: "Personal",
      status: "Rejected",
    },
  ];

  const statusColors: Record<"Approved" | "Rejected" | "Pending", string> = {
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-purple-50">
        Leave Management
      </h1>

      <table className="min-w-full table-auto bg-white dark:bg-dark-purple-muted shadow rounded-xl overflow-hidden">
        <thead className="bg-gray-100 dark:bg-dark-purple">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-white">
              Employee
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-white">
              Date
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-white">
              Reason
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-white">
              Status
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaves.map((leave) => (
            <tr
              key={leave.id}
              className="border-t border-gray-200 dark:border-gray-600"
            >
              <td className="py-3 px-4">{leave.employee}</td>
              <td className="py-3 px-4">{leave.date}</td>
              <td className="py-3 px-4">{leave.reason}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    statusColors[leave.status as keyof typeof statusColors]
                  }`}
                >
                  {leave.status}
                </span>
              </td>
              <td className="py-3 px-4 space-x-2">
                {leave.status === "Pending" ? (
                  <>
                    <button className="text-green-600 hover:underline">
                      Approve
                    </button>
                    <button className="text-red-600 hover:underline">
                      Reject
                    </button>
                  </>
                ) : (
                  <button className="text-blue-600 hover:underline">
                    View
                  </button>
                )}
              </td>
            </tr>
          ))}
          {filteredLeaves.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="text-center py-6 text-gray-500 dark:text-slate-400"
              >
                No leave requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeavePage;

import React, { useEffect, useState } from "react";

type LeaveRequest = {
  id: number;
  user_id: number;
  userName: string;
  department: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: string; // changed to string for flexibility
};

const LeavePage = () => {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const statusColors: Record<string, string> = {
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/leavemanagement"
        );
        const data = await response.json();
        console.log("Fetched leave data:", data); // 🔍 Debug fetch
        setLeaves(data);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  const updateLeaveStatus = async (
    id: number,
    status: "Approved" | "Rejected"
  ) => {
    console.log("Clicked status update:", { id, status });

    try {
      const response = await fetch(
        `http://localhost:3000/api/leavemanagement/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const responseData = await response.json();
      console.log("Response data:", response.status, responseData);

      if (!response.ok) {
        throw new Error(responseData?.error || "Unknown error");
      }

      setLeaves((prevLeaves) =>
        prevLeaves.map((leave) =>
          leave.id === id ? { ...leave, status } : leave
        )
      );
    } catch (error) {
      console.error("Error updating leave status:", error);
      alert("Failed to update leave status");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-purple-50">
        Leave Management
      </h1>

      {loading ? (
        <p className="text-gray-500 dark:text-slate-400">Loading...</p>
      ) : (
        <table className="min-w-full table-auto bg-white dark:bg-dark-purple-muted shadow rounded-xl overflow-hidden">
          <thead className="bg-gray-100 dark:bg-purple-700">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-white">
                Employee
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-white">
                Department
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-white">
                Leave Type
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-white">
                Duration
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
            {leaves.map((leave, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 dark:border-gray-600"
              >
                <td className="py-3 px-4">{leave.userName}</td>
                <td className="py-3 px-4">{leave.department}</td>
                <td className="py-3 px-4">{leave.leave_type}</td>
                <td className="py-3 px-4">
                  {leave.start_date} to {leave.end_date}
                </td>
                <td className="py-3 px-4">{leave.reason}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      statusColors[leave.status] || "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {leave.status}
                  </span>
                </td>
                <td className="py-3 px-4 space-x-2">
                  {leave.status?.toLowerCase() === "pending" ? (
                    <>
                      <button
                        onClick={() => updateLeaveStatus(leave.id, "Approved")}
                        className="text-green-600 hover:underline"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateLeaveStatus(leave.id, "Rejected")}
                        className="text-red-600 hover:underline"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <button className="text-blue-600 hover:underline">
                      No Actions
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {leaves.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-6 text-gray-500 dark:text-slate-400"
                >
                  No leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeavePage;

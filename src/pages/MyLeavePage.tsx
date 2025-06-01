import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../layouts/EmployeeLayout";

const MyLeavePage = () => {
  const user = useContext(UserContext);

  const [leaveRecords, setLeaveRecords] = useState([]);

  const [formData, setFormData] = useState({
    leave_type: "Annual Leave",
    start_date: "",
    end_date: "",
    reason: "",
    userId: user.id,
    email: user.email,
  });

  useEffect(() => {
    setFormData((c) => ({ ...c, userId: user.id, email: user.email }));
  }, [user]);

  // Fetch leave records on mount
  useEffect(() => {
    fetch(`http://localhost:3000/api/leaves/my-leaves/${formData.userId}`)
      .then((res) => res.json())
      .then((data) => setLeaveRecords(data))
      .catch((err) => console.error("Error fetching leave records:", err));
  }, []);

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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/leaves", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit leave request");
      }

      alert("Leave request submitted!");

      const updated = await fetch("http://localhost:3000/api/leaves");
      const data = await updated.json();
      setLeaveRecords(data);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-dark-purple text-black dark:text-purple-50">
      <h1 className="text-3xl font-extrabold mb-4">My Leave</h1>
      <h1 className="text-sm font-extrabold mb-4">
        {formData.email ?? "Email N/A"}
      </h1>
      <p className="text-gray-600 dark:text-slate-300 mb-6">
        Review your leave history and request new time off.
      </p>

      {/* Leave Records Table */}
      <div className="bg-white dark:bg-dark-purple-muted p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Leave History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300 dark:border-slate-600 text-left">
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRecords.map((record: any, idx) => (
                <tr
                  key={idx}
                  className={`${
                    idx % 2 === 0 ? "bg-gray-50 dark:bg-[#2D273B]" : ""
                  }`}
                >
                  <td className="py-2 px-4">
                    {record.start_date === record.end_date
                      ? record.start_date
                      : `${record.start_date} to ${record.end_date}`}
                  </td>
                  <td className="py-2 px-4">{record.leave_type}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`text-white text-xs px-3 py-1 rounded-full ${getStatusColor(
                        record.status || "Pending"
                      )}`}
                    >
                      {record.status || "Pending"}
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
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">Leave Type</label>
            <select
              name="leave_type"
              value={formData.leave_type}
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-[#2D273B] bg-gray-50 dark:text-white"
            >
              <option>Annual Leave</option>
              <option>Sick Leave</option>
              <option>Emergency Leave</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-[#2D273B] bg-gray-50 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-[#2D273B] bg-gray-50 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-[#2D273B] bg-gray-50 dark:text-white"
              placeholder="Brief reason for leave..."
              rows={3}
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

import React, { useEffect, useState } from "react";

// Define the structure of an attendance entry
type AttendanceEntry = {
  date: string; // in YYYY-MM-DD format
  status: "Present" | "Absent" | "Late";
};

const MyAttendance = () => {
  const userId = 1; // Replace with actual user ID from auth
  const today = new Date().toISOString().split("T")[0]; // e.g., "2025-05-06"
  const [attendanceData, setAttendanceData] = useState<AttendanceEntry[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-500";
      case "Absent":
        return "bg-red-500";
      case "Late":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await fetch(`/api/attendance/${userId}`);
      const rawData = await res.json();
      const formattedData = rawData.map((entry: any) => ({
        date: new Date(entry.date).toISOString().split("T")[0],
        status: entry.status,
      }));
      setAttendanceData(formattedData);
    } catch (error) {
      console.error("Failed to fetch attendance:", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const markAttendance = async (status: "Present" | "Absent" | "Late") => {
    const alreadyMarked = attendanceData.find((entry) => entry.date === today);
    if (alreadyMarked) return alert("Attendance already marked for today.");

    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, date: today, status }),
      });

      if (res.ok) {
        setAttendanceData([...attendanceData, { date: today, status }]);
      } else {
        const err = await res.json();
        alert(err.error || "Something went wrong.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
  };

  const summary = attendanceData.reduce(
    (acc, entry) => {
      if (typeof entry.date === "string" && entry.date.startsWith("2025-05")) {
        if (entry.status === "Present") acc.present++;
        else if (entry.status === "Absent") acc.absent++;
        else if (entry.status === "Late") acc.late++;
      }
      return acc;
    },
    { present: 0, absent: 0, late: 0 }
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-dark-purple text-black dark:text-purple-50">
      <h1 className="text-3xl font-extrabold mb-4">My Attendance</h1>
      <p className="text-gray-600 dark:text-slate-300 mb-6">
        View and mark your attendance.
      </p>

      {/* Mark Attendance Section */}
      <div className="bg-white dark:bg-dark-purple-muted p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">
          Mark Attendance for Today
        </h2>
        <div className="flex gap-4 flex-wrap">
          {["Present", "Absent", "Late"].map((status) => (
            <button
              key={status}
              onClick={() =>
                markAttendance(status as "Present" | "Absent" | "Late")
              }
              className={`${getStatusColor(
                status
              )} hover:brightness-90 text-white px-4 py-2 rounded`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white dark:bg-dark-purple-muted p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Summary for May 2025</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold">{summary.present}</p>
            <p className="text-sm text-gray-600 dark:text-slate-300">
              Days Present
            </p>
          </div>
          <div>
            <p className="text-lg font-bold">{summary.absent}</p>
            <p className="text-sm text-gray-600 dark:text-slate-300">
              Days Absent
            </p>
          </div>
          <div>
            <p className="text-lg font-bold">{summary.late}</p>
            <p className="text-sm text-gray-600 dark:text-slate-300">
              Days Late
            </p>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white dark:bg-dark-purple-muted p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Attendance Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-300 dark:border-slate-600">
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((entry, idx) => (
                <tr
                  key={idx}
                  className={
                    idx % 2 === 0 ? "bg-gray-100 dark:bg-[#2D273B]" : ""
                  }
                >
                  <td className="py-2 px-4">{entry.date}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`text-white text-xs px-3 py-1 rounded-full ${getStatusColor(
                        entry.status
                      )}`}
                    >
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAttendance;

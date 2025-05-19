import { useState } from "react";

const RecruitmentPage = () => {
  const [jobPostings] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      department: "Engineering",
      status: "Open",
      applicants: 12,
    },
    {
      id: 2,
      title: "HR Executive",
      department: "Human Resources",
      status: "Closed",
      applicants: 5,
    },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-purple-50">
        📋 Recruitment Management
      </h1>

      <div className="mb-4">
        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
          + Post New Job
        </button>
      </div>

      <div className="bg-white dark:bg-dark-purple-muted rounded-xl shadow overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 dark:bg-dark-purple">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">
                Job Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">
                Department
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">
                Applicants
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {jobPostings.map((job) => (
              <tr
                key={job.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="px-4 py-3">{job.title}</td>
                <td className="px-4 py-3">{job.department}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      job.status === "Open"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-4 py-3">{job.applicants}</td>
                <td className="px-4 py-3 space-x-2">
                  <button className="text-blue-600 hover:underline">
                    View
                  </button>
                  <button className="text-purple-600 hover:underline">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {jobPostings.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 dark:text-slate-400"
                >
                  No job postings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecruitmentPage;

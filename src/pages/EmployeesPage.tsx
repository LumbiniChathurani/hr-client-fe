import { useEffect, useState } from "react";
import UserFormModal from "./AddEmployee";

type Employee = {
  id: number;
  userName: string;
  department: string;
  userRole: string;
};

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/employees")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch employees");
        }
        return res.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const filteredEmployees = employees.filter((emp) =>
    emp.userName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-black dark:text-purple-50">
          Employee Management
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          ➕ Add Employee
        </button>
        <UserFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded border bg-white border-gray-300 w-full md:w-1/3 dark:bg-dark-purple-muted dark:text-white"
        />
        <select className="px-4 py-2 rounded border bg-white border-gray-300 dark:bg-dark-purple-muted dark:text-white">
          <option value="">All Departments</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-dark-purple-muted rounded-xl shadow">
            <thead className="bg-gray-100 dark:bg-purple-800 text-black dark:text-white">
              <tr>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Department</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b border-gray-200 dark:border-purple-700 hover:bg-gray-50 dark:hover:bg-purple-900"
                >
                  <td className="py-3 px-4">{emp.userName}</td>
                  <td className="py-3 px-4">{emp.department}</td>
                  <td className="py-3 px-4">{emp.userRole}</td>
                  <td className="py-3 px-4 space-x-2">
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-gray-500 dark:text-slate-400"
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeesPage;

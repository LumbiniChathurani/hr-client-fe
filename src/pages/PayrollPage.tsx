import { useState } from "react";

const dummyPayroll = [
  {
    id: 1,
    name: "Jane Doe",
    department: "HR",
    baseSalary: 5000,
    bonus: 500,
    deductions: 200,
  },
  {
    id: 2,
    name: "John Smith",
    department: "Engineering",
    baseSalary: 7000,
    bonus: 700,
    deductions: 300,
  },
  {
    id: 3,
    name: "Emily Johnson",
    department: "Marketing",
    baseSalary: 6000,
    bonus: 300,
    deductions: 100,
  },
];

const PayrollPage = () => {
  const [selectedMonth, setSelectedMonth] = useState("April");

  const totalSalary = dummyPayroll.reduce(
    (total, emp) => total + emp.baseSalary + emp.bonus - emp.deductions,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-purple-50">
        Payroll Management
      </h1>

      {/* Month Selector & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2 rounded border bg-white border-gray-300 dark:bg-dark-purple-muted dark:text-white"
        >
          {["January", "February", "March", "April", "May"].map((month) => (
            <option key={month} value={month}>
              {month} 2025
            </option>
          ))}
        </select>
        <div className="flex gap-4">
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            🧾 Generate Payslips
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            📤 Export Report
          </button>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-light-purple dark:bg-dark-purple-muted p-6 rounded-xl shadow text-center mb-6">
        <h2 className="text-lg font-semibold">
          Total Payroll for {selectedMonth}
        </h2>
        <p className="text-3xl font-bold mt-2">
          Rs.{totalSalary.toLocaleString()}
        </p>
      </div>

      {/* Payroll Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-dark-purple-muted rounded-xl shadow">
          <thead className="bg-gray-100 dark:bg-purple-800 text-black dark:text-white">
            <tr>
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Department</th>
              <th className="text-left py-3 px-4">Base Salary</th>
              <th className="text-left py-3 px-4">Bonus</th>
              <th className="text-left py-3 px-4">Deductions</th>
              <th className="text-left py-3 px-4">Net Pay</th>
            </tr>
          </thead>
          <tbody>
            {dummyPayroll.map((emp) => {
              const netPay = emp.baseSalary + emp.bonus - emp.deductions;
              return (
                <tr
                  key={emp.id}
                  className="border-b border-gray-200 dark:border-purple-700 hover:bg-gray-50 dark:hover:bg-purple-900"
                >
                  <td className="py-3 px-4">{emp.name}</td>
                  <td className="py-3 px-4">{emp.department}</td>
                  <td className="py-3 px-4">
                    Rs.{emp.baseSalary.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">Rs.{emp.bonus.toLocaleString()}</td>
                  <td className="py-3 px-4 text-red-500">
                    -Rs.{emp.deductions.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-semibold">
                    Rs.{netPay.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollPage;

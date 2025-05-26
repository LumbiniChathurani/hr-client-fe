import { useState, ChangeEvent } from "react";
import { Search } from "lucide-react";

type PayType = "monthly" | "hourly";
type StatusType = "Pending" | "Generated" | "Paid";

interface PayrollEntry {
  id: number;
  name: string;
  department: string;
  payType: PayType;
  baseSalary?: number;
  hourlyRate?: number;
  hoursWorked?: number;
  bonus?: number;
  deductions?: number;
  status: StatusType;
}

const dummyPayroll: PayrollEntry[] = [
  {
    id: 1,
    name: "Jane Doe",
    department: "HR",
    payType: "monthly",
    baseSalary: 5000,
    bonus: 500,
    deductions: 200,
    status: "Pending",
  },
  {
    id: 2,
    name: "John Smith",
    department: "Engineering",
    payType: "hourly",
    hourlyRate: 50,
    hoursWorked: 160,
    bonus: 100,
    deductions: 50,
    status: "Generated",
  },
  {
    id: 3,
    name: "Emily Johnson",
    department: "Marketing",
    payType: "hourly",
    hourlyRate: 60,
    hoursWorked: 140,
    bonus: 200,
    deductions: 100,
    status: "Paid",
  },
];

const PayrollPage = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("April");
  const [payrollData, setPayrollData] = useState<PayrollEntry[]>(dummyPayroll);
  const [search, setSearch] = useState<string>("");

  const calculateBase = (emp: PayrollEntry): number => {
    return emp.payType === "hourly"
      ? (emp.hourlyRate || 0) * (emp.hoursWorked || 0)
      : emp.baseSalary || 0;
  };

  const filteredData = payrollData.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalSalary = filteredData.reduce(
    (total, emp) =>
      total + calculateBase(emp) + (emp.bonus || 0) - (emp.deductions || 0),
    0
  );

  const updateStatus = (id: number, newStatus: StatusType) => {
    setPayrollData((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, status: newStatus } : emp))
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-purple-50">
        Payroll Management
      </h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <select
          value={selectedMonth}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setSelectedMonth(e.target.value)
          }
          className="px-4 py-2 rounded border bg-white border-gray-300 dark:bg-dark-purple-muted dark:text-white"
        >
          {["January", "February", "March", "April", "May"].map((month) => (
            <option key={month} value={month}>
              {month} 2025
            </option>
          ))}
        </select>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            className="pl-10 py-2 border rounded border-gray-300 bg-white dark:bg-dark-purple-muted dark:text-white"
          />
        </div>

        <div className="flex gap-2">
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
              <th className="text-left py-3 px-4">Pay Type</th>
              <th className="text-left py-3 px-4">Base / Hours</th>
              <th className="text-left py-3 px-4">Bonus</th>
              <th className="text-left py-3 px-4">Deductions</th>
              <th className="text-left py-3 px-4">Net Pay</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((emp) => {
              const base = calculateBase(emp);
              const netPay = base + (emp.bonus || 0) - (emp.deductions || 0);

              return (
                <tr
                  key={emp.id}
                  className="border-b border-gray-200 dark:border-purple-700 hover:bg-gray-50 dark:hover:bg-purple-900"
                >
                  <td className="py-3 px-4">{emp.name}</td>
                  <td className="py-3 px-4">{emp.department}</td>
                  <td className="py-3 px-4 capitalize">{emp.payType}</td>
                  <td className="py-3 px-4">
                    {emp.payType === "hourly" ? (
                      <>
                        {emp.hoursWorked} hrs × Rs.{emp.hourlyRate}
                        <br />
                        <span className="font-medium">= Rs.{base}</span>
                      </>
                    ) : (
                      <>Rs.{base}</>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    Rs.{(emp.bonus || 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-red-500">
                    -Rs.{(emp.deductions || 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-semibold">
                    Rs.{netPay.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        emp.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : emp.status === "Generated"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => updateStatus(emp.id, "Paid")}
                      className="text-green-600 hover:underline"
                    >
                      Mark as Paid
                    </button>
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>
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

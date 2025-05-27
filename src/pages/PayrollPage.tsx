import { useEffect, useState, ChangeEvent } from "react";
import { Search } from "lucide-react";
import EditPayrollFormModal from "./EditPayroll";

// Types
type PayType = "monthly" | "hourly";
type StatusType = "Pending" | "Generated" | "Paid";

interface PayrollEntry {
  userId: number;
  id: number;
  name: string;
  department: string;
  payType: PayType;
  baseSalary?: number;
  hourly_rate?: number;
  hoursWorked?: number;
  bonus?: number;
  deductions?: number;
  status: StatusType;
}

interface PayrollData {
  id: number;
  employee_id: number;
  userId: number;
  base_salary: number;
  bonus: number;
  deductions: number;
  pay_type: PayType;
  hourly_rate: number;
}

const convertToPayrollData = (entry: PayrollEntry): PayrollData => {
  console.log("data: ", entry);

  return {
    id: entry.userId,
    userId: entry.userId,
    employee_id: entry.userId, // Consider using real employee ID if available
    base_salary:
      entry.baseSalary ?? (entry.hourly_rate ?? 0) * (entry.hoursWorked ?? 0),
    bonus: entry.bonus ?? 0,
    deductions: entry.deductions ?? 0,
    pay_type: entry.payType,
    hourly_rate: entry.hourly_rate ?? 0,
  };
};

const PayrollPage = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("April");
  const [payrollData, setPayrollData] = useState<PayrollEntry[]>([]);
  const [search, setSearch] = useState<string>("");
  const [updateDummy, setUpdateDummy] = useState({});
  const [editingPayroll, setEditingPayroll] = useState<PayrollEntry | null>(
    null
  );

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/payroll`);
        if (!res.ok) throw new Error("Network response was not ok");
        const rawData = await res.json();
        const data: PayrollEntry[] = rawData.map((item: any) => ({
          id: item.id,
          userId: item.userId,
          name: item.name,
          department: item.department,
          payType: item.pay_type,
          baseSalary: item.base_salary,
          hourly_rate: item.hourly_rate,
          hoursWorked: item.hours_worked,
          bonus: item.bonus,
          deductions: item.deductions,
          status: item.status,
        }));
        setPayrollData(data);
      } catch (err) {
        console.error("Failed to fetch payroll:", err);
      }
    };

    fetchPayroll();
  }, [updateDummy]);

  const calculateBase = (emp: PayrollEntry): number =>
    emp.payType === "hourly"
      ? (emp.hourly_rate || 0) * (emp.hoursWorked || 0)
      : emp.baseSalary || 0;

  const filteredData = payrollData.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalSalary = filteredData.reduce(
    (total, emp) =>
      total + calculateBase(emp) + (emp.bonus || 0) - (emp.deductions || 0),
    0
  );

  const updateStatus = async (id: number, newStatus: StatusType) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/payroll/mark-paid/${id}`,
        {
          method: "PUT",
        }
      );
      if (!res.ok) throw new Error("Failed to update payroll status");

      setPayrollData((prev) =>
        prev.map((emp) => (emp.id === id ? { ...emp, status: newStatus } : emp))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleUpdate = async (updated: Partial<PayrollEntry>) => {
    if (!editingPayroll) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api/payroll/update/${editingPayroll.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      setPayrollData((prev) =>
        prev.map((emp) =>
          emp.id === editingPayroll.id ? { ...emp, ...updated } : emp
        )
      );
      setEditingPayroll(null);
      setUpdateDummy({});
    } catch (err) {
      console.error("Failed to update payroll:", err);
    }
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

      {/* Summary */}
      <div className="bg-light-purple dark:bg-dark-purple-muted p-6 rounded-xl shadow text-center mb-6">
        <h2 className="text-lg font-semibold">
          Total Payroll for {selectedMonth}
        </h2>
        <p className="text-3xl font-bold mt-2">
          Rs.{totalSalary.toLocaleString()}
        </p>
      </div>

      {/* Table */}
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
            {filteredData.map((emp, index) => {
              const base = calculateBase(emp);
              const netPay = base + (emp.bonus || 0) - (emp.deductions || 0);

              return (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-purple-700 hover:bg-gray-50 dark:hover:bg-purple-900"
                >
                  <td className="py-3 px-4">{emp.name ?? "N/A"}</td>
                  <td className="py-3 px-4">{emp.department ?? "N/A"}</td>
                  <td className="py-3 px-4 capitalize">
                    {emp.payType ?? "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    {emp.payType === "hourly" ? (
                      <>
                        {emp.hoursWorked} hrs × Rs.{emp.hourly_rate ?? 0}
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
                      {emp.status ?? "N/A"}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => updateStatus(emp.id, "Paid")}
                      className="text-green-600 hover:underline"
                      aria-label="Mark as Paid"
                    >
                      Mark as Paid
                    </button>
                    <button
                      disabled
                      className="text-gray-400 cursor-not-allowed"
                    >
                      View
                    </button>
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => setEditingPayroll(emp)}
                      aria-label="Edit Payroll"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editingPayroll && (
        <EditPayrollFormModal
          payrollData={convertToPayrollData(editingPayroll)}
          isOpen={true}
          onClose={() => setEditingPayroll(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default PayrollPage;

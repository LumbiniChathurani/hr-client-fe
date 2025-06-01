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
  month_num: number;
  year_num: number;
}

interface PayrollData {
  id: number;
  userId: number;
  employee_id: number;
  base_salary: number;
  bonus: number;
  deductions: number;
  pay_type: PayType;
  hourly_rate: number;
  month_num: number;
  year_num: number;
}

const convertToPayrollData = (entry: PayrollEntry): PayrollData => ({
  id: entry.userId,
  userId: entry.userId,
  employee_id: entry.userId,
  base_salary:
    entry.baseSalary ?? (entry.hourly_rate ?? 0) * (entry.hoursWorked ?? 0),
  bonus: entry.bonus ?? 0,
  deductions: entry.deductions ?? 0,
  pay_type: entry.payType,
  hourly_rate: entry.hourly_rate ?? 0,
  month_num: entry.month_num,
  year_num: entry.year_num,
});

const PayrollPage = () => {
  const [month, setMonth] = useState<number>(1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [payroll, setPayroll] = useState<PayrollEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState({});
  const [editing, setEditing] = useState<PayrollEntry | null>(null);

  useEffect(() => {
    console.log("Payroll changed: ", payroll);
  }, [payroll]);

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const params = new URLSearchParams();
        params.set("month", (month ?? "1").toString());
        params.set("year", (year ?? "1970").toString());

        const res = await fetch(
          `http://localhost:3000/api/payroll?${params.toString()}`
        );
        const data = await res.json();
        const formatted = data.map(
          (item: any): PayrollEntry => ({
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
            month_num: item.month_num,
            year_num: item.year_num,
          })
        );

        console.log("formatted: ", formatted);
        setPayroll([...formatted]);
      } catch (err) {
        console.error("Failed to fetch payroll:", err);
      }
    };
    fetchPayroll();
  }, [refreshTrigger, month, year, setPayroll]);

  const calcBase = (e: PayrollEntry) =>
    e.payType === "hourly"
      ? (e.hourly_rate || 0) * (e.hoursWorked || 0)
      : e.baseSalary || 0;

  const calcNetPay = (e: PayrollEntry) =>
    calcBase(e) + (e.bonus || 0) - (e.deductions || 0);

  const total = 0;

  const updateStatus = async (id: number, newStatus: StatusType) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/payroll/mark-paid/${id}`,
        { method: "PUT" }
      );
      if (!res.ok) throw new Error("Failed to update status");
      setPayroll((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (updated: Partial<PayrollEntry>) => {
    if (!editing) return;
    try {
      const res = await fetch(
        `http://localhost:3000/api/payroll/update/${editing.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        }
      );
      if (!res.ok) throw new Error("Update failed");
      setPayroll((prev) =>
        prev.map((e) => (e.id === editing.id ? { ...e, ...updated } : e))
      );
      setEditing(null);
      setRefreshTrigger({});
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
        {/* select payroll month */}
        <select
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
          className="px-4 py-2 rounded border bg-white border-gray-300 dark:bg-dark-purple-muted dark:text-white"
        >
          {Array.from({ length: 12 }, (_, i) => {
            const monthIndex = i; // 0 to 11
            const monthName = new Date(0, monthIndex).toLocaleString(
              "default",
              { month: "long" }
            );
            return (
              <option key={monthIndex + 1} value={monthIndex + 1}>
                {monthName}
              </option>
            );
          })}
        </select>
        {/* set payroll year */}
        <div className="flex flex-row items-center gap-x-5">
          <h5>Year: </h5>
          <input
            min={1970}
            type="number"
            onChange={(e) => setYear(parseInt(e.target.value ?? "1970"))}
            value={year}
            className="px-4 py-2 rounded border bg-white border-gray-300 dark:bg-dark-purple-muted dark:text-white"
          />
        </div>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search employee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          Total Payroll for {getMonthName(month)}
        </h2>
        <p className="text-3xl font-bold mt-2">Rs.{total.toLocaleString()}</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-dark-purple-muted rounded-xl shadow">
          <thead className="bg-gray-100 dark:bg-purple-800 text-black dark:text-white">
            <tr>
              {[
                "Name",
                "Department",
                "Pay Type",
                "Base / Hours",
                "Bonus",
                "Deductions",
                "Net Pay",
                "Status",
                "Actions",
              ].map((h) => (
                <th key={h} className="text-left py-3 px-4">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payroll.map((e, index) => {
              return (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-purple-700 hover:bg-gray-50 dark:hover:bg-purple-900"
                >
                  <td className="py-3 px-4">{e.name}</td>
                  <td className="py-3 px-4">{e.department}</td>
                  <td className="py-3 px-4 capitalize">{e.payType}</td>
                  <td className="py-3 px-4">
                    {e.payType === "hourly" ? (
                      <>
                        {e.hoursWorked} hrs × Rs.{e.hourly_rate}
                        <br />
                        <span className="font-medium">= Rs.{calcBase(e)}</span>
                      </>
                    ) : (
                      <>Rs.{calcBase(e)}</>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    Rs.{(e.bonus || 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-red-500">
                    -Rs.{(e.deductions || 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-semibold">
                    Rs.{calcNetPay(e).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        e.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : e.status === "Generated"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {e.status ?? "N/A"}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => updateStatus(e.id, "Paid")}
                      className="text-green-600 hover:underline"
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
                      onClick={() => setEditing(e)}
                      className="text-blue-500 hover:underline"
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

      {editing && (
        <EditPayrollFormModal
          payrollData={convertToPayrollData(editing)}
          isOpen={true}
          onClose={() => setEditing(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

function getMonthName(monthNum: number): string {
  return new Date(0, monthNum - 1).toLocaleString("default", { month: "long" });
}
export default PayrollPage;

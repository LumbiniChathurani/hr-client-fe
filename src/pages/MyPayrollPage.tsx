import React from "react";

const MyPayrollPage = () => {
  const payrollRecords = [
    {
      month: "April 2025",
      dateIssued: "2025-04-30",
      grossPay: "$5,000",
      deductions: "$300",
      netPay: "$4,700",
      status: "Paid",
    },
    {
      month: "March 2025",
      dateIssued: "2025-03-31",
      grossPay: "$5,000",
      deductions: "$250",
      netPay: "$4,750",
      status: "Paid",
    },
    {
      month: "February 2025",
      dateIssued: "2025-02-28",
      grossPay: "$5,000",
      deductions: "$220",
      netPay: "$4,780",
      status: "Paid",
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-100  dark:bg-dark-purple text-black dark:text-purple-50">
      <h1 className="text-3xl font-extrabold mb-4">My Payroll</h1>
      <p className="text-gray-600 dark:text-slate-300 mb-6">
        Review your monthly salary details and payment history.
      </p>

      {/* Payroll Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-4 rounded-xl shadow">
          <p className="text-sm">Last Net Pay</p>
          <h2 className="text-2xl font-bold">$4,700</h2>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-emerald-600 text-white p-4 rounded-xl shadow">
          <p className="text-sm">Total Earnings (YTD)</p>
          <h2 className="text-2xl font-bold">$18,230</h2>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white p-4 rounded-xl shadow">
          <p className="text-sm">Total Deductions (YTD)</p>
          <h2 className="text-2xl font-bold">$1,050</h2>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white dark:bg-dark-purple-muted p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Payroll History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300 dark:border-slate-600 text-left">
                <th className="py-2 px-4">Month</th>
                <th className="py-2 px-4">Date Issued</th>
                <th className="py-2 px-4">Gross Pay</th>
                <th className="py-2 px-4">Deductions</th>
                <th className="py-2 px-4">Net Pay</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {payrollRecords.map((record, idx) => (
                <tr
                  key={idx}
                  className={`${
                    idx % 2 === 0 ? "bg-gray-50 dark:bg-[#2D273B]" : ""
                  }`}
                >
                  <td className="py-2 px-4">{record.month}</td>
                  <td className="py-2 px-4">{record.dateIssued}</td>
                  <td className="py-2 px-4">{record.grossPay}</td>
                  <td className="py-2 px-4">{record.deductions}</td>
                  <td className="py-2 px-4">{record.netPay}</td>
                  <td className="py-2 px-4">
                    <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                      {record.status}
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

export default MyPayrollPage;

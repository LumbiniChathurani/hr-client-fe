import { useState, useEffect } from "react";
import jsPDF from "jspdf";

const ReportsPage = () => {
  const [reportStats, setReportStats] = useState({
    totalEmployees: 0,
    leavesTaken: 0,
    payrollProcessed: 0,
  });

  useEffect(() => {
    const fetchReportStats = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/reports");
        if (!response.ok) {
          throw new Error("Failed to fetch report stats");
        }
        const data = await response.json();
        setReportStats(data);
      } catch (error) {
        console.error("Error fetching report stats:", error);
      }
    };

    fetchReportStats();
  }, []);

  // Function to generate PDF on button click
  const generatePDF = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/employees");
      if (!response.ok) throw new Error("Failed to fetch employees");

      const employees = await response.json();

      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Employee Details Report", 14, 22);
      doc.setFontSize(12);
      doc.setTextColor(100);

      const tableColumn = ["ID", "Username", "Role", "Department"];

      let startY = 30;

      // Header row
      doc.setFont("helvetica", "bold");
      tableColumn.forEach((col, i) => {
        doc.text(col, 14 + i * 45, startY);
      });
      doc.setFont("helvetica", "normal");

      // Rows - safely handle undefined with fallback empty strings
      employees.forEach((emp: any, index: number) => {
        const y = startY + 10 + index * 8;
        doc.text(String(emp.id ?? ""), 14, y);
        doc.text(String(emp.userName ?? ""), 14 + 45, y);
        doc.text(String(emp.userRole ?? ""), 14 + 90, y);
        doc.text(String(emp.department ?? ""), 14 + 135, y);
      });

      doc.save("Employee_Details_Report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-purple-50">
        📊 Reports & Analytics
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-white">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Total Employees</h2>
          <p className="text-3xl font-bold mt-2">
            {reportStats.totalEmployees}
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Leaves Taken</h2>
          <p className="text-3xl font-bold mt-2">{reportStats.leavesTaken}</p>
        </div>
        {/* 
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Payroll Processed</h2>
          <p className="text-3xl font-bold mt-2">{reportStats.payrollProcessed}</p>
        </div>
        */}
      </div>

      {/* Download Reports */}
      <div className="flex gap-4">
        <button
          onClick={generatePDF}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Download PDF
        </button>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          Export Excel
        </button>
      </div>
    </div>
  );
};

export default ReportsPage;

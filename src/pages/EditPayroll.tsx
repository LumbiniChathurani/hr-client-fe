import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";

interface PayrollData {
  id: number;
  employee_id: number;
  base_salary: number;
  bonus: number;
  deductions: number;
  hourly_rate: number;
  pay_type: "monthly" | "hourly";
}

interface EditPayrollFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  payrollData: PayrollData | null;
  onUpdate: (updated: Partial<PayrollData>) => void;
}

export default function EditPayrollFormModal({
  isOpen,
  onClose,
  payrollData,
  onUpdate,
}: EditPayrollFormModalProps) {
  const [formData, setFormData] = useState<{
    base_salary: string;
    bonus: string;
    deductions: string;
    hourly_rate: number;
    employee_id: number;
    pay_type: "monthly" | "hourly";
  }>({
    base_salary: "",
    bonus: "",
    deductions: "",
    pay_type: "monthly",
    hourly_rate: 0,
    employee_id: 0,
  });

  useEffect(() => {
    if (payrollData) {
      setFormData({
        employee_id: payrollData.employee_id,
        base_salary: payrollData.base_salary.toString(),
        bonus: payrollData.bonus.toString(),
        deductions: payrollData.deductions.toString(),
        pay_type: payrollData.pay_type,
        hourly_rate: payrollData.hourly_rate,
      });
    }
  }, [payrollData]);

  if (!isOpen || !payrollData) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/payroll/update/${payrollData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            base_salary: parseFloat(formData.base_salary),
            bonus: parseFloat(formData.bonus),
            deductions: parseFloat(formData.deductions),
            pay_type: formData.pay_type,
            hourly_rate: formData.hourly_rate,
            employee_id: payrollData.employee_id, // ✅ include this
          }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to update payroll");
      }

      const data = await response.json();
      console.log("Payroll updated:", data.payroll);

      const updatedPayroll: Partial<PayrollData> = {
        id: payrollData.id,
        employee_id: payrollData.employee_id,
        base_salary: parseFloat(formData.base_salary),
        bonus: parseFloat(formData.bonus),
        deductions: parseFloat(formData.deductions),
        pay_type: formData.pay_type,
      };

      onUpdate(updatedPayroll);
      onClose();
    } catch (error: any) {
      console.error("Error updating payroll:", error.message);
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-payroll-title"
    >
      <div className="bg-gray-100 dark:bg-dark-purple-muted dark:text-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative animate-fade-in">
        {/* Close Button */}
        <button
          aria-label="Close edit payroll modal"
          className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white"
          onClick={onClose}
        >
          <X />
        </button>

        <h2
          id="edit-payroll-title"
          className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-6 text-center"
        >
          ✏️ Edit Payroll
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Salary */}
          <div>
            <label
              htmlFor="basicSalary"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Basic Salary
            </label>
            <input
              id="base_salary"
              type="number"
              name="base_salary"
              required
              value={formData.base_salary}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-400 text-gray-600"
            />
          </div>

          {/* Bonus */}
          <div>
            <label
              htmlFor="bonus"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Bonus
            </label>
            <input
              id="bonus"
              type="number"
              name="bonus"
              value={formData.bonus}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-400 text-gray-600"
            />
          </div>

          {/* Deductions */}
          <div>
            <label
              htmlFor="deductions"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Deductions
            </label>
            <input
              id="deductions"
              type="number"
              name="deductions"
              value={formData.deductions}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-400 text-gray-600"
            />
          </div>

          {/* Salary Type */}
          <div>
            <label
              htmlFor="salaryType"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Salary Type
            </label>
            <select
              id="pay_type"
              name="pay_type"
              required
              value={formData.pay_type}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-400 text-gray-600"
            >
              <option value="monthly">Monthly</option>
              <option value="hourly">Hourly</option>
            </select>
          </div>

          {/* if hourly paid */}
          {formData.pay_type === "hourly" && (
            <div>
              <label
                htmlFor="hourly_rate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Hourly Rate
              </label>
              <input
                id="hourly_rate"
                type="number"
                name="hourly_rate"
                value={formData.hourly_rate}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-400 text-gray-600"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Update Payroll
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

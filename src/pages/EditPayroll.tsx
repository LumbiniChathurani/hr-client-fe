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
  month_num: number;
  year_num: number;
}

interface EditPayrollFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  payrollData: PayrollData | null;
  onUpdate: () => void;
}

const EditPayrollFormModal: React.FC<EditPayrollFormModalProps> = ({
  isOpen,
  onClose,
  payrollData,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    employee_id: 0,
    base_salary: "",
    bonus: "",
    deductions: "",
    hourly_rate: 0,
    pay_type: "monthly" as "monthly" | "hourly",
    month_num: payrollData?.month_num,
    year_num: payrollData?.year_num,
  });

  useEffect(() => {
    if (payrollData) {
      const {
        employee_id,
        base_salary,
        bonus,
        deductions,
        hourly_rate,
        pay_type,
      } = payrollData;
      setFormData({
        employee_id,
        base_salary: base_salary.toString(),
        bonus: bonus.toString(),
        deductions: deductions.toString(),
        hourly_rate,
        pay_type,
        month_num: payrollData.month_num,
        year_num: payrollData.year_num,
      });
    }
  }, [payrollData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "hourly_rate" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payrollData) return;

    try {
      const response = await fetch(`http://localhost:3000/api/payroll/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          base_salary: parseFloat(formData.base_salary),
          bonus: parseFloat(formData.bonus),
          deductions: parseFloat(formData.deductions),
        }),
      });

      if (!response.ok)
        throw new Error(
          (await response.json()).error || "Failed to update payroll"
        );

      onUpdate();

      onClose();
    } catch (err: any) {
      console.error("Error updating payroll:", err.message);
    }
  };

  if (!isOpen || !payrollData) return null;

  const renderInput = (
    label: string,
    name: keyof typeof formData,
    type: string = "number"
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={(formData[name] as any).toString()}
        onChange={handleChange}
        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-400 text-gray-600"
        required={["base_salary", "pay_type"].includes(name)}
      />
    </div>
  );

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-100 dark:bg-dark-purple-muted dark:text-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative animate-fade-in">
        <button
          aria-label="Close"
          className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white"
          onClick={onClose}
        >
          <X />
        </button>

        <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-6 text-center">
          ✏️ Edit Payroll
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {renderInput("Basic Salary", "base_salary")}
          {renderInput("Bonus", "bonus")}
          {renderInput("Deductions", "deductions")}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Salary Type
            </label>
            <select
              name="pay_type"
              value={formData.pay_type}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-400 text-gray-600"
              required
            >
              <option value="monthly">Monthly</option>
              <option value="hourly">Hourly</option>
            </select>
          </div>

          {formData.pay_type === "hourly" &&
            renderInput("Hourly Rate", "hourly_rate")}

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
};

export default EditPayrollFormModal;

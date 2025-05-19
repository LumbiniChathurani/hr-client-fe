// EditEmployeeFormModal.tsx
import { X } from "lucide-react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

interface Employee {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  department: string;
}

interface EditEmployeeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeData: Employee | null;
}

export default function EditEmployeeFormModal({
  isOpen,
  onClose,
  employeeData,
}: EditEmployeeFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    department: "",
  });

  useEffect(() => {
    if (employeeData) {
      setFormData({
        name: employeeData.name,
        email: employeeData.email,
        password: "", // Let user re-enter if updating
        role: employeeData.role,
        department: employeeData.department,
      });
    }
  }, [employeeData]);

  if (!isOpen || !employeeData) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/employees/${employeeData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to update employee");
      }

      const data = await response.json();
      console.log("Employee updated:", data.employee);
      onClose();
    } catch (error: any) {
      console.error("Error updating employee:", error.message);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-100 dark:bg-dark-purple-muted dark:text-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative animate-fade-in">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white"
          onClick={onClose}
        >
          <X />
        </button>

        <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-6 text-center">
          ✏️ Edit User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-400 text-gray-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-400 text-gray-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password (leave blank to keep unchanged)
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-400 text-gray-600"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Role
            </label>
            <select
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-400 text-gray-600"
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="hr">HR</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Department
            </label>
            <select
              name="department"
              required
              value={formData.department}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-400 text-gray-600"
            >
              <option value="">Select department</option>
              <option value="it">IT</option>
              <option value="marketing">Marketing</option>
              <option value="finance">Finance</option>
              <option value="sales">Sales</option>
            </select>
          </div>

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

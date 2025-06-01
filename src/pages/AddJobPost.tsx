import { X } from "lucide-react";
import ReactDOM from "react-dom";
import { useState } from "react";

interface PostJobProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PostJobModal({ isOpen, onClose }: PostJobProps) {
  const [formData, setFormData] = useState({
    job_title: "",
    job_description: "",
    required_qualifications: "",
    department: "",
    status: "",
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/postjobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // assuming formData has name, email, etc.
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to create job post");
      }

      const data = await response.json();
      console.log("Job post created:", data.employee);
      onClose(); // close the modal if needed
    } catch (error: any) {
      console.error("Error submitting form:", error.message);
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
          👤 Add New Job Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Title*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Job Title
            </label>
            <input
              type="text"
              name="job_title"
              required
              value={formData.job_title}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-400 text-gray-600"
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Job Description
            </label>
            <input
              type="text"
              name="job_description"
              required
              value={formData.job_description}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-400 text-gray-600"
            />
          </div>
          {/* Required Qualifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Required Qualifications
            </label>
            <input
              type="text"
              name="required_qualifications"
              required
              value={formData.required_qualifications}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-400 text-gray-600"
            />
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
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              name="status"
              required
              value={formData.status}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-slate-400 text-gray-600"
            >
              <option value="">Select status</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

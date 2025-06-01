import { X } from "lucide-react";
import ReactDOM from "react-dom";
import { useState } from "react";

// ✅ Updated interface to match the actual job structure from backend
interface Job {
  id: number;
  job_title: string;
  job_description: string;
  required_qualifications: string;
}

interface JobFormModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

export default function JobApplicationModal({
  isOpen,
  onClose,
  job,
}: JobFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [resume, setResume] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("jobId", job.id.toString());
    if (resume) {
      data.append("resume", resume);
    }

    try {
      const response = await fetch("http://localhost:3000/api/apply", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to submit application");
      }

      const result = await response.json();
      console.log("Application submitted:", result);
      onClose(); // Close modal
    } catch (error: any) {
      console.error("Error submitting application:", error.message);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark-purple-muted dark:text-white rounded-2xl shadow-xl w-full max-w-xl p-6 relative animate-fade-in">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white"
          onClick={onClose}
        >
          <X />
        </button>

        {/* ✅ Use job.job_title instead of job.title */}
        <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-4 text-center">
          📄 Apply for {job.job_title}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
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

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Upload Resume (PDF, DOCX)
            </label>
            <input
              type="file"
              name="resume"
              required
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className="mt-1 w-full text-gray-600 dark:text-white"
            />
          </div>

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

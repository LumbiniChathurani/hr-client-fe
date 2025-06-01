import { useEffect, useState } from "react";
import PostJobModal from "./AddJobPost";
import { JobPost } from "../types/JobPost";
import { useNavigate } from "react-router-dom";
import EditJobPostFormModal from "./EditJobPost";

const RecruitmentPage = () => {
  const [jobposts, setJobposts] = useState<JobPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedJobPost, setSelectedJobPost] = useState<JobPost | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/postjobs")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch job posts");
        }
        return res.json();
      })
      .then((data) => {
        setJobposts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const handleEdit = (id: number) => {
    const jobToEdit = jobposts.find((job) => job.id === id);
    if (jobToEdit) {
      setSelectedJobPost(jobToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this job post?")) {
      try {
        const res = await fetch(`http://localhost:3000/api/postjobs/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error("Failed to delete job post");
        }

        // Remove deleted post from state
        setJobposts((prevPosts) => prevPosts.filter((job) => job.id !== id));
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete job post. Please try again.");
      }
    }
  };
  const handleStatusToggle = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "Open" ? "Closed" : "Open";

    try {
      const res = await fetch(
        `http://localhost:3000/api/postjobs/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update job status");
      }

      // Update status locally
      setJobposts((prevPosts) =>
        prevPosts.map((job) =>
          job.id === id ? { ...job, status: newStatus } : job
        )
      );
    } catch (error) {
      console.error("Status toggle error:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedJobPost(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-purple-50">
        📋 Recruitment Management
      </h1>

      <div className="mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          + Post New Job
        </button>
        <PostJobModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <EditJobPostFormModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          postData={selectedJobPost}
        />
      </div>

      <div className="bg-white dark:bg-dark-purple-muted rounded-xl shadow overflow-x-auto">
        {loading ? (
          <p className="text-center py-6 text-gray-500 dark:text-slate-400">
            Loading job posts...
          </p>
        ) : (
          <table className="min-w-full table-auto border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-purple-700">
              <tr>
                {[
                  "Job Title",
                  "Job Description",
                  "Required Qualifications",
                  "Department",
                  "Status",
                  "Created At",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jobposts.map((job) => (
                <tr
                  key={job.id}
                  className="border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-purple-900 transition-colors"
                >
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-600">
                    {job.job_title}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-600">
                    {job.job_description}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-600">
                    {job.required_qualifications}
                  </td>
                  <td className="px-4 py-3 capitalize border border-gray-300 dark:border-gray-600">
                    {job.department}
                  </td>
                  <td
                    onClick={() => handleStatusToggle(job.id, job.status)}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 cursor-pointer"
                  >
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        job.status === "Open"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-600">
                    {job.created_at}
                  </td>
                  <td className="px-4 py-3 space-x-2 border border-gray-300 dark:border-gray-600">
                    <button
                      onClick={() => handleEdit(job.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/recruitment/${job.id}/applicants`)
                      }
                      className="text-purple-600 hover:underline"
                    >
                      View Applicants
                    </button>
                  </td>
                </tr>
              ))}
              {jobposts.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-6 text-gray-500 dark:text-slate-400 border border-gray-300 dark:border-gray-600"
                  >
                    No job postings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RecruitmentPage;

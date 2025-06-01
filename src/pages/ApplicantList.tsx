import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Applicant {
  id: number;
  applicant_name: string;
  email: string;
  resume_link: string;
}

const ApplicantsList = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/postjobs/${jobId}/applicants`)
      .then((res) => res.json())
      .then((data) => {
        setApplicants(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching applicants:", err);
        setLoading(false);
      });
  }, [jobId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-purple-50">
        👤 Applicants for Job ID: {jobId}
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : applicants.length === 0 ? (
        <p>No applicants found.</p>
      ) : (
        <table className="min-w-full border border-gray-300 dark:border-purple-950">
          <thead>
            <tr className="bg-gray-100 dark:bg-purple-800 text-left">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Resume</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant) => (
              <tr
                key={applicant.id}
                className="hover:bg-gray-50 dark:hover:bg-purple-900"
              >
                <td className="px-4 py-2 border">{applicant.applicant_name}</td>
                <td className="px-4 py-2 border">{applicant.email}</td>
                <td className="px-4 py-2 border">
                  <a
                    href={`http://localhost:3000${applicant.resume_link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Resume
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApplicantsList;

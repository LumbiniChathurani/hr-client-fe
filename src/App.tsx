import { Link } from "react-router-dom";
import { useTheme } from "./context/ThemeProvider";
import { FaSlack } from "react-icons/fa";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import JobApplicationModal from "./pages/ApplyJob";

type JobPosting = {
  id: number;
  job_title: string;
  job_description: string;
  required_qualifications: string;
};

function App() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<"Careers" | "Teams" | "Culture">(
    "Careers"
  );
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);

  const tabs: Record<"Careers" | "Teams" | "Culture", string> = {
    Careers: "Explore exciting roles and join our mission.",
    Teams: "Meet the people behind StriveWorks.",
    Culture: "Discover our values and work environment.",
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/postjobs");
        const data = await res.json();
        setJobPostings(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-light-purple dark:bg-dark-purple-muted dark:text-purple-50 text-black shadow-md px-8 py-4 flex justify-between items-center">
        <div className="text-xl font-bold flex items-center gap-1">
          <FaSlack className="text-purple-800 dark:text-purple-400" />
          <span className="text-purple-800 dark:text-purple-400">Strive</span>
          Works
        </div>
        <div className="flex space-x-4 items-center">
          <Link
            to="/login"
            className="font-semibold hover:bg-lilac-purple dark:hover:bg-hover-purple p-2 rounded"
          >
            Login
          </Link>
          <Link
            to="/dashboard"
            className="font-semibold hover:bg-lilac-purple dark:hover:bg-hover-purple p-2 rounded"
          >
            Admin Dashboard
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded hover:bg-lilac-purple dark:hover:bg-hover-purple"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* Hero Section with Tabs */}
      <section className="relative bg-gradient-to-br from-purple-600 to-gray-100 dark:from-dark-purple dark:to-purple-600 text-black dark:text-white py-16 px-6 text-center flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-4 z-10">Welcome to StriveWorks</h2>
        <p className="text-lg mb-8 max-w-xl z-10">
          Innovating productivity and collaboration — powered by great people.
        </p>
        {/* Hero Image */}
        <div className="relative w-full max-w-4xl">
          <img
            src="src/assets/dark-purple-aesthetic-pictures-c2zhuj401xbqvh6h.jpg"
            alt="Hero"
            className="rounded-xl shadow-xl w-full h-72 object-cover"
          />
          {/* Tabs inside image */}
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl flex flex-col justify-end p-4 text-left">
            <div className="flex gap-4 mb-2">
              {Object.keys(tabs).map((tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    setActiveTab(tab as "Careers" | "Teams" | "Culture")
                  }
                  className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                    activeTab === tab
                      ? "bg-purple-600 text-white"
                      : "bg-white bg-opacity-20 text-white hover:bg-opacity-40"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="text-white text-sm bg-black bg-opacity-30 rounded p-2">
              {tabs[activeTab]}
            </div>
          </div>
        </div>
      </section>

      {/* Job Postings */}
      <section className="py-16 px-6 bg-gray-100 flex-1 text-black dark:bg-dark-purple">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Current Job Openings
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {jobPostings.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-dark-purple-muted rounded-xl shadow-md p-6 flex flex-col justify-between transition duration-300 hover:shadow-lg"
            >
              <div>
                <h4 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-white leading-tight">
                  {job.job_title}
                </h4>
                <p className="text-base text-gray-700 dark:text-slate-300 mb-4 leading-relaxed">
                  {job.job_description}
                </p>
                <div className="text-sm text-gray-700 dark:text-slate-400 leading-relaxed">
                  <p className="font-medium mb-1">Required Qualifications:</p>
                  <p>{job.required_qualifications}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedJob(job);
                  setIsModalOpen(true);
                }}
                className="mt-6 bg-purple-600 text-white py-2.5 px-5 rounded-lg text-sm font-medium hover:bg-purple-700 transition duration-200 self-start"
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      </section>
      {selectedJob && (
        <JobApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          job={selectedJob}
        />
      )}

      {/* Footer */}
      <footer className="bg-lilac-purple text-black text-center py-6 dark:bg-dark-purple-muted dark:text-white">
        <p>
          &copy; {new Date().getFullYear()} StriveWorks. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;

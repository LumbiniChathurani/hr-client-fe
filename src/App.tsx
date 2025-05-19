import { Link } from "react-router-dom";
import { useTheme } from "./context/ThemeProvider";
import { FaSlack } from "react-icons/fa";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";

function App() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<"Careers" | "Teams" | "Culture">(
    "Careers"
  );

  const jobPostings = [
    {
      id: 1,
      title: "Frontend Developer",
      location: "Remote",
      type: "Full-time",
    },
    {
      id: 2,
      title: "Backend Engineer",
      location: "Colombo, Sri Lanka",
      type: "Full-time",
    },
    { id: 3, title: "HR Manager", location: "Remote", type: "Part-time" },
  ];

  const tabs: Record<"Careers" | "Teams" | "Culture", string> = {
    Careers: "Explore exciting roles and join our mission.",
    Teams: "Meet the people behind StriveWorks.",
    Culture: "Discover our values and work environment.",
  };

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
      <section className="py-12 px-6 bg-gray-100 flex-1 text-black dark:bg-dark-purple">
        <h3 className="text-3xl font-semibold text-center mb-8 dark:text-white">
          Current Job Openings
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {jobPostings.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-dark-purple-muted rounded-lg shadow p-6 flex flex-col justify-between"
            >
              <div>
                <h4 className="text-xl font-bold mb-2 dark:text-white">
                  {job.title}
                </h4>
                <p className="text-gray-600 dark:text-slate-400">
                  {job.location}
                </p>
                <p className="text-sm text-gray-500 mb-4 dark:text-slate-300">
                  {job.type}
                </p>
              </div>
              <Link
                to="/login"
                className="mt-auto bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 text-center"
              >
                Apply
              </Link>
            </div>
          ))}
        </div>
      </section>

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

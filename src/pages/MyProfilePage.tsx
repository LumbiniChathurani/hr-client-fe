import React, { useState } from "react";

const MyProfilePage = () => {
  const [newPassword, setNewPassword] = useState("");

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-dark-purple text-black dark:text-purple-50">
      {/* Header */}
      <h1 className="text-3xl font-extrabold mb-4">My Profile</h1>
      <p className="text-gray-600 dark:text-slate-300 mb-6">
        View and edit your personal information.
      </p>

      {/* Profile Card */}
      <div className="bg-white dark:bg-dark-purple-muted p-6 rounded-xl shadow mb-8 flex items-center gap-6">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-purple-500 object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold">Jane Doe</h2>
          <p className="text-gray-500 dark:text-slate-300">Software Engineer</p>
          <p className="text-gray-500 dark:text-slate-300">
            janedoe@example.com
          </p>
        </div>
      </div>

      {/* Personal Info Section */}
      <div className="bg-white dark:bg-dark-purple-muted p-6 rounded-xl shadow mb-8">
        <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-slate-300">
              Full Name
            </label>
            <input
              type="text"
              value="Jane Doe"
              className="w-full p-2 mt-1 rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-[#2D273B] dark:text-white"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-slate-300">
              Email
            </label>
            <input
              type="email"
              value="janedoe@example.com"
              className="w-full p-2 mt-1 rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-[#2D273B] dark:text-white"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-slate-300">
              Department
            </label>
            <input
              type="text"
              value="Engineering"
              className="w-full p-2 mt-1 rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-[#2D273B] dark:text-white"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white dark:bg-dark-purple-muted p-6 rounded-xl shadow w-full">
        <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
        <h1 className="text-base font-semibold">Update password</h1>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value ?? "")}
          className="w-full p-2 mt-1 rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-[#2D273B] dark:text-white"
          placeholder="new password here...."
        />
        <button
          disabled={!newPassword}
          className="disabled:bg-gray-700 disabled:cursor-not-allowed px-4 py-2 text-sm font-bold mx-auto my-5 bg-blue-800 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default MyProfilePage;

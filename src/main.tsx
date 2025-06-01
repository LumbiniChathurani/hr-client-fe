import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import NoSuchPage from "./pages/NoSuchPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import AdminLayout from "./layouts/AdminLayout.tsx";
import { ThemeProvider } from "./context/ThemeProvider";
import EmployeesPage from "./pages/EmployeesPage.tsx";
import PayrollPage from "./pages/PayrollPage.tsx";
import LeavePage from "./pages/LeavePage.tsx";
import RecruitmentPage from "./pages/RecruitmentPage.tsx";
import ReportsPage from "./pages/ReportsPage.tsx";
import UserRolePage from "./pages/UseRolePage.tsx";
import { ToastContainer, toast } from "react-toastify";
import ApplicantsList from "./pages/ApplicantList.tsx";
import EmployeeLayout from "./layouts/EmployeeLayout";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import MyProfilePage from "./pages/MyProfilePage";
import MyPayrollPage from "./pages/MyPayrollPage";
import MyLeavePage from "./pages/MyLeavePage";
import HelpModal from "./pages/HelpModal"; // Reuse existing
import MyAttendance from "./pages/MyAttendance.tsx";

// ✅ Inline wrapper to provide `user` to AdminLayout
const AdminLayoutWithUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        console.log(savedUser);
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load user context");
    }
  }, []);

  // if (!user) return <div>Loading user...</div>;

  return (
    <AdminLayout
      user={{ profile_image: "localhost:3000/uploads/121.jpg" }}
    ></AdminLayout>
  );
}; // ✅ <--- THIS was missing

interface User {
  profile_image: string;
  // Add any other fields you use like `name`, `email`, `role`, etc.
}

const EmployeeLayoutWithUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user) return <div>Loading user...</div>;

  return <EmployeeLayout user={user} />;
};

createRoot(document.getElementById("root")!).render(
  <>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ✅ Protected admin routes using inline AdminLayoutWithUser */}
          <Route path="/" element={<AdminLayoutWithUser />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="payroll" element={<PayrollPage />} />
            <Route path="leave" element={<LeavePage />} />
            <Route path="recruitment" element={<RecruitmentPage />} />
            <Route
              path="recruitment/:jobId/applicants"
              element={<ApplicantsList />}
            />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="user_management" element={<UserRolePage />} />
          </Route>

          <Route path="/employee" element={<EmployeeLayoutWithUser />}>
            <Route index element={<EmployeeDashboard />} />
            <Route path="profile" element={<MyProfilePage />} />
            <Route path="attendance" element={<MyAttendance />} />
            <Route path="payroll" element={<MyPayrollPage />} />
            <Route path="leave" element={<MyLeavePage />} />
          </Route>

          <Route path="*" element={<NoSuchPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    <ToastContainer />
  </>
);
